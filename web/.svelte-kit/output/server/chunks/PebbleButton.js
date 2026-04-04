import { m as attributes, s as stringify, c as escape_html, d as derived } from "./root.js";
import { I as Icon } from "./PebbleButton.svelte_svelte_type_style_lang.js";
function PebbleButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#6B3FA0",
      aura: "#00897B",
      sienna: "#33D298",
      alma: "#5E35B1",
      nova: "#23003D",
      aida: "#1565C0",
      stella: "#F57F17",
      vera: "#C62828",
      vita: "#2E7D32",
      aria: "#283593"
    };
    let {
      brand = "luna",
      label = "",
      icon = null,
      size = "md",
      variant = "primary",
      disabled = false,
      loading = false,
      onclick = null,
      class: className = "",
      "data-testid": dataTestid = void 0,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    const iconSize = { sm: 14, md: 16, lg: 18 }[size] ?? 16;
    $$renderer2.push(`<button${attributes(
      {
        class: `pebble-btn pebble-btn--${stringify(size)} pebble-btn--${stringify(variant)} ${stringify(className)}`,
        disabled: disabled || loading,
        style: `--pebble-brand: ${stringify(brandColor())}`,
        "data-testid": dataTestid,
        ...restProps
      },
      "svelte-ci6yf5",
      { "pebble-btn--loading": loading }
    )}>`);
    if (loading) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="pebble-spinner svelte-ci6yf5" aria-hidden="true"></span>`);
    } else if (icon) {
      $$renderer2.push("<!--[1-->");
      Icon($$renderer2, { name: icon, size: iconSize });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (label) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="pebble-label svelte-ci6yf5">${escape_html(label)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
export {
  PebbleButton as P
};
