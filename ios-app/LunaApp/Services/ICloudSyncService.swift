// ┌──────────────────────────────────────────────────────────────┐
// │ Service: iCloudSyncService                                    │
// │ Feature: F25 (iCloud Encrypted Backup)                        │
// │ Privacy: End-to-end encrypted via CKRecord.encryptedValues    │
// │ Default: OFF — user must opt-in explicitly                    │
// └──────────────────────────────────────────────────────────────┘

import Foundation
import CloudKit
import Combine

/// Syncs LUNA data to iCloud using CloudKit encrypted fields.
/// All sensitive health data is stored via `encryptedValues` (E2E encrypted — Apple cannot read).
/// Toggle is OFF by default. Zero-network guarantee is preserved for users who don't opt in.
///
/// Câblage (F25) :
/// - après chaque écriture locale (log, profil) → `logDidWrite` / `profileDidChange`
///   déclenchent un envoi si le toggle est activé ;
/// - au lancement (ouverture du vault) et au retour au premier plan → `syncIfEnabled`
///   déclenche `performFullSync` (pull + fusion défensive, puis push) ;
/// - la fusion ne remplace JAMAIS une donnée locale plus récente : les écritures
///   locales sont horodatées et comparées au champ `syncDate` des records CloudKit.
final class ICloudSyncService: ObservableObject {
    static let shared = ICloudSyncService()

    // MARK: - Constants

    private let containerID = "iCloud.com.macaron.luna"
    private lazy var container = CKContainer(identifier: containerID)
    private lazy var privateDB = container.privateCloudDatabase

    private let recordTypeDailyLog = "DailyLog"
    private let recordTypeCycle = "Cycle"
    private let recordTypeProfile = "UserProfile"

    /// Clé du toggle opt-in (partagée avec SettingsView).
    static let enabledKey = "icloud_sync_enabled"
    /// Horodatage de la dernière synchronisation.
    static let lastSyncKey = "icloud_last_sync"
    /// Vrai dès qu'au moins une synchro a réussi (sert au panic wipe).
    static let hasSyncedKey = "icloud_has_synced"
    /// Horodatage des écritures locales par date de log (référence de fusion).
    private static let localWritesKey = "icloud_local_writes"
    /// Horodatage de la dernière écriture locale du profil.
    private static let profileWriteKey = "icloud_profile_write"

    /// Fenêtre d'export : tout l'historique (aligné sur la rétention du vault).
    private static let earliestLogDate = "1900-01-01"
    private static let latestLogDate = "2999-12-31"

    @Published private(set) var syncStatus: SyncStatus = .idle
    @Published private(set) var lastSyncDate: Date?

    enum SyncStatus: String {
        case idle
        case syncing
        case success
        case error
        case noAccount
    }

    /// Décision de fusion pour un enregistrement distant face à l'état local.
    enum MergeAction: Equatable {
        case keepLocal
        case applyRemote
        case fillMissing(DailyLog)
    }

    // MARK: - Internal state

    private let stateLock = NSLock()
    private var isSyncInFlight = false
    /// Écritures locales : date ISO → timeIntervalSince1970.
    private var localWrites: [String: Double] = [:]

    var hasSyncedEver: Bool {
        UserDefaults.standard.bool(forKey: Self.hasSyncedKey)
    }

    private init() {
        if let stored = UserDefaults.standard.dictionary(forKey: Self.localWritesKey) {
            localWrites = stored.compactMapValues { ($0 as? NSNumber)?.doubleValue }
        }
        if let date = UserDefaults.standard.object(forKey: Self.lastSyncKey) as? Date {
            lastSyncDate = date
        }
    }

    // MARK: - Account Check

    /// Checks if iCloud account is available on device.
    func checkAccountStatus() async -> Bool {
        do {
            let status = try await container.accountStatus()
            return status == .available
        } catch {
            return false
        }
    }

    // MARK: - Opt-in triggers (appelés depuis l'app)

