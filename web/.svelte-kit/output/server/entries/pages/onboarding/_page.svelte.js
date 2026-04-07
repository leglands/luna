import { b as attr, c as escape_html } from "../../../chunks/root.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/DSNavSheet.svelte_svelte_type_style_lang.js";
import "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let lastPeriodDate = "";
    let cycleLength = 28;
    let periodLength = 5;
    function complete() {
      const data = {
        settings: {
          lastPeriodDate: null,
          cycleLength: Number(cycleLength),
          periodLength: Number(periodLength)
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
      goto();
    }
    $$renderer2.push(`<div class="screen svelte-fpvdp2" data-app="luna"><div class="ob-page svelte-fpvdp2"><div class="ob-header svelte-fpvdp2"><svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true" class="svelte-fpvdp2"><path d="M50 14 A28 28 0 1 0 50 66 A18 18 0 1 1 50 14Z" fill="none" stroke="var(--c-brand)" stroke-width="2" stroke-linecap="round" class="svelte-fpvdp2"></path></svg> <h1 class="ob-title svelte-fpvdp2">Welcome to Luna</h1> <p class="ob-sub svelte-fpvdp2">Your cycle, on your device. Private by design.</p></div> <div class="ob-form svelte-fpvdp2"><div class="field svelte-fpvdp2"><label class="field-label svelte-fpvdp2" for="last-period">Last period start <span class="field-hint svelte-fpvdp2">Optional</span></label> <input id="last-period" type="date"${attr("value", lastPeriodDate)}${attr("max", today)} class="ob-input svelte-fpvdp2"/></div> <div class="field svelte-fpvdp2"><label class="field-label svelte-fpvdp2" for="cycle-len">Cycle length <span class="field-value svelte-fpvdp2">${escape_html(cycleLength)} days</span></label> <input id="cycle-len" type="range"${attr("value", cycleLength)} min="21" max="45" step="1" class="slider svelte-fpvdp2"${attr("aria-valuenow", cycleLength)} aria-valuemin="21" aria-valuemax="45"/> <div class="slider-range svelte-fpvdp2"><span class="svelte-fpvdp2">21</span><span class="svelte-fpvdp2">45</span></div></div> <div class="field svelte-fpvdp2"><label class="field-label svelte-fpvdp2" for="period-len">Period length <span class="field-value svelte-fpvdp2">${escape_html(periodLength)} days</span></label> <input id="period-len" type="range"${attr("value", periodLength)} min="2" max="8" step="1" class="slider svelte-fpvdp2"${attr("aria-valuenow", periodLength)} aria-valuemin="2" aria-valuemax="8"/> <div class="slider-range svelte-fpvdp2"><span class="svelte-fpvdp2">2</span><span class="svelte-fpvdp2">8</span></div></div></div> <div class="ob-actions svelte-fpvdp2">`);
    PebbleButton($$renderer2, { label: "Start tracking", onclick: complete });
    $$renderer2.push(`<!----> <button class="skip-btn svelte-fpvdp2">Skip for now</button></div></div></div>`);
  });
}
export {
  _page as default
};
