# LUNA Testing — Unit, UI, E2E

## Test Summary

| Layer | Framework | Count | Status |
|-------|-----------|-------|--------|
| Rust unit | `cargo test --lib` | 30 | ✅ All pass |
| Rust behavior | `cargo test` | 57 | ✅ All pass (J1-J19) |
| iOS unit | XCTest | ~14 | ✅ |
| iOS UI | XCUITest | ~59 | ✅ |
| Android unit | JUnit | 23 | ✅ |
| Android instrumented | Espresso | ~16 | ✅ |
| E2E cross-platform | Maestro | 8 flows | ⚠️ Created, not in CI |
| **Total** | | **~200** | |

## Rust Tests (87 total)

### Unit Tests (30) — in source files

| Module | Tests | Description |
|--------|-------|-------------|
| prediction.rs | 14 | Calendar-based cycle prediction |
| export.rs | 6 | CSV export RFC 4180 |
| crypto.rs | 5 | Argon2id, AES-256-GCM, HKDF |
| database.rs | 4 | UserProfile, PregnancyLog roundtrips |
| api.rs | 1 | Backup export/import roundtrip |

### Behavior Tests (57) — J journeys

| Journey | Feature | Tests | Description |
|---------|---------|-------|-------------|
| J1 | F01 Onboarding | 4 | open_vault, vault_exists, wrong_pin, reopen |
| J2 | F04 Daily Log | 3 | log_day, get_log, overwrite |
| J3 | F03 Cycles | 3 | start, end, list |
| J4 | F06 Predictions | 3 | predict, no_data, accuracy |
| J5 | F07 Statistics | 2 | summary, empty |
| J6 | F02 Security | 2 | wrong_pin, correct_after_wrong |
| J7 | F09 Panic Wipe | 2 | wipe_clears, wipe_corrupts_key |
| J8 | F10 Backup | 3 | export, wrong_pin, not_plaintext |
| J9 | F04 Concurrency | 1 | concurrent_log |
| J10 | F08 Profile | 3 | set, get, update |
| J11 | F13 Pregnancy | 2 | log, get |
| J12 | F15 CSV | 3 | export, format, range |
| J13 | F11 Change PIN | 3 | change, reopen_new, reopen_old_fails |
| J14 | F14 Perimenopause | 3 | profile, symptoms, tracking_mode |
| J15 | F16 Calm Mode | 3 | enable, predictions_hidden, toggle |
| J16 | F10 Import Backup | 4 | roundtrip, wrong_pin, invalid_data, empty |
| J17 | F17 i18n | 5 | locale-safety, ISO-8601 dates |
| J18 | F18 Dark Mode | 2 | appearance-agnostic core |
| J19 | F04/F03 Delete | 6 | delete_log, delete_cycle CRUD |

## Maestro E2E Flows (8)

| Flow | File | Steps |
|------|------|-------|
| 01 Onboarding | `.maestro/01-onboarding.yaml` | Launch → name → period → PIN → vault created |
| 02 Lock/Unlock | `.maestro/02-lock-unlock.yaml` | Enter PIN → home visible → background → re-lock |
| 03 Log Day | `.maestro/03-log-day.yaml` | Open log → mood → flow → symptoms → save |
| 04 Calendar | `.maestro/04-calendar.yaml` | Navigate months → tap day → see log |
| 05 Insights | `.maestro/05-insights.yaml` | View stats → cycle averages → graphs |
| 06 Settings | `.maestro/06-settings.yaml` | Toggle calm mode → change tracking → export |
| 07 Panic Wipe | `.maestro/07-panic-wipe.yaml` | Settings → panic wipe → confirm → re-onboarding |
| 08 Backup | `.maestro/08-backup-export.yaml` | Settings → export CSV → encrypted backup |

## CI Pipeline

| Workflow | Rust | iOS Unit | iOS UI | Android Unit | Android UI |
|----------|------|----------|--------|-------------|------------|
| `ci-rust.yml` | ✅ 87 tests | ✅ XCTest | ⚠️ Step added | ✅ JUnit | ⚠️ Step added |
| `release.yml` | ✅ | ❌ | ❌ | ❌ | ❌ |

## Coverage Gaps (Remaining)

| Gap | Priority | Status |
|-----|----------|--------|
| Calendar UI tap day → log sheet | Medium | Partial - navigation only in Maestro |
| Prediction display on Dashboard | Low | Partial - Rust behavior tests logic |
| Backup share sheet verification | Medium | Partial - iOS test exists |
| A11y automated tests | Medium | Missing |
| Multi-ABI regression (arm64, armv7, x86_64) | Medium | Missing |
| Maestro not in CI yet | High | Created but not wired |

## Running Tests

```bash
# Rust (all tests)
cargo test --all                    # 87 tests (57 behavior + 30 unit)

# Rust behavior only
cargo test --test behavior_tests    # 57 J-journey tests

# Rust unit only
cargo test --lib                    # 30 unit tests

# iOS Simulator
cd ios-app && xcodebuild test -scheme LunaApp \
  -destination 'platform=iOS Simulator,id=7A806776-...'

# Android (requires emulator)
cd android-app && ./gradlew test           # Unit tests
cd android-app && ./gradlew connectedCheck # Espresso

# Maestro E2E
maestro test .maestro/
```
