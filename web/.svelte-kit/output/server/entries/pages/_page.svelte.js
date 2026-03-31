import { d as attr_class, b as stringify, e as escape_html, c as ensure_array_like, f as attr_style, i as derived } from "../../chunks/index2.js";
import { g as goto } from "../../chunks/client.js";
import { I as Icon } from "../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../chunks/PebbleButton.js";
import { S as SegmentedRing } from "../../chunks/SegmentedRing.js";
import { T as TabBar } from "../../chunks/TabBar.js";
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
    const EMPATHY = {
      menstrual: { fallback: "Rest and be gentle with yourself.", icon: "heart" },
      follicular: { fallback: "Your energy is rising — embrace it.", icon: "sun" },
      ovulation: { fallback: "You are at your peak. Shine.", icon: "sparkles" },
      luteal: { fallback: "Take it one step at a time.", icon: "moon" },
      unknown: { fallback: "Your body, your rhythm.", icon: "heart" }
    };
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
    const SHORT_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const empathy = derived(() => EMPATHY[cycleInfo.phase] ?? EMPATHY.unknown);
    const phaseIndex = derived(() => PHASE_IDX[cycleInfo.phase]);
    const periodLength = derived(() => data.settings?.periodLength);
    const cycleLength = derived(() => data.settings?.cycleLength);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - 3 + i);
      d.setHours(0, 0, 0, 0);
      return d;
    });
    function isToday(d) {
      const t = /* @__PURE__ */ new Date();
      return d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
    }
    function getDayEvent(d) {
      return null;
    }
    function eventColor(d) {
      const ev = getDayEvent();
      if (ev === "period") return "#6B3FA0";
      if (ev === "ovulation") return "#CE93D8";
      if (ev === "fertile") return "#34C759";
      return "transparent";
    }
    function hasEvent(d) {
      return getDayEvent() !== null;
    }
    $$renderer2.push(`<div class="home-page svelte-1uha8ag" data-app="luna"><main class="scroll-content svelte-1uha8ag"><section class="hero svelte-1uha8ag">`);
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
      size: 180
    });
    $$renderer2.push(`<!----> <p class="phase-name svelte-1uha8ag">${escape_html(PHASE_LABELS[cycleInfo.phase])}</p> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="next-hint svelte-1uha8ag">Next period in ${escape_html(cycleInfo.daysUntilNextPeriod)} days</p>`);
    }
    $$renderer2.push(`<!--]--></section> <div class="week-strip svelte-1uha8ag"><!--[-->`);
    const each_array = ensure_array_like(weekDays);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let day = each_array[$$index];
      $$renderer2.push(`<div${attr_class("week-day svelte-1uha8ag", void 0, { "today": isToday(day) })}><span class="wd-name svelte-1uha8ag">${escape_html(SHORT_DAYS[day.getDay()])}</span> <div${attr_class("wd-num svelte-1uha8ag", void 0, { "wd-today": isToday(day) })}>${escape_html(day.getDate())}</div> <div class="wd-dot svelte-1uha8ag"${attr_style(`background:${stringify(eventColor())}; opacity:${stringify(hasEvent() ? 1 : 0)}`)}></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="empathy-wrapper svelte-1uha8ag">`);
    EmpathyBanner($$renderer2, { message: empathy() });
    $$renderer2.push(`<!----></div> <section class="quick-actions svelte-1uha8ag"><h3 class="qa-title svelte-1uha8ag">Quick log</h3> <div class="qa-row svelte-1uha8ag"><button class="qa-btn svelte-1uha8ag"><span class="qa-icon svelte-1uha8ag" style="background:#FFCDD2">`);
    Icon($$renderer2, { name: "droplets", size: 20, color: "#C62828" });
    $$renderer2.push(`<!----></span> <span class="qa-label svelte-1uha8ag">Period</span></button> <button class="qa-btn svelte-1uha8ag"><span class="qa-icon svelte-1uha8ag" style="background:#FCE4EC">`);
    Icon($$renderer2, { name: "clipboard", size: 20, color: "#AD1457" });
    $$renderer2.push(`<!----></span> <span class="qa-label svelte-1uha8ag">Symptoms</span></button> <button class="qa-btn svelte-1uha8ag"><span class="qa-icon svelte-1uha8ag" style="background:#EDE7F6">`);
    Icon($$renderer2, { name: "thermometer", size: 20, color: "#5E35B1" });
    $$renderer2.push(`<!----></span> <span class="qa-label svelte-1uha8ag">Temperature</span></button> <button class="qa-btn svelte-1uha8ag"><span class="qa-icon svelte-1uha8ag" style="background:#FFF9C4">`);
    Icon($$renderer2, { name: "smile", size: 20, color: "#F57F17" });
    $$renderer2.push(`<!----></span> <span class="qa-label svelte-1uha8ag">Mood</span></button></div></section></main> <div class="bottom-cta svelte-1uha8ag">`);
    PebbleButton($$renderer2, { label: "Log today", size: "lg", onclick: () => goto() });
    $$renderer2.push(`<!----></div> `);
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
