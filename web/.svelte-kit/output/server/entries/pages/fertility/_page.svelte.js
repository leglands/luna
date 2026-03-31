import { e as escape_html, d as attr_class, f as attr_style, b as stringify } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
import { T as TabBar } from "../../../chunks/TabBar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND = "#E91E8C";
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "fertility", label: "Fertile", icon: "heart" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    let heroValue = "—";
    let heroLabel = "Days to ovulation";
    let statusLine = "";
    let fertileStart = "";
    let fertileEnd = "";
    let ovulationDate = "";
    let isFertileNow = false;
    let cycleDay = 0;
    $$renderer2.push(`<div class="screen svelte-1go076p" data-app="luna"><main class="hero svelte-1go076p"><p class="label svelte-1go076p">Cycle day ${escape_html(cycleDay)}</p> <p${attr_class("hero-val svelte-1go076p", void 0, { "fertile": isFertileNow })}${attr_style(`color:${stringify(BRAND)}`)}>${escape_html(heroValue)}</p> <p class="hero-lbl svelte-1go076p">${escape_html(heroLabel)}</p> <p class="status svelte-1go076p">${escape_html(statusLine)}</p> <div class="info-cards svelte-1go076p"><div class="card svelte-1go076p"><p class="card-label svelte-1go076p">Fertile window</p> <p class="card-value svelte-1go076p">${escape_html(fertileStart)} – ${escape_html(fertileEnd)}</p> <p class="card-sub svelte-1go076p">6 days of peak fertility</p></div> <div${attr_class("card svelte-1go076p", void 0, { "highlight": !isFertileNow })}><p class="card-label svelte-1go076p">Ovulation</p> <p class="card-value svelte-1go076p">${escape_html(ovulationDate)}</p> <p class="card-sub svelte-1go076p">Predicted (ACOG method)</p></div></div> <p class="disclaimer svelte-1go076p">Prediction based on average cycle. Use for awareness, not contraception.</p> `);
    PebbleButton($$renderer2, {
      label: "Log today",
      onclick: () => goto(),
      style: `--pebble-brand:${stringify(BRAND)}`
    });
    $$renderer2.push(`<!----></main> `);
    TabBar($$renderer2, {
      tabs: TABS,
      activeTab: "fertility",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
