package app.luna.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.macaron.lifeds.components.SegmentedRing
import com.macaron.lifeds.components.SegmentedRingSegment
import com.macaron.lifeds.theme.LifeBrand
import com.macaron.lifeds.tokens.LifeColors
import com.macaron.lifeds.tokens.LifeRadius
import com.macaron.lifeds.tokens.LifeSpacing
import com.macaron.lifeds.tokens.LifeTypography
import java.time.DayOfWeek
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.TextStyle
import java.util.Locale

@Composable
fun CalendarScreen(
    currentMonth: YearMonth,
    selectedDate: LocalDate?,
    cycleEvents: Map<LocalDate, CycleEventType>,
    cycleDay: Int,
    onMonthChange: (YearMonth) -> Unit,
    onDateSelected: (LocalDate) -> Unit,
    modifier: Modifier = Modifier
) {
    val lunaBrand = LifeBrand.Luna
    var displayedMonth by remember { mutableStateOf(currentMonth) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(LifeSpacing.Spacing4)
    ) {
        CycleOverviewCard(
            cycleDay = cycleDay,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = LifeRadius.Lg,
            colors = CardDefaults.cardColors(
                containerColor = Color.White
            )
        ) {
            Column(
                modifier = Modifier.padding(LifeSpacing.Spacing4)
            ) {
                MonthHeader(
                    month = displayedMonth,
                    onPreviousMonth = { displayedMonth = displayedMonth.minusMonths(1) },
                    onNextMonth = { displayedMonth = displayedMonth.plusMonths(1) }
                )

                Spacer(modifier = Modifier.height(LifeSpacing.Spacing2))

                WeekdayHeader()

                Spacer(modifier = Modifier.height(LifeSpacing.Spacing2))

                CalendarGrid(
                    month = displayedMonth,
                    selectedDate = selectedDate,
                    cycleEvents = cycleEvents,
                    onDateSelected = onDateSelected,
                    lunaBrand = lunaBrand
                )

                Spacer(modifier = Modifier.height(LifeSpacing.Spacing3))

                CalendarLegend(lunaBrand = lunaBrand)
            }
        }
    }
}

@Composable
private fun CycleOverviewCard(
    cycleDay: Int,
    lunaBrand: LifeBrand
) {
    val segments = listOf(
        SegmentedRingSegment(0.18f, lunaBrand.primary),
        SegmentedRingSegment(0.14f, lunaBrand.secondary),
        SegmentedRingSegment(0.07f, Color(0xFFE8523A)),
        SegmentedRingSegment(0.61f, Color(0xFF7A9E6B))
    )

    val currentIndex = when {
        cycleDay <= 5 -> 0
        cycleDay <= 9 -> 1
        cycleDay <= 11 -> 2
        else -> 3
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = LifeRadius.Lg,
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing4),
            verticalAlignment = Alignment.CenterVertically
        ) {
            SegmentedRing(
                segments = segments,
                currentIndex = currentIndex,
                size = 80.dp,
                strokeWidth = 10.dp,
                modifier = Modifier.semantics {
                    contentDescription = "Cycle day $cycleDay of 28"
                }
            )

            Spacer(modifier = Modifier.padding(LifeSpacing.Spacing3))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Day $cycleDay",
                    style = LifeTypography.TitleMedium,
                    color = LifeColors.SemanticOnSurface
                )
                Text(
                    text = "Cycle Progress",
                    style = LifeTypography.BodySmall,
                    color = LifeColors.SemanticOnSurfaceVariant
                )
            }
        }
    }
}

@Composable
private fun MonthHeader(
    month: YearMonth,
    onPreviousMonth: () -> Unit,
    onNextMonth: () -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(
            onClick = onPreviousMonth,
            modifier = Modifier.semantics {
                contentDescription = "Previous month"
            }
        ) {
            Icon(
                imageVector = Icons.AutoMirrored.Filled.KeyboardArrowLeft,
                contentDescription = "Previous month"
            )
        }

        Text(
            text = "${month.month.getDisplayName(TextStyle.FULL, Locale.getDefault())} ${month.year}",
            style = LifeTypography.TitleMedium,
            color = LifeColors.SemanticOnSurface,
            modifier = Modifier.semantics { contentDescription = "${month.month.getDisplayName(TextStyle.FULL, Locale.getDefault())} ${month.year}" }
        )

        IconButton(
            onClick = onNextMonth,
            modifier = Modifier.semantics {
                contentDescription = "Next month"
            }
        ) {
            Icon(
                imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                contentDescription = "Next month"
            )
        }
    }
}

