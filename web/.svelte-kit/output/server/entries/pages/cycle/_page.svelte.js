import { e as escape_html } from "../../../chunks/index2.js";
import "clsx";
import { g as goto } from "../../../chunks/client.js";
import { P as PebbleButton } from "../../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { T as TabBar } from "../../../chunks/TabBar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    let heroValue = "—";
    let statusLine = "";
    $$renderer2.push(`<div class="screen svelte-wl2tsh" data-app="luna"><main class="hero svelte-wl2tsh"><div class="hero-display svelte-wl2tsh"><span class="hero-value svelte-wl2tsh">${escape_html(heroValue)}</span> <span class="hero-label svelte-wl2tsh">Day of cycle</span></div> <p class="status svelte-wl2tsh">${escape_html(statusLine)}</p> `);
    PebbleButton($$renderer2, { label: "Log today", size: "lg", onclick: () => goto() });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main> `);
    TabBar($$renderer2, {
      tabs: TABS,
      activeTab: "cycle",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
