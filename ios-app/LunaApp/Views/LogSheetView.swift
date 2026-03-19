// ┌──────────────────────────────────────────────────────────────┐
// │ Screen: LogSheetView (S04)                                   │
// │ Personas: P1 (Emma), P2 (Sarah)                             │
// │ Features: F04 (Log Day)                                      │
// │ CRUD: C, R, U                                                │
// │ RBAC: owner (vault_open required)                            │
// │ User Stories: US04                                           │
// │ Why: Daily health data entry — mood, flow, symptoms, BBT     │
// └──────────────────────────────────────────────────────────────┘

import SwiftUI

// ┌─────────────────────────────────────────────────────────┐
// │ Screen: LogSheetView · Personas: P1,P2 · Features: F04
// │ CRUD: Create,Read,Update · RBAC: owner (vault_open)
// │ Stories: US04 · Why: Daily log — mood, flow, symptoms, BBT
// └─────────────────────────────────────────────────────────┘

struct LogSheetView: View {
    let date: Date
    @EnvironmentObject var appState: AppState
    @Environment(\.dismiss) private var dismiss
    @Environment(\.accessibilityReduceMotion) private var reduceMotion

    @State private var selectedSymptoms: Set<String> = []
    @State private var mood: Int = 0       // 0 = non défini, 1-5
    @State private var energy: Int = 0
    @State private var flow: String = "none"
    @State private var notes: String = ""
    @State private var showAdvanced: Bool = false
    @State private var bbt: String = ""
    @State private var isSaving: Bool = false
    @State private var showSavedFeedback: Bool = false
    @State private var showSaveError: Bool = false

    // Empathic UX: edit indicator + undo + discard + draft recovery
    @State private var isEditing: Bool = false
    @State private var previousLog: DailyLog? = nil
    @State private var isDirty: Bool = false
    @State private var showDiscardConfirm: Bool = false
    @State private var showDraftRecovery: Bool = false

    // Undo callback — parent view shows UndoToast
    var onSaveWithUndo: ((_ undoAction: @escaping () -> Void) -> Void)? = nil

    private var draftKey: String {
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        return "draft_log_\(fmt.string(from: date))"
    }

    // Symptômes rapides affichés en surface (les plus courants)
    private let quickSymptoms = [
        "cramps", "bloating", "fatigue", "headache",
        "breast_tenderness", "irritability", "low_mood",
        "high_energy", "motivation",
    ]

