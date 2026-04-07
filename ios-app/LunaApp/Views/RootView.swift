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
    @Environment(\.horizontalSizeClass) private var hSizeClass
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var showFeatureTour = false
    @State private var selectedTab: String = "today"

    var body: some View {
        Group {
            if hSizeClass == .regular {
                // ── iPad: HStack sidebar layout ──────────────────────────────
                IPadSidebarLayout(selectedTab: $selectedTab)
            } else {
                // ── iPhone: system TabView ────────────────────────────────────
                PhoneTabView(selectedTab: $selectedTab)
            }
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

// MARK: - PhoneTabView (iPhone)

private struct PhoneTabView: View {
    @Binding var selectedTab: String

    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem { Label("tab_today", systemImage: "moon.stars.fill") }
                .accessibilityLabel(Text("tab_today_a11y"))
                .tag("today")

            CalendarView()
                .tabItem { Label("tab_calendar", systemImage: "calendar") }
                .accessibilityLabel(Text("tab_calendar_a11y"))
                .tag("calendar")

            InsightsView()
                .tabItem { Label("tab_insights", systemImage: "chart.line.uptrend.xyaxis") }
                .accessibilityLabel(Text("tab_insights_a11y"))
                .tag("insights")

            SettingsView()
                .tabItem { Label("tab_settings", systemImage: "person.circle") }
                .accessibilityLabel(Text("tab_settings_a11y"))
                .tag("settings")
        }
    }
}

// MARK: - IPadSidebarLayout (iPad HStack)

private struct IPadSidebarLayout: View {
    @Binding var selectedTab: String
    @Environment(\.colorScheme) private var colorScheme

    private let lunaViolet = Color(red: 0.42, green: 0.25, blue: 0.63)   // #6B3FA0
    private let lunaContainer = Color(red: 0.91, green: 0.85, blue: 0.98)

    var body: some View {
        HStack(spacing: 0) {
            // ── Sidebar ──────────────────────────────────────────────────────
            VStack(alignment: .leading, spacing: 0) {
                // App brand mark
                HStack(spacing: 10) {
                    Image(systemName: "moon.stars.fill")
                        .font(.system(size: 22))
                        .foregroundColor(lunaViolet)
                    Text("Luna")
                        .font(.system(size: 18, weight: .bold))
                        .foregroundColor(.primary)
                }
                .padding(.horizontal, 20)
                .padding(.top, 24)
                .padding(.bottom, 16)

                Divider().padding(.bottom, 8)

                // Nav items
                ForEach(Self.sidebarItems, id: \.id) { item in
                    LunaSidebarRow(
                        item: item,
                        isSelected: selectedTab == item.id,
                        accentColor: lunaViolet,
                        containerColor: lunaContainer
                    ) {
                        selectedTab = item.id
                    }
                }

                Spacer()
            }
            .frame(width: 240)
            .background(Color(UIColor.systemBackground))

            Divider()

            // ── Content ───────────────────────────────────────────────────────
            Group {
                switch selectedTab {
                case "today":    HomeView()
                case "calendar": CalendarView()
                case "insights": InsightsView()
                case "settings": SettingsView()
                default:         HomeView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .ignoresSafeArea(edges: .bottom)
    }

    private static let sidebarItems: [(id: String, label: String, icon: String)] = [
        ("today",    "Today",    "moon.stars.fill"),
        ("calendar", "Calendar", "calendar"),
        ("insights", "Insights", "chart.line.uptrend.xyaxis"),
        ("settings", "Settings", "person.circle"),
    ]
}

private struct LunaSidebarRow: View {
    let item: (id: String, label: String, icon: String)
    let isSelected: Bool
    let accentColor: Color
    let containerColor: Color
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 14) {
                ZStack {
                    if isSelected {
                        RoundedRectangle(cornerRadius: 10)
                            .fill(containerColor)
                            .frame(width: 36, height: 36)
                    }
                    Image(systemName: item.icon)
                        .font(.system(size: 18, weight: isSelected ? .semibold : .regular))
                        .foregroundColor(isSelected ? accentColor : .secondary)
                        .frame(width: 36, height: 36)
                }
                Text(NSLocalizedString(item.label, comment: ""))
                    .font(.system(size: 15, weight: isSelected ? .semibold : .regular))
                    .foregroundColor(isSelected ? .primary : .secondary)
                Spacer()
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 10)
            .background(
                isSelected ? accentColor.opacity(0.08) : Color.clear,
                in: RoundedRectangle(cornerRadius: 12)
            )
        }
        .buttonStyle(.plain)
        .padding(.horizontal, 12)
        .accessibilityLabel(item.label)
        .accessibilityAddTraits(isSelected ? [.isSelected] : [])
    }
}
