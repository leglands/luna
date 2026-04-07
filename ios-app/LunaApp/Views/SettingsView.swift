// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: SettingsView (S07)                                   │
// │ Personas: P1 (Emma), P5 (Aïcha), P6 (Sophie)               │
// │ Features: F08, F09, F10, F11, F15, F16                      │
// │ CRUD: R, U, D                                                │
// │ RBAC: owner (vault_open required)                            │
// │ User Stories: US08, US09, US10, US11, US15, US16            │
// │ Why: Configuration, security actions, data export, calm mode │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI
import LocalAuthentication
import UIKit
import UniformTypeIdentifiers
import LifeDS

// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: SettingsView · Personas: P1,P5,P6 · Features: F08-F11,F16
// │ CRUD: Read,Update,Delete · RBAC: owner (vault_open)
// │ Stories: US08-US11,US16 · Why: Profile, privacy, notifications, export
// └──────────────────────────────────────────────────────────────┘

// MARK: - SettingsView

struct SettingsView: View {
    @EnvironmentObject var appState: AppState
    @State private var showPanicWipeConfirmation: Bool = false
    @State private var showExportSheet: Bool = false
    @State private var showContact: Bool = false
    @AppStorage("notif_daily_log") private var notifDailyLog: Bool = false
    @AppStorage("notif_period_reminder") private var notifPeriodReminder: Bool = false
    @AppStorage("notif_fertile_window") private var notifFertileWindow: Bool = false
    @AppStorage("notif_bbt_reminder") private var notifBBTReminder: Bool = false

    @State private var pillReminderEnabled: Bool = false
    @State private var pillReminderTime: Date = Calendar.current.date(from: DateComponents(hour: 8, minute: 0)) ?? Date()
    @State private var healthKitEnabled: Bool = false
    @State private var showShareSheet: Bool = false
    @State private var shareItems: [Any] = []
    @State private var iCloudSyncEnabled: Bool = UserDefaults.standard.bool(forKey: "icloud_sync_enabled")

    @State private var showICloudConfirm: Bool = false
    @StateObject private var themeManager = ThemeManager()

