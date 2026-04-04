# LUNA — Period Tracker (iOS/Android/Web)

Stack: SwiftUI + Rust core + SvelteKit + LifeDS | Extends: life-api (sync/vault)

## Build
```bash
cd _FLO && cargo test --workspace
cd _FLO/ios-app && xcodegen generate && xcodebuild build -scheme LunaApp CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
```

## Architecture
Local-first: ALL personal data encrypted (SQLCipher). ZERO network for personal data.
Web: SvelteKit 5 + svelte-i18n + Lucide | Core: `luna-core/` Rust + UniFFI | iOS: 13 SwiftUI views
Sync: life-api vault API (optional, encrypted payload)

## Key Files
`luna-core/src/api.rs` — 22 UniFFI fns
`luna-core/src/engine/` — domain logic + types
`luna-core/src/vault/crypto.rs` — Argon2id + AES-256-GCM
`ios-app/LunaApp/Views/` — 13 SwiftUI views
`ios-app/LunaApp/Components/` — DS pebble buttons, cycle-engine.js

## Types
`Cycle { id, start_date, end_date, symptoms[], length, phase }`
`Period { id, cycle_id, start_date, flow_level, symptoms[] }`
`Prediction { id, cycle_day, phase, fertility_window, next_period }`
`Symptom { id, date, name, severity, notes }`

## PebbleButton
```swift
PebbleButton(brand: LunaBrand.self) { Text("Continue").font(DSTypography.headline) }
  .clipShape(UnevenRoundedRectangle(cornerSizes: .init(topLeading: 24, bottomLeading: 28, bottomTrailing: 26, topTrailing: 22)))
```

## Invariants
1. ZERO emoji (SF Symbols only) | 44pt touch min
2. Local-first — no personal data network calls
3. Evidence-based thresholds (WHO, ACOG citations)
4. Medical disclaimer on all health screens
5. 47 locales, RTL (ar fa he ur) | WCAG 2.2 AA
6. 4 themes: light/dark/lightContrast/darkContrast

## Forbidden
Emoji | network personal data | `.udl` files | hardcoded strings | `test.skip/fixme/#[ignore]` | `as any/@ts-ignore` | fake data/mocks

## CP Rules (shared ecosystem)
Post-positive events only | max 1/session | 30d cooldown/dismiss | empathy copy | no PII sharing
Analytics: `cp_impression` `cp_click` `cp_dismiss`
