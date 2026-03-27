#!/usr/bin/env python3
"""
i18n_shippable_report.py — Data-driven locale shippability validation.

Produces a machine-readable JSON report determining which locales have
real, complete translations suitable for shipping, with no fabricated text.

Usage:
    python3 scripts/i18n_shippable_report.py [--verbose] [--json-output]
"""

from __future__ import annotations

import json
import plistlib
import re
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).parent.parent


@dataclass
class LocaleStatus:
    locale: str
    platform: str
    source_lang: str
    total_keys: int
    complete_keys: int
    missing_keys: list[str] = field(default_factory=list)
    fake_translations: list[str] = field(default_factory=list)
    shippable: bool = False
    issues: list[str] = field(default_factory=list)


def load_ios_strings() -> dict:
    """Load iOS .xcstrings file."""
    xcstrings_path = ROOT / "ios-app/LunaApp/Resources/Localizable.xcstrings"
    if not xcstrings_path.exists():
        raise FileNotFoundError(xcstrings_path)
    with open(xcstrings_path, encoding="utf-8") as handle:
        return json.load(handle)


def load_ios_shipped_locales() -> list[str]:
    """Get locales declared as shipped in Info.plist."""
    info_plist = ROOT / "ios-app/LunaApp/Info.plist"
    if not info_plist.exists():
        return []
    with open(info_plist, "rb") as handle:
        data = plistlib.load(handle)
    return sorted(data.get("CFBundleLocalizations", []))


def _parse_android_strings(path: Path) -> tuple[set[str], dict[str, str]]:
    """Parse Android strings.xml, return (key_set, key_to_value_map)."""
    tree = ET.parse(path)
    root = tree.getroot()
    keys = set()
    key_to_value = {}
    for elem in root:
        name = elem.get("name")
        if name:
            keys.add(name)
            key_to_value[name] = elem.text or ""
    return keys, key_to_value


def get_android_locales() -> list[str]:
    """Get all Android locale directories."""
    res_dir = ROOT / "android-app/app/src/main/res"
    locales = []
    for d in res_dir.iterdir():
        if d.is_dir() and d.name.startswith("values-"):
            qualifier = d.name.replace("values-", "", 1)
            if qualifier not in ("night",):
                locales.append(qualifier)
    return sorted(locales)


def is_english_copy(text: str, threshold: float = 0.85) -> bool:
    """Detect if text appears to be English copied verbatim (not translated)."""
    if not text:
        return False

    text_lower = text.lower().strip()

    # Skip placeholders and format strings
    if "%" in text or "[SPEC" in text or "${" in text:
        return False

    # Skip very short strings (single words like "Save", "Cancel" could be same in many languages)
    if len(text.split()) <= 2:
        return False

    # Check for English-specific patterns
    english_patterns = [
        r"^\d+\s*(days?|today| tomorrow| yesterday)$",
        r"^(day|cycle|period|week|month)\s+\d+",
        r"^(very\s+)?(bad|good|regular|irregular)$",
        r"^(hot\s+flash|night\s+sweats|vaginal\s+dryness)$",
        r"^(std\.?\s*deviation|perimenopause|follicular|luteal)$",
    ]

    for pattern in english_patterns:
        if re.match(pattern, text_lower):
            return True

    # Check if all words are common English words (crude heuristic)
    common_english = {
        "the",
        "a",
        "an",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "could",
        "should",
        "may",
        "might",
        "must",
        "shall",
        "can",
        "need",
        "to",
        "of",
        "in",
        "for",
        "on",
        "with",
        "at",
        "by",
        "from",
        "as",
        "into",
        "through",
        "during",
        "before",
        "after",
        "above",
        "below",
        "between",
        "under",
        "again",
        "further",
        "then",
        "once",
        "here",
        "there",
        "when",
        "where",
        "why",
        "how",
        "all",
        "each",
        "few",
        "more",
        "most",
        "other",
        "some",
        "such",
        "no",
        "nor",
        "not",
        "only",
        "own",
        "same",
        "so",
        "than",
        "too",
        "very",
        "just",
        "and",
        "but",
        "if",
        "or",
        "because",
        "until",
        "while",
        "this",
        "that",
        "these",
        "those",
        "i",
        "me",
        "my",
        "myself",
        "we",
        "our",
        "ours",
        "ourselves",
        "you",
        "your",
        "yours",
        "yourself",
        "yourselves",
        "he",
        "him",
        "his",
        "himself",
        "she",
        "her",
        "hers",
        "herself",
        "it",
        "its",
        "itself",
        "they",
        "them",
        "their",
        "theirs",
        "themselves",
        "what",
        "which",
        "who",
        "whom",
        "open",
        "tap",
        "today",
        "log",
        "save",
        "cancel",
        "next",
        "back",
        "skip",
        "start",
        "stop",
        "period",
        "cycle",
        "fertile",
        "window",
        "expected",
        "days",
        "your",
        "data",
        "local",
        "stored",
        "device",
        "app",
        "name",
        "optional",
        "privacy",
        "protected",
        "never",
        "leaves",
        "phone",
        "lock",
        "face",
        "id",
        "fingerprint",
        "pin",
        "digits",
        "confirm",
        "match",
        "unlock",
        "vault",
        "wrong",
        "attempts",
        "remaining",
        "locked",
        "emergency",
        "wipe",
        "version",
        "about",
        "no",
        "server",
        "tracker",
        "open",
        "source",
        "transmits",
        "encryption",
        "good",
        "morning",
        "afternoon",
        "evening",
    }

    words = re.findall(r"[a-zA-Z']+", text_lower)
    if not words:
        return False

    english_word_count = sum(1 for w in words if w in common_english)
    ratio = english_word_count / len(words)

    return ratio >= threshold


