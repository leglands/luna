// ┌──────────────────────────────────────────────────────────────────────────────┐
// │ Screen: OnboardingActivity (S01)                                             │
// │ Personas: P1 (Emma), P5 (Aïcha)                                             │
// │ Features: F01 (Onboarding / Vault Creation)                                  │
// │ CRUD: C                                                                      │
// │ RBAC: none (vault does not exist yet)                                        │
// │ User Stories: US01                                                           │
// │ Why: First-run 4-step setup — name, period date, cycle profile, goals        │
// └──────────────────────────────────────────────────────────────────────────────┘
package app.luna.ui

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import app.luna.R
import app.luna.services.KeystoreService
import app.luna.services.VaultService
import com.google.android.material.button.MaterialButton
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import com.google.android.material.textfield.TextInputEditText
import uniffi.luna_core.LunaEngine
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.util.Calendar

/**
 * OnboardingActivity — 4-step setup matching iOS flow.
 * PIN is auto-generated (user never sees it), like iOS.
 */
class OnboardingActivity : AppCompatActivity() {

    private var step = 0
    private val MAX_STEPS = 4

    // Form state (preserved across steps)
    private var firstName = ""
    private var periodDuration = 5
    private var regularity = "regular"
    private val selectedGoals = mutableSetOf("track")

