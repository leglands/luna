package app.luna.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.macaron.lifeds.components.Citation
import com.macaron.lifeds.components.EvidenceCard
import com.macaron.lifeds.components.MedicalDisclaimer
import com.macaron.lifeds.theme.LifeBrand
import com.macaron.lifeds.tokens.LifeColors
import com.macaron.lifeds.tokens.LifeRadius
import com.macaron.lifeds.tokens.LifeSpacing
import com.macaron.lifeds.tokens.LifeTypography

@Composable
fun InsightsScreen(
    averageCycleLength: Float?,
    averagePeriodLength: Float?,
    cycleLengthHistory: List<Pair<Int, Int>>,
    symptomFrequencies: Map<String, Float>,
    lunaBrand: LifeBrand = LifeBrand.Luna,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .padding(LifeSpacing.Spacing4),
        verticalArrangement = Arrangement.spacedBy(LifeSpacing.Spacing4)
    ) {
        item {
            Text(
                text = "Cycle Statistics",
                style = LifeTypography.TitleLarge,
                color = LifeColors.SemanticOnSurface,
                modifier = Modifier.semantics {
                    contentDescription = "Cycle statistics section"
                }
            )
        }

        item {
            CycleStatsRow(
                averageCycleLength = averageCycleLength,
                averagePeriodLength = averagePeriodLength,
                lunaBrand = lunaBrand
            )
        }

        if (symptomFrequencies.isNotEmpty()) {
            item {
                Text(
                    text = "Symptom Frequency",
                    style = LifeTypography.TitleMedium,
                    color = LifeColors.SemanticOnSurface,
                    modifier = Modifier.padding(top = LifeSpacing.Spacing2)
                )
            }

            items(symptomFrequencies.toList()) { (symptom, frequency) ->
                SymptomFrequencyRow(
                    symptom = symptom,
                    frequency = frequency,
                    lunaBrand = lunaBrand
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(LifeSpacing.Spacing2))
            Text(
                text = "Evidence-Based Insights",
                style = LifeTypography.TitleMedium,
                color = LifeColors.SemanticOnSurface
            )
        }

        item {
            EvidenceCard(
                citation = Citation(
                    title = "Normal Menstrual Cycle Characteristics",
                    authors = "ACOG Committee Opinion",
                    journal = "Obstetrics & Gynecology",
                    year = 2022,
                    doi = "10.1097/AOG.0000000000004789"
                ),
                summary = "Regular cycles between 21-35 days are associated with normal ovulation patterns.",
                modifier = Modifier.semantics {
                    contentDescription = "Evidence: Normal Menstrual Cycle Characteristics"
                }
            )
        }

        item {
            EvidenceCard(
                citation = Citation(
                    title = "Basal Body Temperature and Ovulation Prediction",
                    authors = "Women's Health Research Foundation",
                    journal = "Fertility and Sterility",
                    year = 2021,
                    doi = "10.1016/j.fertnstert.2020.01.034"
                ),
                summary = "Basal body temperature tracking can help identify ovulation with 76% accuracy.",
                modifier = Modifier.semantics {
                    contentDescription = "Evidence: Basal Body Temperature and Ovulation Prediction"
                }
            )
        }

        item {
            MedicalDisclaimer(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = LifeSpacing.Spacing4)
            )
        }
    }
}

@Composable
private fun CycleStatsRow(
    averageCycleLength: Float?,
    averagePeriodLength: Float?,
    lunaBrand: LifeBrand
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(LifeSpacing.Spacing3)
    ) {
        StatCard(
            title = "Avg Cycle",
            value = averageCycleLength?.let { "%.1f".format(it) } ?: "--",
            unit = "days",
            lunaBrand = lunaBrand,
            modifier = Modifier.weight(1f)
        )

        StatCard(
            title = "Avg Period",
            value = averagePeriodLength?.let { "%.1f".format(it) } ?: "--",
            unit = "days",
            lunaBrand = lunaBrand,
            modifier = Modifier.weight(1f)
        )
    }
}

@Composable
private fun StatCard(
    title: String,
    value: String,
    unit: String,
    lunaBrand: LifeBrand,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier,
        shape = LifeRadius.Md,
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing4),
            horizontalAlignment = Alignment.Start
        ) {
            Text(
                text = title,
                style = LifeTypography.LabelMedium,
                color = LifeColors.SemanticOnSurfaceVariant
            )

            Spacer(modifier = Modifier.height(LifeSpacing.Spacing2))

            Row(
                verticalAlignment = Alignment.Bottom,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = value,
                    style = LifeTypography.DisplaySmall,
                    color = lunaBrand.primary
                )
                Text(
                    text = unit,
                    style = LifeTypography.BodySmall,
                    color = LifeColors.SemanticOnSurfaceVariant,
                    modifier = Modifier.padding(bottom = 4.dp)
                )
            }
        }
    }
}

@Composable
private fun SymptomFrequencyRow(
    symptom: String,
    frequency: Float,
    lunaBrand: LifeBrand
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .semantics {
                contentDescription = "$symptom: ${(frequency * 100).toInt()}% frequency"
            },
        shape = LifeRadius.Md,
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing3)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = symptom.replaceFirstChar { it.uppercase() },
                    style = LifeTypography.BodyMedium,
                    color = LifeColors.SemanticOnSurface
                )
                Text(
                    text = "${(frequency * 100).toInt()}%",
                    style = LifeTypography.LabelMedium,
                    color = lunaBrand.primary
                )
            }

            Spacer(modifier = Modifier.height(LifeSpacing.Spacing2))

            LinearProgressIndicator(
                progress = { frequency },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp)),
                color = lunaBrand.primary,
                trackColor = lunaBrand.primary.copy(alpha = 0.12f)
            )
        }
    }
}
