# LUNA GDPR & Privacy — Data Lifecycle

> **Scope**: LUNA menstrual cycle tracker — offline-only, zero-network
> **Data Controller**: End user (self-determined, no organizational controller)
> **Data Processor**: None (zero server, zero cloud, zero third-party)
> **Date**: 2025-07-22

---

## Data Classification

| Data Category | GDPR Classification | Examples | Storage |
|---------------|---------------------|----------|---------|
| Menstrual cycle dates | **Art. 9 — Special category (health)** | Period start/end, cycle length | SQLCipher encrypted |
| Flow intensity | Art. 9 — Health | light / medium / heavy / spotting | SQLCipher encrypted |
| Symptoms | Art. 9 — Health | 43 categorized symptoms (cramps, SPM, ovulation, etc.) | zstd compressed → SQLCipher |
| BBT (basal body temperature) | Art. 9 — Health | Daily temperature readings | SQLCipher encrypted |
| LH test results | Art. 9 — Health | positive / negative / peak | SQLCipher encrypted |
| Cervical mucus | Art. 9 — Health | dry / sticky / creamy / watery / egg_white | SQLCipher encrypted |
| Mood / Energy / Sleep | Art. 9 — Health | Scale 1–5 | SQLCipher encrypted |
| Weight | Art. 9 — Health | kg, optional | SQLCipher encrypted |
| Sexual activity | Art. 9 — Health | protected / unprotected / none | SQLCipher encrypted |
| Notes | Personal data | Free-text user notes | SQLCipher encrypted |
| PIN | Credential | 4–8 digit PIN | Argon2id hash only, never stored plaintext |

> **All data is GDPR Article 9 special category (health data)**, requiring explicit consent and heightened protection.

---

## Data Lifecycle

### 1. Collection

| Principle | Implementation |
|-----------|---------------|
| **Lawfulness** (Art. 6) | Consent: user explicitly enters each data point |
| **Explicit consent for Art. 9** | User action = consent (no pre-filled fields, no auto-collection) |
| **Purpose limitation** (Art. 5.1.b) | Menstrual cycle tracking only |
| **Data minimization** (Art. 5.1.c) | All fields optional; user decides what to log |
| **Accuracy** (Art. 5.1.d) | User controls all input; can edit via `log_day()` upsert |
| **No automatic collection** | Zero sensors, zero GPS, zero device fingerprinting, zero usage analytics |

### 2. Storage

