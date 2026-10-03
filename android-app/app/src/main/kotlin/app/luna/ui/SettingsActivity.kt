// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ Screen: SettingsActivity (S07)                                               │
// │ Personas: P1 (Emma), P5 (Aïcha), P6 (Sophie)                                │
// │ Features: F08, F09, F10, F11, F15, F16                                       │
// │ CRUD: R, U, D                                                                │
// │ RBAC: owner (vault_open required)                                            │
// │ User Stories: US08, US09, US10, US11, US15, US16                             │
// │ Why: Config, security, export, calm mode                                     │
// └──────────────────────────────────────────────────────────────────────────────┘
package app.luna.ui

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.CompoundButton
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import app.luna.R
import app.luna.databinding.ActivitySettingsBinding
import app.luna.services.HealthConnectManager
import app.luna.services.KeystoreService
import app.luna.services.VaultService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

/**
 * SettingsActivity — paramètres vie privée, notifications, export, panic wipe.
 * Accessible depuis SettingsFragment via navigation.
 */
class SettingsActivity : AppCompatActivity() {

    private lateinit var binding: ActivitySettingsBinding

    /** Launcher Health Connect — enregistré uniquement si l'appareil peut héberger Health Connect. */
    private var healthPermissionsLauncher: ActivityResultLauncher<Set<String>>? = null

    private val healthConnectToggleListener =
        CompoundButton.OnCheckedChangeListener { _, isChecked ->
            if (isChecked) requestHealthConnectAccess() else applyHealthConnectEnabled(false)
        }

    private val createBackupLauncher = registerForActivityResult(
        ActivityResultContracts.CreateDocument("application/octet-stream")
    ) { uri ->
        if (uri != null) {
            exportBackupTo(uri)
        }
    }

    private val restoreBackupLauncher = registerForActivityResult(
        ActivityResultContracts.OpenDocument()
    ) { uri ->
        if (uri != null) {
            restoreBackupFrom(uri)
        }
    }

    companion object {
        fun start(context: Context) =
            context.startActivity(Intent(context, SettingsActivity::class.java))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySettingsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.topAppBar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        setupToggles()
        setupButtons()
        setupHealthConnect()
    }

    private fun setupToggles() {
        val prefs = getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)

        // Notifications journalières
        binding.toggleDailyNotif.isChecked = prefs.getBoolean("notif_daily", true)
        binding.toggleDailyNotif.setOnCheckedChangeListener { _, checked ->
            prefs.edit().putBoolean("notif_daily", checked).apply()
        }

        // Rappel règles
        binding.togglePeriodReminder.isChecked = prefs.getBoolean("notif_period", true)
        binding.togglePeriodReminder.setOnCheckedChangeListener { _, checked ->
            prefs.edit().putBoolean("notif_period", checked).apply()
        }

        // Fenêtre fertile
        binding.toggleFertileWindow.isChecked = prefs.getBoolean("notif_fertile", false)
        binding.toggleFertileWindow.setOnCheckedChangeListener { _, checked ->
            prefs.edit().putBoolean("notif_fertile", checked).apply()
        }

