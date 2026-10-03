package app.luna

import android.content.Context
import android.os.Build
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import app.luna.services.HealthConnectManager
import kotlinx.coroutines.runBlocking
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith

/**
 * HealthConnectManager — tests instrumentés (parité iOS HealthKit, opt-in).
 *
 * Vérifie sur device/émulateur :
 *  - la garde API 26+ et la cohérence availability()/isInstalled() ;
 *  - l'ensemble exact des permissions santé demandées (aligné sur le manifest) ;
 *  - le no-op strict quand l'opt-in est désactivé (aucune lecture/écriture).
 */
@RunWith(AndroidJUnit4::class)
class HealthConnectManagerInstrumentedTest {

    private val context: Context get() = ApplicationProvider.getApplicationContext()

    /** Parité manifest : les 3 permissions déclarées, ni plus ni moins. */
    @Test
    fun requiredPermissions_matchManifestSet() {
        assertEquals(
            setOf(
                "android.permission.health.WRITE_MENSTRUATION",
                "android.permission.health.READ_MENSTRUATION",
                "android.permission.health.READ_BASAL_BODY_TEMPERATURE",
            ),
            HealthConnectManager.requiredPermissions(),
        )
    }

    /** La garde API et le statut ne jettent jamais (compatibilité API 23-25 incluse). */
    @Test
    fun availability_neverThrows_andIsConsistent() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            assertFalse(HealthConnectManager.isAvailable())
            assertEquals(
                HealthConnectManager.Availability.UNAVAILABLE,
                HealthConnectManager.availability(context),
            )
            return
        }
        assertTrue(HealthConnectManager.isAvailable())
        val availability = HealthConnectManager.availability(context)
        assertEquals(
            availability == HealthConnectManager.Availability.AVAILABLE,
            HealthConnectManager.isInstalled(context),
        )
    }

    /** Opt-in désactivé → write/read sont des no-op (false/null), sans toucher Health Connect. */
    @Test
    fun optInDisabled_writeAndReadAreNoOps() = runBlocking {
        val prefs = context.getSharedPreferences(
            HealthConnectManager.PREFS_NAME, Context.MODE_PRIVATE
        )
        val previous = prefs.getBoolean(
            HealthConnectManager.PREF_HEALTH_CONNECT_ENABLED, false
        )
        try {
            HealthConnectManager.setEnabled(context, false)
            assertFalse(HealthConnectManager.isEnabled(context))
            assertFalse(
                HealthConnectManager.writeMenstrualFlow(context, "2026-10-03", "medium")
            )
            assertNull(HealthConnectManager.readLatestBBT(context))
        } finally {
            prefs.edit()
                .putBoolean(HealthConnectManager.PREF_HEALTH_CONNECT_ENABLED, previous)
                .apply()
        }
    }

    /** IPC Health Connect (lecture des permissions) — canari : ne doit pas jeter. */
    @Test
    fun hasAllPermissions_isCallable() = runBlocking {
        @Suppress("UNUSED_VARIABLE")
        val granted = HealthConnectManager.hasAllPermissions(context)
    }
}
