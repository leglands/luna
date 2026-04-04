import { g as getContext, a as attr_class, b as attr, e as ensure_array_like, c as escape_html, d as derived$1, s as stringify, f as attr_style, h as head, i as store_get, u as unsubscribe_stores } from "../../chunks/root.js";
import { d as derived, w as writable } from "../../chunks/index.js";
import deepmerge from "deepmerge";
import { IntlMessageFormat } from "intl-messageformat";
import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { g as goto } from "../../chunks/client.js";
import { I as Icon } from "../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
/* empty css                                                        */
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
const $format = derived([$locale, $dictionary], () => formatMessage);
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
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function TabBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      tabs = [],
      activeTab = "",
      activeIndex = 0,
      onchange = null,
      brand = "luna",
      class: className = ""
    } = $$props;
    const resolvedIndex = derived$1(() => activeTab ? tabs.findIndex((t) => t.id === activeTab) : activeIndex);
    $$renderer2.push(`<nav${attr_class(`tab-bar ${stringify(className)}`, "svelte-1lgda09")}${attr("data-app", brand)} role="tablist" aria-label="Main navigation"><!--[-->`);
    const each_array = ensure_array_like(tabs.slice(0, 5));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let tab = each_array[i];
      if (onchange) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button${attr_class("tab-item svelte-1lgda09", void 0, { "tab-item--active": i === resolvedIndex() })} role="tab"${attr("aria-selected", i === resolvedIndex())}${attr("aria-label", tab.label)}><span class="tab-icon svelte-1lgda09">`);
        Icon($$renderer2, { name: tab.icon ?? "home", size: 20 });
        $$renderer2.push(`<!----></span> <span class="tab-label svelte-1lgda09">${escape_html(tab.label)}</span></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<a${attr("href", tab.href)}${attr_class("tab-item svelte-1lgda09", void 0, { "tab-item--active": i === resolvedIndex() })} role="tab"${attr("aria-selected", i === resolvedIndex())}${attr("aria-label", tab.label)}><span class="tab-icon svelte-1lgda09">`);
        Icon($$renderer2, { name: tab.icon ?? "home", size: 20 });
        $$renderer2.push(`<!----></span> <span class="tab-label svelte-1lgda09">${escape_html(tab.label)}</span></a>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}
