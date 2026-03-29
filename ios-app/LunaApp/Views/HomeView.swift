// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: HomeView (S03)                                       │
// │ Personas: P1 (Emma), P2 (Sarah), P4 (Nathalie)             │
// │ Features: F03 (Dashboard), F06 (Predictions)                │
// │ CRUD: R                                                      │
// │ RBAC: owner (vault_open required)                            │
// │ User Stories: US03, US06                                     │
// │ Why: Cycle dashboard — day count, prediction, week strip, CTA│
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import LifeDS

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: HomeView · Personas: P1,P2,P4 · Features: F03,F06
// │ CRUD: Read · RBAC: owner (vault_open) · Stories: US03,US06
// │ Why: Central dashboard — cycle day, prediction, week strip
// └─────────────────────────────────────────────────────────┘

struct HomeView: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var vm = HomeViewModel()
    @State private var showLogSheet = false
    @State private var showPregnancyLog = false
    @State private var showUndoToast = false
    @State private var undoAction: (() -> Void)? = nil
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @StateObject private var themeManager = ThemeManager()

    private var phaseAwareMessage: String {
        guard let phase = vm.currentPhase else { return "" }
        return DSEmpathicMessages.greeting(hour: Calendar.current.component(.hour, from: Date()))
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: DSSpacing.space6) {
                    if appState.calmMode {
                        CalmModeBanner()
                            .padding(.horizontal)
                    } else {
                        CycleProgressRing(prediction: vm.prediction, currentDay: vm.currentCycleDay, periodLength: appState.averagePeriodLength.map { Int($0) })
                            .padding(.horizontal)

                        WeekStripView(prediction: vm.prediction)
                            .padding(.horizontal)
                    }

                    if let phase = vm.currentPhase {
                        DSEmpathyBanner(
                            message: phaseAwareMessage.isEmpty ? NSLocalizedString("phase_\(phase)", comment: "") : phaseAwareMessage,
                            category: empathyCategory(for: phase),
                            accentColor: phaseColor(for: phase)
                        ) { }
                        .padding(.horizontal)
                    }

                    if vm.trackingMode == "ttc" {
                        DSCrossPromoCard<LunaBrand>(
                            targetAppName: "Aura",
                            targetBrandColor: Color(hex: 0xC86B5A),
                            icon: "heart.circle",
                            title: String(localized: "cross_promo.luna_to_aura_ttc.title"),
                            message: String(localized: "cross_promo.luna_to_aura_ttc.body"),
                            ctaLabel: String(localized: "cross_promo.luna_to_aura_ttc.cta"),
                            mode: themeManager.effectiveMode(),
                            onAction: { },
                            onDismiss: { }
                        )
                        .padding(.horizontal)
                    }

                    QuickLogActions(
                        onLogPeriod: { showLogSheet = true },
                        onLogSymptoms: { showLogSheet = true },
                        onLogTemp: { showLogSheet = true },
                        onLogMood: { showLogSheet = true }
                    )
                    .padding(.horizontal)

                    if let insight = vm.dailyInsight {
                        InsightCard(text: insight)
                            .padding(.horizontal)
                    }

                    DSMedicalDisclaimer(mode: themeManager.effectiveMode())
                        .padding(.horizontal)

                    Spacer(minLength: 80)
                }
                .padding(.top, DSSpacing.space4)
            }
            .navigationTitle("nav_today")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    DSPrivacyBadge(mode: themeManager.effectiveMode())
                }
            }
            .overlay(alignment: .bottom) {
                DSPebbleButton<LunaBrand>(
                    "log_today_button",
                    icon: "plus.circle.fill",
                    style: .primary
                ) {
                    showLogSheet = true
                }
                .padding(.horizontal, DSSpacing.space6)
                .padding(.bottom, DSSpacing.space4)
            }
            .sheet(isPresented: $showLogSheet) {
                LogSheetView(date: Date()) { undo in
                    undoAction = undo
                    showUndoToast = true
                    Task {
                        await vm.load(engine: appState.engine)
                        await appState.refreshCycleData()
                    }
                }
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.visible)
            }
            .sheet(isPresented: $showPregnancyLog) {
                PregnancyLogSheet(date: Date())
                    .presentationDetents([.large])
                    .environmentObject(appState)
            }
            .undoToast(isPresented: $showUndoToast, message: NSLocalizedString("undo_log_saved", comment: "")) {
                undoAction?()
                undoAction = nil
                Task { await vm.load(engine: appState.engine) }
            }
            .task {
                await vm.load(engine: appState.engine)
            }
        }
    }

    private func empathyCategory(for phase: String) -> EmpathyCategory {
        switch phase {
        case "menstrual": return .encouragement
        case "follicular": return .tip
        case "ovulatory": return .celebration
        case "luteal": return .milestone
        default: return .encouragement
        }
    }

    private func phaseColor(for phase: String) -> Color {
        switch phase {
        case "menstrual": return LunaBrand.phaseMenstruation
        case "follicular": return LunaBrand.phaseFollicular
        case "ovulatory": return LunaBrand.phaseOvulation
        case "luteal": return LunaBrand.phaseLuteal
        default: return LunaBrand.primary
        }
    }
}

