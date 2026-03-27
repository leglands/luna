# LUNA — Copilot Instructions

## Project
Privacy-first menstrual cycle tracker · iOS + Android · Rust shared core
Code: LUNA · Repo: macaron-software/luna
ZERO network · ZERO emoji · WCAG 2.2 AA · 43 symptoms across 6 categories

## Stack
| Layer | Tech |
|-------|------|
| Core | Rust + UniFFI 0.28 (proc-macros, no .udl) |
| DB | SQLCipher (rusqlite bundled-sqlcipher-vendored-openssl) |
| Crypto | Argon2id(64MB/3iter/4t) → AES-256-GCM · HKDF-SHA256 · zstd |
| iOS | SwiftUI iOS 16+ · Keychain ThisDeviceOnly |
| Android | Kotlin Views · Android Keystore AES-256-GCM · minSdk 23 |
| Icons | SF Symbols (iOS) · Material + SVG Feather (Android) |

## Architecture
SwiftUI/Kotlin ←→ UniFFI ←→ Rust ←→ SQLCipher
Clean Arch · MVVM · Repository · Strategy · Zero Trust · Privacy by Design
RUBICON: 22 LunaEngine methods + vault_exists()
NON-RUBICON: KeychainService, NotificationManager, HealthKitManager (iOS); VaultService, KeystoreService, HealthConnectManager (Android)

## Commands
```bash
cargo test --all
cd ios-app && xcodegen generate
xcodebuild build -scheme LunaApp CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
cd android-app && ./gradlew bundleRelease
```

## Invariants
1. vault_open required before any of 22 API calls
2. PIN gates all ops · single owner · no RBAC
3. Delete APIs: DailyLog, Cycle, PregnancyLog
4. panic_wipe() irrecoverable — DB + salt + Keychain/Keystore destroyed
5. ZERO network permissions both platforms (ATS + networkSecurityConfig)
6. All data encrypted at rest SQLCipher AES-256-GCM
7. iOS Keychain: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
8. Android Keystore: hardware-backed AES-256-GCM when available
9. Secrets zeroized via secrecy::SecretVec after use
10. Schema migrations tracked in schema_version table
11. IHM headers present on all 23 view files
12. Schema: schema_version · cycles · daily_logs · meta · user_profile · pregnancy_logs

## Forbidden
- Emoji in UI, code, docs
- Network calls (HTTP, URLSession, reqwest, Firebase)
- Hardcoded strings (use i18n)
- API 24+ without version check (Android)
- .udl files (UniFFI proc-macros only)
- Editing Generated/ or generated/ directories
- Alpha channel on App Store icons
- Spring animations without @Environment(\.accessibilityReduceMotion) check

## Active Milestones
| Platform | Status |
|---------|--------|
| iOS | TestFlight v0.1.0 build 1 — awaiting App Privacy publish |
| Android | Production review pending · 1.0.0 (versionCode 2) |

Open Gaps (5): login rate limit (SBD-11) · cargo audit CI (SBD-14) · GH Actions SHA-pinning (SBD-15) · Urdu Android i18n · Von Restorff ovulation marker

## Key Decisions
- Argon2id(64MB/3iter/4t) over scrypt/bcrypt — mobile battery balance
- SQLCipher bundled (not system) — consistent crypto across OS versions
- UniFFI proc-macros — compile-time FFI generation
- ZERO network from day 1 — ATS + networkSecurityConfig + no networking crates
- panic_wipe irrecoverable — protects against coercion/physical threat
- Encrypted backup: AES-256-GCM blob · key from PIN via HKDF
- iOS Keychain ThisDeviceOnly — prevents key sync to new device
- Android Keystore hardware-backed — Titan M / Secure World when available
- Calm Mode — hide predictions · respects dignity over feature completeness
- 43 symptoms (not fewer) — 6 categories · Hick's law · 8-10 per category max

## API (22 functions)
open_vault · log_day · get_log · start_cycle · end_cycle · get_cycles · get_cycle_summary · predict_next · export_logs_csv · change_pin · panic_wipe · export_encrypted_backup · import_encrypted_backup

## Key Files
luna-core/src/api.rs · engine/types.rs · prediction.rs · vault/crypto.rs
ios-app/LunaApp/Views/ (13 SwiftUI views)
android-app/app/src/main/kotlin/app/luna/ui/

## Gotchas
- UniFFI: library not binary → uniffi-bindgen wrapper required
- iOS onChange(of:): 1-param=iOS16, 2-param=iOS17+
- SQLCipher Android: bundled-sqlcipher-vendored-openssl · NDK 27.2
- Pre-commit hook: blocks commits Mon-Fri 8h-19h
