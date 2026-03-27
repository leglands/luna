// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: LockView (S02)                                       │
// │ Personas: P1 (Emma), P5 (Aïcha)                             │
// │ Features: F02 (Lock / Unlock)                                │
// │ CRUD: R                                                      │
// │ RBAC: none (vault locked)                                    │
// │ User Stories: US02                                           │
// │ Why: Device auth (bank-app style) to unlock encrypted vault  │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import LocalAuthentication

struct LockView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var errorMessage: String? = nil
    @State private var isUnlocking: Bool = false

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
                    Text("lock_welcome_back")
                        .font(.title2.bold())
                        .foregroundStyle(.white)
                        .accessibilityAddTraits(.isHeader)
                    Text("lock_subtitle")
                        .font(.callout)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }

                if let error = errorMessage {
                    Text(error)
                        .font(.callout)
                        .foregroundStyle(.red)
                        .padding(.horizontal)
                        .transition(.opacity)
                }

                // Big unlock button — triggers Face ID / Touch ID / device passcode
                Button {
                    authenticateWithDevice()
                } label: {
                    HStack(spacing: 12) {
                        Image(systemName: authIcon)
                            .font(.title2)
                        Text("lock_unlock_button")
                            .font(.title3.bold())
                    }
                    .foregroundStyle(.white)
                    .padding(.horizontal, 32)
                    .padding(.vertical, 16)
                    .background(Color("AccentPrimary"), in: Capsule())
                }
                .frame(minWidth: 44, minHeight: 48)
                .disabled(isUnlocking)
                .accessibilityLabel(Text("lock_unlock_a11y"))

                Spacer()
            }
            .padding()
        }
        .onAppear { authenticateWithDevice() }
        .animation(reduceMotion ? .none : .easeInOut, value: errorMessage)
    }

    private var authIcon: String {
        let ctx = LAContext()
        var error: NSError?
        if ctx.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            return ctx.biometryType == .faceID ? "faceid" : "touchid"
        }
        return "lock.open.fill"
    }

    private func authenticateWithDevice() {
        guard !isUnlocking else { return }
        isUnlocking = true
        errorMessage = nil

        let ctx = LAContext()
        ctx.localizedFallbackTitle = NSLocalizedString("lock_passcode_fallback", comment: "")

        ctx.evaluatePolicy(
            .deviceOwnerAuthentication,
            localizedReason: NSLocalizedString("lock_auth_reason", comment: "")
        ) { success, authError in
            Task { @MainActor in
                if success {
                    openVaultFromKeychain()
                } else if let err = authError as? LAError {
                    switch err.code {
                    case .userCancel:
                        errorMessage = NSLocalizedString("lock_tap_to_retry", comment: "")
                    case .passcodeNotSet:
                        errorMessage = NSLocalizedString("lock_no_passcode", comment: "")
                    default:
                        errorMessage = NSLocalizedString("lock_auth_failed", comment: "")
                    }
                }
                isUnlocking = false
            }
        }
    }

    private func openVaultFromKeychain() {
        guard let storedPin = KeychainService.shared.readPin() else {
            errorMessage = NSLocalizedString("lock_keychain_unavailable", comment: "")
            return
        }

        Task {
            do {
                let engine = try LunaEngine.openVault(dbPath: appState.dbPath, pin: storedPin)
                await MainActor.run {
                    appState.engine = engine
                    appState.isVaultOpen = true
                    UIAccessibility.post(
                        notification: .announcement,
                        argument: NSLocalizedString("lock_unlocked_a11y", comment: "")
                    )
                }
                await appState.refreshCycleData()
            } catch {
                await MainActor.run {
                    errorMessage = NSLocalizedString("lock_vault_error", comment: "")
                }
            }
        }
    }
}

// PINEntryView kept for potential future use (settings PIN change)
struct PINEntryView: View {
    @Binding var pin: String
    let onComplete: (String) -> Void

    private let digits = [["1","2","3"],["4","5","6"],["7","8","9"],["","0",""]]

    var body: some View {
        VStack(spacing: 12) {
            HStack(spacing: 16) {
                ForEach(0..<6, id: \.self) { i in
                    Circle()
                        .fill(i < pin.count ? Color("AccentPrimary") : Color.secondary.opacity(0.3))
                        .frame(width: 14, height: 14)
                }
            }
            .accessibilityLabel(Text("pin_entry_a11y"))
            .accessibilityValue(Text("\(pin.count) / 6"))

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
                            .accessibilityLabel(Text(digit))
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
