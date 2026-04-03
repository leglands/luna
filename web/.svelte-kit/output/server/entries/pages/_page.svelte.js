import "clsx";
import { g as goto } from "../../chunks/client.js";
import { P as PebbleButton } from "../../chunks/DSOnboarding.svelte_svelte_type_style_lang.js";
import { D as DSFloatingNav, a as DaisyMenu } from "../../chunks/DaisyMenu.js";
import { d as attr_class, f as attr_style, b as stringify, a as attr, c as ensure_array_like, e as escape_html, i as derived } from "../../chunks/index2.js";
function DSPebbleDrawer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#E8A87C",
      sienna: "#3c684b",
      alma: "#7BA7A7",
      nova: "#6366F1",
      aida: "#8B5CF6",
      stella: "#F59E0B",
      vera: "#E91E8C",
      vita: "#22C55E",
      aria: "#3B82F6"
    };
    let {
      brand = "luna",
      items = [],
      pinnedItems = [],
      activeId = ""
    } = $$props;
    let open = false;
    let theme = "dark";
    const isDark = derived(() => theme === "dark");
    const isContrast = derived(() => theme === "dark-contrast");
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    function hexToRgba(hex, a) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const brandTint = derived(() => hexToRgba(brandColor(), 0.1));
    const brandBorder = derived(() => hexToRgba(brandColor(), 0.28));
    const activeItem = derived(() => items.find((it) => it.id === activeId) ?? items[0]);
    const avatarItem = derived(() => activeItem() ?? items[0]);
    const extraItems = derived(() => items.filter((it) => it !== avatarItem()));
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class("pill svelte-yxfjq5", void 0, { "pill-open": open })}${attr_style(`--brand:${stringify(brandColor())}; --brand-tint:${stringify(brandTint())}; --brand-border:${stringify(brandBorder())};`)} aria-label="Drawer"><button class="pebble pebble-avatar svelte-yxfjq5"${attr("aria-expanded", open)} aria-haspopup="true"${attr("aria-label", avatarItem()?.label ?? "Open drawer")}>`);
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
function DSSettingsSlide($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#E8A87C",
      sienna: "#3c684b",
      alma: "#7BA7A7",
      nova: "#6366F1",
      aida: "#8B5CF6",
      stella: "#F59E0B",
      vera: "#E91E8C",
      vita: "#22C55E",
      aria: "#3B82F6"
    };
    let {
      open = false,
      brand = "luna",
      title = "Settings",
      children
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    function hexToRgba(hex, a) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const brandTint = derived(() => hexToRgba(brandColor(), 0.08));
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="settings-overlay svelte-1o2b4zw" role="button" tabindex="-1" aria-label="Close settings"></div> <div${attr_class("settings-panel svelte-1o2b4zw", void 0, { "settings-panel--open": open })} role="dialog" aria-modal="true"${attr("aria-label", title)}${attr_style(`--brand:${stringify(brandColor())}; --brand-tint:${stringify(brandTint())};`)}><div class="settings-header svelte-1o2b4zw"><h2 class="settings-title svelte-1o2b4zw">${escape_html(title)}</h2> <button class="settings-close svelte-1o2b4zw" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <div class="settings-accent svelte-1o2b4zw"${attr_style(`background:${stringify(brandColor())};`)}></div> <div class="settings-content svelte-1o2b4zw">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "fertility", label: "Fertile", icon: "heart" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    let settingsOpen = false;
    let activeProfile = "me";
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
      $$renderer3.push(`<div class="page svelte-1uha8ag" data-app="luna"><main class="content svelte-1uha8ag">`);
      {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`<div class="empty-state svelte-1uha8ag"><div class="ring-ph svelte-1uha8ag"></div> <p class="empty-msg svelte-1uha8ag">Set up your cycle to get predictions and tracking</p> `);
        PebbleButton($$renderer3, { label: "Get started", onclick: () => goto() });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--> <div class="log-cta svelte-1uha8ag">`);
      PebbleButton($$renderer3, { label: "Log today", onclick: () => goto() });
      $$renderer3.push(`<!----></div></main> `);
      DSPebbleDrawer($$renderer3, {
        brand: "luna",
        items: [
          ...[],
          { id: "me", label: "Me", type: "profile" },
          { id: "settings", label: "Settings", type: "action" }
        ],
        activeId: activeProfile
      });
      $$renderer3.push(`<!----> `);
      DSFloatingNav($$renderer3, {
        tabs: TABS,
        active: "home",
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
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      DSSettingsSlide($$renderer3, {
        open: settingsOpen,
        brand: "luna",
        title: "Settings",
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="settings-section-title">General</p> <div class="settings-row"><div><p class="settings-row-label">Theme</p> <p class="settings-row-sub">System default</p></div></div> <p class="settings-section-title">Privacy</p> <div class="settings-row"><div><p class="settings-row-label">Data encryption</p> <p class="settings-row-sub">End-to-end encrypted</p></div></div> <p class="settings-section-title">About</p> <div class="settings-row"><div><p class="settings-row-label">Version</p> <p class="settings-row-sub">1.0.0</p></div></div> <button class="settings-danger-btn">Delete my data</button>`);
        }
      });
      $$renderer3.push(`<!---->`);
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
