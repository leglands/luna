package app.luna.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Insights
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import com.macaron.lifeds.theme.LifeBrand
import com.macaron.lifeds.theme.LifeTheme
import com.macaron.lifeds.theme.LifeThemeMode
import java.time.LocalDate
import java.time.YearMonth

class LunaMainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LifeTheme(
                brand = LifeBrand.Luna,
                darkTheme = false,
                highContrast = false
            ) {
                LunaApp()
            }
        }
    }
}

@Composable
private fun LunaApp() {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf(
        TabItem("Home", Icons.Default.Home),
        TabItem("Calendar", Icons.Default.CalendarMonth),
        TabItem("Insights", Icons.Default.Insights),
        TabItem("Settings", Icons.Default.Settings)
    )

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            NavigationBar {
                tabs.forEachIndexed { index, tab ->
                    NavigationBarItem(
                        icon = {
                            Icon(
                                imageVector = tab.icon,
                                contentDescription = tab.title
                            )
                        },
                        label = { Text(tab.title) },
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        modifier = Modifier.semantics {
                            contentDescription = "${tab.title} tab"
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        when (selectedTab) {
            0 -> HomeScreen(
                cycleDay = 14,
                phaseName = "Follicular",
                daysUntilNext = 14,
                isTTCMode = false,
                onLogClick = { },
                onQuickLogPeriod = { },
                onQuickLogSymptoms = { },
                onQuickLogTemp = { },
                onQuickLogMood = { },
                modifier = Modifier.padding(innerPadding)
            )
            1 -> CalendarScreen(
                currentMonth = YearMonth.now(),
                selectedDate = LocalDate.now(),
                cycleEvents = emptyMap(),
                cycleDay = 14,
                onMonthChange = { },
                onDateSelected = { },
                modifier = Modifier.padding(innerPadding)
            )
            2 -> InsightsScreen(
                averageCycleLength = 28f,
                averagePeriodLength = 5f,
                cycleLengthHistory = listOf(1 to 28, 2 to 27, 3 to 29),
                symptomFrequencies = mapOf(
                    "cramping" to 0.65f,
                    "bloating" to 0.45f,
                    "headache" to 0.30f,
                    "fatigue" to 0.55f
                ),
                modifier = Modifier.padding(innerPadding)
            )
            3 -> SettingsScreen(
                isLockEnabled = true,
                isCloudSyncEnabled = false,
                isCalmModeEnabled = false,
                appVersion = "1.0.0",
                onLockToggle = { },
                onCloudSyncToggle = { },
                onCalmModeToggle = { },
                onChangePIN = { },
                onExportData = { },
                onDeleteAllData = { },
                onReplayTour = { },
                modifier = Modifier.padding(innerPadding)
            )
        }
    }
}

private data class TabItem(
    val title: String,
    val icon: ImageVector
)
