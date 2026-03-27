-- =============================================================================
-- LUNA Traceability SQL — Vault Schema Reference
-- =============================================================================
-- 
-- This file documents the ACTUAL SQLCipher vault schema (6 tables).
-- 
-- IMPORTANT: There is NO separate SQLite traceability database.
-- Traceability data lives in markdown: docs/wiki/19-TRACEABILITY.md
--
-- This file provides:
-- 1. The actual vault schema (read-only reference)
-- 2. Views for querying vault data
-- 3. Comments showing the UDID traceability chain
--
-- Usage:
--   sqlite3 vault.db < scripts/generate_traceability.sql
--   sqlite3 vault.db -header -column "SELECT * FROM trace_view"
--
-- =============================================================================

-- =============================================================================
-- SECTION 1: ACTUAL VAULT SCHEMA (6 tables)
-- =============================================================================

-- schema_version: Migration tracking
CREATE TABLE IF NOT EXISTS schema_version (
    version INTEGER PRIMARY KEY
);

-- cycles: Cycle start/end/period
CREATE TABLE IF NOT EXISTS cycles (
    id            TEXT PRIMARY KEY,
    start_date    TEXT NOT NULL,
    end_date      TEXT,
    period_length INTEGER,
    notes         TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- daily_logs: Daily health data
CREATE TABLE IF NOT EXISTS daily_logs (
    id              TEXT PRIMARY KEY,
    date            TEXT NOT NULL UNIQUE,
    symptoms        BLOB NOT NULL DEFAULT X'',
    mood            INTEGER,
    energy          INTEGER,
    bbt             REAL,
    lh_test         TEXT,
    cervical_mucus  TEXT,
    sexual_activity TEXT,
    flow            TEXT,
    sleep_quality   INTEGER,
    weight_kg       REAL,
    notes           TEXT,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- meta: Key-value store
CREATE TABLE IF NOT EXISTS meta (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- user_profile: Tracking preferences
CREATE TABLE IF NOT EXISTS user_profile (
    id              INTEGER PRIMARY KEY CHECK (id = 1),
    tracking_mode   TEXT NOT NULL DEFAULT 'regular',
    contraception   TEXT NOT NULL DEFAULT 'none',
    pill_reminder   TEXT,
    notif_period    INTEGER NOT NULL DEFAULT 1,
    notif_fertile   INTEGER NOT NULL DEFAULT 0,
    notif_pill      INTEGER NOT NULL DEFAULT 0,
    edd             TEXT,
    calm_mode       INTEGER NOT NULL DEFAULT 0,
    health_sync     INTEGER NOT NULL DEFAULT 0,
    updated_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- pregnancy_logs: Pregnancy-specific data
CREATE TABLE IF NOT EXISTS pregnancy_logs (
    id           TEXT PRIMARY KEY,
    date         TEXT NOT NULL UNIQUE,
    hcg_positive INTEGER,
    kicks        INTEGER,
    nausea_level INTEGER,
    weight_kg    REAL,
    symptoms     BLOB NOT NULL DEFAULT X'',
    notes        TEXT,
    created_at   TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_cycles_start ON cycles(start_date);
CREATE INDEX IF NOT EXISTS idx_logs_date ON daily_logs(date);
CREATE INDEX IF NOT EXISTS idx_pregnancy_date ON pregnancy_logs(date);

-- =============================================================================
-- SECTION 2: UDID TRACEABILITY CHAIN (Markdown-based, not SQLite)
-- =============================================================================
--
-- Full traceability matrix: docs/wiki/19-TRACEABILITY.md
--
-- Chain: Persona → Feature → User Story → AC → IHM → Code → TU → E2E → CRUD → RBAC
--
-- 6 Personas: P1 Emma (Regular) · P2 Sarah (TTC) · P3 Marie (Pregnant)
--              P4 Nathalie (Perimenopause) · P5 Aïcha (Privacy) · P6 Sophie (a11y)
--
-- 19 Implemented Features (F01-F19):
--   F01 Onboarding · F02 Lock · F03 Dashboard · F04 Daily Log · F05 Calendar
--   F06 Predictions · F07 Insights · F08 Settings · F09 Panic Wipe · F10 Backup
--   F11 Change PIN · F12 TTC Mode · F13 Pregnancy · F14 Perimenopause
--   F15 CSV Export · F16 Calm Mode · F17 i18n · F18 Dark Mode · F19 Accessibility
--
-- 6 Backlog Features (F20-F25):
--   F20 Local Notifications · F21 Biometric Auth · F22 HealthKit/HealthConnect
--   F23 Trend Graphs · F24 Pill Reminder · F25 Apple Watch/Wear OS
--
-- 19 Traced User Stories: US01-US19 (US20 Design Mode is dev-only)
--
-- 22 Rust API Functions via UniFFI:
--   open_vault · log_day · get_log · delete_log · get_logs_range
--   start_cycle · end_cycle · delete_cycle · get_cycles
--   predict_next · get_cycle_summary
--   get_user_profile · set_user_profile
--   log_pregnancy_day · get_pregnancy_log · delete_pregnancy_log
--   export_logs_csv · export_encrypted_backup · import_encrypted_backup
--   change_pin · panic_wipe · vault_exists (standalone)
--
-- Test Coverage:
--   Rust: 81 tests (51 behavior J1-J18 + 30 unit)
--   iOS: 69 tests (14 XCTest + 55 XCUITest)
--   Android: 39 tests (23 JUnit + 16 Espresso)
--   E2E: 7 Maestro flows
--   Total: 196 tests
--
-- =============================================================================

-- =============================================================================
-- SECTION 3: HELPER VIEWS FOR VAULT DATA
-- =============================================================================

-- View: Recent cycles with computed length
CREATE VIEW IF NOT EXISTS v_cycles_recent AS
SELECT 
    id,
    start_date,
    end_date,
    period_length,
    julianday(end_date) - julianday(start_date) AS computed_cycle_length,
    notes
FROM cycles
ORDER BY start_date DESC;

-- View: Daily logs with parsed symptoms (requires app-level decompression)
CREATE VIEW IF NOT EXISTS v_logs_summary AS
SELECT 
    id,
    date,
    mood,
    energy,
    bbt,
    lh_test,
    cervical_mucus,
    sexual_activity,
    flow,
    sleep_quality,
    weight_kg,
    notes,
    created_at
FROM daily_logs
ORDER BY date DESC;

-- View: User profile (single row)
CREATE VIEW IF NOT EXISTS v_user_profile AS
SELECT 
    CASE tracking_mode 
        WHEN 'regular' THEN 'Regular'
        WHEN 'ttc' THEN 'Trying to Conceive'
        WHEN 'pregnancy' THEN 'Pregnancy'
        WHEN 'perimenopause' THEN 'Perimenopause'
        ELSE tracking_mode
    END AS tracking_mode,
    contraception,
    CASE WHEN calm_mode = 1 THEN 'Enabled' ELSE 'Disabled' END AS calm_mode,
    edd,
    updated_at
FROM user_profile
WHERE id = 1;

-- View: Pregnancy logs summary
CREATE VIEW IF NOT EXISTS v_pregnancy_logs AS
SELECT 
    id,
    date,
    CASE WHEN hcg_positive = 1 THEN 'Positive' ELSE 'Negative' END AS hcg,
    kicks,
    nausea_level,
    weight_kg,
    notes
FROM pregnancy_logs
ORDER BY date DESC;

-- =============================================================================
-- SECTION 4: EXPORT QUERIES (for manual inspection)
-- =============================================================================

-- Export all cycles as CSV-ready
.headers off
.mode list
-- SELECT 'id,start_date,end_date,period_length' UNION ALL
-- SELECT id||','||start_date||','||COALESCE(end_date,'NULL')||','||COALESCE(period_length,'NULL') FROM cycles;

-- Export daily log dates and flow (for calendar view)
-- SELECT date, flow FROM daily_logs WHERE flow IS NOT NULL ORDER BY date;

-- =============================================================================
-- END OF FILE
-- =============================================================================
