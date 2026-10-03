#!/usr/bin/env python3
"""Genere les pages legales statiques de Luna pour les 66 langues.

Sortie : static/<lang>/{privacy,terms,support}/index.html
Source : src/lib/legal/<lang>.json (clefs privacy/terms/support extraites des locales).

Pourquoi dans static/ : le site SvelteKit utilise adapter-static et copie static/
tel quel a chaque build. Les pages /xx/ font donc partie du deploiement normal du
site : rien a deployer a part, aucune dette, et le compteur de langues suit
automatiquement les fichiers legal/<lang>.json presents.

Usage : python3 scripts/gen-legal.py [--check]
  --check : ne valide que les sources (structure), n'ecrit rien.
"""
import json
import pathlib
import sys

WEB = pathlib.Path(__file__).resolve().parent.parent
LEGAL = WEB / "src/lib/legal"
STATIC = WEB / "static"
BASE = "https://luna.macaron-software.com"

ALL_LOCALES = [
    "am", "ar", "bg", "bn", "ca", "cs", "da", "de", "el", "en", "es", "es-MX",
    "fa", "fi", "fil", "fr", "fr-CA", "ha", "he", "hi", "hr", "hu", "hy", "id",
    "it", "ja", "ka", "km", "ko", "ku", "lo", "lt", "lv", "mr", "ms", "my",
    "nb", "ne", "nl", "pl", "ps", "pt", "pt-PT", "ro", "ru", "si", "sk", "sl",
    "so", "sq", "sr", "sv", "sw", "ta", "te", "th", "tl", "tr", "uk", "ur",
    "uz", "vi", "yo", "zh", "zh-CN", "zh-TW",
]
assert len(ALL_LOCALES) == 66, "liste canonique attendue : 66 locales"

LOCALE_NAMES = {
    "am": "አማርኛ", "ar": "العربية", "bg": "Български", "bn": "বাংলা", "ca": "Català",
    "cs": "Čeština", "da": "Dansk", "de": "Deutsch", "el": "Ελληνικά", "en": "English",
    "es": "Español", "es-MX": "Español (México)", "fa": "فارسی", "fi": "Suomi",
    "fil": "Filipino", "fr": "Français", "fr-CA": "Français (Canada)", "ha": "Hausa",
    "he": "עברית", "hi": "हिन्दी", "hr": "Hrvatski", "hu": "Magyar", "hy": "Հայերեն",
    "id": "Bahasa Indonesia", "it": "Italiano", "ja": "日本語", "ka": "ქართული",
    "km": "ខ្មែរ", "ko": "한국어", "ku": "Kurdî", "lo": "ລາວ", "lt": "Lietuvių",
    "lv": "Latviešu", "mr": "मराठी", "ms": "Bahasa Melayu", "my": "မြန်မာ",
    "nb": "Norsk bokmål", "ne": "नेपाली", "nl": "Nederlands", "pl": "Polski", "ps": "پښتو",
    "pt": "Português", "pt-PT": "Português (Portugal)", "ro": "Română", "ru": "Русский",
    "si": "සිංහල", "sk": "Slovenčina", "sl": "Slovenščina", "so": "Soomaali", "sq": "Shqip",
    "sr": "Српски", "sv": "Svenska", "sw": "Kiswahili", "ta": "தமிழ்", "te": "తెలుగు",
    "th": "ไทย", "tl": "Tagalog", "tr": "Türkçe", "uk": "Українська", "ur": "اردو",
    "uz": "Oʻzbekcha", "vi": "Tiếng Việt", "yo": "Yorùbá", "zh": "中文",
    "zh-CN": "简体中文", "zh-TW": "繁體中文",
}
assert set(LOCALE_NAMES) == set(ALL_LOCALES)

RTL = {"ar", "fa", "he", "ps", "ur", "ku"}
DOCS = ("privacy", "terms", "support")
CLES = {
    "privacy": ("title", "meta_title", "summary_device", "summary_no_sell", "summary_sync",
                "summary_delete", "full", "updated", "local_first", "no_trackers", "contact"),
    "terms": ("title", "meta_title", "point_tool", "point_data", "point_free", "point_open_source",
              "full", "updated", "body_no_advice", "body_as_is", "license"),
    "support": ("title", "help", "contact", "response_time"),
}

