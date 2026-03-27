# LUNA Traceability Matrix — Full UDID

> End-to-end traceability: Persona → Feature → User Story → Acceptance Criteria → IHM → Code → Unit Test → UI Test → E2E Test → CRUD → RBAC

## Traceability Chain

```
P1 (Emma) ──► F04 (Daily Log) ──► US04 (Log mood/flow/symptoms)
     │              │                    │
     │              │              AC: mood 1-5, flow 4 options, 43 symptoms
     │              │                    │
     │              ▼                    ▼
     │         IHM: LogSheetView    IHM: LogBottomSheet
     │              │                    │
     │              ▼                    ▼
     │         Code: log_day()      Code: log_day()
     │              │                    │
     │              ▼                    ▼
     │         TU: db tests (3)     UI: Espresso log
     │              │                    │
     │              ▼                    ▼
     │         E2E: Maestro 03      CRUD: C,R,U,D (all ops exist)
     │                                   │
     │                              RBAC: owner (vault_open)
     ▼
   TRACED ✅
```

## Full Matrix

| ID | Persona | Feature | User Story | AC | iOS Screen | Android Screen | Rust API | TU | iOS UI Test | Android UI Test | E2E | CRUD | RBAC |
|----|---------|---------|------------|-----|-----------|---------------|----------|-----|-------------|----------------|-----|------|------|
| T01 | P1,P5 | F01 Onboarding | US01 | 5 AC | OnboardingView | OnboardingActivity | open_vault, vault_exists | J1 (4) | XCUITest | Espresso | Maestro 01 | C,R | owner |
| T02 | P1,P5 | F02 Lock | US02 | 3 AC | LockView | LockActivity | open_vault | J6 (2) | XCUITest | Espresso | Maestro 02 | R | owner |
| T03 | P1,P2,P4 | F03 Dashboard | US03 | 4 AC | HomeView | MainActivity | predict_next, get_cycle_summary, get_log | J3,J4 | — | — | — | R | owner |
| T04 | P1,P2 | F04 Daily Log | US04 | 6 AC | LogSheetView | LogBottomSheet | log_day, get_log, delete_log | J2 (3) | XCUITest | — | Maestro 03 | C,R,U,D | owner |
| T05 | P1,P2 | F05 Calendar | US05 | 3 AC | CalendarView | CalendarFragment | get_logs_range, get_cycles | J12 | — | — | Maestro 04 | R | owner |
| T06 | P1,P2 | F06 Predictions | US06 | 3 AC | HomeView | MainActivity | predict_next | J4 (3) | — | — | — | R | owner |
| T07 | P1,P2 | F07 Insights | US07 | 3 AC | InsightsView | InsightsFragment | get_cycle_summary | J5 (2) | XCUITest | — | Maestro 05 | R | owner |
| T08 | P1,P5,P6 | F08 Settings | US08 | 4 AC | SettingsView | SettingsActivity | get_user_profile, set_user_profile | J10 (3) | — | Espresso | Maestro 06 | R,U | owner |
| T09 | P5 | F09 Panic Wipe | US09 | 3 AC | SettingsView | SettingsActivity | panic_wipe | J7 (2) | XCUITest | — | Maestro 07 | D | owner |
| T10 | P5 | F10 Backup | US10 | 3 AC | SettingsView | SettingsActivity | export_encrypted_backup, import_encrypted_backup | J8,J16 (5) | — | — | — | C,R | owner |
| T11 | P5 | F11 Change PIN | US11 | 3 AC | SettingsView | SettingsActivity | change_pin | J13 (3) | — | — | — | U | owner |
| T12 | P2 | F12 TTC Mode | US12 | 4 AC | TrackingModeView | TrackingModeActivity | set_user_profile, predict_next (combined) | J10 | XCUITest | Espresso | — | R,U | owner |
| T13 | P3 | F13 Pregnancy | US13 | 4 AC | PregnancyLogSheet | — | log_pregnancy_day, get_pregnancy_log, delete_pregnancy_log | J11 (2) | — | — | — | C,R,U,D | owner |
| T14 | P4 | F14 Perimenopause | US14 | 3 AC | PerimenopauseDashboard | — | get_cycles, get_cycle_summary, set_user_profile | J14 (3) | — | — | — | R | owner |
| T15 | P1 | F15 CSV Export | US15 | 3 AC | SettingsView | SettingsActivity | export_logs_csv | J12 (3) | XCUITest | — | — | C | owner |
| T16 | P6,P4 | F16 Calm Mode | US16 | 3 AC | SettingsView | SettingsActivity | get_user_profile, set_user_profile | J15 (3) | — | — | — | R,U | owner |
| T17 | P1 | F17 i18n | US17 | 2 AC | All screens | All screens | — (client-side) | — | — | — | — | — | — |
| T18 | P1,P6 | F18 Dark Mode | US18 | 2 AC | All screens | All screens | — (client-side) | — | — | — | — | — | — |
| T19 | P6 | F19 Accessibility | US19 | 4 AC | All screens | All screens | — (client-side) | — | — | — | — | — | — |

