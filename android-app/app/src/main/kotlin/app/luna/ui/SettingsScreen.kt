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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.CloudOff
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Key
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.macaron.lifeds.components.PebbleButton
import com.macaron.lifeds.components.PebbleStyle
import com.macaron.lifeds.components.PrivacyBadge
import com.macaron.lifeds.theme.LifeBrand
import com.macaron.lifeds.tokens.LifeColors
import com.macaron.lifeds.tokens.LifeRadius
import com.macaron.lifeds.tokens.LifeSpacing
import com.macaron.lifeds.tokens.LifeTypography

@Composable
fun SettingsScreen(
    isLockEnabled: Boolean,
    isCloudSyncEnabled: Boolean,
    isCalmModeEnabled: Boolean,
    appVersion: String,
    onLockToggle: (Boolean) -> Unit,
    onCloudSyncToggle: (Boolean) -> Unit,
    onCalmModeToggle: (Boolean) -> Unit,
    onChangePIN: () -> Unit,
    onExportData: () -> Unit,
    onDeleteAllData: () -> Unit,
    onReplayTour: () -> Unit,
    lunaBrand: LifeBrand = LifeBrand.Luna,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(LifeSpacing.Spacing4)
    ) {
        Text(
            text = "Settings",
            style = LifeTypography.TitleLarge,
            color = LifeColors.SemanticOnSurface,
            modifier = Modifier.padding(bottom = LifeSpacing.Spacing4)
        )

        PrivacyBadgeSection()

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        SecuritySection(
            isLockEnabled = isLockEnabled,
            onLockToggle = onLockToggle,
            onChangePIN = onChangePIN,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        CalmModeSection(
            isCalmModeEnabled = isCalmModeEnabled,
            onCalmModeToggle = onCalmModeToggle,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        DataSection(
            isCloudSyncEnabled = isCloudSyncEnabled,
            onCloudSyncToggle = onCloudSyncToggle,
            onExportData = onExportData,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        DangerZoneSection(
            onDeleteAllData = onDeleteAllData,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        CrossPromoSettingsSection(lunaBrand = lunaBrand)

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        AboutSection(
            appVersion = appVersion,
            lunaBrand = lunaBrand
        )

        Spacer(modifier = Modifier.height(LifeSpacing.Spacing4))

        PebbleButton(
            text = "Replay Feature Tour",
            onClick = onReplayTour,
            brand = lunaBrand,
            style = PebbleStyle.Secondary,
            modifier = Modifier.fillMaxWidth()
        )
    }
}

@Composable
private fun PrivacyBadgeSection() {
    PrivacyBadge(
        expandedInitially = false,
        modifier = Modifier.fillMaxWidth()
    )
}

@Composable
private fun SecuritySection(
    isLockEnabled: Boolean,
    onLockToggle: (Boolean) -> Unit,
    onChangePIN: () -> Unit,
    lunaBrand: LifeBrand
) {
    SettingsCard(title = "Security") {
        SettingsRowSwitch(
            icon = Icons.Default.Lock,
            title = "App Lock",
            subtitle = "Require authentication to open",
            isChecked = isLockEnabled,
            onCheckedChange = onLockToggle,
            lunaBrand = lunaBrand
        )

        HorizontalDivider(modifier = Modifier.padding(vertical = LifeSpacing.Spacing2))

        SettingsRowClickable(
            icon = Icons.Default.Key,
            title = "Change PIN",
            subtitle = "Update your security PIN",
            onClick = onChangePIN,
            lunaBrand = lunaBrand
        )
    }
}

@Composable
private fun CalmModeSection(
    isCalmModeEnabled: Boolean,
    onCalmModeToggle: (Boolean) -> Unit,
    lunaBrand: LifeBrand
) {
    SettingsCard(title = "Wellbeing") {
        SettingsRowSwitch(
            icon = Icons.Default.Face,
            title = "Calm Mode",
            subtitle = "Simplified interface with gentle reminders",
            isChecked = isCalmModeEnabled,
            onCheckedChange = onCalmModeToggle,
            lunaBrand = lunaBrand
        )
    }
}

@Composable
private fun DataSection(
    isCloudSyncEnabled: Boolean,
    onCloudSyncToggle: (Boolean) -> Unit,
    onExportData: () -> Unit,
    lunaBrand: LifeBrand
) {
    SettingsCard(title = "Data & Storage") {
        SettingsRowSwitch(
            icon = Icons.Default.CloudOff,
            title = "iCloud Sync",
            subtitle = if (isCloudSyncEnabled) "Syncing enabled" else "Local storage only",
            isChecked = isCloudSyncEnabled,
            onCheckedChange = onCloudSyncToggle,
            lunaBrand = lunaBrand
        )

        HorizontalDivider(modifier = Modifier.padding(vertical = LifeSpacing.Spacing2))

        SettingsRowClickable(
            icon = Icons.Default.Download,
            title = "Export Data",
            subtitle = "Download your data as CSV",
            onClick = onExportData,
            lunaBrand = lunaBrand
        )
    }
}

@Composable
private fun DangerZoneSection(
    onDeleteAllData: () -> Unit,
    lunaBrand: LifeBrand
) {
    SettingsCard(title = "Danger Zone") {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing3)
                .semantics { contentDescription = "Delete all data" },
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Delete,
                contentDescription = null,
                tint = LifeColors.AlertUrgent,
                modifier = Modifier.size(24.dp)
            )

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = LifeSpacing.Spacing3)
            ) {
                Text(
                    text = "Delete All Data",
                    style = LifeTypography.BodyMedium,
                    color = LifeColors.AlertUrgent
                )
                Text(
                    text = "Permanently erase all your data",
                    style = LifeTypography.BodySmall,
                    color = LifeColors.SemanticOnSurfaceVariant
                )
            }

            PebbleButton(
                text = "Delete",
                onClick = onDeleteAllData,
                brand = lunaBrand,
                style = PebbleStyle.Destructive,
                modifier = Modifier.semantics {
                    contentDescription = "Delete all data permanently"
                }
            )
        }
    }
}

