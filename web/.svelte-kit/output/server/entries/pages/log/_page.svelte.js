import { e as escape_html, f as ensure_array_like, a as attr_class, c as attr, k as derived } from "../../../chunks/index2.js";
import { I as Icon, P as PebbleButton } from "../../../chunks/StitchCP.svelte_svelte_type_style_lang.js";
import { E as EmpathyBanner } from "../../../chunks/EmpathyBanner.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { P as PrivacyBadge } from "../../../chunks/PrivacyBadge.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const flowTypes = [
      { id: "period-start", label: "Period start", icon: "droplets" },
      { id: "period-end", label: "Period end", icon: "droplet" },
      { id: "spotting", label: "Spotting", icon: "circle" },
      { id: "none", label: "None", icon: "x" }
    ];
    const flowIntensities = [
      { id: "light", label: "Light" },
      { id: "medium", label: "Medium" },
      { id: "heavy", label: "Heavy" },
      { id: "very-heavy", label: "Very heavy" }
    ];
    const symptoms = [
      { id: "cramps", label: "Cramps", icon: "flame" },
      { id: "bloating", label: "Bloating", icon: "waves" },
      { id: "headache", label: "Headache", icon: "zap" },
      { id: "fatigue", label: "Fatigue", icon: "moon" },
      { id: "mood-swings", label: "Mood swings", icon: "sun-moon" },
      {
        id: "breast-tenderness",
        label: "Breast tenderness",
        icon: "heart"
      },
      { id: "nausea", label: "Nausea", icon: "activity" },
      { id: "backache", label: "Backache", icon: "arrow-left" }
    ];
    const mucusTypes = [
      { id: "dry", label: "Dry" },
      { id: "sticky", label: "Sticky" },
      { id: "creamy", label: "Creamy" },
      { id: "watery", label: "Watery" },
      { id: "egg-white", label: "Egg white" }
    ];
    const moods = [
      { id: "happy", label: "Happy", icon: "smile" },
      { id: "neutral", label: "Neutral", icon: "circle" },
      { id: "anxious", label: "Anxious", icon: "alert-circle" },
      { id: "sad", label: "Sad", icon: "droplet" },
      { id: "irritable", label: "Irritable", icon: "flame" },
      { id: "energetic", label: "Energetic", icon: "zap" }
    ];
    let flowType = null;
    let flowIntensity = null;
    let selectedSymptoms = [];
    let temperature = "";
    let mucus = null;
    let mood = null;
    let notes = "";
    let saving = false;
    const isPeriod = derived(() => flowType === "period-end");
    const today = derived(() => (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    async function handleSave() {
      saving = true;
      const entry = {
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        flowType,
        flowIntensity: isPeriod() ? flowIntensity : null,
        symptoms: selectedSymptoms,
        temperature: null,
        mucus,
        mood,
        notes: notes.trim() || null
      };
      console.log("Saving entry:", entry);
      await new Promise((resolve) => setTimeout(resolve, 500));
      saving = false;
      window.location.href = "/cycle";
    }
    $$renderer2.push(`<div class="log-page svelte-b2zgdd"><header class="page-header svelte-b2zgdd"><button class="back-link svelte-b2zgdd">`);
    Icon($$renderer2, { name: "chevron-left", size: 20 });
    $$renderer2.push(`<!----> <span>Back</span></button> <div class="header-center svelte-b2zgdd"><h1 class="page-title svelte-b2zgdd">Log Today</h1> <p class="page-date svelte-b2zgdd">${escape_html(today())}</p></div> `);
    PrivacyBadge($$renderer2, {});
    $$renderer2.push(`<!----></header> <main class="page-content svelte-b2zgdd">`);
    EmpathyBanner($$renderer2, {});
    $$renderer2.push(`<!----> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Flow type</h2> <div class="chip-grid chip-grid-4 svelte-b2zgdd"><!--[-->`);
    const each_array = ensure_array_like(flowTypes);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let ft = each_array[$$index];
      $$renderer2.push(`<button${attr_class("chip svelte-b2zgdd", void 0, { "chip-selected": flowType === ft.id })}>`);
      Icon($$renderer2, { name: ft.icon, size: 16 });
      $$renderer2.push(`<!----> <span>${escape_html(ft.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> `);
    if (isPeriod()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Flow intensity</h2> <div class="chip-grid chip-grid-4 svelte-b2zgdd"><!--[-->`);
      const each_array_1 = ensure_array_like(flowIntensities);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let intensity = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class("chip svelte-b2zgdd", void 0, { "chip-selected": flowIntensity === intensity.id })}><span>${escape_html(intensity.label)}</span></button>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Symptoms</h2> <div class="symptom-grid svelte-b2zgdd"><!--[-->`);
    const each_array_2 = ensure_array_like(symptoms);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let symptom = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class("chip chip-symptom svelte-b2zgdd", void 0, { "chip-selected": selectedSymptoms.includes(symptom.id) })}>`);
      Icon($$renderer2, { name: symptom.icon, size: 14 });
      $$renderer2.push(`<!----> <span>${escape_html(symptom.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Basal body temperature <span class="optional svelte-b2zgdd">(optional)</span></h2> <div class="input-row svelte-b2zgdd">`);
    Icon($$renderer2, { name: "thermometer", size: 18, class: "input-icon" });
    $$renderer2.push(`<!----> <input type="number" step="0.01" min="35" max="42" placeholder="36.5"${attr("value", temperature)} class="text-input svelte-b2zgdd"/> <span class="input-unit svelte-b2zgdd">C</span></div></section> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Cervical mucus</h2> <div class="chip-grid chip-grid-5 svelte-b2zgdd"><!--[-->`);
    const each_array_3 = ensure_array_like(mucusTypes);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let m = each_array_3[$$index_3];
      $$renderer2.push(`<button${attr_class("chip chip-small svelte-b2zgdd", void 0, { "chip-selected": mucus === m.id })}><span>${escape_html(m.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Mood</h2> <div class="mood-grid svelte-b2zgdd"><!--[-->`);
    const each_array_4 = ensure_array_like(moods);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let m = each_array_4[$$index_4];
      $$renderer2.push(`<button${attr_class("mood-chip svelte-b2zgdd", void 0, { "chip-selected": mood === m.id })}>`);
      Icon($$renderer2, { name: m.icon, size: 20 });
      $$renderer2.push(`<!----> <span>${escape_html(m.label)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="form-section svelte-b2zgdd"><h2 class="section-label svelte-b2zgdd">Notes <span class="optional svelte-b2zgdd">(optional)</span></h2> <textarea placeholder="How are you feeling today?" class="notes-input svelte-b2zgdd" rows="3">`);
    const $$body = escape_html(notes);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></section> <div class="save-section svelte-b2zgdd">`);
    PebbleButton($$renderer2, {
      brand: "luna",
      label: "Save",
      size: "lg",
      variant: "primary",
      loading: saving,
      onclick: handleSave
    });
    $$renderer2.push(`<!----></div></main></div>`);
  });
}
export {
  _page as default
};
