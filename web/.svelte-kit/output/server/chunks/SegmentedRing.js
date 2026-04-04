import { a as attr_class, f as attr_style, b as attr, e as ensure_array_like, c as escape_html, d as derived, s as stringify } from "./root.js";
/* empty css                                             */
function SegmentedRing($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      segments = [],
      currentIndex = 0,
      centerText = "",
      centerSubtext = "",
      size = 120,
      class: className = ""
    } = $$props;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    function polarToCartesian(cx, cy, r, angle) {
      const rad = (angle - 90) * Math.PI / 180;
      return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }
    function describeArc(cx, cy, r, startAngle, endAngle) {
      const start = polarToCartesian(cx, cy, r, endAngle);
      const end = polarToCartesian(cx, cy, r, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
      return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    }
    const totalSegments = derived(() => segments.length);
    const segmentAngle = derived(() => 360 / totalSegments());
    const arcPaths = derived(() => segments.map((seg, i) => {
      const startAngle = i * segmentAngle();
      const endAngle = startAngle + segmentAngle() - 2;
      return {
        ...seg,
        path: describeArc(size / 2, size / 2, radius, startAngle, endAngle),
        isCurrent: i === currentIndex
      };
    }));
    $$renderer2.push(`<div${attr_class(`segmented-ring ${stringify(className)}`, "svelte-1emoo3r")}${attr_style(`--ring-size: ${stringify(size)}px`)} role="img"${attr("aria-label", centerText || "Progress ring")}><svg${attr("width", size)}${attr("height", size)}${attr("viewBox", `0 0 ${stringify(size)} ${stringify(size)}`)} class="ring-svg svelte-1emoo3r"><circle${attr("cx", size / 2)}${attr("cy", size / 2)}${attr("r", radius)} fill="none" stroke="var(--c-surface-container)"${attr("stroke-width", strokeWidth)} class="svelte-1emoo3r"></circle><!--[-->`);
    const each_array = ensure_array_like(arcPaths());
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let arc = each_array[$$index];
      $$renderer2.push(`<g class="arc-group svelte-1emoo3r"><path${attr("d", arc.path)} fill="none"${attr("stroke", arc.color)}${attr("stroke-width", arc.isCurrent && true ? strokeWidth + 4 : strokeWidth)} stroke-linecap="round"${attr_class("arc svelte-1emoo3r", void 0, { "arc--active": arc.isCurrent })}></path>`);
      if (arc.isCurrent && true) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<path${attr("d", arc.path)} fill="none"${attr("stroke", arc.color)}${attr("stroke-width", strokeWidth + 8)} stroke-linecap="round" opacity="0.2" class="arc-glow svelte-1emoo3r"></path>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></g>`);
    }
    $$renderer2.push(`<!--]--></svg> <div class="ring-center svelte-1emoo3r">`);
    if (centerText) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="ring-text svelte-1emoo3r">${escape_html(centerText)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (centerSubtext) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="ring-subtext svelte-1emoo3r">${escape_html(centerSubtext)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  SegmentedRing as S
};
