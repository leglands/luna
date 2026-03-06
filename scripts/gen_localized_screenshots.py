#!/usr/bin/env python3
"""
gen_localized_screenshots.py

Generates localized home screenshots for all iOS locale folders.
Overlays translated text on the en-US base screenshot for each locale/device.

Usage:
    python3 scripts/gen_localized_screenshots.py [--locale LOCALE] [--dry-run]

Requirements:
    pip install Pillow arabic-reshaper python-bidi
"""

import json
import os
import sys
import argparse
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# ---- PATHS ----
REPO_ROOT = Path(__file__).parent.parent
SCREENSHOTS_DIR = REPO_ROOT / "fastlane/screenshots/ios"
XCSTRINGS_PATH = REPO_ROOT / "ios-app/LunaApp/Resources/Localizable.xcstrings"
BASE_LOCALE_DIR = "en-US"

# ---- COLORS (sampled from en-US screenshot) ----
BG_DARK = (18, 14, 22)          # main dark background
BG_TAB_BAR = (12, 10, 16)       # slightly darker tab bar bg
BG_BUTTON = (194, 86, 122)      # log button pink background
COLOR_LABEL = (140, 130, 155)   # secondary text: lavender-grey
COLOR_PHASE = (232, 165, 152)   # phase name: warm salmon
COLOR_BUTTON_TEXT = (18, 14, 22)  # dark text on button
DOT_PERIOD = (194, 86, 122)     # pink dot in legend
DOT_FERTILE = (122, 184, 145)   # green dot in legend
DOT_LUTEAL = (107, 78, 113)     # purple dot in legend

# ---- RTL LOCALES ----
RTL_LOCALES = {"ar", "ar-SA", "he", "fa", "ur"}

# ---- FONT PATHS ----
FONT_LATIN = "/System/Library/Fonts/HelveticaNeue.ttc"
FONT_ARABIC = "/System/Library/Fonts/GeezaPro.ttc"
FONT_HEBREW = "/System/Library/Fonts/ArialHB.ttc"
FONT_JAPANESE = "/Library/Fonts/ヒラギノ角ゴシック W3.ttc"
FONT_KOREAN = "/System/Library/Fonts/AppleSDGothicNeo.ttc"
FONT_CHINESE = "/System/Library/Fonts/Hiragino Sans GB.ttc"
FONT_THAI = "/System/Library/Fonts/ThonburiUI.ttc"
FONT_DEVANAGARI = "/System/Library/Fonts/Kohinoor.ttc"

LOCALE_TO_XCSTRINGS = {
    "ar-SA": "ar", "cs": "cs", "da": "da", "de-DE": "de", "el": "el",
    "en-US": "en", "es-ES": "es", "es-MX": "es", "fi": "fi",
    "fr-CA": "fr", "fr-FR": "fr", "he": "he", "hi": "hi", "hr": "hr",
    "hu": "hu", "id": "id", "it": "it", "ja": "ja", "ko": "ko",
    "ms": "ms", "nl-NL": "nl", "no": "nb", "pl": "pl", "pt-BR": "pt-BR",
    "pt-PT": "pt-BR", "ro": "ro", "ru": "ru", "sk": "sk", "sv": "sv",
    "th": "th", "tr": "tr", "uk": "uk", "vi": "vi",
    "zh-Hans": "zh-Hans", "zh-Hant": "zh-Hant",
}

LOCALE_TO_FONT = {
    "ar-SA": FONT_ARABIC, "he": FONT_HEBREW,
    "ja": FONT_JAPANESE, "ko": FONT_KOREAN,
    "zh-Hans": FONT_CHINESE, "zh-Hant": FONT_CHINESE,
    "th": FONT_THAI, "hi": FONT_DEVANAGARI,
}


def get_font(locale, size, bold=False):
    font_path = LOCALE_TO_FONT.get(locale, FONT_LATIN)
    if not os.path.exists(font_path):
        font_path = FONT_LATIN
    try:
        # index=0 for regular, some .ttc have bold at index 1
        idx = 1 if bold and font_path == FONT_LATIN else 0
        return ImageFont.truetype(font_path, size, index=idx)
    except Exception:
        return ImageFont.load_default()


def load_xcstrings():
    with open(XCSTRINGS_PATH, encoding="utf-8") as f:
        data = json.load(f)
    result = {}
    for key, val in data["strings"].items():
        locs = val.get("localizations", {})
        result[key] = {}
        for lang, v in locs.items():
            if isinstance(v, dict):
                sv = v.get("stringUnit", {}).get("value", "")
                if sv:
                    result[key][lang] = sv
    return result


def t(strings, key, locale, fallback="en", n=None):
    """Get translated string, fallback to English."""
    xloc = LOCALE_TO_XCSTRINGS.get(locale, locale)
    val = strings.get(key, {}).get(xloc) or strings.get(key, {}).get(fallback, key)
    if n is not None:
        val = val.replace("%lld", str(n)).replace("%d", str(n))
    return val


