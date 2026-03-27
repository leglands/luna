# LUNA DR & Backup — RTO/RPO

> **Scope**: LUNA menstrual cycle tracker — local-only, zero-server architecture
> **Architecture**: Rust core + iOS SwiftUI + Android Kotlin · SQLCipher encrypted vault
> **Date**: 2025-07-22

---

## Architecture Context

LUNA has **zero server infrastructure**. All data lives on the user's device in an encrypted SQLCipher database. This fundamentally changes DR/backup requirements:

- **No server failover** needed
- **No database replication** needed
- **No load balancer** or multi-region concerns
- **Single point of failure**: the user's device

---

## RTO / RPO

| Metric | Value | Notes |
|--------|-------|-------|
| **RTO** (Recovery Time Objective) | **~5 minutes** | Reinstall app from App Store / Play Store + restore backup |
| **RPO** (Recovery Point Objective) | **Last manual backup** | User-controlled; no automatic backup |
| **MTTR** (Mean Time To Repair) | **~5 minutes** | App reinstall + PIN + backup restore |
| **Availability target** | **99.9%** | Limited by device availability, not server uptime |

> **Key constraint**: RPO depends entirely on user discipline. If user never exports a backup, RPO = all data since install.

---

## Backup Mechanism

### Current Implementation

| Component | Detail |
|-----------|--------|
| **API** | `export_encrypted_backup(pin) → Vec<u8>` |
| **Encryption** | AES-256-GCM with key derived from user PIN via Argon2id |
| **Format** | Encrypted binary blob (not human-readable) |
| **Contents** | Full vault: all daily logs, cycles, settings |
| **Size** | Proportional to data volume; compressed with zstd before encryption |
| **Storage location** | User chooses (Files app, AirDrop, USB, etc.) |
| **Frequency** | Manual — user-initiated only |
| **Verification** | No integrity check on export (gap) |

### Backup Flow

```
User triggers export
        │
        ▼
LunaEngine::export_encrypted_backup(pin)
        │
        ├── Read all data from SQLCipher
        ├── Serialize (serde)
        ├── Compress (zstd)
        ├── Encrypt (AES-256-GCM, key from Argon2id(pin))
        │
        ▼
  Encrypted blob → user saves to chosen location
```

---

## Restore Mechanism

### Current Status: ⚠️ PARTIAL (API exists, UI not implemented)

| Component | Status |
|-----------|--------|
| `import_backup(data, pin)` | ✅ Implemented (api.rs:275) |
| iOS restore UI | **Gap** — no file picker for backup import |
| Android restore UI | **Gap** — no file picker for backup import |
| Backup format versioning | ⚠️ Version 1 exists, no forward compatibility plan |

### Restore Flow

```
User selects backup file
        │
        ▼
import_encrypted_backup(encrypted_blob, pin)
        │
        ├── Extract salt from first 16 bytes
        ├── Derive key via Argon2id(pin, salt)
        ├── Decrypt (AES-256-GCM)
        ├── Decompress (zstd)
        ├── Deserialize (serde JSON)
        ├── Validate version (must be 1)
        ├── Upsert cycles and logs (merge by date/id)
        │
        ▼
  Vault restored → returns count of restored records
```

---

## Disaster Scenarios

| Scenario | Impact | Recovery | Data Loss |
|----------|--------|----------|-----------|
| **App crash** | None | Relaunch app | None — SQLCipher handles WAL recovery |
| **App uninstall (accidental)** | Data deleted | Reinstall + restore backup | Since last backup |
| **Device loss / theft** | Data inaccessible | New device + restore backup | Since last backup |
| **Device failure (hardware)** | Data lost | New device + restore backup | Since last backup |
| **PIN forgotten** | Vault locked permanently | No recovery possible | All data (by design) |
| **Device upgrade** | Data migration needed | Backup → transfer → restore (planned) | None if backup current |
| **OS upgrade** | Usually preserved | App sandbox preserved by OS | None |
| **Corrupt database** | Data inaccessible | Restore from backup | Since last backup |
| **Panic wipe (intentional)** | All data destroyed | Restore from backup (if exists) | Since last backup |
| **Panic wipe (coerced/IPV)** | All data destroyed | By design — no recovery | All data (intentional) |

