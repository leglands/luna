#!/usr/bin/env python3
"""
fill_i18n.py  — Fill missing xcstrings translations using Google Translate.

Usage:
    python3 scripts/fill_i18n.py [--dry-run] [--locale fr] [--force]

Translates all English strings into all 40 locales that are missing translations.
Preserves existing translations. Caches results to avoid re-translating.
"""

import json
import os
import re
import sys
import time
import argparse
from pathlib import Path

XCSTRINGS = Path(__file__).parent.parent / "ios-app/LunaApp/Resources/Localizable.xcstrings"
CACHE_FILE = Path(__file__).parent / ".i18n_cache.json"

# Map xcstrings locale → Google Translate target code
GT_MAP = {
    "am": "am",
    "ar": "ar",
    "bg": "bg",
    "bn": "bn",
    "ca": "ca",
    "cs": "cs",
    "da": "da",
    "de": "de",
    "el": "el",
    "es": "es",
    "fa": "fa",
    "fi": "fi",
    "fr": "fr",
    "he": "iw",       # Google uses 'iw' for Hebrew
    "hi": "hi",
    "hr": "hr",
    "hu": "hu",
    "id": "id",
    "it": "it",
    "ja": "ja",
    "ko": "ko",
    "ms": "ms",
    "nb": "no",       # Google uses 'no' for Norwegian Bokmål
    "nl": "nl",
    "pl": "pl",
    "pt-BR": "pt",    # Google 'pt' defaults to Brazilian Portuguese
    "ro": "ro",
    "ru": "ru",
    "sk": "sk",
    "sv": "sv",
    "sw": "sw",
    "th": "th",
    "tr": "tr",
    "uk": "uk",
    "ur": "ur",
    "vi": "vi",
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
    "zu": "zu",
}

# Locales that already have good manual translations — skip
SKIP_LOCALES = {"en"}  # We translate FROM English

# Day abbreviation per locale — single char that auto-translate manglesas
DAY_ABBR = {
    "am": "ቀ", "ar": "ي", "bg": "д", "bn": "দ", "ca": "d", "cs": "d",
    "da": "d", "de": "T", "el": "η", "es": "d", "fa": "ر", "fi": "p",
    "fr": "j", "he": "י", "hi": "द", "hr": "d", "hu": "n", "id": "h",
    "it": "g", "ja": "日", "ko": "일", "ms": "h", "nb": "d", "nl": "d",
    "pl": "d", "pt-BR": "d", "ro": "z", "ru": "д", "sk": "d", "sv": "d",
    "sw": "s", "th": "ว", "tr": "g", "uk": "д", "ur": "د", "vi": "n",
    "zh-Hans": "日", "zh-Hant": "日", "zu": "i",
}

# Strings that should NOT be translated (brand names, codes, etc.)
NO_TRANSLATE_PATTERNS = [
    r"^LUNA$",
    r"^AES-256-GCM",
    r"^[•●]+$",
    r"^[\d.]+$",
    r"^[A-Z0-9_]+$",  # ALL_CAPS identifiers
]


def should_skip(value: str) -> bool:
    """True if the value should not be auto-translated."""
    for pattern in NO_TRANSLATE_PATTERNS:
        if re.match(pattern, value):
            return True
    return False


# Placeholder for format specifiers during translation
SPEC_RE = re.compile(r"(%(?:lld|d|@|s|f)|\{[^}]+\})")


def protect_specifiers(text: str) -> tuple[str, list[str]]:
    """Replace format specifiers with numeric placeholders."""
    specs = []

    def replacer(m):
        idx = len(specs)
        specs.append(m.group(0))
        return f"[SPEC{idx}]"

    protected = SPEC_RE.sub(replacer, text)
    return protected, specs


def restore_specifiers(text: str, specs: list[str]) -> str:
    """Restore format specifiers from placeholders."""
    for i, spec in enumerate(specs):
        text = text.replace(f"[SPEC{i}]", spec)
    return text


def translate_batch(texts: list[str], target_gt: str, delay: float = 0.2) -> list[str]:
    """Translate a batch of texts using GoogleTranslator."""
    from deep_translator import GoogleTranslator
    translator = GoogleTranslator(source="en", target=target_gt)
    results = []
    # Process in chunks of 20 to stay safe
    chunk_size = 20
    for i in range(0, len(texts), chunk_size):
        chunk = texts[i:i + chunk_size]
        try:
            translated = translator.translate_batch(chunk)
            results.extend(translated)
            time.sleep(delay)
        except Exception as e:
            print(f"    Error translating chunk: {e}", file=sys.stderr)
            # Fall back to one-by-one
            for text in chunk:
                try:
                    r = translator.translate(text)
                    results.append(r or text)
                    time.sleep(delay)
                except Exception as e2:
                    print(f"    Failed: {text!r}: {e2}", file=sys.stderr)
                    results.append(text)  # keep original on failure
    return results


def load_xcstrings() -> dict:
    with open(XCSTRINGS, encoding="utf-8") as f:
        return json.load(f)