    // Symptômes avancés organisés par catégorie (Hick's Law)
    private let symptomCategories: [(String, [String])] = [
        ("symptoms_menstrual", ["cramps", "flow_light", "flow_medium", "flow_heavy", "clots", "lower_back_pain", "bloating", "nausea", "headache", "fatigue", "diarrhea"]),
        ("symptoms_pms", ["breast_tenderness", "breast_swelling", "water_retention", "acne", "irritability", "anxiety", "low_mood", "cravings_sweet", "cravings_salty", "insomnia", "migraine", "constipation", "low_libido"]),
        ("symptoms_ovulatory", ["high_libido", "mittelschmerz", "light_spotting", "high_energy"]),
        ("symptoms_general", ["dizziness", "fever", "cold", "high_stress", "poor_sleep", "intense_exercise", "travel"]),
        ("symptoms_perimenopause", ["hot_flash", "night_sweats", "vaginal_dryness"]),
    ]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {

                    // ── Date ──────────────────────────────────────────────
                    Text(date, format: .dateTime.weekday(.wide).day().month(.wide))
                        .font(.title3.bold())
                        .padding(.horizontal)
                        .accessibilityAddTraits(.isHeader)

                    // ── Humeur ────────────────────────────────────────────
                    MoodPicker(selection: $mood)
                        .padding(.horizontal)

                    // ── Énergie ───────────────────────────────────────────
                    EnergyPicker(selection: $energy)
                        .padding(.horizontal)

                    // ── Règles ────────────────────────────────────────────
                    FlowPicker(selection: $flow)
                        .padding(.horizontal)

                    // ── Symptômes rapides ─────────────────────────────────
                    VStack(alignment: .leading, spacing: 12) {
                        Text("symptoms_section_title")
                            .font(.subheadline.bold())
                            .padding(.horizontal)
                            .accessibilityAddTraits(.isHeader)

                        SymptomChipsRow(
                            symptoms: quickSymptoms,
                            selected: $selectedSymptoms
                        )
                        .padding(.horizontal)

                        // Catégories complètes (Hick's Law : disclosure progressive)
                        ForEach(symptomCategories, id: \.0) { category, symptoms in
                            DisclosureGroup {
                                SymptomChipsRow(
                                    symptoms: symptoms.filter { !quickSymptoms.contains($0) },
                                    selected: $selectedSymptoms
                                )
                                .padding(.top, 4)
                            } label: {
                                Text(LocalizedStringKey(category))
                                    .font(.caption.weight(.medium))
                                    .foregroundStyle(.secondary)
                            }
                            .padding(.horizontal)
                        }
                    }

                    // ── Section avancée (BBT, LH, glaire) ────────────────
                    DisclosureGroup(
                        isExpanded: $showAdvanced,
                        content: {
                            AdvancedBiometricsView(bbt: $bbt)
                                .padding(.horizontal)
                                .padding(.top, 8)
                        },
                        label: {
                            Label("advanced_section_title", systemImage: "chart.line.uptrend.xyaxis")
                                .font(.subheadline.bold())
                                .foregroundStyle(Color("AccentSecondary"))
                        }
                    )
                    .padding(.horizontal)
                    .animation(reduceMotion ? .none : .default, value: showAdvanced)

                    // ── Note libre ────────────────────────────────────────
                    VStack(alignment: .leading, spacing: 8) {
                        Text("notes_label")
                            .font(.subheadline.bold())
                            .padding(.horizontal)
                        TextField("notes_placeholder", text: $notes, axis: .vertical)
                            .lineLimit(3...6)
                            .padding(12)
                            .background(Color("CardBackground"), in: RoundedRectangle(cornerRadius: 12))
                            .padding(.horizontal)
                            .accessibilityLabel(Text("notes_a11y"))
                    }

                    Spacer(minLength: 32)
                }
                .padding(.top, 20)
            }
            .navigationTitle(isEditing ? "log_editing_title" : "log_sheet_title")
            .navigationBarTitleDisplayMode(.inline)
            .alert("log_save_error_title", isPresented: $showSaveError) {
                Button("ok_button", role: .cancel) { }
            } message: {
                Text("log_save_error_message")
            }
            .confirmationDialog("discard_changes_title", isPresented: $showDiscardConfirm, titleVisibility: .visible) {
                Button("discard_changes_confirm", role: .destructive) { clearDraft(); dismiss() }
                Button("cancel_button", role: .cancel) { }
            } message: {
                Text("discard_changes_message")
            }
            .interactiveDismissDisabled(isDirty)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("cancel_button") {
                        if isDirty {
                            showDiscardConfirm = true
                        } else {
                            dismiss()
                        }
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(isEditing ? "update_button" : "save_button") {
                        Task { await save() }
                    }
                    .disabled(isSaving)
                    .bold()
                    .accessibilityIdentifier("log_save_button")
                }
            }
        }
        .overlay {
            // Peak-End Rule : checkmark feedback après save
            if showSavedFeedback {
                VStack(spacing: 12) {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 48))
                        .foregroundStyle(Color("AccentPrimary"))
                    Text("log_saved_feedback")
                        .font(.headline)
                        .foregroundStyle(.primary)
                }
                .padding(32)
                .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 20))
                .transition(.scale.combined(with: .opacity))
            }
        }
        .animation(reduceMotion ? .none : .easeOut(duration: 0.3), value: showSavedFeedback)
        .onAppear { loadExistingLog() }
        .onChange(of: selectedSymptoms) { _ in isDirty = true; saveDraft() }
        .onChange(of: mood) { _ in isDirty = true; saveDraft() }
        .onChange(of: energy) { _ in isDirty = true; saveDraft() }
        .onChange(of: flow) { _ in isDirty = true; saveDraft() }
        .onChange(of: notes) { _ in isDirty = true; saveDraft() }
        .onChange(of: bbt) { _ in isDirty = true; saveDraft() }
        .alert("draft_recovery_title", isPresented: $showDraftRecovery) {
            Button("draft_recovery_restore") { restoreDraft() }
            Button("draft_recovery_discard", role: .destructive) { clearDraft() }
        } message: {
            Text("draft_recovery_message")
        }
    }

    /// Load existing log for this date (edit mode), check for draft, or start fresh
    private func loadExistingLog() {
        guard let engine = appState.engine else { return }
        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        let dateStr = fmt.string(from: date)

        if let existing = try? engine.getLog(date: dateStr) {
            isEditing = true
            previousLog = existing
            selectedSymptoms = Set(existing.symptoms)
            mood = existing.mood.map { Int($0) } ?? 0
            energy = existing.energy.map { Int($0) } ?? 0
            flow = existing.flow ?? "none"
            notes = existing.notes ?? ""
            if let b = existing.bbt { bbt = String(format: "%.2f", b) }
            isDirty = false
        } else if UserDefaults.standard.dictionary(forKey: draftKey) != nil {
            // Draft exists for this date — ask user
            showDraftRecovery = true
        }
    }

    // MARK: - Draft Recovery

    private func saveDraft() {
        let draft: [String: Any] = [
            "symptoms": Array(selectedSymptoms),
            "mood": mood,
            "energy": energy,
            "flow": flow,
            "notes": notes,
            "bbt": bbt
        ]
        UserDefaults.standard.set(draft, forKey: draftKey)
    }

    private func restoreDraft() {
        guard let draft = UserDefaults.standard.dictionary(forKey: draftKey) else { return }
        if let s = draft["symptoms"] as? [String] { selectedSymptoms = Set(s) }
        if let m = draft["mood"] as? Int { mood = m }
        if let e = draft["energy"] as? Int { energy = e }
        if let f = draft["flow"] as? String { flow = f }
        if let n = draft["notes"] as? String { notes = n }
        if let b = draft["bbt"] as? String { bbt = b }
        isDirty = true
    }

    private func clearDraft() {
        UserDefaults.standard.removeObject(forKey: draftKey)
    }

    private func save() async {
        guard let engine = appState.engine else { return }
        isSaving = true
        defer { isSaving = false }

        let fmt = DateFormatter()
        fmt.dateFormat = "yyyy-MM-dd"
        let dateStr = fmt.string(from: date)

        let log = DailyLog(
            id: UUID().uuidString,
            date: dateStr,
            symptoms: Array(selectedSymptoms),
            mood: mood > 0 ? UInt8(mood) : nil,
            energy: energy > 0 ? UInt8(energy) : nil,
            bbt: Double(bbt),
            lhTest: nil,
            cervicalMucus: nil,
            sexualActivity: nil,
            flow: flow == "none" ? nil : flow,
            sleepQuality: nil,
            weightKg: nil,
            notes: notes.isEmpty ? nil : notes
        )

        do {
            try engine.logDay(log: log)
            clearDraft()
            let generator = UIImpactFeedbackGenerator(style: .medium)
            generator.impactOccurred()
            showSavedFeedback = true
            try? await Task.sleep(nanoseconds: 600_000_000)
            UIAccessibility.post(
                notification: .announcement,
                argument: NSLocalizedString("log_saved_a11y", comment: "")
            )

            // Provide undo capability to parent
            let savedPreviousLog = previousLog
            onSaveWithUndo?({
                // Undo: restore previous log or delete if new
                if let prev = savedPreviousLog {
                    try? engine.logDay(log: prev)
                }
                // Refresh cycle data after undo
                Task { await appState.refreshCycleData() }
            })

            dismiss()
        } catch {
            await MainActor.run { showSaveError = true }
        }
    }
}

