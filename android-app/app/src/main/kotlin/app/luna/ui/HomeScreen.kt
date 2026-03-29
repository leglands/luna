package app.luna.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Thermostat
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.macaron.lifeds.components.EmpathyBanner
import com.macaron.lifeds.components.EmpathyBannerSeverity
import com.macaron.lifeds.components.MedicalDisclaimer
import com.macaron.lifeds.components.PebbleAction
import com.macaron.lifeds.components.PebbleButton
import com.macaron.lifeds.components.PebbleStyle
import com.macaron.lifeds.components.PrivacyBadge
import com.macaron.lifeds.components.SegmentedRing
import com.macaron.lifeds.components.SegmentedRingSegment
import com.macaron.lifeds.theme.LifeBrand
import com.macaron.lifeds.tokens.LifeColors
import com.macaron.lifeds.tokens.LifeRadius
import com.macaron.lifeds.tokens.LifeSpacing
import com.macaron.lifeds.tokens.LifeTypography

@Composable
fun HomeScreen(
    cycleDay: Int,
    phaseName: String,
    daysUntilNext: Int,
    isTTCMode: Boolean,
    onLogClick: () -> Unit,
    onQuickLogPeriod: () -> Unit,
    onQuickLogSymptoms: () -> Unit,
    onQuickLogTemp: () -> Unit,
    onQuickLogMood: () -> Unit,
    modifier: Modifier = Modifier
) {
    val lunaBrand = LifeBrand.Luna

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(LifeSpacing.Spacing4)
    ) {
        PrivacyBadge(
            modifier = Modifier.padding(bottom = LifeSpacing.Spacing4)
        )

        CycleProgressSection(
            cycleDay = cycleDay,
            phaseName = phaseName,
            daysUntilNext = daysUntilNext,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        if (phaseName.isNotEmpty()) {
            EmpathyBanner(
                title = phaseName,
                message = getPhaseMessage(phaseName),
                severity = getPhaseSeverity(phaseName),
                brand = lunaBrand,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = LifeSpacing.Spacing2)
            )
        }

        if (isTTCMode) {
            CrossPromoSection(lunaBrand = lunaBrand)
        }

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        QuickLogSection(
            onLogPeriod = onQuickLogPeriod,
            onLogSymptoms = onQuickLogSymptoms,
            onLogTemp = onQuickLogTemp,
            onLogMood = onQuickLogMood,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing8))

        PebbleButton(
            text = "Log Today",
            onClick = onLogClick,
            brand = lunaBrand,
            icon = Icons.Default.Add,
            style = PebbleStyle.Primary,
            modifier = Modifier
                .fillMaxWidth()
                .semantics { contentDescription = "Log today's data" }
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        MedicalDisclaimer(
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
private fun CycleProgressSection(
    cycleDay: Int,
    phaseName: String,
    daysUntilNext: Int,
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

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.Center
    ) {
        SegmentedRing(
            segments = segments,
            currentIndex = currentIndex,
            size = 160.dp,
            strokeWidth = 16.dp,
            modifier = Modifier.semantics {
                contentDescription = "Cycle day $cycleDay of 28, $phaseName phase"
            }
        )
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = LifeSpacing.Spacing2),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Day $cycleDay",
            style = LifeTypography.TitleLarge,
            color = LifeColors.SemanticOnSurface
        )
        Text(
            text = phaseName,
            style = LifeTypography.BodyMedium,
            color = LifeColors.SemanticOnSurfaceVariant
        )
        Text(
            text = "$daysUntilNext days until next period",
            style = LifeTypography.BodySmall,
            color = LifeColors.SemanticOnSurfaceVariant
        )
    }
}

@Composable
private fun QuickLogSection(
    onLogPeriod: () -> Unit,
    onLogSymptoms: () -> Unit,
    onLogTemp: () -> Unit,
    onLogMood: () -> Unit,
    lunaBrand: LifeBrand
) {
    Column {
        Text(
            text = "Quick Log",
            style = LifeTypography.TitleMedium,
            color = LifeColors.SemanticOnSurface,
            modifier = Modifier.padding(bottom = LifeSpacing.Spacing2)
        )

        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(LifeSpacing.Spacing3)
        ) {
            item {
                PebbleAction(
                    text = "Period",
                    onClick = onLogPeriod,
                    brand = lunaBrand,
                    icon = Icons.Default.CalendarMonth,
                    modifier = Modifier.semantics {
                        contentDescription = "Log period"
                    }
                )
            }
            item {
                PebbleAction(
                    text = "Symptoms",
                    onClick = onLogSymptoms,
                    brand = lunaBrand,
                    icon = Icons.Default.Face,
                    modifier = Modifier.semantics {
                        contentDescription = "Log symptoms"
                    }
                )
            }
            item {
                PebbleAction(
                    text = "Temperature",
                    onClick = onLogTemp,
                    brand = lunaBrand,
                    icon = Icons.Default.Thermostat,
                    modifier = Modifier.semantics {
                        contentDescription = "Log temperature"
                    }
                )
            }
            item {
                PebbleAction(
                    text = "Mood",
                    onClick = onLogMood,
                    brand = lunaBrand,
                    icon = Icons.Default.Face,
                    modifier = Modifier.semantics {
                        contentDescription = "Log mood"
                    }
                )
            }
        }
    }
}

@Composable
private fun CrossPromoSection(lunaBrand: LifeBrand) {
    val auraBrand = LifeBrand.Aura
    androidx.compose.material3.Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = LifeSpacing.Spacing2)
            .semantics { contentDescription = "Cross promotion for Aura app" },
        shape = LifeRadius.Lg,
        colors = androidx.compose.material3.CardDefaults.cardColors(
            containerColor = auraBrand.primaryContainer
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing4),
            verticalAlignment = Alignment.CenterVertically
        ) {
            androidx.compose.material3.Icon(
                imageVector = Icons.Default.Face,
                contentDescription = null,
                tint = auraBrand.primary,
                modifier = Modifier.size(40.dp)
            )
            androidx.compose.material3.Spacer(modifier = Modifier.padding(LifeSpacing.Spacing2))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Track your fertility journey",
                    style = LifeTypography.TitleSmall,
                    color = auraBrand.primaryDim
                )
                Text(
                    text = "Try Aura for advanced TTC insights",
                    style = LifeTypography.BodySmall,
                    color = auraBrand.primaryDim.copy(alpha = 0.8f)
                )
            }
        }
    }
}

private fun getPhaseMessage(phaseName: String): String {
    return when (phaseName.lowercase()) {
        "menstrual" -> "This is a natural part of your cycle. Take it easy and stay hydrated."
        "follicular" -> "Energy levels are rising. A great time for new beginnings."
        "ovulatory" -> "Peak fertility window. Your body is working hard."
        "luteal" -> "Time for self-care. Pay attention to your body's signals."
        else -> "Track your cycle to see patterns."
    }
}

private fun getPhaseSeverity(phaseName: String): EmpathyBannerSeverity {
    return when (phaseName.lowercase()) {
        "menstrual" -> EmpathyBannerSeverity.Info
        "follicular" -> EmpathyBannerSeverity.Success
        "ovulatory" -> EmpathyBannerSeverity.Warning
        "luteal" -> EmpathyBannerSeverity.Info
        else -> EmpathyBannerSeverity.Info
    }
}