def prepare_text(text, locale):
    """Handle RTL text shaping for Arabic/Hebrew."""
    if locale in RTL_LOCALES:
        try:
            if locale in ("ar", "ar-SA", "fa", "ur"):
                import arabic_reshaper
                from bidi.algorithm import get_display
                return get_display(arabic_reshaper.reshape(text))
            elif locale == "he":
                from bidi.algorithm import get_display
                return get_display(text)
        except ImportError:
            pass
    return text


def draw_centered(draw, text, x_center, y_center, font, color):
    """Draw text centered at (x_center, y_center)."""
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x_center - w / 2, y_center - h / 2), text, font=font, fill=color)


def fill_region(img, x1, y1, x2, y2, color):
    """Fill a rectangular region with a solid color."""
    draw = ImageDraw.Draw(img)
    draw.rectangle([x1, y1, x2, y2], fill=color)


# ---- REGION DEFINITIONS for 1290x2796 (iPhone 6.7" reference) ----
# All coordinates are (x1, y1, x2, y2) for the fill area

def get_home_regions(w, h):
    """Return text region definitions scaled to (w, h)."""
    sx = w / 1290
    sy = h / 2796

    def s(x1, y1, x2, y2):
        return (int(x1 * sx), int(y1 * sy), int(x2 * sx), int(y2 * sy))

    return {
        "subtitle":     s(0,    375,  1290, 445),
        "phase_name":   s(160,  1148, 1130, 1215),
        "legend_row":   s(230,  1597, 1060, 1640),
        "next_period":  s(0,    1760, 1290, 1812),
        "log_button":   s(152,  2222, 1138, 2285),
        "privacy_badge":s(160,  2428, 1130, 2470),
        "tab_bar":      s(0,    2593, 1290, 2635),
    }