// MARK: - MoodPicker

struct MoodPicker: View {
    @Binding var selection: Int
    private let keys = ["mood_very_bad", "mood_bad", "mood_neutral", "mood_good", "mood_great"]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("mood_label")
                .font(.subheadline.bold())
                .accessibilityAddTraits(.isHeader)

            HStack(spacing: 8) {
                ForEach(1...5, id: \.self) { value in
                    Button {
                        selection = (selection == value) ? 0 : value
                        // Flow : haptic feedback immédiat
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    } label: {
                        ZStack {
                            Circle()
                                .fill(selection == value ? Color("AccentPrimary") : Color("CardBackground"))
                            Circle()
                                .strokeBorder(
                                    selection == value ? Color("AccentPrimary") : Color.secondary.opacity(0.35),
                                    lineWidth: 1.5
                                )
                            Text("\(value)")
                                .font(.callout.weight(.medium))
                                .foregroundColor(selection == value ? .white : .secondary)
                        }
                        .frame(width: 44, height: 44)
                    }
                    .accessibilityLabel(Text(LocalizedStringKey(keys[value - 1])))
                    .accessibilityIdentifier("mood_\(value)")
                    .accessibilityAddTraits(selection == value ? .isSelected : [])
                    .accessibilityHint(
                        Text(selection == value ? "tap_to_deselect_a11y" : "tap_to_select_a11y")
                    )
                }
            }

