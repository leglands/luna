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
     │         TU: J2 (3 tests)     UI: Espresso log
     │              │                    │
     │              ▼                    ▼
     │         E2E: Maestro 03      CRUD: C,R,U
     │                                   │
     │                              RBAC: owner (vault_open)
     ▼
  TRACED ✅
```

## Full Matrix

| ID | Persona | Feature | User Story | AC | iOS Screen | Android Screen | Rust API | Rust Test | iOS UI Test | Android UI Test | E2E | CRUD | RBAC |
|----|---------|---------|------------|-----|-----------|---------------|----------|-----------|-------------|----------------|-----|------|------|
| T01 | P1,P5 | F01 Onboarding | US01 | 5 AC | OnboardingView | OnboardingActivity | open_vault, vault_exists | J1 (4) | XCUITest | Espresso | Maestro 01 | C | owner |
| T02 | P1,P5 | F02 Lock | US02 | 3 AC | LockView | LockActivity | open_vault | J6 (2) | XCUITest | Espresso | Maestro 02 | R | owner |
| T03 | P1,P2,P4 | F03 Dashboard | US03 | 4 AC | HomeView | HomeFragment | get_cycles, predict_next | J3,J4 | — | — | — | R | owner |
| T04 | P1,P2 | F04 Daily Log | US04 | 6 AC | LogSheetView | LogBottomSheet | log_day, get_log | J2 (3) | XCUITest | — | Maestro 03 | C,R,U | owner |
| T05 | P1,P2 | F05 Calendar | US05 | 3 AC | CalendarView | CalendarFragment | get_logs_range | J12 | — | — | Maestro 04 | R | owner |
| T06 | P1,P2 | F06 Predictions | US06 | 3 AC | HomeView | HomeFragment | predict_next | J4 (3) | — | — | — | R | owner |
| T07 | P1,P2 | F07 Insights | US07 | 3 AC | InsightsView | InsightsFragment | get_cycle_summary | J5 (2) | XCUITest | — | Maestro 05 | R | owner |
| T08 | P1,P5 | F08 Settings | US08 | 4 AC | SettingsView | SettingsActivity | get/set_user_profile | J10 (3) | — | Espresso | Maestro 06 | R,U | owner |
| T09 | P5 | F09 Panic Wipe | US09 | 3 AC | SettingsView | SettingsActivity | panic_wipe | J7 (2) | XCUITest | — | Maestro 07 | D | owner |
| T10 | P5 | F10 Backup | US10 | 3 AC | SettingsView | SettingsActivity | export_encrypted_backup | J8 (3) | — | — | — | C | owner |
| T11 | P5 | F11 Change PIN | US11 | 3 AC | SettingsView | SettingsActivity | change_pin | J13 (3) | — | — | — | U | owner |
| T12 | P2 | F12 TTC Mode | US12 | 4 AC | TrackingModeView | TrackingModeActivity | set_user_profile | J10 | XCUITest | Espresso | — | R,U | owner |
| T13 | P3 | F13 Pregnancy | US13 | 4 AC | PregnancyLogSheet | LogBottomSheet | log_pregnancy_day | J11 (2) | — | — | — | C,R,U | owner |
| T14 | P4 | F14 Perimenopause | US14 | 3 AC | PerimenopauseDash | HomeFragment | set_user_profile | J14 (3) | — | — | — | R | owner |
| T15 | P1 | F15 CSV Export | US15 | 3 AC | SettingsView | SettingsActivity | export_logs_csv | J12 (3) | XCUITest | — | — | C | owner |
| T16 | P6 | F16 Calm Mode | US16 | 3 AC | SettingsView | SettingsActivity | get/set_user_profile | J15 (3) | — | — | — | R,U | owner |
| T17 | P1 | F17 i18n | US17 | 2 AC | All screens | All screens | — | — | — | — | — | — | — |
| T18 | P1 | F18 Dark Mode | US18 | 2 AC | All screens | All screens | — | — | — | — | — | — | — |
| T19 | P6 | F19 Accessibility | US19 | 4 AC | All screens | All screens | — | — | — | — | — | — | — |

## Coverage Summary

| Layer | Traced | Total | Rate |
|-------|--------|-------|------|
| Persona → Feature | 19/19 | 19 | 100% |
| Feature → User Story | 19/19 | 19 | 100% |
| User Story → AC | 19/19 | 19 | 100% |
| AC → IHM Screen | 19/19 | 19 | 100% |
| IHM → Rust API | 17/19 | 19 | 89% (i18n, dark mode have no API) |
| Rust API → Unit Test | 17/17 | 17 | 100% |
| IHM → iOS UI Test | 7/19 | 19 | 37% |
| IHM → Android UI Test | 3/19 | 19 | 16% |
| IHM → E2E (Maestro) | 7/19 | 19 | 37% |
| Entity → CRUD coverage | 23/26 | 26 | 88% (3 delete gaps) |
| RBAC enforced | 17/17 | 17 | 100% (owner-only model) |

## Gaps

| Gap | ID | Priority |
|-----|----|----------|
| No delete API for DailyLog | CRUD-G1 | Medium |
| No delete API for Cycle | CRUD-G2 | Medium |
| No delete API for PregnancyLog | CRUD-G3 | Low |
| Dashboard (F03) has no UI test | TEST-G1 | Medium |
| Calendar (F05) has no UI test | TEST-G2 | Medium |
| Predictions (F06) has no UI test | TEST-G3 | Low |
| Backup (F10) has no UI test | TEST-G4 | Medium |
| Change PIN (F11) has no UI test | TEST-G5 | Medium |
| No import_backup() API (restore) | API-G1 | High |
| Maestro flows not in CI | CI-G1 | High |
