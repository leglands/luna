import { b as attr } from "../../../chunks/root.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
/* empty css                                                           */
import { D as DSFloatingNav, a as DaisyMenu } from "../../../chunks/DaisyMenu.js";
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
      $$renderer3.push(`<div class="screen svelte-1i19ct2" data-app="luna"><main class="content svelte-1i19ct2"><h1 class="title svelte-1i19ct2">Settings</h1> <div class="rows svelte-1i19ct2"><label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", cycleLength)} min="20" max="45" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Period length</span> <span class="field svelte-1i19ct2"><input type="number"${attr("value", periodLength)} min="1" max="10" class="svelte-1i19ct2"/><span class="unit svelte-1i19ct2">days</span></span></label> <label class="row svelte-1i19ct2"><span class="svelte-1i19ct2">Cycle start date</span> <input type="date"${attr("value", cycleStartDate)} class="date-input svelte-1i19ct2"/></label></div> <div class="rows svelte-1i19ct2" style="margin-top:8px"><button class="row export-row svelte-1i19ct2"><span class="svelte-1i19ct2">Export data</span> <span class="export-hint svelte-1i19ct2">CSV for gynecologist →</span></button></div> `);
      PebbleButton($$renderer3, { label: "Save", size: "lg", onclick: save });
      $$renderer3.push(`<!----></main> `);
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
