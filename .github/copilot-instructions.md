# LUNA — Copilot Instructions

> Menstrual cycle tracker · Privacy-first · Zero network · Rust + iOS + Android

## Project

- **Core**: Rust + UniFFI 0.28 (proc-macros, no .udl) → iOS (SwiftUI) + Android (Kotlin Views)
- **DB**: SQLCipher (AES-256-GCM, Argon2id KDF)
- **Privacy**: ZERO network, ZERO analytics, ZERO permissions
- **Tests**: 79 Rust + 38 iOS + 39 Android + 7 Maestro E2E = **163 total**
- **i18n**: 40 languages, full RTL (ar, he, fa, ur)
- **a11y**: WCAG 2.2 AA, Calm Mode, reduceMotion, VoiceOver/TalkBack

## Rules

1. **ZERO emoji in UI** — use SF Symbols (iOS) / Material + SVG Feather (Android)
2. **ZERO network** — no HTTP, no URLSession, no reqwest, no Firebase
3. **DO NOT EDIT** generated files: `LunaApp/Generated/*`, `generated/uniffi/*`
4. **iOS 16+ min** — use `onChange(of:) { new in }` (one param, not two)
5. **Android minSdk 23** — no API 24+ features without version check
6. **Encrypt first** — all data goes through SQLCipher, never plaintext
7. **Zeroize secrets** — use `secrecy::SecretVec`, zeroize after use
8. **Touch targets ≥44pt** (iOS) / **≥48dp** (Android)
9. **Always check** `@Environment(\.accessibilityReduceMotion)` before animations
10. **Calm Mode aware** — respect `appState.calmMode`, hide predictions when active

## Architecture

```
Presentation (SwiftUI / Kotlin) ←→ UniFFI boundary ←→ Domain (Rust) ←→ SQLCipher
```

- Patterns: Clean Arch, Repository, MVVM, Strategy, Zero Trust, Fail Secure
- Single owner model — PIN gates all access, no RBAC needed

## API (UniFFI — 18 public functions)

```
LunaEngine::open_vault(db_path, pin) → constructor
.log_day(DailyLog) · .get_log(date) · .get_logs_range(from, to)
.start_cycle(date) · .end_cycle(id, date) · .get_cycles(limit)
.predict_next() · .get_cycle_summary()
.get_user_profile() · .set_user_profile(profile)
.log_pregnancy_day(PregnancyLog) · .get_pregnancy_log(date)
.export_logs_csv(from, to) · .export_encrypted_backup(pin)
.change_pin(old, new) · .panic_wipe()
vault_exists(db_path) — standalone
```

## Key Files

```
luna-core/src/
  api.rs                     18 public UniFFI methods (LunaEngine)
  engine/types.rs            DailyLog, Cycle, Prediction, CycleSummary, UserProfile, PregnancyLog
  engine/prediction.rs       PredictionEngine (calendar|bbt|lh|combined) — 14 unit tests
  engine/export.rs           CSV export (RFC 4180) — 6 unit tests
  vault/crypto.rs            AES-256-GCM, Argon2id, HKDF — 5 unit tests
  vault/database.rs          SQLCipher, upsert, rekey — 3 unit tests
  error.rs                   LunaError (8 variants)
  tests/behavior_tests.rs    40 behavior tests (J1-J15)

ios-app/LunaApp/
  Views/                     11 SwiftUI views (Root, Home, Onboarding, Calendar, Insights, LogSheet, PregnancyLogSheet, Settings, TrackingMode, Lock, PerimenopauseDashboard)
  ViewModels/                HomeViewModel
  Services/                  KeychainService, NotificationManager, HealthKitManager

android-app/app/src/main/kotlin/app/luna/
  ui/                        5 Activities + 4 Fragments + 2 BottomSheets + 1 CustomView
  services/                  VaultService, KeystoreService, NotificationWorker, HealthConnectManager

.maestro/                    7 E2E flows (YAML)
docs/wiki/                   21 wiki docs (security, compliance, UX, traceability...)
```

## Build

```bash
cargo test --all                      # 68 Rust tests (40 behavior + 28 unit)
fastlane ios release                  # build + TestFlight
cd android-app && ./gradlew bundleRelease
maestro test .maestro/                # 7 E2E flows
```

## Security (SBD v1.1 — 25 controls)

- **PASS**: SBD-01,04,05,06,07,08,09,13,21,23,24,25 (12 controls)
- **PARTIAL**: SBD-11 (no login rate limit), SBD-14 (no audit in CI), SBD-15 (actions not SHA-pinned), SBD-22 (no DoD checklist)
- **N/A**: SBD-02,03,10,12,16,17,18,19,20 (9 controls — zero network/LLM)
- CVE: `cargo audit` clean — 2 low (bincode, paste via UniFFI transitive)
- Threat model: physical access, IPV, data seizure → Argon2id + panic_wipe

