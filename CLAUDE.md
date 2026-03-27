# LUNA — Agent Context

## Project
Privacy-first menstrual cycle tracker · iOS + Android · Rust shared core

## Stack
- Core: Rust + UniFFI 0.28 (proc-macros, no .udl)
- DB: SQLCipher (rusqlite bundled-sqlcipher-vendored-openssl)
- Crypto: Argon2id(64MB/3iter/4t)→AES-256-GCM · HKDF-SHA256 · zstd BLOB
- iOS: SwiftUI iOS 16+ · Keychain ThisDeviceOnly
- Android: Kotlin Views · Android Keystore AES-256-GCM · minSdk 23
- a11y: WCAG 2.2 AA · Calm Mode · reduceMotion · ZERO emoji

## Architecture
SwiftUI/Kotlin ←→ UniFFI ←→ Rust ←→ SQLCipher
Clean Arch · MVVM · Repository · Strategy · Zero Trust · Privacy by Design

## API (22 functions)
LunaEngine::open_vault → log_day · get_log · start_cycle · end_cycle
get_cycles · get_cycle_summary · predict_next · export_logs_csv
change_pin · panic_wipe · export/import_encrypted_backup

## Build
```bash
cargo test --all
cd ios-app && xcodegen generate
xcodebuild build -scheme LunaApp CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
cd android-app && ./gradlew bundleRelease
```

## Security
- ZERO network (ATS + networkSecurityConfig)
- Argon2id key derivation · AES-256-GCM at rest
- panic_wipe() irreversible · Keychain ThisDeviceOnly
- SBD v1.1: 12/12 PASS · cargo audit clean

## Key Files
- luna-core/src/api.rs · engine/types.rs · prediction.rs · vault/crypto.rs
- ios-app/LunaApp/Views/ (13 SwiftUI views)
- android-app/app/src/main/kotlin/app/luna/ui/

## Gotchas
- UniFFI: library not binary → uniffi-bindgen/ wrapper required
- iOS: onChange(of:) 1-param=iOS16, 2-param=iOS17+
- SQLCipher Android: bundled-sqlcipher-vendored-openssl · NDK 27.2
- Pre-commit hook: blocks commits Mon-Fri 8h-19h

@.ai/ARCHITECTURE.md @.ai/PLANS.md