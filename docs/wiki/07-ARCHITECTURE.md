# LUNA Architecture — Patterns & Anti-Patterns

## Clean Architecture

```
┌─────────────────────────────────────────────────┐
│                 Presentation                     │
│  iOS (SwiftUI)          Android (Kotlin Views)  │
│  ViewModels             ViewModels + Fragments   │
├─────────────────────────────────────────────────┤
│              UniFFI Boundary (FFI)               │
│  luna_core.swift (generated)                     │
│  luna_core.kt (generated)                        │
├─────────────────────────────────────────────────┤
│                  Domain (Rust)                   │
│  api.rs (17 public functions)                    │
│  engine/ (types, prediction, cycles)             │
├─────────────────────────────────────────────────┤
│                Infrastructure (Rust)             │
│  vault/database.rs (SQLCipher)                   │
│  vault/crypto.rs (AES-256-GCM, Argon2id)         │
└─────────────────────────────────────────────────┘
```

## Patterns Applied

| Pattern | Where | Evidence |
|---------|-------|----------|
| Clean Architecture | Rust core ↔ iOS/Android | UniFFI boundary separates domain from presentation |
| Repository | `LunaDb` | Abstracts SQLCipher behind typed methods |
| MVVM | iOS ViewModels, Android ViewModels | `@StateObject` / `ViewModel` + reactive binding |
| Singleton | `VaultService` (Android), `AppState` (iOS) | Single `LunaEngine` instance per app lifecycle |
| Observer | `@Published` / `LiveData` | Reactive UI updates on data change |
| Strategy | `PredictionEngine` | Calendar / BBT / LH / Combined prediction strategies |
| Builder | `DailyLog` construction | Optional fields pattern for flexible log creation |
| Zero Trust | Every vault access | PIN verification required each session, no trust cache |
| Encrypt at Rest | SQLCipher + backup | AES-256-GCM for DB, separate key for backup export |
| Defense in Depth | Full crypto stack | PIN → Argon2id → AES-256 → Keychain → zeroize |
| Privacy by Design | Architecture | Zero network, zero analytics, zero telemetry |
| Fail Secure | Error handling | Wrong PIN = vault stays locked, error = deny |

## Anti-Patterns Detected

| Anti-Pattern | Severity | Where | Finding | Remediation |
|-------------|----------|-------|---------|-------------|
| God Class | Medium | `AppState` (iOS) | Holds engine + flags + navigation | Split into AppState + NavigationState + EngineState |
| Magic Numbers | Low | `api.rs`, `crypto.rs` | PIN length 6, Argon2id params hardcoded | Extract to `const` declarations |
| No Delete API | Medium | `api.rs` | No individual record deletion | Add `delete_log(date)`, `delete_cycle(id)` |
| Monolith ViewModel | Low | `HomeViewModel` | Growing responsibilities | Split prediction + cycle + logging concerns |
| String Typing | Low | `types.rs` | Enums bridged as strings via UniFFI | Acceptable trade-off for cross-platform compat |
| No DB Migration | High | `database.rs` | No schema versioning | Add migration system before v0.2 |
| Silent Errors | Medium | Views | Some `catch {}` blocks swallow errors | Add user-facing error messages |

## Dependency Graph

```
luna-core 0.1.0
├── ring 0.17 (crypto primitives)
├── aes-gcm 0.10 (AES-256-GCM)
├── argon2 0.5 (KDF)
├── zeroize 1.8 (memory cleanup)
├── secrecy 0.8 (secret values)
├── rusqlite 0.31 [bundled-sqlcipher-vendored-openssl]
├── serde 1 + serde_json 1
├── uuid 1 (v4)
├── chrono 0.4
├── zstd 0.13 (compression)
├── uniffi 0.28 (FFI bindings)
└── thiserror 2 (error types)
```

All dependencies: well-maintained, no known CVEs. 2 transitive warnings (bincode, paste) via UniFFI — no security impact.
