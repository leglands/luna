// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: LockView (S02)                                       │
// │ Personas: P1 (Emma), P5 (Aïcha)                             │
// │ Features: F02 (Lock / Unlock)                                │
// │ CRUD: R                                                      │
// │ RBAC: none (vault locked)                                    │
// │ User Stories: US02                                           │
// │ Why: PIN entry to unlock encrypted vault                     │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import LocalAuthentication

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: LockView · Personas: P1,P5 · Features: F02
// │ CRUD: Read · RBAC: owner (PIN verification)
// │ Stories: US02 · Why: Vault gate — PIN entry, biometric
// └─────────────────────────────────────────────────────────┘

// MARK: - LockView

struct LockView: View {
    @EnvironmentObject var appState: AppState
    @State private var pin: String = ""
    @State private var errorMessage: String? = nil
    @State private var attemptsLeft: Int = 5
    @State private var isUnlocking: Bool = false
    @State private var biometricAvailable: Bool = false

    var body: some View {
        ZStack {
            Color("LockBackground").ignoresSafeArea()

            VStack(spacing: 32) {
                Spacer()

                VStack(spacing: 12) {
                    Image(systemName: "moon.circle.fill")
                        .font(.system(size: 64))
                        .foregroundStyle(Color("AccentPrimary"))
                        .accessibilityHidden(true)
                    Text("app_name")
                        .font(.largeTitle.bold())
                        .accessibilityAddTraits(.isHeader)
                }

                if let error = errorMessage {
                    Text(error)
                        .font(.callout)
                        .foregroundStyle(.red)
                        .padding(.horizontal)
                        .accessibilityLabel(Text(error))
                        .transition(.opacity)
                }

                if biometricAvailable {
                    Button {
                        authenticateBiometric()
                    } label: {
                        Label("lock_biometric_button", systemImage: biometricIcon)
                            .font(.title3)
                            .foregroundStyle(Color("AccentPrimary"))
                    }
                    .frame(minWidth: 44, minHeight: 44)
                    .disabled(attemptsLeft == 0)
                    .accessibilityLabel(Text("lock_biometric_a11y"))

                    Text("lock_or_separator")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                } else {
                    Text("lock_enter_pin")
                        .font(.callout)
                        .foregroundStyle(.secondary)
                }

                PINEntryView(pin: $pin, onComplete: unlock)
                    .disabled(attemptsLeft == 0)

                if attemptsLeft < 5 && attemptsLeft > 0 {
                    Text(String(format: NSLocalizedString("lock_attempts_left", comment: ""), attemptsLeft))
                        .font(.caption)
                        .foregroundStyle(.orange)
                }

                Spacer()
            }
            .padding()
        }
        .onAppear {
            checkBiometric()
            if biometricAvailable { authenticateBiometric() }
        }
        .animation(.easeInOut, value: errorMessage)
    }

    private var biometricIcon: String {
        let ctx = LAContext()
        var error: NSError?
        guard ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else {
            return "lock.fill"
        }
        return ctx.biometryType == .faceID ? "faceid" : "touchid"
    }

    private func checkBiometric() {
        let ctx = LAContext()
        var error: NSError?
        biometricAvailable = ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error)
    }

    private func authenticateBiometric() {
        let ctx = LAContext()
        var error: NSError?
        guard ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) else { return }

        ctx.evaluatePolicy(
            .deviceOwnerAuthenticationWithBiometrics,
            localizedReason: NSLocalizedString("lock_biometric_reason", comment: "")
        ) { success, _ in
            Task { @MainActor in
                if success {
                    openVaultWithBiometric()
                }
            }
        }
    }

    private func openVaultWithBiometric() {
        // Récupérer le PIN depuis le Keychain (stocké au setup initial)
        guard let storedPin = KeychainService.shared.readPin() else { return }
        unlock(pin: storedPin)
    }

    private func unlock(pin: String) {
        guard !isUnlocking else { return }
        isUnlocking = true

        Task {
            do {
                let engine = try LunaEngine.openVault(dbPath: appState.dbPath, pin: pin)
                await MainActor.run {
                    appState.engine = engine
                    appState.isVaultOpen = true
                    UIAccessibility.post(
                        notification: .announcement,
                        argument: NSLocalizedString("lock_unlocked_a11y", comment: "")
                    )
                }
            } catch {
                await MainActor.run {
                    attemptsLeft -= 1
                    errorMessage = attemptsLeft > 0
                        ? NSLocalizedString("lock_wrong_pin", comment: "")
                        : NSLocalizedString("lock_max_attempts", comment: "")
                    self.pin = ""
                    UIAccessibility.post(notification: .announcement, argument: errorMessage ?? "")
                }
            }
            isUnlocking = false
        }
    }
}

// MARK: - PINEntryView

struct PINEntryView: View {
    @Binding var pin: String
    let onComplete: (String) -> Void

    private let digits = [["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]]

    var body: some View {
        VStack(spacing: 12) {
            // Dots indicateurs
            HStack(spacing: 16) {
                ForEach(0..<6, id: \.self) { i in
                    Circle()
                        .fill(i < pin.count ? Color("AccentPrimary") : Color.secondary.opacity(0.3))
                        .frame(width: 14, height: 14)
                }
            }
            .accessibilityLabel(Text("pin_entry_a11y"))
            .accessibilityValue(Text("\(pin.count) chiffres saisis sur 6"))

            // Clavier
            ForEach(digits, id: \.self) { row in
                HStack(spacing: 20) {
                    ForEach(row, id: \.self) { digit in
                        if digit == "" {
                            Color.clear.frame(width: 72, height: 72)
                        } else {
                            Button {
                                handleDigit(digit)
                            } label: {
                                Text(digit)
                                    .font(.title2.bold())
                                    .frame(width: 72, height: 72)
                                    .background(Color("CardBackground"), in: Circle())
                            }
                            .accessibilityLabel(digit == ""
                                ? Text("pin_delete_a11y")
                                : Text("pin_digit_\(digit)_a11y")
                            )
                        }
                    }
                }
            }
        }
    }

    private func handleDigit(_ digit: String) {
        if digit == "" {
            if !pin.isEmpty { pin.removeLast() }
        } else if pin.count < 6 {
            pin.append(digit)
            if pin.count == 6 {
                onComplete(pin)
            }
        }
    }
}

