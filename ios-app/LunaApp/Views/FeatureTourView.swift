import SwiftUI

// MARK: - Tour Step Model

struct FeatureTourStep: Identifiable {
    let id: String
    let titleKey: String
    let bodyKey: String
    let iconName: String
    let tabIndex: Int  // 0=Today, 1=Calendar, 2=Insights, 3=Me
}

extension FeatureTourStep {
    static let allSteps: [FeatureTourStep] = [
        FeatureTourStep(
            id: "cycle_ring",
            titleKey: "tour_step_1_title",
            bodyKey: "tour_step_1_body",
            iconName: "circle.circle",
            tabIndex: 0
        ),
        FeatureTourStep(
            id: "log_today",
            titleKey: "tour_step_2_title",
            bodyKey: "tour_step_2_body",
            iconName: "plus.circle.fill",
            tabIndex: 0
        ),
        FeatureTourStep(
            id: "calendar",
            titleKey: "tour_step_3_title",
            bodyKey: "tour_step_3_body",
            iconName: "calendar",
            tabIndex: 1
        ),
        FeatureTourStep(
            id: "insights",
            titleKey: "tour_step_4_title",
            bodyKey: "tour_step_4_body",
            iconName: "chart.xyaxis.line",
            tabIndex: 2
        ),
        FeatureTourStep(
            id: "calm_mode",
            titleKey: "tour_step_5_title",
            bodyKey: "tour_step_5_body",
            iconName: "leaf.fill",
            tabIndex: 3
        ),
    ]
}

// MARK: - Feature Tour View

struct FeatureTourView: View {
    @Environment(\.dismiss) private var dismiss
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var currentStepIndex: Int = 0
    let onComplete: () -> Void

    private var steps: [FeatureTourStep] { FeatureTourStep.allSteps }
    private var currentStep: FeatureTourStep { steps[currentStepIndex] }
    private var isLastStep: Bool { currentStepIndex >= steps.count - 1 }
    private var progress: CGFloat { CGFloat(currentStepIndex + 1) / CGFloat(steps.count) }

    var body: some View {
        ZStack {
            // Dimmed background
            Color.black.opacity(0.65)
                .ignoresSafeArea()

            VStack {
                Spacer()

                // Spotlight card
                tourCard
                    .transition(.asymmetric(
                        insertion: .move(edge: .trailing).combined(with: .opacity),
                        removal: .move(edge: .leading).combined(with: .opacity)
                    ))
                    .id(currentStep.id)
            }
            .padding(.bottom, 120) // Above tab bar
        }
        .animation(reduceMotion ? .none : .easeInOut(duration: 0.3), value: currentStepIndex)
        .accessibilityElement(children: .contain)
        .accessibilityLabel(NSLocalizedString("tour_a11y_label", comment: ""))
    }

    // MARK: - Tour Card

    private var tourCard: some View {
        VStack(spacing: 16) {
            // Progress indicator
            HStack(spacing: 6) {
                ForEach(0..<steps.count, id: \.self) { i in
                    Capsule()
                        .fill(i <= currentStepIndex ? Color("AccentAccent") : Color.white.opacity(0.3))
                        .frame(height: 4)
                }
            }
            .padding(.horizontal, 4)

            // Icon
            Image(systemName: currentStep.iconName)
                .font(.system(size: 36))
                .foregroundStyle(Color("AccentAccent"))
                .frame(width: 64, height: 64)
                .background(Color("AccentAccent").opacity(0.15), in: Circle())

            // Title + Body
            VStack(spacing: 8) {
                Text(LocalizedStringKey(currentStep.titleKey))
                    .font(.title3.bold())
                    .foregroundStyle(.white)
                    .multilineTextAlignment(.center)

                Text(LocalizedStringKey(currentStep.bodyKey))
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.85))
                    .multilineTextAlignment(.center)
                    .fixedSize(horizontal: false, vertical: true)
            }

            // Step counter
            Text("\(currentStepIndex + 1) / \(steps.count)")
                .font(.caption)
                .foregroundStyle(.white.opacity(0.5))

            // Buttons
            HStack(spacing: 12) {
                // Skip
                Button {
                    completeTour()
                } label: {
                    Text("tour_skip")
                        .font(.subheadline)
                        .foregroundStyle(.white.opacity(0.7))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                }
                .accessibilityIdentifier("tour_skip_button")

                // Next / Done
                Button {
                    if isLastStep {
                        completeTour()
                    } else {
                        currentStepIndex += 1
                    }
                } label: {
                    Text(isLastStep ? "tour_done" : "tour_next")
                        .font(.subheadline.bold())
                        .foregroundStyle(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)
                        .background(Color("AccentAccent"), in: Capsule())
                }
                .accessibilityIdentifier(isLastStep ? "tour_done_button" : "tour_next_button")
            }
        }
        .padding(24)
        .background(
            RoundedRectangle(cornerRadius: 24)
                .fill(.ultraThinMaterial)
                .environment(\.colorScheme, .dark)
        )
        .padding(.horizontal, 20)
    }

    // MARK: - Actions

    private func completeTour() {
        onComplete()
        dismiss()
    }
}

// MARK: - Preview

#if DEBUG
struct FeatureTourView_Previews: PreviewProvider {
    static var previews: some View {
        FeatureTourView(onComplete: {})
            .preferredColorScheme(.dark)
    }
}
#endif