def analyze_ios_locale(locale: str, source_locale: str = "fr") -> LocaleStatus:
    """Analyze iOS locale for completeness and fake translations.

    Note: iOS source language is French (fr), not English.
    iOS states: "translated", "needs_review", "new", "missing"
    - "needs_review" means the translation is incomplete/placeholder
    """
    data = load_ios_strings()
    strings = data.get("strings", {})
    ios_source_lang = data.get("sourceLanguage", "fr")

    status = LocaleStatus(
        locale=locale,
        platform="iOS",
        source_lang=ios_source_lang,
        total_keys=len(strings),
        complete_keys=0,
    )

    for key, entry in strings.items():
        locs = entry.get("localizations", {})

        if locale not in locs:
            status.missing_keys.append(key)
            continue

        locale_data = locs[locale]
        string_unit = locale_data.get("stringUnit", {})
        state = string_unit.get("state", "")
        value = string_unit.get("value", "")

        # Check if missing/placeholder (needs_review means untranslated placeholder)
        if state in ("new", "needs_review", "missing"):
            status.missing_keys.append(key)
            continue

        status.complete_keys += 1

        # For non-source locales, check if source text was copied verbatim
        # (fake translation - English text left in non-English locale)
        if locale != ios_source_lang and ios_source_lang in locs:
            source_value = locs[ios_source_lang].get("stringUnit", {}).get("value", "")
            # Flag if value matches source AND appears to be an English copy
            # Skip short strings that might coincidentally match
            if (
                source_value
                and value == source_value
                and len(value.split()) > 2
                and is_english_copy(source_value)
            ):
                status.fake_translations.append(key)

    status.shippable = (
        len(status.missing_keys) == 0 and len(status.fake_translations) == 0
    )

    if not status.shippable:
        if status.missing_keys:
            status.issues.append(
                f"Missing/placeholder keys: {len(status.missing_keys)}"
            )
        if status.fake_translations:
            status.issues.append(f"Fake translations: {len(status.fake_translations)}")

    return status


def analyze_android_locale(locale: str, source_locale: str = "en") -> LocaleStatus:
    """Analyze Android locale for completeness and fake translations."""
    res_dir = ROOT / "android-app/app/src/main/res"
    source_file = res_dir / "values/strings.xml"
    locale_file = res_dir / f"values-{locale}/strings.xml"

    status = LocaleStatus(
        locale=locale,
        platform="Android",
        source_lang=source_locale,
        total_keys=0,
        complete_keys=0,
    )

    if not source_file.exists():
        status.issues.append("Source strings.xml not found")
        return status

    source_keys, source_values = _parse_android_strings(source_file)
    status.total_keys = len(source_keys)

    if not locale_file.exists():
        status.missing_keys = list(source_keys)
        status.shippable = False
        status.issues.append("Locale file does not exist")
        return status

    locale_keys, locale_values = _parse_android_strings(locale_file)

    # Check for missing keys
    for key in source_keys:
        if key not in locale_keys:
            status.missing_keys.append(key)
        else:
            status.complete_keys += 1

            # Check for fake translation
            source_val = source_values.get(key, "")
            locale_val = locale_values.get(key, "")

            if locale_val and source_val == locale_val and is_english_copy(source_val):
                status.fake_translations.append(key)

    status.shippable = (
        len(status.missing_keys) == 0 and len(status.fake_translations) == 0
    )

    if not status.shippable:
        if status.missing_keys:
            status.issues.append(f"Missing keys: {len(status.missing_keys)}")
        if status.fake_translations:
            status.issues.append(f"Fake translations: {len(status.fake_translations)}")

    return status


