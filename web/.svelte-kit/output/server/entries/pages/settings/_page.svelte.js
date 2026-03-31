import { a as attr } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
import { T as TabBar } from "../../../chunks/TabBar.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    $$renderer2.push(`<div class="screen svelte-1i19ct2" data-app="luna"><main class="content svelte-1i19ct2"><h1 class="title svelte-1i19ct2">Settings</h1> <div class="rows svelte-1i19ct2"><label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", cycleLength)} min="20" max="45" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Period length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", periodLength)} min="1" max="10" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle start date</span> <input type="date"${attr("value", cycleStartDate)} class="date-input svelte-1i19ct2"/></label></div> <div class="rows svelte-1i19ct2" style="margin-top:8px"><button class="row export-row svelte-1i19ct2"><span class="svelte-1i19ct2">Export data</span> <span class="export-hint svelte-1i19ct2">CSV for gynecologist →</span></button></div> `);
    PebbleButton($$renderer2, { label: "Save", size: "lg", onclick: save });
    $$renderer2.push(`<!----></main> `);
    TabBar($$renderer2, {
      tabs: TABS,
      activeTab: "settings",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
