import { a as attr_class, s as stringify } from "./index2.js";
import { I as Icon } from "./StitchCP.svelte_svelte_type_style_lang.js";
function PrivacyBadge($$renderer, $$props) {
  let { expanded = false, class: className = "" } = $$props;
  $$renderer.push(`<div${attr_class(`privacy-badge ${stringify(className)}`, "svelte-1710v6o")}>`);
  if (expanded) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="badge-expanded svelte-1710v6o"><span class="badge-icon svelte-1710v6o">`);
    Icon($$renderer, { name: "shield-check", size: 18 });
    $$renderer.push(`<!----></span> <div class="badge-content svelte-1710v6o"><p class="badge-title svelte-1710v6o">Private &amp; Encrypted</p> <p class="badge-desc svelte-1710v6o">Your data is protected with AES-256-GCM encryption and Argon2id key derivation (64MB RAM, 3 iterations). Only you have access to your personal information.</p></div></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
    $$renderer.push(`<span class="badge-compact svelte-1710v6o">`);
    Icon($$renderer, { name: "shield-check", size: 14 });
    $$renderer.push(`<!----> <span>Private &amp; Encrypted</span></span>`);
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  PrivacyBadge as P
};