## Compliance

| Framework | Score | Notes |
|-----------|-------|-------|
| SOC2 TSC | 8/9 | CC7 N/A (no server) |
| ISO 27001 | 13/15 | A.5.19, A.8.8 ⚠️ (dep scanning) |
| GDPR Art.9 | 6/6 | Health data, local-only, zero transfer |
| OWASP Mobile | 8/10 | M8, M9 partial (no RASP) |

## UX Laws (30 audited)

- **OK**: 19 · **FIXED**: 10 · **TODO**: 1 (Von Restorff ovulation marker)
- Key: Fitts (44pt targets) · Hick (symptom categories) · Peak-End (save feedback) · Zeigarnik (log badge) · Cognitive Load (BBT tooltip) · Postel (comma→dot)

## Design Tokens

| Category | Tokens | Key Values |
|----------|--------|------------|
| Colors | 12 | AppBg #FAFAFA/#0D0A14 · Accent #E91E63/#FF4081 · Period/Fertile |
| Spacing | 6 | 4/8/12/16/24/32pt |
| Radii | 4 | 8/12/16/9999pt |
| Fonts | 6 | SF Pro Display/Text · title 28B · body 17R · caption 13R |
| Icons | 2 | 20pt sm · 24pt md · SF Symbols (iOS) · Feather SVG (Android) |
| Touch | 2 | ≥44pt iOS · ≥48dp Android |

## Atomic Design (32 components)

- **Atoms** (10): PINDot, NumberCircle, FlowChip, SymptomChip, CalendarDayCell, TabBarItem, StatCard, ToggleSwitch, ActionButton, SectionHeader
- **Molecules** (7): PINKeypad, MoodPicker, FlowPicker, SymptomGrid, WeekStrip, CycleGauge, StatRow
- **Organisms** (7): LogSheet, CalendarGrid, DashboardCard, SettingsList, InsightsPanel, PINEntry, CalmModeBanner
- **Templates** (4): Dashboard, FormSheet, Grid, List
- **Pages** (4): Onboarding, Lock, Home, Calendar

## A11Y (WCAG 2.2 AA — 20 patterns audited)

- **OK**: 15 · **PARTIAL**: 4 (grid labels, meter value, landmarks, focus order) · **FIXED**: 1 (slider)
- VoiceOver + TalkBack: labels on all interactive elements
- reduceMotion: spring animations disabled · Calm Mode: predictions hidden
- Touch targets: ≥44pt/48dp · Color contrast: AA ratio ≥4.5:1 text · Dynamic Type: supported

## i18n (40 languages)

- iOS: 40 langs via Localizable.xcstrings (FR source)
- Android: 40 langs via res/values-*/strings.xml
- RTL: ar, he, fa ✅ · ur ⚠️ (iOS only, missing Android)
- Zero hardcoded strings in code

## Traceability (UDID — live data, 20 SQLite tables)

| Layer | Traced | Total | Rate |
|-------|--------|-------|------|
| Persona → Feature | 6/6 | 6 | 100% |
| Feature → US | 20/20 | 20 | 100% |
| US → AC | 20/20 | 20 | 100% |
| AC → IHM | 20/20 | 20 | 100% |
| IHM → API | 17/20 | 20 | 85% |
| API → Tests | 19/19 | 19 | 100% |
| Feature → Tests | 20/20 | 20 | 100% |
| CRUD ops | 21/24 | 24 | 88% |
| RBAC enforced | 20/20 | 20 | 100% |

- **163 tests**: 79 Rust (51 behavior J1-J18 + 28 unit) · 38 iOS (14 XCTest + 24 XCUITest) · 39 Android (23 JUnit + 16 Espresso) · 7 Maestro E2E
- **CRUD gaps**: 3 Delete (DailyLog, Cycle, PregnancyLog — intentional, privacy-first)
- **IHM headers**: Added to all 23 view files (11 iOS + 12 Android) with persona/feature/RBAC/CRUD/US

## Patterns (8/8 verified) · Anti-patterns (0 found)

- Clean Arch · Repository · MVVM · Strategy · Singleton · Zero Trust · Privacy by Design · Fail Secure
- LEAN: ~1800 LOC Rust core · 8 deps · 5 layers · no over-engineering
- DB migrations exist (schema_version table)

## Gaps (priority order)

| # | Finding | Priority |
|---|---------|----------|
| 1 | No login rate limit (SBD-11) | Medium |
| 2 | GH Actions not SHA-pinned (SBD-15) | Medium |
| 3 | No cargo audit in CI (SBD-14) | Medium |
| 4 | Urdu missing from Android | Medium |
| 5 | Von Restorff ovulation marker | Low |
