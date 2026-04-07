// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ Screen: MainActivity (S03 — Home container)                                  │
// │ Personas: P1 (Emma), P2 (Sarah), P4 (Nathalie)                              │
// │ Features: F03 (Dashboard), F05 (Calendar), F07 (Insights)                    │
// │ CRUD: R                                                                      │
// │ RBAC: owner (vault_open required)                                            │
// │ User Stories: US03, US05, US07                                               │
// │ Why: Main container with bottom navigation (Home/Calendar/Insights/Settings) │
// └──────────────────────────────────────────────────────────────────────────────┘
package app.luna.ui

import android.os.Bundle
import android.view.accessibility.AccessibilityEvent
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import app.luna.R
import app.luna.databinding.ActivityMainBinding
import app.luna.services.VaultService
import com.google.android.material.navigation.NavigationBarView

/**
 * MainActivity — point d'entrée de l'app.
 * NavHostFragment gère Home / Calendar / Insights / Settings.
 * Phone: BottomNavigationView; Tablet (≥600dp): NavigationRailView (same ID).
 * Both extend NavigationBarView — setupWithNavController works for both.
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        setSupportActionBar(binding.topAppBar)

        val navHost = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHost.navController

        // Use NavigationBarView (common supertype for phone + tablet layouts).
        val navBar = findViewById<NavigationBarView>(R.id.bottom_navigation)
        navBar.setupWithNavController(navController)
        navController.addOnDestinationChangedListener { _, destination, _ ->
            binding.topAppBar.title = destination.label ?: getString(R.string.app_name)
            binding.topAppBar.subtitle = getString(R.string.toolbar_private_subtitle)
        }

        // a11y : annoncer le changement de section sans casser la navigation native.
        navBar.setOnItemReselectedListener {
            navBar.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED)
        }
    }

    override fun onResume() {
        super.onResume()
        // Si le vault est verrouillé → afficher LockActivity
        if (!VaultService.isUnlocked) {
            LockActivity.start(this)
        }
    }
}