function DSPebbleDrawer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#E8A87C",
      sienna: "#3c684b",
      alma: "#4CAF9B",
      nova: "#23003D",
      aida: "#8B5CF6",
      stella: "#F59E0B",
      vera: "#E91E8C",
      vita: "#22C55E",
      aria: "#3B82F6"
    };
    let {
      brand = "luna",
      brandColor: brandColorProp = null,
      items = [],
      pinnedItems = [],
      activeId = "",
      anchored = false
    } = $$props;
    let open = false;
    let theme = "dark";
    const isDark = derived$1(() => theme === "dark");
    const isContrast = derived$1(() => theme === "dark-contrast");
    const brandColor = derived$1(() => brandColorProp ?? BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    function hexToRgba(hex, a) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const brandTint = derived$1(() => hexToRgba(brandColor(), 0.1));
    const brandBorder = derived$1(() => hexToRgba(brandColor(), 0.28));
    const activeItem = derived$1(() => items.find((it) => it.id === activeId) ?? items[0]);
    const avatarItem = derived$1(() => activeItem() ?? items[0]);
    const extraItems = derived$1(() => items.filter((it) => it !== avatarItem()));
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("pill svelte-yxfjq5", void 0, { "pill-open": open, "pill-anchored": anchored })}${attr_style(`--brand:${stringify(brandColor())}; --brand-tint:${stringify(brandTint())}; --brand-border:${stringify(brandBorder())};`)} aria-label="Drawer"><button class="pebble pebble-avatar svelte-yxfjq5"${attr("aria-expanded", open)} aria-haspopup="true"${attr("aria-label", avatarItem()?.label ?? "Open drawer")}>`);
    if (avatarItem()?.avatar) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<img${attr("src", avatarItem().avatar)}${attr("alt", avatarItem().label)} class="pebble-img svelte-yxfjq5"/>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <div class="extra-items svelte-yxfjq5"${attr("aria-hidden", !open)}><button${attr_class("pebble pebble-theme svelte-yxfjq5", void 0, { "pebble-theme-active": true })}${attr("aria-label", isDark() ? "Passer en mode clair" : "Passer en mode sombre")}${attr("title", isDark() ? "Mode clair" : "Mode sombre")}${attr("tabindex", -1)}>`);
    if (isDark()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <button${attr_class("pebble pebble-theme svelte-yxfjq5", void 0, { "pebble-theme-active": isContrast() })} role="switch"${attr("aria-checked", isContrast())}${attr("aria-label", isContrast() ? "Désactiver le contraste élevé" : "Activer le contraste élevé")}${attr("title", isContrast() ? "Contraste élevé ON" : "Contraste élevé OFF")}${attr("tabindex", -1)}>`);
    if (isContrast()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"></path><line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="1.5"></line></svg>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="2" x2="12" y2="22"></line></svg>`);
    }
    $$renderer2.push(`<!--]--></button> `);
    if (extraItems().length > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="theme-sep svelte-yxfjq5" aria-hidden="true"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(extraItems());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<button${attr_class("pebble svelte-yxfjq5", void 0, {
        "pebble-active": item.id === activeId,
        "pebble-nearme-active": item.type === "nearme" && item.id === activeId,
        "pebble-add": item.type === "add",
        "pebble-location": item.type === "location"
      })}${attr("aria-label", item.label)}${attr("title", item.label)}${attr("tabindex", -1)}>`);
      if (item.avatar) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<img${attr("src", item.avatar)}${attr("alt", item.label)} class="pebble-img svelte-yxfjq5"/>`);
      } else if (item.type === "nearme") {
        $$renderer2.push("<!--[1-->");
        if (item.id === activeId) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white" stroke="white"></circle></svg>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17.94 17.94A8.97 8.97 0 0 1 12 20S3 17 3 10a9 9 0 0 1 1.35-4.73"></path><path d="M8.56 3.69A9 9 0 0 1 21 10c0 2.74-1.37 5.25-3.34 7.13"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else if (item.type === "add") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`);
      } else if (item.id === "settings") {
        $$renderer2.push("<!--[3-->");
        $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`);
      } else if (item.type === "location") {
        $$renderer2.push("<!--[4-->");
        $$renderer2.push(`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span class="location-label svelte-yxfjq5">${escape_html(item.label)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (item.id === activeId) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="dot svelte-yxfjq5"></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> <!--[-->`);
    const each_array_1 = ensure_array_like(pinnedItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("pebble pebble-pinned svelte-yxfjq5", void 0, { "pebble-pinned-active": item.id === activeId })}${attr("aria-label", item.label)}${attr("title", item.label)}>`);
      if (item.type === "nearme") {
        $$renderer2.push("<!--[0-->");
        if (item.id === activeId) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white" stroke="white"></circle></svg>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M17.94 17.94A8.97 8.97 0 0 1 12 20S3 17 3 10a9 9 0 0 1 1.35-4.73"></path><path d="M8.56 3.69A9 9 0 0 1 21 10c0 2.74-1.37 5.25-3.34 7.13"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function DSContactModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#00897B",
      sienna: "#33D298",
      alma: "#4CAF9B",
      nova: "#7B2FBE",
      aida: "#1565C0",
      stella: "#F57F17",
      vera: "#C62828",
      vita: "#2E7D32",
      aria: "#283593"
    };
    let {
      open = false,
      brand = "luna",
      labels = {}
    } = $$props;
    const L = derived$1(() => ({
      title: labels.title ?? "Contact us",
      close: labels.close ?? "Close",
      back: labels.back ?? "Back",
      send: labels.send ?? "Send",
      messageAriaLabel: labels.messageAriaLabel ?? "Your message",
      sentTitle: labels.sentTitle ?? "Message sent!",
      sentBody: labels.sentBody ?? "Thank you, we read every message.",
      typeImprovement: labels.typeImprovement ?? "Improvement",
      typeFeedback: labels.typeFeedback ?? "Feedback",
      typeBug: labels.typeBug ?? "Bug",
      placeholderImprovement: labels.placeholderImprovement ?? "It would be great if…",
      placeholderFeedback: labels.placeholderFeedback ?? "Your feedback matters…",
      placeholderBug: labels.placeholderBug ?? "When I do… this happens…"
    }));
    const CHOICES = derived$1(() => [
      {
        id: "improvement",
        label: L().typeImprovement,
        icon: "sparkles",
        placeholder: L().placeholderImprovement
      },
      {
        id: "feedback",
        label: L().typeFeedback,
        icon: "message-circle",
        placeholder: L().placeholderFeedback
      },
      {
        id: "bug",
        label: L().typeBug,
        icon: "bug",
        placeholder: L().placeholderBug
      }
    ]);
    const brandColor = derived$1(() => BRAND_COLORS[brand] ?? "#6B3FA0");
    const brandTint = derived$1(() => brandColor() + "18");
    const brandBorder = derived$1(() => brandColor() + "44");
    const ICONS = {
      sparkles: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
      "message-circle": `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      bug: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="ds-backdrop svelte-r6hy5l" role="presentation"></div> <div class="ds-sheet svelte-r6hy5l" role="dialog" aria-modal="true"${attr("aria-label", L().title)}${attr_style(`--brand:${stringify(brandColor())}; --brand-tint:${stringify(brandTint())}; --brand-border:${stringify(brandBorder())};`)}><div class="ds-handle svelte-r6hy5l" aria-hidden="true"></div> <button class="ds-close svelte-r6hy5l"${attr("aria-label", L().close)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" class="svelte-r6hy5l"><line x1="18" y1="6" x2="6" y2="18" class="svelte-r6hy5l"></line><line x1="6" y1="6" x2="18" y2="18" class="svelte-r6hy5l"></line></svg></button> `);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="ds-header svelte-r6hy5l"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="svelte-r6hy5l"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" class="svelte-r6hy5l"></path></svg> <span class="svelte-r6hy5l">${escape_html(L().title)}</span></div> <div class="ds-choices svelte-r6hy5l"><!--[-->`);
        const each_array = ensure_array_like(CHOICES());
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let c = each_array[$$index];
          $$renderer2.push(`<button class="ds-choice svelte-r6hy5l"${attr("aria-label", c.label)}><span class="ds-choice-icon svelte-r6hy5l">${html(ICONS[c.icon])}</span> <span class="ds-choice-label svelte-r6hy5l">${escape_html(c.label)}</span></button>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    setupI18n();
    const NAV_TABS = [
      { id: "home", label: "Accueil", icon: "home" },
      { id: "calendar", label: "Calendrier", icon: "calendar" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Réglages", icon: "settings" }
    ];
    let contactOpen = false;
    const activeTab = derived$1(() => store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" ? "home" : store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/calendar") ? "calendar" : store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/insights") ? "insights" : store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/settings") ? "settings" : "home");
    const showNav = derived$1(() => store_get($$store_subs ??= {}, "$page", page).url.pathname !== "/onboarding" && !store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith("/onboarding"));
    function navTo(id) {
      goto();
    }
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
    $$renderer2.push(`<div class="app-shell svelte-12qhfyh">`);
    if (showNav()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<aside class="sidebar svelte-12qhfyh" aria-label="Navigation principale"><div class="sidebar-header svelte-12qhfyh"><div class="sidebar-brand svelte-12qhfyh"><svg width="22" height="22" viewBox="0 0 24 24" fill="var(--c-brand)" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></svg> <span class="sidebar-app-name svelte-12qhfyh">Luna</span></div></div> <nav class="sidebar-nav svelte-12qhfyh" aria-label="Navigation"><!--[-->`);
      const each_array_1 = ensure_array_like(NAV_TABS);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tab = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", "/" + (tab.id === "home" ? "" : tab.id))}${attr_class("sidebar-item svelte-12qhfyh", void 0, { "active": activeTab() === tab.id })}${attr("aria-current", activeTab() === tab.id ? "page" : void 0)}>`);
        if (tab.id === "home") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`);
        } else if (tab.id === "calendar") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`);
        } else if (tab.id === "insights") {
          $$renderer2.push("<!--[2-->");
          $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`);
        } else if (tab.id === "settings") {
          $$renderer2.push("<!--[3-->");
          $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <span>${escape_html(tab.label)}</span></a>`);
      }
      $$renderer2.push(`<!--]--></nav> <div class="sidebar-contact svelte-12qhfyh"><button class="sidebar-contact-btn svelte-12qhfyh" aria-label="Nous contacter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> <span>Nous contacter</span></button></div></aside>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("main-area svelte-12qhfyh", void 0, { "has-sidebar": showNav() })}>`);
    if (showNav()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="mobile-drawer-anchor svelte-12qhfyh">`);
      DSPebbleDrawer($$renderer2, {
        brand: "luna",
        items: NAV_TABS,
        activeId: activeTab()
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2);
    $$renderer2.push(`<!----> `);
    if (showNav()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="bottom-nav-wrap svelte-12qhfyh">`);
      TabBar($$renderer2, {
        tabs: NAV_TABS,
        activeTab: activeTab(),
        brand: "luna",
        onchange: navTo
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div> `);
    DSContactModal($$renderer2, {
      open: contactOpen,
      brand: "luna",
      labels: {
        title: store_get($$store_subs ??= {}, "$_", $format)("contact.title"),
        close: store_get($$store_subs ??= {}, "$_", $format)("contact.close"),
        back: store_get($$store_subs ??= {}, "$_", $format)("contact.back"),
        send: store_get($$store_subs ??= {}, "$_", $format)("contact.send"),
        messageAriaLabel: store_get($$store_subs ??= {}, "$_", $format)("contact.messageAriaLabel"),
        sentTitle: store_get($$store_subs ??= {}, "$_", $format)("contact.sentTitle"),
        sentBody: store_get($$store_subs ??= {}, "$_", $format)("contact.sentBody"),
        typeImprovement: store_get($$store_subs ??= {}, "$_", $format)("contact.typeImprovement"),
        typeFeedback: store_get($$store_subs ??= {}, "$_", $format)("contact.typeFeedback"),
        typeBug: store_get($$store_subs ??= {}, "$_", $format)("contact.typeBug"),
        placeholderImprovement: store_get($$store_subs ??= {}, "$_", $format)("contact.placeholderImprovement"),
        placeholderFeedback: store_get($$store_subs ??= {}, "$_", $format)("contact.placeholderFeedback"),
        placeholderBug: store_get($$store_subs ??= {}, "$_", $format)("contact.placeholderBug")
      }
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
