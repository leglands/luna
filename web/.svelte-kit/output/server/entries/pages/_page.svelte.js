import "clsx";
import { g as goto } from "../../chunks/client.js";
import { P as PebbleButton } from "../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { T as TabBar } from "../../chunks/TabBar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "fertility", label: "Fertile", icon: "heart" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    $$renderer2.push(`<div class="page svelte-1uha8ag" data-app="luna"><main class="content svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="empty-state svelte-1uha8ag"><div class="ring-ph svelte-1uha8ag"></div> <p class="empty-msg svelte-1uha8ag">Set up your cycle to get predictions and tracking</p> `);
      PebbleButton($$renderer2, { label: "Get started", onclick: () => goto() });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="log-cta svelte-1uha8ag">`);
    PebbleButton($$renderer2, { label: "Log today", onclick: () => goto() });
    $$renderer2.push(`<!----></div></main> `);
    TabBar($$renderer2, {
      tabs: TABS,
      activeTab: "home",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
