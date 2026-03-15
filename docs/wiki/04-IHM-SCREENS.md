# LUNA IHM Screens

## S01 — Onboarding

```
┌─────────────────────────────────────────────────┐
│ Screen: OnboardingView / OnboardingActivity      │
│ Personas: P1 (Emma), P5 (Aïcha)                 │
│ Features: F01 (Onboarding / Vault Creation)      │
│ CRUD: Create                                     │
│ RBAC: None (vault does not exist yet)            │
│ User Stories: US01                               │
│ Why: First-run experience — create vault with    │
│      PIN and select tracking mode                │
└─────────────────────────────────────────────────┘
```

**Flow:**
1. Welcome screen with LUNA logo (vector, no emoji)
2. PIN creation: 4-8 digit entry + confirmation
3. Tracking mode selection: Regular / TTC / Perimenopause
4. Vault created → redirect to HomeView

**API Calls:** `LunaEngine::open_vault(db_path, pin)`

**iOS:** `OnboardingView.swift` — SwiftUI NavigationStack multi-step  
**Android:** `OnboardingActivity.kt` — Kotlin Views multi-step

---

## S02 — Lock Screen

```
┌─────────────────────────────────────────────────┐
│ Screen: LockView / LockActivity                  │
│ Personas: P1 (Emma), P5 (Aïcha)                 │
│ Features: F02 (Lock / Unlock)                    │
│ CRUD: Read                                       │
│ RBAC: None (vault locked, PIN required)          │
│ User Stories: US02                               │
│ Why: Gate access to vault — PIN entry to unlock  │
└─────────────────────────────────────────────────┘
```

**Flow:**
1. Always-dark background (`LockBackground`)
2. PIN entry keypad
3. Correct PIN → unlock vault → HomeView
4. Incorrect PIN → error shake animation (respects reduceMotion)

**API Calls:** `vault_exists(db_path)`, `LunaEngine::open_vault(db_path, pin)`

**iOS:** `LockView.swift` — dark background, numeric keypad  
**Android:** `LockActivity.kt` — dark background, numeric keypad

---

## S03 — Home / Dashboard

```
┌─────────────────────────────────────────────────┐
│ Screen: HomeView / MainActivity                  │
│ Personas: P1 (Emma), P2 (Sarah), P4 (Nathalie)  │
│ Features: F03 (Dashboard), F06 (Predictions)     │
│ CRUD: Read                                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US03, US06                         │
│ Why: Central dashboard showing cycle status,     │
│      predictions, and quick-log entry point      │
└─────────────────────────────────────────────────┘
```

**Layout:**
1. Current cycle day + phase indicator
2. Next period prediction (date + countdown)
3. Fertile window indicator (hidden in Calm Mode → `CalmModeBanner`)
4. Week overview strip with logged day indicators
5. FAB / button to open Log Sheet (S04)

**API Calls:** `predict_next()`, `get_cycle_summary()`, `get_log(date)`

**iOS:** `HomeView.swift` — SwiftUI ScrollView  
**Android:** `MainActivity.kt` — Kotlin Views, bottom navigation

---

## S04 — Log Sheet

```
┌─────────────────────────────────────────────────┐
│ Screen: LogSheetView / LogBottomSheet            │
│ Personas: P1 (Emma), P2 (Sarah)                 │
│ Features: F04 (Log Day)                          │
│ CRUD: Create, Read, Update                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US04                               │
│ Why: Primary data entry — log daily health data  │
└─────────────────────────────────────────────────┘
```

**Sections:**
1. **Flow**: none / light / medium / heavy / spotting
2. **Mood**: numbered circles 1-5 (zero emoji)
3. **Energy**: numbered circles 1-5
4. **Sleep Quality**: numbered circles 1-5
5. **Symptoms**: 43 symptoms in categorized chips (menstrual, PMS, ovulation, follicular, perimenopause)
6. **BBT**: temperature input (°C/°F toggle)
7. **LH Test**: negative / positive / peak
8. **Cervical Mucus**: dry / sticky / creamy / watery / egg-white
9. **Sexual Activity**: none / protected / unprotected
10. **Weight**: kg input
11. **Notes**: free text

**API Calls:** `log_day(DailyLog)`, `get_log(date)`

**iOS:** `LogSheetView.swift` — `.presentationDetents([.medium, .large])`  
**Android:** `LogBottomSheet.kt` — Material3 BottomSheetDialogFragment

---

## S05 — Calendar

```
┌─────────────────────────────────────────────────┐
│ Screen: CalendarView / CalendarFragment           │
│ Personas: P1 (Emma), P2 (Sarah)                 │
│ Features: F05 (Calendar View)                    │
│ CRUD: Read                                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US05                               │
│ Why: Monthly view of cycle history with period   │
│      and fertile window markers                  │
└─────────────────────────────────────────────────┘
```

**Layout:**
1. Month/year header with prev/next navigation
2. Day grid with color-coded markers (period, fertile, ovulation)
3. Day tap → opens Log Sheet (S04) for that date
4. RTL-aware layout (Arabic, Hebrew, Persian)

**API Calls:** `get_cycles(limit)`, `get_log(date)`

**iOS:** `CalendarView.swift` — custom LazyVGrid calendar  
**Android:** `CalendarFragment.kt` — custom RecyclerView grid

---

## S06 — Insights

