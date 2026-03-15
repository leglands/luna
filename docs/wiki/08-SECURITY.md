# LUNA Security Audit — SecureByDesign v1.1

> **Scope**: LUNA menstrual cycle tracker — Rust core + iOS SwiftUI + Android Kotlin
> **Architecture**: Zero-network, local-only, PIN-gated encrypted vault
> **Date**: 2025-07-22 · **Auditor**: Internal

---

## Executive Summary

LUNA is an **offline-only** application with **zero network permissions**. This eliminates entire attack surface categories (SSRF, injection via API, session hijacking, MitM). The primary threat model focuses on **physical device access** and **intimate partner violence (IPV)** scenarios.

| Layer | Controls | OK | Partial | Warning | N/A |
|-------|----------|----|---------|---------|-----|
| Foundation | SBD-01 – SBD-03 | 1 | 1 | 0 | 1 |
| Identity | SBD-04 – SBD-06 | 1 | 0 | 0 | 2 |
| Data | SBD-07 – SBD-09 | 3 | 0 | 0 | 0 |
| Resilience | SBD-10 – SBD-13 | 1 | 0 | 0 | 3 |
| Supply Chain | SBD-14 – SBD-19 | 1 | 1 | 2 | 2 |
| Architecture | SBD-20 – SBD-25 | 2 | 2 | 1 | 1 |
| **Total** | **25** | **9** | **4** | **3** | **9** |

---

## Layer 1: Foundation (SBD-01 – SBD-03)

### SBD-01 — Input Validation

| | |
|---|---|
| **Standards** | OWASP ASVS 5.1, NIST SP 800-53 SI-10, CIS v8 16.2 |
| **Status** | **OK** |
| **Evidence** | Rust type system enforces validation at compile time. `DailyLog` fields use constrained types: `mood: Option<u8>` (1–5), `energy: Option<u8>` (1–5), `sleep_quality: Option<u8>` (1–5), `weight_kg: Option<f64>`, `bbt: Option<f64>`. Symptoms are `Vec<String>` matched against 43 known constants. Enum-like fields (`flow`, `cervical_mucus`, `lh_test`, `sexual_activity`) validated at API boundary. No SQL injection risk — SQLCipher uses parameterized queries exclusively. |
| **Fix** | None required. |

### SBD-02 — Output Encoding

| | |
|---|---|
| **Standards** | OWASP ASVS 5.3, CWE-79 |
| **Status** | **N/A** |
| **Evidence** | No web views, no HTML rendering, no server-side output. iOS SwiftUI and Android Views handle output encoding natively. No user-generated content rendered as markup. |

### SBD-03 — Authentication

| | |
|---|---|
| **Standards** | OWASP ASVS 2.x, NIST SP 800-63B, ISO 27001 A.8.5 |
| **Status** | **Partial** |
| **Evidence** | PIN-based authentication via `LunaEngine::open_vault(db_path, pin)`. PIN is processed through Argon2id (64 MB memory, 3 iterations, 4 threads) to derive encryption key. iOS stores derived material in Keychain (`kSecAttrAccessibleWhenUnlockedThisDeviceOnly`). Android uses hardware-backed Keystore AES-256-GCM. No biometric auth yet. |
| **Fix** | Add biometric authentication (FaceID / fingerprint) as optional second factor. Backlog: medium priority. |

---

## Layer 2: Identity (SBD-04 – SBD-06)

### SBD-04 — Session Management

| | |
|---|---|
| **Standards** | OWASP ASVS 3.x, NIST SP 800-63B §7 |
| **Status** | **N/A** |
| **Evidence** | No network sessions. `LunaEngine` instance lives in-process memory. Vault locks when app terminates or is backgrounded (iOS `scenePhase`, Android `onPause`). No session tokens, no cookies. |

### SBD-05 — Access Control

| | |
|---|---|
| **Standards** | OWASP ASVS 4.x, NIST SP 800-53 AC-3, ISO 27001 A.8.3 |
| **Status** | **OK** |
| **Evidence** | Single-user model. All data access gated behind PIN → Argon2id → SQLCipher decryption. No roles, no RBAC needed. Trust boundary: PIN entry → vault unlocked → full data access. No partial access model. |

### SBD-06 — Least Privilege

| | |
|---|---|
| **Standards** | NIST SP 800-53 AC-6, CIS v8 6.8 |
| **Status** | **N/A** |
| **Evidence** | Zero Android permissions (no INTERNET, no READ/WRITE_MENSTRUATION, no HealthConnect). iOS: no entitlements beyond app sandbox. No file system access outside app container. No background execution. |