# Theme sobre calque sur les pages legales de l'ecosysteme (creme / encre),
# accent violet discret (lunaire). Changer l'accent = 1 ligne (--acc).
STYLE = """  <style>
    :root { --acc: #7B5EA7; color-scheme: light dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #FBF8F2; color: #241D16; line-height: 1.65; }
    header, main, footer { max-width: 760px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 16px;
      padding-top: 22px; padding-bottom: 18px; border-bottom: 1px solid #E9E1D4; }
    .brand { font-weight: 700; font-size: 17px; color: #241D16; text-decoration: none; letter-spacing: .2px; }
    nav.langs { font-size: 13px; letter-spacing: .04em; }
    nav.langs a { color: #6B5F52; text-decoration: none; }
    nav.langs a[aria-current="true"] { color: #241D16; font-weight: 600; }
    nav.langs span { color: #C9BCA9; padding: 0 6px; }
    main { padding-top: 36px; padding-bottom: 56px; }
    h1 { font-size: 27px; line-height: 1.25; margin: 0 0 6px; }
    p, li { font-size: 15px; }
    ul { padding-left: 20px; margin: 8px 0; }
    li { margin: 4px 0; }
    .meta { color: #8A7D6D; font-size: 13px; margin: 0 0 20px; }
    a { color: var(--acc); }
    .contact { border-top: 1px solid #E9E1D4; margin-top: 34px; padding-top: 16px; font-size: 14px; color: #4A4238; }
    .btn { display: inline-block; margin-top: 10px; padding: 10px 18px; border-radius: 10px;
      background: var(--acc); color: #fff; text-decoration: none; font-weight: 600; font-size: 15px; }
    footer { border-top: 1px solid #E9E1D4; padding-top: 18px; padding-bottom: 30px; color: #8A7D6D; font-size: 13px; }
    footer nav { margin: 0 0 8px; }
    footer a { color: #8A7D6D; text-decoration: none; }
    footer a:hover { color: var(--acc); }
    footer .sep { padding: 0 6px; color: #C9BCA9; }
    @media (prefers-color-scheme: dark) {
      body { background: #1C1712; color: #F4EEE4; }
      header, footer, .contact { border-color: #352C22; }
      .brand { color: #F4EEE4; }
      nav.langs a { color: #CBBFAE; }
      nav.langs a[aria-current="true"] { color: #F4EEE4; }
      nav.langs span { color: #5C5142; }
      .meta, footer { color: #B3A692; }
      a { color: #E29BC7; }
      .contact { color: #D9CFC0; }
      footer .sep { color: #5C5142; }
    }
  </style>
"""

PAGE = """<!doctype html>
<html lang="{lang}"{dir_attr}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#7B5EA7">
  <link rel="canonical" href="{canonical}">
{hreflang}  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
{style}</head>
<body>

<header>
  <a class="brand" href="{base}/">Luna</a>
  <nav class="langs" aria-label="{aria_lang}">
{nav}
  </nav>
</header>

{main}

<footer>
  <nav aria-label="{aria_legal_nav}">
    <a href="/{lang}/privacy/">{fl_privacy}</a><span class="sep">·</span><a href="/{lang}/terms/">{fl_terms}</a><span class="sep">·</span><a href="/{lang}/support/">{fl_support}</a>
  </nav>
  <p>Luna is operated by Macaron Software. Contact: <a href="mailto:support@macaron-software.com">support@macaron-software.com</a>.</p>
</footer>

</body>
</html>
"""


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def nav_block(lang, dispo):
    names = []
    for c in ALL_LOCALES:
        if c not in dispo:
            continue
        cur = ' aria-current="true"' if c == lang else ""
        names.append(f'<a href="/{c}/privacy/"{cur}>{LOCALE_NAMES[c]}</a>')
    return "    " + '<span>·</span>'.join(names)


def hreflang_block(dispo):
    out = []
    for c in ALL_LOCALES:
        if c not in dispo:
            continue
        for doc in DOCS:
            out.append(f'  <link rel="alternate" hreflang="{c}" href="{BASE}/{c}/{doc}/">')
    return "\n".join(out) + "\n"


