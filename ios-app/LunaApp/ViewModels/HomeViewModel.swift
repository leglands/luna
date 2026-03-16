import Foundation

// MARK: - HomeViewModel

@MainActor
final class HomeViewModel: ObservableObject {
    @Published var prediction: Prediction? = nil
    @Published var currentCycleDay: Int = 1
    @Published var currentPhase: String? = nil
    @Published var dailyInsight: String? = nil
    @Published var trackingMode: String = "regular"
    @Published var hasLoggedToday: Bool = false

    func load(engine: LunaEngine?) async {
        guard let engine else { return }
        do {
            let pred = try engine.predictNext()
            prediction = pred
            currentCycleDay = Int(pred.currentCycleDay)
            currentPhase = pred.currentPhase
        } catch {
            // No data yet — UI shows default state
        }
        if let profile = try? engine.getUserProfile() {
            self.trackingMode = profile.trackingMode.rawString
        }
        // Zeigarnik Effect : vérifier si un log existe pour aujourd'hui
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        let today = fmt.string(from: Date())
        hasLoggedToday = (try? engine.getLog(date: today)) != nil
    }
}
