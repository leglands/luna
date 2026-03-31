import { d as attr_class, f as attr_style, a as attr, c as ensure_array_like, e as escape_html, i as derived, b as stringify } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { I as Icon } from "../../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { T as TabBar } from "../../../chunks/TabBar.js";
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = {
      settings: { cycleLength: 28, periodLength: 5 }
    };
    let displayMonth = /* @__PURE__ */ new Date();
    let selectedDate = null;
    const TABS = [
      { id: "home", label: "Home", icon: "home" },
      { id: "cycle", label: "Cycle", icon: "calendar" },
      { id: "fertility", label: "Fertile", icon: "heart" },
      { id: "insights", label: "Insights", icon: "bar-chart" },
      { id: "settings", label: "Settings", icon: "settings" }
    ];
    const PHASE_LABELS = {
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
    function fmtDate(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
    function isToday(d) {
      if (!d) return false;
      const t = /* @__PURE__ */ new Date();
      return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
    }
    const cycleInfo = derived(() => {
      const { cycleLength: cl = 28 } = data.settings;
      return { phase: "unknown", dayOfCycle: 1, daysUntilNextPeriod: cl };
    });
    const phaseIndex = derived(() => PHASE_IDX[cycleInfo().phase] ?? 0);
    const periodLength = derived(() => data.settings?.periodLength);
    const cycleLength = derived(() => data.settings?.cycleLength);
    const cycleEvents = derived(() => {
      const events = {};
      return events;
    });
    const calendarDays = derived(() => {
      const year = displayMonth.getFullYear();
      const month = displayMonth.getMonth();
      const firstDow = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days = [];
      for (let i = 0; i < firstDow; i++) days.push(null);
      for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
      return days;
    });
    const monthTitle = derived(() => displayMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
    $$renderer2.push(`<div class="screen svelte-wl2tsh" data-app="luna"><main class="calendar-page svelte-wl2tsh"><div class="card overview-card svelte-wl2tsh">`);
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
      centerText: String(cycleInfo().dayOfCycle),
      centerSubtext: "Day",
      size: 80
    });
    $$renderer2.push(`<!----> <div class="phase-info svelte-wl2tsh"><p class="phase-name svelte-wl2tsh">${escape_html(PHASE_LABELS[cycleInfo().phase] || "Unknown")}</p> `);
    if (cycleInfo().daysUntilNextPeriod > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="phase-hint svelte-wl2tsh">Next period in ${escape_html(cycleInfo().daysUntilNextPeriod)} days</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="phase-hint svelte-wl2tsh">Period expected today</p>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card calendar-card svelte-wl2tsh"><div class="month-header svelte-wl2tsh"><button class="month-nav svelte-wl2tsh" aria-label="Previous month">`);
    Icon($$renderer2, { name: "chevron-left", size: 20 });
    $$renderer2.push(`<!----></button> <h2 class="month-title svelte-wl2tsh">${escape_html(monthTitle())}</h2> <button class="month-nav svelte-wl2tsh" aria-label="Next month">`);
    Icon($$renderer2, { name: "chevron-right", size: 20 });
    $$renderer2.push(`<!----></button></div> <div class="weekday-header svelte-wl2tsh"><!--[-->`);
    const each_array = ensure_array_like(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let d = each_array[$$index];
      $$renderer2.push(`<span>${escape_html(d)}</span>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="calendar-grid svelte-wl2tsh"><!--[-->`);
    const each_array_1 = ensure_array_like(calendarDays());
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let day = each_array_1[$$index_1];
      if (day) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button${attr_class("cal-day svelte-wl2tsh", void 0, {
          "is-today": isToday(day),
          "is-selected": selectedDate === fmtDate(day),
          "is-period": cycleEvents()[fmtDate(day)] === "period",
          "is-fertile": cycleEvents()[fmtDate(day)] === "fertile",
          "is-ovulation": cycleEvents()[fmtDate(day)] === "ovulation"
        })}${attr("aria-label", day.toLocaleDateString())}>${escape_html(day.getDate())}</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span></span>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div class="legend svelte-wl2tsh"><span class="leg-item svelte-wl2tsh"><span class="leg-dot svelte-wl2tsh" style="background:#6B3FA0"></span> Period</span> <span class="leg-item svelte-wl2tsh"><span class="leg-dot svelte-wl2tsh" style="background:#34C759"></span> Fertile</span> <span class="leg-item svelte-wl2tsh"><span class="leg-dot svelte-wl2tsh" style="background:#CE93D8"></span> Ovulation</span></div></div></main> `);
    TabBar($$renderer2, {
      tabs: TABS,
      activeTab: "cycle",
      onchange: (id) => goto(),
      brand: "luna"
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