@Composable
private fun CrossPromoSettingsSection(lunaBrand: LifeBrand) {
    val auraBrand = LifeBrand.Aura

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .semantics {
                contentDescription = "Cross promotion for Aura app"
            },
        shape = LifeRadius.Lg,
        colors = CardDefaults.cardColors(
            containerColor = auraBrand.primaryContainer
        )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing4),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = Icons.Default.Security,
                contentDescription = null,
                tint = auraBrand.primary,
                modifier = Modifier.size(40.dp)
            )

            Spacer(modifier = Modifier.padding(LifeSpacing.Spacing2))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = "Discover Aura",
                    style = LifeTypography.TitleSmall,
                    color = auraBrand.primaryDim
                )
                Text(
                    text = "Advanced fertility tracking with AI insights",
                    style = LifeTypography.BodySmall,
                    color = auraBrand.primaryDim.copy(alpha = 0.8f)
                )
            }

            Icon(
                imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
                contentDescription = "Learn more about Aura",
                tint = auraBrand.primary
            )
        }
    }
}

@Composable
private fun AboutSection(
    appVersion: String,
    lunaBrand: LifeBrand
) {
    SettingsCard(title = "About") {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(LifeSpacing.Spacing3),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Version",
                style = LifeTypography.BodyMedium,
                color = LifeColors.SemanticOnSurface
            )
            Text(
                text = appVersion,
                style = LifeTypography.BodyMedium,
                color = LifeColors.SemanticOnSurfaceVariant
            )
        }
    }
}

@Composable
private fun SettingsCard(
    title: String,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = LifeRadius.Lg,
        colors = CardDefaults.cardColors(
            containerColor = Color.White
        )
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = title,
                style = LifeTypography.TitleSmall,
                color = LifeColors.SemanticOnSurface,
                modifier = Modifier.padding(LifeSpacing.Spacing3)
            )
            content()
        }
    }
}

@Composable
private fun SettingsRowSwitch(
    icon: ImageVector,
    title: String,
    subtitle: String,
    isChecked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    lunaBrand: LifeBrand
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(LifeSpacing.Spacing3),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = lunaBrand.primary,
            modifier = Modifier.size(24.dp)
        )

        Column(
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = LifeSpacing.Spacing3)
        ) {
            Text(
                text = title,
                style = LifeTypography.BodyMedium,
                color = LifeColors.SemanticOnSurface
            )
            Text(
                text = subtitle,
                style = LifeTypography.BodySmall,
                color = LifeColors.SemanticOnSurfaceVariant
            )
        }

        Switch(
            checked = isChecked,
            onCheckedChange = onCheckedChange,
            modifier = Modifier.semantics {
                contentDescription = "$title toggle"
            }
        )
    }
}

@Composable
private fun SettingsRowClickable(
    icon: ImageVector,
    title: String,
    subtitle: String,
    onClick: () -> Unit,
    lunaBrand: LifeBrand
) {
    androidx.compose.material3.Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(LifeSpacing.Spacing3)
            .semantics { contentDescription = "$title, $subtitle" },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = lunaBrand.primary,
            modifier = Modifier.size(24.dp)
        )

        Column(
            modifier = Modifier
                .weight(1f)
                .padding(horizontal = LifeSpacing.Spacing3)
        ) {
            Text(
                text = title,
                style = LifeTypography.BodyMedium,
                color = LifeColors.SemanticOnSurface
            )
            Text(
                text = subtitle,
                style = LifeTypography.BodySmall,
                color = LifeColors.SemanticOnSurfaceVariant
            )
        }

        Icon(
            imageVector = Icons.AutoMirrored.Filled.KeyboardArrowRight,
            contentDescription = "Navigate to $title",
            tint = LifeColors.SemanticOnSurfaceVariant
        )
    }
}
