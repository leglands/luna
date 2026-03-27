# ARCHITECTURE.md

## STACK
| Layer | Technology |
|-------|------------|
| Core | Rust + UniFFI 0.28 (proc-macros, no .udl) |
| DB | SQLCipher (rusqlite bundled-sqlcipher-vendored-openssl) |
| Crypto | Argon2id(64MB/3iter/4t) → AES-256-GCM · HKDF-SHA256 · zstd |
| iOS | SwiftUI iOS 16+ · Keychain ThisDeviceOnly |
| Android | Kotlin Views · Android Keystore AES-256-GCM · minSdk 23 |
| Icons | SF Symbols (iOS) · Material + SVG Feather (Android) · ZERO emoji |

## ARCHITECTURE LAYERS
SwiftUI/Kotlin ←→ UniFFI ←→ Domain (Rust) ←→ SQLCipher

## PATTERNS (8/8 verified)
Clean Architecture · Repository · MVVM · Singleton · Strategy · Zero Trust · Privacy by Design · Fail Secure

## INVARIANTS
1. All 22 UniFFI API functions require vault_open before any operation.
2. Single owner — PIN gates all resource operations, no RBAC needed.
3. Delete APIs exist for DailyLog, Cycle, PregnancyLog.
4. panic_wipe() is irrecoverable by design.
5. ZERO network permissions on both platforms.
6. All data encrypted at rest via SQLCipher AES-256-GCM.
7. iOS Keychain: kSecAttrAccessibleWhenUnlockedThisDeviceOnly.
8. Android Keystore: hardware-backed AES-256-GCM when available.
9. Secrets zeroized via secrecy::SecretVec after use.
10. Schema migrations tracked in schema_version table.
11. IHM headers present on all 23 view files.

## FORBIDDEN PATTERNS
- ZERO emoji in UI
- ZERO network calls (no HTTP, URLSession, reqwest, Firebase)
- NO hardcoded strings (all strings via i18n)
- NO API 24+ without version check on Android
- NO .udl files (UniFFI proc-macros only)
- NO editing of Generated/ or generated/ directories
- NO alpha channel on App Store icons
- NO spring animations without @Environment(\.accessibilityReduceMotion) check

## DATA MODEL (6 SQLCipher tables)
schema_version · cycles · daily_logs · meta · user_profile · pregnancy_logs
Indexes: idx_cycles_start, idx_logs_date, idx_pregnancy_date

## RUBICON (what crosses UniFFI boundary)
- Records: DailyLog, Cycle, Prediction, CycleSummary, UserProfile, PregnancyLog
- LunaError: WrongPin, DatabaseCorrupted, CryptoError, IoError, InvalidData, WipedSuccessfully, VaultNotOpen, CycleNotFound
- All 22 LunaEngine methods + vault_exists()

## NON-RUBICON (platform-only)
- iOS: KeychainService, NotificationManager, HealthKitManager, SwiftUI Views
- Android: VaultService, KeystoreService, NotificationWorker, HealthConnectManager, Activities/Fragments