    var body: some View {
        NavigationStack {
            List {

                Section {
                    NavigationLink {
                        ProfileEditView()
                    } label: {
                        LabeledContent("settings_profile_label", value: appState.userName ?? "–")
                    }
                    .accessibilityLabel(Text("settings_profile_a11y"))
                } header: {
                    Text("settings_section_profile")
                }

                Section {
                    Toggle(isOn: $iCloudSyncEnabled) {
                        Label {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("settings_icloud_toggle")
                                Text("settings_icloud_description")
                                    .font(DSTypography.caption)
                                    .foregroundStyle(ThemeColors.textSecondary(for: themeManager.effectiveMode()))
                            }
                        } icon: {
                            Image(systemName: "icloud.and.arrow.up")
                        }
                    }
                    .accessibilityIdentifier("settings_icloud_toggle")
                    .accessibilityHint(Text("settings_icloud_hint_a11y"))
                    .onChange(of: iCloudSyncEnabled) { enabled in
                        if enabled {
                            showICloudConfirm = true
                        } else {
                            UserDefaults.standard.set(false, forKey: "icloud_sync_enabled")
                        }
                    }

                    if iCloudSyncEnabled {
                        HStack {
                            Label("settings_icloud_status", systemImage: "arrow.triangle.2.circlepath")
                            Spacer()
                            Text(iCloudStatusText)
                                .font(DSTypography.body)
                                .foregroundStyle(ThemeColors.textSecondary(for: themeManager.effectiveMode()))
                        }
                    }

                    if !iCloudSyncEnabled {
                        HStack {
                            Label("settings_storage_label", systemImage: "internaldrive")
                            Spacer()
                            Text("settings_storage_local")
                                .font(DSTypography.body)
                                .foregroundStyle(ThemeColors.textSecondary(for: themeManager.effectiveMode()))
                        }
                    }

                    DSPrivacyBadge(mode: themeManager.effectiveMode())

                    Button(role: .destructive) {
                        showPanicWipeConfirmation = true
                    } label: {
                        Label("settings_delete_all_label", systemImage: "trash")
                    }
                    .accessibilityIdentifier("panic_wipe_button")
                    .accessibilityLabel(Text("settings_delete_all_a11y"))
                    .accessibilityHint(Text("settings_delete_all_hint_a11y"))
                } header: {
                    Text("settings_section_privacy")
                }

                Section {
                    Toggle(isOn: Binding(
                        get: { appState.calmMode },
                        set: { appState.calmMode = $0 }
                    )) {
                        Label {
                            VStack(alignment: .leading, spacing: 2) {
                                Text("settings_calm_mode")
                                Text("settings_calm_mode_description")
                                    .font(DSTypography.caption)
                                    .foregroundStyle(ThemeColors.textSecondary(for: themeManager.effectiveMode()))
                            }
                        } icon: {
                            Image(systemName: "leaf")
                        }
                    }
                    .accessibilityHint(Text("settings_calm_mode_description"))
                } header: {
                    Text("settings_section_wellbeing")
                }

                Section {
                    Toggle(isOn: $notifDailyLog) {
                        Text("notif_daily_log_label")
                    }
                    .accessibilityLabel(Text("notif_daily_log_a11y"))
                    .onChange(of: notifDailyLog) { enabled in
                        handleNotifToggle(enabled: enabled) {
                            NotificationManager.shared.scheduleDailyLogReminder()
                        } onDisable: {
                            NotificationManager.shared.cancelDailyLogReminder()
                        }
                    }

                    Toggle(isOn: $notifPeriodReminder) {
                        Text("notif_period_reminder_label")
                    }
                    .onChange(of: notifPeriodReminder) { enabled in
                        handleNotifToggle(enabled: enabled) {
                        } onDisable: {
                            NotificationManager.shared.cancelAll(ofCategory: "period_reminder")
                        }
                    }

                    Toggle(isOn: $notifFertileWindow) {
                        Text("notif_fertile_window_label")
                    }
                    .onChange(of: notifFertileWindow) { enabled in
                        handleNotifToggle(enabled: enabled) {
                        } onDisable: {
                            NotificationManager.shared.cancelAll(ofCategory: "fertile_alert")
                        }
                    }

                    Toggle(isOn: $notifBBTReminder) {
                        Text("notif_bbt_reminder_label")
                    }
                    .onChange(of: notifBBTReminder) { enabled in
                        handleNotifToggle(enabled: enabled) {
                            NotificationManager.shared.scheduleBBTReminder()
                        } onDisable: {
                            NotificationManager.shared.cancelBBTReminder()
                        }
                    }

                    NavigationLink("settings_tracking_mode") {
                        TrackingModeView()
                    }
                    .frame(minHeight: 44)
                } header: {
                    Text("settings_section_notifications")
                }

                Section("settings_pill_reminder_section") {
                    Toggle("settings_pill_reminder_toggle", isOn: $pillReminderEnabled)
                        .accessibilityIdentifier("pill_reminder_toggle")
                        .frame(minHeight: 44)
                        .onChange(of: pillReminderEnabled) { enabled in
                            if enabled {
                                let fmt = DateFormatter()
                                fmt.dateFormat = "HH:mm"
                                NotificationManager.shared.schedulePillReminder(timeString: fmt.string(from: pillReminderTime))
                            } else {
                                NotificationManager.shared.cancelPillReminder()
                            }
                        }
                    if pillReminderEnabled {
                        DatePicker("settings_pill_time", selection: $pillReminderTime,
                                   displayedComponents: .hourAndMinute)
                            .frame(minHeight: 44)
                            .onChange(of: pillReminderTime) { newTime in
                                let fmt = DateFormatter()
                                fmt.dateFormat = "HH:mm"
                                NotificationManager.shared.schedulePillReminder(timeString: fmt.string(from: newTime))
                            }
                    }
                }

                Section("settings_healthkit_section") {
                    Toggle("settings_healthkit_toggle", isOn: $healthKitEnabled)
                        .frame(minHeight: 44)
                        .onChange(of: healthKitEnabled) { enabled in
                            if enabled { Task { await requestHealthKit() } }
                        }
                }

                Section {
                    NavigationLink {
                        HealthKitSettingsView()
                    } label: {
                        Label("settings_health_label", systemImage: "heart")
                    }

                    Button("export_csv_label") { exportCSV() }
                        .frame(minHeight: 44)

                    Button {
                        showExportSheet = true
                    } label: {
                        Label("settings_export_label", systemImage: "square.and.arrow.up")
                    }
                    .foregroundStyle(.primary)
                } header: {
                    Text("settings_section_integrations")
                }

                CrossPromoSection()
                    .padding(.vertical, DSSpacing.space2)

                Section {
                    LabeledContent("settings_version_label", value: appVersion)
                        .foregroundStyle(ThemeColors.textSecondary(for: themeManager.effectiveMode()))
                    Link(destination: URL(string: "https://luna-app.privacy")!) {
                        Label("settings_privacy_policy_label", systemImage: "lock.shield")
                    }
                } header: {
                    Text("settings_section_about")
                } footer: {
                    Text("settings_footer_no_server")
                        .font(DSTypography.caption)
                }

                Section {
                    Button {
                        appState.hasSeenFeatureTour = false
                    } label: {
                        Label("settings_replay_tour", systemImage: "sparkles")
                    }
                    .accessibilityIdentifier("settings_replay_tour")
                    Button {
                        showContact = true
                    } label: {
                        Label("settings_contact_label", systemImage: "message.circle.fill")
                    }
                    .accessibilityLabel("Nous contacter")
                } header: {
                    Text("settings_section_help")
                }

            }
            .navigationTitle("tab_settings")
            .confirmationDialog(
                Text("panic_wipe_confirm_title"),
                isPresented: $showPanicWipeConfirmation,
                titleVisibility: .visible
            ) {
                Button("panic_wipe_confirm_button", role: .destructive) {
                    authenticateAndWipe()
                }
                Button("cancel_button", role: .cancel) {}
            } message: {
                Text("panic_wipe_confirm_message")
            }
            .confirmationDialog("confirm_icloud_sync_title", isPresented: $showICloudConfirm, titleVisibility: .visible) {
                Button("confirm_icloud_sync_confirm") {
                    UserDefaults.standard.set(true, forKey: "icloud_sync_enabled")
                    Task {
                        let available = await ICloudSyncService.shared.checkAccountStatus()
                        if !available {
                            await MainActor.run { iCloudSyncEnabled = false }
                        } else {
                            await ICloudSyncService.shared.performFullSync(engine: appState.engine, appState: appState)
                        }
                    }
                }
                Button("cancel_button", role: .cancel) {
                    iCloudSyncEnabled = false
                }
            } message: {
                Text("confirm_icloud_sync_message")
            }
            .sheet(isPresented: $showExportSheet) {
                ExportSheetView()
            }
            .sheet(isPresented: $showShareSheet) {
                ShareSheet(items: shareItems)
            }
            .sheet(isPresented: $showContact) {
                if #available(iOS 16.4, *) {
                    DSMailContactSheet<LunaBrand>(appName: "Luna")
                } else {
                    Text("Contact us at support@macaron-software.com")
                        .padding()
                }
            }
        }
    }

    private var appVersion: String {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "1.0"
    }

    private var iCloudStatusText: String {
        switch ICloudSyncService.shared.syncStatus {
        case .idle: return NSLocalizedString("settings_icloud_status_idle", comment: "")
        case .syncing: return NSLocalizedString("settings_icloud_status_syncing", comment: "")
        case .success:
            if let date = ICloudSyncService.shared.lastSyncDate {
                let fmt = RelativeDateTimeFormatter()
                fmt.unitsStyle = .short
                return fmt.localizedString(for: date, relativeTo: Date())
            }
            return NSLocalizedString("settings_icloud_status_synced", comment: "")
        case .error: return NSLocalizedString("settings_icloud_status_error", comment: "")
        case .noAccount: return NSLocalizedString("settings_icloud_status_no_account", comment: "")
        }
    }

    private func exportCSV() {
        guard let engine = appState.engine else { return }
        Task {
            let to = ISO8601DateFormatter().string(from: Date())
            let from = ISO8601DateFormatter().string(from: Calendar.current.date(byAdding: .year, value: -2, to: Date())!)
            if let csv = try? engine.exportLogsCsv(from: from, to: to) {
                await MainActor.run {
                    shareItems = [csv]
                    showShareSheet = true
                }
            }
        }
    }

    private func handleNotifToggle(enabled: Bool, onEnable: @escaping () -> Void, onDisable: @escaping () -> Void) {
        if enabled {
            Task {
                let granted = await NotificationManager.shared.requestPermission()
                if granted {
                    onEnable()
                }
            }
        } else {
            onDisable()
        }
    }

    private func requestHealthKit() async {
        guard #available(iOS 16.0, *) else { return }
        let ok = await HealthKitManager.shared.requestAuthorization()
        await MainActor.run { healthKitEnabled = ok }
    }

    private func authenticateAndWipe() {
        let ctx = LAContext()
        ctx.evaluatePolicy(
            .deviceOwnerAuthentication,
            localizedReason: NSLocalizedString("panic_wipe_biometric_reason", comment: "")
        ) { success, _ in
            guard success else { return }
            Task { @MainActor in
                do {
                    try appState.engine?.panicWipe()
                } catch {
                }
                appState.isVaultOpen = false
                appState.engine = nil
                UIAccessibility.post(
                    notification: .announcement,
                    argument: NSLocalizedString("panic_wipe_done_a11y", comment: "")
                )
            }
        }
    }
}

