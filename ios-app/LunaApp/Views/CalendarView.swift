// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: CalendarView (S05)                                   │
// │ Personas: P1 (Emma), P2 (Sarah)                             │
// │ Features: F05 (Calendar View)                                │
// │ CRUD: R                                                      │
// │ RBAC: owner (vault_open required)                            │
// │ User Stories: US05                                           │
// │ Why: Monthly calendar with period and fertile window markers │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import LifeDS

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: CalendarView · Personas: P1,P2 · Features: F05
// │ CRUD: Read · RBAC: owner (vault_open)
// │ Stories: US05 · Why: Monthly calendar — period/fertile markers
// └─────────────────────────────────────────────────────────┘

// MARK: - CalendarView

struct CalendarView: View {
    @EnvironmentObject var appState: AppState
    @State private var displayedMonth: Date = Date()
    @State private var selectedDate: Date? = nil
    @State private var showLogSheet: Bool = false
    @StateObject private var themeManager = ThemeManager()

    private var calendar: Calendar { .current }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: DSSpacing.space4) {
                    CycleOverviewRing()
                        .padding(.horizontal)

                    DSCard(mode: themeManager.effectiveMode()) {
                        VStack(spacing: 0) {
                            MonthHeader(displayedMonth: $displayedMonth)
                                .padding(.horizontal, DSSpacing.space4)
                                .padding(.top, DSSpacing.space2)

                            WeekdayHeader()
                                .padding(.horizontal, DSSpacing.space4)
                                .padding(.top, DSSpacing.space1)

                            MonthGridView(
                                month: displayedMonth,
                                selectedDate: $selectedDate,
                                cycleEvents: appState.calmMode
                                    ? appState.cycleEvents.filter { $0.value != .fertile && $0.value != .ovulation }
                                    : appState.cycleEvents
                            )
                            .padding(.horizontal, DSSpacing.space4)

                            if !appState.calmMode {
                                CalendarLegend()
                                    .padding(DSSpacing.space4)
                            }
                        }
                    }
                    .padding(.horizontal)
                }
                .padding(.top, DSSpacing.space2)
            }
            .navigationTitle("tab_calendar")
            .navigationBarTitleDisplayMode(.large)
            .sheet(item: $selectedDate) { date in
                LogSheetView(date: date)
            }
        }
    }
}

// MARK: - Cycle Overview Ring

private struct CycleOverviewRing: View {
    @EnvironmentObject var appState: AppState
    @StateObject private var vm = HomeViewModel()

    private var segments: [(value: Double, color: Color, label: String)] {
        let cycleLen = 28.0
        let currentDay = Double(vm.currentCycleDay)
        let menEnd = min(Double(appState.averagePeriodLength ?? 5) / cycleLen, 1.0)
        let folEnd = 0.4
        let ferEnd = 0.5
        return [
            (menEnd, LunaBrand.phaseMenstruation, NSLocalizedString("phase_menstrual", comment: "")),
            (folEnd - menEnd, LunaBrand.phaseFollicular, NSLocalizedString("phase_follicular", comment: "")),
            (ferEnd - folEnd, LunaBrand.phaseOvulation, NSLocalizedString("phase_ovulatory", comment: "")),
            (1.0 - ferEnd, LunaBrand.phaseLuteal, NSLocalizedString("phase_luteal", comment: ""))
        ]
    }

    private var currentPhaseIndex: Int {
        let cycleLen = 28.0
        let dayRatio = Double(vm.currentCycleDay) / cycleLen
        var cumulative: Double = 0
        for (index, segment) in segments.enumerated() {
            cumulative += segment.value
            if dayRatio <= cumulative {
                return index
            }
        }
        return 0
    }

    var body: some View {
        DSCard(mode: .light) {
            HStack(spacing: DSSpacing.space4) {
                DSSegmentedRing(
                    segments: segments,
                    currentIndex: currentPhaseIndex,
                    centerText: "\(vm.currentCycleDay)",
                    centerSubtext: NSLocalizedString("cycle_day_label", comment: ""),
                    size: 100
                )

                VStack(alignment: .leading, spacing: DSSpacing.space2) {
                    Text("cycle_overview_title")
                        .font(DSTypography.headline)
                        .foregroundStyle(ThemeColors.textPrimary(for: .light))

                    Text(phaseDescription)
                        .font(DSTypography.caption)
                        .foregroundStyle(ThemeColors.textSecondary(for: .light))

                    Spacer()
                }

                Spacer()
            }
            .padding(DSSpacing.space4)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Cycle overview: Day \(vm.currentCycleDay)")
    }

    private var phaseDescription: String {
        guard let phase = vm.currentPhase else { return "" }
        return NSLocalizedString("phase_\(phase)", comment: "")
    }
}

// MARK: - MonthHeader

struct MonthHeader: View {
    @Binding var displayedMonth: Date
    private var calendar: Calendar { .current }

    var body: some View {
        HStack {
            Button {
                displayedMonth = calendar.date(byAdding: .month, value: -1, to: displayedMonth) ?? displayedMonth
            } label: {
                Image(systemName: "chevron.left")
                    .frame(minWidth: 44, minHeight: 44)
            }
            .accessibilityLabel(Text("previous_month_a11y"))

            Spacer()

            Text(displayedMonth, format: .dateTime.month(.wide).year())
                .font(.title3.bold())
                .accessibilityAddTraits(.isHeader)

            Spacer()

            Button {
                displayedMonth = calendar.date(byAdding: .month, value: 1, to: displayedMonth) ?? displayedMonth
            } label: {
                Image(systemName: "chevron.right")
                    .frame(minWidth: 44, minHeight: 44)
            }
            .accessibilityLabel(Text("next_month_a11y"))
        }
    }
}

// MARK: - WeekdayHeader

struct WeekdayHeader: View {
    private var calendar: Calendar { .current }

