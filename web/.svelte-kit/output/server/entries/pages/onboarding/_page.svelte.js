import { c as ensure_array_like, d as attr_class, a as attr, b as stringify, e as escape_html, f as attr_style } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { P as PebbleButton } from "../../../chunks/EmotionPicker.svelte_svelte_type_style_lang.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND = "#E91E8C";
    const TOTAL = 5;
    let step = 0;
    let firstName = "";
    let lastPeriodDate = "";
    let cycleLength = 28;
    let periodLength = 5;
    let selectedGoals = /* @__PURE__ */ new Set();
    const GOALS = [
      { id: "track", label: "Track my cycle" },
      { id: "pregnancy", label: "Plan a pregnancy" },
      { id: "understand", label: "Understand my body" },
      { id: "pms", label: "Manage PMS" },
      { id: "curious", label: "Just curious" }
    ];
    function next() {
      if (step < TOTAL - 1) {
        step++;
        return;
      }
      complete();
    }
    function complete() {
      const data = {
        settings: {
          firstName: firstName.trim(),
          lastPeriodDate,
          cycleLength: Number(cycleLength),
          periodLength: Number(periodLength),
          goals: [...selectedGoals]
        },
        log: {
          period: [],
          symptoms: [],
          temperature: [],
          mood: [],
          energy: []
        }
      };
      localStorage.setItem("life-luna-data", JSON.stringify(data));
      localStorage.setItem("life-luna-onboarded", "1");
      localStorage.setItem("life-luna-tour-pending", "1");
      goto();
    }
    $$renderer2.push(`<div class="onboarding svelte-fpvdp2" data-app="luna"><div class="dots svelte-fpvdp2"><!--[-->`);
    const each_array = ensure_array_like(Array(TOTAL));
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      each_array[i];
      $$renderer2.push(`<span${attr_class("dot svelte-fpvdp2", void 0, { "active": i === step })}></span>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (step === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="slide svelte-fpvdp2"><svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true"><circle cx="60" cy="60" r="50"${attr("fill", BRAND)} fill-opacity="0.12"></circle><path d="M72 30 A34 34 0 1 0 72 90 A22 22 0 1 1 72 30Z" fill="none"${attr("stroke", BRAND)} stroke-width="2.5" stroke-linecap="round"></path></svg> <h1 class="svelte-fpvdp2">Hi, I'm Luna</h1> <p class="svelte-fpvdp2">Your cycle, understood. Log in seconds, understand your body over time — privately, on your device.</p> `);
      PebbleButton($$renderer2, {
        label: "Get started",
        size: "lg",
        onclick: next,
        style: `--pebble-brand:${stringify(BRAND)}`
      });
      $$renderer2.push(`<!----></div>`);
    } else if (step === 1) {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="slide svelte-fpvdp2"><h1 class="svelte-fpvdp2">What should I call you?</h1> <p class="svelte-fpvdp2">Optional — only used to personalise your experience.</p> <input type="text"${attr("value", firstName)} placeholder="Your first name" class="input svelte-fpvdp2" autocomplete="given-name"/> `);
      PebbleButton($$renderer2, {
        label: "Continue",
        size: "lg",
        onclick: next,
        style: `--pebble-brand:${stringify(BRAND)}`
      });
      $$renderer2.push(`<!----> <button class="skip svelte-fpvdp2">Skip</button></div>`);
    } else if (step === 2) {
      $$renderer2.push("<!--[2-->");
      $$renderer2.push(`<div class="slide svelte-fpvdp2"><h1 class="svelte-fpvdp2">When did your last period start?</h1> <p class="svelte-fpvdp2">This helps Luna predict your next cycle right away.</p> <input type="date"${attr("value", lastPeriodDate)} class="input svelte-fpvdp2"${attr("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])}/> `);
      PebbleButton($$renderer2, {
        label: "Continue",
        size: "lg",
        onclick: next,
        disabled: !lastPeriodDate,
        style: `--pebble-brand:${stringify(BRAND)}`
      });
      $$renderer2.push(`<!----></div>`);
    } else if (step === 3) {
      $$renderer2.push("<!--[3-->");
      $$renderer2.push(`<div class="slide svelte-fpvdp2"><h1 class="svelte-fpvdp2">Your cycle rhythm</h1> <p class="svelte-fpvdp2">We'll refine this over time as Luna learns your pattern.</p> <div class="slider-group svelte-fpvdp2"><label class="svelte-fpvdp2">Cycle length: <strong>${escape_html(cycleLength)} days</strong></label> <input type="range"${attr("value", cycleLength)} min="21" max="35" step="1" class="slider svelte-fpvdp2"/> <div class="slider-range svelte-fpvdp2"><span>21</span><span>35</span></div></div> <div class="slider-group svelte-fpvdp2"><label class="svelte-fpvdp2">Period length: <strong>${escape_html(periodLength)} days</strong></label> <input type="range"${attr("value", periodLength)} min="2" max="8" step="1" class="slider svelte-fpvdp2"/> <div class="slider-range svelte-fpvdp2"><span>2</span><span>8</span></div></div> `);
      PebbleButton($$renderer2, {
        label: "Continue",
        size: "lg",
        onclick: next,
        style: `--pebble-brand:${stringify(BRAND)}`
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="slide svelte-fpvdp2"><h1 class="svelte-fpvdp2">What brings you to Luna?</h1> <p class="svelte-fpvdp2">Choose all that apply. You can change this anytime.</p> <div class="goals-grid svelte-fpvdp2"><!--[-->`);
      const each_array_1 = ensure_array_like(GOALS);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let g = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class("goal-chip svelte-fpvdp2", void 0, { "active": selectedGoals.has(g.id) })}${attr_style(selectedGoals.has(g.id) ? `background:${BRAND};color:white;border-color:${BRAND}` : "")}>${escape_html(g.label)}</button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      PebbleButton($$renderer2, {
        label: "Start tracking",
        size: "lg",
        onclick: complete,
        style: `--pebble-brand:${stringify(BRAND)}`
      });
      $$renderer2.push(`<!----> <button class="skip svelte-fpvdp2">Skip</button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
