import { a as attr, f as attr_style, b as stringify, i as derived, e as escape_html, c as ensure_array_like, d as attr_class } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { P as PebbleButton } from "../../../chunks/DSOnboarding.svelte_svelte_type_style_lang.js";
function DSOnboarding($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      currentStep = 0,
      totalSteps = 1,
      canProceed = true,
      isFinishing = false,
      showWelcome = false,
      onNext = () => {
      },
      nextLabel = "Continue",
      finishLabel = "Let's begin",
      brand = "luna",
      children,
      welcomeContent
    } = $$props;
    const progress = derived(() => (currentStep + 1) / totalSteps * 100);
    const isLast = derived(() => currentStep >= totalSteps - 1);
    const btnLabel = derived(() => isLast() ? finishLabel : nextLabel);
    $$renderer2.push(`<div class="ds-ob svelte-11mmp4l"><div class="ds-ob__progress svelte-11mmp4l" role="progressbar"${attr("aria-valuenow", currentStep + 1)}${attr("aria-valuemin", 1)}${attr("aria-valuemax", totalSteps)}${attr("aria-label", `Step ${stringify(currentStep + 1)} of ${stringify(totalSteps)}`)}><div class="ds-ob__progress-fill svelte-11mmp4l"${attr_style(`width: ${stringify(progress())}%`)}></div></div> <div class="ds-ob__content svelte-11mmp4l">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div> <nav class="ds-ob__nav svelte-11mmp4l" aria-label="Onboarding navigation"><div class="ds-ob__nav-left svelte-11mmp4l">`);
    if (currentStep > 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="ds-ob__back svelte-11mmp4l" aria-label="Go back"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg> Back</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="ds-ob__nav-right svelte-11mmp4l">`);
    PebbleButton($$renderer2, {
      label: btnLabel(),
      disabled: !canProceed,
      loading: isFinishing,
      onclick: onNext,
      size: "md",
      brand
    });
    $$renderer2.push(`<!----></div></nav> `);
    if (showWelcome) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="ds-ob__welcome svelte-11mmp4l" role="dialog" aria-modal="true" aria-label="Welcome">`);
      if (welcomeContent) {
        $$renderer2.push("<!--[0-->");
        welcomeContent($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg viewBox="0 0 64 64" width="72" height="72" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="var(--c-brand)" fill-opacity="0.12"></circle><path d="M20 33l9 9 15-18" stroke="var(--c-brand)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg> <h2 class="svelte-11mmp4l">You're all set!</h2> <p class="svelte-11mmp4l">Your data is private and stays on your device.</p>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
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
    const canProceed = derived(() => step !== 2 || lastPeriodDate !== "");
    {
      let children = function($$renderer3) {
        if (step === 0) {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="var(--c-brand)" fill-opacity="0.12"></circle><path d="M72 30 A34 34 0 1 0 72 90 A22 22 0 1 1 72 30Z" fill="none" stroke="var(--c-brand)" stroke-width="2.5" stroke-linecap="round"></path></svg> <h1 class="svelte-fpvdp2">Hi, I'm Luna</h1> <p class="svelte-fpvdp2">Your cycle, understood. Log in seconds, understand your body over time — privately, on your device.</p>`);
        } else if (step === 1) {
          $$renderer3.push("<!--[1-->");
          $$renderer3.push(`<h1 class="svelte-fpvdp2">What should I call you?</h1> <p class="svelte-fpvdp2">Optional — only used to personalise your experience.</p> <input type="text"${attr("value", firstName)} placeholder="Your first name" class="ob-input svelte-fpvdp2" autocomplete="given-name"/>`);
        } else if (step === 2) {
          $$renderer3.push("<!--[2-->");
          $$renderer3.push(`<h1 class="svelte-fpvdp2">When did your last period start?</h1> <p class="svelte-fpvdp2">This helps Luna predict your next cycle right away.</p> <input type="date"${attr("value", lastPeriodDate)} class="ob-input svelte-fpvdp2"${attr("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])}/>`);
        } else if (step === 3) {
          $$renderer3.push("<!--[3-->");
          $$renderer3.push(`<h1 class="svelte-fpvdp2">Your cycle rhythm</h1> <p class="svelte-fpvdp2">We'll refine this over time as Luna learns your pattern.</p> <div class="slider-group svelte-fpvdp2"><label class="svelte-fpvdp2">Cycle length: <strong>${escape_html(cycleLength)} days</strong></label> <input type="range"${attr("value", cycleLength)} min="21" max="35" step="1" class="slider svelte-fpvdp2"/> <div class="slider-range svelte-fpvdp2"><span>21</span><span>35</span></div></div> <div class="slider-group svelte-fpvdp2"><label class="svelte-fpvdp2">Period length: <strong>${escape_html(periodLength)} days</strong></label> <input type="range"${attr("value", periodLength)} min="2" max="8" step="1" class="slider svelte-fpvdp2"/> <div class="slider-range svelte-fpvdp2"><span>2</span><span>8</span></div></div>`);
        } else {
          $$renderer3.push("<!--[-1-->");
          $$renderer3.push(`<h1 class="svelte-fpvdp2">What brings you to Luna?</h1> <p class="svelte-fpvdp2">Choose all that apply. You can change this anytime.</p> <div class="goals-grid svelte-fpvdp2"><!--[-->`);
          const each_array = ensure_array_like(GOALS);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let g = each_array[$$index];
            $$renderer3.push(`<button${attr_class("goal-chip svelte-fpvdp2", void 0, { "active": selectedGoals.has(g.id) })}>${escape_html(g.label)}</button>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      DSOnboarding($$renderer2, {
        currentStep: step,
        totalSteps: TOTAL,
        canProceed: canProceed(),
        onNext: next,
        brand: "luna",
        finishLabel: "Start tracking",
        children
      });
    }
  });
}
export {
  _page as default
};