def save_xcstrings(data: dict) -> None:
    with open(XCSTRINGS, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def load_cache() -> dict:
    if CACHE_FILE.exists():
        with open(CACHE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_cache(cache: dict) -> None:
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--locale", help="Only fill this xcstrings locale (e.g. ko)")
    parser.add_argument("--force", action="store_true", help="Re-translate even if cached")
    args = parser.parse_args()

    data = load_xcstrings()
    cache = load_cache()

    all_locales = set()
    for v in data["strings"].values():
        all_locales.update(v.get("localizations", {}).keys())

    target_locales = sorted(l for l in all_locales if l not in SKIP_LOCALES)
    if args.locale:
        if args.locale not in target_locales:
            print(f"Locale {args.locale!r} not in xcstrings", file=sys.stderr)
            sys.exit(1)
        target_locales = [args.locale]

    # Gather all keys with their English values
    keys_to_translate: list[tuple[str, str]] = []
    for key, val in data["strings"].items():
        locs = val.get("localizations", {})
        en_val = locs.get("en", {}).get("stringUnit", {}).get("value", "")
        if not en_val or should_skip(en_val):
            continue
        keys_to_translate.append((key, en_val))

    print(f"Keys to translate: {len(keys_to_translate)}")
    print(f"Target locales: {len(target_locales)}")

    total_added = 0

    for locale in target_locales:
        gt_code = GT_MAP.get(locale)
        if not gt_code:
            print(f"[{locale}] no Google Translate mapping, skipping")
            continue

        # Find which keys need translation for this locale
        needed: list[tuple[str, str]] = []  # (key, protected_text)
        specs_map: dict[str, list[str]] = {}
        for key, en_val in keys_to_translate:
            locs = data["strings"][key].get("localizations", {})
            if locale in locs and not args.force:
                continue
            # Special case: day_abbr
            if key == "day_abbr" and locale in DAY_ABBR:
                continue  # handle separately
            protected, specs = protect_specifiers(en_val)
            needed.append((key, protected))
            specs_map[key] = specs

        # Add day_abbr if needed
        day_abbr_needed = (
            "day_abbr" in data["strings"] and
            locale not in data["strings"]["day_abbr"].get("localizations", {}) and
            locale in DAY_ABBR and
            not args.force
        )

        print(f"[{locale}/{gt_code}] {len(needed)} missing + {1 if day_abbr_needed else 0} day_abbr")
        if not needed and not day_abbr_needed:
            continue

        if args.dry_run:
            total_added += len(needed) + (1 if day_abbr_needed else 0)
            continue

        # Translate all needed texts
        texts_to_translate = [t for _, t in needed]
        cache_key_prefix = f"{locale}::"

        # Check cache
        cached_texts = []
        uncached_indices = []
        for i, text in enumerate(texts_to_translate):
            ck = cache_key_prefix + text
            if ck in cache and not args.force:
                cached_texts.append((i, cache[ck]))
            else:
                uncached_indices.append(i)

        print(f"  Cached: {len(cached_texts)}, need translate: {len(uncached_indices)}")

        # Translate uncached
        uncached_texts = [texts_to_translate[i] for i in uncached_indices]
        translated_uncached: list[str] = []
        if uncached_texts:
            translated_uncached = translate_batch(uncached_texts, gt_code)
            # Save to cache
            for i, (orig, trans) in enumerate(zip(uncached_texts, translated_uncached)):
                ck = cache_key_prefix + orig
                cache[ck] = trans
            save_cache(cache)

        # Build full results list
        results: list[str] = [""] * len(texts_to_translate)
        for idx, cached_val in cached_texts:
            results[idx] = cached_val
        for i, orig_idx in enumerate(uncached_indices):
            results[orig_idx] = translated_uncached[i] if i < len(translated_uncached) else texts_to_translate[orig_idx]

        # Write translations to xcstrings
        for (key, _), translated in zip(needed, results):
            original_en = next(v for k, v in keys_to_translate if k == key)
            specs = specs_map.get(key, [])
            final = restore_specifiers(translated, specs)

            if "localizations" not in data["strings"][key]:
                data["strings"][key]["localizations"] = {}
            data["strings"][key]["localizations"][locale] = {
                "stringUnit": {"state": "translated", "value": final}
            }
            total_added += 1

        # Handle day_abbr
        if day_abbr_needed:
            abbr = DAY_ABBR[locale]
            if "localizations" not in data["strings"]["day_abbr"]:
                data["strings"]["day_abbr"]["localizations"] = {}
            data["strings"]["day_abbr"]["localizations"][locale] = {
                "stringUnit": {"state": "translated", "value": abbr}
            }
            total_added += 1

        print(f"  Added {len(needed) + (1 if day_abbr_needed else 0)} translations")

    if not args.dry_run:
        save_xcstrings(data)
        print(f"\nSaved. Total added: {total_added} translations.")
    else:
        print(f"\nDRY RUN. Would add: {total_added} translations.")


if __name__ == "__main__":
    main()
