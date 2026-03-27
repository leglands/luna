# Contributing to LUNA

Thank you for your interest in contributing to LUNA!

## Privacy-First Principle

**The most important rule:** never introduce any code that transmits user data
outside the device without explicit opt-in. All new features must respect:
- Zero network access in the Rust core
- No analytics, telemetry, or crash reporting SDK
- All stored data must go through the encrypted vault

## Areas Needing Help

| Area | Skills needed |
|------|--------------|
| Security audit | Rust, cryptography |
| Accessibility | iOS VoiceOver, Android TalkBack |
| Translations | Any of the 40 supported languages |
| BBT chart | SwiftUI Charts / MPAndroidChart |
| CloudKit sync | Swift, CloudKit |
| Science review | Reproductive medicine, statistics |

## Development Setup

```bash
# Rust toolchain (required)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add aarch64-apple-ios aarch64-apple-ios-sim
rustup target add aarch64-linux-android
cargo install cargo-ndk uniffi-bindgen-cli

# Run all Rust tests
cd luna-core && cargo test

# Run clippy (must pass with -D warnings)
cargo clippy -- -D warnings
```

## Local Presidio git guard

LUNA now ships repo-managed local hooks in `.githooks/` for commit-time checks:

- `pre-commit` scans **staged added lines** for likely secrets / sensitive data
- `commit-msg` scans the **final commit message**
- `post-commit` keeps the existing LUNA reminder/smoke-test behavior

Bootstrap them locally with a supported Python runtime (Presidio supports Python 3.10-3.13):

```bash
./scripts/install_presidio_hooks.sh
```

Notes:

- The hook is **local only**. It does not call any cloud service.
- It uses **Microsoft Presidio Analyzer** pattern recognizers and blocks the commit with actionable output instead of rewriting data.
- Safe local exceptions can be added in `.git/info/presidio-allowlist.regex` (one regex per line, never commit this file).
- To wire the hooks without installing Presidio yet, run `./scripts/install_presidio_hooks.sh --skip-install`.
- To bypass once, use `git commit --no-verify`.

## Translation Contributions

1. Run `python3 scripts/check_i18n.py` to see which keys are missing
2. Edit the relevant `Localizable.xcstrings` (iOS) or `strings.xml` (Android)
3. Run the script again to confirm 100% coverage

## Pull Request Guidelines

- All Rust changes must pass `cargo test` and `cargo clippy -- -D warnings`
- Cryptography changes require a security justification in the PR description
- New UI strings must be added to ALL Tier 1 languages (EN, FR, DE, ES, AR, JA, ZH-Hans, PT-BR)
- Accessibility: all new interactive elements need `accessibilityLabel`

## Security Vulnerabilities

Please **do not** open a public issue for security vulnerabilities.
Email: security@macaron-software.com.

## Code of Conduct

Be kind. This app exists to help people understand their bodies — a topic
that deserves respect and empathy.

## License

By contributing, you agree that your contributions will be dual-licensed
under MIT and Apache 2.0 (see [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE)).