    /// Synchronisation complète, uniquement si l'utilisatrice a activé le toggle.
    /// Best-effort : ne bloque jamais l'app, les erreurs sont stockées dans `syncStatus`.
    func syncIfEnabled(engine: LunaEngine?) {
        guard UserDefaults.standard.bool(forKey: Self.enabledKey), let engine else { return }
        Task { [weak self] in
            await self?.performFullSync(engine: engine)
        }
    }

    /// Appelé après chaque écriture locale d'un log.
    /// Enregistre l'horodatage local, puis envoie le record si le toggle est activé.
    func logDidWrite(_ log: DailyLog) {
        markLocalWrite(date: log.date, at: Date())

        guard UserDefaults.standard.bool(forKey: Self.enabledKey) else { return }
        guard !isSyncing else { return }

        Task { [weak self] in
            guard let self else { return }
            do {
                try await self.uploadDailyLog(log)
                await self.markSyncSuccess()
            } catch {
                await MainActor.run { self.syncStatus = Self.status(for: error) }
            }
        }
    }

    /// Appelé après chaque écriture locale du profil (mode de suivi, nom, préférences).
    func profileDidChange(engine: LunaEngine?) {
        markProfileWrite(at: Date())

        guard UserDefaults.standard.bool(forKey: Self.enabledKey), let engine else { return }
        guard !isSyncing else { return }

        Task { [weak self] in
            guard let self else { return }
            do {
                try await self.uploadProfile(engine: engine)
                await self.markSyncSuccess()
            } catch {
                await MainActor.run { self.syncStatus = Self.status(for: error) }
            }
        }
    }

    // MARK: - Upload (Push local → iCloud)

    /// Construit le record CloudKit d'un `DailyLog` (champs santé chiffrés de bout en bout).
    func makeRecord(for log: DailyLog) -> CKRecord {
        let recordID = CKRecord.ID(recordName: "log_\(log.date)", zoneID: .default)
        let record = CKRecord(recordType: recordTypeDailyLog, recordID: recordID)

        // All health data → encryptedValues (E2E encrypted, Apple cannot read)
        record.encryptedValues["logId"] = log.id as CKRecordValue
        record.encryptedValues["date"] = log.date as CKRecordValue
        if let flow = log.flow { record.encryptedValues["flow"] = flow as CKRecordValue }
        if let mood = log.mood { record.encryptedValues["mood"] = Int(mood) as CKRecordValue }
        if let energy = log.energy { record.encryptedValues["energy"] = Int(energy) as CKRecordValue }
        if let sleepQuality = log.sleepQuality { record.encryptedValues["sleepQuality"] = Int(sleepQuality) as CKRecordValue }
        if let weightKg = log.weightKg { record.encryptedValues["weightKg"] = weightKg as CKRecordValue }
        if let bbt = log.bbt { record.encryptedValues["bbt"] = bbt as CKRecordValue }
        if let lhTest = log.lhTest { record.encryptedValues["lhTest"] = lhTest as CKRecordValue }
        if let cervicalMucus = log.cervicalMucus { record.encryptedValues["cervicalMucus"] = cervicalMucus as CKRecordValue }
        if let sexualActivity = log.sexualActivity { record.encryptedValues["sexualActivity"] = sexualActivity as CKRecordValue }
        record.encryptedValues["symptoms"] = log.symptoms as CKRecordValue
        if let notes = log.notes { record.encryptedValues["notes"] = notes as CKRecordValue }

        // Non-sensitive metadata (référence de fusion, jamais lue par aucun serveur)
        record["syncDate"] = Date() as CKRecordValue
        return record
    }

    /// Uploads a single DailyLog to iCloud with encrypted fields.
    func uploadDailyLog(_ log: DailyLog) async throws {
        try await saveRecords([makeRecord(for: log)])
    }

    /// Uploads a batch of DailyLogs (chunked to stay under CloudKit operation limits).
    func uploadLogs(_ logs: [DailyLog]) async throws {
        guard !logs.isEmpty else { return }
        try await saveRecords(logs.map { makeRecord(for: $0) })
    }

