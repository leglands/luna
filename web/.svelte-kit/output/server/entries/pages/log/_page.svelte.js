import { b as attr, a as attr_class, e as ensure_array_like, f as attr_style, c as escape_html, s as stringify } from "../../../chunks/root.js";
import { g as goto } from "../../../chunks/client.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
import { I as Icon } from "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const KEY = "life-luna-data";
    const BRAND = "luna";
    const todayISO = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const todayObj = /* @__PURE__ */ new Date();
    todayObj.toLocaleDateString("en-US", { weekday: "long" });
    todayObj.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    let date = todayISO;
    let periodStart = false;
    let symptoms = [];
    let mood = 0;
    let energy = 0;
    let notes = "";
    const SYMPTOMS = [
      { id: "cramps", label: "Cramps" },
      { id: "headache", label: "Headache" },
      { id: "bloating", label: "Bloating" },
      { id: "mood_swings", label: "Mood swings" },
      { id: "fatigue", label: "Fatigue" },
      { id: "tender_breasts", label: "Tender breasts" },
      { id: "acne", label: "Acne" },
      { id: "back_pain", label: "Back pain" }
    ];
    const MOOD_COLORS = ["#D9D9D9", "#B0E0A8", "#A7D8F0", "#FFD580", "#FFB3B3"];
    function save() {
      let data = JSON.parse(localStorage.getItem(KEY) || '{"entries":[]}');
      if (!data.entries) data.entries = [];
      data.entries = data.entries.filter((e) => e.date !== date);
      data.entries.push({
        date,
        periodStart,
        flow: "",
        symptoms,
        mood,
        energy,
        notes: notes.trim()
      });
      localStorage.setItem(KEY, JSON.stringify(data));
      goto();
    }
    $$renderer2.push(`<div class="screen svelte-b2zgdd" data-app="luna"><header class="svelte-b2zgdd"><button class="back svelte-b2zgdd" aria-label="Back">`);
    Icon($$renderer2, { name: "arrow-left", size: 22, color: "var(--c-brand)" });
    $$renderer2.push(`<!----></button> <h1 class="title svelte-b2zgdd">Log</h1></header> <main class="content svelte-b2zgdd"><section class="date-section svelte-b2zgdd"><label class="section-label svelte-b2zgdd">Date</label> <input class="date-input svelte-b2zgdd" type="date"${attr("value", date)}${attr("max", todayISO)}/></section> <section class="section svelte-b2zgdd"><button${attr_class("period-toggle svelte-b2zgdd", void 0, { "active": periodStart })}>Period started today</button></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="section svelte-b2zgdd"><label class="section-label svelte-b2zgdd">Mood</label> <div class="mood-row svelte-b2zgdd"><!--[-->`);
    const each_array_1 = ensure_array_like([1, 2, 3, 4, 5]);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let i = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("mood-dot svelte-b2zgdd", void 0, { "active": mood === i })}${attr_style(`background:${stringify(mood === i ? "var(--c-brand)" : MOOD_COLORS[i - 1])};`)}></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><p class="section-label svelte-b2zgdd">Energy ${escape_html("")}</p> <div class="scale-row svelte-b2zgdd"><!--[-->`);
    const each_array_2 = ensure_array_like([1, 2, 3, 4, 5]);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let i = each_array_2[$$index_2];
      $$renderer2.push(`<button${attr_class("scale-btn svelte-b2zgdd", void 0, { "active": energy === i })}>${escape_html(i)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><label class="section-label svelte-b2zgdd">Symptoms</label> <div class="chip-row wrap svelte-b2zgdd"><!--[-->`);
    const each_array_3 = ensure_array_like(SYMPTOMS);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let s = each_array_3[$$index_3];
      $$renderer2.push(`<button${attr_class("chip svelte-b2zgdd", void 0, { "active": symptoms.includes(s.id) })}>${escape_html(s.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="section svelte-b2zgdd"><label class="section-label svelte-b2zgdd">Notes</label> <textarea class="notes svelte-b2zgdd" rows="2" maxlength="200" placeholder="Add a note...">`);
    const $$body = escape_html(notes);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></section> <div class="cta svelte-b2zgdd">`);
    PebbleButton($$renderer2, { brand: BRAND, label: "Save entry", onclick: save });
    $$renderer2.push(`<!----></div></main></div>`);
  });
}
export {
  _page as default
};