@Composable
private fun WeekdayHeader() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        val weekdays = listOf(
            DayOfWeek.SUNDAY, DayOfWeek.MONDAY, DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY,
            DayOfWeek.SATURDAY
        )
        weekdays.forEach { day ->
            Text(
                text = day.getDisplayName(TextStyle.SHORT, Locale.getDefault()),
                style = LifeTypography.LabelSmall,
                color = LifeColors.SemanticOnSurfaceVariant,
                modifier = Modifier.weight(1f),
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun CalendarGrid(
    month: YearMonth,
    selectedDate: LocalDate?,
    cycleEvents: Map<LocalDate, CycleEventType>,
    onDateSelected: (LocalDate) -> Unit,
    lunaBrand: LifeBrand
) {
    val firstDayOfMonth = month.atDay(1)
    val lastDayOfMonth = month.atEndOfMonth()
    val firstDayOfWeek = firstDayOfMonth.dayOfWeek.value % 7
    val daysInMonth = month.lengthOfMonth()

    val calendarDays = mutableListOf<LocalDate?>()

    repeat(firstDayOfWeek) { calendarDays.add(null) }
    for (day in 1..daysInMonth) {
        calendarDays.add(month.atDay(day))
    }

    LazyVerticalGrid(
        columns = GridCells.Fixed(7),
        modifier = Modifier.height(((calendarDays.size / 7 + 1) * 48).dp),
        userScrollEnabled = false
    ) {
        items(calendarDays) { date ->
            if (date != null) {
                CalendarDayCell(
                    date = date,
                    isToday = date == LocalDate.now(),
                    isSelected = date == selectedDate,
                    eventType = cycleEvents[date],
                    onDateSelected = onDateSelected,
                    lunaBrand = lunaBrand
                )
            } else {
                Box(modifier = Modifier.aspectRatio(1f))
            }
        }
    }
}

@Composable
private fun CalendarDayCell(
    date: LocalDate,
    isToday: Boolean,
    isSelected: Boolean,
    eventType: CycleEventType?,
    onDateSelected: (LocalDate) -> Unit,
    lunaBrand: LifeBrand
) {
    val backgroundColor = when {
        isSelected -> lunaBrand.primary
        isToday -> Color.Transparent
        else -> Color.Transparent
    }

    val textColor = when {
        isSelected -> Color.White
        isToday -> lunaBrand.primary
        else -> LifeColors.SemanticOnSurface
    }

    val eventColor = when (eventType) {
        CycleEventType.PERIOD -> lunaBrand.primary
        CycleEventType.FERTILE -> Color(0xFF7AB891)
        CycleEventType.OVULATION -> Color(0xFFE8523A)
        CycleEventType.LOGGED -> Color.Gray
        null -> Color.Transparent
    }

    Column(
        modifier = Modifier
            .aspectRatio(1f)
            .padding(2.dp)
            .clip(CircleShape)
            .background(backgroundColor)
            .clickable { onDateSelected(date) }
            .semantics {
                contentDescription = "${date.month.getDisplayName(TextStyle.FULL, Locale.getDefault())} ${date.dayOfMonth}${if (isToday) ", today" else ""}${if (isSelected) ", selected" else ""}"
            },
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = date.dayOfMonth.toString(),
            style = LifeTypography.BodyMedium,
            color = textColor
        )
        if (eventType != null) {
            Box(
                modifier = Modifier
                    .size(6.dp)
                    .clip(CircleShape)
                    .background(eventColor)
            )
        }
    }
}

@Composable
private fun CalendarLegend(lunaBrand: LifeBrand) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        LegendItem(color = lunaBrand.primary, label = "Period")
        LegendItem(color = Color(0xFF7AB891), label = "Fertile")
        LegendItem(color = Color(0xFFE8523A), label = "Ovulation")
        LegendItem(color = Color.Gray, label = "Logged")
    }
}

@Composable
private fun LegendItem(color: Color, label: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        Box(
            modifier = Modifier
                .size(10.dp)
                .clip(CircleShape)
                .background(color)
        )
        Text(
            text = label,
            style = LifeTypography.LabelSmall,
            color = LifeColors.SemanticOnSurfaceVariant
        )
    }
}

enum class CycleEventType {
    PERIOD,
    FERTILE,
    OVULATION,
    LOGGED
}
