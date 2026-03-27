# LUNA CRUD Matrix

## Entity Operations

| Entity | Create | Read | Update | Delete | API Function | Test Coverage |
|--------|--------|------|--------|--------|--------------|---------------|
| **Vault** | `open_vault(db_path, pin)` | `vault_exists(db_path)` | `change_pin(old, new)` | `panic_wipe()` | `api.rs` | ✅ 4 tests |
| **DailyLog** | `log_day(DailyLog)` | `get_log(date)` | `log_day(DailyLog)` (upsert) | ✅ `delete_log(date)` | `api.rs:46,72,77` | ✅ 6 tests |
| **Cycle** | `start_cycle(date)` | `get_cycles(limit)` | `end_cycle(id, date)` | ✅ `delete_cycle(id)` | `api.rs:82,87,97` | ✅ 4 tests |
| **Prediction** | — (computed) | `predict_next()` | — (recomputed) | — | `prediction.rs` | ✅ 3 tests |
| **CycleSummary** | — (computed) | `get_cycle_summary()` | — (recomputed) | — | `prediction.rs` | ✅ 2 tests |
| **UserProfile** | Created at onboarding | `get_user_profile()` | `set_user_profile()` | ⚠️ `panic_wipe()` only | `api.rs:329,334` | ✅ |
| **PregnancyLog** | `log_pregnancy_day(PregnancyLog)` | `get_pregnancy_log(date)` | `upsert` | ✅ `delete_pregnancy_log(date)` | `api.rs:339,344,349` | ✅ |
| **Backup** | `export_encrypted_backup(pin)` | ✅ `import_encrypted_backup(backup, pin)` | — | — | `api.rs:239,275` | ✅ 2 tests |
| **CSV** | `export_logs_csv(from, to)` | — | — | — | `api.rs:354` | ✅ |

## Notes

### Upsert Pattern
`log_day(DailyLog)` uses upsert semantics — if a log for the given date exists, it is overwritten. This means Create and Update share the same API call.

### Delete APIs Exist ✅
All three delete APIs are implemented and tested:
- `delete_log(date)` — api.rs:77
- `delete_cycle(id)` — api.rs:97
- `delete_pregnancy_log(date)` — api.rs:349
- Tested in `database.rs:533` (`test_delete_cycle_log_and_pregnancy_log`)

**Note:** `panic_wipe()` remains the preferred method for data destruction (privacy-first), but granular delete is available.

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
| `luna-core` | 87 total (57 behavior + 30 unit) | ✅ All passing |
| Vault (open/close/wipe/pin) | 4 | ✅ |
| DailyLog (create/read/upsert/delete) | 9+ | ✅ (J2 3 + J19 6) |
| Cycle (start/end/list/delete) | 7+ | ✅ (J3 3 + J19 4) |
| Prediction (calendar/bbt/lh/combined) | 14 | ✅ |
| CycleSummary | 2 | ✅ |
| Crypto (encrypt/decrypt/compress) | 5 | ✅ |
| Backup (export/import) | 6+ | ✅ (J8 3 + J16 4) |
| Database unit | 3 | ✅ |
| Import backup roundtrip | 1 | ✅ |