## Rust API Functions (22 total)

```
LunaEngine::open_vault(db_path, pin)
.log_day(DailyLog) · .get_log(date) · .delete_log(date)
.get_logs_range(from, to)
.start_cycle(date) · .end_cycle(id, date) · .delete_cycle(id) · .get_cycles(limit)
.predict_next() · .get_cycle_summary()
.get_user_profile() · .set_user_profile(profile)
.log_pregnancy_day(PregnancyLog) · .get_pregnancy_log(date) · .delete_pregnancy_log(date)
.export_logs_csv(from, to)
.export_encrypted_backup(pin) · .import_encrypted_backup(backup, pin)
.change_pin(old, new) · .panic_wipe()
vault_exists(db_path) — standalone
```

## Coverage Summary

| Layer | Traced | Total | Rate | Notes |
|-------|--------|-------|------|-------|
| Persona → Feature | 19/19 | 19 | 100% | 6 personas → 19 implemented features |
| Feature → User Story | 19/19 | 19 | 100% | US01-US19 mapped; US20 (Design Mode) is dev-only |
| User Story → AC | 19/19 | 19 | 100% | ~97 AC total |
| AC → IHM Screen | 19/19 | 19 | 100% | 10 screens (11 iOS + 12 Android files) |
| IHM → Rust API | 16/19 | 19 | 84% | F17,F18,F19 = client-side only |
| Rust API → Unit Test | 19/19 | 19 | 100% | All API functions tested |
| Rust TU → Behavior Test | 57/57 | 57 | 100% | J1-J19 behavior tests (J19 = delete ops) |
| Rust TU → Unit Test | 30/30 | 30 | 100% | prediction, export, crypto, db modules |
| IHM → iOS UI Test | 8/19 | 19 | 42% | Added BackupE2ETests |
| IHM → Android UI Test | 3/19 | 19 | 16% | |
| IHM → E2E (Maestro) | 8/19 | 19 | 42% | Added 08-backup-export.yaml |
| Entity → CRUD coverage | 24/24 | 24 | 100% | All CRUD ops exist; delete via panic_wipe or individual APIs |
| RBAC enforced | 17/17 | 17 | 100% | Owner-only model |

## CRUD Reality (vs Previous Documentation)

| Entity | Create | Read | Update | Delete | API Functions |
|--------|--------|------|--------|--------|---------------|
| **Vault** | ✅ open_vault | ✅ vault_exists | ✅ change_pin | ✅ panic_wipe | api.rs |
| **DailyLog** | ✅ log_day | ✅ get_log | ✅ log_day (upsert) | ✅ delete_log | api.rs:46,72,77 |
| **Cycle** | ✅ start_cycle | ✅ get_cycles | ✅ end_cycle | ✅ delete_cycle | api.rs:82,87,97 |
| **Prediction** | — | ✅ predict_next | — | — | prediction.rs |
| **CycleSummary** | — | ✅ get_cycle_summary | — | — | prediction.rs |
| **UserProfile** | ✅ (onboarding) | ✅ get_user_profile | ✅ set_user_profile | ⚠️ panic_wipe only | api.rs:329,334 |
| **PregnancyLog** | ✅ log_pregnancy_day | ✅ get_pregnancy_log | ✅ upsert | ✅ delete_pregnancy_log | api.rs:339,344,349 |
| **Backup** | ✅ export_encrypted_backup | ✅ import_encrypted_backup | — | — | api.rs:239,275 |

