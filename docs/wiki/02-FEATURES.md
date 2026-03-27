# LUNA Features

## Feature Matrix

| ID | Feature | Persona | Priority | Status | API Functions | iOS Screen | Android Screen |
|----|---------|---------|----------|--------|---------------|------------|----------------|
| F01 | Onboarding / Vault Creation | P1, P5 | Critical | ✅ Implemented | `LunaEngine::open_vault(db_path, pin)` | `OnboardingView` | `OnboardingActivity` |
| F02 | Lock / Unlock (PIN) | P1, P5 | Critical | ✅ Implemented | `LunaEngine::open_vault(db_path, pin)`, `vault_exists(db_path)` | `LockView` | `LockActivity` |
| F03 | Dashboard (Home) | P1, P2, P4 | Critical | ✅ Implemented | `predict_next()`, `get_cycle_summary()`, `get_log(date)` | `HomeView` | `MainActivity` |
| F04 | Log Day | P1, P2 | Critical | ✅ Implemented | `log_day(DailyLog)`, `get_log(date)` | `LogSheetView` | `LogBottomSheet` |
| F05 | Calendar View | P1, P2 | High | ✅ Implemented | `get_cycles(limit)`, `get_log(date)` | `CalendarView` | `CalendarFragment` |
| F06 | Cycle Predictions | P1, P2 | High | ✅ Implemented | `predict_next()` | `HomeView` | `MainActivity` |
| F07 | Insights / Statistics | P1, P2 | High | ✅ Implemented | `get_cycle_summary()`, `get_cycles(limit)` | `InsightsView` | `InsightsFragment` |
| F08 | Settings | P1, P5, P6 | High | ✅ Implemented | — | `SettingsView` | `SettingsActivity` |
| F09 | Panic Wipe | P5 | Critical | ✅ Implemented | `panic_wipe()` | `SettingsView` | `SettingsActivity` |
| F10 | Encrypted Backup | P5 | High | ✅ Implemented | `export_encrypted_backup(pin)` | `SettingsView` | `SettingsActivity` |
| F11 | Change PIN | P5 | High | ✅ Implemented | `change_pin(old, new)` | `SettingsView` | `SettingsActivity` |
| F12 | TTC Mode | P2 | High | ✅ Implemented | `predict_next()` (combined: BBT+LH+calendar) | `TrackingModeView` | `TrackingModeActivity` |
| F13 | Pregnancy Mode | P3 | Medium | ✅ Implemented | `log_day(DailyLog)` | `PregnancyLogSheet` | — |
| F14 | Perimenopause Mode | P4 | Medium | ✅ Implemented | `get_cycles(limit)`, `get_cycle_summary()` | `PerimenopauseDashboard` | — |
| F15 | Cycle Start/End | P1 | Critical | ✅ Implemented | `start_cycle(date)`, `end_cycle(id, date)` | `HomeView` | `MainActivity` |
| F16 | Calm Mode | P6, P4 | Medium | ✅ Implemented | — (client-side toggle) | `SettingsView` | `SettingsActivity` |
| F17 | i18n (40 Languages) | P1, P5 | High | ✅ Implemented | — | `Localizable.xcstrings` | `res/values-*/strings.xml` |
| F18 | Dark Mode (Auto) | P1, P6 | Medium | ✅ Implemented | — | System auto | System auto |
| F19 | Accessibility (WCAG 2.2 AA) | P6 | High | ⚠️ In audit | — | VoiceOver + reduceMotion | TalkBack |
| F20 | Local Notifications | P1, P2 | High | 🔲 Backlog | — | — | — |
| F21 | Biometric Auth (FaceID/Fingerprint) | P5 | Medium | 🔲 Backlog | — | — | — |
| F22 | HealthKit / HealthConnect Bridge | P1 | Medium | 🔲 Backlog | — | — | — |
| F23 | Trend Graphs (BBT, Weight, Cycle) | P2, P4 | Medium | 🔲 Backlog | — | — | — |
| F24 | Pill / Contraception Reminder | P1 | Medium | 🔲 Backlog | — | — | — |
| F25 | Apple Watch / Wear OS | P1 | Low | 🔲 Backlog | — | — | — |

## Legend

- **Status**: ✅ Implemented = shipped in current build · 🔲 Backlog = planned
- **Priority**: Critical > High > Medium > Low
- **API Functions**: Rust UniFFI functions exposed via `luna-core`
- **iOS/Android Screen**: UI component implementing the feature
- `—` in Android column for F13/F14 = iOS-only screens (Android planned)
