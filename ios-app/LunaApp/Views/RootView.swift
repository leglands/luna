// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: RootView (App Entry Point)                           │
// │ Personas: All (P1-P6)                                        │
// │ Features: F01, F02                                           │
// │ CRUD: R                                                      │
// │ RBAC: none                                                   │
// │ User Stories: US01, US02                                     │
// │ Why: Routes to Onboarding, Lock, or MainTabs                 │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI

/// Entry point — routes: onboarding → lock (optional) → main tabs
struct RootView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var autoUnlockFailed = false

    var body: some View {
        Group {
            if !appState.isOnboardingComplete {
                OnboardingView()
            } else if appState.engine != nil {
                MainTabView()
            } else {
                // Auto-unlock silently — never show LockView
                VStack(spacing: 16) {
                    ProgressView()
                        .scaleEffect(1.3)
                    Text("creating_vault_loading")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color("AppBackground").ignoresSafeArea())
                .task { await autoUnlock() }
            }
        }
        .animation(reduceMotion ? .none : .easeInOut(duration: 0.25), value: appState.isVaultOpen)
    }

    private func autoUnlock() async {
        // No lock mode — use stored PIN or default "0000", never show LockView
        let pin: String
        if let stored = KeychainService.shared.readPin() {
            pin = stored
        } else {
            pin = "0000"
            _ = KeychainService.shared.storePin("0000")
        }
        do {
            let engine = try LunaEngine.openVault(dbPath: appState.dbPath, pin: pin)
            await MainActor.run {
                appState.engine = engine
                appState.isVaultOpen = true
            }
            await appState.refreshCycleData()
        } catch {
            // Vault corrupt or wrong key — wipe DB + salt and restart onboarding fresh.
            try? FileManager.default.removeItem(atPath: appState.dbPath)
            try? FileManager.default.removeItem(atPath: appState.dbPath + ".salt")
            _ = KeychainService.shared.storePin("0000")
            if let engine = try? LunaEngine.openVault(dbPath: appState.dbPath, pin: "0000") {
                await MainActor.run {
                    appState.engine = engine
                    appState.isVaultOpen = true
                    appState.isOnboardingDone = false  // restart onboarding on fresh vault
                }
            }
        }
    }
}

// MARK: - MainTabView

struct MainTabView: View {
    @EnvironmentObject var appState: AppState
    @State private var showFeatureTour = false

    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("tab_today", systemImage: "moon.stars.fill")
                }
                .accessibilityLabel(Text("tab_today_a11y"))
                .tag("today")

            CalendarView()
                .tabItem {
                    Label("tab_calendar", systemImage: "calendar")
                }
                .accessibilityLabel(Text("tab_calendar_a11y"))
                .tag("calendar")

            InsightsView()
                .tabItem {
                    Label("tab_insights", systemImage: "chart.line.uptrend.xyaxis")
                }
                .accessibilityLabel(Text("tab_insights_a11y"))
                .tag("insights")

            SettingsView()
                .tabItem {
                    Label("tab_settings", systemImage: "person.circle")
                }
                .accessibilityLabel(Text("tab_settings_a11y"))
                .tag("settings")
        }
        .tint(Color("AccentPrimary"))
        .onAppear {
            if !appState.hasSeenFeatureTour {
                showFeatureTour = true
            }
        }
        .fullScreenCover(isPresented: $showFeatureTour) {
            FeatureTourView {
                appState.hasSeenFeatureTour = true
            }
        }
    }
}