// MARK: - CalmModeBanner

private struct CalmModeBanner: View {
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: "leaf.fill")
                .foregroundStyle(Color("AccentSuccess"))
                .accessibilityHidden(true)
            VStack(alignment: .leading, spacing: 2) {
                Text("home_calm_no_prediction")
                    .font(.subheadline)
                    .foregroundStyle(.primary)
            }
            Spacer()
        }
        .padding(14)
        .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 12))
        .accessibilityLabel(Text("home_calm_no_prediction"))
    }
}

// MARK: - Quick Log Actions

private struct QuickLogActions: View {
    let onLogPeriod: () -> Void
    let onLogSymptoms: () -> Void
    let onLogTemp: () -> Void
    let onLogMood: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.space3) {
            Text("quick_log_title")
                .font(DSTypography.headline)
                .foregroundStyle(ThemeColors.textPrimary(for: .light))

            HStack(spacing: DSSpacing.space4) {
                DSPebbleAction(
                    icon: "drop.fill",
                    label: NSLocalizedString("log_period", comment: ""),
                    color: LunaBrand.phaseMenstruation,
                    isActive: false,
                    action: onLogPeriod
                )

                DSPebbleAction(
                    icon: "list.bullet.clipboard",
                    label: NSLocalizedString("log_symptoms", comment: ""),
                    color: LunaBrand.phaseFollicular,
                    isActive: false,
                    action: onLogSymptoms
                )

                DSPebbleAction(
                    icon: "thermometer",
                    label: NSLocalizedString("log_temp", comment: ""),
                    color: LunaBrand.phaseLuteal,
                    isActive: false,
                    action: onLogTemp
                )

                DSPebbleAction(
                    icon: "face.smiling",
                    label: NSLocalizedString("log_mood", comment: ""),
                    color: LunaBrand.accent,
                    isActive: false,
                    action: onLogMood
                )
            }
        }
    }
}

// MARK: - Cycle Progress Ring (DS SegmentedRing)

struct CycleProgressRing: View {
    let prediction: Prediction?
    let currentDay: Int
    var periodLength: Int?

    private static let isoFmt: ISO8601DateFormatter = {
        let f = ISO8601DateFormatter(); f.formatOptions = [.withFullDate]; return f
    }()

    private var segments: [(value: Double, color: Color, label: String)] {
        guard let p = prediction else { return [] }
        let cycleLen = max(cycleLength(p), 20)
        let menEnd = min(Double(periodLength ?? Int(p.currentCycleDay)) / Double(cycleLen), 1.0)
        let folEnd = min(Double(fertileStartDay(p)) / Double(cycleLen), 1.0)
        let ferEnd = min(Double(fertileEndDay(p)) / Double(cycleLen), 1.0)
        return [
            (menEnd, LunaBrand.phaseMenstruation, NSLocalizedString("phase_menstrual", comment: "")),
            (folEnd - menEnd, LunaBrand.phaseFollicular, NSLocalizedString("phase_follicular", comment: "")),
            (ferEnd - folEnd, LunaBrand.phaseOvulation, NSLocalizedString("phase_ovulatory", comment: "")),
            (1.0 - ferEnd, LunaBrand.phaseLuteal, NSLocalizedString("phase_luteal", comment: ""))
        ]
    }

    private var centerText: String {
        "\(currentDay)"
    }

    private var centerSubtext: String {
        guard let p = prediction else { return "" }
        return phaseLabel(p)
    }

    var body: some View {
        DSCard(mode: .light) {
            VStack(spacing: DSSpacing.space3) {
                if let prediction {
                    DSSegmentedRing(
                        segments: segments,
                        currentIndex: currentSegmentIndex,
                        centerText: centerText,
                        centerSubtext: centerSubtext,
                        size: 180
                    )

                    Text("next_period_in \(daysUntilNext(prediction))")
                        .font(DSTypography.body)
                        .foregroundStyle(ThemeColors.textSecondary(for: .light))
                } else {
                    VStack(spacing: DSSpacing.space2) {
                        Image(systemName: "circle.dashed")
                            .font(.system(size: 48))
                            .foregroundStyle(ThemeColors.textSecondary(for: .light))
                        Text("cycle_no_data")
                            .font(DSTypography.body)
                            .foregroundStyle(ThemeColors.textSecondary(for: .light))
                    }
                    .frame(height: 180)
                }
            }
        }
        .accessibilityElement(children: .combine)
    }

