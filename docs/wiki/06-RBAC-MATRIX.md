# LUNA RBAC Matrix

## Architecture

LUNA is a **single-user, offline-only** application. There is no server, no authentication service, and no multi-user access. All access control is enforced locally via PIN → vault key derivation.

### Access Control Chain

```
PIN (4-8 digits)
  → Argon2id (64MB memory, 3 iterations, 4 threads)
  → 256-bit master key
  → HKDF-SHA256 sub-key derivation
  → AES-256-GCM vault key
  → SQLCipher database encryption
```

**Enforcement points:**
- **iOS:** PIN stored in Keychain (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`)
- **Android:** PIN encrypted via Android Keystore (hardware-backed AES-256-GCM)
- **Rust core:** `LunaEngine::open_vault(db_path, pin)` gates all operations

## Role Definitions

| Role | Description | Authentication | Status |
|------|-------------|----------------|--------|
| **Owner** | Single user who created the vault | PIN → Argon2id → vault key | ✅ Implemented |
| **Guest** | Read-only access (e.g., show doctor) | — | 🔲 Not implemented |
| **None** | No vault exists or vault locked | — | App shows Lock/Onboarding |

## Permission Matrix — Owner

| Resource | Create | Read | Update | Delete | Enforced By |
|----------|--------|------|--------|--------|-------------|
| **Vault** | ✅ `open_vault()` | ✅ `vault_exists()` | ✅ `change_pin()` | ✅ `panic_wipe()` | PIN + Argon2id |
| **DailyLog** | ✅ `log_day()` | ✅ `get_log()` | ✅ `log_day()` (upsert) | ❌ Only via wipe | vault_open |
| **Cycle** | ✅ `start_cycle()` | ✅ `get_cycles()` | ✅ `end_cycle()` | ❌ Only via wipe | vault_open |
| **Prediction** | — | ✅ `predict_next()` | — | — | vault_open |
| **CycleSummary** | — | ✅ `get_cycle_summary()` | — | — | vault_open |
| **Backup** | ✅ `export_encrypted_backup()` | — | — | — | vault_open + PIN |
| **Settings** | ✅ (onboarding) | ✅ | ✅ | ❌ Only via wipe | vault_open |
| **PregnancyLog** | ✅ `log_day()` | ✅ `get_log()` | ✅ `log_day()` (upsert) | ❌ Only via wipe | vault_open |

## Permission Matrix — Guest (Future)

| Resource | Create | Read | Update | Delete | Enforced By |
|----------|--------|------|--------|--------|-------------|
| **All Resources** | ❌ | ✅ (read-only) | ❌ | ❌ | Guest session flag |

> **Note:** Guest role is not implemented. If added, it would allow a user to temporarily show data to a healthcare provider without giving write access. No PIN would be shared — Owner would unlock and enable a guest session.

## Permission Matrix — None (Locked/No Vault)

| Resource | Create | Read | Update | Delete | Enforced By |
|----------|--------|------|--------|--------|-------------|
| **Vault** | ✅ `open_vault()` | ✅ `vault_exists()` | ❌ | ❌ | — |
| **All Other Resources** | ❌ | ❌ | ❌ | ❌ | No vault key |

## Security Properties

| Property | Implementation |
|----------|----------------|
| **Encryption at rest** | SQLCipher (AES-256-CBC page encryption) |
| **Key derivation** | Argon2id (64MB, 3 iter, 4 threads) |
| **Key storage (iOS)** | Keychain `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` |
| **Key storage (Android)** | Android Keystore hardware-backed AES-256-GCM |
| **Nonce generation** | CSPRNG unique per encryption operation |
| **Memory safety** | `secrecy::SecretVec` with zeroize-on-drop |
| **Network access** | Zero — no INTERNET permission, no URLSession/reqwest |
| **Data destruction** | `panic_wipe()` — deletes DB file + Keychain/Keystore entries |
| **Auto-lock** | Vault locks on app background (iOS `scenePhase`, Android `onPause`) |

## Threat Model Summary

| Threat | Mitigation |
|--------|------------|
| Device seizure | PIN + Argon2id (resistant to brute-force) |
| Forensic recovery after wipe | SQLCipher file deletion (OS-level) |
| Intimate partner access | Auto-lock on background, no biometric bypass (yet) |
| Network exfiltration | Zero network permissions — impossible |
| Cloud backup exposure | App data excluded from iCloud/Google backup |
| Side-channel (memory dump) | `secrecy::SecretVec` zeroize-on-drop |
