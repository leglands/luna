// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: InsightsView (S06)                                   │
// │ Personas: P1 (Emma), P2 (Sarah)                             │
// │ Features: F07 (Insights / Statistics)                        │
// │ CRUD: R                                                      │
// │ RBAC: owner (vault_open required)                            │
// │ User Stories: US07                                           │
// │ Why: Cycle statistics — averages, regularity, symptom freq.  │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import Charts
import LifeDS

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: InsightsView · Personas: P1,P2 · Features: F07
// │ CRUD: Read · RBAC: owner (vault_open)
// │ Stories: US07 · Why: Cycle statistics, averages, trends
// └─────────────────────────────────────────────────────────┘

// MARK: - InsightsView

struct InsightsView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedArticle: EducationArticle? = nil
    @StateObject private var themeManager = ThemeManager()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: DSSpacing.space6) {

                    if !appState.calmMode {
                        CycleStatsSection()
                            .padding(.horizontal)

                        SymptomFrequencySection()
                            .padding(.horizontal)

                        TrendChartsSection()
                            .padding(.horizontal)

                        EvidenceSection()
                            .padding(.horizontal)

                        InsightCardView()
                            .padding(.horizontal)
                    } else {
                        CalmModeInsightsBanner()
                            .padding(.horizontal)
                    }

                    EducationSection(selectedArticle: $selectedArticle)
                        .padding(.horizontal)

                    DSMedicalDisclaimer(mode: themeManager.effectiveMode())
                        .padding(.horizontal)

                    Spacer(minLength: DSSpacing.space5)
                }
                .padding(.top, DSSpacing.space4)
            }
            .navigationTitle("tab_insights")
            .sheet(item: $selectedArticle) { article in
                EducationArticleView(article: article)
            }
        }
    }
}

// MARK: - CycleStatsSection

struct CycleStatsSection: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var appeared = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("stats_section_title")
                .font(.title3.bold())
                .accessibilityAddTraits(.isHeader)

            HStack(spacing: 12) {
                StatCard(
                    value: appState.averageCycleLength.map { String(format: "%.1f", $0) } ?? "--",
                    unit: "stats_days",
                    label: "stats_avg_cycle",
                    icon: "arrow.triangle.2.circlepath"
                )
                .offset(y: appeared ? 0 : 20)
                .opacity(appeared ? 1 : 0)

                StatCard(
                    value: appState.averagePeriodLength.map { String(format: "%.1f", $0) } ?? "--",
                    unit: "stats_days",
                    label: "stats_avg_period",
                    icon: "drop.fill"
                )
                .offset(y: appeared ? 0 : 20)
                .opacity(appeared ? 1 : 0)
            }
        }
        .onAppear {
            guard !reduceMotion else {
                appeared = true
                return
            }
            withAnimation(.easeOut(duration: 0.5).delay(0.1)) {
                appeared = true
            }
        }
    }
}

struct StatCard: View {
    let value: String
    let unit: String
    let label: String
    let icon: String

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Image(systemName: icon)
                .foregroundStyle(Color("AccentPrimary"))
                .font(.title3)
                .accessibilityHidden(true)

            HStack(alignment: .lastTextBaseline, spacing: 4) {
                Text(value)
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                    .monospacedDigit()
                Text(LocalizedStringKey(unit))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Text(LocalizedStringKey(label))
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(16)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 16))
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text("\(Text(LocalizedStringKey(label))): \(value) \(Text(LocalizedStringKey(unit)))"))
    }
}

// MARK: - TrendChartsSection

