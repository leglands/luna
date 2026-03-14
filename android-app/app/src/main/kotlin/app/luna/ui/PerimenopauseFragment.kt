package app.luna.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import app.luna.R
import app.luna.services.VaultService
import uniffi.luna_core.DailyLog
import com.google.android.material.button.MaterialButton
import com.google.android.material.card.MaterialCardView
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.util.UUID

/**
 * PerimenopauseFragment — Dashboard dédié péri-ménopause.
 * Quick-log symptômes + variabilité cycle + info scientifique.
 */
class PerimenopauseFragment : Fragment() {

    private val perimenopauseSymptoms = listOf(
        "hot_flash" to R.string.symptom_hot_flash,
        "night_sweats" to R.string.symptom_night_sweats,
        "vaginal_dryness" to R.string.symptom_vaginal_dryness,
        "insomnia" to R.string.symptom_insomnia,
        "anxiety" to R.string.symptom_anxiety,
        "fatigue" to R.string.symptom_fatigue,
    )

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        return inflater.inflate(R.layout.fragment_perimenopause, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupQuickLogButtons(view)
        loadCycleVariability(view)
    }

    private fun setupQuickLogButtons(view: View) {
        val container = view.findViewById<LinearLayout>(R.id.perimenopause_symptoms_grid)
        perimenopauseSymptoms.forEach { (symptomKey, labelRes) ->
            MaterialButton(requireContext()).apply {
                text = getString(labelRes)
                minHeight = dpToPx(48)
                setOnClickListener { quickLogSymptom(symptomKey) }
                contentDescription = getString(labelRes)
            }.also {
                container.addView(it, LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply { bottomMargin = dpToPx(8) })
            }
        }
    }

    private fun quickLogSymptom(symptom: String) {
        val engine = VaultService.engine ?: return
        val today = LocalDate.now().toString()

        lifecycleScope.launch {
            try {
                val existing = engine.getLog(today)
                val symptoms = existing?.symptoms?.toMutableList() ?: mutableListOf()
                if (!symptoms.contains(symptom)) {
                    symptoms.add(symptom)
                }
                val log = DailyLog(
                    id = existing?.id ?: UUID.randomUUID().toString(),
                    date = today,
                    symptoms = symptoms,
                    mood = existing?.mood,
                    energy = existing?.energy,
                    bbt = existing?.bbt,
                    lhTest = existing?.lhTest,
                    cervicalMucus = existing?.cervicalMucus,
                    sexualActivity = existing?.sexualActivity,
                    flow = existing?.flow,
                    notes = existing?.notes,
                    sleepQuality = existing?.sleepQuality,
                    weightKg = existing?.weightKg
                )
                engine.logDay(log)
                view?.announceForAccessibility(
                    getString(R.string.symptom_logged_a11y)
                )
            } catch (_: Exception) { }
        }
    }

    private fun loadCycleVariability(view: View) {
        val engine = VaultService.engine ?: return
        val chartContainer = view.findViewById<LinearLayout>(R.id.cycle_variability_container)
        val infoText = view.findViewById<TextView>(R.id.variability_info_text)

        lifecycleScope.launch {
            try {
                val cycles = engine.getCycles(12u)
                if (cycles.size < 2) {
                    infoText.text = getString(R.string.perimenopause_need_more_data)
                    return@launch
                }

                val lengths = cycles.filter { it.endDate != null }.mapNotNull { cycle ->
                    val start = LocalDate.parse(cycle.startDate)
                    val end = LocalDate.parse(cycle.endDate)
                    java.time.temporal.ChronoUnit.DAYS.between(start, end).toInt()
                }

                if (lengths.isNotEmpty()) {
                    val avg = lengths.average()
                    val min = lengths.min()
                    val max = lengths.max()
                    infoText.text = getString(
                        R.string.perimenopause_variability_summary,
                        avg.toInt(), min, max
                    )

                    // Bar chart
                    val chart = CycleChartView(requireContext())
                    chart.setData(lengths.map { it.toFloat() })
                    chart.layoutParams = LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        dpToPx(200)
                    )
                    chartContainer.addView(chart)
                }
            } catch (_: Exception) { }
        }
    }

    private fun dpToPx(dp: Int): Int =
        (dp * requireContext().resources.displayMetrics.density).toInt()
}
