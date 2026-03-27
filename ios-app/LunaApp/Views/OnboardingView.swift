// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: OnboardingView (S01)                                 │
// │ Personas: P1 (Emma), P5 (Aïcha)                             │
// │ Features: F01 (Onboarding / Vault Creation)                  │
// │ CRUD: C                                                      │
// │ RBAC: none (vault does not exist yet)                        │
// │ User Stories: US01                                           │
// │ Why: First-run — warm welcome, cycle info, goals, auto vault │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI

// MARK: - OnboardingView (4 steps — no PIN, lock optional later in Settings)

struct OnboardingView: View {
    @EnvironmentObject var appState: AppState
    @State private var step: Int = 0
    @State private var firstName: String = ""
    @State private var lastPeriodDate: Date? = nil
    @State private var periodDuration: Int = 5
    @State private var cycleRegularity: String = "regular"
    @State private var goals: Set<String> = ["track"]
    @State private var isSettingUp: Bool = false
    @State private var showWelcome: Bool = false
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    private let totalSteps = 4

    var body: some View {
        ZStack {
            Color("AppBackground").ignoresSafeArea()

            VStack(spacing: 0) {
                ProgressBar(current: step, total: totalSteps)
                    .padding(.horizontal, 24)
                    .padding(.top, 16)
                    .accessibilityLabel(Text("onboarding_step_a11y \(step+1) / \(totalSteps)"))

                TabView(selection: $step) {
                    WelcomeStep(firstName: $firstName).tag(0)
                    LastPeriodStep(selectedDate: $lastPeriodDate).tag(1)
                    CycleProfileStep(duration: $periodDuration, regularity: $cycleRegularity).tag(2)
                    GoalsStep(goals: $goals).tag(3)
                }
                .accessibilityIdentifier("onboarding_pager")
                .tabViewStyle(.page(indexDisplayMode: .never))
                .animation(reduceMotion ? .none : .easeInOut, value: step)

                OnboardingNavBar(
                    step: step,
                    totalSteps: totalSteps,
                    canProceed: true,
                    isSettingUp: isSettingUp,
                    onNext: nextStep,
                    onBack: { step -= 1 }
                )
                .padding(.horizontal, 24)
                .padding(.bottom, 32)
            }
        }
        // Doherty Threshold: loading during Argon2id key derivation
        .overlay {
            if isSettingUp && !showWelcome {
                VStack(spacing: 16) {
                    ProgressView()
                        .scaleEffect(1.5)
                    Text("creating_vault_loading")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(.ultraThinMaterial)
            }
        }
        // Peak-End Rule: warm welcome before transition
        .overlay {
            if showWelcome {
                VStack(spacing: 20) {
                    Image(systemName: "checkmark.seal.fill")
                        .font(.system(size: 64))
                        .foregroundStyle(Color("AccentPrimary"))
                    Text("welcome_title")
                        .font(.title.bold())
                    if !firstName.isEmpty {
                        Text(firstName)
                            .font(.title2)
                            .foregroundStyle(.secondary)
                    }
                    Text("welcome_subtitle_privacy")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)

                    // Privacy badge
                    HStack(spacing: 6) {
                        Image(systemName: "lock.shield.fill")
                            .foregroundStyle(Color("AccentPrimary"))
                        Text("onboarding_privacy_guarantee")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    .padding(.top, 8)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color("AppBackground").ignoresSafeArea())
                .transition(.opacity)
            }
        }
        .animation(reduceMotion ? .none : .easeInOut(duration: 0.5), value: showWelcome)
    }

    private func nextStep() {
        if step < totalSteps - 1 {
            step += 1
        } else {
            finishOnboarding()
        }
    }

    private func finishOnboarding() {
        guard !isSettingUp else { return }
        isSettingUp = true

        Task {
            do {
                // Auto-generate PIN — user never sees or types it.
                // Vault encryption requires a key; the PIN is derived via Argon2id.
                // Stored in Keychain, gated by device auth when lock is enabled.
                let autoPin = String(format: "%06d", Int.random(in: 0...999999))

                let engine = try LunaEngine.openVault(dbPath: appState.dbPath, pin: autoPin)

                // Always store PIN — needed for vault re-open
                KeychainService.shared.storePin(autoPin)

                await MainActor.run {
                    appState.engine = engine
                    appState.isVaultOpen = true
                    appState.userName = firstName.isEmpty ? nil : firstName
                    appState.lockEnabled = false // No lock by default — enable in Settings
                }

                await MainActor.run { showWelcome = true }
                UINotificationFeedbackGenerator().notificationOccurred(.success)
                try? await Task.sleep(nanoseconds: 1_800_000_000)

                await MainActor.run {
                    appState.isOnboardingDone = true
                }
            } catch {
                await MainActor.run { isSettingUp = false }
            }
        }
    }
}

// MARK: - Étape 1 — Bienvenue

struct WelcomeStep: View {
    @Binding var firstName: String