// MARK: - CrossPromoSection

private struct CrossPromoSection: View {
    var body: some View {
        DSCrossPromoCard<LunaBrand>(
            targetAppName: "Aura",
            targetBrandColor: Color(hex: 0xC86B5A),
            icon: "heart.circle",
            title: String(localized: "cross_promo.luna_to_aura.title"),
            message: String(localized: "cross_promo.luna_to_aura.body"),
            ctaLabel: String(localized: "cross_promo.luna_to_aura.cta"),
            mode: .light,
            onAction: { },
            onDismiss: { }
        )
        .padding(.horizontal)
    }
}

// MARK: - ShareSheet

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }
    func updateUIViewController(_ uvc: UIActivityViewController, context: Context) {}
}

// MARK: - ProfileEditView

struct ProfileEditView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) private var dismiss
    @State private var name: String = ""

    var body: some View {
        Form {
            Section("settings_profile_label") {
                TextField("profile_name_placeholder", text: $name)
            }
        }
        .navigationTitle("settings_profile_label")
        .onAppear { name = appState.userName ?? "" }
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("save_button") {
                    appState.userName = name
                    dismiss()
                }
            }
        }
    }
}

// MARK: - HealthKitSettingsView

struct HealthKitSettingsView: View {
    @EnvironmentObject var appState: AppState

