import { f as attr_style, c as escape_html, s as stringify } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/DSNavSheet.svelte_svelte_type_style_lang.js";
import "../../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../../chunks/PebbleButton.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const BRAND = "#E91E8C";
    const KEY = "life-luna-data";
    let periodCount = 0;
    let symptomDays = 0;
    let tempDays = 0;
    function exportCSV() {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      const rows = [
        [
          "Date",
          "Flow",
          "Mood",
          "Energy",
          "Symptoms",
          "Temperature_C"
        ]
      ];
      const allDates = /* @__PURE__ */ new Set([
        ...(d.log?.period ?? []).map((e) => e.date),
        ...(d.log?.mood ?? []).map((e) => e.date),
        ...(d.log?.energy ?? []).map((e) => e.date),
        ...(d.log?.symptoms ?? []).map((e) => e.date),
        ...(d.log?.temperature ?? []).map((e) => e.date)
      ]);
      const sorted = [...allDates].sort();
      for (const date of sorted) {
        const flow = (d.log?.period ?? []).find((e) => e.date === date)?.flow ?? "";
        const mood = (d.log?.mood ?? []).find((e) => e.date === date)?.score ?? "";
        const energy = (d.log?.energy ?? []).find((e) => e.date === date)?.score ?? "";
        const symptoms = ((d.log?.symptoms ?? []).find((e) => e.date === date)?.items ?? []).join("; ");
        const temp = (d.log?.temperature ?? []).find((e) => e.date === date)?.value ?? "";
        rows.push([date, flow, mood, energy, symptoms, temp]);
      }
      const csv = rows.map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "luna-cycle-data-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv";
      a.click();
      URL.revokeObjectURL(url);
    }
    $$renderer2.push(`<div class="screen svelte-12eq3u7" data-app="luna"><header class="svelte-12eq3u7"><button class="back svelte-12eq3u7">Back</button> <h1 class="title svelte-12eq3u7">Export data</h1></header> <main class="hero svelte-12eq3u7"><p class="hero-val svelte-12eq3u7"${attr_style(`color:${stringify(BRAND)}`)}>${escape_html(periodCount)}</p> <p class="hero-lbl svelte-12eq3u7">Period entries</p> <p class="status svelte-12eq3u7">${escape_html(symptomDays)} symptom days · ${escape_html(tempDays)} temp readings</p> <div class="info svelte-12eq3u7"><p class="info-text svelte-12eq3u7">Export your cycle data as CSV to share with your gynecologist or import into another app.</p> <div class="privacy-note svelte-12eq3u7"><p class="svelte-12eq3u7">Data never leaves your device. Export is generated locally.</p></div></div> `);
    PebbleButton($$renderer2, {
      label: "Download CSV",
      onclick: exportCSV,
      style: `--pebble-brand:${stringify(BRAND)}`
    });
    $$renderer2.push(`<!----> <button class="cancel svelte-12eq3u7">Cancel</button></main></div>`);
  });
}
export {
  _page as default
};
