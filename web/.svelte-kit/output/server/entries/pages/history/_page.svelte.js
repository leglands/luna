import { c as escape_html, e as ensure_array_like } from "../../../chunks/root.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
/* empty css                                                           */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let heroValue = "0";
    let statusLine = "Start logging to see history";
    let cycles = [];
    $$renderer2.push(`<div class="screen svelte-1xl2tfr" data-app="luna"><header class="svelte-1xl2tfr"><button class="back svelte-1xl2tfr">Back</button></header> <main class="hero svelte-1xl2tfr"><div class="hero-display svelte-1xl2tfr"><span class="hero-value svelte-1xl2tfr">${escape_html(heroValue)}</span> <span class="hero-label svelte-1xl2tfr">Cycles tracked</span></div> <p class="status svelte-1xl2tfr">${escape_html(statusLine)}</p> `);
    if (cycles.length === 0) {
      $$renderer2.push("<!--[0-->");
      PebbleButton($$renderer2, { label: "Log today", size: "lg", onclick: () => goto() });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<ul class="list svelte-1xl2tfr"><!--[-->`);
      const each_array = ensure_array_like(cycles);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let c = each_array[$$index];
        $$renderer2.push(`<li class="row svelte-1xl2tfr"><span class="row-label svelte-1xl2tfr">${escape_html(c.label)}</span> <span class="row-value svelte-1xl2tfr">${escape_html(c.len)} days</span></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></main></div>`);
  });
}
export {
  _page as default
};