    var body: some View {
        HStack {
            ForEach(calendar.shortWeekdaySymbols, id: \.self) { day in
                Text(day)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity)
            }
        }
        .accessibilityHidden(true) // Décoratif — l'info est dans les cellules
    }
}

// MARK: - MonthGridView

struct MonthGridView: View {
    let month: Date
    @Binding var selectedDate: Date?
    let cycleEvents: [String: CycleEventType]

    private var calendar: Calendar { .current }
    private var daysInMonth: [Date?] {
        guard let range = calendar.range(of: .day, in: .month, for: month),
              let firstDay = calendar.date(from: calendar.dateComponents([.year, .month], from: month))
        else { return [] }

        let weekday = calendar.component(.weekday, from: firstDay)
        let offset = (weekday - calendar.firstWeekday + 7) % 7
        var days: [Date?] = Array(repeating: nil, count: offset)
        days += range.compactMap { day -> Date? in
            calendar.date(byAdding: .day, value: day - 1, to: firstDay)
        }
        return days
    }

    var columns: [GridItem] { Array(repeating: GridItem(.flexible()), count: 7) }

    var body: some View {
        LazyVGrid(columns: columns, spacing: 4) {
            ForEach(Array(daysInMonth.enumerated()), id: \.offset) { _, date in
                if let date {
                    CalendarDayCell(
                        date: date,
                        eventType: eventType(for: date),
                        isToday: calendar.isDateInToday(date),
                        isSelected: selectedDate.map { calendar.isDate($0, inSameDayAs: date) } ?? false
                    )
                    .onTapGesture { selectedDate = date }
                } else {
                    Color.clear.frame(height: 40)
                }
            }
        }
    }

    private func eventType(for date: Date) -> CycleEventType? {
        let fmt = DateFormatter(); fmt.dateFormat = "yyyy-MM-dd"
        return cycleEvents[fmt.string(from: date)]
    }
}

// MARK: - CalendarDayCell

struct CalendarDayCell: View {
    let date: Date
    let eventType: CycleEventType?
    let isToday: Bool
    let isSelected: Bool
    private var calendar: Calendar { .current }

    var body: some View {
        ZStack {
            cellBackground
            Text(date, format: .dateTime.day())
                .font(.callout)
                .fontWeight(isToday ? .bold : .regular)
                .foregroundStyle(textColor)
        }
        .frame(maxWidth: .infinity)
        .aspectRatio(1, contentMode: .fit)
        .clipShape(Circle())
        .accessibilityLabel(accessibilityDescription)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }

    @ViewBuilder
    private var cellBackground: some View {
        if isSelected {
            Circle().fill(Color("AccentPrimary"))
        } else if isToday {
            Circle().stroke(Color("AccentPrimary"), lineWidth: 2)
        } else if let ev = eventType {
            Circle().fill(ev.color.opacity(0.25))
        } else {
            Color.clear
        }
    }

    private var textColor: Color {
        if isSelected { return .white }
        if isToday { return Color("AccentPrimary") }
        return .primary
    }

    private var accessibilityDescription: Text {
        var desc = date.formatted(.dateTime.weekday(.wide).day().month())
        if let ev = eventType {
            desc += ". \(ev.accessibilityLabel)"
        }
        if isToday {
            desc += ". \(NSLocalizedString("tab_today", comment: ""))"
        }
        if isSelected {
            desc += ". \(NSLocalizedString("selected_a11y", comment: ""))"
        }
        return Text(desc)
    }
}

// MARK: - CalendarLegend

struct CalendarLegend: View {
    var body: some View {
        HStack(spacing: 16) {
            ForEach(CycleEventType.allCases, id: \.self) { event in
                HStack(spacing: 6) {
                    Circle().fill(event.color).frame(width: 10, height: 10)
                    Text(LocalizedStringKey(event.legendKey))
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text("calendar_legend_a11y"))
    }
}

// MARK: - CycleEventType

enum CycleEventType: CaseIterable {
    case period, fertile, ovulation, logged

    var color: Color {
        switch self {
        case .period:     return Color("AccentPrimary")
        case .fertile:    return Color("AccentSuccess")
        case .ovulation:  return Color("AccentAccent")
        case .logged:     return Color.gray
        }
    }

    var legendKey: String {
        switch self {
        case .period:     return "legend_period"
        case .fertile:    return "legend_fertile"
        case .ovulation:  return "legend_ovulation"
        case .logged:     return "legend_logged"
        }
    }

    var accessibilityLabel: String {
        switch self {
        case .period:     return NSLocalizedString("period_phase_a11y", comment: "")
        case .fertile:    return NSLocalizedString("fertile_window_a11y", comment: "")
        case .ovulation:  return NSLocalizedString("ovulation_day_a11y", comment: "")
        case .logged:     return NSLocalizedString("data_logged_a11y", comment: "")
        }
    }
}

// MARK: - Date: Identifiable

extension Date: @retroactive Identifiable {
    public var id: TimeInterval { timeIntervalSince1970 }
}