---

## Layer 3: Data (SBD-07 – SBD-09)

### SBD-07 — Cryptographic Practices

| | |
|---|---|
| **Standards** | OWASP ASVS 6.x, NIST SP 800-175B, ISO 27001 A.8.24 |
| **Status** | **OK** |
| **Evidence** | |

| Component | Implementation |
|-----------|---------------|
| KDF | Argon2id — 64 MB memory, 3 iterations, 4 threads |
| Encryption | AES-256-GCM via `ring` crate |
| Key derivation | HKDF-SHA256 for sub-keys |
| Nonce | CSPRNG unique per encryption op |
| DB encryption | SQLCipher (bundled, vendored OpenSSL) |
| Key zeroization | `secrecy::SecretVec` with `zeroize` trait |
| BLOB compression | zstd → then AES-256-GCM encrypt |
| iOS key storage | Keychain `kSecAttrAccessibleWhenUnlockedThisDeviceOnly` |
| Android key storage | Hardware-backed Keystore AES-256-GCM |

### SBD-08 — Secrets Management

| | |
|---|---|
| **Standards** | OWASP ASVS 6.4, CIS v8 16.6, NIST SP 800-57 |
| **Status** | **OK** |
| **Evidence** | No API keys, no tokens, no server credentials. Only secret: user PIN, processed through Argon2id and never stored in plaintext. Derived key material in Keychain/Keystore only. `secrecy::SecretVec` ensures memory zeroization on drop. No secrets in source code. Android release keystore password in `key.properties` (gitignored). |

### SBD-09 — Data Minimization

| | |
|---|---|
| **Standards** | GDPR Art. 5(1)(c), ISO 27701 A.7.4, NIST Privacy Framework |
| **Status** | **OK** |
| **Evidence** | All data fields are user-entered and optional (mood, energy, BBT, weight, etc.). Zero automatic data collection. Zero telemetry. Zero analytics. Zero crash reporting. No device fingerprinting. No usage tracking. App collects only what user explicitly logs. |

---

## Layer 4: Resilience (SBD-10 – SBD-13)

### SBD-10 — Logging & Monitoring

| | |
|---|---|
| **Standards** | OWASP ASVS 7.x, NIST SP 800-92, ISO 27001 A.8.15 |
| **Status** | **N/A** |
| **Evidence** | No server = no centralized logging. iOS/Android OS-level logs only (Xcode console, `logcat`). No security event logging to persistent storage. Acceptable for offline-only app — no audit trail needed for compliance since no server-side processing. |

### SBD-11 — Rate Limiting

| | |
|---|---|
| **Standards** | OWASP ASVS 11.1, CWE-307 |
| **Status** | **N/A** |
| **Evidence** | No network endpoints to rate-limit. PIN brute-force mitigated by Argon2id cost (64 MB / 3 iter = ~1s per attempt on modern hardware). iOS Keychain and Android Keystore provide additional OS-level protections against rapid authentication attempts. |

### SBD-12 — SSRF Prevention

| | |
|---|---|
| **Standards** | OWASP ASVS 12.6, CWE-918 |
| **Status** | **N/A** |
| **Evidence** | Zero network capability. No HTTP client, no URLSession, no reqwest, no socket. AndroidManifest has no INTERNET permission. Impossible to perform SSRF. |

### SBD-13 — Error Handling

| | |
|---|---|
| **Standards** | OWASP ASVS 7.4, CWE-209, NIST SP 800-53 SI-11 |
| **Status** | **OK** |
| **Evidence** | `LunaError` enum with 8 typed variants — no stack traces or internal state exposed to UI. Rust's `Result<T, LunaError>` enforces exhaustive error handling. UniFFI bridges errors as typed exceptions to Swift/Kotlin. zstd decompression uses `unwrap_or_default()` fallback for backward compatibility. No sensitive data in error messages. |

---

## Layer 5: Supply Chain (SBD-14 – SBD-19)

### SBD-14 — Dependency Management

| | |
|---|---|
| **Standards** | OWASP ASVS 14.2, CIS v8 16.4, NIST SP 800-53 SA-12 |
| **Status** | **Warning** |
| **Evidence** | `Cargo.lock` pinned. `cargo audit` reports 2 advisories: |

