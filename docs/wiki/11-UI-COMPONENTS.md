# LUNA UI Components — Atomic Design

> Reference: [Component Gallery](https://component.gallery) · [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
>
> Platforms: iOS (SwiftUI) · Android (Kotlin Views / Material3)

## Rules

- **ZERO emoji anywhere in UI** — use SF Symbols (iOS) or Material Icons + SVG Feather (Android)
- All touch targets ≥ 44pt (iOS) / ≥ 48dp (Android) per Fitts's Law
- Dark/Light auto via system preference (`preferredColorScheme(nil)` / `AppCompatDelegate`)
- Calm Mode hides prediction-related components

---

## Atoms (10)

| Component | Platform | Implementation | ARIA Pattern | Design Tokens |
|-----------|----------|---------------|--------------|---------------|
| **Button** | Both | `Button` (iOS) · `MaterialButton` (Android) | [button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | `AccentPrimary`, `BorderRadius.medium`, `Spacing.16` padding |
| **Icon** | Both | SF Symbols (iOS) · Material Icons + SVG Feather (Android) | — | Size: 20pt standard, 24pt large. **NO emoji.** |
| **Text / Label** | Both | `Text` (iOS) · `TextView` (Android) | — | `TextPrimary`, `TextSecondary`, system typography scale |
| **Badge** | Both | Custom `Circle` overlay (iOS) · `BadgeDrawable` (Android) | — | `Error` color, 8pt diameter, `BorderRadius.full` |
| **Chip / Tag** | Both | Custom `Chip` view (iOS) · `Chip` (Android Material3) | [checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | `Surface`, `AccentPrimary` selected, `BorderRadius.full`, min 44pt tap |
| **Toggle / Switch** | Both | `Toggle` (iOS) · `SwitchMaterial` (Android) | [switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | `AccentPrimary` on-state, `Surface` track |
| **Text Input** | Both | `TextField` (iOS) · `TextInputLayout` (Android) | — | `Surface` background, `BorderRadius.small`, `Spacing.12` padding |
| **Spinner / Loader** | Both | `ProgressView` (iOS) · `CircularProgressIndicator` (Android) | [alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | `AccentPrimary`, 32pt diameter |
| **Separator** | Both | `Divider` (iOS) · `MaterialDivider` (Android) | — | `TextSecondary` @ 20% opacity, 1pt height |
| **Circle Indicator** | Both | Custom `Circle` view (iOS) · custom `View` (Android) | — | Configurable fill color, 12-16pt diameter |

---

## Molecules (7)

| Component | Platform | Implementation | ARIA Pattern | Design Tokens | Notes |
|-----------|----------|---------------|--------------|---------------|-------|
| **Mood Picker** | Both | `MoodPickerView` (iOS) · `MoodPickerView` (Android) | [radio-group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | 5 circles, `AccentPrimary` selected, `Spacing.8` gap | Circles labeled 1-5 with text labels ("Very low" → "Very good"). **NO emoji.** |
| **Flow Picker** | Both | `FlowPickerView` (iOS) · `FlowPickerView` (Android) | [radio-group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | `PeriodDay` active, `Surface` inactive | 4 options: light, medium, heavy, spotting |
| **Symptom Category Group** | Both | `DisclosureGroup` (iOS) · expandable `LinearLayout` (Android) | [disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | `Surface` container, `Spacing.8` chip gap | 5 categories, each expands to show 6-10 symptom chips |
| **Week Date Strip** | Both | `WeekStripView` (iOS) · `WeekStripView` (Android) | — | `AccentPrimary` today, `Spacing.4` gap | Horizontal scrollable 7-day strip with day labels |
| **Progress Bar** | Both | `ProgressView` (iOS) · `LinearProgressIndicator` (Android) | [meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) | `AccentPrimary` fill, `Surface` track, `BorderRadius.full` | Used in onboarding wizard |
| **Annotation Bubble** | Both | — | [tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) | `Surface`, `BorderRadius.small`, shadow | 🔲 Planned — contextual info overlay for calendar events |
| **Skeleton Block** | Both | — | — | `Surface` @ 60% opacity, `BorderRadius.medium` | 🔲 Planned — loading placeholder for data-heavy views |

---

## Organisms (7)

| Component | Platform | Implementation | ARIA Pattern | Design Tokens | Notes |
|-----------|----------|---------------|--------------|---------------|-------|
| **Donut Chart** | Both | `DonutChartView` (iOS) · `DonutChartView` (Android) | [meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) | `AccentPrimary`, `FertileWindow`, `PeriodDay` segments | Cycle phase visualization. Needs `accessibilityValue` (⚠️). |
| **Calendar Grid** | Both | `CalendarView` (iOS) · `CalendarView` (Android) | [grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) | `PeriodDay` dots, `FertileWindow` dots, `Surface` cells | Month grid with colored day indicators |
| **Log Form** | Both | `LogSheetView` (iOS) · `LogBottomSheet` (Android) | [dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | All form tokens, `Spacing.16` field gap | Contains: Flow Picker, Symptom Groups, Mood, BBT, etc. |
| **Settings List** | Both | `SettingsView` (iOS) · `SettingsActivity` (Android) | [listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | `Surface` rows, `Spacing.12` padding | Grouped sections: Account, Tracking, Privacy, About |
| **Insights Stats** | Both | `InsightsView` (iOS) · `InsightsView` (Android) | — | `Surface` cards, `AccentPrimary` highlights | Cycle averages, symptom frequency, trend summary |
| **Tab Bar** | Both | `TabView` (iOS) · `BottomNavigationView` (Android) | [tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | `AccentPrimary` selected, `TextSecondary` unselected | 4 tabs: Home, Calendar, Insights, Settings |
| **Design Toolbar** | Both | — | [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) | `Surface`, `Spacing.8` button gap | 🔲 Planned — contextual actions for calendar/insights views |

---

## Templates (4)

| Template | Layout | Platform | Implementation | Notes |
|----------|--------|----------|---------------|-------|
| **Main** | Tab-based with 4 tabs + floating action | Both | `ContentView` (iOS) · `MainActivity` (Android) | Primary app shell after unlock |
| **Sheet** | Bottom sheet with drag handle | Both | `.sheet` (iOS) · `BottomSheetDialogFragment` (Android) | Used for LogSheet, detail views |
| **Lock** | Full-screen PIN entry, always dark | Both | `LockView` (iOS) · `LockActivity` (Android) | `LockBackground` color, 6-digit PIN grid |
| **Onboarding** | Step wizard with progress bar | Both | `OnboardingView` (iOS) · `OnboardingActivity` (Android) | First launch only, language + tracking mode |

---

## Pages (4)

| Page | Template | Key Components | Route |
|------|----------|---------------|-------|
| **Home** | Main (tab 0) | Week Strip, Donut Chart, Quick Log button, Calm Mode banner, Prediction card | Tab index 0 |
| **Calendar** | Main (tab 1) | Calendar Grid, Day detail sheet, Period/fertile markers | Tab index 1 |
| **Insights** | Main (tab 2) | Insights Stats, Cycle averages, Symptom frequency | Tab index 2 |
| **Settings** | Main (tab 3) | Settings List, Calm Mode toggle, PIN change, Panic wipe, Export backup | Tab index 3 |

---

## Component Inventory

| Level | Implemented | Planned | Total |
|-------|-------------|---------|-------|
| Atoms | 10 | 0 | 10 |
| Molecules | 5 | 2 | 7 |
| Organisms | 5 | 2 | 7 |
| Templates | 4 | 0 | 4 |
| Pages | 4 | 0 | 4 |
| **Total** | **28** | **4** | **32** |

---

## File Map

### iOS (`ios-app/LunaApp/`)

```
Views/
  RootView.swift          — App entry, TabView shell
  HomeView.swift          — Home page
  CalendarView.swift      — Calendar page + grid
  InsightsView.swift      — Insights page + stats
  SettingsView.swift      — Settings page + list
  LogSheetView.swift      — Log form (bottom sheet)
  LockView.swift          — PIN entry (Lock template)
  OnboardingView.swift    — Onboarding wizard
```

### Android (`android-app/app/src/main/kotlin/app/luna/`)

```
ui/
  MainActivity.kt         — Main template (tabs)
  LockActivity.kt         — Lock template (PIN)
  OnboardingActivity.kt   — Onboarding wizard
  LogBottomSheet.kt       — Log form (bottom sheet)
  SettingsActivity.kt     — Settings page
```