    var body: some View {
        VStack(spacing: 32) {
            Spacer()
            Image(systemName: "moon.circle.fill")
                .font(.system(size: 80))
                .foregroundStyle(Color("AccentPrimary"))
                .accessibilityHidden(true)

            VStack(spacing: 12) {
                Text("onboarding_welcome_title")
                    .font(.largeTitle.bold())
                    .multilineTextAlignment(.center)
                    .accessibilityAddTraits(.isHeader)
                Text("onboarding_welcome_subtitle")
                    .font(.body)
                    .foregroundStyle(.secondary)
                    .multilineTextAlignment(.center)
            }

            TextField("onboarding_name_placeholder", text: $firstName)
                .textContentType(.givenName)
                .padding(16)
                .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 12))
                .accessibilityLabel(Text("onboarding_name_a11y"))
                .accessibilityHint(Text("onboarding_name_hint_a11y"))

            Spacer()
        }
        .padding(.horizontal, 24)
    }
}

// MARK: - Étape 2 — Dernier cycle

struct LastPeriodStep: View {
    @Binding var selectedDate: Date?

    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            OnboardingStepHeader(
                icon: "drop.fill",
                title: "onboarding_last_period_title",
                subtitle: "onboarding_last_period_subtitle"
            )

            DatePicker(
                "onboarding_last_period_picker_label",
                selection: Binding(
                    get: { selectedDate ?? Date() },
                    set: { selectedDate = $0 }
                ),
                in: ...Date(),
                displayedComponents: .date
            )
            .datePickerStyle(.graphical)
            .accessibilityLabel(Text("onboarding_date_picker_a11y"))

            Button("onboarding_skip") {
                selectedDate = nil
            }
            .font(.callout)
            .foregroundStyle(.secondary)
            .frame(minHeight: 44)

            Spacer()
        }
        .padding(.horizontal, 24)
    }
}

// MARK: - Étape 3 — Profil cycle

struct CycleProfileStep: View {
    @Binding var duration: Int
    @Binding var regularity: String

    private let durations = [3, 4, 5, 6, 7]
    private let regularities = ["very_regular", "regular", "irregular", "unknown"]

    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            OnboardingStepHeader(
                icon: "arrow.triangle.2.circlepath",
                title: "onboarding_cycle_profile_title",
                subtitle: "onboarding_cycle_profile_subtitle"
            )

            VStack(alignment: .leading, spacing: 12) {
                Text("onboarding_period_duration_label")
                    .font(.subheadline.bold())
                HStack(spacing: 8) {
                    ForEach(durations, id: \.self) { d in
                        Button("\(d)\(String(localized: "day_abbr"))") {
                            duration = d
                        }
                        .buttonStyle(SelectableButtonStyle(isSelected: duration == d))
                        .frame(minWidth: 44, minHeight: 44)
                    }
                    Button("7\(String(localized: "day_abbr"))+") { duration = 8 }
                        .buttonStyle(SelectableButtonStyle(isSelected: duration >= 8))
                        .frame(minWidth: 44, minHeight: 44)
                }
            }

            VStack(alignment: .leading, spacing: 12) {
                Text("onboarding_regularity_label")
                    .font(.subheadline.bold())
                VStack(spacing: 8) {
                    ForEach(regularities, id: \.self) { reg in
                        Button {
                            regularity = reg
                        } label: {
                            HStack {
                                Text(NSLocalizedString("regularity_\(reg)", comment: "Cycle regularity option"))
                                Spacer()
                                if regularity == reg {
                                    Image(systemName: "checkmark")
                                        .foregroundStyle(Color("AccentPrimary"))
                                }
                            }
                            .padding(14)
                            .background(
                                regularity == reg ? Color("AccentPrimary").opacity(0.1) : Color("CardBackground"),
                                in: RoundedRectangle(cornerRadius: 12)
                            )
                        }
                        .foregroundStyle(.primary)
                        .frame(minHeight: 44)
                        .accessibilityAddTraits(regularity == reg ? .isSelected : [])
                    }
                }
            }

