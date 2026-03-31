import { a as attr_class, s as stringify, e as escape_html } from "./index2.js";
import { I as Icon } from "./StitchCP.svelte_svelte_type_style_lang.js";
function EmpathyBanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { message = null, onDismiss = () => {
    }, class: className = "" } = $$props;
    if (message) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class(`empathy-banner ${stringify(className)}`, "svelte-k4baxj", {
        "empathy-banner--celebration": message.category === "celebration"
      })} role="status" aria-live="polite"><div class="empathy-icon svelte-k4baxj">`);
      Icon($$renderer2, { name: message.icon || "heart", size: 20 });
      $$renderer2.push(`<!----></div> <p class="empathy-text svelte-k4baxj">${escape_html(message.fallback || message.key)}</p> <button class="empathy-close svelte-k4baxj" aria-label="Dismiss">`);
      Icon($$renderer2, { name: "x", size: 16 });
      $$renderer2.push(`<!----></button></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  EmpathyBanner as E
};
