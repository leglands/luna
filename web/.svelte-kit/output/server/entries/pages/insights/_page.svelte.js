import { c as escape_html } from "../../../chunks/root.js";
import "clsx";
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
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    let heroValue = "—";
    let statusLine = "Based on 0 cycles";
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
      $$renderer3.push(`<div class="screen svelte-u6zn5i" data-app="luna"><main class="hero svelte-u6zn5i"><div class="hero-display svelte-u6zn5i"><span class="hero-value svelte-u6zn5i">${escape_html(heroValue)}</span> <span class="hero-label svelte-u6zn5i">Avg cycle (days)</span></div> <p class="status svelte-u6zn5i">${escape_html(statusLine)}</p> `);
      PebbleButton($$renderer3, {
        label: "See history",
        size: "lg",
        onclick: () => goto()
      });
      $$renderer3.push(`<!----> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]--></main> `);
      DSFloatingNav($$renderer3, {
        tabs: TABS,
        active: "insights",
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