            Spacer()
        }
        .padding(.horizontal, 24)
    }
}

// MARK: - Étape 4 — Objectifs

struct GoalsStep: View {
    @Binding var goals: Set<String>

    private let allGoals = [
        "track", "understand_symptoms", "avoid_pregnancy",
        "try_to_conceive", "track_pregnancy", "perimenopause"
    ]

    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            OnboardingStepHeader(
                icon: "star.fill",
                title: "onboarding_goals_title",
                subtitle: "onboarding_goals_subtitle"
            )

            VStack(spacing: 8) {
                ForEach(allGoals, id: \.self) { goal in
                    Button {
                        if goals.contains(goal) { goals.remove(goal) } else { goals.insert(goal) }
                    } label: {
                        HStack {
                            Image(systemName: goals.contains(goal) ? "checkmark.square.fill" : "square")
                                .foregroundStyle(goals.contains(goal) ? Color("AccentPrimary") : .secondary)
                                .accessibilityHidden(true)
                            Text(NSLocalizedString("goal_\(goal)", comment: "Onboarding goal"))
                            Spacer()
                        }
                        .padding(14)
                        .background(
                            goals.contains(goal) ? Color("AccentPrimary").opacity(0.1) : Color("CardBackground"),
                            in: RoundedRectangle(cornerRadius: 12)
                        )
                    }
                    .foregroundStyle(.primary)
                    .frame(minHeight: 44)
                    .accessibilityAddTraits(goals.contains(goal) ? .isSelected : [])
                }
            }
            Spacer()
        }
        .padding(.horizontal, 24)
    }
}

// MARK: - Shared Components

struct OnboardingStepHeader: View {
    let icon: String
    let title: LocalizedStringKey
    let subtitle: LocalizedStringKey

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: icon)
                .font(.system(size: 48))
                .foregroundStyle(Color("AccentPrimary"))
                .accessibilityHidden(true)
            Text(title).font(.title2.bold()).multilineTextAlignment(.center)
                .accessibilityAddTraits(.isHeader)
            Text(subtitle).font(.callout).foregroundStyle(.secondary).multilineTextAlignment(.center)
        }
    }
}

struct SelectableButtonStyle: ButtonStyle {
    let isSelected: Bool

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(
                isSelected ? Color("AccentPrimary") : Color("CardBackground"),
                in: Capsule()
            )
            .foregroundStyle(isSelected ? .white : .primary)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}

struct ProgressBar: View {
    let current: Int
    let total: Int
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .leading) {
                Capsule().fill(Color.secondary.opacity(0.2)).frame(height: 4)
                Capsule()
                    .fill(Color("AccentPrimary"))
                    .frame(width: geo.size.width * CGFloat(current + 1) / CGFloat(total), height: 4)
                    .animation(reduceMotion ? .none : .easeInOut, value: current)
            }
        }
        .frame(height: 4)
    }
}

struct OnboardingNavBar: View {
    let step: Int
    let totalSteps: Int
    let canProceed: Bool
    let isSettingUp: Bool
    let onNext: () -> Void
    let onBack: () -> Void

    private var isLastStep: Bool { step == totalSteps - 1 }

    var body: some View {
        HStack {
            if step > 0 {
                Button("onboarding_back") { onBack() }
                    .frame(minHeight: 44)
                    .foregroundStyle(.secondary)
                    .accessibilityIdentifier("onboarding_back")
            }
            Spacer()
            Button {
                onNext()
            } label: {
                if isSettingUp {
                    ProgressView().tint(.white)
                } else {
                    Text(isLastStep ? "onboarding_start_button" : "onboarding_next_button")
                        .bold()
                }
            }
            .disabled(!canProceed || isSettingUp)
            .padding(.horizontal, 28)
            .padding(.vertical, 14)
            .background(canProceed ? Color("AccentPrimary") : Color.secondary.opacity(0.3), in: Capsule())
            .foregroundStyle(.white)
            .accessibilityIdentifier(isLastStep ? "onboarding_finish" : "onboarding_next")
            .accessibilityLabel(isLastStep
                ? Text("onboarding_start_a11y")
                : Text("onboarding_next_a11y")
            )
        }
    }
}
