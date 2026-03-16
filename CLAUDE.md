# LUNA — Agent Context (telegraphic)

> Menstrual cycle tracker · Privacy-first · iOS + Android · Rust shared core
> Full wiki: `docs/wiki/00-INDEX.md` (21 docs)

---

## STACK

| | |
|--|--|
| Core | Rust + UniFFI 0.28 (proc-macros, no .udl) |
| DB | SQLCipher (rusqlite bundled-sqlcipher-vendored-openssl) |
| Crypto | Argon2id(64MB/3iter/4t)→AES-256-GCM · HKDF-SHA256 subkeys · zstd BLOB |
| iOS | SwiftUI iOS 16+ · Keychain (Security.framework, ThisDeviceOnly) |
| Android | Kotlin Views · Android Keystore AES-256-GCM · minSdk **23** (Marshmallow) |
| i18n | 40 langs · xcstrings (FR source) · strings.xml · full RTL |
| a11y | WCAG 2.2 AA · Calm Mode · reduceMotion · TalkBack/VoiceOver |
| Icons | SF Symbols (iOS) · Material + SVG Feather (Android) · **ZERO emoji** |

---

## STORES

### Android — Google Play
- **Pkg**: `com.macaron.luna` (namespace: `app.luna`)
- **Status**: Production review pending · v0.1.1 (versionCode 2)
- **Keystore**: `android-app/keystore/luna-release.jks` · alias `luna`
- **ProGuard**: `proguard-rules.pro` keeps UniFFI/JNA classes
- **ABIs**: arm64-v8a, armeabi-v7a, x86_64 · `extractNativeLibs=true`

### iOS — App Store Connect
- **Bundle**: `com.macaron.luna` · Team `P36X572LL9` · App ID `6760126548`
- **Status**: TestFlight v0.1.0 build 1 · awaiting App Privacy publish
- **Cert**: `Apple Distribution: sylvain legland (P36X572LL9)`
- **ASC Key**: `~/.appstoreconnect/private_keys/AuthKey_48GLJZYX5K.p8`

---

## BUILD

```bash
cargo test --all                      # 68 tests (40 behavior + 28 unit)
cd ios-app && xcodegen generate
xcodebuild build -scheme LunaApp \
  -destination 'platform=iOS Simulator,id=7A806776-2927-46EF-98F6-4D852C5AC671' \
  CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO ONLY_ACTIVE_ARCH=YES

fastlane ios release                  # build + TestFlight
cd android-app && ./gradlew bundleRelease  # AAB

# Rebuild bindings (if Rust API changes)
cargo build --release
cargo run -p uniffi-bindgen -- generate \
  --library target/release/libluna_core.dylib \
  --language swift --out-dir ios-app/LunaApp/Generated
cp ios-app/LunaApp/Generated/luna_coreFFI.modulemap \
   ios-app/LunaApp/Generated/module.modulemap
cargo run -p uniffi-bindgen -- generate \
  --library target/release/libluna_core.dylib \
  --language kotlin --out-dir android-app/app/src/main/generated
```

---

## API (UniFFI — 18 public functions)

```rust
LunaEngine::open_vault(db_path, pin) -> Result<Arc<LunaEngine>, LunaError>
.log_day(DailyLog) .get_log(date) -> Option<DailyLog>
.get_logs_range(from, to) -> Vec<DailyLog>
.start_cycle(date) -> Cycle .end_cycle(id, date)
.get_cycles(limit) -> Vec<Cycle>
.get_cycle_summary() -> CycleSummary .predict_next() -> Prediction
.get_user_profile() -> UserProfile .set_user_profile(UserProfile)
.log_pregnancy_day(PregnancyLog) .get_pregnancy_log(date)
.export_logs_csv(from, to) -> String
.change_pin(old, new) .panic_wipe() .export_encrypted_backup(pin)
.import_encrypted_backup(backup, pin) -> u32
vault_exists(db_path) -> bool  // standalone
```

### DailyLog
```
id, date, symptoms: Vec<String>, mood?: u8(1-5), energy?: u8(1-5),
sleep_quality?: u8(1-5), weight_kg?: f64, bbt?: f64, lh_test?: str,
cervical_mucus?: str, sexual_activity?: str, flow?: str, notes?: str
```
43 symptom constants (cramps, PMS, ovulation, follicular, general, perimenopause)

---

## KEY FILES

