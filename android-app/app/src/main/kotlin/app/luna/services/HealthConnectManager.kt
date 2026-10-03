package app.luna.services

import android.content.Context
import android.os.Build
import androidx.activity.result.contract.ActivityResultContract
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.BasalBodyTemperatureRecord
import androidx.health.connect.client.records.MenstruationFlowRecord
import androidx.health.connect.client.records.metadata.Metadata
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import androidx.health.connect.client.units.celsius
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

/**
 * HealthConnectManager — intégration optionnelle Health Connect (opt-in explicite).
 *
 * Parité avec HealthKitManager (iOS) :
 *  - écriture : flux menstruel (« spotting » assimilé à « light », comme iOS) ;
 *  - lecture  : dernière température basale (°C) ;
 *  - autorisation demandée depuis les Réglages uniquement ; aucune donnée
 *    n'est lue ou écrite tant que l'opt-in n'est pas actif.
 *
 * Contraintes plateforme :
 *  - la lib Health Connect requiert API 26+ ; l'app Health Connect est utilisable
 *    à partir d'API 28 (API 34+ : intégrée au système) ;
 *  - toutes les entrées vérifient [isAvailable] AVANT de toucher une classe
 *    Health Connect → aucun crash sur API 23-25 (fonctionnalité indisponible).
 */
object HealthConnectManager {

    /** Prefs de l'app (mêmes que les autres toggles Réglages). */
    const val PREFS_NAME = "luna_prefs"

    /** Clé d'opt-in (partagée activité Réglages / service). */
    const val PREF_HEALTH_CONNECT_ENABLED = "health_connect_enabled"

    /** Disponibilité effective de Health Connect sur l'appareil. */
    enum class Availability {
        /** Client utilisable (app installée sur API 28-33, intégrée sur API 34+). */
        AVAILABLE,

        /** App Health Connect absente ou à mettre à jour — installation possible depuis le Play Store. */
        PROVIDER_UPDATE_REQUIRED,

        /** Appareil incompatible (API < 26, ou API 26-27 sans support Health Connect). */
        UNAVAILABLE,
    }

    /** API >= 26 : la lib Health Connect peut être chargée (son minSdk). */
    fun isAvailable(): Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O

    /**
     * Statut précis de Health Connect (wrapper de [HealthConnectClient.getSdkStatus]).
     * Les Réglages doivent masquer l'intégration si le statut n'est pas AVAILABLE/PROVIDER_UPDATE_REQUIRED.
     */
    fun availability(context: Context): Availability {
        if (!isAvailable()) return Availability.UNAVAILABLE
        return when (HealthConnectClient.getSdkStatus(context)) {
            HealthConnectClient.SDK_AVAILABLE -> Availability.AVAILABLE
            HealthConnectClient.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED ->
                Availability.PROVIDER_UPDATE_REQUIRED
            else -> Availability.UNAVAILABLE
        }
    }

    /** Vrai si l'app Health Connect est installée et utilisable. */
    fun isInstalled(context: Context): Boolean =
        availability(context) == Availability.AVAILABLE

    /**
     * Permissions demandées — parité iOS : écriture du flux menstruel,
     * lecture du flux menstruel + de la température basale.
     */
    fun requiredPermissions(): Set<String> = setOf(
        HealthPermission.getWritePermission(MenstruationFlowRecord::class),
        HealthPermission.getReadPermission(MenstruationFlowRecord::class),
        HealthPermission.getReadPermission(BasalBodyTemperatureRecord::class),
    )

    /**
     * Contrat de demande de permissions Health Connect.
     * À enregistrer via `registerForActivityResult(...)` depuis une Activity.
     */
    fun permissionRequestContract(): ActivityResultContract<Set<String>, Set<String>> =
        PermissionController.createRequestPermissionResultContract()

    /** Vrai si toutes les permissions Health Connect sont accordées. */
    suspend fun hasAllPermissions(context: Context): Boolean = withContext(Dispatchers.IO) {
        if (availability(context) != Availability.AVAILABLE) return@withContext false
        try {
            val client = HealthConnectClient.getOrCreate(context)
            client.permissionController.getGrantedPermissions()
                .containsAll(requiredPermissions())
        } catch (e: Exception) {
            false
        }
    }

    /** Opt-in local (Réglages). Ne vérifie pas les permissions — cf. [hasAllPermissions]. */
    fun isEnabled(context: Context): Boolean =
        prefs(context).getBoolean(PREF_HEALTH_CONNECT_ENABLED, false)

    /** Persiste l'opt-in local (le profil Rust `health_sync` est mis à jour côté Réglages). */
    fun setEnabled(context: Context, enabled: Boolean) {
        prefs(context).edit().putBoolean(PREF_HEALTH_CONNECT_ENABLED, enabled).apply()
    }

    /**
     * Écrit un enregistrement de flux menstruel pour [date] (ISO-8601, `yyyy-MM-dd`).
     * Parité iOS `writeMenstrualFlow` : « spotting » → light.
     * Retourne false (sans écrire) si opt-in inactif, date invalide, flux inconnu
     * (« none » n'est pas représentable côté Health Connect) ou permission manquante.
     */
    suspend fun writeMenstrualFlow(context: Context, date: String, flow: String): Boolean =
        withContext(Dispatchers.IO) {
            if (!isAvailable() || !isEnabled(context)) return@withContext false
            if (availability(context) != Availability.AVAILABLE) return@withContext false

            val parsedDate = try {
                LocalDate.parse(date)
            } catch (e: Exception) {
                return@withContext false
            }
            val flowValue = when (flow.lowercase()) {
                "spotting", "light" -> MenstruationFlowRecord.FLOW_LIGHT
                "medium" -> MenstruationFlowRecord.FLOW_MEDIUM
                "heavy" -> MenstruationFlowRecord.FLOW_HEAVY
                else -> return@withContext false
            }

            try {
                val client = HealthConnectClient.getOrCreate(context)
                if (!client.permissionController.getGrantedPermissions()
                        .containsAll(requiredPermissions())
                ) {
                    return@withContext false
                }
                val zone = ZoneId.systemDefault()
                val time = parsedDate.atStartOfDay(zone).toInstant()
                client.insertRecords(
                    listOf(
                        MenstruationFlowRecord(
                            time = time,
                            zoneOffset = zone.rules.getOffset(time),
                            metadata = Metadata.manualEntry(),
                            flow = flowValue,
                        )
                    )
                )
                true
            } catch (e: Exception) {
                false
            }
        }

    /**
     * Lit la dernière température basale (°C) depuis Health Connect.
     * Parité iOS `readLatestBBT`. Retourne null si opt-in inactif ou erreur.
     */
    suspend fun readLatestBBT(context: Context): Double? = withContext(Dispatchers.IO) {
        if (!isAvailable() || !isEnabled(context)) return@withContext null
        if (availability(context) != Availability.AVAILABLE) return@withContext null
        try {
            val client = HealthConnectClient.getOrCreate(context)
            if (!client.permissionController.getGrantedPermissions()
                    .containsAll(requiredPermissions())
            ) {
                return@withContext null
            }
            val request = ReadRecordsRequest<BasalBodyTemperatureRecord>(
                timeRangeFilter = TimeRangeFilter.after(Instant.EPOCH),
                ascendingOrder = false,
                pageSize = 1,
            )
            client.readRecords(request).records.firstOrNull()?.temperature?.inCelsius
        } catch (e: Exception) {
            null
        }
    }

    private fun prefs(context: Context) =
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
}