            if selection > 0 {
                Text(LocalizedStringKey(keys[selection - 1]))
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .transition(.opacity)
            } else {
                // Jakob's Law : toujours montrer les labels texte (pas juste a11y)
                HStack(spacing: 0) {
                    Text(LocalizedStringKey("mood_very_bad"))
                        .font(.system(size: 9))
                    Spacer()
                    Text(LocalizedStringKey("mood_great"))
                        .font(.system(size: 9))
                }
                .foregroundColor(.secondary.opacity(0.6))
            }
        }
    }
}

// MARK: - EnergyPicker

struct EnergyPicker: View {
    @Binding var selection: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("energy_label")
                .font(.subheadline.bold())
                .accessibilityAddTraits(.isHeader)

            HStack(spacing: 8) {
                Image(systemName: "battery.0")
                    .foregroundStyle(.secondary)
                    .accessibilityHidden(true)

                Slider(value: Binding(
                    get: { Double(selection) },
                    set: { selection = Int($0.rounded()) }
                ), in: 0...5, step: 1)
                .accessibilityLabel(Text("energy_slider_a11y"))
                .accessibilityValue(Text("energy_value_\(selection)_a11y"))

                Image(systemName: "bolt.fill")
                    .foregroundStyle(Color("AccentPrimary"))
                    .accessibilityHidden(true)
            }
        }
    }
}

// MARK: - FlowPicker

struct FlowPicker: View {
    @Binding var selection: String
    private let options = ["none", "spotting", "light", "medium", "heavy"]

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("flow_label")
                .font(.subheadline.bold())
                .accessibilityAddTraits(.isHeader)

            HStack(spacing: 8) {
                ForEach(options, id: \.self) { opt in
                    Button {
                        selection = opt
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    } label: {
                        Text(NSLocalizedString("flow_\(opt)", comment: "Flow level"))
                            .font(.caption)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(
                                selection == opt
                                    ? Color("AccentPrimary")
                                    : Color("CardBackground"),
                                in: Capsule()
                            )
                            .foregroundStyle(selection == opt ? .white : .primary)
                    }
                    .frame(minHeight: 44)
                    .accessibilityIdentifier("flow_\(opt)")
                    .accessibilityAddTraits(selection == opt ? .isSelected : [])
                }
            }
        }
    }
}

