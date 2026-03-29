import { a as attr_class, b as attr_style, c as attr, e as escape_html, s as stringify, h as head, d as store_get, u as unsubscribe_stores, f as ensure_array_like } from "../../chunks/index2.js";
import { r as registerLocaleLoader, i as init, $ as $locale, a as $format } from "../../chunks/runtime.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
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
function AppPromoCard($$renderer, $$props) {
  let {
    appName = "",
    tagline = "",
    appStoreUrl = null,
    playStoreUrl = null,
    color = "#6B5BD4",
    class: className = ""
  } = $$props;
  $$renderer.push(`<aside${attr_class(`app-promo ${stringify(className)}`, "svelte-er44mr")}${attr_style(`--promo-color: ${stringify(color)}`)}${attr("aria-label", `Download ${stringify(appName)} on mobile`)}><div class="promo-identity svelte-er44mr"><span class="promo-dot svelte-er44mr" aria-hidden="true"></span> <div class="promo-text"><p class="promo-name svelte-er44mr">${escape_html(appName)}</p> `);
  if (tagline) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="promo-tagline svelte-er44mr">${escape_html(tagline)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></div> <div class="badge-row svelte-er44mr" role="list">`);
  if (appStoreUrl) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<a${attr("href", appStoreUrl)} target="_blank" rel="noopener noreferrer" class="store-badge svelte-er44mr" role="listitem"${attr("aria-label", `Download ${stringify(appName)} on the App Store`)}><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path></svg> <span class="badge-label svelte-er44mr"><span class="badge-sub svelte-er44mr">Download on the</span> <span class="badge-main svelte-er44mr">App Store</span></span></a>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<span class="store-badge store-badge--soon svelte-er44mr" role="listitem" aria-label="App Store — coming soon"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path></svg> <span class="badge-label svelte-er44mr"><span class="badge-sub svelte-er44mr">Coming soon</span> <span class="badge-main svelte-er44mr">App Store</span></span></span>`);
  }
  $$renderer.push(`<!--]--> `);
  if (playStoreUrl) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<a${attr("href", playStoreUrl)} target="_blank" rel="noopener noreferrer" class="store-badge svelte-er44mr" role="listitem"${attr("aria-label", `Download ${stringify(appName)} on Google Play`)}><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3 20.5v-17c0-.83 1-.95 1.37-.37l14 8.5c.42.26.42.88 0 1.14l-14 8.5C3.71 21.45 3 21.33 3 20.5z"></path></svg> <span class="badge-label svelte-er44mr"><span class="badge-sub svelte-er44mr">Get it on</span> <span class="badge-main svelte-er44mr">Google Play</span></span></a>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<span class="store-badge store-badge--soon svelte-er44mr" role="listitem" aria-label="Google Play — coming soon"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3 20.5v-17c0-.83 1-.95 1.37-.37l14 8.5c.42.26.42.88 0 1.14l-14 8.5C3.71 21.45 3 21.33 3 20.5z"></path></svg> <span class="badge-label svelte-er44mr"><span class="badge-sub svelte-er44mr">Coming soon</span> <span class="badge-main svelte-er44mr">Google Play</span></span></span>`);
  }
  $$renderer.push(`<!--]--></div></aside>`);
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
    $$renderer2.push(`<!----> <footer style="padding: 1rem; max-width: 600px; margin: 0 auto;">`);
    AppPromoCard($$renderer2, {
      appName: "Luna",
      tagline: store_get($$store_subs ??= {}, "$_", $format)("app.tagline", { default: "Your cycle, understood" }),
      color: "#C084A0"
    });
    $$renderer2.push(`<!----></footer>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
