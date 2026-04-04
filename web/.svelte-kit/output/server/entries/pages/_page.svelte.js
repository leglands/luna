import { d as derived } from "../../chunks/root.js";
import { g as goto } from "../../chunks/client.js";
import "../../chunks/PebbleButton.svelte_svelte_type_style_lang.js";
import { P as PebbleButton } from "../../chunks/PebbleButton.js";
/* empty css                                                        */
import { S as SegmentedRing } from "../../chunks/SegmentedRing.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let settings = { cycleLength: 28, periodLength: 5 };
    let cycleInfo = { phase: "unknown" };
    const segments = derived(() => [
      {
        label: "Menstrual",
        color: "#E57373",
        value: settings.periodLength
      },
      {
        label: "Follicular",
        color: "#F48FB1",
        value: Math.floor(settings.cycleLength * 0.35)
      },
      {
        label: "Ovulation",
        color: "#CE93D8",
        value: Math.floor(settings.cycleLength * 0.14)
      },
      {
        label: "Luteal",
        color: "#9FA8DA",
        value: Math.max(1, settings.cycleLength - settings.periodLength - Math.floor(settings.cycleLength * 0.49))
      }
    ]);
    const PHASE_IDX = {
      menstrual: 0,
      follicular: 1,
      ovulation: 2,
      luteal: 3,
      unknown: 0
    };
    const phaseIndex = derived(() => PHASE_IDX[cycleInfo.phase]);
    $$renderer2.push(`<div class="page svelte-1uha8ag" data-app="luna"><div class="wide-grid svelte-1uha8ag"><main class="content wide-screen-1 svelte-1uha8ag">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="setup-banner svelte-1uha8ag"><div class="setup-text svelte-1uha8ag"><p class="setup-msg svelte-1uha8ag">Set up your cycle to get personalised predictions</p></div> `);
      PebbleButton($$renderer2, {
        label: "Get started",
        size: "sm",
        onclick: () => goto()
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="card ring-card svelte-1uha8ag">`);
    SegmentedRing($$renderer2, {
      segments: segments(),
      currentIndex: phaseIndex(),
      centerText: "?",
      centerSubtext: "Day",
      size: 200
    });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="phase-name svelte-1uha8ag" style="color:var(--c-text-secondary)">—</p> <p class="next-hint svelte-1uha8ag">Add your last period date to see predictions</p>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="log-cta svelte-1uha8ag">`);
    PebbleButton($$renderer2, { label: "Log today", onclick: () => goto() });
    $$renderer2.push(`<!----></div></main> <aside class="wide-screen-2 svelte-1uha8ag"><div class="card calendar-preview svelte-1uha8ag"><p class="section-title svelte-1uha8ag">This month</p> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p class="preview-hint svelte-1uha8ag">Log your last period to see calendar predictions.</p>`);
    }
    $$renderer2.push(`<!--]--> <div class="preview-cta svelte-1uha8ag">`);
    PebbleButton($$renderer2, {
      label: "View calendar",
      size: "sm",
      onclick: () => goto()
    });
    $$renderer2.push(`<!----></div></div></aside></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
