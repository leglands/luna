# Luna — Product Specs

## App Identity
- Name: Luna
- Purpose: Period & cycle tracking — understand your body, predict your cycle, log health data daily
- Brand: #E91E8C (rose/pink)
- Platform: iOS + Web (luna.macaron-software.com)
- Privacy: fully local-first (SQLCipher iOS, localStorage web), GDPR, zero PII network
- i18n: 47 locales, RTL support

## User Journeys — 1 week of use

### Daily
| Task | Frequency | Web | iOS |
|------|-----------|-----|-----|
| Dashboard — cycle day, phase, next period | 1× morning | ✅ / | ✅ HomeView |
| Log period (start/end) | 3–7 days/cycle | ⚠️ toggle only | ✅ LogSheet |
| Log flow intensity (light/medium/heavy/spotting) | 1×/day during period | ❌ | ✅ LogSheet |
| Log symptoms (cramps/headache/fatigue/bloating/etc) | 1-2×/day | ❌ | ✅ LogSheet |
| Log mood (1-5 scale) | 1×/day | ⚠️ text only | ✅ MoodPicker |
| Log energy (1-5 scale) | 1×/day | ❌ | ✅ LogSheet |
| Log BBT temperature | 1×/morning (fertility) | ❌ | ✅ LogSheet |

### Weekly
| Task | Web | iOS |
|------|-----|-----|
| Calendar view — cycle phases on month | ✅ /cycle | ✅ CalendarView |
| Insights — avg cycle length, trends | ✅ /insights | ✅ InsightsView |
| Fertile window — ovulation prediction, fertile days | ❌ | ✅ |
| History — past cycles list | ✅ /history | ✅ |

### Contextual
| Task | Web | iOS |
|------|-----|-----|
| Export data (CSV/PDF) for gynecologist | ❌ | ❌ |
| Notifications/reminders (period coming) | ❌ | ❌ |
| Switch to pregnancy mode → Aura | ❌ | ⚠️ TrackingModeView |

## Data Model

### localStorage key: `life-luna-data`
```json
{
  "settings": {
    "cycleLength": 28,
    "periodLength": 5,
    "lastPeriodDate": "2025-03-01"
  },
  "log": {
    "period": [{ "date": "YYYY-MM-DD", "flow": "spotting|light|medium|heavy" }],
    "symptoms": [{ "date": "YYYY-MM-DD", "items": ["cramps","fatigue","headache","bloating","breast_tenderness","irritability","low_mood","high_energy","nausea","lower_back_pain"] }],
    "mood": [{ "date": "YYYY-MM-DD", "score": "1-5", "label": "sad|neutral|ok|good|great" }],
    "energy": [{ "date": "YYYY-MM-DD", "score": "1-5" }],
    "temperature": [{ "date": "YYYY-MM-DD", "value": 36.7, "time": "HH:MM" }]
  }
}
```

## Cycle Engine
- Phase calculation: menstrual (d1-5), follicular (d6-13), ovulation (d13-15), luteal (d16-28)
- Fertile window: ovulation day ± 5 days (Sperm survival = 5d, egg = 24h — ACOG)
- Ovulation prediction: lastPeriodDate + cycleLength - 14
- BBT shift: sustained +0.2°C indicates ovulation (post-hoc only)

## Missing Screens (to build)
1. Enhanced `/log` — full daily log (flow + 9 symptoms + mood 1-5 + energy + BBT)
2. `/fertility` — fertile window + ovulation prediction
3. `/export` — CSV data export for gynecologist

## Evidence Base
- ACOG — cycle length norms (21-35 days), fertile window
- WHO — menstrual health guidelines
- Fehring et al. 2006 — BBT charting accuracy
- Crawford et al. 2018 — symptom logging app engagement

---

## DS
- Shared lib: `life-sdk/ds/web/` (63 comps) via `$ds/` alias (`svelte.config.js`: `alias: { '$ds': '../../life-sdk/ds/web' }`)
- Tokens: `$ds/tokens.css` — colors, typography, spacing, radius, motion (never redefine in app)
- DSButton: organic primary CTA → `$ds/DSButton.svelte`
- Modal: `$ds/Modal.svelte` (`$bindable`, focus-trap, size sm/md/lg)
- DSAlert: `$ds/DSAlert.svelte` (severity: warn/error/critical) — late-period / heavy-flow warnings
- DSEmptyState: `$ds/DSEmptyState.svelte` — illustrated + CTA, never raw empty
- DSCard, Badge, Avatar, DSSkeleton, DSSpinner, DSToast, DSSwitch: all from `$ds/`
- DSProgressRing, DSSuccessCheck: cycle completion + log confirmation
- DSTabs, DSSegmented: phase/insight navigation
- DSFormField, DSCoachMark: log form fields + onboarding tips
- No local DS copies — `$ds/` imports only