    private var currentSegmentIndex: Int {
        guard let p = prediction else { return 0 }
        let cycleLen = max(cycleLength(p), 20)
        let dayRatio = Double(currentDay) / Double(cycleLen)
        var cumulative: Double = 0
        for (index, segment) in segments.enumerated() {
            cumulative += segment.value
            if dayRatio <= cumulative {
                return index
            }
        }
        return 0
    }

    private func daysDiff(to isoString: String) -> Int {
        guard let target = Self.isoFmt.date(from: isoString) else { return 0 }
        return Calendar.current.dateComponents([.day], from: .now, to: target).day ?? 0
    }

    private func cycleLength(_ p: Prediction) -> Int {
        max(currentDay + max(daysUntilNext(p), 1), 20)
    }

    private func fertileStartDay(_ p: Prediction) -> Int {
        max(currentDay + daysDiff(to: p.fertileWindowStart), 1)
    }

    private func fertileEndDay(_ p: Prediction) -> Int {
        max(currentDay + daysDiff(to: p.fertileWindowEnd), fertileStartDay(p))
    }

    private func ovulationCycleDay(_ p: Prediction) -> Double? {
        guard let ov = p.ovulationDay else { return nil }
        let d = Double(currentDay + daysDiff(to: ov))
        return d > 0 ? d / Double(cycleLength(p)) : nil
    }

    private func phaseLabel(_ p: Prediction) -> String {
        switch p.currentPhase {
        case "menstrual": return NSLocalizedString("phase_menstrual", comment: "")
        case "follicular": return NSLocalizedString("phase_follicular", comment: "")
        case "ovulatory": return NSLocalizedString("phase_ovulatory", comment: "")
        case "luteal": return NSLocalizedString("phase_luteal", comment: "")
        default: return ""
        }
    }

    private func daysUntilNext(_ p: Prediction) -> Int {
        daysDiff(to: p.nextPeriodStart)
    }
}

// MARK: - WeekStripView

struct WeekStripView: View {
    let prediction: Prediction?
    @EnvironmentObject var appState: AppState

    private var weekDays: [Date] {
        let cal = Calendar.current
        let today = Date()
        return (-3...3).compactMap { cal.date(byAdding: .day, value: $0, to: today) }
    }

    private let dateFmt: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "yyyy-MM-dd"
        return f
    }()

    private let dayFmt: DateFormatter = {
        let f = DateFormatter()
        f.dateFormat = "EEE"
        return f
    }()

    var body: some View {
        HStack(spacing: 0) {
            ForEach(weekDays, id: \.self) { day in
                let key = dateFmt.string(from: day)
                let isToday = Calendar.current.isDateInToday(day)
                let event = appState.cycleEvents[key]

                VStack(spacing: 4) {
                    Text(dayFmt.string(from: day).prefix(2).uppercased())
                        .font(.system(size: 10, weight: .medium))
                        .foregroundStyle(.secondary)

                    Text("\(Calendar.current.component(.day, from: day))")
                        .font(.system(size: 14, weight: isToday ? .bold : .regular))
                        .foregroundStyle(isToday ? Color("AccentPrimary") : .primary)
                        .frame(width: 32, height: 32)
                        .background {
                            if isToday {
                                Circle().fill(Color("AccentPrimary").opacity(0.12))
                            }
                        }

                    Circle()
                        .fill(dotColor(for: event))
                        .frame(width: 6, height: 6)
                        .opacity(event != nil ? 1 : 0)
                }
                .frame(maxWidth: .infinity)
                .accessibilityElement(children: .combine)
            }
        }
        .padding(.vertical, 8)
        .padding(.horizontal, 12)
        .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 12))
    }

    private func dotColor(for event: CycleEventType?) -> Color {
        switch event {
        case .period: return Color("AccentPrimary")
        case .fertile: return Color("AccentSuccess")
        case .ovulation: return Color("AccentAccent")
        case .logged: return .secondary
        case .none: return .clear
        }
    }
}

struct InsightCard: View {
    let text: String
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "lightbulb.fill")
                .foregroundStyle(Color("AccentSecondary"))
            Text(text)
                .font(.subheadline)
        }
        .padding(16)
        .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 16))
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text("insight_a11y_prefix") + Text(text))
    }
}
