/**
 * i18n.js — Luna web app locale setup (svelte-i18n)
 * Registers all 47 locales; missing translation files silently fall back to English.
 */
import { register, init, locale, getLocaleFromNavigator } from 'svelte-i18n';
import { browser } from '$app/environment';

export const ALL_LOCALES = [
  'ar','bg','bn','ca','cs','da','de','el','en','es','et','fa','fi','fil',
  'fr','he','hi','hr','hu','id','it','ja','ka','ko','lt','lv','mk','ms',
  'nb','nl','pl','pt','pt-BR','ro','ru','sk','sl','sr','sv','sw','th',
  'tr','uk','ur','vi','zh','zh-TW',
];

export const RTL_LOCALES = ['ar', 'fa', 'he', 'ur'];

// Locale display names
export const LOCALES = [
  { code: 'ar', label: 'العربية' },
  { code: 'bg', label: 'Български' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'ca', label: 'Català' },
  { code: 'cs', label: 'Čeština' },
  { code: 'da', label: 'Dansk' },
  { code: 'de', label: 'Deutsch' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'et', label: 'Eesti' },
  { code: 'fa', label: 'فارسی' },
  { code: 'fi', label: 'Suomi' },
  { code: 'fil', label: 'Filipino' },
  { code: 'fr', label: 'Français' },
  { code: 'he', label: 'עברית' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'hu', label: 'Magyar' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ka', label: 'ქართული' },
  { code: 'ko', label: '한국어' },
  { code: 'lt', label: 'Lietuvių' },
  { code: 'lv', label: 'Latviešu' },
  { code: 'mk', label: 'Македонски' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'nb', label: 'Norsk bokmål' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pl', label: 'Polski' },
  { code: 'pt', label: 'Português' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'ro', label: 'Română' },
  { code: 'ru', label: 'Русский' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'sr', label: 'Српски' },
  { code: 'sv', label: 'Svenska' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'th', label: 'ไทย' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'uk', label: 'Українська' },
  { code: 'ur', label: 'اردو' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'zh', label: '中文' },
  { code: 'zh-TW', label: '中文 (繁體)' },
];

ALL_LOCALES.forEach((code) => {
  register(code, async () => {
    try {
      return (await import(`./locales/${code}.json`)).default;
    } catch {
      return {};
    }
  });
});

let _initDone = false;

function ensureI18n() {
  if (_initDone) return;
  _initDone = true;
  init({ fallbackLocale: 'en', initialLocale: 'en' });
}

ensureI18n();

export function setupI18n() {
  ensureI18n();
}

function matchLocale(navLang) {
  if (!navLang) return 'en';
  if (ALL_LOCALES.includes(navLang)) return navLang;
  const base = navLang.split('-')[0];
  if (ALL_LOCALES.includes(base)) return base;
  return 'en';
}

export function detectLocale() {
  if (!browser) return 'en';
  const stored = localStorage.getItem('luna_locale');
  if (stored && ALL_LOCALES.includes(stored)) return stored;
  return matchLocale(navigator.language);
}

export function setLocale(l) {
  if (!ALL_LOCALES.includes(l)) return;
  locale.set(l);
  if (browser) {
    localStorage.setItem('luna_locale', l);
    document.documentElement.dir = RTL_LOCALES.includes(l) ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  }
}

export { locale };