struct TrendChartsSection: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @State private var animateCharts = false

    var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.space4) {
            Text("charts_section_title")
                .font(DSTypography.headline)
                .foregroundStyle(ThemeColors.textPrimary(for: .light))
                .accessibilityAddTraits(.isHeader)

            if !appState.cycleLengthHistory.isEmpty {
                DSCard(mode: themeManager.effectiveMode()) {
                    VStack(alignment: .leading, spacing: DSSpacing.space2) {
                        Text("charts_cycle_lengths")
                            .font(DSTypography.body.weight(.semibold))

                        Chart(appState.cycleLengthHistory, id: \.0) { cycle, length in
                            BarMark(
                                x: .value("charts_cycle_num", "C\(cycle)"),
                                y: .value("charts_days", animateCharts ? length : 0)
                            )
                            .foregroundStyle(LunaBrand.primary)
                            .cornerRadius(4)
                        }
                        .frame(height: 120)
                        .chartYAxis {
                            AxisMarks(values: [21, 28, 35]) { _ in
                                AxisValueLabel()
                                AxisGridLine()
                            }
                        }
                        .accessibilityLabel(Text("charts_cycle_lengths_a11y"))
                        .accessibilityValue(Text(cycleLengthsAccessibilityValue))
                    }
                }
            }

            if !appState.bbtHistory.isEmpty {
                DSCard(mode: themeManager.effectiveMode()) {
                    VStack(alignment: .leading, spacing: DSSpacing.space2) {
                        Text("charts_bbt_title")
                            .font(DSTypography.body.weight(.semibold))

                        Chart(appState.bbtHistory, id: \.0) { date, temp in
                            LineMark(
                                x: .value("charts_day", date),
                                y: .value("charts_temp_c", animateCharts ? temp : 36.5)
                            )
                            .foregroundStyle(LunaBrand.accent)
                            .interpolationMethod(.catmullRom)

                            PointMark(
                                x: .value("charts_day", date),
                                y: .value("charts_temp_c", animateCharts ? temp : 36.5)
                            )
                            .foregroundStyle(LunaBrand.accent)
                            .symbolSize(animateCharts ? 20 : 0)
                        }
                        .frame(height: 120)
                        .chartYScale(domain: 36.0...37.5)
                        .chartXAxis(.hidden)
                        .accessibilityLabel(Text("charts_bbt_a11y"))
                        .accessibilityValue(Text(bbtAccessibilityValue))
                    }
                }
            }
        }
        .onAppear {
            guard !reduceMotion else {
                animateCharts = true
                return
            }
            withAnimation(.easeOut(duration: 0.8).delay(0.3)) {
                animateCharts = true
            }
        }
    }

    @StateObject private var themeManager = ThemeManager()

    private var cycleLengthsAccessibilityValue: String {
        appState.cycleLengthHistory
            .map { "C\($0.0) \($0.1.formatted(.number.precision(.fractionLength(0))))" }
            .joined(separator: ", ")
    }

    private var bbtAccessibilityValue: String {
        appState.bbtHistory
            .map { item in
                let value = item.1.formatted(.number.precision(.fractionLength(1)))
                return "\(item.0) \(value)"
            }
            .joined(separator: ", ")
    }
}

// MARK: - SymptomFrequencySection

struct SymptomFrequencySection: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @State private var animateBars = false

    var body: some View {
        if !appState.symptomFrequencies.isEmpty {
            VStack(alignment: .leading, spacing: DSSpacing.space3) {
                Text("symptoms_stats_title")
                    .font(DSTypography.headline)
                    .foregroundStyle(ThemeColors.textPrimary(for: .light))
                    .accessibilityAddTraits(.isHeader)

                DSCard(mode: themeManager.effectiveMode()) {
                    VStack(spacing: DSSpacing.space2) {
                        ForEach(Array(appState.symptomFrequencies.enumerated()), id: \.element.0) { index, item in
                            SymptomFrequencyRow(symptom: item.0, frequency: item.1, animate: animateBars, delay: Double(index) * 0.08)
                        }
                    }
                }
            }
            .onAppear {
                guard !reduceMotion else {
                    animateBars = true
                    return
                }
                withAnimation(.easeOut(duration: 0.6).delay(0.2)) {
                    animateBars = true
                }
            }
        }
    }

    @StateObject private var themeManager = ThemeManager()
}

// MARK: - EvidenceSection

private struct EvidenceSection: View {
    var body: some View {
        VStack(alignment: .leading, spacing: DSSpacing.space3) {
            Text("evidence_section_title")
                .font(DSTypography.headline)
                .foregroundStyle(ThemeColors.textPrimary(for: .light))
                .accessibilityAddTraits(.isHeader)

            DSEvidenceCard(
                text: "Regular cycles between 21-35 days are associated with normal ovulation patterns.",
                source: "American College of Obstetricians and Gynecologists",
                doi: "10.1097/AOG.0000000000004789",
                mode: .light
            )

            DSEvidenceCard(
                text: "Basal body temperature tracking can help identify ovulation with 76% accuracy.",
                source: "John Rock's Reproductive Biology Research Foundation",
                doi: "10.1016/j.fertnstert.2020.01.034",
                mode: .light
            )
        }
    }
}

