import { k as derived } from "../../../chunks/index2.js";
import { I as Icon, P as PebbleButton } from "../../../chunks/StitchCP.svelte_svelte_type_style_lang.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { P as PrivacyBadge } from "../../../chunks/PrivacyBadge.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = null;
    let cycleInfo = null;
    const hasData = derived(() => data);
    function handleBack() {
      window.location.href = "/";
    }
    $$renderer2.push(`<div class="cycle-page svelte-wl2tsh"><header class="page-header svelte-wl2tsh"><button class="back-link svelte-wl2tsh">`);
    Icon($$renderer2, { name: "chevron-left", size: 20 });
    $$renderer2.push(`<!----> <span>Home</span></button> <h1 class="page-title svelte-wl2tsh">My Cycle</h1> `);
    PrivacyBadge($$renderer2, {});
    $$renderer2.push(`<!----></header> `);
    if (hasData() && cycleInfo) ;
    else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<main class="empty-state svelte-wl2tsh"><div class="empty-icon svelte-wl2tsh">`);
      Icon($$renderer2, { name: "calendar", size: 48 });
      $$renderer2.push(`<!----></div> <h2 class="empty-title svelte-wl2tsh">No cycle data yet</h2> <p class="empty-description svelte-wl2tsh">Start tracking your cycle to see insights and predictions.</p> `);
      PebbleButton($$renderer2, { label: "Log period", onclick: handleBack });
      $$renderer2.push(`<!----></main>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