```
luna-core/src/
  api.rs                    UniFFI public API (LunaEngine, 18 methods)
  engine/types.rs           DailyLog, Cycle, Prediction, CycleSummary, UserProfile, PregnancyLog
  engine/prediction.rs      PredictionEngine (calendar|bbt|lh|combined) — 14 unit tests
  engine/export.rs          CSV export (RFC 4180) — 6 unit tests
  vault/crypto.rs           AES-256-GCM, Argon2id, HKDF — 5 unit tests
  vault/database.rs         SQLCipher · upsert · rekey — 3 unit tests
  error.rs                  LunaError (8 variants: WrongPin, DatabaseCorrupted, CryptoError, IoError, InvalidData, WipedSuccessfully, VaultNotOpen, CycleNotFound)
  tests/behavior_tests.rs   40 behavior tests (J1-J15 user journeys)

ios-app/
  project.yml               xcodegen — regenerate xcodeproj if modified
  LunaApp/Generated/        DO NOT EDIT (luna_core.swift, .a, .modulemap)
  LunaApp/Views/            11 SwiftUI views: RootView, HomeView, OnboardingView, CalendarView,
                            InsightsView, LogSheetView, PregnancyLogSheet, SettingsView,
                            TrackingModeView, LockView, PerimenopauseDashboardView
  LunaApp/ViewModels/       HomeViewModel (hasLoggedToday, prediction, trackingMode)
  LunaApp/Resources/        Localizable.xcstrings (100+ keys, 40 langs)
  LunaApp/Services/         KeychainService, NotificationManager, HealthKitManager
  LunaTests/                14 unit tests (XCTest) — 2 files
  LunaUITests/              55 UI tests (XCUITest) — 2 files

android-app/app/src/main/
  AndroidManifest.xml       ZERO network + ZERO health permissions
  generated/uniffi/         DO NOT EDIT (luna_core.kt)
  jniLibs/{arm64,armv7,x86_64}/libluna_core.so
  kotlin/app/luna/
    services/               VaultService, KeystoreService, NotificationWorker, HealthConnectManager
    ui/                     5 Activities (Main, Onboarding, Lock, Settings, TrackingMode)
                            4 Fragments (Home, Calendar, Insights, Perimenopause)
                            2 BottomSheets (Log, PregnancyLog) + CycleChartView
  res/values/strings.xml    40 langs
  proguard-rules.pro        Keep rules for UniFFI/JNA
  test/                     23 unit tests (JUnit) — 2 files
  androidTest/              12 instrumented tests (Espresso) — 2 files

docs/wiki/                  21 wiki docs (security, compliance, UX, UI, a11y, i18n, traceability...)
.maestro/                   7 E2E flow YAMLs (Maestro)
```

---

## ARCHITECTURE

```
Presentation (SwiftUI / Kotlin) ←→ UniFFI boundary ←→ Domain (Rust) ←→ SQLCipher
```

Patterns (8/8 verified): Clean Arch · Repository · MVVM · Singleton · Strategy · Zero Trust · Privacy by Design · Fail Secure
Anti-patterns: NONE found — God Class resolved · DB migrations exist · No delete API intentional · Errors properly propagated
LEAN: ~1800 LOC Rust core · 8 deps · 5 layers

---

## SECURITY (SBD v1.1 — 25 controls audited)

| Status | Controls | Count |
|--------|----------|-------|
| ✅ PASS | SBD-01,04,05,06,07,08,09,13,21,23,24,25 | 12 |
| ⚠️ PARTIAL | SBD-11 (no rate limit), SBD-14 (no audit in CI), SBD-15 (actions not SHA), SBD-22 (no DoD) | 4 |
| N/A | SBD-02,03,10,12,16,17,18,19,20 (zero network/LLM) | 9 |

CVE: `cargo audit` clean — 2 low (bincode RUSTSEC-2025-0141, paste RUSTSEC-2024-0436 via UniFFI)
Threat model: physical access · IPV · data seizure → Argon2id + panic_wipe + zero network

---

## COMPLIANCE

| Framework | Score | Gaps |
|-----------|-------|------|
| SOC2 TSC | 8/9 | CC7 N/A (no server) |
| ISO 27001:2022 | 13/15 | A.5.19 + A.8.8 (dep scanning in CI) |
| GDPR Art.9 | 6/6 | Health data local-only · zero transfer |
| OWASP Mobile Top 10 | 8/10 | M8 + M9 partial (no RASP) |

