# LUNA User Stories

## US01 — Onboarding

**As** Emma (P1), **I want** to create a secure vault with a PIN and choose my tracking mode **so that** my data is encrypted from the first use.

**Acceptance Criteria:**
1. User enters a 4-8 digit PIN and confirms it
2. PIN is derived via Argon2id(64MB/3iter/4t) → AES-256-GCM vault key
3. SQLCipher database is created and encrypted with derived key
4. User selects tracking mode (Regular, TTC, Perimenopause)
5. PIN is stored in iOS Keychain (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`) or Android Keystore (AES-256-GCM)

---

## US02 — Lock / Unlock

**As** Aïcha (P5), **I want** my vault to lock automatically when backgrounded and require PIN to unlock **so that** nobody can access my data if they pick up my phone.

**Acceptance Criteria:**
1. Vault locks immediately when app enters background
2. LockView is displayed on app launch if vault exists
3. Incorrect PIN shows error without revealing attempt count
4. After successful unlock, user lands on HomeView/Dashboard
5. `vault_exists(db_path)` returns `true` if a vault has been created

---

## US03 — Dashboard

**As** Emma (P1), **I want** to see my current cycle day, next period prediction, and a week overview **so that** I have an at-a-glance understanding of my cycle status.

**Acceptance Criteria:**
1. Dashboard displays current cycle day number
2. Next period prediction date and days remaining are shown
3. Week overview shows logged days with flow/symptom indicators
4. Calm Mode hides predictions and shows `CalmModeBanner` instead
5. Data loads from `predict_next()` and `get_cycle_summary()`

---

## US04 — Log Day

**As** Emma (P1), **I want** to log my mood, energy, flow, symptoms, BBT, and notes for any day **so that** I can build a complete health record over time.

**Acceptance Criteria:**
1. Log sheet allows selecting: mood (1-5), energy (1-5), sleep quality (1-5), flow (none/light/medium/heavy/spotting)
2. 43 symptoms available across categories (menstrual, PMS, ovulation, follicular, perimenopause)
3. Optional fields: BBT (°C/°F), LH test result, cervical mucus type, sexual activity, weight (kg), notes
4. Mood picker uses numbered circles 1-5 (zero emoji)
5. Log is persisted via `log_day(DailyLog)` → serde_json → zstd compress → SQLCipher BLOB

---

## US05 — Calendar

**As** Emma (P1), **I want** to see a monthly calendar with period and fertile window markers **so that** I can visualize my cycle patterns over time.

**Acceptance Criteria:**
1. Monthly calendar view with swipe navigation between months
2. Period days highlighted with flow intensity color coding
3. Predicted fertile window days marked distinctly
4. Tapping a day opens the log sheet for that day (US04)
5. Calendar supports RTL layout for Arabic/Hebrew/Persian locales

---

## US06 — Predictions

**As** Emma (P1), **I want** to see accurate predictions for my next period and fertile window **so that** I can plan ahead.

**Acceptance Criteria:**
1. Prediction engine uses calendar-based method by default
2. TTC mode enables combined prediction (calendar + BBT + LH)
3. Predictions calculated entirely on-device via `predict_next()`
4. Prediction displays: next period date, fertile window start/end, ovulation estimate
5. Insufficient data (< 2 cycles) shows "Not enough data" message

---

## US07 — Insights

**As** Emma (P1), **I want** to see cycle statistics, averages, and trends **so that** I can understand my body's patterns.

**Acceptance Criteria:**
1. Average cycle length displayed (last N cycles)
2. Average period duration displayed
3. Cycle regularity indicator (regular/irregular/insufficient data)
4. Data sourced from `get_cycle_summary()` and `get_cycles(limit)`
5. All statistics computed on-device, zero network calls

---

## US08 — Settings

**As** Emma (P1), **I want** to manage my profile, notifications, export, and tracking mode **so that** I can customize the app to my needs.

**Acceptance Criteria:**
1. Settings screen lists: Change PIN, Export Backup, Panic Wipe, Calm Mode toggle, Tracking Mode selector
2. Language selection follows system locale (40 languages)
3. Dark/Light mode follows system preference
4. Each destructive action (wipe, PIN change) requires confirmation dialog

---

## US09 — Panic Wipe

**As** Aïcha (P5), **I want** to destroy all my data immediately **so that** no one can access my health information if I'm in danger.

**Acceptance Criteria:**
1. Panic wipe button accessible from Settings
2. Confirmation dialog warns data destruction is irreversible
3. `panic_wipe()` deletes SQLCipher database file and Keychain/Keystore entries
4. App returns to onboarding state after wipe
5. Operation completes in under 1 second

---

## US10 — Encrypted Backup

**As** Aïcha (P5), **I want** to export an encrypted backup of my data **so that** I can restore it on another device without exposing it.

**Acceptance Criteria:**
1. Backup exported via `export_encrypted_backup(pin)`
2. Backup file encrypted with AES-256-GCM using PIN-derived key
3. Export uses system share sheet (iOS) or file picker (Android)
4. No network connection required or used for export
5. Backup file format is opaque binary (not readable without PIN)

---

## US11 — Change PIN

**As** Aïcha (P5), **I want** to change my vault PIN **so that** I can maintain security if my PIN is compromised.

**Acceptance Criteria:**
1. User must enter current PIN before setting new PIN
2. New PIN requires confirmation (enter twice)
3. `change_pin(old, new)` re-encrypts vault with new Argon2id-derived key
4. Keychain/Keystore entry updated with new PIN
5. Invalid old PIN returns error without changing anything

---

## US12 — TTC Mode

**As** Sarah (P2), **I want** an enhanced fertile window view with BBT chart and LH tracking **so that** I can optimize my conception timing.

**Acceptance Criteria:**
1. TTC mode activatable from Settings → Tracking Mode
2. Dashboard emphasizes fertile window and ovulation estimate
3. BBT logging with temperature trend visualization
4. LH test result logging (negative/positive/peak)
5. Combined prediction engine uses calendar + BBT + LH signals

---

## US13 — Pregnancy Mode

**As** Marie (P3), **I want** to track pregnancy milestones, log hCG levels, kicks, and contractions **so that** I have a private pregnancy journal.

**Acceptance Criteria:**
1. Pregnancy mode activatable from Settings → Tracking Mode
2. Due date calculation from last menstrual period
3. Pregnancy-specific logging fields: hCG level, kick count, contraction timing
4. Weekly milestone display (trimester, fetal development stage)
5. Data stored in same encrypted vault as cycle data

---

## US14 — Perimenopause Mode

**As** Nathalie (P4), **I want** to track my irregular cycles and perimenopause symptoms **so that** I can discuss patterns with my gynecologist.

**Acceptance Criteria:**
1. Perimenopause mode activatable from Settings → Tracking Mode
2. No "late period" warnings for cycles > 35 days
3. Perimenopause-specific symptoms available (hot flashes, night sweats, vaginal dryness, joint pain)
4. Cycle length variability displayed in Insights
5. Predictions adapt to irregular cycle patterns or are hidden

---

## US15 — CSV Export

**As** Emma (P1), **I want** to export my data as CSV **so that** I can share it with my doctor or analyze it externally.

**Acceptance Criteria:**
1. CSV export option available in Settings
2. Export includes all DailyLog fields with headers
3. Date format follows ISO 8601 (YYYY-MM-DD)
4. File shared via system share sheet / file picker
5. Zero network connection used

---

## US16 — Calm Mode

**As** Sophie (P6), **I want** to hide predictions and reduce anxiety-triggering content **so that** I can use the app without stress.

**Acceptance Criteria:**
1. Calm Mode toggle in Settings (persisted in UserDefaults / SharedPreferences)
2. When enabled, predictions section replaced with `CalmModeBanner`
3. Fertile window markers hidden from calendar
4. Insights remain accessible (historical data, not predictive)
5. Toggle state persists across app launches

---

## US17 — Internationalization

**As** Emma (P1), **I want** to use the app in my preferred language **so that** I understand all labels and instructions.

**Acceptance Criteria:**
1. App supports 40 languages (source: French)
2. Language follows system locale automatically
3. RTL layout for Arabic, Hebrew, Persian (mirrored UI)
4. All strings externalized (iOS: `Localizable.xcstrings`, Android: `res/values-*/strings.xml`)
5. Date and number formatting follow locale conventions

---

## US18 — Dark Mode

**As** Emma (P1), **I want** the app to switch between dark and light themes automatically **so that** it's comfortable in any lighting condition.

**Acceptance Criteria:**
1. Theme follows system preference (`preferredColorScheme(nil)`)
2. Light background: `#FAFAFA` / Dark background: `#0D0A14`
3. Lock screen always uses dark background (`LockBackground`)
4. All text and icons maintain WCAG 2.2 AA contrast ratios in both themes
5. No manual theme toggle (system-controlled)

---

## US19 — Accessibility

**As** Sophie (P6), **I want** full VoiceOver/TalkBack support and motion reduction **so that** I can use the app with my visual impairment.

**Acceptance Criteria:**
1. All interactive elements have accessibility labels
2. Mood picker announces "Mood: 3 out of 5" (not emoji descriptions)
3. `@Environment(\.accessibilityReduceMotion)` disables spring animations
4. Calendar navigation works with swipe gestures in VoiceOver
5. Minimum touch target size: 44×44 points (iOS) / 48×48 dp (Android)

---

## US20 — Design Mode

**As** a developer, **I want** to annotate and review UI components **so that** I can validate design system compliance.

**Acceptance Criteria:**
1. Design mode accessible via hidden developer gesture or build flag
2. Overlays show component boundaries, spacing, and color values
3. Typography scale and spacing tokens are validated against design system
4. Screenshots can be captured programmatically for design review
5. Mode is stripped from release builds