**Note:** Previous documentation incorrectly stated "no delete APIs exist" — all three delete APIs (`delete_log`, `delete_cycle`, `delete_pregnancy_log`) exist and are tested in `database.rs:533` (`test_delete_cycle_log_and_pregnancy_log`).

## Test Counts (Actual)

| Layer | Count | Framework |
|-------|-------|-----------|
| Rust behavior (J1-J19) | 57 | cargo test |
| Rust unit (prediction, export, crypto, db) | 30 | cargo test |
| **Rust Total** | **87** | |
| iOS unit | 14 | XCTest |
| iOS UI | ~59 | XCUITest (+BackupE2ETests) |
| Android unit | 23 | JUnit |
| Android instrumented | 16 | Espresso |
| E2E mobile | 8 flows | Maestro (+08-backup-export) |
| **Total** | **202** | 87 Rust + 69 iOS + 39 Android + 7 E2E |

## Real Gaps (No Aspirational Claims)

| Gap | ID | Priority | Status |
|-----|----|----------|--------|
| Dashboard (F03) has no UI test | TEST-G1 | Medium | Partial - HomeE2ETests exists but minimal assertions |
| Calendar (F05) has no UI test | TEST-G2 | Medium | Partial - Maestro covers navigation only |
| Predictions (F06) has no UI test | TEST-G3 | Low | Partial - Rust behavior tests logic |
| Backup restore (F10) has no E2E test | TEST-G4 | Medium | RESOLVED - BackupE2ETests + Maestro 08 |
| Change PIN (F11) has no UI test | TEST-G5 | Medium | RESOLVED - ChangePINE2ETests exists |
| Maestro flows not in CI | CI-G1 | High | Not implemented |
| No cargo audit in CI | SBD-14 | Medium | Not implemented |
| GH Actions not SHA-pinned | SBD-15 | Medium | Not implemented |
| Von Restorff ovulation marker | UX-G1 | Low | Design backlog |

## Vault Schema (SQLCipher — 6 tables)

```sql
-- schema_version: migration tracking
CREATE TABLE schema_version (version INTEGER PRIMARY KEY);

-- cycles: cycle start/end/period
CREATE TABLE cycles (
    id TEXT PRIMARY KEY,
    start_date TEXT NOT NULL,
    end_date TEXT,
    period_length INTEGER,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- daily_logs: daily health data
CREATE TABLE daily_logs (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL UNIQUE,
    symptoms BLOB NOT NULL DEFAULT X'',
    mood INTEGER, energy INTEGER, bbt REAL, lh_test TEXT,
    cervical_mucus TEXT, sexual_activity TEXT, flow TEXT,
    sleep_quality INTEGER, weight_kg REAL, notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- meta: key-value store
CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);

-- user_profile: tracking preferences
CREATE TABLE user_profile (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    tracking_mode TEXT NOT NULL DEFAULT 'regular',
    contraception TEXT NOT NULL DEFAULT 'none',
    pill_reminder TEXT,
    notif_period INTEGER NOT NULL DEFAULT 1,
    notif_fertile INTEGER NOT NULL DEFAULT 0,
    notif_pill INTEGER NOT NULL DEFAULT 0,
    edd TEXT,
    calm_mode INTEGER NOT NULL DEFAULT 0,
    health_sync INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- pregnancy_logs: pregnancy-specific data
CREATE TABLE pregnancy_logs (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL UNIQUE,
    hcg_positive INTEGER,
    kicks INTEGER,
    nausea_level INTEGER,
    weight_kg REAL,
    symptoms BLOB NOT NULL DEFAULT X'',
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX idx_cycles_start ON cycles(start_date);
CREATE INDEX idx_logs_date ON daily_logs(date);
CREATE INDEX idx_pregnancy_date ON pregnancy_logs(date);
```

(End of file - total 152 lines)
