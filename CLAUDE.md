# LUNA -- Period Tracker (iOS/Android/Web)

Stack: SwiftUI + Rust core + SvelteKit web app + LifeDS
Extends: life-api for sync/vault

## Build

```bash
cd _FLO && cargo test --workspace
cd _FLO/ios-app && xcodegen generate && xcodebuild build -scheme LunaApp CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
```

## Architecture

- **Local-first:** ALL personal data encrypted locally (SQLCipher). ZERO network for personal data.
- **Web app:** SvelteKit 5 + svelte-i18n + Lucide icons
- **Core:** `luna-core/` Rust crate with UniFFI bridge
- **iOS views:** 13 SwiftUI views
- **Sync:** life-api vault API (optional, encrypted payload)

## Key Files

- `luna-core/src/api.rs` -- 22 UniFFI API functions
- `luna-core/src/engine/` -- domain logic + types
- `luna-core/src/vault/crypto.rs` -- Argon2id + AES-256-GCM
- `ios-app/LunaApp/Views/` -- 13 SwiftUI views
- `ios-app/LunaApp/Web/` -- SvelteKit web app
- `ios-app/LunaApp/Components/` -- DS pebble buttons, cycle-engine.js

## Types

- `Cycle { id, start_date, end_date, symptoms[], length, phase }`
- `Period { id, cycle_id, start_date, flow_level, symptoms[] }`
- `Prediction { id, cycle_day, phase, fertility_window, next_period }`
- `Symptom { id, date, name, severity, notes }`

## Pebble Button Usage

Primary CTAs use PebbleButton shape:
```swift
PebbleButton(brand: LunaBrand.self) {
    Text("Continue").font(DSTypography.headline)
}
.clipShape(UnevenRoundedRectangle(cornerSizes: .init(topLeading: 24, bottomLeading: 28, bottomTrailing: 26, topTrailing: 22)))
```

## Cross-Promotion Rules

| # | Rule |
|---|------|
| 1 | CP cards shown after positive events (streak, milestone, completion) |
| 2 | Never interrupt active flow -- modal or banner after session end |
| 3 | Max 1 CP card per session |
| 4 | CP card has dismiss X -- not auto-dismissed |
| 5 | CP card tracks impressions -- no spam |
| 6 | Empathy-first copy -- not marketing language |
| 7 | CP card uses target app's brand colors + DS components |
| 8 | Privacy-first -- CP card never shares PII between apps |
| 9 | A/B test CP copy via remote config |
| 10 | CP evaluator: `shouldShowCP(sourceApp, targetApp, userProfile) -> bool` |
| 11 | 30-day cooldown per target app after dismiss |
| 12 | Analytics: `cp_impression`, `cp_click`, `cp_dismiss` events |

## Invariants

1. ZERO emoji -- SF Symbols only
2. 44pt touch targets min
3. Local-first encryption -- no personal data network calls
4. Evidence-based thresholds (WHO, ACOG citations)
5. Medical disclaimer on all health-related screens
6. 47 locales, RTL support (ar, fa, he, ur)
7. WCAG 2.2 AA minimum
8. Theme: light / dark / lightContrast / darkContrast

## Forbidden

- Emoji in UI/code
- Network calls for personal data
- `.udl` files (UniFFI proc-macros only)
- Hardcoded strings (i18n only)
- `test.skip()` / `test.fixme()` / `#[ignore]`
- `as any` / `@ts-ignore` / implicit unwrap
- Fake data / mocks / stubs
