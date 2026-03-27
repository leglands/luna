# LUNA Design Tokens

> Single source of truth for all visual design values across iOS (SwiftUI) and Android (Kotlin / Material3).
>
> Convention: Light / Dark values separated by `/`.

---

## Colors (12 tokens)

| Token | Light | Dark | Usage | iOS | Android |
|-------|-------|------|-------|-----|---------|
| `AppBackground` | `#FAFAFA` | `#0D0A14` | Main app background | `Color("AppBackground")` | `@color/app_background` |
| `LockBackground` | `#0D0A14` | `#0D0A14` | Lock screen (always dark) | `Color("LockBackground")` | `@color/lock_background` |
| `AccentPrimary` | `#C2567A` | `#D66A8C` | Primary actions, selected states, period markers | `Color("AccentPrimary")` | `@color/luna_accent_primary` |
| `AccentSecondary` | `#7C4DFF` | `#B388FF` | Secondary actions, accents | `Color("AccentSecondary")` | `@color/accent_secondary` |
| `TextPrimary` | `#1A1A1A` | `#F5F5F5` | Primary text, headings | `Color.primary` | `@color/text_primary` |
| `TextSecondary` | `#757575` | `#BDBDBD` | Secondary text, captions, placeholders | `Color.secondary` | `@color/text_secondary` |
| `Success` | `#4CAF50` | `#66BB6A` | Positive feedback, save confirmation | `Color("Success")` | `@color/success` |
| `Warning` | `#FF9800` | `#FFA726` | Warnings, attention items | `Color("Warning")` | `@color/warning` |
| `Error` | `#F44336` | `#EF5350` | Errors, destructive actions, alert badge | `Color("Error")` | `@color/error` |
| `Surface` | `#FFFFFF` | `#1A1625` | Cards, sheets, elevated containers | `Color("Surface")` | `@color/surface` |
| `FertileWindow` | `#81C784` | `#A5D6A7` | Fertile window days on calendar | `Color("FertileWindow")` | `@color/fertile_window` |
| `PeriodDay` | `#C2567A` | `#D66A8C` | Period days on calendar | `Color("AccentPrimary")` | `@color/luna_accent_primary` |

### Color Rules

- Dark/Light switches automatically via system preference (`preferredColorScheme(nil)`)
- `LockBackground` is always dark regardless of system theme
- `AccentPrimary` and `PeriodDay` share the same hex values (intentional — brand consistency)
- Minimum contrast ratio: **4.5:1** for normal text, **3:1** for large text (WCAG 2.2 AA)

---

## Spacing (6 tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-xs` | 4pt | Inline icon-to-text gap, chip internal padding |
| `spacing-sm` | 8pt | Intra-group spacing (between related items) |
| `spacing-md` | 12pt | Form field internal padding, list row padding |
| `spacing-base` | 16pt | Section padding, button padding, card insets |
| `spacing-lg` | 24pt | Inter-group spacing (between sections) |
| `spacing-xl` | 32pt | Page margins, major section separators |

### Spacing Rules

- iOS: values in points (pt)
- Android: values in density-independent pixels (dp), same numeric values
- Consistent across both platforms for design parity

---

## Typography

### iOS (Dynamic Type)

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `Title` | SF Pro | 28pt | Bold | Page titles, onboarding headers |
| `Headline` | SF Pro | 17pt | Semibold | Section headers, card titles |
| `Body` | SF Pro | 17pt | Regular | Primary content text |
| `Subheadline` | SF Pro | 15pt | Regular | Secondary content, descriptions |
| `Caption` | SF Pro | 12pt | Regular | Timestamps, helper text |
| `Caption2` | SF Pro | 11pt | Regular | Fine print, version info |

### Android (Material3 Type Scale)

| Style | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| `headlineLarge` | Roboto | 28sp | Bold | Page titles |
| `headlineSmall` | Roboto | 17sp | Medium | Section headers |
| `bodyLarge` | Roboto | 17sp | Regular | Primary content |
| `bodyMedium` | Roboto | 15sp | Regular | Secondary content |
| `labelSmall` | Roboto | 12sp | Regular | Captions |
| `labelSmall` | Roboto | 11sp | Regular | Fine print |

### Typography Rules

- Both platforms use system fonts (SF Pro / Roboto) for native feel
- Dynamic Type (iOS) and font scaling (Android) supported — all sizes are relative
- No custom fonts — reduces bundle size and ensures locale compatibility

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8pt | Small elements: text inputs, inline badges |
| `radius-md` | 12pt | Cards, sheets, section containers |
| `radius-lg` | 16pt | Large containers, modals, bottom sheets |
| `radius-full` | 9999pt | Circular: chips, badges, avatar placeholders, mood circles |

---

## Touch Targets

| Platform | Minimum Size | Standard |
|----------|-------------|----------|
| iOS | **44 × 44 pt** | Apple HIG recommendation |
| Android | **48 × 48 dp** | Material Design guideline |

### Touch Target Rules

- All interactive elements (buttons, chips, toggles, icons) meet minimum size
- PIN digit buttons: 64 × 64 pt/dp (larger for accuracy)
- Spacing between adjacent tap targets: ≥ 8pt to prevent mis-taps

---

## Icons

| Platform | System | Custom | Sizes |
|----------|--------|--------|-------|
| iOS | SF Symbols | — | 20pt (standard), 24pt (large), 28pt (navigation) |
| Android | Material Icons | SVG Feather (`res/drawable/ic_luna_*.xml`) | 20dp (standard), 24dp (large), 28dp (navigation) |

### Icon Rules

- **ZERO emoji in UI** — all icons are vector-based (SF Symbols or SVG)
- 11 custom Feather icons on Android: see `res/drawable/ic_luna_*.xml`
- Icons inherit `TextPrimary` color by default, `AccentPrimary` when active/selected
- Tab bar icons: 24pt, with filled variant for selected state

---

## Shadows & Elevation

| Token | iOS | Android | Usage |
|-------|-----|---------|-------|
| `elevation-none` | No shadow | 0dp | Flat elements |
| `elevation-low` | 2pt blur, 10% black | 2dp | Cards, surface containers |
| `elevation-medium` | 8pt blur, 15% black | 8dp | Bottom sheets, modals |
| `elevation-high` | 16pt blur, 20% black | 16dp | Overlays, feedback toasts |

---

## Animation

| Token | Duration | Curve | Usage |
|-------|----------|-------|-------|
| `duration-fast` | 150ms | ease-out | Toggle states, chip selection |
| `duration-normal` | 250ms | ease-in-out | Sheet presentation, tab transitions |
| `duration-slow` | 400ms | spring(0.6) | Save feedback overlay, onboarding transitions |

### Animation Rules

- All animations respect `@Environment(\.accessibilityReduceMotion)` (iOS) / `Settings.Global.ANIMATOR_DURATION_SCALE` (Android)
- When reduce motion is enabled: skip spring animations, use instant transitions
- Haptic feedback is independent of animation settings