    /// Uploads user profile to iCloud with encrypted fields.
    func uploadProfile(name: String?, trackingMode: String?) async throws {
        let recordID = CKRecord.ID(recordName: "profile_main", zoneID: .default)
        let record = CKRecord(recordType: recordTypeProfile, recordID: recordID)

        if let name = name, !name.isEmpty { record.encryptedValues["name"] = name as CKRecordValue }
        if let trackingMode = trackingMode { record.encryptedValues["trackingMode"] = trackingMode as CKRecordValue }
        record["syncDate"] = Date() as CKRecordValue

        try await saveRecords([record])
    }

    /// Uploads the current local profile (mode de suivi + nom depuis UserDefaults).
    func uploadProfile(engine: LunaEngine) async throws {
        let profile = try? engine.getUserProfile()
        try await uploadProfile(
            name: UserDefaults.standard.string(forKey: "user_name"),
            trackingMode: profile?.trackingMode.rawString
        )
    }

    /// Sauvegarde un lot de records en « last write wins » (`.allKeys`), découpé en chunks.
    /// Contourne volontairement le conflit `.ifServerRecordUnchanged` par défaut : la
    /// résolution de conflits est faite côté device (voir `mergeAction`).
    private func saveRecords(_ records: [CKRecord]) async throws {
        guard !records.isEmpty else { return }
        for chunk in records.chunked(into: 200) {
            let result = try await privateDB.modifyRecords(
                saving: chunk,
                deleting: [],
                savePolicy: .allKeys,
                atomically: false
            )
            for saveResult in result.saveResults.values {
                if case .failure(let error) = saveResult { throw error }
            }
        }
    }

    // MARK: - Download (Pull iCloud → local)

    /// Fetches all DailyLog records from iCloud (pagination complète via cursor).
    func fetchAllLogs() async throws -> [CKRecord] {
        var records: [CKRecord] = []
        var cursor: CKQueryOperation.Cursor?

        repeat {
            let result: (matchResults: [(CKRecord.ID, Result<CKRecord, Error>)], queryCursor: CKQueryOperation.Cursor?)
            if let currentCursor = cursor {
                result = try await privateDB.records(continuingMatchFrom: currentCursor)
            } else {
                let query = CKQuery(recordType: recordTypeDailyLog, predicate: NSPredicate(value: true))
                result = try await privateDB.records(matching: query)
            }
            records.append(contentsOf: result.matchResults.compactMap { try? $0.1.get() })
            cursor = result.queryCursor
        } while cursor != nil

        return records
    }

    /// Fetches user profile from iCloud.
    func fetchProfile() async throws -> CKRecord? {
        let recordID = CKRecord.ID(recordName: "profile_main", zoneID: .default)
        return try? await privateDB.record(for: recordID)
    }

    // MARK: - Record ⇄ model conversion

    /// Date d'upload du record (non chiffrée) — référence de fraîcheur distante.
    static func syncDate(of record: CKRecord) -> Date {
        (record["syncDate"] as? Date) ?? .distantPast
    }

    /// Reconstruit un `DailyLog` depuis un record CloudKit. nil si le record est inexploitable.
    static func dailyLog(from record: CKRecord) -> DailyLog? {
        guard let date = record.encryptedValues["date"] as? String else { return nil }

        func int(_ key: String) -> Int? {
            record.encryptedValues[key] as? Int
        }
        func uint8(_ key: String) -> UInt8? {
            guard let value = int(key) else { return nil }
            return UInt8(clamping: value)
        }

        return DailyLog(
            id: (record.encryptedValues["logId"] as? String) ?? UUID().uuidString,
            date: date,
            symptoms: (record.encryptedValues["symptoms"] as? [String]) ?? [],
            mood: uint8("mood"),
            energy: uint8("energy"),
            bbt: record.encryptedValues["bbt"] as? Double,
            lhTest: record.encryptedValues["lhTest"] as? String,
            cervicalMucus: record.encryptedValues["cervicalMucus"] as? String,
            sexualActivity: record.encryptedValues["sexualActivity"] as? String,
            flow: record.encryptedValues["flow"] as? String,
            sleepQuality: uint8("sleepQuality"),
            weightKg: record.encryptedValues["weightKg"] as? Double,
            notes: record.encryptedValues["notes"] as? String
        )
    }

    // MARK: - Defensive merge