| Crate | Advisory | Severity | Source | Impact |
|-------|----------|----------|--------|--------|
| `bincode` 1.3.3 | RUSTSEC-2025-0141 | Informational (unmaintained) | Transitive via UniFFI 0.28 | No security vuln, crate is unmaintained |
| `paste` 1.0.15 | RUSTSEC-2024-0436 | Informational (unmaintained) | Transitive via UniFFI 0.28 | No security vuln, proc-macro, compile-time only |

| **Fix** | Monitor UniFFI releases for updated transitive deps. Neither advisory represents a security vulnerability. Add `cargo audit` to CI pipeline. |

### SBD-15 — CI/CD Security

| | |
|---|---|
| **Standards** | OWASP CI/CD Top 10, CIS v8 16.7, NIST SP 800-204C |
| **Status** | **Warning** |
| **Evidence** | GitHub Actions used for CI. Workflows **not pinned to SHA** — uses tag-based references. No SAST/DAST in pipeline. No signed commits enforced. No branch protection rules verified. |
| **Fix** | Pin all GitHub Actions to SHA. Add `cargo audit` step. Add `cargo clippy` as gate. Consider `cargo-deny` for license + advisory checks. |

### SBD-16 — SBOM (Software Bill of Materials)

| | |
|---|---|
| **Standards** | NTIA SBOM Minimum Elements, NIST SP 800-218, EO 14028 |
| **Status** | **Partial** |
| **Evidence** | `Cargo.lock` provides exact dependency graph for Rust. `build.gradle.kts` for Android. No formal SBOM generation (CycloneDX / SPDX). |
| **Fix** | Add `cargo sbom` or `cargo cyclonedx` to CI. Generate SBOM artifact per release. |

### SBD-17 — Container Security

| | |
|---|---|
| **Standards** | CIS Docker Benchmark, NIST SP 800-190 |
| **Status** | **N/A** |
| **Evidence** | No containers. No Docker. No server infrastructure. Mobile app only. |

### SBD-18 — Infrastructure as Code Security

| | |
|---|---|
| **Standards** | CIS v8 4.1, NIST SP 800-53 CM-2 |
| **Status** | **N/A** |
| **Evidence** | No infrastructure to manage. No cloud, no Terraform, no Kubernetes. |

### SBD-19 — LLM / AI Security

| | |
|---|---|
| **Standards** | OWASP LLM Top 10, NIST AI RMF |
| **Status** | **OK** |
| **Evidence** | No LLM, no AI, no ML in LUNA. Prediction engine uses deterministic calendar/BBT/LH algorithms. No model inference, no prompt injection surface, no training data. |

---

## Layer 6: Architecture (SBD-20 – SBD-25)

### SBD-20 — Network Security

| | |
|---|---|
| **Standards** | OWASP ASVS 9.x, NIST SP 800-52, ISO 27001 A.8.20 |
| **Status** | **N/A** |
| **Evidence** | Zero network. No TLS, no certificates, no DNS. AndroidManifest has no INTERNET permission. iOS has no network entitlements. No URLSession, no reqwest, no sockets. |

### SBD-21 — Secure Design Principles

| | |
|---|---|
| **Standards** | OWASP ASVS 1.x, NIST SP 800-160, ISO 27001 A.8.25 |
| **Status** | **OK** |
| **Evidence** | Defense-in-depth: PIN → Argon2id → HKDF → AES-256-GCM → SQLCipher. Fail-secure: vault stays locked on wrong PIN. Least privilege: zero OS permissions. Separation of concerns: Rust core (logic/crypto) ↔ Swift/Kotlin (UI only). Privacy by design: zero network eliminates data exfiltration by construction. |

### SBD-22 — Security Governance

| | |
|---|---|
| **Standards** | ISO 27001 A.5.1–A.5.4, NIST CSF GV |
| **Status** | **Partial** |
| **Evidence** | Security design documented in project context (CLAUDE.md). No formal security policy document. No regular security review cadence. Single-developer project — governance is lightweight by necessity. |
| **Fix** | Formalize security policy. Schedule quarterly dependency review. Document threat model updates. |

### SBD-23 — Incident Response

| | |
|---|---|
| **Standards** | ISO 27001 A.5.24–A.5.28, NIST SP 800-61 |
| **Status** | **Partial** |
| **Evidence** | `panic_wipe()` provides emergency data destruction — designed for IPV scenarios. No formal incident response plan for vulnerability disclosure. No security contact published. |
| **Fix** | Add SECURITY.md to repo with vulnerability disclosure process. Publish security contact. |

