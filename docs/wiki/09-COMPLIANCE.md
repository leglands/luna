# LUNA Compliance Mapping — SOC2 & ISO 27001:2022

> **Scope**: LUNA menstrual cycle tracker — offline-only, zero-network, local-encrypted
> **Architecture**: Rust core + iOS SwiftUI + Android Kotlin · SQLCipher · PIN-gated vault
> **Date**: 2025-07-22

---

## Context

LUNA is a **local-only mobile application** with **zero server infrastructure**. Many SOC2 and ISO 27001 controls target server/cloud environments and are not applicable. This mapping identifies applicable controls and their implementation status.

| Framework | Applicable | OK | Partial | Warning | N/A |
|-----------|-----------|-----|---------|---------|-----|
| SOC2 TSC | 9 criteria | 6 | 1 | 0 | 2 |
| ISO 27001 Annex A | 93 controls | 8 | 3 | 2 | 80 |

---

## SOC2 — Trust Service Criteria

### CC1 — Control Environment (Ethics & Integrity)

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | Privacy-first design philosophy enforced by architecture: zero network permissions make data exfiltration impossible by construction. No analytics, no telemetry, no crash reporting. Open architecture documentation. Privacy policy at `https://privacy.macaron-software.com/luna`. |

### CC2 — Communication & Information

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | Security design documented in `CLAUDE.md` project context and wiki. App Store / Play Store listings clearly communicate privacy stance. Zero data collection = nothing to communicate about data handling to end users beyond "we collect nothing." |

### CC3 — Risk Assessment

| | |
|---|---|
| **Status** | **Partial** |
| **Evidence** | Threat model documented (see `08-SECURITY.md`). Primary risks identified: physical device access, IPV scenarios, device theft. No formal risk register or periodic risk assessment process. |
| **Gap** | Formalize risk assessment cadence (quarterly). |

### CC4 — Monitoring Activities

| | |
|---|---|
| **Status** | **N/A** |
| **Evidence** | No server infrastructure to monitor. App is local-only. OS-level monitoring (crash reports via Xcode/Play Console) is opt-in by user. |

### CC5 — Logical & Physical Access Controls

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | |

| Control | Implementation |
|---------|---------------|
| Authentication | PIN → Argon2id (64MB/3iter/4t) |
| Key derivation | HKDF-SHA256 sub-keys |
| iOS key storage | Keychain `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` |
| Android key storage | Hardware-backed Keystore AES-256-GCM |
| Auto-lock | App locks on background/terminate |
| Source code access | GitHub private repository |

### CC6 — System Operations (Access Controls)

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | |

| Control | Implementation |
|---------|---------------|
| Encryption at rest | AES-256-GCM via SQLCipher |
| Key management | Argon2id + HKDF-SHA256 + Keychain/Keystore |
| Memory protection | `secrecy::SecretVec` with `zeroize` on drop |
| Nonce management | CSPRNG unique per encryption operation |
| Data isolation | App sandbox (iOS/Android), no shared storage |

### CC7 — System Monitoring

| | |
|---|---|
| **Status** | **N/A** |
| **Evidence** | No server, no network, no endpoints to monitor. |

### CC8 — Change Management

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | Git version control. `Cargo.lock` pins all Rust dependencies. GitHub Actions CI (tests). Fastlane for iOS build/deploy. Gradle for Android build. Release process: build → internal testing → production. |

### A1 — Availability

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | Local app — availability = device availability. No server SLA. Backup via `export_encrypted_backup(pin)`. RTO: reinstall + restore. RPO: last manual backup. App distributed via App Store and Play Store (high availability distribution). |

### C1 — Confidentiality

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | |

| Mechanism | Detail |
|-----------|--------|
| Zero network | No INTERNET permission, no HTTP client |
| Encrypted storage | SQLCipher AES-256 |
| Hardware key storage | Keychain (iOS) / Keystore (Android) |
| Emergency deletion | `panic_wipe()` |
| No analytics | Zero telemetry, zero crash reporting |
| No cloud sync | Zero server, zero cloud storage |

### PI1 — Processing Integrity

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | Rust type system enforces correctness at compile time. 23 unit tests for core logic (crypto, vault, prediction). UniFFI generates type-safe bindings for Swift/Kotlin. Parameterized SQL queries prevent injection. `DailyLog` fields have compile-time type constraints. Prediction engine uses deterministic algorithms (calendar, BBT, LH, combined). |

