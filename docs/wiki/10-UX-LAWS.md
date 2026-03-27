# LUNA UX Audit — 30 Laws of UX

> Reference: [Laws of UX](https://lawsofux.com)
>
> Audit date: 2025-07 · Covers iOS (SwiftUI) + Android (Kotlin Views) · Rust core v0.1.x

## Status Legend

| Icon | Meaning |
|------|---------|
| ✅ OK | Compliant, no action needed |
| 🔧 FIXED | Issue identified and resolved |
| ⚠️ WARNING | Partial compliance, improvement planned |

---

## Audit Table

| # | Law | Description | LUNA Status | Finding | Fix Applied |
|---|-----|-------------|-------------|---------|-------------|
| 1 | **Aesthetic-Usability Effect** | Users perceive aesthetically pleasing designs as more usable. | ✅ OK | Clean minimal design, consistent color palette, generous whitespace. Dark/Light auto. | — |
| 2 | **Choice Overload** | More choices lead to harder decisions and lower satisfaction. | 🔧 FIXED | 43 symptoms presented as flat list overwhelmed users during logging. | Grouped into 5 collapsible categories (menstruation, SPM, ovulation, follicular, perimenopause) via `DisclosureGroup` (iOS) / expandable sections (Android). |
| 3 | **Chunking** | Content grouped into distinct chunks is easier to process. | ✅ OK | Settings organized in logical sections (Account, Tracking, Privacy, About). Log form uses clear section headers. | — |
| 4 | **Cognitive Bias** | Users make systematic errors in judgment based on mental shortcuts. | ✅ OK | Calm Mode directly addresses health anxiety bias — hides predictions/fertile window when enabled. Numeric mood scale (1-5) avoids emoji interpretation bias. | — |
| 5 | **Cognitive Load** | Total mental effort required to use the interface should be minimized. | 🔧 FIXED | BBT (Basal Body Temperature) field had no explanation; new users didn't understand the metric. | Added info tooltip button next to BBT field explaining what it is and how to measure. |
| 6 | **Doherty Threshold** | System response < 400ms keeps users engaged. | 🔧 FIXED | Vault creation with Argon2id (64MB/3iter) takes ~1-2s on older devices; appeared frozen. | Added loading spinner overlay during vault creation and PIN change operations. |
| 7 | **Fitts's Law** | Time to reach a target is a function of distance and size. | 🔧 FIXED | Some action buttons and symptom chips were below 44pt touch target. | Enforced minimum 44pt (iOS) / 48dp (Android) on all interactive elements. PIN digit buttons enlarged to 64pt. |
| 8 | **Flow** | Users perform best when in a state of focused immersion. | 🔧 FIXED | Log entry flow lacked sensory feedback; actions felt disconnected. | Added haptic feedback (`UIImpactFeedbackGenerator` / `HapticFeedbackConstants`) on symptom selection, mood pick, and save action. |
| 9 | **Goal-Gradient Effect** | Motivation increases as users approach a goal. | ✅ OK | Onboarding wizard shows progress bar (step X of N). Users can see how close they are to completion. | — |
| 10 | **Hick's Law** | Decision time increases with the number and complexity of choices. | 🔧 FIXED | 43 symptoms in a single list = high decision time. | Symptom categories reduce visible choices to 5 top-level groups, each expanding to 6-10 items. |
| 11 | **Jakob's Law** | Users prefer interfaces that work like ones they already know. | 🔧 FIXED | Mood picker used unlabeled circles (1-5); users didn't know what numbers meant. | Added text labels under each mood circle (e.g., "Very low", "Low", "Neutral", "Good", "Very good"). |
| 12 | **Law of Common Region** | Elements within a shared boundary are perceived as grouped. | ✅ OK | Cards, sections, and grouped settings use consistent surface backgrounds and border radius to define regions. | — |
| 13 | **Law of Proximity** | Objects near each other are perceived as related. | ✅ OK | Related form fields grouped with consistent spacing (8pt intra-group, 24pt inter-group). Tab bar icons properly spaced. | — |
| 14 | **Law of Prägnanz** | People interpret complex images in the simplest form possible. | ✅ OK | Donut chart uses simple arc segments. Calendar uses colored dots (not complex indicators). Minimal iconography throughout. | — |
| 15 | **Law of Similarity** | Similar elements are perceived as part of the same group. | ✅ OK | All symptom chips share identical styling. All toggle switches use same design. Consistent button hierarchy (primary/secondary/text). | — |
| 16 | **Law of Uniform Connectedness** | Visually connected elements are perceived as more related. | ✅ OK | Tab bar items connected by shared background. Settings sections use dividers within groups. Week strip dates connected by shared container. | — |
| 17 | **Mental Model** | Users have preconceived expectations about how things work. | ✅ OK | Standard bottom tab navigation (Home/Calendar/Insights/Settings). Calendar follows standard month grid layout. Bottom sheet for logging matches iOS/Android conventions. | — |
| 18 | **Miller's Law** | Average person can hold 7±2 items in working memory. | ✅ OK | 4 main tabs. Settings has 5-6 sections with 4-5 items each. Symptom categories limited to 5 groups. Home shows 3-4 key data points. | — |
| 19 | **Occam's Razor** | The simplest solution is usually the best. | ✅ OK | Single-screen log entry (no multi-step wizard). PIN-only auth (no complex password rules). One-tap symptom selection via chips. | — |
| 20 | **Paradox of the Active User** | Users prefer to act immediately rather than read instructions. | ✅ OK | Onboarding is self-explanatory with minimal text. All features discoverable without tutorial. Labels on all form fields. | — |
| 21 | **Pareto Principle** | ~80% of effects come from ~20% of causes. | ✅ OK | Home screen surfaces the most important info (current cycle day, next period prediction, today's log status). Quick-log flow prioritizes flow + symptoms. | — |
| 22 | **Parkinson's Law** | Work expands to fill the time available. | ✅ OK | Quick log flow designed to complete in < 30 seconds. Only flow is required; all other fields optional. No unnecessary steps. | — |
| 23 | **Peak-End Rule** | People judge experiences by peak moments and how they end. | 🔧 FIXED | Save action had no visual confirmation; log entry ended abruptly. First app launch was blank. | Added animated save feedback overlay (checkmark + "Saved!"). Added welcome screen on first launch with gentle onboarding intro. |
| 24 | **Postel's Law** | Be liberal in what you accept, conservative in what you produce. | 🔧 FIXED | BBT text field rejected comma decimals (common in EU locales like `36,5°C`). | Added input normalization: comma → dot conversion before parsing. Accept both `.` and `,` as decimal separator for BBT and weight fields. |
| 25 | **Selective Attention** | Users focus on task-relevant information and filter the rest. | ✅ OK | Log sheet shows only relevant fields. Calm Mode removes prediction noise. Non-essential info hidden behind expandable sections. | — |
| 26 | **Serial Position Effect** | Users best remember first and last items in a series. | ✅ OK | Most important tabs (Home, Settings) placed at first and last positions in tab bar. Calendar and Insights in middle positions. | — |
| 27 | **Tesler's Law** | Every system has irreducible complexity; it should be borne by the system, not the user. | ✅ OK | Cycle prediction algorithm runs automatically. Date formatting handled by system locale. Encryption/decryption transparent to user (PIN only). | — |
| 28 | **Von Restorff Effect** | Distinctive items are more likely to be remembered. | 🔧 FIXED | Ovulation day marker now uses coral/orange (AccentAccent) vs fertile window green (AccentSuccess). iOS CalendarView and HomeView WeekStripView aligned. Android CalendarFragment uses luna_phase_ovulation (coral) vs luna_brand_success (sage green). | Ovulation marker uses AccentAccent (coral #F5601A) — visually distinct from fertile AccentSuccess (sage #4AA26E). Both platforms now use consistent semantic colors. |
| 29 | **Working Memory** | Information in working memory decays rapidly without rehearsal. | ✅ OK | All context stays visible during log entry (no hidden state). Calendar shows full month with all markers visible. Inline validation on form fields. | — |
| 30 | **Zeigarnik Effect** | Incomplete tasks are remembered better than completed ones. | 🔧 FIXED | No indication when user hadn't logged for the current day. | Added red dot badge on Home tab and calendar when today has no log entry. Subtle "Not logged today" banner on Home screen. |

---

## Summary

| Status | Count |
|--------|-------|
| ✅ OK | 19 |
| 🔧 FIXED | 11 |
| ⚠️ WARNING | 0 |
| **Total** | 30 |

**Compliance: 100%** (30/30 resolved) · All UX laws now compliant.

---

## Next Actions

| Priority | Action | Law | Target |
|----------|--------|-----|--------|
| — | All UX law issues resolved | — | — |
