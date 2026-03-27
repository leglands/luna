#!/usr/bin/env python3
"""
check_i18n.py — production i18n audit.

Fails CI when a shipped locale is incomplete or when reviewed store metadata
still contains inflated locale-support claims.
"""

from __future__ import annotations

import json
import plistlib
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).parent.parent
IOS_REVIEWED_STORE_LOCALES = ["en-US", "fr-FR"]
ANDROID_REVIEWED_STORE_LOCALES = ["en-US"]
CLAIM_PATTERNS = [
    re.compile(r"\b40\+?\s+languages\b", re.I),
    re.compile(r"\b40\+?\s+langues\b", re.I),
    re.compile(r"\b40\+?\s+idiomas\b", re.I),
    re.compile(r"\b40\+?\s+Sprachen\b", re.I),
    re.compile(r"支持\s*40\+?\s*种语言"),
]


def load_ios_shipped_locales() -> list[str]:
    info_plist = ROOT / "ios-app/LunaApp/Info.plist"
    if not info_plist.exists():
        return []
    with open(info_plist, "rb") as handle:
        data = plistlib.load(handle)
    return sorted(data.get("CFBundleLocalizations", []))


def load_android_shipped_locales() -> list[str]:
    gradle_file = ROOT / "android-app/app/build.gradle.kts"
    if not gradle_file.exists():
        return []

    text = gradle_file.read_text(encoding="utf-8")
    match = re.search(
        r"resourceConfigurations\s*\+=\s*listOf\((.*?)\)",
        text,
        re.S,
    )
    if match:
        return sorted(re.findall(r'"([^"]+)"', match.group(1)))

    if "resourceConfigurations += shippedAndroidLocaleConfigurations()" in text:
        res_dir = ROOT / "android-app/app/src/main/res"
        source_file = res_dir / "values/strings.xml"
        if not source_file.exists():
            return []
        source_keys = _parse_android_strings(source_file)
        locales = ["en"]
        for locale_dir in sorted(d for d in res_dir.iterdir() if d.name.startswith("values-")):
            strings_file = locale_dir / "strings.xml"
            if not strings_file.exists():
                continue
            qualifier = locale_dir.name.replace("values-", "", 1)
            if qualifier == "night":
                continue
            locale_keys = _parse_android_strings(strings_file)
            if source_keys.issubset(locale_keys):
                locales.append(qualifier)
        return sorted(set(locales))

    return []


def load_ios_strings() -> dict:
    xcstrings_path = ROOT / "ios-app/LunaApp/Resources/Localizable.xcstrings"
    if not xcstrings_path.exists():
        raise FileNotFoundError(xcstrings_path)
    with open(xcstrings_path, encoding="utf-8") as handle:
        return json.load(handle)


def check_ios_strings(locales: list[str]) -> list[str]:
    if not locales:
        return ["iOS: no shipped locales declared in Info.plist"]

    data = load_ios_strings()
    strings = data.get("strings", {})
    catalog_locales = sorted(
        {
            locale
            for entry in strings.values()
            for locale in entry.get("localizations", {})
        }
    )
    errors = []

    if catalog_locales != sorted(locales):
        errors.append(
            "iOS: Localizable.xcstrings locales do not match Info.plist shipped locales "
            f"(catalog={catalog_locales}, plist={sorted(locales)})"
        )

    for key, entry in strings.items():
        locs = entry.get("localizations", {})
        for locale in locales:
            if locale not in locs:
                errors.append(f"iOS/{locale}: missing key '{key}'")

    return errors


def _parse_android_strings(path: Path) -> set[str]:
    tree = ET.parse(path)
    root = tree.getroot()
    return {elem.get("name") for elem in root if elem.get("name")}


def check_android_strings(locales: list[str]) -> tuple[list[str], list[tuple[str, int]]]:
    if not locales:
        return (["Android: no shipped locales declared in build.gradle.kts"], [])

    res_dir = ROOT / "android-app/app/src/main/res"
    source_file = res_dir / "values/strings.xml"
    if not source_file.exists():
        return ([f"Missing Android source file: {source_file}"], [])

    source_keys = _parse_android_strings(source_file)
    errors: list[str] = []
    backlog: list[tuple[str, int]] = []

    for locale_dir in sorted(d for d in res_dir.iterdir() if d.name.startswith("values-")):
        strings_file = locale_dir / "strings.xml"
        if not strings_file.exists():
            continue

        qualifier = locale_dir.name.replace("values-", "", 1)
        locale_keys = _parse_android_strings(strings_file)
        missing = len(source_keys - locale_keys)

        if qualifier in locales:
            if missing:
                errors.append(f"Android/{qualifier}: {missing} missing keys")
        elif missing:
            backlog.append((qualifier, missing))

    return (errors, sorted(backlog, key=lambda item: (-item[1], item[0])))


def count_docs_readmes() -> int:
    return len(list((ROOT / "docs/i18n").glob("README_*.md")))


def check_reviewed_store_metadata() -> list[str]:
    errors: list[str] = []

    ios_root = ROOT / "fastlane/metadata/ios"
    for locale in IOS_REVIEWED_STORE_LOCALES:
        locale_dir = ios_root / locale
        if not locale_dir.exists():
            errors.append(f"iOS metadata locale missing: {locale}")
            continue
        for file_name in ["description.txt", "release_notes.txt", "promotional_text.txt"]:
            path = locale_dir / file_name
            if not path.exists():
                continue
            text = path.read_text(encoding="utf-8")
            for pattern in CLAIM_PATTERNS:
                if pattern.search(text):
                    errors.append(f"Inflated locale claim in {path}")
                    break

    android_root = ROOT / "fastlane/metadata/android"
    for locale in ANDROID_REVIEWED_STORE_LOCALES:
        locale_dir = android_root / locale
        if not locale_dir.exists():
            errors.append(f"Android metadata locale missing: {locale}")
            continue
        for file_name in ["full_description.txt", "short_description.txt"]:
            path = locale_dir / file_name
            if not path.exists():
                continue
            text = path.read_text(encoding="utf-8")
            for pattern in CLAIM_PATTERNS:
                if pattern.search(text):
                    errors.append(f"Inflated locale claim in {path}")
                    break

    return errors


def main() -> int:
    ios_locales = load_ios_shipped_locales()
    android_locales = load_android_shipped_locales()

    ios_errors = check_ios_strings(ios_locales)
    android_errors, android_backlog = check_android_strings(android_locales)
    metadata_errors = check_reviewed_store_metadata()
    all_errors = ios_errors + android_errors + metadata_errors

    if all_errors:
        print(f"\n{len(all_errors)} blocking i18n issue(s):")
        for error in all_errors:
            print(f" • {error}")
        print()
        return 1

    print(
        "i18n: shipped locales complete "
        f"(iOS: {', '.join(ios_locales)}; Android: {', '.join(android_locales)})."
    )
    print(f"note: docs README translations available: {count_docs_readmes()} localized files.")
    print(
        "note: reviewed store metadata locales — "
        f"iOS: {len(IOS_REVIEWED_STORE_LOCALES)}, Android: {len(ANDROID_REVIEWED_STORE_LOCALES)}."
    )
    if android_backlog:
        total_missing = sum(count for _, count in android_backlog)
        preview = ", ".join(f"{locale}:{count}" for locale, count in android_backlog[:5])
        print(
            "note: Android backlog scaffolds remain incomplete — "
            f"{len(android_backlog)} locale(s), {total_missing} missing key(s) "
            f"(top: {preview})."
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