GDPR lifecycle: create (voluntary) → encrypt (AES-256-GCM) → store (SQLCipher) → export (CSV/backup) → erase (panic_wipe)
DR: RTO N/A (local) · RPO = last backup · panic_wipe = irrecoverable (by design)

---

## UX LAWS (30 audited from lawsofux.com)

19 OK · 10 FIXED · 1 TODO
- **FIXED**: Fitts (44pt targets) · Hick (5-cat symptoms) · Peak-End (save feedback) · Zeigarnik (log badge) · Jakob (bottom tabs) · Doherty (loading spinner) · Postel (comma→dot) · Flow (haptic) · Cognitive Load (BBT tooltip) · Choice Overload (grouped symptoms)
- **TODO**: Von Restorff (ovulation marker needs visual distinction in calendar)

---

## UI — DESIGN TOKENS

| Category | Count | Values |
|----------|-------|--------|
| Colors | 12 | AppBg #FAFAFA/#0D0A14 · Accent #E91E63/#FF4081 · Lock always dark · Period/Fertile/Success/Error |
| Spacing | 6 | xs 4 · sm 8 · md 12 · lg 16 · xl 24 · xxl 32 pt |
| Radii | 4 | sm 8 · md 12 · lg 16 · pill 9999 pt |
| Fonts | 6 | SF Pro Display: title 28B, heading 22SB · SF Pro Text: body 17R, caption 13R, button 17SB · SF Mono 15R |
| Icons | 2 | sm 20pt · md 24pt · SF Symbols (iOS) · Material + SVG Feather (Android) · **ZERO emoji** |
| Touch | 2 | ≥44pt iOS · ≥48dp Android |

## UI — ATOMIC DESIGN (32 components)

| Level | Count | Components |
|-------|-------|-----------|
| Atoms | 10 | PINDot · NumberCircle · FlowChip · SymptomChip · CalendarDayCell · TabBarItem · StatCard · ToggleSwitch · ActionButton · SectionHeader |
| Molecules | 7 | PINKeypad · MoodPicker · FlowPicker · SymptomGrid · WeekStrip · CycleGauge · StatRow |
| Organisms | 7 | LogSheet · CalendarGrid · DashboardCard · SettingsList · InsightsPanel · PINEntry · CalmModeBanner |
| Templates | 4 | Dashboard · FormSheet · Grid · List |
| Pages | 4 | Onboarding · Lock · Home · Calendar |

---

## A11Y (WCAG 2.2 AA — 20 WAI-ARIA patterns audited)

15 OK · 4 PARTIAL · 1 FIXED
- **OK**: Button · Dialog · Alert · Checkbox · RadioGroup · Tabs · Listbox · Switch · Spinbutton · Disclosure · Link · ReduceMotion · Contrast · TouchTargets · TextScaling
- **PARTIAL**: Grid (calendar labels) · Meter (cycle gauge value) · Landmarks (semantic) · Focus (log sheet order)
- VoiceOver/TalkBack: all interactive elements labeled · Mood: "3 out of 5" (not emoji)
- reduceMotion → spring animations disabled · Calm Mode → predictions hidden

---

## TESTING

| Layer | Count | Framework |
|-------|-------|-----------|
| Rust behavior (J1-J18) | 51 | cargo test |
| Rust unit (prediction, export, crypto, db) | 28 | cargo test |
| iOS unit | 14 | XCTest |
| iOS UI | 55 | XCUITest |
| Android unit | 23 | JUnit |
| Android instrumented | 16 | Espresso |
| E2E mobile | 7 flows | Maestro |
| **Total** | **194** | |

---

## i18n (40 languages)

- iOS: 40 via Localizable.xcstrings (FR source) · Android: 40 via res/values-*/strings.xml
- RTL: ar ✅ · he ✅ · fa ✅ · ur ⚠️ (iOS only, missing Android)
- Zero hardcoded strings · Date/number follow locale

---

## TRACEABILITY (UDID — 20 SQLite tables, live codebase data)

### Coverage

| Layer | Rate | Notes |
|-------|------|-------|
| Persona → Feature | 100% | 6 personas → 20 impl features |
| Feature → US | 100% | 20 user stories |
| US → AC | 100% | ~97 acceptance criteria |
| AC → IHM | 100% | 10 screens (11 iOS + 12 Android files) |
| IHM → API | 85% | 17/20 (F17,F18,F19 = client-side) |
| API → Tests | 100% | 19/19 functions tested |
| Feature → Tests | 100% | All 20 features have tests |
| CRUD | 88% | 21/24 (3 Delete gaps — intentional) |
| RBAC | 100% | 20/20 owner-only enforced |