    /// Compare deux logs sans tenir compte de l'id (identité locale, pas de contenu).
    static func logsEqual(_ a: DailyLog, _ b: DailyLog) -> Bool {
        a.date == b.date
            && a.symptoms.sorted() == b.symptoms.sorted()
            && a.mood == b.mood
            && a.energy == b.energy
            && approxEqual(a.bbt, b.bbt)
            && a.lhTest == b.lhTest
            && a.cervicalMucus == b.cervicalMucus
            && a.sexualActivity == b.sexualActivity
            && a.flow == b.flow
            && a.sleepQuality == b.sleepQuality
            && approxEqual(a.weightKg, b.weightKg)
            && a.notes == b.notes
    }

    private static func approxEqual(_ a: Double?, _ b: Double?) -> Bool {
        switch (a, b) {
        case (nil, nil): return true
        case let (x?, y?): return abs(x - y) < 0.0001
        default: return false
        }
    }

    /// Complète les champs VIDES du log local avec le distant ; ne remplace jamais une
    /// valeur locale existante. Retourne nil si rien à compléter.
    static func fillingMissing(local: DailyLog, from remote: DailyLog) -> DailyLog? {
        var merged = local
        var changed = false

        func fill<T>(_ keyPath: WritableKeyPath<DailyLog, T?>, _ value: T?) {
            if merged[keyPath: keyPath] == nil, let value = value {
                merged[keyPath: keyPath] = value
                changed = true
            }
        }

        fill(\.mood, remote.mood)
        fill(\.energy, remote.energy)
        fill(\.bbt, remote.bbt)
        fill(\.lhTest, remote.lhTest)
        fill(\.cervicalMucus, remote.cervicalMucus)
        fill(\.sexualActivity, remote.sexualActivity)
        fill(\.flow, remote.flow)
        fill(\.sleepQuality, remote.sleepQuality)
        fill(\.weightKg, remote.weightKg)
        fill(\.notes, remote.notes)

        if merged.symptoms.isEmpty && !remote.symptoms.isEmpty {
            merged.symptoms = remote.symptoms
            changed = true
        }

        return changed ? merged : nil
    }

    /// Décision de fusion pour une date donnée :
    /// - pas de log local → on adopte le distant ;
    /// - contenu identique → rien ;
    /// - écriture locale contemporaine connue → « last write wins » ;
    /// - récence locale inconnue (données antérieures au câblage) → complétion
    ///   des champs vides uniquement, jamais d'écrasement.
    static func mergeAction(
        remote: DailyLog,
        remoteSyncDate: Date,
        local: DailyLog?,
        localWriteDate: Date?
    ) -> MergeAction {
        guard let local = local else { return .applyRemote }
        if logsEqual(local, remote) { return .keepLocal }

        if let localWriteDate = localWriteDate {
            return remoteSyncDate > localWriteDate ? .applyRemote : .keepLocal
        }

        if let filled = fillingMissing(local: local, from: remote) {
            return .fillMissing(filled)
        }
        return .keepLocal
    }

    // MARK: - Full Sync

    /// Performs a full sync: pull + défensive merge (local d'abord), puis push de l'état local.
    /// Called when user enables iCloud toggle, at vault open, or when returning to foreground.
    /// Ne lève jamais : les erreurs finissent dans `syncStatus`.
    func performFullSync(engine: LunaEngine?) async {
        guard UserDefaults.standard.bool(forKey: Self.enabledKey), let engine = engine else { return }
        guard beginSync() else { return }
        defer { endSync() }

        await MainActor.run { self.syncStatus = .syncing }

        guard await checkAccountStatus() else {
            await MainActor.run { self.syncStatus = .noAccount }
            return
        }

        do {
            // 1) PULL — le merge défensif n'écrase jamais une donnée locale plus récente.
            let remoteRecords = try await fetchAllLogs()
            var remoteSyncDates: [String: Date] = [:]
            for record in remoteRecords {
                if let remoteLog = Self.dailyLog(from: record) {
                    remoteSyncDates[remoteLog.date] = Self.syncDate(of: record)
                }
            }
            _ = mergeRemoteLogs(remoteRecords, into: engine)

            let remoteProfile = try? await fetchProfile()
            mergeRemoteProfile(remoteProfile, into: engine)

            // 2) PUSH — état local complet, sauf les dates déjà à jour côté cloud
            //    (évite d'écraser un record distant plus récent et le spam d'uploads).
            let localLogs = (try? engine.getLogsRange(from: Self.earliestLogDate, to: Self.latestLogDate)) ?? []
            var logsToUpload: [DailyLog] = []
            for log in localLogs {
                if let remoteDate = remoteSyncDates[log.date] {
                    guard let localWrite = localWriteTime(for: log.date), localWrite > remoteDate else { continue }
                }
                logsToUpload.append(log)
            }
            try await uploadLogs(logsToUpload)
            try await pushProfile(engine: engine, remote: remoteProfile)

            await markSyncSuccess()
        } catch {
            await MainActor.run { self.syncStatus = Self.status(for: error) }
        }
    }

