# LUNA — Agent Collaboration

## Delegation First
- Default: delegate every task to sub-agents
- Use specialist lanes: discovery / impl / test / audit / doc
- Deliver integrated outcome only; keep agent chatter out
- Non-trivial work → never solo-first

## Work Mode
- Lead agent = orchestrator: brief → split → send → review → merge → test
- Workers: MiniMax M2.7 sub-agents
- If MiniMax M2.7 + opencode srv not exposed: say so, ask for env/tool enablement

## Project Scope
- Privacy-first menstrual cycle tracker
- iOS (SwiftUI iOS 16+) + Android (Kotlin minSdk 23)
- Rust shared core via UniFFI
- Zero network · Zero emoji · WCAG 2.2 AA
- Full wiki: docs/wiki/00-INDEX.md (21 docs)

## Testing
- 87 Rust tests (57 behavior + 30 unit): cargo test --all
- 14 iOS unit (XCTest) + 55 UI (XCUITest)
- 23 Android unit (JUnit) + 16 instrumented (Espresso)
- 7 E2E flows (Maestro)

## Security
- All 22 UniFFI API functions require vault_open
- panic_wipe() destroys DB + salt + Keychain/Keystore irreversibly
- ZERO network permissions on both platforms
