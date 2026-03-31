package app.luna.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import app.luna.services.VaultService
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import uniffi.luna_core.CyclePhase
import java.time.LocalDate

class HomeViewModel : ViewModel() {

    data class HomeUiState(
        val cycleDay: Int = 1,
        val cycleLength: Int = 28,
        val cyclePhase: CyclePhase = CyclePhase.UNKNOWN,
        val daysUntilNextPeriod: Int = 0,
        val phaseName: String = "",
        val insight: String? = null,
        val phaseChanged: Boolean = false,
    )

    private val _uiState = MutableStateFlow<HomeUiState?>(null)
    val uiState: StateFlow<HomeUiState?> = _uiState

    private var lastPhase: String = ""

    fun load() {
        val engine = VaultService.engine ?: return
        viewModelScope.launch {
            try {
                val prediction = engine.predictNext()
                val today = LocalDate.now()
                val nextDate = prediction.nextPeriodStart
                val daysLeft = calculateDaysLeft(nextDate, today.toString())

                val cycleDay = prediction.currentCycleDay.toInt().coerceAtLeast(1)
                val phase = prediction.currentPhase
                val cyclePhase = parseCyclePhase(phase)

                val cycleLength = try {
                    engine.getCycleSummary().averageCycleLength.toInt().coerceIn(21, 40)
                } catch (e: Exception) { 28 }

                val phaseChanged = phase != lastPhase && lastPhase.isNotEmpty()
                lastPhase = phase
                _uiState.value = HomeUiState(
                    cycleDay = cycleDay,
                    cycleLength = cycleLength,
                    cyclePhase = cyclePhase,
                    daysUntilNextPeriod = daysLeft,
                    phaseName = phase,
                    insight = null,
                    phaseChanged = phaseChanged,
                )
            } catch (e: Exception) {
                _uiState.value = HomeUiState()
            }
        }
    }

    private fun calculateDaysLeft(nextPeriodDate: String, today: String): Int {
        return try {
            val next = LocalDate.parse(nextPeriodDate)
            val now = LocalDate.parse(today)
            maxOf(0, java.time.temporal.ChronoUnit.DAYS.between(now, next).toInt())
        } catch (e: Exception) { 0 }
    }

    private fun parseCyclePhase(phase: String): CyclePhase = when (phase.lowercase()) {
        "menstrual"  -> CyclePhase.MENSTRUAL
        "follicular" -> CyclePhase.FOLLICULAR
        "ovulatory"  -> CyclePhase.OVULATORY
        "luteal"     -> CyclePhase.LUTEAL
        else         -> CyclePhase.UNKNOWN
    }
}
