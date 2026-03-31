import { d as attr_class, f as attr_style, b as stringify, c as ensure_array_like, a as attr, e as escape_html, i as derived } from "./index2.js";
import { I as Icon } from "./EmotionPicker.svelte_svelte_type_style_lang.js";
function TabBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#E8A87C",
      sienna: "#E64A19",
      alma: "#7BA7A7",
      nova: "#6366F1",
      aida: "#8B5CF6",
      vera: "#F48FB1",
      vita: "#A5D6A7",
      stella: "#FFB74D",
      aria: "#4FC3F7"
    };
    let {
      tabs = [],
      activeTab = "",
      activeIndex = 0,
      onchange = null,
      brand = "luna",
      class: className = ""
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    const resolvedIndex = derived(() => activeTab ? tabs.findIndex((t) => t.id === activeTab) : activeIndex);
    $$renderer2.push(`<nav${attr_class(`tab-bar ${stringify(className)}`, "svelte-1lgda09")}${attr_style(`--tab-brand: ${stringify(brandColor())}`)} role="tablist" aria-label="Main navigation"><!--[-->`);
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
export {
  TabBar as T
};