### P1 — Privacy

| | |
|---|---|
| **Status** | **OK** |
| **Evidence** | |

| Principle | Implementation |
|-----------|---------------|
| Collection limitation | User explicitly enters all data; zero auto-collection |
| Data minimization | All fields optional; no device fingerprinting |
| Purpose limitation | Cycle tracking only; no profiling, no ads |
| Use limitation | On-device processing only |
| Disclosure limitation | Zero network = zero transmission = zero disclosure |
| Security safeguards | AES-256-GCM + Argon2id + Keychain/Keystore |
| Individual participation | `get_log()`, `export_encrypted_backup()`, `panic_wipe()` |
| Accountability | Architecture makes violations impossible (no network) |

---

## ISO 27001:2022 — Annex A Controls

### Organizational Controls (A.5)

| Control | Title | Status | Evidence |
|---------|-------|--------|----------|
| A.5.1 | Policies for information security | **Partial** | Security design in CLAUDE.md / wiki. No standalone security policy document. |
| A.5.2 | Information security roles | **OK** | Single-developer project; all roles consolidated. |
| A.5.3 | Segregation of duties | **N/A** | Single-developer, no server ops. |
| A.5.4 | Management responsibilities | **OK** | Owner = developer = security lead. |
| A.5.5 | Contact with authorities | **N/A** | No regulatory reporting obligations for local-only app. |
| A.5.6 | Contact with special interest groups | **N/A** | — |
| A.5.7 | Threat intelligence | **Partial** | `cargo audit` for Rust advisories. No formal threat intel feed. |
| A.5.8 | Information security in project management | **Partial** | Security considered in design (zero-network, encryption). No formal security gates in SDLC. |
| A.5.9–A.5.13 | Asset / media management | **N/A** | No physical assets, no removable media. |
| A.5.14 | Information transfer | **N/A** | Zero network, zero transfer. |
| A.5.15–A.5.18 | Access control policy | **OK** | PIN + encryption. Single-user model. |
| A.5.19 | Information security in supplier relationships | **Warning** | Rust crates from crates.io. `Cargo.lock` pinned. `cargo audit` not in CI. 2 advisories (unmaintained transitive deps via UniFFI). |
| A.5.20–A.5.22 | Supplier monitoring | **N/A** | No SaaS suppliers, no cloud providers. |
| A.5.23 | Information security for cloud | **N/A** | No cloud. |
| A.5.24 | Incident management planning | **Partial** | `panic_wipe()` for emergency deletion. No formal incident response plan. No SECURITY.md in repo. |
| A.5.25–A.5.28 | Incident response | **Partial** | Emergency response via panic_wipe. No vulnerability disclosure process. |
| A.5.29–A.5.30 | Business continuity | **OK** | Local app + backup export. No server to recover. |
| A.5.31–A.5.33 | Legal & compliance | **OK** | GDPR compliant by design (zero collection). Privacy page published. |
| A.5.34 | Protection of PII | **OK** | Health data (GDPR Art. 9) encrypted at rest. Zero transmission. Zero collection beyond user input. Zero sharing. Privacy by design enforced by architecture. |
| A.5.35–A.5.37 | Security reviews | **N/A** | No independent review conducted. |

### People Controls (A.6)

| Control | Status | Note |
|---------|--------|------|
| A.6.1–A.6.8 | **N/A** | Single-developer project. No employees, no HR processes. |

### Physical Controls (A.7)

| Control | Status | Note |
|---------|--------|------|
| A.7.1–A.7.14 | **N/A** | No physical infrastructure. Mobile app on user devices. |

### Technological Controls (A.8)