| Aspect | Detail |
|--------|--------|
| **Location** | Local device only — app sandbox (iOS) / internal storage (Android) |
| **Encryption** | SQLCipher with AES-256-GCM |
| **Key derivation** | PIN → Argon2id (64MB/3iter/4t) → HKDF-SHA256 sub-keys |
| **Key storage** | iOS Keychain (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`) / Android Keystore (hardware-backed) |
| **Memory protection** | `secrecy::SecretVec` with `zeroize` on drop |
| **Nonce** | CSPRNG unique per encryption operation |
| **BLOB compression** | Symptoms: serde_json → zstd → AES-256-GCM |
| **Storage limitation** (Art. 5.1.e) | Data persists until user deletes — no automatic retention policy (user-controlled) |

### 3. Processing

| Aspect | Detail |
|--------|--------|
| **Where** | On-device only — Rust core library |
| **What** | Cycle prediction (calendar/BBT/LH/combined algorithms), statistics, summaries |
| **Automated decision-making** (Art. 22) | Prediction engine provides estimates only, no automated decisions with legal/significant effects |
| **Profiling** | None — no user profiles, no behavioral analysis, no scoring |
| **Third-party processing** | None — zero server, zero cloud, zero APIs |

### 4. Transfer

| | |
|---|---|
| **Status** | **ZERO TRANSFER** |
| **Mechanism** | No network capability whatsoever |
| **Evidence** | No INTERNET permission (AndroidManifest), no URLSession (iOS), no reqwest/hyper (Rust), no HTTP client |
| **Cross-border transfer** | Impossible — no server, no cloud, no data leaving device |
| **Adequacy decision** | Not applicable — no transfer occurs |

### 5. Deletion

| Method | Scope | API | Status |
|--------|-------|-----|--------|
| **Panic wipe** | All vault data | `panic_wipe()` | ✅ Implemented |
| **Individual record delete** | Single daily log | — | ⚠️ **Gap** — not yet implemented |
| **Account deletion** | N/A (no accounts) | — | N/A |
| **App uninstall** | All data (app sandbox) | OS-level | ✅ OS handles |

### 6. Portability

| Method | Format | API | Status |
|--------|--------|-----|--------|
| Encrypted backup | AES-256-GCM binary blob | `export_encrypted_backup(pin)` | ✅ Implemented |
| CSV export | Plain-text CSV | `export_logs_csv()` | ✅ Implemented |
| Backup import/restore | AES-256-GCM binary blob | `import_encrypted_backup(backup, pin)` | ✅ Implemented (api.rs:275) |

---

## GDPR Rights Mapping

| Right | Article | API / Mechanism | Status |
|-------|---------|-----------------|--------|
| **Right to access** | Art. 15 | `get_log(date)`, `get_logs_range(from, to)`, `get_cycles(limit)` | ✅ OK |
| **Right to rectification** | Art. 16 | `log_day(DailyLog)` — upsert overwrites existing entry | ✅ OK |
| **Right to erasure** | Art. 17 | `panic_wipe()` — deletes all data | ⚠️ Partial — no individual record deletion |
| **Right to restrict processing** | Art. 18 | N/A — user controls all processing by choosing what to log | ✅ OK (by design) |
| **Right to data portability** | Art. 20 | `export_encrypted_backup(pin)`, `export_logs_csv()` | ✅ OK |
| **Right to object** | Art. 21 | N/A — no profiling, no marketing, no automated processing | ✅ N/A |
| **Automated decision-making** | Art. 22 | Predictions are informational only, no legal/significant effects | ✅ OK |
| **Right to lodge complaint** | Art. 77 | User can contact supervisory authority — no LUNA involvement | ✅ N/A |

---

## Data Protection by Design (Art. 25)

| Principle | Implementation |
|-----------|---------------|
| **By design** | Zero network architecture — data cannot leave device by construction |
| **By default** | All tracking fields optional; minimal data logged by default (date only) |
| **Pseudonymization** | N/A — single user, no identifiers transmitted |
| **Encryption** | AES-256-GCM at rest (SQLCipher) + Argon2id KDF |
| **Access control** | PIN-gated vault with hardware key storage |
| **Emergency deletion** | `panic_wipe()` — designed for coercive situations (IPV) |

---

## Data Protection Impact Assessment (DPIA) — Art. 35

| Factor | Assessment |
|--------|-----------|
| **Required?** | Art. 35(3): Processing health data at large scale requires DPIA. LUNA processes locally for single user — arguably below threshold. Conducted proactively. |
| **Nature of processing** | Local-only, user-initiated, single-user |
| **Scope** | Health data (Art. 9) for one individual |
| **Context** | Personal health tracking, no organizational controller |
| **Purpose** | Menstrual cycle tracking and prediction |
| **Necessity & proportionality** | All fields optional, purpose-limited, no excessive collection |
| **Risks to individuals** | |

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Unauthorized access to health data | Low | High | AES-256-GCM + Argon2id + Keychain/Keystore |
| Data breach via network | **Impossible** | — | Zero network capability |
| Coerced access (IPV) | Medium | Critical | `panic_wipe()`, no cloud recovery |
| Device theft (locked) | Low | High | SQLCipher encryption, auto-lock |
| Law enforcement request | Low | High | Local-only, no server to subpoena, panic_wipe available |

| **Overall risk level** | **LOW** — no server, no sharing, no profiling, no cross-border transfer |
| **Residual risk** | Physical device access while unlocked; mitigated by auto-lock + panic_wipe |

---

## Compliance Gaps & Remediation

| Gap | GDPR Article | Priority | Action |
|-----|-------------|----------|--------|
| ~~No individual record deletion~~ ✅ | Art. 17 | — | Already implemented (`delete_log` api.rs:77) |
| ~~No backup import/restore~~ ✅ | Art. 20 | — | Already implemented (`import_encrypted_backup` api.rs:275) |
| No retention policy UI | Art. 5.1.e | **Low** | Optional: auto-delete logs older than N months |
| No explicit consent screen | Art. 7 | **Low** | Consider adding first-launch consent dialog for health data processing |
| No DPO designated | Art. 37 | **N/A** | Not required for single-developer, local-only app |
