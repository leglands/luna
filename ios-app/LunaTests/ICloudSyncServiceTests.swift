import XCTest
import CloudKit
@testable import LunaApp

/// Tests de la fusion défensive d'ICloudSyncService (F25) + conversion CKRecord ⇄ DailyLog.
/// Aucun compte iCloud n'est requis : la fusion est testée hors réseau.
final class ICloudSyncServiceTests: XCTestCase {

    // MARK: - Helpers

    private func makeLog(
        id: String = "id-1",
        date: String = "2026-10-03",
        symptoms: [String] = [],
        mood: UInt8? = nil,
        energy: UInt8? = nil,
        bbt: Double? = nil,
        lhTest: String? = nil,
        cervicalMucus: String? = nil,
        sexualActivity: String? = nil,
        flow: String? = nil,
        sleepQuality: UInt8? = nil,
        weightKg: Double? = nil,
        notes: String? = nil
    ) -> DailyLog {
        DailyLog(
            id: id,
            date: date,
            symptoms: symptoms,
            mood: mood,
            energy: energy,
            bbt: bbt,
            lhTest: lhTest,
            cervicalMucus: cervicalMucus,
            sexualActivity: sexualActivity,
            flow: flow,
            sleepQuality: sleepQuality,
            weightKg: weightKg,
            notes: notes
        )
    }

    override func setUp() {
        super.setUp()
        // Hygiene : aucun test ne doit dépendre d'un run précédent, ni tenter de réseau.
        UserDefaults.standard.removeObject(forKey: "icloud_local_writes")
        UserDefaults.standard.removeObject(forKey: "icloud_profile_write")
        UserDefaults.standard.set(false, forKey: ICloudSyncService.enabledKey)
    }

    private func makeTempEngine() throws -> (LunaEngine, String) {
        let dbPath = NSTemporaryDirectory() + "luna_sync_test_\(UUID().uuidString).db"
        let engine = try LunaEngine.openVault(dbPath: dbPath, pin: "123456")
        return (engine, dbPath)
    }

    private func cleanup(_ dbPath: String) {
        try? FileManager.default.removeItem(atPath: dbPath)
        try? FileManager.default.removeItem(atPath: dbPath + ".salt")
    }

    // MARK: - mergeAction

