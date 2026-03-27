# LUNA i18n Translation Forensics Report

**Generated:** Translation forensics validation  
**Purpose:** Determine which locales have real, complete translations suitable for shipping

---

## Executive Summary

| Platform | Locale | Status | Coverage | Verdict |
|----------|--------|--------|----------|---------|
| iOS | **en** | Shippable | 403/403 (100%) | ✅ SHIP |
| iOS | **fr** | Not shippable | 388/403 (96%) | ❌ 15 keys untranslated |
| Android | **ALL** | Not shippable | ~124/174 (71%) | ❌ Missing 50 keys |

---

## iOS Localization Analysis

### Source Language
- **French (fr)** — the `.xcstrings` file has `sourceLanguage: "fr"`

### Shipped Locales (Info.plist)
- `en` (English)
- `fr` (French)

### English (en) — ✅ SHIP
- 403/403 keys translated
- 0 fake/placeholder translations
- **Status: COMPLETE**

### French (fr) — ❌ DO NOT SHIP
- **388/403 keys translated** (96%)
- **15 keys have `state: "needs_review"`** — these are English text copied verbatim to French

#### Untranslated Keys (15):
```
a11y.log_symptom
perimeno.banner_a11y
perimeno.banner_subtitle
perimeno.banner_title
perimeno.cycle_variability
perimeno.dashboard_title
perimeno.info_body
perimeno.info_title
perimeno.key_symptoms
perimeno.log_today_button
perimeno.variance_label
symptom.hot_flash
symptom.night_sweats
symptom.vaginal_dryness
unit.days
```

**Pattern:** All untranslated keys relate to **perimenopause features** and 3 symptoms added later.

---

## Android Localization Analysis

### Source Language
- **English (en)** — `values/strings.xml`

### English Source Keys: 174

### Locale Coverage Summary

| Locale | Keys | Coverage | Missing | Fake | Shippable |
|--------|------|----------|---------|------|-----------|
| de | 124 | 71% | 50 | 0 | ❌ |
| es | 124 | 71% | 50 | 0 | ❌ |
| es-MX | 124 | 71% | 50 | 0 | ❌ |
| it | 124 | 71% | 50 | 0 | ❌ |
| pt-BR | 124 | 71% | 50 | 0 | ❌ |
| pt-PT | 124 | 71% | 50 | 0 | ❌ |
| fr | 54 | 31% | 120 | 0 | ❌ |
| fr-CA | 124 | 71% | 50 | 0 | ❌ |
| ru | 124 | 71% | 50 | 0 | ❌ |
| pl | 124 | 71% | 50 | 0 | ❌ |
| nl | 124 | 71% | 50 | 0 | ❌ |
| ko | 124 | 71% | 50 | **3** | ❌ |
| ja | 124 | 71% | 50 | **2** | ❌ |
| ar | 33 | 19% | 141 | 0 | ❌ |
| he | 15 | 9% | 159 | 0 | ❌ |
| zh-CN | 124 | 71% | 50 | 0 | ❌ |
| zh-TW | 124 | 71% | 50 | 0 | ❌ |

### ❌ Locales with FAKE Translations

#### Korean (ko) — 3 fakes
```
privacy_badge_a11y: "All your data is stored locally on this device" (should be Korean)
onboarding_pin_too_short: "PIN must be 6–8 digits" (should be Korean)
notif_period_body: "Be prepared, your period is expected in 2 days." (should be Korean)
```

#### Japanese (ja) — 2 fakes
```
onboarding_pin_too_short: "PIN must be 6–8 digits" (should be Japanese)
notif_period_body: "Be prepared, your period is expected in 2 days." (should be Japanese)
```

### Missing Keys Pattern (50 keys absent from most locales)

All European locales + ko + ja are missing the same 50 keys. These were likely added to English source AFTER translations were completed:

```
Perimenopause: perimenopause_dashboard_title, perimenopause_info_body, 
               perimenopause_info_title, perimenopause_need_more_data,
               perimenopause_quick_log_title, perimenopause_variability_*

Onboarding: onboarding_name_placeholder, onboarding_period_duration_label,
            onboarding_regularity_label, onboarding_skip

Pregnancy: hcg_negative, hcg_not_done, hcg_positive, hcg_test_label,
           kicks_decrease, kicks_increase, kicks_label, weight_label

Backup: backup_export_error, backup_pin_unavailable, backup_restore_error,
        backup_restore_success, restore_encrypted_backup_label

Goals: goal_avoid_pregnancy, goal_perimenopause, goal_track,
       goal_track_pregnancy, goal_try_to_conceive, goal_understand_symptoms

Other: creating_vault_loading, day_abbr, flow_option_a11y, lock_subtitle,
       nausea_label, nausea_slider_a11y, open_button, pregnancy_log_title,
       regularity_*, restore_encrypted_backup_label, settings_section_*,
       stats_avg_*, symptom_logged_a11y, toolbar_private_subtitle
```

---

## Conclusions

### Currently Shippable
- **iOS English (en)** — only locale with 100% complete, real translations

### Not Shippable — Require Fixes

1. **iOS French (fr)**: Need 15 real French translations for perimenopause keys
2. **Android Korean (ko)**: Need 50 missing Korean translations + fix 3 fake English strings
3. **Android Japanese (ja)**: Need 50 missing Japanese translations + fix 2 fake English strings
4. **Android European locales (de, es, it, pt-*, ru, pl, nl, fr-CA, etc.)**: Need 50 missing translations each
5. **Android Arabic (ar)**: Need 141 missing translations (only 19% complete)
6. **Android Hebrew (he)**: Need 159 missing translations (only 9% complete)

---

## Recommendations

1. **For iOS**: Complete French translations for the 15 perimenopause keys before shipping French locale
2. **For Android**: Decide on acceptable coverage threshold. 71% may be acceptable for soft launch with 50 missing keys being secondary features
3. **Fake translations (ko, ja)**: Must be replaced with real translations before shipping
4. **RTL locales (ar, he, fa)**: Require significant translation investment

---

## Validation Script

Run `python3 scripts/i18n_shippable_report.py --verbose` for detailed analysis.

Output: `scripts/i18n_forensics_report.json` (machine-readable)
