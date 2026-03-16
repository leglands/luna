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

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: InsightsView · Personas: P1,P2 · Features: F07
// │ CRUD: Read · RBAC: owner (vault_open)
// │ Stories: US07 · Why: Cycle statistics, averages, trends
// └─────────────────────────────────────────────────────────┘

// MARK: - InsightsView

struct InsightsView: View {
    @EnvironmentObject var appState: AppState
    @State private var selectedArticle: EducationArticle? = nil

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {

                    if !appState.calmMode {
                        // ── Stats cycle ─────────────────────────────────────
                        CycleStatsSection()
                            .padding(.horizontal)

                        // ── Symptômes les plus fréquents ─────────────────────
                        SymptomFrequencySection()
                            .padding(.horizontal)

                        // ── Graphiques de tendance ───────────────────────────
                        TrendChartsSection()
                            .padding(.horizontal)

                        // ── Insight auto-généré ──────────────────────────────
                        InsightCardView()
                            .padding(.horizontal)
                    } else {
                        // Calm Mode — empathic message
                        CalmModeInsightsBanner()
                            .padding(.horizontal)
                    }

                    // ── Fiches éducatives (always visible) ───────────────
                    EducationSection(selectedArticle: $selectedArticle)
                        .padding(.horizontal)

                    Spacer(minLength: 20)
                }
                .padding(.top, 16)
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
        VStack(alignment: .leading, spacing: 16) {
            Text("charts_section_title")
                .font(.title3.bold())
                .accessibilityAddTraits(.isHeader)

            // Durées des cycles — graphique en barres
            if !appState.cycleLengthHistory.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("charts_cycle_lengths")
                        .font(.subheadline.bold())

                    Chart(appState.cycleLengthHistory, id: \.0) { cycle, length in
                        BarMark(
                            x: .value("charts_cycle_num", "C\(cycle)"),
                            y: .value("charts_days", animateCharts ? length : 0)
                        )
                        .foregroundStyle(Color("AccentPrimary"))
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
                }
                .padding(16)
                .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 16))
            }

            // Température basale — courbe
            if !appState.bbtHistory.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("charts_bbt_title")
                        .font(.subheadline.bold())

                    Chart(appState.bbtHistory, id: \.0) { date, temp in
                        LineMark(
                            x: .value("charts_day", date),
                            y: .value("charts_temp_c", animateCharts ? temp : 36.5)
                        )
                        .foregroundStyle(Color("AccentAccent"))
                        .interpolationMethod(.catmullRom)

                        PointMark(
                            x: .value("charts_day", date),
                            y: .value("charts_temp_c", animateCharts ? temp : 36.5)
                        )
                        .foregroundStyle(Color("AccentAccent"))
                        .symbolSize(animateCharts ? 20 : 0)
                    }
                    .frame(height: 120)
                    .chartYScale(domain: 36.0...37.5)
                    .chartXAxis(.hidden)
                    .accessibilityLabel(Text("charts_bbt_a11y"))
                }
                .padding(16)
                .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 16))
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
}

// MARK: - SymptomFrequencySection

struct SymptomFrequencySection: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) var reduceMotion
    @State private var animateBars = false

    var body: some View {
        if !appState.symptomFrequencies.isEmpty {
            VStack(alignment: .leading, spacing: 12) {
                Text("symptoms_stats_title")
                    .font(.title3.bold())
                    .accessibilityAddTraits(.isHeader)

                VStack(spacing: 8) {
                    ForEach(Array(appState.symptomFrequencies.enumerated()), id: \.element.0) { index, item in
                        SymptomFrequencyRow(symptom: item.0, frequency: item.1, animate: animateBars, delay: Double(index) * 0.08)
                    }
                }
                .padding(16)
                .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 16))
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
}

struct SymptomFrequencyRow: View {
    let symptom: String
    let frequency: Double
    var animate: Bool = true
    var delay: Double = 0

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
                        .animation(.easeOut(duration: 0.6).delay(delay), value: animate)
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
                ForEach(EducationArticle.sampleArticles) { article in
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

    static let sampleArticles: [EducationArticle] = [
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
