import SwiftUI

@main
struct LunaApp: App {

    @StateObject private var appState = AppState()
    @Environment(\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
                .preferredColorScheme(appState.colorScheme)
                .onChange(of: scenePhase) { phase in
                    // Retour au premier plan → sync opt-in (best-effort, non bloquant).
                    if phase == .active {
                        ICloudSyncService.shared.syncIfEnabled(engine: appState.engine)
                    }
                }
        }
    }
}

// MARK: - AppState

/// État global de l'application — partagé via @EnvironmentObject.
/// Toutes les propriétés publiées déclenchent des re-renders SwiftUI.
final class AppState: ObservableObject {

    // ── Vault ──────────────────────────────────────────────────────────────
    /// Engine Rust (nil = vault verrouillé ou pas encore ouvert)
    @Published var engine: LunaEngine? = nil

    /// Alias pratique pour les vues qui vérifient si le vault est accessible
    var isVaultOpen: Bool {
        get { engine != nil }
        set { if !newValue { engine = nil } }
    }

    /// Vault verrouillé (inverse de isVaultOpen, conservé pour rétrocompatibilité)
    var isLocked: Bool { engine == nil }

    // ── Onboarding ─────────────────────────────────────────────────────────
    @Published var isOnboardingDone: Bool {
        didSet { defaults.set(isOnboardingDone, forKey: "onboarding_done") }
    }
    /// Alias pour RootView
    var isOnboardingComplete: Bool { isOnboardingDone }

    // ── Profil utilisateur ─────────────────────────────────────────────────
    @Published var userName: String? {
        didSet { defaults.set(userName, forKey: "user_name") }
    }
    @Published var lockEnabled: Bool {
        didSet { defaults.set(lockEnabled, forKey: "lock_enabled") }
    }
    @Published var colorScheme: ColorScheme? = nil

    // ── Mode Calme (psy a11y) ─────────────────────────────────────────────
    /// Calm mode: hides cycle predictions to reduce anxiety.
    /// Designed for users with anxiety, PTSD, or who find predictions triggering.
    @Published var calmMode: Bool {
        didSet { defaults.set(calmMode, forKey: "calm_mode") }
    }
    @Published var healthSyncEnabled: Bool = false
    @Published var hasSeenFeatureTour: Bool {
        didSet { defaults.set(hasSeenFeatureTour, forKey: "has_seen_feature_tour") }
    }

    // ── Données cycle (pour CalendarView) ──────────────────────────────────
    @Published var cycleEvents: [String: CycleEventType] = [:]

    // ── Stats (pour InsightsView) ──────────────────────────────────────────
    @Published var averageCycleLength: Double? = nil
    @Published var averagePeriodLength: Double? = nil
    @Published var cycleLengthHistory: [(Int, Int)] = []   // (cycle#, days)
    @Published var bbtHistory: [(String, Double)] = []     // (date, temp °C)
    @Published var symptomFrequencies: [(String, Double)] = []  // (symptom, 0-1)
    @Published var currentPhaseInsight: String? = nil       // dynamic insight key

    // ── Storage ────────────────────────────────────────────────────────────
    private let defaults = UserDefaults.standard

    /// Chemin absolu vers la base SQLite (dans le sandbox Documents de l'app).
    var dbPath: String { AppState.sharedDbPath }

    static var sharedDbPath: String {
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        return docs.appendingPathComponent("luna.db").path
    }

    init() {
        // Reset state for testing (must come before reading defaults)
        if ProcessInfo.processInfo.arguments.contains("-ResetState") {
            let domain = Bundle.main.bundleIdentifier ?? "com.macaron.luna"
            UserDefaults.standard.removePersistentDomain(forName: domain)
            UserDefaults.standard.synchronize()
            KeychainService.shared.deletePin()
            // Also remove vault database so fresh onboarding can create a new one
            try? FileManager.default.removeItem(atPath: AppState.sharedDbPath)
        }

        isOnboardingDone = defaults.bool(forKey: "onboarding_done")
        userName = defaults.string(forKey: "user_name")
        lockEnabled = defaults.bool(forKey: "lock_enabled")
        calmMode = defaults.bool(forKey: "calm_mode")
        hasSeenFeatureTour = defaults.bool(forKey: "has_seen_feature_tour")

        #if DEBUG
        // UI testing bypass: -UITesting argument auto-opens vault with PIN "123456"
        if ProcessInfo.processInfo.arguments.contains("-UITesting") {
            isOnboardingDone = true
            lockEnabled = false
            hasSeenFeatureTour = true // Skip tour in UI tests
            if userName == nil { userName = "Luna" }
            let dbPath = AppState.sharedDbPath
            let debugFile = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("luna_debug.txt")
            do {
                engine = try LunaEngine.openVault(dbPath: dbPath, pin: "123456")
                // Store PIN in Keychain so manual relaunch works too
                KeychainService.shared.storePin("123456")

                // Seed realistic data if requested
                if ProcessInfo.processInfo.arguments.contains("-SeedData") {
                    Self.seedRealisticData(engine: engine!)
                    try? "OK: vault opened + SEEDED at \(dbPath)".write(to: debugFile, atomically: true, encoding: .utf8)
                } else {
                    try? "OK: vault opened at \(dbPath)".write(to: debugFile, atomically: true, encoding: .utf8)
                }

                Task { await refreshCycleData() }
            } catch {
                try? "FAIL: \(error) at \(dbPath)".write(to: debugFile, atomically: true, encoding: .utf8)
            }
        }
        #endif
    }

