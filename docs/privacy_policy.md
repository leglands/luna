# LUNA — Privacy Policy (pointer)

**This document is no longer the source of truth.** The published pages are authoritative:

- https://luna.macaron-software.com/en/privacy/ (English)
- https://luna.macaron-software.com/<lang>/privacy/ (66 languages, same texts)

Repository source of truth: `web/src/lib/legal/<lang>.json` (rendered by
`web/scripts/gen-legal.py`, generated at build time). Fixes belong in those
JSON files, never here.

---

## Key facts (kept for memory, aligned with the published pages)

- **Developer**: Macaron Software (SAS MACARON SOFTWARE, Grabels, France).
  Not "Luna Health": that identity never existed (it came from a March 2026
  draft, corrected 2026-10-03).
- **Architecture**: local-first. Data stays on-device in an encrypted database
  (SQLCipher on iOS/Android, AES-256-GCM for the web app). No account, no
  server, no analytics, no third-party trackers.
- **Contact**: privacy@macaron-software.com (privacy), support@macaron-software.com (support).
- **Open source**: MIT / Apache-2.0. Public mirror: github.com/leglands/luna.
- **Audience**: 16 and older (GDPR art. 8 alignment; store content ratings may differ).

## Store privacy declarations (must match reality)

- **HealthKit (iOS)**: optional, opt-in. Read/write menstrual + basal body
  temperature. Declared in the App Store privacy questionnaire (sensitive
  data, on-device).
- **Health Connect (Android)**: optional, opt-in. Same scope once wired
  (see android-app HealthConnectManager).
- **iCloud sync (iOS)**: optional, opt-in, user's own iCloud account only.
- **No data collection**: nothing transmitted to Macaron Software or any third party.