```
┌─────────────────────────────────────────────────┐
│ Screen: InsightsView / InsightsFragment           │
│ Personas: P1 (Emma), P2 (Sarah)                 │
│ Features: F07 (Insights / Statistics)            │
│ CRUD: Read                                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US07                               │
│ Why: Cycle statistics and pattern analysis       │
└─────────────────────────────────────────────────┘
```

**Layout:**
1. Average cycle length card
2. Average period duration card
3. Cycle regularity indicator
4. Cycle history list (last N cycles with length)
5. Symptom frequency summary

**API Calls:** `get_cycle_summary()`, `get_cycles(limit)`

**iOS:** `InsightsView.swift` — SwiftUI cards  
**Android:** `InsightsFragment.kt` — Material3 cards

---

## S07 — Settings

```
┌─────────────────────────────────────────────────┐
│ Screen: SettingsView / SettingsActivity           │
│ Personas: P1 (Emma), P5 (Aïcha), P6 (Sophie)   │
│ Features: F08 (Settings), F09 (Panic Wipe),      │
│           F10 (Backup), F11 (PIN Change),         │
│           F16 (Calm Mode)                         │
│ CRUD: Read, Update, Delete                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US08, US09, US10, US11, US16       │
│ Why: Central configuration and security actions  │
└─────────────────────────────────────────────────┘
```

**Sections:**
1. **Security**: Change PIN, Biometric Auth (backlog)
2. **Data**: Export Backup, CSV Export (backlog), Panic Wipe
3. **Display**: Calm Mode toggle, Tracking Mode selector
4. **About**: Version, Privacy Policy link

**API Calls:** `change_pin(old, new)`, `export_encrypted_backup(pin)`, `panic_wipe()`

**iOS:** `SettingsView.swift` — SwiftUI List with sections  
**Android:** `SettingsActivity.kt` — Kotlin Views list

---

## S08 — Tracking Mode

```
┌─────────────────────────────────────────────────┐
│ Screen: TrackingModeView / TrackingModeActivity   │
│ Personas: P2 (Sarah), P3 (Marie), P4 (Nathalie) │
│ Features: F12 (TTC), F13 (Pregnancy),            │
│           F14 (Perimenopause)                     │
│ CRUD: Read, Update                               │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US12, US13, US14                   │
│ Why: Switch between tracking modes and access    │
│      mode-specific dashboards                    │
└─────────────────────────────────────────────────┘
```

**Options:**
1. **Regular** — standard cycle tracking (default)
2. **TTC** — enhanced fertile window, BBT chart, LH emphasis
3. **Pregnancy** — due date, milestones, pregnancy-specific logging
4. **Perimenopause** — irregular cycle tolerance, specific symptoms

**API Calls:** `predict_next()`, `get_cycles(limit)`

**iOS:** `TrackingModeView.swift` — mode selector + mode-specific content  
**Android:** `TrackingModeActivity.kt` — mode selector

---

## S09 — Pregnancy Log Sheet (iOS only)

```
┌─────────────────────────────────────────────────┐
│ Screen: PregnancyLogSheet                        │
│ Personas: P3 (Marie)                             │
│ Features: F13 (Pregnancy Mode)                   │
│ CRUD: Create, Read, Update                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US13                               │
│ Why: Pregnancy-specific data entry (hCG, kicks,  │
│      contractions, weight)                       │
│ Platform: iOS only (Android planned)             │
└─────────────────────────────────────────────────┘
```

**Fields:**
1. Pregnancy week / trimester (auto-calculated)
2. hCG level (mIU/mL)
3. Kick count (daily)
4. Contraction timing (start/end/interval)
5. Weight (kg)
6. Symptoms (pregnancy-specific subset)
7. Notes

**API Calls:** `log_day(DailyLog)`

**iOS:** `PregnancyLogSheet.swift` — `.presentationDetents([.large])`

---

## S10 — Perimenopause Dashboard (iOS only)

```
┌─────────────────────────────────────────────────┐
│ Screen: PerimenopauseDashboard                   │
│ Personas: P4 (Nathalie)                          │
│ Features: F14 (Perimenopause Mode)               │
│ CRUD: Read                                       │
│ RBAC: Owner (vault_open required)                │
│ User Stories: US14                               │
│ Why: Specialized view for irregular cycles and   │
│      perimenopause symptom tracking              │
│ Platform: iOS only (Android planned)             │
└─────────────────────────────────────────────────┘
```

**Layout:**
1. Cycle length variability chart (last 6-12 cycles)
2. Days since last period (no "late" warning)
3. Perimenopause symptom frequency (hot flashes, night sweats, etc.)
4. Cycle history with length variation highlighting

**API Calls:** `get_cycles(limit)`, `get_cycle_summary()`

**iOS:** `PerimenopauseDashboard.swift` — SwiftUI dashboard cards

---

## Screen Navigation Map

```
App Launch
    │
    ├── vault_exists? ──NO──→ [S01 Onboarding] ──→ [S03 Home]
    │
    └── vault_exists? ──YES─→ [S02 Lock] ──PIN OK──→ [S03 Home]
                                                        │
                              ┌─────────────────────────┤
                              │                         │
                        [S05 Calendar]            [S06 Insights]
                              │
                        [S04 Log Sheet]
                              │
                  ┌───────────┴───────────┐
            [S09 Pregnancy Log]    [S04 Standard Log]
                                          │
                              ┌───────────┤
                              │           │
                        [S07 Settings]  [S08 Tracking Mode]
                              │           │
                        [S10 Perimenopause Dashboard]
```