    // ── Actions ────────────────────────────────────────────────────────────

    func openVault(pin: String) throws {
        engine = try LunaEngine.openVault(dbPath: dbPath, pin: pin)
        Task { await refreshCycleData() }
        ICloudSyncService.shared.syncIfEnabled(engine: engine)
    }

    func lock() {
        engine = nil
    }

    /// Recharge les événements cycle + stats depuis le Rust core.
    @MainActor
    func refreshCycleData() async {
        guard let engine else { return }

        // ── Cycle summary stats ──────────────────────────────────────────
        if let summary = try? engine.getCycleSummary() {
            averageCycleLength = summary.averageCycleLength
            averagePeriodLength = summary.averagePeriodLength
        }

        // ── Profile-driven state ─────────────────────────────────────────
        if let profile = try? engine.getUserProfile() {
            healthSyncEnabled = profile.healthSync
        }

        // ── Cycle length history (for bar chart) ─────────────────────────
        if let cycles = try? engine.getCycles(limit: 12) {
            var lengths: [(Int, Int)] = []
            let sorted = cycles.sorted { $0.startDate < $1.startDate }
            for (i, cycle) in sorted.enumerated() {
                if let endStr = cycle.endDate,
                   let start = Self.parseDate(cycle.startDate),
                   let end = Self.parseDate(endStr) {
                    let days = Calendar.current.dateComponents([.day], from: start, to: end).day ?? 28
                    lengths.append((i + 1, max(days, 1)))
                }
            }
            cycleLengthHistory = lengths
        }

        // ── BBT + Symptom data from recent logs ─────────────────────────
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        let today = Date()
        let from90 = Calendar.current.date(byAdding: .day, value: -90, to: today)!
        let fromStr = fmt.string(from: from90)
        let toStr = fmt.string(from: today)

        if let logs = try? engine.getLogsRange(from: fromStr, to: toStr) {
            // BBT: last 14 days with BBT data
            var bbtPoints: [(String, Double)] = []
            for log in logs {
                if let bbt = log.bbt, bbt > 0 {
                    // Short date label
                    let label = String(log.date.suffix(5)) // "MM-DD"
                    bbtPoints.append((label, bbt))
                }
            }
            bbtHistory = Array(bbtPoints.suffix(14))

            // Symptom frequencies: count each symptom across all logs
            var counts: [String: Int] = [:]
            let totalLogs = max(logs.count, 1)
            for log in logs {
                for symptom in log.symptoms {
                    counts[symptom, default: 0] += 1
                }
            }
            symptomFrequencies = counts
                .map { ($0.key, Double($0.value) / Double(totalLogs)) }
                .sorted { $0.1 > $1.1 }
                .prefix(5)
                .map { ($0.0, $0.1) }

            // Calendar events
            var events: [String: CycleEventType] = [:]
            for log in logs {
                if let flow = log.flow, ["light", "medium", "heavy", "spotting",
                    "flow_light", "flow_medium", "flow_heavy"].contains(flow) {
                    events[log.date] = .period
                } else {
                    events[log.date] = .logged
                }
            }
            cycleEvents = events
        }

        // ── Phase-based insight ──────────────────────────────────────────
        if let pred = try? engine.predictNext() {
            switch pred.currentPhase {
            case "menstrual": currentPhaseInsight = "insight_menstrual"
            case "follicular": currentPhaseInsight = "insight_follicular"
            case "ovulatory": currentPhaseInsight = "insight_ovulatory"
            case "luteal": currentPhaseInsight = "insight_luteal"
            default: currentPhaseInsight = nil
            }
        }
    }