    /// Applique les records distants au vault local (merge défensif). Retourne le nombre
    /// de logs locaux effectivement écrits.
    @discardableResult
    func mergeRemoteLogs(_ records: [CKRecord], into engine: LunaEngine) -> Int {
        var applied = 0

        for record in records {
            guard let remoteLog = Self.dailyLog(from: record) else { continue }
            let remoteSyncDate = Self.syncDate(of: record)
            let localLog = try? engine.getLog(date: remoteLog.date)

            switch Self.mergeAction(
                remote: remoteLog,
                remoteSyncDate: remoteSyncDate,
                local: localLog,
                localWriteDate: localWriteTime(for: remoteLog.date)
            ) {
            case .keepLocal:
                continue

            case .applyRemote:
                var log = remoteLog
                if let localLog = localLog { log.id = localLog.id } // l'id local reste stable
                if (try? engine.logDay(log: log)) != nil {
                    applied += 1
                    bumpLocalWrite(date: log.date, at: remoteSyncDate)
                }

            case .fillMissing(let log):
                if (try? engine.logDay(log: log)) != nil {
                    applied += 1
                    bumpLocalWrite(date: log.date, at: remoteSyncDate)
                }
            }
        }

        return applied
    }

    /// Fusionne le profil distant : jamais d'écrasement si l'écriture locale est connue
    /// et plus récente. Si le profil local n'a jamais été écrit depuis le câblage, il
    /// n'est adopté que s'il est resté aux valeurs par défaut (installation neuve).
    func mergeRemoteProfile(_ record: CKRecord?, into engine: LunaEngine) {
        guard let record = record else { return }
        let remoteSyncDate = Self.syncDate(of: record)
        let localProfile = try? engine.getUserProfile()

        if let localWrite = profileWriteTime {
            guard remoteSyncDate > localWrite else { return }
        } else {
            guard let localProfile = localProfile, Self.isPristine(localProfile) else { return }
        }

        bumpProfileWrite(at: remoteSyncDate)

        if let modeString = record.encryptedValues["trackingMode"] as? String,
           var profile = localProfile {
            let mode = TrackingMode.from(modeString)
            if profile.trackingMode != mode {
                profile.trackingMode = mode
                try? engine.setUserProfile(profile: profile)
            }
        }

        if let name = record.encryptedValues["name"] as? String, !name.isEmpty,
           UserDefaults.standard.string(forKey: "user_name") != name {
            UserDefaults.standard.set(name, forKey: "user_name")
        }
    }

    /// Pousse le profil local si le cloud est vide ou si l'écriture locale est plus récente.
    private func pushProfile(engine: LunaEngine, remote: CKRecord?) async throws {
        if let remote = remote {
            let remoteSyncDate = Self.syncDate(of: remote)
            guard let localWrite = profileWriteTime, localWrite > remoteSyncDate else { return }
        }
        try await uploadProfile(engine: engine)
    }

    /// Profil resté aux valeurs par défaut du vault (aucune personnalisation).
    static func isPristine(_ profile: UserProfile) -> Bool {
        profile.trackingMode == .regular
            && profile.contraception == .none
            && profile.pillReminderTime == nil
            && profile.notifPeriod
            && !profile.notifFertile
            && !profile.notifPill
            && profile.edd == nil
            && !profile.calmMode
            && !profile.healthSync
    }