    var body: some View {
        Form {
            Section {
                Toggle("settings_health_sync_toggle", isOn: Binding(
                    get: { appState.healthSyncEnabled },
                    set: { newVal in
                        appState.healthSyncEnabled = newVal
                        if let engine = appState.engine,
                           var profile = try? engine.getUserProfile() {
                            profile = UserProfile(
                                trackingMode: profile.trackingMode,
                                contraception: profile.contraception,
                                pillReminderTime: profile.pillReminderTime,
                                notifPeriod: profile.notifPeriod,
                                notifFertile: profile.notifFertile,
                                notifPill: profile.notifPill,
                                edd: profile.edd,
                                calmMode: profile.calmMode,
                                healthSync: newVal
                            )
                            try? engine.setUserProfile(profile: profile)
                        }
                    }
                ))
            } footer: {
                Text("settings_health_sync_footer")
            }
        }
        .navigationTitle("settings_health_label")
    }
}

// MARK: - ChangePINView

struct ChangePINView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) private var dismiss
    @State private var currentPIN: String = ""
    @State private var newPIN: String = ""
    @State private var confirmPIN: String = ""
    @State private var errorMessage: String?
    @State private var showSuccess: Bool = false
    @State private var showConfirmDialog: Bool = false

    var body: some View {
        Form {
            Section {
                SecureField("change_pin_current", text: $currentPIN)
                    .accessibilityIdentifier("current_pin_field")
                    .keyboardType(.numberPad)
            } header: {
                Text("change_pin_current_section")
            }

            Section {
                SecureField("change_pin_new", text: $newPIN)
                    .accessibilityIdentifier("new_pin_field")
                    .keyboardType(.numberPad)
                SecureField("change_pin_confirm", text: $confirmPIN)
                    .accessibilityIdentifier("confirm_pin_field")
                    .keyboardType(.numberPad)
            } header: {
                Text("change_pin_new_section")
            }

            if let error = errorMessage {
                Section {
                    Text(error)
                        .foregroundStyle(.red)
                        .accessibilityIdentifier("pin_error_message")
                }
            }

            if showSuccess {
                Section {
                    Label("change_pin_success", systemImage: "checkmark.circle.fill")
                        .foregroundStyle(.green)
                        .accessibilityIdentifier("pin_success_message")
                }
            }
        }
        .navigationTitle("settings_change_pin")
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("save_button") {
                    showConfirmDialog = true
                }
                .accessibilityIdentifier("save_pin_button")
                .disabled(newPIN.count < 4 || newPIN != confirmPIN)
            }
        }
        .confirmationDialog("confirm_pin_change_title", isPresented: $showConfirmDialog, titleVisibility: .visible) {
            Button("confirm_pin_change_confirm") {
                changePIN()
            }
            Button("cancel_button", role: .cancel) {}
        } message: {
            Text("confirm_pin_change_message")
        }
    }

    private func changePIN() {
        guard newPIN == confirmPIN else {
            errorMessage = NSLocalizedString("change_pin_mismatch", comment: "")
            return
        }
        guard newPIN.count >= 4 else {
            errorMessage = NSLocalizedString("change_pin_too_short", comment: "")
            return
        }
        do {
            try appState.engine?.changePin(oldPin: currentPIN, newPin: newPIN)
            let _ = KeychainService.shared.storePin(newPIN)
            showSuccess = true
            errorMessage = nil
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) { dismiss() }
        } catch {
            errorMessage = NSLocalizedString("change_pin_wrong_current", comment: "")
        }
    }
}