    companion object {
        fun start(context: Context) =
            context.startActivity(Intent(context, OnboardingActivity::class.java))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_onboarding)
        setupDurationChips()
        setupRegularityRadios()
        setupGoalCheckboxes()
        renderStep()
    }

    private fun renderStep() {
        val progressBar = findViewById<ProgressBar>(R.id.onboarding_progress)
        progressBar.progress = ((step + 1) * 100) / MAX_STEPS
        progressBar.contentDescription = getString(R.string.onboarding_step_a11y, step + 1, MAX_STEPS)

        val title = findViewById<TextView>(R.id.onboarding_title)
        val subtitle = findViewById<TextView>(R.id.onboarding_subtitle)
        val icon = findViewById<ImageView>(R.id.onboarding_icon)

        // Hide all content sections
        findViewById<View>(R.id.name_input_layout).visibility = View.GONE
        findViewById<View>(R.id.date_picker).visibility = View.GONE
        findViewById<View>(R.id.cycle_profile_section).visibility = View.GONE
        findViewById<View>(R.id.goals_section).visibility = View.GONE

        when (step) {
            0 -> {
                title.setText(R.string.onboarding_welcome_title)
                subtitle.setText(R.string.onboarding_welcome_subtitle)
                icon.setImageResource(R.drawable.ic_luna_moon)
                findViewById<View>(R.id.name_input_layout).visibility = View.VISIBLE
            }
            1 -> {
                title.setText(R.string.onboarding_last_period_title)
                subtitle.setText(R.string.onboarding_last_period_subtitle)
                icon.setImageResource(R.drawable.ic_luna_droplet)
                val datePicker = findViewById<DatePicker>(R.id.date_picker)
                datePicker.visibility = View.VISIBLE
                datePicker.maxDate = System.currentTimeMillis()
            }
            2 -> {
                title.setText(R.string.onboarding_cycle_profile_title)
                subtitle.setText(R.string.onboarding_cycle_profile_subtitle)
                icon.setImageResource(R.drawable.ic_luna_calendar)
                findViewById<View>(R.id.cycle_profile_section).visibility = View.VISIBLE
            }
            3 -> {
                title.setText(R.string.onboarding_goals_title)
                subtitle.setText(R.string.onboarding_goals_subtitle)
                icon.setImageResource(R.drawable.ic_luna_activity)
                findViewById<View>(R.id.goals_section).visibility = View.VISIBLE
            }
        }

        val nextBtn = findViewById<MaterialButton>(R.id.next_button)
        val backBtn = findViewById<Button>(R.id.back_button)

        nextBtn.text = if (step == MAX_STEPS - 1)
            getString(R.string.onboarding_start_button)
        else
            getString(R.string.onboarding_next_button)

        backBtn.visibility = if (step == 0) View.INVISIBLE else View.VISIBLE

        nextBtn.setOnClickListener { nextStep() }
        backBtn.setOnClickListener { if (step > 0) { step--; renderStep() } }
    }

    private fun setupDurationChips() {
        val chipGroup = findViewById<ChipGroup>(R.id.duration_chips)
        val durations = listOf(3, 4, 5, 6, 7)
        val accent = ContextCompat.getColorStateList(this, R.color.luna_pink_500)

        for (d in durations) {
            val chip = Chip(this).apply {
                text = "${d}${getString(R.string.day_abbr)}"
                isCheckable = true
                isChecked = d == periodDuration
                chipBackgroundColor = ContextCompat.getColorStateList(this@OnboardingActivity, R.color.luna_neutral_100)
                setTextColor(ContextCompat.getColor(this@OnboardingActivity, R.color.luna_neutral_900))
                minHeight = 48
                tag = d
            }
            chipGroup.addView(chip)
        }
        // 7+ chip
        val plusChip = Chip(this).apply {
            text = "7+${getString(R.string.day_abbr)}"
            isCheckable = true
            chipBackgroundColor = ContextCompat.getColorStateList(this@OnboardingActivity, R.color.luna_neutral_100)
            setTextColor(ContextCompat.getColor(this@OnboardingActivity, R.color.luna_neutral_900))
            minHeight = 48
            tag = 8
        }
        chipGroup.addView(plusChip)

        chipGroup.setOnCheckedStateChangeListener { _, checkedIds ->
            if (checkedIds.isNotEmpty()) {
                val chip = chipGroup.findViewById<Chip>(checkedIds[0])
                periodDuration = chip?.tag as? Int ?: 5
            }
        }
    }

    private fun setupRegularityRadios() {
        val group = findViewById<RadioGroup>(R.id.regularity_group)
        val options = listOf(
            "very_regular" to R.string.regularity_very_regular,
            "regular" to R.string.regularity_regular,
            "irregular" to R.string.regularity_irregular,
            "unknown" to R.string.regularity_unknown
        )
        for ((key, labelRes) in options) {
            val rb = RadioButton(this).apply {
                text = getString(labelRes)
                tag = key
                isChecked = key == regularity
                minHeight = 48
                setPadding(16, 14, 16, 14)
                textSize = 16f
            }
            group.addView(rb)
        }
        group.setOnCheckedChangeListener { grp, id ->
            val rb = grp.findViewById<RadioButton>(id)
            regularity = rb?.tag as? String ?: "regular"
        }
    }

    private fun setupGoalCheckboxes() {
        val container = findViewById<LinearLayout>(R.id.goals_container)
        val goals = listOf(
            "track" to R.string.goal_track,
            "understand_symptoms" to R.string.goal_understand_symptoms,
            "avoid_pregnancy" to R.string.goal_avoid_pregnancy,
            "try_to_conceive" to R.string.goal_try_to_conceive,
            "track_pregnancy" to R.string.goal_track_pregnancy,
            "perimenopause" to R.string.goal_perimenopause
        )
        for ((key, labelRes) in goals) {
            val cb = CheckBox(this).apply {
                text = getString(labelRes)
                tag = key
                isChecked = selectedGoals.contains(key)
                minHeight = 48
                setPadding(16, 14, 16, 14)
                textSize = 16f
            }
            cb.setOnCheckedChangeListener { _, checked ->
                if (checked) selectedGoals.add(key) else selectedGoals.remove(key)
            }
            container.addView(cb)
        }
    }

    private fun nextStep() {
        // Save current step data
        when (step) {
            0 -> firstName = findViewById<TextInputEditText>(R.id.name_input)?.text?.toString() ?: ""
        }

        if (step < MAX_STEPS - 1) {
            step++
            renderStep()
        } else {
            finishOnboarding()
        }
    }

    private fun finishOnboarding() {
        val loading = findViewById<View>(R.id.loading_overlay)
        loading.visibility = View.VISIBLE

        // Auto-generate PIN (user never sees it, same as iOS)
        val pin = String.format("%06d", (0..999999).random())

        // Get last period date from picker
        val datePicker = findViewById<DatePicker>(R.id.date_picker)
        val cal = Calendar.getInstance().apply {
            set(datePicker.year, datePicker.month, datePicker.dayOfMonth)
        }
        val lastPeriodDate = String.format("%04d-%02d-%02d",
            cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1, cal.get(Calendar.DAY_OF_MONTH))

        val dbPath = VaultService.getDbPath(this)
        lifecycleScope.launch {
            try {
                val engine = withContext(Dispatchers.IO) {
                    LunaEngine.openVault(dbPath, pin)
                }
                VaultService.setEngine(engine)
                KeystoreService.storePin(this@OnboardingActivity, pin)

                // Auto-create first cycle from last period date
                withContext(Dispatchers.IO) {
                    try { engine.startCycle(lastPeriodDate) } catch (_: Exception) { }
                }

                // Store onboarding state
                val prefs = getSharedPreferences("luna_prefs", Context.MODE_PRIVATE)
                prefs.edit()
                    .putBoolean("onboarding_done", true)
                    .putString("user_name", firstName)
                    .apply()

                startActivity(Intent(this@OnboardingActivity, MainActivity::class.java)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
                finish()
            } catch (e: Exception) {
                loading.visibility = View.GONE
                Toast.makeText(this@OnboardingActivity,
                    e.localizedMessage ?: "Error creating vault", Toast.LENGTH_LONG).show()
            }
        }
    }
}