### SBD-24 — Availability

| | |
|---|---|
| **Standards** | ISO 27001 A.8.14, NIST SP 800-53 CP-9 |
| **Status** | **OK** |
| **Evidence** | Local-only app — availability depends on device, not server. `export_encrypted_backup(pin)` provides user-controlled backup. No SLA needed. RTO: reinstall app + restore backup. RPO: last manual backup. |

### SBD-25 — Security Testing

| | |
|---|---|
| **Standards** | OWASP ASVS 14.x, NIST SP 800-53 SA-11, ISO 27001 A.8.29 |
| **Status** | **Warning** |
| **Evidence** | 23 Rust unit tests covering crypto, vault operations, prediction engine. No SAST (clippy in CI). No DAST. No fuzz testing. No penetration testing. |
| **Fix** | Add `cargo clippy` + `cargo audit` to CI. Add fuzz testing for crypto routines (`cargo-fuzz`). Consider `cargo-careful` for UB detection. |

---

## Threat Model

### Adversaries

| Adversary | Capability | Motivation |
|-----------|-----------|------------|
| **Physical device access** | Unlocked device, USB debug | Data theft, surveillance |
| **Shoulder surfing** | Visual observation | Curiosity, IPV |
| **Intimate partner violence** | Full device access, coercion | Reproductive coercion, control |
| **Device theft** | Physical possession | Data theft, extortion |
| **Forensic analysis** | Disk imaging, memory dump | Law enforcement, adversarial |

### Assets

| Asset | Sensitivity | Classification |
|-------|------------|----------------|
| Menstrual cycle dates | High | GDPR Art. 9 special category (health) |
| Pregnancy indicators (LH, BBT) | Critical | Health data, reproductive status |
| Symptoms & mood | Medium | Health data |
| PIN | Critical | Authentication credential |
| Derived encryption key | Critical | Cryptographic material |

### Trust Boundaries

```
┌─────────────────────────────────────────────┐
│  UNTRUSTED: Device UI                       │
│  ┌───────────────────────────────────────┐  │
│  │  PIN Entry (LockView / LockActivity)  │  │
│  └──────────────┬────────────────────────┘  │
│                 │ PIN                        │
│  ┌──────────────▼────────────────────────┐  │
│  │  TRUST BOUNDARY: Argon2id + Keychain  │  │
│  └──────────────┬────────────────────────┘  │
│                 │ Derived Key                │
│  ┌──────────────▼────────────────────────┐  │
│  │  TRUSTED: LunaEngine (Rust)           │  │
│  │  ┌────────────────────────────────┐   │  │
│  │  │  SQLCipher Encrypted Database  │   │  │
│  │  └────────────────────────────────┘   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Mitigations

| Threat | Mitigation | Effectiveness |
|--------|-----------|---------------|
| PIN brute-force | Argon2id (64MB/3iter) ≈ 1s/attempt | High — ~31.7 years for 6-digit PIN exhaustion |
| Coerced unlock (IPV) | `panic_wipe()` — destroys all data | High — plausible deniability |
| Device theft (locked) | SQLCipher + Keychain/Keystore | High — data encrypted at rest |
| Device theft (unlocked) | App locks on background | Medium — depends on timing |
| Memory dump | `secrecy::SecretVec` + `zeroize` | Medium — keys zeroed on drop |
| Forensic disk analysis | SQLCipher AES-256 | High — no plaintext on disk |
| Shoulder surfing | PIN-gated, no auto-login | Medium — user must be aware |

---

## Remediation Roadmap

| Priority | Action | Control | Effort |
|----------|--------|---------|--------|
| **High** | Pin GitHub Actions to SHA | SBD-15 | 1h |
| **High** | Add `cargo audit` to CI | SBD-14, SBD-25 | 1h |
| **High** | Add `cargo clippy` gate to CI | SBD-25 | 1h |
| **Medium** | Add SECURITY.md with disclosure process | SBD-23 | 2h |
| **Medium** | Add biometric auth (FaceID/fingerprint) | SBD-03 | 1–2 days |
| **Medium** | Generate SBOM per release | SBD-16 | 2h |
| **Low** | Fuzz testing for crypto (`cargo-fuzz`) | SBD-25 | 1 day |
| **Low** | Formalize security review cadence | SBD-22 | 2h |
