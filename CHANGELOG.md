# Changelog

All notable user-facing changes to LUNA are documented here.

## 1.0.0

- Android onboarding parity pass: token-aligned colors, calmer shell, selectable onboarding cards, explicit duration selection state.
- Backup / restore flows wired on iOS and Android to the real encrypted backup APIs.
- Release / CI hardening: stricter checks, pinned actions, production package fixes, release audit step.
- Rust core CRUD expansion: delete APIs for logs / cycles / pregnancy logs.

## 0.1.1

- Android onboarding fixes: real date picker, silent PIN creation, improved first-run flow.
- Android launch / lock fixes: PIN dots, unlock flow, first-run redirect corrections.
- Day-1 cycle handling fix in Rust when first period flow is logged.
- Production hardening for Android backup export using the real stored PIN.

## 0.1.0

- Initial iOS / Android / Rust core release candidate.
- Offline-first encrypted vault with SQLCipher + Argon2id + AES-256-GCM.
- Cycle logging, calendar, insights, encrypted backup export, 40-locale base scaffolding.