        // Rappel pilule quotidien
        binding.togglePillReminder.isChecked = prefs.getBoolean("notif_pill", false)
        binding.togglePillReminder.setOnCheckedChangeListener { _, checked ->
            prefs.edit().putBoolean("notif_pill", checked).apply()
            if (checked) {
                val time = prefs.getString("pill_reminder_time", "08:00") ?: "08:00"
                val parts = time.split(":").mapNotNull { it.toIntOrNull() }
                if (parts.size == 2) {
                    app.luna.services.NotificationWorker.schedulePillReminder(
                        this@SettingsActivity, parts[0], parts[1])
                }
            } else {
                app.luna.services.NotificationWorker.cancelAll(this@SettingsActivity)
            }
        }
    }

    private fun setupButtons() {
        // Export CSV
        binding.exportCsvButton.apply {
            setOnClickListener { exportCsv() }
            contentDescription = getString(R.string.export_csv_label)
        }

        // Export backup chiffré
        binding.exportBackupButton.apply {
            setOnClickListener { createBackupLauncher.launch("luna_backup.enc") }
            contentDescription = getString(R.string.export_encrypted_backup_label)
        }

        binding.restoreBackupButton.apply {
            setOnClickListener { restoreBackupLauncher.launch(arrayOf("*/*")) }
            contentDescription = getString(R.string.restore_encrypted_backup_label)
        }

        // Mode de suivi
        binding.trackingModeButton.setOnClickListener {
            TrackingModeActivity.start(this)
        }

        // Panic wipe
        binding.panicWipeButton.apply {
            setOnClickListener { confirmPanicWipe() }
            contentDescription = getString(R.string.settings_delete_all_a11y)
        }
    }

    /**
     * Health Connect (opt-in) — parité iOS HealthKitManager.
     * Section masquée si l'appareil ne peut pas héberger Health Connect (API < 26, etc.).
     */
    private fun setupHealthConnect() {
        if (HealthConnectManager.availability(this) == HealthConnectManager.Availability.UNAVAILABLE) {
            binding.healthConnectSection.visibility = View.GONE
            return
        }

        healthPermissionsLauncher = registerForActivityResult(
            HealthConnectManager.permissionRequestContract()
        ) { granted ->
            applyHealthConnectEnabled(granted.containsAll(HealthConnectManager.requiredPermissions()))
        }

        val prefs = getSharedPreferences(HealthConnectManager.PREFS_NAME, Context.MODE_PRIVATE)
        binding.toggleHealthConnect.isChecked =
            prefs.getBoolean(HealthConnectManager.PREF_HEALTH_CONNECT_ENABLED, false)
        binding.toggleHealthConnect.setOnCheckedChangeListener(healthConnectToggleListener)

        // Réconciliation : si l'autorisation a été révoquée dans Health Connect, refléter l'état réel.
        if (binding.toggleHealthConnect.isChecked) {
            lifecycleScope.launch {
                if (!HealthConnectManager.hasAllPermissions(this@SettingsActivity)) {
                    applyHealthConnectEnabled(false)
                }
            }
        }
    }

    private fun requestHealthConnectAccess() {
        when (HealthConnectManager.availability(this)) {
            HealthConnectManager.Availability.AVAILABLE ->
                healthPermissionsLauncher
                    ?.launch(HealthConnectManager.requiredPermissions())
                    ?: applyHealthConnectEnabled(false)

            HealthConnectManager.Availability.PROVIDER_UPDATE_REQUIRED -> {
                // Health Connect absent : rediriger vers le Play Store, toggle remis à off.
                openHealthConnectInstallPage()
                applyHealthConnectEnabled(false)
            }

            HealthConnectManager.Availability.UNAVAILABLE ->
                applyHealthConnectEnabled(false)
        }
    }

    /** Persiste l'opt-in (prefs + profil `health_sync`, parité iOS) et synchronise le toggle. */
    private fun applyHealthConnectEnabled(enabled: Boolean) {
        HealthConnectManager.setEnabled(this, enabled)

        binding.toggleHealthConnect.setOnCheckedChangeListener(null)
        binding.toggleHealthConnect.isChecked = enabled
        binding.toggleHealthConnect.setOnCheckedChangeListener(healthConnectToggleListener)

        lifecycleScope.launch(Dispatchers.IO) {
            try {
                VaultService.engine?.let { engine ->
                    val profile = engine.getUserProfile()
                    profile.healthSync = enabled
                    engine.setUserProfile(profile)
                }
            } catch (e: Exception) {
                // Vault verrouillé/absent — l'opt-in reste porté par luna_prefs.
            }
        }
    }

    private fun openHealthConnectInstallPage() {
        val market = Intent(
            Intent.ACTION_VIEW,
            Uri.parse("market://details?id=com.google.android.apps.healthdata")
        )
        val web = Intent(
            Intent.ACTION_VIEW,
            Uri.parse("https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata")
        )
        try {
            startActivity(market)
        } catch (e: Exception) {
            try {
                startActivity(web)
            } catch (e2: Exception) {
                // Play Store indisponible : le toggle reste désactivé.
            }
        }
    }

    private fun exportCsv() {
        val engine = VaultService.engine ?: return
        lifecycleScope.launch {
            try {
                val cycles = engine.getCycles(100u)
                val sb = StringBuilder("cycle_id,start_date,end_date,period_length_days\n")
                for (c in cycles) {
                    sb.append("${c.id},${c.startDate},${c.endDate ?: ""},${c.periodLength ?: ""}\n")
                }
                val file = java.io.File(cacheDir, "luna_export.csv")
                file.writeText(sb.toString())
                val uri = androidx.core.content.FileProvider.getUriForFile(
                    this@SettingsActivity, "${packageName}.fileprovider", file)
                val intent = android.content.Intent(android.content.Intent.ACTION_SEND).apply {
                    type = "text/csv"
                    putExtra(android.content.Intent.EXTRA_STREAM, uri)
                    addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION)
                }
                startActivity(android.content.Intent.createChooser(
                    intent, getString(R.string.export_csv_label)))
            } catch (e: Exception) {
                Toast.makeText(
                    this@SettingsActivity,
                    e.localizedMessage ?: getString(R.string.backup_export_error),
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun exportBackupTo(uri: Uri) {
        val engine = VaultService.engine ?: return
        lifecycleScope.launch {
            try {
                val pin = KeystoreService.readPin(this@SettingsActivity)
                    ?: throw IllegalStateException(getString(R.string.backup_pin_unavailable))
                val backup = withContext(Dispatchers.IO) { engine.exportEncryptedBackup(pin) }
                withContext(Dispatchers.IO) {
                    contentResolver.openOutputStream(uri)?.use { stream ->
                        stream.write(backup)
                    } ?: error("Unable to open backup destination")
                }
                Toast.makeText(
                    this@SettingsActivity,
                    getString(R.string.export_encrypted_backup_label),
                    Toast.LENGTH_SHORT
                ).show()
            } catch (e: Exception) {
                Toast.makeText(
                    this@SettingsActivity,
                    e.localizedMessage ?: getString(R.string.backup_export_error),
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun restoreBackupFrom(uri: Uri) {
        val engine = VaultService.engine ?: return
        lifecycleScope.launch {
            try {
                val pin = KeystoreService.readPin(this@SettingsActivity)
                    ?: throw IllegalStateException(getString(R.string.backup_pin_unavailable))
                val restored = withContext(Dispatchers.IO) {
                    val backup = contentResolver.openInputStream(uri)?.use { it.readBytes() }
                        ?: error("Unable to read backup file")
                    engine.importEncryptedBackup(backup, pin)
                }
                Toast.makeText(
                    this@SettingsActivity,
                    "${getString(R.string.backup_restore_success)} ($restored)",
                    Toast.LENGTH_LONG
                ).show()
                binding.root.announceForAccessibility(getString(R.string.backup_restore_success))
            } catch (e: Exception) {
                Toast.makeText(
                    this@SettingsActivity,
                    e.localizedMessage ?: getString(R.string.backup_restore_error),
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun confirmPanicWipe() {
        androidx.appcompat.app.AlertDialog.Builder(this)
            .setTitle(getString(R.string.panic_wipe_confirm_title))
            .setMessage(getString(R.string.panic_wipe_confirm_message))
            .setPositiveButton(getString(R.string.panic_wipe_confirm_button)) { _, _ ->
                panicWipe()
            }
            .setNegativeButton(getString(R.string.cancel_button), null)
            .show()
    }

    private fun panicWipe() {
        val engine = VaultService.engine ?: return
        lifecycleScope.launch {
            try {
                engine.panicWipe()
            } catch (e: Exception) {
                // Erreur attendue = WipedSuccessfully
            }
            VaultService.lock()
            binding.root.announceForAccessibility(getString(R.string.panic_wipe_done_a11y))
            LockActivity.start(this@SettingsActivity)
            finishAffinity()
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }
}