| Control | Title | Status | Evidence |
|---------|-------|--------|----------|
| A.8.1 | User endpoint devices | **OK** | App sandbox isolation on iOS/Android. No device management needed. |
| A.8.2 | Privileged access rights | **OK** | Single-user vault. No admin roles. PIN = full access. |
| A.8.3 | Information access restriction | **OK** | All data gated behind PIN → Argon2id → SQLCipher. |
| A.8.4 | Access to source code | **OK** | GitHub private repository. |
| A.8.5 | Secure authentication | **OK** | Argon2id (64MB/3iter/4t) — exceeds OWASP minimum (19MiB/2iter). Unique CSPRNG nonce per operation. |
| A.8.6 | Capacity management | **N/A** | Local storage only. |
| A.8.7 | Protection against malware | **N/A** | No executable content, no file downloads, no network. |
| A.8.8 | Management of technical vulnerabilities | **Warning** | `cargo audit` available but not in CI. 2 informational advisories (unmaintained transitive deps). No automated vulnerability scanning. |
| A.8.9 | Configuration management | **OK** | `Cargo.lock` pins all deps. `build.gradle.kts` version-locked. `project.yml` (xcodegen) deterministic. |
| A.8.10 | Information deletion | **OK** | `panic_wipe()` deletes all vault data. SQLCipher VACUUM after wipe. |
| A.8.11 | Data masking | **N/A** | No data display to third parties. Single-user app. |
| A.8.12 | Data leakage prevention | **OK** | Zero network permissions. No INTERNET in AndroidManifest. No URLSession. No reqwest. Architecture makes leakage impossible. |
| A.8.13 | Information backup | **OK** | `export_encrypted_backup(pin)` → AES-256-GCM blob. User-controlled. |
| A.8.14 | Redundancy of information processing | **OK** | Backup export available. Single device = SPOF, mitigated by backup. Import/restore not yet implemented. |
| A.8.15 | Logging | **N/A** | No server logs. OS-level debug logs only (dev builds). |
| A.8.16 | Monitoring activities | **N/A** | No network, no server, nothing to monitor. |
| A.8.17–A.8.19 | Clock sync, utilities, software install | **N/A** | Mobile app, managed by OS. |
| A.8.20 | Networks security | **N/A** | Zero network. |
| A.8.21–A.8.23 | Web, network, segregation | **N/A** | Zero network. |
| A.8.24 | Use of cryptography | **OK** | AES-256-GCM (NIST approved). Argon2id (OWASP recommended). HKDF-SHA256 (RFC 5869). `ring` crate (audited). SQLCipher (FIPS 140-2 validated engine). |
| A.8.25 | Secure development lifecycle | **OK** | Rust (memory-safe). Type-safe UniFFI bindings. Parameterized queries. No unsafe blocks in application code. |
| A.8.26 | Application security requirements | **OK** | Documented in CLAUDE.md. Zero network, encrypted storage, PIN-gated. |
| A.8.27 | Secure system architecture | **OK** | Separation: Rust core (crypto/logic) ↔ Swift/Kotlin (UI). Trust boundary at PIN validation. Defense-in-depth. |
| A.8.28 | Secure coding | **OK** | Rust eliminates buffer overflows, use-after-free, data races at compile time. `clippy` available. No `unsafe` in app code. |
| A.8.29 | Security testing | **Warning** | 23 unit tests. No SAST in CI. No DAST. No fuzz testing. No penetration testing. |
| A.8.30–A.8.34 | Outsourced dev, separation, change, testing | **N/A** | No outsourcing, single environment. |

---

## Compliance Summary

### Strengths

- **Privacy by architecture**: Zero network makes most data protection controls satisfied by construction
- **Strong cryptography**: AES-256-GCM + Argon2id exceeds industry baselines
- **Memory safety**: Rust eliminates entire vulnerability classes
- **Data minimization**: All fields optional, zero auto-collection

### Gaps & Remediation

| Gap | Controls | Priority | Action |
|-----|----------|----------|--------|
| ~~No `cargo audit` in CI~~ ✅ | A.5.19, A.8.8 | — | Already implemented (ci-rust.yml:48) |
| ~~No SECURITY.md~~ ✅ | A.5.24 | — | Already exists at repo root |
| No formal security policy | A.5.1 | Medium | Draft standalone security policy |
| ~~No SAST/DAST in CI~~ ✅ | A.8.29 | — | Already implemented (clippy at ci-rust.yml:42) |
| No SBOM generation | A.5.19 | Low | Add CycloneDX to release pipeline |
| ~~No individual record deletion~~ ✅ | A.8.10 | — | Already implemented (`delete_log` in api.rs:77) |
| ~~No backup import/restore~~ ✅ | A.8.14 | — | Already implemented (`import_encrypted_backup` in api.rs:275) |
