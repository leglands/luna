import SwiftUI

@main
struct LunaApp: App {

    @StateObject private var appState = AppState()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
                .preferredColorScheme(appState.colorScheme)
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

        #if DEBUG
        // UI testing bypass: -UITesting argument auto-opens vault with PIN "123456"
        if ProcessInfo.processInfo.arguments.contains("-UITesting") {
            isOnboardingDone = true
            lockEnabled = false
            if userName == nil { userName = "Luna" }
            let dbPath = AppState.sharedDbPath
            let debugFile = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("luna_debug.txt")
            do {
                engine = try LunaEngine.openVault(dbPath: dbPath, pin: "123456")
                // Store PIN in Keychain so manual relaunch works too
                KeychainService.shared.storePin("123456")
                try? "OK: vault opened at \(dbPath)".write(to: debugFile, atomically: true, encoding: .utf8)
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
}