def draw_home_texts(img, locale, strings):
    """Draw all translated text on the home screenshot."""
    w, h = img.size
    regions = get_home_regions(w, h)
    draw = ImageDraw.Draw(img)
    is_rtl = locale in RTL_LOCALES
    sx = w / 1290
    sy = h / 2796

    def pt(txt):
        return prepare_text(txt, locale)

    def font(size, bold=False):
        return get_font(locale, int(size * sx), bold)

    def cx(x1, x2):
        return (x1 + x2) // 2

    def cy(y1, y2):
        return (y1 + y2) // 2

    # 1. SUBTITLE — "Today · Day 10"
    r = regions["subtitle"]
    fill_region(img, *r, BG_DARK)
    today = t(strings, "tab_today", locale)
    day_raw = t(strings, "cycle_day_label %lld", locale, n=10)
    subtitle = f"{today}  ·  {day_raw}"
    if is_rtl:
        subtitle = f"{day_raw}  ·  {today}"
    draw_centered(draw, pt(subtitle), cx(r[0], r[2]), cy(r[1], r[3]),
                  font(28), COLOR_LABEL)

    # 2. PHASE NAME — "Follicular phase"
    r = regions["phase_name"]
    fill_region(img, *r, BG_DARK)
    phase = t(strings, "phase_follicular", locale)
    phase_word = t(strings, "home_phase_label", locale)
    # English: "Follicular phase" — French: "Phase folliculaire"
    if locale in ("fr", "fr-FR", "fr-CA", "es", "es-ES", "es-MX", "it", "pt-BR",
                  "pt-PT", "ro", "ca"):
        phase_text = f"{phase_word} {phase}"
    elif locale in ("ar", "ar-SA", "he", "fa", "ur"):
        phase_text = phase  # Arabic already descriptive
    else:
        phase_text = f"{phase} {phase_word}"
        # For German, the phase key already includes "phase" (Follikelphase)
        if "phase" in phase.lower() or "phase" in phase_word.lower():
            phase_text = phase
    draw_centered(draw, pt(phase_text), cx(r[0], r[2]), cy(r[1], r[3]),
                  font(32, bold=True), COLOR_PHASE)

    # 3. LEGEND ROW — [dot] Period  [dot] Fertile window  [dot] Luteal
    r = regions["legend_row"]
    fill_region(img, *r, BG_DARK)
    leg_period = pt(t(strings, "phase_menstrual", locale))
    leg_fertile = pt(t(strings, "home_fertile_window_label", locale))
    leg_luteal = pt(t(strings, "phase_luteal", locale))
    dot_r = int(8 * sx)
    label_font = font(22)
    label_y = cy(r[1], r[3])
    total_w = r[2] - r[0]
    items = [
        (DOT_PERIOD,  leg_period),
        (DOT_FERTILE, leg_fertile),
        (DOT_LUTEAL,  leg_luteal),
    ]
    if is_rtl:
        items = list(reversed(items))
    gap = total_w // (len(items) + 1)
    for i, (dot_color, label) in enumerate(items):
        item_cx = r[0] + gap * (i + 1)
        # Dot
        draw.ellipse([item_cx - dot_r, label_y - dot_r,
                      item_cx + dot_r, label_y + dot_r], fill=dot_color)
        # Text after dot
        bbox = draw.textbbox((0, 0), label, font=label_font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((item_cx + dot_r + int(5 * sx), label_y - th // 2),
                  label, font=label_font, fill=COLOR_LABEL)

    # 4. NEXT PERIOD — "Next period  ·  In 18 days"
    r = regions["next_period"]
    fill_region(img, *r, BG_DARK)
    nxt = t(strings, "home_next_period_label", locale)
    in_days = t(strings, "next_period_in %lld", locale, n=18)
    next_text = f"{nxt}  ·  {in_days}"
    if is_rtl:
        next_text = f"{in_days}  ·  {nxt}"
    draw_centered(draw, pt(next_text), cx(r[0], r[2]), cy(r[1], r[3]),
                  font(26), COLOR_LABEL)

    # 5. LOG BUTTON — "Log today"
    r = regions["log_button"]
    # Do NOT fill button background (keep the pink gradient), just overwrite text area
    btn_text_y1 = r[1] + int(10 * sy)
    btn_text_y2 = r[3] - int(10 * sy)
    fill_region(img, r[0] + int(50 * sx), btn_text_y1,
                r[2] - int(50 * sx), btn_text_y2, BG_BUTTON)
    log_text = pt(t(strings, "log_today_button", locale))
    draw_centered(draw, log_text,
                  cx(r[0], r[2]), cy(r[1], r[3]),
                  font(32, bold=True), COLOR_BUTTON_TEXT)

    # 6. PRIVACY BADGE — "Local data"
    r = regions["privacy_badge"]
    fill_region(img, *r, BG_DARK)
    priv = pt(t(strings, "privacy_local_badge", locale))
    draw_centered(draw, priv, cx(r[0], r[2]), cy(r[1], r[3]),
                  font(24), COLOR_LABEL)

    # 7. TAB BAR — 4 tabs
    r = regions["tab_bar"]
    fill_region(img, *r, BG_TAB_BAR)
    tabs = [
        t(strings, "tab_today", locale),
        t(strings, "tab_calendar", locale),
        t(strings, "tab_insights", locale),
        t(strings, "tab_settings", locale),
    ]
    if is_rtl:
        tabs = list(reversed(tabs))
    tab_font = font(20)
    n_tabs = len(tabs)
    tab_w = (r[2] - r[0]) // n_tabs
    for i, tab_label in enumerate(tabs):
        tab_cx = r[0] + tab_w * i + tab_w // 2
        tab_cy = cy(r[1], r[3])
        # Active tab (index 0 = Today) slightly brighter
        col = (194, 86, 122) if i == 0 else COLOR_LABEL
        draw_centered(draw, pt(tab_label), tab_cx, tab_cy, tab_font, col)

    return img


def process_home_screenshot(locale_dir, locale, strings, dry_run=False):
    """Generate localized home screenshot for a locale across all device sizes."""
    devices = ["APP_IPHONE_67", "APP_IPHONE_65", "APP_IPAD_PRO_3GEN_129"]
    base_dir = SCREENSHOTS_DIR / BASE_LOCALE_DIR
    out_dir = SCREENSHOTS_DIR / locale_dir
    count = 0

    for device in devices:
        src = base_dir / device / "0001_01_home.png"
        dst = out_dir / device / "0001_01_home.png"
        if not src.exists():
            continue
        if dry_run:
            print(f"  [DRY] {dst.relative_to(REPO_ROOT)}")
            continue
        img = Image.open(src).convert("RGB")
        img = draw_home_texts(img, locale, strings)
        img.save(str(dst), "PNG")
        count += 1

    return count


def main():
    parser = argparse.ArgumentParser(description="Generate localized iOS screenshots")
    parser.add_argument("--locale", help="Only process this locale folder (e.g. fr-FR)")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be done")
    args = parser.parse_args()

    strings = load_xcstrings()

    locale_dirs = sorted(d for d in os.listdir(SCREENSHOTS_DIR)
                         if (SCREENSHOTS_DIR / d).is_dir() and d != BASE_LOCALE_DIR)
    if args.locale:
        locale_dirs = [args.locale]

    total = 0
    for locale_dir in locale_dirs:
        locale = LOCALE_TO_XCSTRINGS.get(locale_dir, locale_dir)
        print(f"[{locale_dir}] xcstrings locale: {locale}")
        n = process_home_screenshot(locale_dir, locale, strings,
                                    dry_run=args.dry_run)
        if not args.dry_run:
            print(f"  Generated {n} screenshot(s)")
        total += n

    print(f"\nDone. Total: {total} screenshot(s) generated.")


if __name__ == "__main__":
    main()
