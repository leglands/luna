// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ Screen: PregnancyLogBottomSheet (S09)                                        │
// │ Personas: P3 (Marie)                                                         │
// │ Features: F13 (Pregnancy Mode)                                               │
// │ CRUD: C, R, U                                                                │
// │ RBAC: owner (vault_open required)                                            │
// │ User Stories: US13                                                           │
// │ Why: Pregnancy log — hCG, kicks, nausea, weight                              │
// └──────────────────────────────────────────────────────────────────────────────┘
package app.luna.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.SeekBar
import android.widget.TextView
import androidx.lifecycle.lifecycleScope
import app.luna.R
import app.luna.services.VaultService
import uniffi.luna_core.PregnancyLog
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import com.google.android.material.textfield.TextInputEditText
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.util.UUID

/**
 * PregnancyLogBottomSheet — saisie quotidienne grossesse.
 * hCG + coups de pied + nausées + poids + symptômes + notes.
 * Touch targets ≥ 48dp.
 */
class PregnancyLogBottomSheet : BottomSheetDialogFragment() {

    companion object {
        const val TAG = "PregnancyLogBottomSheet"
    }

    private var hcgPositive: Boolean? = null
    private var kicks: Int = 0
    private var nauseaLevel: Int = 0
    private var weightKg: Double? = null
    private val selectedSymptoms = mutableSetOf<String>()
    private var notes: String = ""

    private val pregnancySymptoms = listOf(
        "nausea", "fatigue", "lower_back_pain", "bloating",
        "headache", "insomnia", "anxiety", "constipation"
    )

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.bottom_sheet_pregnancy_log, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupHcgPicker(view)
        setupKicksCounter(view)
        setupNauseaSlider(view)
        setupWeightInput(view)
        setupSymptomChips(view)
        setupNotesInput(view)
        setupSaveButton(view)
        loadExistingLog(view)
    }

    private fun setupHcgPicker(view: View) {
        val group = view.findViewById<RadioGroup>(R.id.hcg_group)
        val options = listOf("not_done" to null, "positive" to true, "negative" to false)
        options.forEach { (label, value) ->
            val resId = resources.getIdentifier("hcg_$label", "string", requireContext().packageName)
            RadioButton(requireContext()).apply {
                text = if (resId != 0) getString(resId) else label.replaceFirstChar { it.uppercase() }
                id = View.generateViewId()
                minHeight = dpToPx(48)
                setOnCheckedChangeListener { _, isChecked ->
                    if (isChecked) hcgPositive = value
                }
            }.also { group.addView(it) }
        }
    }

    private fun setupKicksCounter(view: View) {
        val countLabel = view.findViewById<TextView>(R.id.kicks_count)
        countLabel.text = "0"

        view.findViewById<View>(R.id.kicks_minus).setOnClickListener {
            if (kicks > 0) kicks--
            countLabel.text = kicks.toString()
            countLabel.announceForAccessibility("$kicks")
        }
        view.findViewById<View>(R.id.kicks_plus).setOnClickListener {
            if (kicks < 255) kicks++
            countLabel.text = kicks.toString()
            countLabel.announceForAccessibility("$kicks")
        }
    }

    private fun setupNauseaSlider(view: View) {
        val slider = view.findViewById<SeekBar>(R.id.nausea_slider)
        slider.max = 5
        slider.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {
            override fun onProgressChanged(sb: SeekBar, progress: Int, fromUser: Boolean) {
                nauseaLevel = progress
            }
            override fun onStartTrackingTouch(sb: SeekBar) {}
            override fun onStopTrackingTouch(sb: SeekBar) {}
        })
    }

    private fun setupWeightInput(view: View) {
        val input = view.findViewById<TextInputEditText>(R.id.weight_input)
        input?.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                val text = input.text?.toString()
                weightKg = text?.toDoubleOrNull()
            }
        }
    }

    private fun setupSymptomChips(view: View) {
        val container = view.findViewById<com.google.android.material.chip.ChipGroup>(R.id.pregnancy_symptoms_container)
        pregnancySymptoms.forEach { symptom ->
            val resId = resources.getIdentifier("symptom_$symptom", "string", requireContext().packageName)
            com.google.android.material.chip.Chip(requireContext()).apply {
                text = if (resId != 0) getString(resId) else symptom.replace("_", " ")
                isCheckable = true
                minHeight = dpToPx(48)
                setOnCheckedChangeListener { _, checked ->
                    if (checked) selectedSymptoms.add(symptom) else selectedSymptoms.remove(symptom)
                }
            }.also { container.addView(it) }
        }
    }

    private fun setupNotesInput(view: View) {
        val input = view.findViewById<TextInputEditText>(R.id.pregnancy_notes_input)
        input?.setOnFocusChangeListener { _, hasFocus ->
            if (!hasFocus) {
                notes = input.text?.toString() ?: ""
            }
        }
    }

    private fun loadExistingLog(view: View) {
        val engine = VaultService.engine ?: return
        val today = LocalDate.now().toString()
        try {
            val existing = engine.getPregnancyLog(today)
            if (existing != null) {
                kicks = existing.kicks?.toInt() ?: 0
                view.findViewById<TextView>(R.id.kicks_count).text = kicks.toString()
                nauseaLevel = existing.nauseaLevel?.toInt() ?: 0
                view.findViewById<SeekBar>(R.id.nausea_slider).progress = nauseaLevel
                weightKg = existing.weightKg
                existing.weightKg?.let {
                    view.findViewById<TextInputEditText>(R.id.weight_input)?.setText(it.toString())
                }
                notes = existing.notes ?: ""
                view.findViewById<TextInputEditText>(R.id.pregnancy_notes_input)?.setText(notes)
            }
        } catch (_: Exception) { }
    }

    private fun setupSaveButton(view: View) {
        view.findViewById<View>(R.id.pregnancy_save_button).setOnClickListener { save() }
        view.findViewById<View>(R.id.pregnancy_cancel_button).setOnClickListener { dismiss() }
    }

    private fun save() {
        val engine = VaultService.engine ?: run { dismiss(); return }
        val today = LocalDate.now().toString()

        // Capture notes from field before saving
        view?.findViewById<TextInputEditText>(R.id.pregnancy_notes_input)?.let {
            notes = it.text?.toString() ?: ""
        }
        view?.findViewById<TextInputEditText>(R.id.weight_input)?.let {
            weightKg = it.text?.toString()?.toDoubleOrNull()
        }

        lifecycleScope.launch {
            try {
                val log = PregnancyLog(
                    id = UUID.randomUUID().toString(),
                    date = today,
                    hcgPositive = hcgPositive,
                    kicks = if (kicks > 0) kicks.toUByte() else null,
                    nauseaLevel = if (nauseaLevel > 0) nauseaLevel.toUByte() else null,
                    weightKg = weightKg,
                    symptoms = selectedSymptoms.toList(),
                    notes = if (notes.isNotBlank()) notes else null
                )
                engine.logPregnancyDay(log)
                view?.announceForAccessibility(getString(R.string.log_saved_a11y))
                dismiss()
            } catch (_: Exception) { }
        }
    }

    private fun dpToPx(dp: Int): Int =
        (dp * requireContext().resources.displayMetrics.density).toInt()
}