    private static func parseDate(_ str: String) -> Date? {
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        return fmt.date(from: str)
    }

    // MARK: - Seed Realistic Data (DEBUG only)

    #if DEBUG
    /// Populates 6 months of realistic cycle data for UI testing.
    /// Launch with: -UITesting -ResetState -SeedData
    static func seedRealisticData(engine: LunaEngine) {
        let cal = Calendar.current
        let today = Date()
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"

        // ── User profile ─────────────────────────────────────────────────
        let profile = UserProfile(
            trackingMode: .regular,
            contraception: .none,
            pillReminderTime: "08:00",
            notifPeriod: true,
            notifFertile: true,
            notifPill: false,
            edd: nil,
            calmMode: false,
            healthSync: false
        )
        try? engine.setUserProfile(profile: profile)

        // ── 6 complete cycles (realistic variation) ──────────────────────
        let cycleLengths = [28, 30, 27, 29, 31, 28]
        let periodLengths = [5, 4, 5, 6, 4, 5]

        var cycleStart = cal.date(byAdding: .day, value: -180, to: today)!
        var cycles: [(id: String, start: Date, end: Date, periodLen: Int)] = []

        for i in 0..<6 {
            let cycleLen = cycleLengths[i]
            let periodLen = periodLengths[i]
            let cycleEnd = cal.date(byAdding: .day, value: cycleLen - 1, to: cycleStart)!

            let startStr = fmt.string(from: cycleStart)
            if let cycle = try? engine.startCycle(startDate: startStr) {
                let endStr = fmt.string(from: cycleEnd)
                try? engine.endCycle(cycleId: cycle.id, endDate: endStr)
                cycles.append((cycle.id, cycleStart, cycleEnd, periodLen))
            }

            cycleStart = cal.date(byAdding: .day, value: cycleLen, to: cycleStart)!
        }

        // ── Daily logs for each cycle ────────────────────────────────────
        let menstrualSymptoms = ["cramps", "fatigue", "bloating", "lower_back_pain", "headache"]
        let pmsSymptoms = ["breast_tenderness", "irritability", "low_mood", "water_retention", "acne", "cravings_sweet"]
        let ovulatorySymptoms = ["high_energy", "high_libido", "mittelschmerz", "glowing_skin"]
        let follicularSymptoms = ["motivation", "high_energy"]
        let generalSymptoms = ["poor_sleep", "high_stress", "dizziness"]

        let flows = ["heavy", "heavy", "medium", "light", "spotting"]

        for cycle in cycles {
            let cycleLen = cal.dateComponents([.day], from: cycle.start, to: cycle.end).day! + 1

            for dayOffset in 0..<cycleLen {
                guard let date = cal.date(byAdding: .day, value: dayOffset, to: cycle.start) else { continue }
                // Skip future dates
                if date > today { break }

                let dateStr = fmt.string(from: date)
                let day1 = dayOffset + 1

                // Phase-appropriate data
                var symptoms: [String] = []
                var flow: String? = nil
                var mood: UInt8 = 3
                var energy: UInt8 = 3
                var sleepQuality: UInt8 = 3
                var bbt: Double? = nil
                var cervicalMucus: String? = nil
                var lhTest: String? = nil

                if day1 <= cycle.periodLen {
                    // Menstrual phase
                    flow = day1 <= flows.count ? flows[day1 - 1] : "spotting"
                    symptoms = Array(menstrualSymptoms.prefix(Int.random(in: 2...4)))
                    mood = UInt8.random(in: 2...3)
                    energy = UInt8.random(in: 1...3)
                    sleepQuality = UInt8.random(in: 2...4)
                    bbt = 36.2 + Double.random(in: -0.1...0.15)
                    cervicalMucus = "dry"

                } else if day1 <= 13 {
                    // Follicular phase
                    symptoms = Array(follicularSymptoms.prefix(Int.random(in: 0...2)))
                    mood = UInt8.random(in: 3...5)
                    energy = UInt8.random(in: 3...5)
                    sleepQuality = UInt8.random(in: 3...5)
                    bbt = 36.3 + Double.random(in: -0.1...0.1)
                    cervicalMucus = day1 < 10 ? "sticky" : "creamy"

                } else if day1 <= 16 {
                    // Ovulatory phase
                    symptoms = Array(ovulatorySymptoms.prefix(Int.random(in: 1...3)))
                    mood = UInt8.random(in: 4...5)
                    energy = UInt8.random(in: 4...5)
                    sleepQuality = UInt8.random(in: 3...5)
                    bbt = 36.6 + Double.random(in: 0.1...0.4)
                    cervicalMucus = "egg_white"
                    lhTest = day1 == 14 ? "peak" : "positive"

                } else {
                    // Luteal phase
                    let daysBeforePeriod = cycleLen - day1
                    if daysBeforePeriod <= 5 {
                        symptoms = Array(pmsSymptoms.prefix(Int.random(in: 2...4)))
                    }
                    if Int.random(in: 0...3) == 0 {
                        symptoms.append(generalSymptoms.randomElement()!)
                    }
                    mood = UInt8.random(in: 2...4)
                    energy = UInt8.random(in: 2...4)
                    sleepQuality = UInt8.random(in: 2...4)
                    bbt = 36.5 + Double.random(in: 0.1...0.4)
                    cervicalMucus = "sticky"
                }

                // Round BBT to 1 decimal
                if let b = bbt { bbt = (b * 10).rounded() / 10 }

                // Weight with slight variation
                let weight = 62.0 + Double.random(in: -1.5...1.5)

                let log = DailyLog(
                    id: UUID().uuidString,
                    date: dateStr,
                    symptoms: symptoms,
                    mood: mood,
                    energy: energy,
                    bbt: bbt,
                    lhTest: lhTest,
                    cervicalMucus: cervicalMucus,
                    sexualActivity: Int.random(in: 0...5) == 0 ? "protected" : nil,
                    flow: flow,
                    sleepQuality: sleepQuality,
                    weightKg: (weight * 10).rounded() / 10,
                    notes: nil
                )
                try? engine.logDay(log: log)
            }
        }

        // ── 7th cycle: CURRENT (open, no end_date) ─────────────────────
        // Starts right after cycle 6 ends, so today falls mid-cycle
        let currentCycleStart = cycleStart // this is where cycle 7 would start
        let currentStartStr = fmt.string(from: currentCycleStart)
        let currentCycle = try? engine.startCycle(startDate: currentStartStr)
        // Don't end it — this is the active cycle

        // Log days for the current cycle up to today
        if currentCycle != nil {
            let daysSinceStart = cal.dateComponents([.day], from: currentCycleStart, to: today).day ?? 0
            let currentPeriodLen = 5

            for dayOffset in 0...daysSinceStart {
                guard let date = cal.date(byAdding: .day, value: dayOffset, to: currentCycleStart) else { continue }
                let dateStr = fmt.string(from: date)
                let day1 = dayOffset + 1

                var symptoms: [String] = []
                var flow: String? = nil
                var mood: UInt8 = 3
                var energy: UInt8 = 3
                var sleepQuality: UInt8 = 3
                var bbt: Double? = nil

                if day1 <= currentPeriodLen {
                    flow = day1 <= flows.count ? flows[day1 - 1] : "spotting"
                    symptoms = Array(menstrualSymptoms.prefix(Int.random(in: 2...4)))
                    mood = UInt8.random(in: 2...3)
                    energy = UInt8.random(in: 1...3)
                    bbt = 36.2 + Double.random(in: -0.1...0.15)
                } else if day1 <= 13 {
                    symptoms = Array(follicularSymptoms.prefix(Int.random(in: 0...2)))
                    mood = UInt8.random(in: 3...5)
                    energy = UInt8.random(in: 3...5)
                    bbt = 36.3 + Double.random(in: -0.1...0.1)
                } else {
                    symptoms = Array(ovulatorySymptoms.prefix(Int.random(in: 1...3)))
                    mood = UInt8.random(in: 4...5)
                    energy = UInt8.random(in: 4...5)
                    bbt = 36.6 + Double.random(in: 0.1...0.4)
                }

                if let b = bbt { bbt = (b * 10).rounded() / 10 }

                let log = DailyLog(
                    id: UUID().uuidString,
                    date: dateStr,
                    symptoms: symptoms,
                    mood: mood,
                    energy: energy,
                    bbt: bbt,
                    lhTest: nil,
                    cervicalMucus: nil,
                    sexualActivity: nil,
                    flow: flow,
                    sleepQuality: sleepQuality,
                    weightKg: (62.0 + Double.random(in: -1.0...1.0) * 10).rounded() / 10,
                    notes: nil
                )
                try? engine.logDay(log: log)
            }
        }

        let totalDays = cal.dateComponents([.day], from: cal.date(byAdding: .day, value: -180, to: today)!, to: today).day ?? 0
        NSLog("[LUNA SEED] ✅ Seeded 6 complete cycles + 1 current cycle + ~\(totalDays) daily logs")
    }
    #endif
}