def generate_report(verbose: bool = False, json_output: bool = False) -> dict:
    """Generate comprehensive i18n shippability report."""
    ios_shipped = load_ios_shipped_locales()

    results = {
        "generated_at": str(Path(__file__).resolve()),
        "ios_declared_shipped": ios_shipped,
        "android_available": get_android_locales(),
        "ios_locales": {},
        "android_locales": {},
        "summary": {
            "total_locales": 0,
            "shippable": [],
            "not_shippable": [],
        },
    }

    # Analyze iOS locales
    ios_data = load_ios_strings()
    all_ios_locales = set()
    for entry in ios_data.get("strings", {}).values():
        all_ios_locales.update(entry.get("localizations", {}).keys())

    for locale in sorted(all_ios_locales):
        status = analyze_ios_locale(locale)
        results["ios_locales"][locale] = asdict(status)

        if locale in ios_shipped:
            results["summary"]["total_locales"] += 1
            if status.shippable:
                results["summary"]["shippable"].append(f"iOS:{locale}")
            else:
                results["summary"]["not_shippable"].append(f"iOS:{locale}")

    # Analyze Android locales
    for locale in get_android_locales():
        status = analyze_android_locale(locale)
        results["android_locales"][locale] = asdict(status)
        results["summary"]["total_locales"] += 1

        if status.shippable:
            results["summary"]["shippable"].append(f"Android:{locale}")
        else:
            results["summary"]["not_shippable"].append(f"Android:{locale}")

    return results


def print_report(report: dict, verbose: bool = False):
    """Print human-readable report."""
    print("=" * 70)
    print("LUNA i18n SHIPPABLE LOCALES REPORT")
    print("=" * 70)

    print(f"\niOS Declared Shipped: {', '.join(report['ios_declared_shipped'])}")
    print(f"Android Available: {len(report['android_available'])} locales")

    print("\n" + "-" * 70)
    print("SHIPABLE LOCALES (no fake translations, no missing keys)")
    print("-" * 70)

    for item in report["summary"]["shippable"]:
        print(f"  [OK] {item}")

    print("\n" + "-" * 70)
    print("NOT SHIPPABLE LOCALES (issues found)")
    print("-" * 70)

    for item in report["summary"]["not_shippable"]:
        platform, locale = item.split(":")
        locale_data = report[f"{platform.lower()}_locales"][locale]
        print(f"  [FAIL] {item}")
        if verbose:
            for issue in locale_data.get("issues", []):
                print(f"        - {issue}")
            if locale_data.get("fake_translations"):
                print(
                    f"        - Fake translations: {locale_data['fake_translations'][:3]}..."
                )
            if locale_data.get("missing_keys"):
                print(
                    f"        - Missing keys: {len(locale_data['missing_keys'])} keys"
                )

    print("\n" + "-" * 70)
    print("DETAILED iOS LOCALE STATUS")
    print("-" * 70)
    for locale, data in sorted(report["ios_locales"].items()):
        status_icon = "OK" if data["shippable"] else "FAIL"
        print(
            f"  [{status_icon}] iOS:{locale} ({data['complete_keys']}/{data['total_keys']} keys)"
        )
        if not data["shippable"] and verbose:
            if data["missing_keys"]:
                print(f"        Missing: {', '.join(data['missing_keys'][:5])}...")
            if data["fake_translations"]:
                print(f"        Fakes: {', '.join(data['fake_translations'])}")

    print("\n" + "-" * 70)
    print("DETAILED ANDROID LOCALE STATUS (top issues)")
    print("-" * 70)

    android_issues = []
    for locale, data in report["android_locales"].items():
        if not data["shippable"]:
            android_issues.append((locale, data))

    android_issues.sort(
        key=lambda x: (
            len(x[1].get("missing_keys", [])),
            len(x[1].get("fake_translations", [])),
        ),
        reverse=True,
    )

    for locale, data in android_issues[:15]:
        missing = len(data.get("missing_keys", []))
        fakes = len(data.get("fake_translations", []))
        print(f"  [FAIL] Android:{locale}")
        print(f"         Missing: {missing}, Fakes: {fakes}")
        if verbose:
            for issue in data.get("issues", []):
                print(f"         - {issue}")

    print("\n" + "=" * 70)
    print(f"SHIPPABLE: {len(report['summary']['shippable'])} locales")
    print(f"NOT SHIPPABLE: {len(report['summary']['not_shippable'])} locales")
    print("=" * 70)


def main() -> int:
    import argparse

    parser = argparse.ArgumentParser(description="i18n shippable locales validation")
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show detailed issues"
    )
    parser.add_argument(
        "--json-output", "-j", action="store_true", help="Output JSON to stdout"
    )
    args = parser.parse_args()

    try:
        report = generate_report()
    except FileNotFoundError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    if args.json_output:
        print(json.dumps(report, indent=2))
    else:
        print_report(report, verbose=args.verbose)

    return 0


if __name__ == "__main__":
    sys.exit(main())