def main_privacy(d):
    p = d["privacy"]
    lis = "".join(f"      <li>{esc(p[k])}</li>\n" for k in
                  ("summary_device", "summary_no_sell", "summary_sync", "summary_delete"))
    return (
        f'<main>\n  <h1>{esc(p["title"])}</h1>\n  <p class="meta">{esc(p["updated"])}</p>\n'
        f'  <ul>\n{lis}  </ul>\n'
        f'  <p>{esc(p["local_first"])}</p>\n  <p>{esc(p["no_trackers"])}</p>\n'
        f'  <p class="contact">{esc(p["contact"])} <a href="mailto:privacy@macaron-software.com">privacy@macaron-software.com</a></p>\n</main>')


def main_terms(d):
    t = d["terms"]
    lis = "".join(f"      <li>{esc(t[k])}</li>\n" for k in
                  ("point_tool", "point_data", "point_free", "point_open_source"))
    return (
        f'<main>\n  <h1>{esc(t["title"])}</h1>\n  <p class="meta">{esc(t["updated"])}</p>\n'
        f'  <ul>\n{lis}  </ul>\n'
        f'  <p>{esc(t["body_no_advice"])}</p>\n  <p>{esc(t["body_as_is"])}</p>\n'
        f'  <p class="contact">{esc(t["license"])} <a href="https://opensource.org/license/mit" target="_blank" rel="noopener">MIT</a> · <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener">Apache-2.0</a></p>\n</main>')


def main_support(d):
    s = d["support"]
    return (
        f'<main>\n  <h1>{esc(s["title"])}</h1>\n  <p>{esc(s["help"])}</p>\n'
        f'  <a class="btn" href="mailto:support@macaron-software.com">{esc(s["contact"])}</a>\n'
        f'  <p class="meta" style="margin-top:14px">{esc(s["response_time"])}</p>\n</main>')


MAINS = {"privacy": main_privacy, "terms": main_terms, "support": main_support}


def build(lang, d, dispo):
    for doc in DOCS:
        dd = d[doc]
        if doc == "support":
            title = f'{dd["title"]} · Luna'
            desc = f'{dd["title"]}. {dd.get("help", "")}'
        else:
            title = dd["meta_title"]
            desc = dd["meta_title"]
        main = MAINS[doc](d)
        nav = nav_block(lang, dispo)
        href = hreflang_block(dispo)
        dir_attr = ' dir="rtl"' if lang in RTL else ""
        out = PAGE.format(
            lang=lang, dir_attr=dir_attr, title=esc(title), description=esc(desc),
            canonical=f"{BASE}/{lang}/{doc}/", hreflang=href, style=STYLE, base=BASE, nav=nav,
            main=main,
            aria_lang={"ar": "اللغات", "fr": "Langues", "es": "Idiomas"}.get(lang, "Languages"),
            aria_legal_nav={"ar": "قانوني", "fr": "Informations légales", "es": "Información legal"}.get(lang, "Legal"),
            fl_privacy=d["privacy"]["title"], fl_terms=d["terms"]["title"], fl_support=d["support"]["title"])
        dest = STATIC / lang / doc
        dest.mkdir(parents=True, exist_ok=True)
        (dest / "index.html").write_text(out, encoding="utf-8")


def main():
    check = "--check" in sys.argv
    dispo = [c for c in ALL_LOCALES if (LEGAL / f"{c}.json").exists()]
    manquantes = [c for c in ALL_LOCALES if c not in dispo]
    mauvais = []
    for c in dispo:
        d = json.loads((LEGAL / f"{c}.json").read_text(encoding="utf-8"))
        for doc in DOCS:
            for k in CLES[doc]:
                if not d.get(doc, {}).get(k):
                    mauvais.append(f"{c}/{doc}/{k}")
    if mauvais:
        print(f"CONTROLE KO : {len(mauvais)} cles manquantes -> {mauvais[:6]}")
        raise SystemExit(1)
    print(f"sources OK : {len(dispo)}/66 langues completes")
    if check:
        return
    for c in dispo:
        d = json.loads((LEGAL / f"{c}.json").read_text(encoding="utf-8"))
        build(c, d, set(dispo))
    print(f"genere : {len(dispo)} langues x 3 pages = {len(dispo) * 3} fichiers dans static/")
    if manquantes:
        print(f"en attente ({len(manquantes)}) : {' '.join(manquantes)}")


if __name__ == "__main__":
    main()
