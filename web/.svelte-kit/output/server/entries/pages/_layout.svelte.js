import { h as head, e as escape_html, s as store_get, a as attr, b as stringify, c as ensure_array_like, u as unsubscribe_stores } from "../../chunks/index2.js";
import { d as derived, w as writable } from "../../chunks/index.js";
import deepmerge from "deepmerge";
import { IntlMessageFormat } from "intl-messageformat";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function delve(obj, fullKey) {
  if (fullKey == null)
    return void 0;
  if (fullKey in obj) {
    return obj[fullKey];
  }
  const keys = fullKey.split(".");
  let result = obj;
  for (let p = 0; p < keys.length; p++) {
    if (typeof result === "object") {
      if (p > 0) {
        const partialKey = keys.slice(p, keys.length).join(".");
        if (partialKey in result) {
          result = result[partialKey];
          break;
        }
      }
      result = result[keys[p]];
    } else {
      result = void 0;
    }
  }
  return result;
}
const lookupCache = {};
const addToCache = (path, locale, message) => {
  if (!message)
    return message;
  if (!(locale in lookupCache))
    lookupCache[locale] = {};
  if (!(path in lookupCache[locale]))
    lookupCache[locale][path] = message;
  return message;
};
const lookup = (path, refLocale) => {
  if (refLocale == null)
    return void 0;
  if (refLocale in lookupCache && path in lookupCache[refLocale]) {
    return lookupCache[refLocale][path];
  }
  const locales = getPossibleLocales(refLocale);
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const message = getMessageFromDictionary(locale, path);
    if (message) {
      return addToCache(path, refLocale, message);
    }
  }
  return void 0;
};
let dictionary;
const $dictionary = writable({});
function getLocaleDictionary(locale) {
  return dictionary[locale] || null;
}
function hasLocaleDictionary(locale) {
  return locale in dictionary;
}
function getMessageFromDictionary(locale, id) {
  if (!hasLocaleDictionary(locale)) {
    return null;
  }
  const localeDictionary = getLocaleDictionary(locale);
  const match = delve(localeDictionary, id);
  return match;
}
function getClosestAvailableLocale(refLocale) {
  if (refLocale == null)
    return void 0;
  const relatedLocales = getPossibleLocales(refLocale);
  for (let i = 0; i < relatedLocales.length; i++) {
    const locale = relatedLocales[i];
    if (hasLocaleDictionary(locale)) {
      return locale;
    }
  }
  return void 0;
}
function addMessages(locale, ...partials) {
  delete lookupCache[locale];
  $dictionary.update((d) => {
    d[locale] = deepmerge.all([d[locale] || {}, ...partials]);
    return d;
  });
}
derived(
  [$dictionary],
  ([dictionary2]) => Object.keys(dictionary2)
);
$dictionary.subscribe((newDictionary) => dictionary = newDictionary);
const queue = {};
function createLocaleQueue(locale) {
  queue[locale] = /* @__PURE__ */ new Set();
}
function removeLoaderFromQueue(locale, loader) {
  queue[locale].delete(loader);
  if (queue[locale].size === 0) {
    delete queue[locale];
  }
}
function getLocaleQueue(locale) {
  return queue[locale];
}
function getLocalesQueues(locale) {
  return getPossibleLocales(locale).map((localeItem) => {
    const localeQueue = getLocaleQueue(localeItem);
    return [localeItem, localeQueue ? [...localeQueue] : []];
  }).filter(([, localeQueue]) => localeQueue.length > 0);
}
function hasLocaleQueue(locale) {
  if (locale == null)
    return false;
  return getPossibleLocales(locale).some(
    (localeQueue) => {
      var _a;
      return (_a = getLocaleQueue(localeQueue)) == null ? void 0 : _a.size;
    }
  );
}
function loadLocaleQueue(locale, localeQueue) {
  const allLoadersPromise = Promise.all(
    localeQueue.map((loader) => {
      removeLoaderFromQueue(locale, loader);
      return loader().then((partial) => partial.default || partial);
    })
  );
  return allLoadersPromise.then((partials) => addMessages(locale, ...partials));
}
const activeFlushes = {};
function flush(locale) {
  if (!hasLocaleQueue(locale)) {
    if (locale in activeFlushes) {
      return activeFlushes[locale];
    }
    return Promise.resolve();
  }
  const queues = getLocalesQueues(locale);
  activeFlushes[locale] = Promise.all(
    queues.map(
      ([localeName, localeQueue]) => loadLocaleQueue(localeName, localeQueue)
    )
  ).then(() => {
    if (hasLocaleQueue(locale)) {
      return flush(locale);
    }
    delete activeFlushes[locale];
  });
  return activeFlushes[locale];
}
function registerLocaleLoader(locale, loader) {
  if (!getLocaleQueue(locale))
    createLocaleQueue(locale);
  const localeQueue = getLocaleQueue(locale);
  if (getLocaleQueue(locale).has(loader))
    return;
  if (!hasLocaleDictionary(locale)) {
    $dictionary.update((d) => {
      d[locale] = {};
      return d;
    });
  }
  localeQueue.add(loader);
}
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultFormats = {
  number: {
    scientific: { notation: "scientific" },
    engineering: { notation: "engineering" },
    compactLong: { notation: "compact", compactDisplay: "long" },
    compactShort: { notation: "compact", compactDisplay: "short" }
  },
  date: {
    short: { month: "numeric", day: "numeric", year: "2-digit" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  },
  time: {
    short: { hour: "numeric", minute: "numeric" },
    medium: { hour: "numeric", minute: "numeric", second: "numeric" },
    long: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    },
    full: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    }
  }
};
function defaultMissingKeyHandler({ locale, id }) {
  console.warn(
    `[svelte-i18n] The message "${id}" was not found in "${getPossibleLocales(
      locale
    ).join('", "')}".${hasLocaleQueue(getCurrentLocale()) ? `

Note: there are at least one loader still registered to this locale that wasn't executed.` : ""}`
  );
}
const defaultOptions = {
  fallbackLocale: null,
  loadingDelay: 200,
  formats: defaultFormats,
  warnOnMissingMessages: true,
  handleMissingMessage: void 0,
  ignoreTag: true
};
const options = defaultOptions;
function getOptions() {
  return options;
}
function init(opts) {
  const _a = opts, { formats } = _a, rest = __objRest$1(_a, ["formats"]);
  let initialLocale = opts.fallbackLocale;
  if (opts.initialLocale) {
    try {
      if (IntlMessageFormat.resolveLocale(opts.initialLocale)) {
        initialLocale = opts.initialLocale;
      }
    } catch (e) {
      console.warn(
        `[svelte-i18n] The initial locale "${opts.initialLocale}" is not a valid locale.`
      );
    }
  }
  if (rest.warnOnMissingMessages) {
    delete rest.warnOnMissingMessages;
    if (rest.handleMissingMessage == null) {
      rest.handleMissingMessage = defaultMissingKeyHandler;
    } else {
      console.warn(
        '[svelte-i18n] The "warnOnMissingMessages" option is deprecated. Please use the "handleMissingMessage" option instead.'
      );
    }
  }
  Object.assign(options, rest, { initialLocale });
  if (formats) {
    if ("number" in formats) {
      Object.assign(options.formats.number, formats.number);
    }
    if ("date" in formats) {
      Object.assign(options.formats.date, formats.date);
    }
    if ("time" in formats) {
      Object.assign(options.formats.time, formats.time);
    }
  }
  return $locale.set(initialLocale);
}
const $isLoading = writable(false);
var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
let current;
const internalLocale = writable(null);
function getSubLocales(refLocale) {
  return refLocale.split("-").map((_, i, arr) => arr.slice(0, i + 1).join("-")).reverse();
}
function getPossibleLocales(refLocale, fallbackLocale = getOptions().fallbackLocale) {
  const locales = getSubLocales(refLocale);
  if (fallbackLocale) {
    return [.../* @__PURE__ */ new Set([...locales, ...getSubLocales(fallbackLocale)])];
  }
  return locales;
}
function getCurrentLocale() {
  return current != null ? current : void 0;
}
internalLocale.subscribe((newLocale) => {
  current = newLocale != null ? newLocale : void 0;
  if (typeof window !== "undefined" && newLocale != null) {
    document.documentElement.setAttribute("lang", newLocale);
  }
});
const set = (newLocale) => {
  if (newLocale && getClosestAvailableLocale(newLocale) && hasLocaleQueue(newLocale)) {
    const { loadingDelay } = getOptions();
    let loadingTimer;
    if (typeof window !== "undefined" && getCurrentLocale() != null && loadingDelay) {
      loadingTimer = window.setTimeout(
        () => $isLoading.set(true),
        loadingDelay
      );
    } else {
      $isLoading.set(true);
    }
    return flush(newLocale).then(() => {
      internalLocale.set(newLocale);
    }).finally(() => {
      clearTimeout(loadingTimer);
      $isLoading.set(false);
    });
  }
  return internalLocale.set(newLocale);
};
const $locale = __spreadProps(__spreadValues$1({}, internalLocale), {
  set
});
const monadicMemoize = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  const memoizedFn = (arg) => {
    const cacheKey = JSON.stringify(arg);
    if (cacheKey in cache) {
      return cache[cacheKey];
    }
    return cache[cacheKey] = fn(arg);
  };
  return memoizedFn;
};
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const getIntlFormatterOptions = (type, name) => {
  const { formats } = getOptions();
  if (type in formats && name in formats[type]) {
    return formats[type][name];
  }
  throw new Error(`[svelte-i18n] Unknown "${name}" ${type} format.`);
};
const createNumberFormatter = monadicMemoize(
  (_a) => {
    var _b = _a, { locale, format } = _b, options2 = __objRest(_b, ["locale", "format"]);
    if (locale == null) {
      throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
    }
    if (format) {
      options2 = getIntlFormatterOptions("number", format);
    }
    return new Intl.NumberFormat(locale, options2);
  }
);
const createDateFormatter = monadicMemoize(
  (_c) => {
    var _d = _c, { locale, format } = _d, options2 = __objRest(_d, ["locale", "format"]);
    if (locale == null) {
      throw new Error('[svelte-i18n] A "locale" must be set to format dates');
    }
    if (format) {
      options2 = getIntlFormatterOptions("date", format);
    } else if (Object.keys(options2).length === 0) {
      options2 = getIntlFormatterOptions("date", "short");
    }
    return new Intl.DateTimeFormat(locale, options2);
  }
);
const createTimeFormatter = monadicMemoize(
  (_e) => {
    var _f = _e, { locale, format } = _f, options2 = __objRest(_f, ["locale", "format"]);
    if (locale == null) {
      throw new Error(
        '[svelte-i18n] A "locale" must be set to format time values'
      );
    }
    if (format) {
      options2 = getIntlFormatterOptions("time", format);
    } else if (Object.keys(options2).length === 0) {
      options2 = getIntlFormatterOptions("time", "short");
    }
    return new Intl.DateTimeFormat(locale, options2);
  }
);
const getNumberFormatter = (_g = {}) => {
  var _h = _g, {
    locale = getCurrentLocale()
  } = _h, args = __objRest(_h, [
    "locale"
  ]);
  return createNumberFormatter(__spreadValues({ locale }, args));
};
const getDateFormatter = (_i = {}) => {
  var _j = _i, {
    locale = getCurrentLocale()
  } = _j, args = __objRest(_j, [
    "locale"
  ]);
  return createDateFormatter(__spreadValues({ locale }, args));
};
const getTimeFormatter = (_k = {}) => {
  var _l = _k, {
    locale = getCurrentLocale()
  } = _l, args = __objRest(_l, [
    "locale"
  ]);
  return createTimeFormatter(__spreadValues({ locale }, args));
};
const getMessageFormatter = monadicMemoize(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (message, locale = getCurrentLocale()) => new IntlMessageFormat(message, locale, getOptions().formats, {
    ignoreTag: getOptions().ignoreTag
  })
);
const formatMessage = (id, options2 = {}) => {
  var _a, _b, _c, _d;
  let messageObj = options2;
  if (typeof id === "object") {
    messageObj = id;
    id = messageObj.id;
  }
  const {
    values,
    locale = getCurrentLocale(),
    default: defaultValue
  } = messageObj;
  if (locale == null) {
    throw new Error(
      "[svelte-i18n] Cannot format a message without first setting the initial locale."
    );
  }
  let message = lookup(id, locale);
  if (!message) {
    message = (_d = (_c = (_b = (_a = getOptions()).handleMissingMessage) == null ? void 0 : _b.call(_a, { locale, id, defaultValue })) != null ? _c : defaultValue) != null ? _d : id;
  } else if (typeof message !== "string") {
    console.warn(
      `[svelte-i18n] Message with id "${id}" must be of type "string", found: "${typeof message}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`
    );
    return message;
  }
  if (!values) {
    return message;
  }
  let result = message;
  try {
    result = getMessageFormatter(message, locale).format(values);
  } catch (e) {
    if (e instanceof Error) {
      console.warn(
        `[svelte-i18n] Message "${id}" has syntax error:`,
        e.message
      );
    }
  }
  return result;
};
const formatTime = (t, options2) => {
  return getTimeFormatter(options2).format(t);
};
const formatDate = (d, options2) => {
  return getDateFormatter(options2).format(d);
};
const formatNumber = (n, options2) => {
  return getNumberFormatter(options2).format(n);
};
const getJSON = (id, locale = getCurrentLocale()) => {
  return lookup(id, locale);
};
derived([$locale, $dictionary], () => formatMessage);
derived([$locale], () => formatTime);
derived([$locale], () => formatDate);
derived([$locale], () => formatNumber);
derived([$locale, $dictionary], () => getJSON);
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const ALL_LOCALES = [
  "ar",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "et",
  "fa",
  "fi",
  "fil",
  "fr",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "ka",
  "ko",
  "lt",
  "lv",
  "mk",
  "ms",
  "nb",
  "nl",
  "pl",
  "pt",
  "pt-BR",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "sw",
  "th",
  "tr",
  "uk",
  "ur",
  "vi",
  "zh",
  "zh-TW"
];
ALL_LOCALES.forEach((code) => {
  registerLocaleLoader(code, async () => {
    try {
      return (await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./locales/ar.json": () => import("../../chunks/ar.js"), "./locales/bg.json": () => import("../../chunks/bg.js"), "./locales/bn.json": () => import("../../chunks/bn.js"), "./locales/ca.json": () => import("../../chunks/ca.js"), "./locales/cs.json": () => import("../../chunks/cs.js"), "./locales/da.json": () => import("../../chunks/da.js"), "./locales/de.json": () => import("../../chunks/de.js"), "./locales/el.json": () => import("../../chunks/el.js"), "./locales/en.json": () => import("../../chunks/en.js"), "./locales/es.json": () => import("../../chunks/es.js"), "./locales/et.json": () => import("../../chunks/et.js"), "./locales/fa.json": () => import("../../chunks/fa.js"), "./locales/fil.json": () => import("../../chunks/fil.js"), "./locales/fr.json": () => import("../../chunks/fr.js"), "./locales/he.json": () => import("../../chunks/he.js"), "./locales/hi.json": () => import("../../chunks/hi.js"), "./locales/hr.json": () => import("../../chunks/hr.js"), "./locales/hu.json": () => import("../../chunks/hu.js"), "./locales/id.json": () => import("../../chunks/id.js"), "./locales/it.json": () => import("../../chunks/it.js"), "./locales/ja.json": () => import("../../chunks/ja.js"), "./locales/ka.json": () => import("../../chunks/ka.js"), "./locales/ko.json": () => import("../../chunks/ko.js"), "./locales/lt.json": () => import("../../chunks/lt.js"), "./locales/lv.json": () => import("../../chunks/lv.js"), "./locales/mk.json": () => import("../../chunks/mk.js"), "./locales/ms.json": () => import("../../chunks/ms.js"), "./locales/nb.json": () => import("../../chunks/nb.js"), "./locales/nl.json": () => import("../../chunks/nl.js"), "./locales/pl.json": () => import("../../chunks/pl.js"), "./locales/pt-BR.json": () => import("../../chunks/pt-BR.js"), "./locales/pt.json": () => import("../../chunks/pt.js"), "./locales/ro.json": () => import("../../chunks/ro.js"), "./locales/ru.json": () => import("../../chunks/ru.js"), "./locales/sk.json": () => import("../../chunks/sk.js"), "./locales/sl.json": () => import("../../chunks/sl.js"), "./locales/sr.json": () => import("../../chunks/sr.js"), "./locales/sv.json": () => import("../../chunks/sv.js"), "./locales/sw.json": () => import("../../chunks/sw.js"), "./locales/th.json": () => import("../../chunks/th.js"), "./locales/tr.json": () => import("../../chunks/tr.js"), "./locales/uk.json": () => import("../../chunks/uk.js"), "./locales/ur.json": () => import("../../chunks/ur.js"), "./locales/vi.json": () => import("../../chunks/vi.js"), "./locales/zh-TW.json": () => import("../../chunks/zh-TW.js"), "./locales/zh.json": () => import("../../chunks/zh.js") }), `./locales/${code}.json`, 3)).default;
    } catch {
      return {};
    }
  });
});
let _initDone = false;
function setupI18n() {
  if (_initDone) return;
  _initDone = true;
  return init({ fallbackLocale: "en", initialLocale: "en" });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    setupI18n();
    const BASE_URL = "https://luna.macaron-software.com";
    const SEO_TITLE = {
      fr: "Luna — Ton cycle, compris",
      en: "Luna — Your cycle, understood",
      es: "Luna — Tu ciclo, comprendido",
      de: "Luna — Dein Zyklus, verstanden",
      it: "Luna — Il tuo ciclo, capito",
      pt: "Luna — O teu ciclo, compreendido",
      nl: "Luna — Jouw cyclus, begrepen",
      pl: "Luna — Twój cykl, zrozumiany",
      zh: "Luna — 了解您的月经周期",
      ja: "Luna — あなたのサイクルを理解する",
      ko: "Luna — 당신의 사이클을 이해하세요",
      ar: "Luna — افهمي دورتك الشهرية",
      ru: "Luna — Поймите свой менструальный цикл",
      hi: "Luna — अपने मासिक धर्म चक्र को समझें",
      tr: "Luna — Adet döngünüzü anlayın",
      uk: "Luna — Зрозумійте свій менструальний цикл"
    };
    const SEO_DESC = {
      fr: "Luna — Suis ton cycle menstruel, comprends ton corps et prédis ta prochaine période. Privé, chiffré, sans données envoyées.",
      en: "Luna — Track your menstrual cycle, understand your body and predict your next period. Private, encrypted, zero data sent.",
      es: "Luna — Sigue tu ciclo menstrual, comprende tu cuerpo y predice tu próximo período. Privado y cifrado.",
      de: "Luna — Verfolge deinen Menstruationszyklus, verstehe deinen Körper und sage deine nächste Periode vorher. Privat und verschlüsselt.",
      it: "Luna — Traccia il tuo ciclo mestruale, capisce il tuo corpo e prevedi il prossimo ciclo. Privato e cifrato.",
      pt: "Luna — Acompanha o teu ciclo menstrual, compreende o teu corpo e prevê o teu próximo período. Privado e cifrado.",
      zh: "Luna — 追踪您的月经周期，了解您的身体，预测下次月经。私密、加密、零数据发送。",
      ja: "Luna — 月経周期を記録し、体を理解し、次の生理を予測します。プライベート、暗号化済み。",
      ko: "Luna — 생리 주기를 추적하고, 몸을 이해하고, 다음 생리를 예측하세요. 프라이빗, 암호화.",
      ar: "Luna — تتبعي دورتك الشهرية، تفهمي جسمك وتوقعي دورتك التالية. خاص ومشفر.",
      ru: "Luna — Отслеживайте менструальный цикл, понимайте свое тело и предсказывайте следующие месячные. Конфиденциально.",
      hi: "Luna — मासिक धर्म चक्र को ट्रैक करें, शरीर को समझें और अगले मासिक धर्म की भविष्यवाणी करें।",
      tr: "Luna — Adet döngünüzü takip edin, vücudunuzu anlayın ve bir sonraki döneminizi tahmin edin.",
      uk: "Luna — Відстежуйте менструальний цикл, розумійте своє тіло та передбачайте наступні місячні."
    };
    const jsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Luna",
      description: SEO_DESC["en"],
      url: BASE_URL,
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android, Web",
      inLanguage: ALL_LOCALES,
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      publisher: {
        "@type": "Organization",
        name: "Macaron Software",
        url: "https://macaron-software.com"
      }
    });
    let { children } = $$props;
    head("12qhfyh", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(SEO_TITLE[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_TITLE["en"])}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", SEO_DESC[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_DESC["en"])}/> <link rel="canonical"${attr("href", BASE_URL)}/> <meta property="og:type" content="website"/> <meta property="og:url"${attr("content", BASE_URL)}/> <meta property="og:site_name" content="Luna"/> <meta property="og:title"${attr("content", SEO_TITLE[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_TITLE["en"])}/> <meta property="og:description"${attr("content", SEO_DESC[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_DESC["en"])}/> <meta property="og:image"${attr("content", `${stringify(BASE_URL)}/og-image.png`)}/> <meta property="og:locale"${attr("content", (store_get($$store_subs ??= {}, "$locale", $locale) ?? "en").replace("-", "_"))}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:title"${attr("content", SEO_TITLE[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_TITLE["en"])}/> <meta name="twitter:description"${attr("content", SEO_DESC[store_get($$store_subs ??= {}, "$locale", $locale) ?? "en"] ?? SEO_DESC["en"])}/> <meta name="twitter:image"${attr("content", `${stringify(BASE_URL)}/og-image.png`)}/> <!--[-->`);
      const each_array = ensure_array_like(ALL_LOCALES);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let lang = each_array[$$index];
        $$renderer3.push(`<link rel="alternate"${attr("hreflang", lang)}${attr("href", BASE_URL)}/>`);
      }
      $$renderer3.push(`<!--]--> <link rel="alternate" hreflang="x-default"${attr("href", BASE_URL)}/> ${html(`<script type="application/ld+json">${jsonLd}<\/script>`)}`);
    });
    children($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
