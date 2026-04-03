import { e as escape_html, c as ensure_array_like, d as attr_class, a as attr, b as stringify } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { P as PebbleButton } from "../../../chunks/DSOnboarding.svelte_svelte_type_style_lang.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const KEY = "life-luna-data";
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const heroText = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    function loadToday() {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      const log = d.log ?? {};
      const periodEntry = (log.period ?? []).find((e) => e.date === today);
      const moodEntry = (log.mood ?? []).find((e) => e.date === today);
      const energyEntry = (log.energy ?? []).find((e) => e.date === today);
      const sympEntry = (log.symptoms ?? []).find((e) => e.date === today);
      const tempEntry = (log.temperature ?? []).find((e) => e.date === today);
      return {
        flow: periodEntry?.flow ?? "none",
        mood: moodEntry?.score ?? 0,
        energy: energyEntry?.score ?? 0,
        symptoms: sympEntry?.items ?? [],
        temperature: tempEntry?.value ?? ""
      };
    }
    let existing = loadToday();
    let flow = existing.flow;
    let mood = existing.mood;
    let energy = existing.energy;
    let selectedSymptoms = new Set(existing.symptoms);
    let temperature = existing.temperature;
    const FLOW_OPTIONS = [
      { value: "none", label: "None" },
      { value: "spotting", label: "Spotting" },
      { value: "light", label: "Light" },
      { value: "medium", label: "Medium" },
      { value: "heavy", label: "Heavy" }
    ];
    const MOOD_LABELS = ["", "Difficult", "Low", "Okay", "Good", "Great"];
    const ENERGY_LABELS = ["", "Exhausted", "Tired", "Normal", "Energized", "Amazing"];
    const QUICK_SYMPTOMS = [
      { id: "cramps", label: "Cramps" },
      { id: "bloating", label: "Bloating" },
      { id: "fatigue", label: "Fatigue" },
      { id: "headache", label: "Headache" },
      { id: "breast_tenderness", label: "Breast tenderness" },
      { id: "irritability", label: "Irritability" },
      { id: "low_mood", label: "Low mood" },
      { id: "high_energy", label: "High energy" },
      { id: "nausea", label: "Nausea" },
      { id: "lower_back_pain", label: "Back pain" }
    ];
    function save() {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      if (!d.log) d.log = {};
      if (!d.log.period) d.log.period = [];
      d.log.period = d.log.period.filter((e) => e.date !== today);
      if (flow !== "none") {
        d.log.period.push({ date: today, flow });
        if (!d.settings) d.settings = {};
        d.settings.lastPeriodDate = today;
      }
      if (!d.log.mood) d.log.mood = [];
      d.log.mood = d.log.mood.filter((e) => e.date !== today);
      if (mood > 0) d.log.mood.push({
        date: today,
        score: mood,
        label: MOOD_LABELS[mood].toLowerCase()
      });
      if (!d.log.energy) d.log.energy = [];
      d.log.energy = d.log.energy.filter((e) => e.date !== today);
      if (energy > 0) d.log.energy.push({ date: today, score: energy });
      if (!d.log.symptoms) d.log.symptoms = [];
      d.log.symptoms = d.log.symptoms.filter((e) => e.date !== today);
      if (selectedSymptoms.size > 0) d.log.symptoms.push({ date: today, items: [...selectedSymptoms] });
      if (!d.log.temperature) d.log.temperature = [];
      d.log.temperature = d.log.temperature.filter((e) => e.date !== today);
      if (temperature) d.log.temperature.push({
        date: today,
        value: parseFloat(temperature),
        time: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)
      });
      localStorage.setItem(KEY, JSON.stringify(d));
      goto();
    }
    $$renderer2.push(`<div class="screen svelte-b2zgdd" data-app="luna"><header class="svelte-b2zgdd"><button class="back svelte-b2zgdd">Back</button> <h1 class="title svelte-b2zgdd">Log today</h1></header> <main class="content svelte-b2zgdd"><p class="hero-date svelte-b2zgdd">${escape_html(heroText)}</p> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Period flow</p> <div class="chip-row svelte-b2zgdd"><!--[-->`);
    const each_array = ensure_array_like(FLOW_OPTIONS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let opt = each_array[$$index];
      $$renderer2.push(`<button${attr_class("chip svelte-b2zgdd", void 0, { "active": flow === opt.value })}>${escape_html(opt.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Mood ${escape_html(mood > 0 ? "— " + MOOD_LABELS[mood] : "")}</p> <div class="scale-row svelte-b2zgdd"><!--[-->`);
    const each_array_1 = ensure_array_like([1, 2, 3, 4, 5]);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let i = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("scale-btn svelte-b2zgdd", void 0, { "active": mood === i })}>${escape_html(i)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Energy ${escape_html(energy > 0 ? "— " + ENERGY_LABELS[energy] : "")}</p> <div class="scale-row svelte-b2zgdd"><!--[-->`);
    const each_array_2 = ensure_array_like([1, 2, 3, 4, 5]);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let i = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class("scale-btn svelte-b2zgdd", void 0, { "active": energy === i })}>${escape_html(i)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Symptoms</p> <div class="chip-row wrap svelte-b2zgdd"><!--[-->`);
    const each_array_3 = ensure_array_like(QUICK_SYMPTOMS);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let s = each_array_3[$$index_3];
      $$renderer2.push(`<button${attr_class("chip svelte-b2zgdd", void 0, { "active": selectedSymptoms.has(s.id) })}>${escape_html(s.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button class="more-btn svelte-b2zgdd">${escape_html("More symptoms")}</button></section> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Temperature (BBT) — optional</p> <div class="temp-row svelte-b2zgdd"><input type="number"${attr("value", temperature)} placeholder="36.7" step="0.1" min="35" max="42" class="temp-input svelte-b2zgdd"/> <span class="temp-unit svelte-b2zgdd">°C</span></div> <p class="temp-hint svelte-b2zgdd">Take before getting up, at the same time each day</p></section> <div class="cta svelte-b2zgdd">`);
    PebbleButton($$renderer2, {
      label: "Save",
      onclick: save,
      style: `--pebble-brand:${stringify(BRAND)}`
    });
    $$renderer2.push(`<!----></div></main></div>`);
  });
}
export {
  _page as default
};