### IHM Headers (added to all 23 view files)

Every iOS View and Android Activity/Fragment has structured header:
```
// ┌──────────────────────────────────────────────────────────┐
// │ Screen · Personas · Features · CRUD · RBAC · US · Why   │
// └──────────────────────────────────────────────────────────┘
```

### CRUD Gaps (3 — intentional, privacy-first)

DailyLog Delete · Cycle Delete · PregnancyLog Delete → only panic_wipe() (full vault destruction)

### RBAC

Single owner · PIN → Argon2id → vault_open gates all 20 resource-operation pairs
- No unauthorized access possible (zero network = no remote attack surface)

---

## PRIVACY

- ZERO `INTERNET` permission · ZERO URLSession/reqwest · ZERO Firebase/Analytics
- ZERO health permissions (Android READ/WRITE_MENSTRUATION removed)
- DB encrypted SQLCipher · Argon2id key · CSPRNG nonce · secrecy::SecretVec zeroize
- iOS Keychain `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`
- Android Keystore hardware-backed AES-256-GCM
- panic_wipe() · encrypted backup export · privacy page: privacy.macaron-software.com/luna

---

## GAPS (from E2E audit — 5 remaining)

| # | Priority | Gap | Source |
|---|----------|-----|--------|
| 1 | Medium | No login rate limit | SBD-11 |
| 2 | Medium | GH Actions not SHA-pinned | SBD-15 |
| 3 | Medium | No cargo audit in CI | SBD-14 |
| 4 | Medium | Urdu missing from Android | i18n audit |
| 5 | Low | Von Restorff ovulation marker | UX audit |

---

## GOTCHAS

- UniFFI: library not binary → `uniffi-bindgen/` wrapper required
- `onChange(of:) { new in }` = iOS 16 (one param) · two params = iOS 17+
- `NavigationStack` + `.presentationDetents` = iOS 16 min
- Android Material3: `android:colorBackground` (prefixed) · `fillColor="@android:color/transparent"`
- SQLCipher Android: `bundled-sqlcipher-vendored-openssl` · NDK 27.2
- Play Store: `app.luna` taken → applicationId = `com.macaron.luna` (namespace unchanged)
- App Store: icon must have NO alpha channel · `UILaunchScreen` dict (not storyboard)
- App Store: `ITSAppUsesNonExemptEncryption=false` (local AES = exempt EAR)
- Pre-commit hook: blocks commits Mon-Fri 8h-19h

---

## QUICK COMMANDS

```bash
cargo test --all                      # 68 Rust tests
cargo audit                           # CVE scan
xcrun simctl io 7A806776-... screenshot /tmp/s.png
adb -s emulator-5554 logcat -d | grep app.luna
fastlane ios release                  # build + TestFlight
cd android-app && ./gradlew bundleRelease
maestro test .maestro/                # 7 E2E flows
```

---

## BENCHMARK vs COMPETITORS

| Feature | Flo | Clue | NatCycles | **LUNA** |
|---------|-----|------|-----------|---------|
| Period tracking | Yes | Yes | Yes | **Yes** |
| Categorized symptoms | Partial | Partial | No | **43** (5 categories) |
| Mood 1-5 | Emoji | Emoji | No | **Yes** (numeric circles) |
| Energy/Sleep/Weight | Partial | Partial | No | **All 3** |
| BBT + LH + Cervical | Yes | Yes | Yes | **Yes** |
| Predictions | Cloud AI | Cloud AI | Server | **On-device** |
| Encrypted backup | No | No | No | **AES-256** |
| i18n | 22 | 15 | 12 | **40 langs** |
| RTL (ar, he, fa) | Partial | No | No | **Yes** |
| WCAG 2.2 AA | Partial | Partial | No | **Yes** |
| Calm Mode | No | No | No | **Yes** (unique) |
| Panic Wipe | No | No | No | **Yes** (unique) |
| Zero network | No | No | No | **Yes** |
| Zero emoji UI | No | No | No | **Yes** |

Compatibility: Android API 23+ (~98%) · iOS 16+ (~95%) · 3 ABIs (arm64, armv7, x86_64)