// MARK: - SymptomChipsRow

struct SymptomChipsRow: View {
    let symptoms: [String]
    @Binding var selected: Set<String>

    var body: some View {
        // Grille de chips — wrapping layout
        FlowLayout(spacing: 8) {
            ForEach(symptoms, id: \.self) { symptom in
                SymptomChip(
                    symptom: symptom,
                    isSelected: selected.contains(symptom)
                ) {
                    if selected.contains(symptom) {
                        selected.remove(symptom)
                    } else {
                        selected.insert(symptom)
                    }
                }
            }
        }
    }
}

struct SymptomChip: View {
    let symptom: String
    let isSelected: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            Text(NSLocalizedString("symptom_\(symptom)", comment: "Symptom chip label"))
                .font(.caption)
                .padding(.horizontal, 14)
                .padding(.vertical, 8)
                .background(
                    isSelected ? Color("AccentPrimary") : Color("CardBackground"),
                    in: Capsule()
                )
                .foregroundStyle(isSelected ? .white : .primary)
                .overlay(
                    Capsule().stroke(
                        isSelected ? Color.clear : Color.secondary.opacity(0.3),
                        lineWidth: 1
                    )
                )
        }
        .frame(minHeight: 44) // a11y: cible ≥ 44pt
        .accessibilityLabel(Text(NSLocalizedString("symptom_\(symptom)_a11y", comment: "Symptom accessibility label")))
        .accessibilityAddTraits(isSelected ? .isSelected : [])
        .accessibilityHint(
            Text(isSelected ? "tap_to_deselect_a11y" : "tap_to_select_symptom_a11y")
        )
    }
}

// MARK: - AdvancedBiometricsView

struct AdvancedBiometricsView: View {
    @Binding var bbt: String
    @State private var showBbtInfo = false

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // BBT — Cognitive Load : tooltip expliquant la mesure
            HStack {
                VStack(alignment: .leading) {
                    HStack(spacing: 4) {
                        Text("bbt_label")
                            .font(.subheadline.bold())
                        Button {
                            showBbtInfo.toggle()
                        } label: {
                            Image(systemName: "info.circle")
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                        .accessibilityLabel(Text("bbt_info_a11y"))
                    }
                    if showBbtInfo {
                        Text("bbt_tooltip")
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                            .padding(8)
                            .background(Color(.secondarySystemBackground))
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                    } else {
                        Text("bbt_hint")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                Spacer()
                TextField("bbt_placeholder", text: $bbt)
                    .keyboardType(.decimalPad)
                    .multilineTextAlignment(.trailing)
                    .frame(width: 80)
                    .accessibilityLabel(Text("bbt_a11y_label"))
                    .accessibilityHint(Text("bbt_a11y_hint"))
                    // Postel's Law : accept both comma and dot
                    .onChange(of: bbt) { newValue in
                        bbt = newValue.replacingOccurrences(of: ",", with: ".")
                    }
            }
        }
    }
}

// MARK: - FlowLayout (chip wrapping)

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = proposal.width ?? 0
        var x: CGFloat = 0
        var y: CGFloat = 0
        var maxH: CGFloat = 0

        for view in subviews {
            let size = view.sizeThatFits(.unspecified)
            if x + size.width > width, x > 0 {
                x = 0
                y += maxH + spacing
                maxH = 0
            }
            x += size.width + spacing
            maxH = max(maxH, size.height)
        }
        return CGSize(width: width, height: y + maxH)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var x = bounds.minX
        var y = bounds.minY
        var maxH: CGFloat = 0

        for view in subviews {
            let size = view.sizeThatFits(.unspecified)
            if x + size.width > bounds.maxX, x > bounds.minX {
                x = bounds.minX
                y += maxH + spacing
                maxH = 0
            }
            view.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(size))
            x += size.width + spacing
            maxH = max(maxH, size.height)
        }
    }
}
