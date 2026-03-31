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
    let statusLine = "Based on 0 cycles";
    $$renderer2.push(`<div class="screen svelte-u6zn5i" data-app="luna"><main class="hero svelte-u6zn5i"><div class="hero-display svelte-u6zn5i"><span class="hero-value svelte-u6zn5i">${escape_html(heroValue)}</span> <span class="hero-label svelte-u6zn5i">Avg cycle (days)</span></div> <p class="status svelte-u6zn5i">${escape_html(statusLine)}</p> `);
    PebbleButton($$renderer2, {
      label: "See history",
      size: "lg",
      onclick: () => goto()
    });
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
      activeTab: "insights",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
