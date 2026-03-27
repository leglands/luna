# LUNA — Key Decisions

## Crypto: Argon2id over scrypt/bcrypt
Argon2id winner of Password Hashing Competition 2015. Parameters: 64MB/3iter/4t chosen for mobile (iOS/Android mid-range). Balances resistance vs battery.

## SQLCipher bundled (not system)
Avoids OS-level SQLCipher version fragmentation. Vendored openssl ensures consistent crypto behavior across all devices. Trade-off: larger binary, but acceptable for privacy guarantee.

## UniFFI proc-macros (no .udl)
Simpler than .udl file + codegen. Proc-macro generates FFI at compile time. Matches UniFFI 0.28 capability.

## ZERO network from day 1
Not added later as "feature". ATS (iOS) + networkSecurityConfig (Android) physically block all connections. Rust Cargo.toml has zero networking crates. Cannot be bypassed by future code changes.

## panic_wipe = irrecoverable
Deliberate design. DB file deletion + salt deletion + Keychain/Keystore wipe. No recovery path. User must re-set PIN and start fresh. Protects against coercion/physical threat.

## Encrypted backup format
AES-256-GCM over plaintext SQLite. Backup = opaque blob. Cloud provider (iCloud/Play Games) cannot read Luna data. Key derived from user PIN via HKDF.

## iOS Keychain: ThisDeviceOnly
Keychain entries do not sync to other devices or backup. Protects key material if device is restored to new device.

## Android Keystore: hardware-backed when available
AES-256-GCM key generated in secure hardware (Titan M / Secure World). Falls back to software if hardware unavailable (same crypto, weaker protection).

## Calm Mode
Predictions hidden in Calm Mode. Addresses empathic UX concern: users experiencing loss/trauma may find prediction UI distressing. Respects dignity over feature completeness.

## 43 symptoms (not fewer)
Competitors use 5-10. LUNA uses 43 across 6 categories. Hick's law: 5 categories reduces choice overload. Each category max 8-10 options. Balance between comprehensiveness and cognitive load.
