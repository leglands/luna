// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ Screen: CalendarFragment (S05)                                               │
// │ Personas: P1 (Emma), P2 (Sarah)                                              │
// │ Features: F05 (Calendar View)                                                │
// │ CRUD: R                                                                      │
// │ RBAC: owner (vault_open required)                                            │
// │ User Stories: US05                                                           │
// │ Why: Monthly calendar grid with phase coloring                               │
// └──────────────────────────────────────────────────────────────────────────────┘
package app.luna.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import app.luna.R
import app.luna.databinding.FragmentCalendarBinding
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.TextStyle
import java.util.Locale

/**
 * CalendarFragment — vue calendrier mensuelle.
 * Affiche une grille 7 colonnes avec coloration phase cycle.
 * Navigation mois précédent/suivant.
 */
class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null
    private val binding get() = _binding!!
    private var displayedMonth: YearMonth = YearMonth.now()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCalendarBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupNavigation()
        renderMonth()
    }

    private fun setupNavigation() {
        binding.prevMonthButton.apply {
            setOnClickListener {
                displayedMonth = displayedMonth.minusMonths(1)
                renderMonth()
            }
            // a11y: cible ≥ 48dp
            contentDescription = getString(R.string.previous_month_a11y)
        }

        binding.nextMonthButton.apply {
            setOnClickListener {
                displayedMonth = displayedMonth.plusMonths(1)
                renderMonth()
            }
            contentDescription = getString(R.string.next_month_a11y)
        }
    }

    private fun renderMonth() {
        val locale = Locale.getDefault()
        val monthName = displayedMonth.month.getDisplayName(TextStyle.FULL, locale)
        binding.monthTitle.text = "$monthName ${displayedMonth.year}"
        binding.monthTitle.contentDescription = binding.monthTitle.text

        // Construire la liste des jours pour ce mois
        val firstDay = displayedMonth.atDay(1)
        val daysInMonth = displayedMonth.lengthOfMonth()
        // Décalage pour commencer la grille au bon jour de la semaine
        val startOffset = (firstDay.dayOfWeek.value % 7) // Lun=1..Dim=7 → 0-based dimanche

        val days = mutableListOf<CalendarDay?>()
        repeat(startOffset) { days.add(null) } // cellules vides
        for (d in 1..daysInMonth) {
            days.add(CalendarDay(date = displayedMonth.atDay(d)))
        }

        binding.calendarGrid.apply {
            layoutManager = GridLayoutManager(requireContext(), 7)
            adapter = CalendarDayAdapter(days) { day ->
                // Ouvrir LogBottomSheet pour ce jour
                val sheet = LogBottomSheet()
                sheet.show(parentFragmentManager, LogBottomSheet.TAG)
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

// ── Data + Adapter ─────────────────────────────────────────────────────────

data class CalendarDay(
    val date: LocalDate,
    val eventType: CalendarEventType = CalendarEventType.NONE,
)

enum class CalendarEventType { NONE, PERIOD, FERTILE, OVULATION, LOGGED }

class CalendarDayAdapter(
    private val days: List<CalendarDay?>,
    private val onDayClick: (CalendarDay) -> Unit,
) : androidx.recyclerview.widget.RecyclerView.Adapter<CalendarDayAdapter.DayViewHolder>() {

    inner class DayViewHolder(itemView: View) :
        androidx.recyclerview.widget.RecyclerView.ViewHolder(itemView) {
        val dayText: android.widget.TextView = itemView.findViewById(android.R.id.text1)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DayViewHolder {
        val v = LayoutInflater.from(parent.context)
            .inflate(android.R.layout.simple_list_item_1, parent, false)
        return DayViewHolder(v)
    }

    override fun onBindViewHolder(holder: DayViewHolder, position: Int) {
        val day = days[position]
        if (day == null) {
            holder.dayText.text = ""
            holder.dayText.isClickable = false
            holder.itemView.contentDescription = "" // a11y : cellule vide ignorée
            holder.itemView.importantForAccessibility =
                View.IMPORTANT_FOR_ACCESSIBILITY_NO
        } else {
            holder.dayText.text = day.date.dayOfMonth.toString()
            holder.itemView.setOnClickListener { onDayClick(day) }
            // a11y : date complète pour TalkBack
            holder.itemView.contentDescription = day.date.format(
                java.time.format.DateTimeFormatter.ofPattern("EEEE d MMMM", Locale.getDefault())
            )
            holder.itemView.importantForAccessibility =
                View.IMPORTANT_FOR_ACCESSIBILITY_YES
            // Fond coloré selon type d'événement — utilise les tokens LUNA (design system)
            // Period: rose (luna_phase_menstrual)
            // Fertile: sage (luna_brand_success)
            // Ovulation: coral (luna_phase_ovulation) — Visuellement distinct (Von Restorff)
            // Logged: secondary (luna_content_secondary)
            val colorRes = when (day.eventType) {
                CalendarEventType.PERIOD -> R.color.luna_phase_menstrual
                CalendarEventType.FERTILE -> R.color.luna_brand_success
                CalendarEventType.OVULATION -> R.color.luna_phase_ovulation
                CalendarEventType.LOGGED -> R.color.luna_content_secondary
                CalendarEventType.NONE -> android.R.color.transparent
            }
            holder.itemView.setBackgroundColor(
                androidx.core.content.ContextCompat.getColor(holder.itemView.context, colorRes)
            )
        }
    }

    override fun getItemCount() = days.size
}
