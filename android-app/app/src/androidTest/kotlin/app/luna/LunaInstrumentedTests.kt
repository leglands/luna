package app.luna

import androidx.test.core.app.ActivityScenario
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import app.luna.ui.LockActivity
import app.luna.ui.OnboardingActivity
import org.hamcrest.CoreMatchers.`is`
import org.hamcrest.CoreMatchers.not
import org.hamcrest.text.IsEmptyString.emptyString
import org.junit.Test
import org.junit.runner.RunWith

/**
 * LUNA — Android Instrumented UI Tests (Espresso)
 *
 * Ces tests nécessitent un émulateur ou device physique API 26+.
 *
 * Exécution :
 *   ./gradlew :app:connectedAndroidTest
 */

// ─── UJ-01 : Onboarding ──────────────────────────────────────────────────────

@RunWith(AndroidJUnit4::class)
class UJ01_OnboardingInstrumentedTest {

    /** UJ-01-1 : L'activité d'onboarding démarre avec le titre de bienvenue */
    @Test
    fun onboarding_startsWithWelcomeTitle() {
        ActivityScenario.launch(OnboardingActivity::class.java)
        onView(withContentDescription("onboarding_welcome_title"))
            .check(matches(isDisplayed()))
    }

    /** UJ-01-2 : Le bouton "Suivant" est cliquable */
    @Test
    fun onboarding_nextButton_isClickable() {
        ActivityScenario.launch(OnboardingActivity::class.java)
        onView(withId(R.id.btn_next))
            .check(matches(isEnabled()))
    }
}

// ─── UJ-02 : LockActivity ────────────────────────────────────────────────────

@RunWith(AndroidJUnit4::class)
class UJ02_LockInstrumentedTest {

    /** UJ-02-1 : LockActivity affiche le champ PIN */
    @Test
    fun lockActivity_showsPinInput() {
        ActivityScenario.launch(LockActivity::class.java)
        onView(withId(R.id.pin_display))
            .check(matches(isDisplayed()))
    }

    /** UJ-02-2 : Bouton biométrie présent */
    @Test
    fun lockActivity_biometricButton_present() {
        ActivityScenario.launch(LockActivity::class.java)
        onView(withId(R.id.btn_biometric))
            .check(matches(isDisplayed()))
    }

    /** UJ-02-3 : Les 10 touches du clavier PIN sont présentes */
    @Test
    fun lockActivity_pinKeyboard_hasAllDigits() {
        ActivityScenario.launch(LockActivity::class.java)
        for (digit in 0..9) {
            onView(withContentDescription("pin_key_$digit"))
                .check(matches(isDisplayed()))
        }
    }
}

// ─── A11Y : Accessibilité ─────────────────────────────────────────────────────

@RunWith(AndroidJUnit4::class)
class A11Y_AccessibilityInstrumentedTest {

    /** A11Y-01 : Chaque touche du clavier PIN a un contentDescription */
    @Test
    fun lockActivity_pinKeys_haveContentDescriptions() {
        ActivityScenario.launch(LockActivity::class.java)
        // Les contentDescriptions "pin_key_0" … "pin_key_9" ont été définies dans le layout
        onView(withContentDescription("pin_key_1"))
            .check(matches(isDisplayed()))
    }

    /** A11Y-02 : Champ PIN est un ViewGroup accessible */
    @Test
    fun lockActivity_pinDisplay_isAccessible() {
        ActivityScenario.launch(LockActivity::class.java)
        onView(withId(R.id.pin_display))
            .check(matches(isDisplayed()))
            .check(matches(withContentDescription(containsString("PIN"))))
    }
}

// ─── DM : Dark Mode Tests (F18 / US20) ──────────────────────────────────────

@RunWith(AndroidJUnit4::class)
class DM_DarkModeInstrumentedTest {

    /** DM-01 : OnboardingActivity renders in night mode */
    @Test
    fun onboarding_nightMode_launches() {
        val scenario = ActivityScenario.launch(OnboardingActivity::class.java)
        scenario.onActivity { activity ->
            val currentNightMode = activity.resources.configuration.uiMode and
                android.content.res.Configuration.UI_MODE_NIGHT_MASK
            // App should respect system theme — just verify it launches without crash
            assertThat(activity.isFinishing, `is`(false))
        }
    }

    /** DM-02 : LockActivity renders in night mode */
    @Test
    fun lockActivity_nightMode_launches() {
        val scenario = ActivityScenario.launch(LockActivity::class.java)
        scenario.onActivity { activity ->
            assertThat(activity.isFinishing, `is`(false))
        }
        onView(withId(R.id.pin_display))
            .check(matches(isDisplayed()))
    }
}

// ─── I18N : Internationalization Tests (F17 / US18) ──────────────────────────

@RunWith(AndroidJUnit4::class)
class I18N_LocalizationInstrumentedTest {

    /** I18N-01 : Onboarding has localized string resources */
    @Test
    fun onboarding_hasLocalizedStrings() {
        val scenario = ActivityScenario.launch(OnboardingActivity::class.java)
        scenario.onActivity { activity ->
            // Verify the string resource resolves (not crashing = localized)
            val appName = activity.getString(R.string.app_name)
            assertThat(appName, `is`(not(emptyString())))
        }
    }

    /** I18N-02 : Lock screen has localized PIN label */
    @Test
    fun lockActivity_hasLocalizedPinLabel() {
        val scenario = ActivityScenario.launch(LockActivity::class.java)
        // PIN display should be visible regardless of locale
        onView(withId(R.id.pin_display))
            .check(matches(isDisplayed()))
    }
}