// MARK: - ExportSheetView

struct ExportSheetView: View {
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) private var dismiss
    @State private var isExporting: Bool = false
    @State private var showBackupImporter: Bool = false
    @State private var backupAlertMessage: String?

    var body: some View {
        NavigationStack {
            List {
                Button {
                    export(format: "pdf")
                } label: {
                    Label("export_pdf_label", systemImage: "doc.richtext")
                }
                .frame(minHeight: 44)

                Button {
                    export(format: "csv")
                } label: {
                    Label("export_csv_label", systemImage: "tablecells")
                }
                .frame(minHeight: 44)

                Button {
                    export(format: "backup")
                } label: {
                    Label("export_encrypted_backup_label", systemImage: "lock.doc")
                }
                .frame(minHeight: 44)

                Button {
                    showBackupImporter = true
                } label: {
                    Label("Restore encrypted backup", systemImage: "square.and.arrow.down")
                }
                .frame(minHeight: 44)
            }
            .navigationTitle("settings_export_label")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("cancel_button") { dismiss() }
                }
            }
            .fileImporter(
                isPresented: $showBackupImporter,
                allowedContentTypes: [.data],
                allowsMultipleSelection: false
            ) { result in
                restoreBackup(from: result)
            }
            .alert("Encrypted backup", isPresented: Binding(
                get: { backupAlertMessage != nil },
                set: { if !$0 { backupAlertMessage = nil } }
            )) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(backupAlertMessage ?? "")
            }
        }
    }

    private func export(format: String) {
        guard let engine = appState.engine else { dismiss(); return }
        isExporting = true

        Task {
            defer { Task { @MainActor in isExporting = false } }
            let fmt = ISO8601DateFormatter()
            let to = fmt.string(from: Date())
            let from = fmt.string(from: Calendar.current.date(byAdding: .year, value: -2, to: Date())!)

            switch format {
            case "csv":
                if let csv = try? engine.exportLogsCsv(from: from, to: to) {
                    let tmpURL = FileManager.default.temporaryDirectory.appendingPathComponent("luna_export.csv")
                    try? csv.write(to: tmpURL, atomically: true, encoding: .utf8)
                    await MainActor.run {
                        let ac = UIActivityViewController(activityItems: [tmpURL], applicationActivities: nil)
                        UIApplication.shared.connectedScenes
                            .compactMap { $0 as? UIWindowScene }
                            .first?.windows.first?.rootViewController?
                            .present(ac, animated: true)
                    }
                }
            case "backup":
                if let pin = KeychainService.shared.readPin() {
                    let backupData = try? engine.exportEncryptedBackup(pin: pin)
                    if let backupData {
                        let tmpURL = FileManager.default.temporaryDirectory.appendingPathComponent("luna_backup.enc")
                        try? backupData.write(to: tmpURL)
                        await MainActor.run {
                            let ac = UIActivityViewController(activityItems: [tmpURL], applicationActivities: nil)
                            UIApplication.shared.connectedScenes
                                .compactMap { $0 as? UIWindowScene }
                                .first?.windows.first?.rootViewController?
                                .present(ac, animated: true)
                        }
                    }
                }
            default:
                break
            }
            await MainActor.run { dismiss() }
        }
    }

    private func restoreBackup(from result: Result<[URL], Error>) {
        guard let engine = appState.engine else { return }
        guard let pin = KeychainService.shared.readPin() else {
            backupAlertMessage = "PIN unavailable on this device."
            return
        }

        Task {
            do {
                let urls = try result.get()
                guard let url = urls.first else { return }
                let granted = url.startAccessingSecurityScopedResource()
                defer {
                    if granted { url.stopAccessingSecurityScopedResource() }
                }
                let data = try Data(contentsOf: url)
                let restored = try engine.importEncryptedBackup(backup: data, pin: pin)
                await MainActor.run {
                    backupAlertMessage = "Backup restored successfully (\(restored))"
                }
            } catch {
                await MainActor.run {
                    backupAlertMessage = error.localizedDescription
                }
            }
        }
    }
}
