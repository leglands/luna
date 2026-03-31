import { a as attr_class, b as attr_style, c as attr, e as escape_html, s as stringify, f as ensure_array_like, k as derived } from "../../chunks/index2.js";
import { I as Icon, P as PebbleButton } from "../../chunks/StitchCP.svelte_svelte_type_style_lang.js";
import { E as EmpathyBanner } from "../../chunks/EmpathyBanner.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/root.js";
import "../../chunks/state.svelte.js";
function PebbleAction($$renderer, $$props) {
  let {
    icon = "plus",
    label = "",
    color = "#3c684b",
    active = false,
    onclick = null,
    class: className = ""
  } = $$props;
  $$renderer.push(`<button${attr_class(`pebble-action ${stringify(className)}`, "svelte-tj96p3", { "pebble-action--active": active })}${attr_style(`--action-color: ${stringify(color)}`)}${attr("aria-pressed", active)}><span class="pebble-icon svelte-tj96p3">`);
  Icon($$renderer, { name: icon, size: 24 });
  $$renderer.push(`<!----></span> `);
  if (label) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="pebble-label svelte-tj96p3">${escape_html(label)}</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></button>`);
}
function TabBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND_COLORS = {
      luna: "#D4678A",
      aura: "#E8A87C",
      sienna: "#3c684b",
      alma: "#7BA7A7",
      nova: "#6366F1",
      aida: "#8B5CF6"
    };
    let {
      tabs = [],
      activeIndex = 0,
      brand = "luna",
      class: className = ""
    } = $$props;
    const brandColor = derived(() => BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
    $$renderer2.push(`<nav${attr_class(`tab-bar ${stringify(className)}`, "svelte-1lgda09")}${attr_style(`--tab-brand: ${stringify(brandColor())}`)} role="tablist" aria-label="Main navigation"><!--[-->`);
    const each_array = ensure_array_like(tabs.slice(0, 5));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let tab = each_array[i];
      $$renderer2.push(`<a${attr("href", tab.href)}${attr_class("tab-item svelte-1lgda09", void 0, { "tab-item--active": i === activeIndex })} role="tab"${attr("aria-selected", i === activeIndex)}${attr("aria-label", tab.label)}><span class="tab-icon svelte-1lgda09">`);
      Icon($$renderer2, { name: tab.icon, size: 20 });
      $$renderer2.push(`<!----></span> <span class="tab-label svelte-1lgda09">${escape_html(tab.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></nav>`);
  });
}
function getCurrentPhase(lastPeriodDate, cycleLength = 28, today = /* @__PURE__ */ new Date()) {
  return { phase: "unknown", dayOfPhase: 0, fertileStart: null, fertileEnd: null };
}
function getFertileWindow(lastPeriodDate, cycleLength = 28) {
  const phase = getCurrentPhase(lastPeriodDate, cycleLength);
  return {
    start: phase.fertileStart,
    end: phase.fertileEnd
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = {
      settings: { cycleLength: 28, lastPeriodDate: null },
      log: { period: [] }
    };
    let cycleInfo = {
      phase: "follicular",
      dayOfCycle: 1,
      daysUntilNextPeriod: 14
    };
    (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const phaseIcons = {
      menstrual: "droplets",
      follicular: "sun",
      ovulation: "sparkles",
      luteal: "moon"
    };
    const phaseLabels = {
      menstrual: "Menstrual",
      follicular: "Follicular",
      ovulation: "Fertile",
      luteal: "Luteal"
    };
    const cycleDays = derived(() => data.settings.cycleLength);
    const fertileWindow = derived(() => getFertileWindow(data.settings.lastPeriodDate, cycleDays()));
    const isInFertileWindow = derived(() => () => {
      if (!fertileWindow().start || !fertileWindow().end) return false;
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return today >= fertileWindow().start && today <= fertileWindow().end;
    });
    const todayLogged = derived(() => () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      return data.log.period?.find((p) => p.date === today);
    });
    const isLatePeriod = derived(() => () => {
      return cycleInfo.daysUntilNextPeriod < -5;
    });
    const isHeavyFlow = derived(() => () => {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const todayEntry = data.log.period?.find((p) => p.date === today);
      return todayEntry && (todayEntry.flow === "heavy" || todayEntry.flow === "soaking");
    });
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="luna-app svelte-1uha8ag" data-app="luna"><header class="app-header svelte-1uha8ag"><h1 class="svelte-1uha8ag">Luna</h1> <button class="icon-btn svelte-1uha8ag" aria-label="Settings">`);
      Icon($$renderer2, { name: "settings", size: 20 });
      $$renderer2.push(`<!----></button></header> <main class="app-main svelte-1uha8ag">`);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="home-view svelte-1uha8ag"><div class="hero-card svelte-1uha8ag" style="background: var(--c-hero-gradient, linear-gradient(135deg, #D4678A 0%, #E8A87C 100%))"><div class="phase-header svelte-1uha8ag">`);
        Icon($$renderer2, { name: phaseIcons[cycleInfo.phase], size: 24 });
        $$renderer2.push(`<!----> <span class="phase-label svelte-1uha8ag">${escape_html(phaseLabels[cycleInfo.phase])}</span></div> <div class="days-counter svelte-1uha8ag"><span class="day-number svelte-1uha8ag">Day ${escape_html(cycleInfo.dayOfCycle)}</span> <span class="cycle-of svelte-1uha8ag">of ${escape_html(cycleDays())}</span></div> `);
        {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<p class="next-hint svelte-1uha8ag">Next period in ${escape_html(cycleInfo.daysUntilNextPeriod)} days</p>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        if (isLatePeriod()()) {
          $$renderer2.push("<!--[0-->");
          EmpathyBanner($$renderer2, {
            message: {
              icon: "heart",
              fallback: "Your period is a few days late. This can be completely normal. Let us know when it arrives."
            }
          });
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (isHeavyFlow()()) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="alert-card alert-warn svelte-1uha8ag">`);
          Icon($$renderer2, { name: "alert-triangle", size: 20 });
          $$renderer2.push(`<!----> <p class="svelte-1uha8ag">If you're soaking through protection every hour, consider speaking with your doctor.</p></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (isInFertileWindow()()) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="fertile-indicator svelte-1uha8ag">`);
          Icon($$renderer2, { name: "sparkles", size: 16 });
          $$renderer2.push(`<!----> <span>Fertile window</span></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="quick-actions svelte-1uha8ag">`);
        PebbleAction($$renderer2, {
          icon: "droplets",
          label: "Log period",
          color: "#D4678A",
          onclick: () => {
          }
        });
        $$renderer2.push(`<!----> `);
        PebbleAction($$renderer2, {
          icon: "heart",
          label: "Symptoms",
          color: "#E5A855",
          onclick: () => {
          }
        });
        $$renderer2.push(`<!----> `);
        PebbleAction($$renderer2, {
          icon: "thermometer",
          label: "Temperature",
          color: "#5BA876",
          onclick: () => {
          }
        });
        $$renderer2.push(`<!----></div> <div class="today-card svelte-1uha8ag">`);
        if (todayLogged()()) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<h3 class="svelte-1uha8ag">Today's entry</h3> <p class="entry-summary svelte-1uha8ag">Logged: ${escape_html(todayLogged()().flow)} flow</p>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<h3 class="svelte-1uha8ag">Log today</h3> `);
          PebbleButton($$renderer2, {
            brand: "luna",
            label: "Log entry",
            size: "md",
            onclick: () => true
          });
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></main> `);
      TabBar($$renderer2, {
        tabs: [
          { id: "home", label: "Home", icon: "home" },
          { id: "calendar", label: "Calendar", icon: "calendar" },
          { id: "log", label: "Log", icon: "plus-circle" },
          { id: "insights", label: "Insights", icon: "chart" },
          { id: "settings", label: "Settings", icon: "settings" }
        ],
        brand: "luna"
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
