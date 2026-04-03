import { c as ensure_array_like, d as attr_class, f as attr_style, b as stringify, a as attr, e as escape_html, i as derived } from "./index2.js";
import { I as Icon } from "./DSOnboarding.svelte_svelte_type_style_lang.js";
function DSFloatingNav($$renderer, $$props) {
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
      tabs = [],
      active = "",
      brand = "luna",
      onchange = null,
      onfab = null,
      daisyOpen = false,
      fabIcon = "plus"
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    function hexToRgba(hex, a) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const brandTint = derived(() => hexToRgba(brandColor(), 0.14));
    const brandHover = derived(() => hexToRgba(brandColor(), 0.08));
    const fabIndex = derived(() => Math.floor(tabs.length / 2));
    $$renderer2.push(`<nav class="floating-nav svelte-lsc1cd"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let tab = each_array[i];
      if (i === fabIndex() && onfab) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button${attr_class("nav-fab svelte-lsc1cd", void 0, { "nav-fab--open": daisyOpen })}${attr_style(`--fab-brand: ${stringify(brandColor())}`)} aria-label="Open menu">`);
        Icon($$renderer2, { name: daisyOpen ? "x" : fabIcon, size: 24, color: "#fff" });
        $$renderer2.push(`<!----></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <button${attr_class("nav-tab svelte-lsc1cd", void 0, { "nav-tab--active": active === tab.id })}${attr_style(`--tab-brand: ${stringify(brandColor())}; --tab-brand-tint: ${stringify(brandTint())}; --tab-brand-hover: ${stringify(brandHover())}`)}${attr("aria-label", tab.label)}${attr("aria-current", active === tab.id ? "page" : void 0)}>`);
      if (tab.icon) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="nav-tab-icon svelte-lsc1cd">`);
        Icon($$renderer2, { name: tab.icon, size: 22 });
        $$renderer2.push(`<!----></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <span class="nav-tab-label svelte-lsc1cd">${escape_html(tab.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}
function DaisyMenu($$renderer, $$props) {
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
      items = [],
      onselect = null,
      onclose = null,
      brand = "luna"
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    const RADIUS = 120;
    const START_ANGLE = -190;
    const END_ANGLE = -10;
    function getPetalPosition(index) {
      const totalItems = items.length;
      const angleStep = (END_ANGLE - START_ANGLE) / (totalItems - 1);
      const angle = START_ANGLE + angleStep * index;
      const rad = angle * Math.PI / 180;
      const x = Math.cos(rad) * RADIUS;
      const y = Math.sin(rad) * RADIUS;
      return { x, y, angle };
    }
    if (open) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="daisy-backdrop svelte-11jp56k" role="presentation"></div> <div class="daisy-container svelte-11jp56k"${attr_style(`--daisy-brand: ${stringify(brandColor())}`)} role="menu" aria-label="Menu"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        const pos = getPetalPosition(i);
        $$renderer2.push(`<button class="daisy-petal svelte-11jp56k"${attr_style(` left: calc(50% + ${stringify(pos.x)}px - 32px); top: calc(50% + ${stringify(pos.y)}px - 32px); background: ${stringify(item.color || brandColor())}; animation-delay: ${stringify(i * 40)}ms; `)} role="menuitem"${attr("aria-label", item.label)}>`);
        Icon($$renderer2, { name: item.icon || "circle", size: 24, color: "#fff" });
        $$renderer2.push(`<!----> <span class="daisy-label svelte-11jp56k">${escape_html(item.label)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  DSFloatingNav as D,
  DaisyMenu as a
};