---

## Risk Analysis

### Single Point of Failure

```
┌──────────────────────────────┐
│        User's Device         │
│  ┌────────────────────────┐  │
│  │   App Sandbox          │  │
│  │  ┌──────────────────┐  │  │
│  │  │ SQLCipher DB     │  │  │  ← SINGLE COPY
│  │  │ (encrypted)      │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
                │
                ▼ (manual export only)
┌──────────────────────────────┐
│   Backup (user-managed)      │
│   Location: Files / USB /    │
│   cloud (user's choice)      │
└──────────────────────────────┘
```

### Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| No backup ever created | **High** | **Critical** | Add backup reminder notifications |
| Backup outdated (>30 days) | **High** | **High** | Add age-based backup reminder |
| PIN forgotten, no backup | **Medium** | **Critical** | None by design (security trade-off) |
| Device theft, no backup | **Low** | **Critical** | Encourage regular backups |
| Corrupt backup file | **Low** | **High** | Add integrity verification (HMAC) |
| Backup PIN forgotten | **Medium** | **Critical** | Same PIN as vault — inherent risk |

---

## Failover & Redundancy

| Aspect | Status | Notes |
|--------|--------|-------|
| **Server failover** | N/A | No server |
| **Database replication** | N/A | Local-only |
| **Multi-device sync** | Not implemented | Would require network (conflicts with privacy model) |
| **Cloud backup** | Not implemented | Would require network (user could manually save to iCloud/GDrive) |
| **Local redundancy** | Not implemented | Could create secondary encrypted copy on device |

---

## Gaps & Remediation

| Gap | Priority | Effort | Description |
|-----|----------|--------|-------------|
| ~~**No restore API**~~ ✅ | — | — | Already implemented at api.rs:275 |
| **No restore UI** | **High** | 2 days | File picker + restore flow in iOS/Android |
| **No backup versioning** | **Medium** | 1 day | Add version header to backup format for forward compatibility |
| **No backup reminders** | **Medium** | 1 day | Local notification if no backup in N days |
| **No backup integrity check** | **Medium** | 0.5 day | HMAC or checksum in backup blob |
| **No individual record restore** | **Low** | 2 days | Merge strategy for partial restore |
| **No automatic backup** | **Low** | 1 day | Auto-export to app sandbox on each log (recovery copy) |

---

## Comparison with Server-Based Apps

| Aspect | Server-based (Flo, Clue) | **LUNA** |
|--------|--------------------------|----------|
| Data location | Cloud servers | **Device only** |
| Backup | Automatic (server-side) | **Manual export** |
| Device loss recovery | Login on new device | **Backup restore only** |
| Server outage impact | App unusable | **N/A — always works** |
| Data breach risk | Server compromise | **Device theft only** |
| Subpoena risk | Server data accessible | **No server to subpoena** |
| Multi-device | Yes (cloud sync) | **No** |
| Privacy | Data on third-party servers | **Zero exposure** |

> **Trade-off**: LUNA trades convenience (auto-backup, multi-device) for privacy (zero server, zero exposure). The user accepts responsibility for backup management in exchange for complete data sovereignty.

---

## Operational Procedures

### Backup Checklist (User)

1. Open LUNA → Settings → Export Backup
2. Enter PIN to authorize
3. Save encrypted file to secure location (not shared storage)
4. Verify file was saved (check file size > 0)
5. Recommended frequency: weekly or after significant data entry

### Restore Checklist (Planned)

1. Install LUNA on new/reset device
2. Skip onboarding → choose "Restore from Backup"
3. Select backup file
4. Enter original PIN
5. Verify data integrity post-restore
6. Set new PIN if desired (`change_pin()`)

### Emergency Deletion (IPV)

1. Open LUNA → triple-tap panic icon (or designated gesture)
2. `panic_wipe()` executes immediately
3. All vault data destroyed — SQLCipher VACUUM
4. App returns to onboarding state
5. **No recovery possible** — this is intentional
