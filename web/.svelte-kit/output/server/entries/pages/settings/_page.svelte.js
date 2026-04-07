import { a as attr_class, c as escape_html, e as ensure_array_like, f as attr_style, s as stringify, b as attr, d as derived } from "../../../chunks/root.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/DSNavSheet.svelte_svelte_type_style_lang.js";
import "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
import { D as DSFloatingNav, a as DaisyMenu } from "../../../chunks/DaisyMenu.js";
const SHARE_CONFIGS = {
  luna: {
    url: "https://luna.macaron-software.com",
    title: "Luna — Ton cycle, compris",
    text: "Je suis mon cycle en toute confidentialité avec Luna. Bienveillante, sans pub, sans tracking."
  },
  aura: {
    url: "https://aura.macaron-software.com",
    title: "Aura — Ta grossesse, éclairée",
    text: "Je vis ma grossesse sereinement avec Aura. Une app privée, fondée sur des données médicales."
  },
  sienna: {
    url: "https://sienna.macaron-software.com",
    title: "Sienna — Les premiers instants de bébé",
    text: "Je consigne les premiers moments de mon bébé avec Sienna. Privé, chiffré, sans cloud."
  },
  alma: {
    url: "https://alma.macaron-software.com",
    title: "Alma — Ton espace mental",
    text: "Je prends soin de ma santé mentale avec Alma. Bienveillante, confidentielle, basée sur l'ACT."
  },
  nova: {
    url: "https://nova.macaron-software.com",
    title: "Nova — Ce qui se passe près de toi",
    text: "Je découvre des événements près de chez moi avec Nova. Sorties, concerts, culture, sport."
  },
  aida: {
    url: "https://aida.macaron-software.com",
    title: "Aida — Tes droits, accessibles",
    text: "Je connais mes droits et aides sociales avec Aida. Simple, gratuit, confidentiel."
  },
  stella: {
    url: "https://stella.macaron-software.com",
    title: "Stella — Apprendre en jouant",
    text: "Mon enfant apprend à son rythme avec Stella. Une app éducative sans pub, sans data."
  },
  vera: {
    url: "https://vera.macaron-software.com",
    title: "Vera — Votre lien, cultivé",
    text: "On cultive notre relation de couple avec Vera. Une app privée pour avancer ensemble."
  },
  vita: {
    url: "https://vita.macaron-software.com",
    title: "Vita — Manger avec joie",
    text: "Je mange avec plus de plaisir et moins de culpabilité avec Vita. Sans régime, sans calories."
  },
  aria: {
    url: "https://aria.macaron-software.com",
    title: "Aria — Ta carrière, à ta façon",
    text: "Je construis ma carrière à mon rythme avec Aria. Confidentielle, sans algorithme de recrutement."
  }
};
function getShareConfig(appId) {
  return SHARE_CONFIGS[appId] ?? {
    url: "https://macaron-software.com",
    title: "Life Ecosystem",
    text: "Des apps bienveillantes pour ta vie."
  };
}
function DSShareSheet($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, url = "", title = "", text = "" } = $$props;
    let copied = false;
    let isTablet = false;
    const shareText = derived(() => text || title);
    const encodedUrl = derived(() => encodeURIComponent(url));
    const encodedText = derived(() => encodeURIComponent(shareText()));
    const encodedTitle = derived(() => encodeURIComponent(title));
    const APPS = derived(() => [
      {
        id: "whatsapp",
        label: "WhatsApp",
        color: "#25D366",
        textColor: "#fff",
        icon: "whatsapp",
        href: `https://api.whatsapp.com/send?text=${encodedText()}%20${encodedUrl()}`
      },
      {
        id: "instagram",
        label: "Instagram",
        color: "#E1306C",
        textColor: "#fff",
        icon: "instagram",
        href: null,
        // Instagram has no direct share URL — copy link then open
        action: "instagram"
      },
      {
        id: "snapchat",
        label: "Snapchat",
        color: "#FFFC00",
        textColor: "#000",
        icon: "snapchat",
        href: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl()}`
      },
      {
        id: "x",
        label: "X / Twitter",
        color: "#000000",
        textColor: "#fff",
        icon: "x-twitter",
        href: `https://twitter.com/intent/tweet?text=${encodedText()}&url=${encodedUrl()}`
      },
      {
        id: "facebook",
        label: "Facebook",
        color: "#1877F2",
        textColor: "#fff",
        icon: "facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl()}`
      },
      {
        id: "telegram",
        label: "Telegram",
        color: "#26A5E4",
        textColor: "#fff",
        icon: "telegram",
        href: `https://t.me/share/url?url=${encodedUrl()}&text=${encodedText()}`
      },
      {
        id: "sms",
        label: "SMS",
        color: "#34C759",
        textColor: "#fff",
        icon: "message-circle",
        href: `sms:?body=${encodedText()}%20${encodedUrl()}`
      },
      {
        id: "email",
        label: "Email",
        color: "#6B3FA0",
        textColor: "#fff",
        icon: "mail",
        href: `mailto:?subject=${encodedTitle()}&body=${encodedText()}%0A%0A${encodedUrl()}`
      }
    ]);
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("ds-share-backdrop svelte-1jdvv00", void 0, { "tablet": isTablet })} role="dialog" aria-modal="true" aria-label="Partager cet événement" tabindex="-1"><div class="ds-share-sheet svelte-1jdvv00" role="document"><div class="sheet-handle svelte-1jdvv00" aria-hidden="true"></div> <div class="sheet-header svelte-1jdvv00"><p class="sheet-title svelte-1jdvv00">Partager</p> <button class="sheet-close svelte-1jdvv00" aria-label="Fermer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> `);
      if (title) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<p class="sheet-event-title svelte-1jdvv00">${escape_html(title)}</p>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="app-grid svelte-1jdvv00" role="list"><!--[-->`);
      const each_array = ensure_array_like(APPS());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let app = each_array[$$index];
        $$renderer2.push(`<button class="app-btn svelte-1jdvv00"${attr_style(`--app-color:${stringify(app.color)}; --app-text:${stringify(app.textColor)}`)}${attr("aria-label", `Partager via ${stringify(app.label)}`)} role="listitem"><span class="app-icon svelte-1jdvv00" aria-hidden="true">`);
        if (app.id === "whatsapp") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`);
        } else if (app.id === "instagram") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>`);
        } else if (app.id === "snapchat") {
          $$renderer2.push("<!--[2-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>`);
        } else if (app.id === "x") {
          $$renderer2.push("<!--[3-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`);
        } else if (app.id === "facebook") {
          $$renderer2.push("<!--[4-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>`);
        } else if (app.id === "telegram") {
          $$renderer2.push("<!--[5-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"></path></svg>`);
        } else if (app.id === "sms") {
          $$renderer2.push("<!--[6-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`);
        } else if (app.id === "email") {
          $$renderer2.push("<!--[7-->");
          $$renderer2.push(`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></span> <span class="app-label svelte-1jdvv00">${escape_html(app.label)}</span> `);
        if (app.action === "instagram") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="app-badge svelte-1jdvv00">Copy+Open</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></button>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="sheet-divider svelte-1jdvv00" aria-hidden="true"></div> <div class="copy-row svelte-1jdvv00"><div class="copy-url svelte-1jdvv00" aria-label="URL de l'événement"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> <span class="url-text svelte-1jdvv00">${escape_html(url)}</span></div> <button${attr_class("copy-btn svelte-1jdvv00", void 0, { "copied": copied })}${attr("aria-label", "Copier le lien")}>`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copier`);
      }
      $$renderer2.push(`<!--]--></button></div> `);
      if (typeof navigator !== "undefined" && "share" in navigator) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="native-share-btn svelte-1jdvv00"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg> Autres applications…</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const shareConfig = getShareConfig("luna");
    let shareOpen = false;
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "fertility", label: "Fertile", icon: "heart" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    let cycleLength = 28;
    let periodLength = 5;
    let cycleStartDate = "";
    function save() {
      const s = {
        cycleLength: Number(cycleLength),
        periodLength: Number(periodLength),
        lastPeriodDate: null
      };
      localStorage.setItem("life-luna-settings", JSON.stringify(s));
      const raw = localStorage.getItem("life-luna-data");
      if (raw) {
        const d = JSON.parse(raw);
        d.settings = { ...d.settings, ...s };
        localStorage.setItem("life-luna-data", JSON.stringify(d));
      }
      goto();
    }
    let daisyOpen = false;
    const DAISY_ITEMS = [
      {
        icon: "droplet",
        label: "Règles",
        onclick: () => goto()
      },
      {
        icon: "thermometer",
        label: "Symptôme",
        onclick: () => goto()
      },
      {
        icon: "smile",
        label: "Humeur",
        onclick: () => goto()
      },
      {
        icon: "moon",
        label: "Ovulation",
        onclick: () => goto()
      }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="screen svelte-1i19ct2" data-app="luna"><main class="content svelte-1i19ct2"><h1 class="title svelte-1i19ct2">Settings</h1> <div class="rows svelte-1i19ct2"><label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", cycleLength)} min="20" max="45" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Period length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", periodLength)} min="1" max="10" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle start date</span> <input type="date"${attr("value", cycleStartDate)} class="date-input svelte-1i19ct2"/></label></div> <div class="rows svelte-1i19ct2" style="margin-top:8px"><button class="row export-row svelte-1i19ct2"><span class="svelte-1i19ct2">Export data</span> <span class="export-hint svelte-1i19ct2">CSV for gynecologist →</span></button></div> <div class="rows svelte-1i19ct2" style="margin-top:0"><button class="share-row svelte-1i19ct2" aria-label="Recommander l'app"><span class="share-row-icon svelte-1i19ct2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="svelte-1i19ct2"><circle cx="18" cy="5" r="3" class="svelte-1i19ct2"></circle><circle cx="6" cy="12" r="3" class="svelte-1i19ct2"></circle><circle cx="18" cy="19" r="3" class="svelte-1i19ct2"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" class="svelte-1i19ct2"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" class="svelte-1i19ct2"></line></svg></span> <span class="share-row-label svelte-1i19ct2">Recommander l'app</span> <svg class="share-row-chevron svelte-1i19ct2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6" class="svelte-1i19ct2"></polyline></svg></button></div> `);
      PebbleButton($$renderer3, { label: "Save", size: "lg", onclick: save });
      $$renderer3.push(`<!----></main> `);
      DSShareSheet($$renderer3, {
        url: shareConfig.url,
        title: shareConfig.title,
        text: shareConfig.text,
        get open() {
          return shareOpen;
        },
        set open($$value) {
          shareOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      DSFloatingNav($$renderer3, {
        tabs: TABS,
        active: "settings",
        brand: "luna",
        onchange: (id) => goto(),
        onfab: () => daisyOpen = !daisyOpen,
        get daisyOpen() {
          return daisyOpen;
        },
        set daisyOpen($$value) {
          daisyOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      DaisyMenu($$renderer3, {
        open: daisyOpen,
        onclose: () => daisyOpen = false,
        items: DAISY_ITEMS
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
