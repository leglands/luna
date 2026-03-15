# LUNA Wiki — Table of Contents

> Privacy-first menstrual cycle tracking · iOS + Android · Rust core

## Navigation

| # | Document | Scope |
|---|----------|-------|
| 01 | [Personas](01-PERSONAS.md) | 6 user personas with goals, frustrations, scenarios |
| 02 | [Features](02-FEATURES.md) | 25 features with status, priority, persona mapping |
| 03 | [User Stories](03-USER-STORIES.md) | 20 user stories with acceptance criteria |
| 04 | [IHM Screens](04-IHM-SCREENS.md) | All screens with persona/feature/CRUD/RBAC headers |
| 05 | [CRUD Matrix](05-CRUD-MATRIX.md) | Entity × Operation × API × Screen × Test coverage |
| 06 | [RBAC Matrix](06-RBAC-MATRIX.md) | Role-based access control (owner-only model) |
| 07 | [Architecture](07-ARCHITECTURE.md) | Clean Architecture, patterns, anti-patterns |
| 08 | [Security](08-SECURITY.md) | SecureByDesign 25 controls, threat model, CVE audit |
| 09 | [Compliance](09-COMPLIANCE.md) | SOC2 + ISO 27001:2022 mapping |
| 10 | [UX Laws](10-UX-LAWS.md) | 30 Laws of UX audit with LUNA findings |
| 11 | [UI Components](11-UI-COMPONENTS.md) | Atomic Design hierarchy, component gallery |
| 12 | [Design Tokens](12-DESIGN-TOKENS.md) | Colors, spacing, fonts, radius, icons |
| 13 | [A11Y](13-A11Y.md) | WCAG 2.2 AA, ARIA patterns, VoiceOver/TalkBack |
| 14 | [i18n](14-I18N.md) | 40 languages, RTL support, locale testing |
| 15 | [Testing](15-TESTING.md) | Unit tests, UI tests, E2E tests, coverage |
| 16 | [GDPR & Privacy](16-GDPR-PRIVACY.md) | Data lifecycle, rights, zero-collection model |
| 17 | [Observability](17-OBSERVABILITY.md) | Local-only metrics, crash reporting strategy |
| 18 | [DR & Backup](18-DR-BACKUP.md) | RTO/RPO, backup/restore, data recovery |
| 19 | [Traceability](19-TRACEABILITY.md) | Full UDID traceability matrix |

## Ownership

| Role | Who | Access |
|------|-----|--------|
| **Owner** | Sylvain (Macaron Software) | Full CRUD on all docs |
| **Reader** | Public (open-source) | Read-only |

## Standards Referenced

- **OWASP Top 10:2021** + **OWASP LLM Top 10:2025**
- **NIST CSF 2.0** (2024)
- **ISO/IEC 27001:2022** Annex A
- **CIS Controls v8**
- **WCAG 2.2 AA**
- **WAI-ARIA APG Patterns**
- **SOC 2 Type II** Trust Service Criteria
- **SecureByDesign Skill v1.1**
- **Laws of UX** (30 laws)
- **Atomic Design** (atoms → molecules → organisms → templates → pages)
