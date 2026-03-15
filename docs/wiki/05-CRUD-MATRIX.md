# LUNA CRUD Matrix

## Entity Operations

| Entity | Create | Read | Update | Delete | API Function | Test Coverage |
|--------|--------|------|--------|--------|--------------|---------------|
| **Vault** | `open_vault(db_path, pin)` | `vault_exists(db_path)` | `change_pin(old, new)` | `panic_wipe()` | `api.rs` | ✅ 4 tests |
| **DailyLog** | `log_day(DailyLog)` | `get_log(date)` | `log_day(DailyLog)` (upsert) | ⚠️ No individual delete | `api.rs`, `database.rs` | ✅ 6 tests |
| **Cycle** | `start_cycle(date)` | `get_cycles(limit)` | `end_cycle(id, date)` | ⚠️ No individual delete | `api.rs`, `database.rs` | ✅ 4 tests |
| **Prediction** | — (computed) | `predict_next()` | — (recomputed) | — | `prediction.rs` | ✅ 3 tests |
| **CycleSummary** | — (computed) | `get_cycle_summary()` | — (recomputed) | — | `prediction.rs` | ✅ 2 tests |
| **UserProfile** | Created at onboarding | Settings UI | Settings UI | `panic_wipe()` | Client-side | — |
| **PregnancyLog** | `log_day(DailyLog)` | `get_log(date)` | `log_day(DailyLog)` (upsert) | ⚠️ No individual delete | `api.rs` | ✅ via DailyLog |
| **Backup** | `export_encrypted_backup(pin)` | — (export only) | — | — | `api.rs` | ✅ 2 tests |
| **CSV** | — (backlog F15) | — | — | — | — | — |

## Notes

### Upsert Pattern
`log_day(DailyLog)` uses upsert semantics — if a log for the given date exists, it is overwritten. This means Create and Update share the same API call.

### Delete Gap ⚠️
Individual record deletion is **not implemented** for DailyLog, Cycle, or PregnancyLog. The only delete mechanism is `panic_wipe()`, which destroys the entire vault (SQLCipher database file + Keychain/Keystore entries).

**Rationale:** Privacy-first design — granular delete adds complexity and forensic recovery risk. Full wipe is the safest option for the threat model (IPV survivors, data seizure).

**Future consideration:** Soft-delete for individual days could be added if users request it, but must ensure SQLCipher vacuum to prevent recovery.

### Computed Entities
Prediction and CycleSummary are **not stored** — they are computed on-the-fly from DailyLog and Cycle data. No CRUD operations beyond Read apply.

### Storage Pipeline
```
DailyLog fields
    → serde_json serialization
    → zstd compression
    → AES-256-GCM encryption (vault key)
    → SQLCipher BLOB column
```

## Test Coverage Summary

| Module | Tests | Status |
|--------|-------|--------|
| `luna-core` | 23 | ✅ All passing |
| Vault (open/close/wipe/pin) | 4 | ✅ |
| DailyLog (create/read/upsert) | 6 | ✅ |
| Cycle (start/end/list) | 4 | ✅ |
| Prediction (calendar/bbt/lh/combined) | 3 | ✅ |
| CycleSummary | 2 | ✅ |
| Crypto (encrypt/decrypt/compress) | 2 | ✅ |
| Backup (export) | 2 | ✅ |