struct SymptomFrequencyRow: View {
    let symptom: String
    let frequency: Double
    var animate: Bool = true
    var delay: Double = 0
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        HStack(spacing: 12) {
            Text(NSLocalizedString("symptom_\(symptom)", comment: "Symptom name"))
                .font(.subheadline)
                .frame(width: 130, alignment: .leading)

            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.secondary.opacity(0.15))
                    Capsule()
                        .fill(Color("AccentPrimary").opacity(0.7))
                        .frame(width: geo.size.width * (animate ? frequency : 0))
                        .animation(reduceMotion ? .none : .easeOut(duration: 0.6).delay(delay), value: animate)
                }
            }
            .frame(height: 8)

            Text("\(Int(frequency * 100))%")
                .font(.caption)
                .foregroundStyle(.secondary)
                .monospacedDigit()
                .frame(width: 36, alignment: .trailing)
                .opacity(animate ? 1 : 0)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel(
            Text("\(NSLocalizedString("symptom_\(symptom)", comment: "Symptom name")): \(Int(frequency * 100))%")
        )
    }
}

// MARK: - InsightCardView

struct InsightCardView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var appeared = false

    private var insightKey: String {
        appState.currentPhaseInsight ?? "insight_no_data"
    }

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "lightbulb.fill")
                .foregroundStyle(Color("AccentAccent"))
                .font(.title3)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 6) {
                Text("insight_title")
                    .font(.subheadline.bold())
                Text(LocalizedStringKey(insightKey))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(16)
        .background(Color("AccentAccent").opacity(0.08), in: RoundedRectangle(cornerRadius: 16))
        .accessibilityElement(children: .combine)
        .scaleEffect(appeared ? 1 : 0.95)
        .opacity(appeared ? 1 : 0)
        .onAppear {
            guard !reduceMotion else {
                appeared = true
                return
            }
            withAnimation(.easeOut(duration: 0.4).delay(0.5)) {
                appeared = true
            }
        }
    }
}

// MARK: - EducationSection

struct EducationSection: View {
    @Binding var selectedArticle: EducationArticle?

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("education_section_title")
                .font(.title3.bold())
                .accessibilityAddTraits(.isHeader)

            VStack(spacing: 8) {
                ForEach(EducationArticle.all) { article in
                    Button {
                        selectedArticle = article
                    } label: {
                        EducationArticleRow(article: article)
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }
}

struct EducationArticleRow: View {
    let article: EducationArticle

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(LocalizedStringKey(article.titleKey))
                    .font(.subheadline.bold())
                    .foregroundStyle(.primary)
                Text(LocalizedStringKey(article.categoryKey))
                    .font(.caption)
                    .foregroundStyle(Color("AccentPrimary"))
            }
            Spacer()
            Image(systemName: "chevron.right")
                .foregroundStyle(.secondary)
                .font(.caption)
                .accessibilityHidden(true)
        }
        .padding(14)
        .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 12))
        .frame(minHeight: 44) // a11y target
    }
}

// MARK: - EducationArticle

struct EducationArticle: Identifiable {
    let id: String
    let titleKey: String
    let categoryKey: String
    let bodyKey: String

    static let all: [EducationArticle] = [
        EducationArticle(id: "pms", titleKey: "article_pms_title", categoryKey: "article_cat_cycle", bodyKey: "article_pms_body"),
        EducationArticle(id: "ovulation", titleKey: "article_ovulation_title", categoryKey: "article_cat_fertility", bodyKey: "article_ovulation_body"),
        EducationArticle(id: "bbt", titleKey: "article_bbt_title", categoryKey: "article_cat_biometrics", bodyKey: "article_bbt_body"),
        EducationArticle(id: "perimenopause", titleKey: "article_perimenopause_title", categoryKey: "article_cat_cycle", bodyKey: "article_perimenopause_body"),
    ]
}

// MARK: - EducationArticleView

struct EducationArticleView: View {
    let article: EducationArticle
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ScrollView {
                Text(LocalizedStringKey(article.bodyKey))
                    .padding()
            }
            .navigationTitle(LocalizedStringKey(article.titleKey))
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("cancel_button") { dismiss() }
                }
            }
        }
    }
}

// MARK: - CalmModeInsightsBanner

private struct CalmModeInsightsBanner: View {
    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "leaf.fill")
                .foregroundStyle(Color("AccentSuccess"))
                .font(.title3)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 6) {
                Text("insights_calm_title")
                    .font(.subheadline.bold())
                Text("insights_calm_body")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(16)
        .background(Color("AccentSuccess").opacity(0.08), in: RoundedRectangle(cornerRadius: 16))
        .accessibilityElement(children: .combine)
        .accessibilityLabel(Text("insights_calm_a11y"))
    }
}
