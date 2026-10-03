package app.luna.ui

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import app.luna.databinding.ActivityHealthConnectRationaleBinding

/**
 * HealthConnectRationaleActivity — écran « politique de confidentialité » exigé par
 * Health Connect : cible de ACTION_SHOW_PERMISSIONS_RATIONALE (Android 13-) et de
 * l'alias ViewPermissionUsageActivity (Android 14+).
 *
 * Affiche le résumé du partage de données (données strictement identiques à celles
 * déclarées dans Play Console) et ouvre la politique complète dans le navigateur —
 * l'app n'ayant pas la permission INTERNET, une WebView ne peut pas charger la page.
 */
class HealthConnectRationaleActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityHealthConnectRationaleBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.topAppBar)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        binding.healthPolicyUrl.text = PRIVACY_POLICY_URL
        binding.healthPolicyButton.setOnClickListener { openPrivacyPolicy() }
    }

    private fun openPrivacyPolicy() {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(PRIVACY_POLICY_URL)))
        } catch (e: Exception) {
            // Aucun navigateur : afficher l'URL pour copie manuelle.
            Toast.makeText(this, PRIVACY_POLICY_URL, Toast.LENGTH_LONG).show()
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressedDispatcher.onBackPressed()
        return true
    }

    companion object {
        /** Politique de confidentialité LUNA — même URL que la fiche Play Console. */
        const val PRIVACY_POLICY_URL = "https://luna.macaron-software.com/en/privacy/"
    }
}
