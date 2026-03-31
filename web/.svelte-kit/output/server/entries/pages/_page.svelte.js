import { d as attr_class, f as attr_style, a as attr, c as ensure_array_like, e as escape_html, i as derived, b as stringify } from "../../chunks/index2.js";
import { g as goto } from "../../chunks/client.js";
import { I as Icon, P as PebbleButton } from "../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { T as TabBar } from "../../chunks/TabBar.js";
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
function EmpathyBanner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { message = null, class: className = "" } = $$props;
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = {
      settings: { cycleLength: 28, periodLength: 5 }
    };
    let cycleInfo = { phase: "unknown", dayOfCycle: 1, daysUntilNextPeriod: 14 };
    const empathyMessages = {
      morning: [
        "A new day, a new beginning.",
        "Take a moment for yourself.",
        "Your body, your rhythm."
      ],
      evening: [
        "Rest is part of the cycle.",
        "Tomorrow is a new opportunity.",
        "Listen to your body."
      ]
    };
    const empathy = derived(() => () => {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      const timeKey = hour < 12 ? "morning" : "evening";
      const messages = empathyMessages[timeKey];
      return messages[Math.floor(Math.random() * messages.length)];
    });
    const phaseLabels = {
      menstrual: "Menstrual",
      follicular: "Follicular",
      ovulation: "Ovulation",
      luteal: "Luteal",
      unknown: "Unknown"
    };
    const PHASE_IDX = {
      menstrual: 0,
      follicular: 1,
      ovulation: 2,
      luteal: 3,
      unknown: 0
    };
    const phaseIndex = derived(() => PHASE_IDX[cycleInfo.phase]);
    const periodLength = derived(() => data.settings?.periodLength);
    const cycleLength = derived(() => data.settings?.cycleLength);
    $$renderer2.push(`<div class="home-page svelte-1uha8ag" data-app="luna"><main class="hero svelte-1uha8ag"><div class="day-display svelte-1uha8ag"><span class="day-number svelte-1uha8ag">${escape_html(cycleInfo.dayOfCycle)}</span> <span class="day-label svelte-1uha8ag">Day</span></div> `);
    SegmentedRing($$renderer2, {
      segments: [
        { label: "Menstrual", color: "#E57373", value: periodLength() },
        {
          label: "Follicular",
          color: "#F48FB1",
          value: Math.floor(cycleLength() * 0.35)
        },
        {
          label: "Ovulation",
          color: "#CE93D8",
          value: Math.floor(cycleLength() * 0.14)
        },
        {
          label: "Luteal",
          color: "#9FA8DA",
          value: cycleLength() - periodLength() - Math.floor(cycleLength() * 0.49)
        }
      ],
      currentIndex: phaseIndex(),
      centerText: String(cycleInfo.dayOfCycle),
      centerSubtext: "Day",
      size: 200
    });
    $$renderer2.push(`<!----> <p class="phase-name svelte-1uha8ag">${escape_html(phaseLabels[cycleInfo.phase])}</p> `);
    PebbleButton($$renderer2, { label: "Log today", size: "lg", onclick: () => goto() });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="next-hint svelte-1uha8ag">Next period in ${escape_html(cycleInfo.daysUntilNextPeriod)} days</p>`);
    }
    $$renderer2.push(`<!--]--></main> `);
    EmpathyBanner($$renderer2, { message: empathy()() });
    $$renderer2.push(`<!----> `);
    TabBar($$renderer2, {
      tabs: [
        { id: "home", label: "Home", icon: "home" },
        { id: "cycle", label: "Cycle", icon: "calendar" },
        { id: "fertility", label: "Fertile", icon: "heart" },
        { id: "insights", label: "Insights", icon: "bar-chart" },
        { id: "settings", label: "Settings", icon: "settings" }
      ],
      activeTab: "home",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