    func testMergeAction_noLocal_appliesRemote() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(notes: "remote"),
            remoteSyncDate: Date(),
            local: nil,
            localWriteDate: nil
        )
        XCTAssertEqual(action, .applyRemote)
    }

    func testMergeAction_remoteNewer_appliesRemote() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(mood: 5),
            remoteSyncDate: Date(timeIntervalSince1970: 2000),
            local: makeLog(mood: 2),
            localWriteDate: Date(timeIntervalSince1970: 1000)
        )
        XCTAssertEqual(action, .applyRemote)
    }

    func testMergeAction_localNewer_keepsLocal() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(mood: 5),
            remoteSyncDate: Date(timeIntervalSince1970: 1000),
            local: makeLog(mood: 2),
            localWriteDate: Date(timeIntervalSince1970: 2000)
        )
        XCTAssertEqual(action, .keepLocal)
    }

    func testMergeAction_identicalContent_keepsLocal() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(id: "b", mood: 3, notes: "same"),
            remoteSyncDate: Date(),
            local: makeLog(id: "a", mood: 3, notes: "same"),
            localWriteDate: nil
        )
        XCTAssertEqual(action, .keepLocal)
    }

    func testMergeAction_unknownLocalWrite_fillsOnlyMissingFields() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(mood: 2, bbt: 36.6, notes: "from cloud"),
            remoteSyncDate: Date(),
            local: makeLog(mood: 4),
            localWriteDate: nil
        )
        guard case .fillMissing(let merged) = action else {
            return XCTFail("attendu .fillMissing, obtenu \(action)")
        }
        XCTAssertEqual(merged.mood, 4, "une valeur locale ne doit jamais être écrasée")
        XCTAssertEqual(merged.notes, "from cloud", "les champs vides doivent être complétés")
        XCTAssertEqual(merged.bbt, 36.6)
    }

    func testMergeAction_unknownLocalWrite_conflictingComplete_keepsLocal() {
        let action = ICloudSyncService.mergeAction(
            remote: makeLog(notes: "remote note"),
            remoteSyncDate: Date(),
            local: makeLog(notes: "local note"),
            localWriteDate: nil
        )
        XCTAssertEqual(action, .keepLocal, "sans horodatage, jamais d'écrasement d'une valeur locale")
    }

    // MARK: - fillingMissing

    func testFillingMissing_returnsNilWhenNothingToFill() {
        let merged = ICloudSyncService.fillingMissing(
            local: makeLog(symptoms: ["cramps"], mood: 3),
            from: makeLog(symptoms: ["fatigue"], mood: 1)
        )
        XCTAssertNil(merged)
    }

    func testFillingMissing_fillsEmptyFieldsAndSymptoms() {
        let merged = ICloudSyncService.fillingMissing(
            local: makeLog(),
            from: makeLog(symptoms: ["fatigue"], sleepQuality: 4)
        )
        XCTAssertEqual(merged?.symptoms, ["fatigue"])
        XCTAssertEqual(merged?.sleepQuality, 4)
    }

    // MARK: - logsEqual

    func testLogsEqual_ignoresIdAndSymptomOrder() {
        XCTAssertTrue(ICloudSyncService.logsEqual(
            makeLog(id: "a", symptoms: ["cramps", "fatigue"]),
            makeLog(id: "b", symptoms: ["fatigue", "cramps"])
        ))
    }

    func testLogsEqual_detectsDifferences() {
        XCTAssertFalse(ICloudSyncService.logsEqual(makeLog(mood: 1), makeLog(mood: 2)))
        XCTAssertFalse(ICloudSyncService.logsEqual(makeLog(bbt: 36.4), makeLog(bbt: 36.7)))
    }

    // MARK: - CKRecord conversion

    func testRecordConversion_roundtrip() {
        let log = makeLog(
            date: "2026-10-01",
            symptoms: ["cramps"],
            mood: 4,
            energy: 3,
            bbt: 36.6,
            lhTest: "peak",
            cervicalMucus: "egg_white",
            sexualActivity: "protected",
            flow: "medium",
            sleepQuality: 4,
            weightKg: 62.5,
            notes: "note"
        )
        let record = ICloudSyncService.shared.makeRecord(for: log)
        XCTAssertEqual(record.recordID.recordName, "log_2026-10-01")

        guard let decoded = ICloudSyncService.dailyLog(from: record) else {
            return XCTFail("conversion retour impossible")
        }
        XCTAssertTrue(ICloudSyncService.logsEqual(log, decoded))
        XCTAssertEqual(decoded.id, log.id)
        XCTAssertLessThan(abs(ICloudSyncService.syncDate(of: record).timeIntervalSinceNow), 5)
    }

    func testRecordConversion_missingDate_returnsNil() {
        let record = CKRecord(recordType: "DailyLog", recordID: CKRecord.ID(recordName: "no_date"))
        XCTAssertNil(ICloudSyncService.dailyLog(from: record))
    }

    // MARK: - Fusion dans le vault (moteur Rust)

    func testMergeRemoteLogs_insertsMissingLogIntoVault() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        let record = ICloudSyncService.shared.makeRecord(for: makeLog(date: "2026-09-15", mood: 3, notes: "cloud"))
        let applied = ICloudSyncService.shared.mergeRemoteLogs([record], into: engine)

        XCTAssertEqual(applied, 1)
        let stored = try engine.getLog(date: "2026-09-15")
        XCTAssertEqual(stored?.notes, "cloud")
        XCTAssertEqual(stored?.mood, 3)
    }

    func testMergeRemoteLogs_completesWithoutOverwritingLocal() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        try engine.logDay(log: makeLog(date: "2026-09-16", mood: 5))
        let record = ICloudSyncService.shared.makeRecord(for: makeLog(date: "2026-09-16", mood: 1, notes: "remplissage"))
        _ = ICloudSyncService.shared.mergeRemoteLogs([record], into: engine)

        let stored = try engine.getLog(date: "2026-09-16")
        XCTAssertEqual(stored?.mood, 5, "une valeur locale ne doit jamais être écrasée")
        XCTAssertEqual(stored?.notes, "remplissage", "les champs vides doivent être complétés")
    }

    func testMergeRemoteLogs_localWriteNewer_keepsLocalContent() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        let localLog = makeLog(date: "2026-09-17", mood: 5)
        try engine.logDay(log: localLog)
        ICloudSyncService.shared.logDidWrite(localLog) // horodate l'écriture locale à maintenant

        let remoteRecord = ICloudSyncService.shared.makeRecord(for: makeLog(date: "2026-09-17", mood: 1))
        remoteRecord["syncDate"] = Date(timeIntervalSince1970: 1000) as CKRecordValue // distant plus vieux

        _ = ICloudSyncService.shared.mergeRemoteLogs([remoteRecord], into: engine)
        XCTAssertEqual(try engine.getLog(date: "2026-09-17")?.mood, 5)
    }

    func testMergeRemoteLogs_remoteNewer_replacesLocal() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        let localLog = makeLog(date: "2026-09-18", mood: 5)
        try engine.logDay(log: localLog)
        ICloudSyncService.shared.logDidWrite(localLog)

        let remoteRecord = ICloudSyncService.shared.makeRecord(for: makeLog(date: "2026-09-18", mood: 1))
        remoteRecord["syncDate"] = Date().addingTimeInterval(3600) as CKRecordValue // distant plus récent

        _ = ICloudSyncService.shared.mergeRemoteLogs([remoteRecord], into: engine)
        XCTAssertEqual(try engine.getLog(date: "2026-09-18")?.mood, 1)
    }

    // MARK: - Profil

    func testIsPristine_defaultProfile() {
        let profile = UserProfile(
            trackingMode: .regular, contraception: .none, pillReminderTime: nil,
            notifPeriod: true, notifFertile: false, notifPill: false,
            edd: nil, calmMode: false, healthSync: false
        )
        XCTAssertTrue(ICloudSyncService.isPristine(profile))
    }

    func testIsPristine_customizedProfile_isNotPristine() {
        let profile = UserProfile(
            trackingMode: .ttc, contraception: .none, pillReminderTime: nil,
            notifPeriod: true, notifFertile: false, notifPill: false,
            edd: nil, calmMode: false, healthSync: false
        )
        XCTAssertFalse(ICloudSyncService.isPristine(profile))
    }

    func testMergeRemoteProfile_appliesWhenLocalPristine() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        let record = CKRecord(recordType: "UserProfile", recordID: CKRecord.ID(recordName: "profile_main"))
        record.encryptedValues["trackingMode"] = "ttc" as CKRecordValue
        record["syncDate"] = Date() as CKRecordValue

        ICloudSyncService.shared.mergeRemoteProfile(record, into: engine)
        XCTAssertEqual(try engine.getUserProfile().trackingMode, .ttc)
    }

    func testMergeRemoteProfile_doesNotOverwriteCustomizedLocalProfile() throws {
        let (engine, dbPath) = try makeTempEngine()
        defer { cleanup(dbPath) }

        var profile = try engine.getUserProfile()
        profile.trackingMode = .pregnant
        try engine.setUserProfile(profile: profile)

        let record = CKRecord(recordType: "UserProfile", recordID: CKRecord.ID(recordName: "profile_main"))
        record.encryptedValues["trackingMode"] = "ttc" as CKRecordValue
        record["syncDate"] = Date().addingTimeInterval(3600) as CKRecordValue

        // Récence locale inconnue (pas d'horodatage) → profil local personnalisé protégé.
        UserDefaults.standard.removeObject(forKey: "icloud_profile_write")
        ICloudSyncService.shared.mergeRemoteProfile(record, into: engine)
        XCTAssertEqual(try engine.getUserProfile().trackingMode, .pregnant)
    }

    // MARK: - Mapping d'erreurs

    func testStatusMapping_notAuthenticated_isNoAccount() {
        let error = CKError(_nsError: NSError(
            domain: CKError.errorDomain,
            code: CKError.Code.notAuthenticated.rawValue
        ))
        XCTAssertEqual(ICloudSyncService.status(for: error), .noAccount)
    }

    func testStatusMapping_networkError_isError() {
        let error = CKError(_nsError: NSError(
            domain: CKError.errorDomain,
            code: CKError.Code.networkUnavailable.rawValue
        ))
        XCTAssertEqual(ICloudSyncService.status(for: error), .error)
    }
}