    // MARK: - Delete All (for panic wipe)

    /// Deletes all LUNA records from iCloud. Called during panic wipe.
    func deleteAllRecords() async {
        do {
            var recordIDs: [CKRecord.ID] = []

            var cursor: CKQueryOperation.Cursor?
            repeat {
                let result: (matchResults: [(CKRecord.ID, Result<CKRecord, Error>)], queryCursor: CKQueryOperation.Cursor?)
                if let currentCursor = cursor {
                    result = try await privateDB.records(continuingMatchFrom: currentCursor)
                } else {
                    let query = CKQuery(recordType: recordTypeDailyLog, predicate: NSPredicate(value: true))
                    result = try await privateDB.records(matching: query)
                }
                recordIDs.append(contentsOf: result.matchResults.compactMap { try? $0.1.get().recordID })
                cursor = result.queryCursor
            } while cursor != nil

            recordIDs.append(CKRecord.ID(recordName: "profile_main", zoneID: .default))

            for chunk in recordIDs.chunked(into: 200) {
                _ = try? await privateDB.modifyRecords(saving: [], deleting: chunk, atomically: false)
            }
        } catch {
            // Best effort — local wipe already done
        }
    }

    // MARK: - Local write timestamps (fusion)

    private var isSyncing: Bool {
        stateLock.lock()
        defer { stateLock.unlock() }
        return isSyncInFlight
    }

    private func beginSync() -> Bool {
        stateLock.lock()
        defer { stateLock.unlock() }
        if isSyncInFlight { return false }
        isSyncInFlight = true
        return true
    }

    private func endSync() {
        stateLock.lock()
        isSyncInFlight = false
        stateLock.unlock()
    }

    private func localWriteTime(for date: String) -> Date? {
        stateLock.lock()
        defer { stateLock.unlock() }
        return localWrites[date].map { Date(timeIntervalSince1970: $0) }
    }

    private func markLocalWrite(date: String, at value: Date) {
        bumpLocalWrite(date: date, at: value)
    }

    private func bumpLocalWrite(date: String, at value: Date) {
        stateLock.lock()
        let ts = value.timeIntervalSince1970
        if let existing = localWrites[date], existing >= ts {
            stateLock.unlock()
            return
        }
        localWrites[date] = ts
        let snapshot = localWrites
        stateLock.unlock()
        UserDefaults.standard.set(snapshot, forKey: Self.localWritesKey)
    }

    private var profileWriteTime: Date? {
        guard let ts = UserDefaults.standard.object(forKey: Self.profileWriteKey) as? Double else { return nil }
        return Date(timeIntervalSince1970: ts)
    }

    private func markProfileWrite(at value: Date) {
        bumpProfileWrite(at: value)
    }

    private func bumpProfileWrite(at value: Date) {
        let ts = value.timeIntervalSince1970
        if let existing = UserDefaults.standard.object(forKey: Self.profileWriteKey) as? Double, existing >= ts {
            return
        }
        UserDefaults.standard.set(ts, forKey: Self.profileWriteKey)
    }

    // MARK: - Status helpers

    private func markSyncSuccess() async {
        let now = Date()
        await MainActor.run {
            self.syncStatus = .success
            self.lastSyncDate = now
            UserDefaults.standard.set(now, forKey: Self.lastSyncKey)
            UserDefaults.standard.set(true, forKey: Self.hasSyncedKey)
        }
    }

    /// Erreurs réseau / compte → statut non bloquant.
    static func status(for error: Error) -> SyncStatus {
        if let ckError = error as? CKError, ckError.code == .notAuthenticated {
            return .noAccount
        }
        return .error
    }
}

// MARK: - Helpers

private extension Array {
    /// Découpe en lots (limites d'opération CloudKit).
    func chunked(into size: Int) -> [[Element]] {
        guard size > 0 else { return [self] }
        return stride(from: 0, to: count, by: size).map {
            Array(self[$0..<Swift.min($0 + size, count)])
        }
    }
}
