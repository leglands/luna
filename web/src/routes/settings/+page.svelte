<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, DSFloatingNav, DaisyMenu } from '$ds/index.js';
  import DSShareSheet from '$ds/DSShareSheet.svelte';
  import { getShareConfig } from '$ds/share-config.js';

  const shareConfig = getShareConfig('luna');
  let shareOpen = $state(false);

  const TABS = [{id:'home',label:'Home',icon:'home'},{id:'cycle',label:'Cycle',icon:'calendar'},{id:'fertility',label:'Fertile',icon:'heart'},{id:'insights',label:'Insights',icon:'bar-chart'},{id:'settings',label:'Settings',icon:'settings'}];

  let cycleLength = $state(28);
  let periodLength = $state(5);
  let cycleStartDate = $state('');

  onMount(() => {
    const s = localStorage.getItem('life-luna-settings');
    if (s) {
      const parsed = JSON.parse(s);
      cycleLength = parsed.cycleLength ?? 28;
      periodLength = parsed.periodLength ?? 5;
      cycleStartDate = parsed.lastPeriodDate ?? '';
    } else {
      const raw = localStorage.getItem('life-luna-data');
      if (raw) {
        const d = JSON.parse(raw);
        cycleLength = d.settings?.cycleLength ?? 28;
        periodLength = d.settings?.periodLength ?? 5;
        cycleStartDate = d.settings?.lastPeriodDate ?? '';
      }
    }
  });

  function save() {
    const s = { cycleLength: Number(cycleLength), periodLength: Number(periodLength), lastPeriodDate: cycleStartDate || null };
    localStorage.setItem('life-luna-settings', JSON.stringify(s));
    const raw = localStorage.getItem('life-luna-data');
    if (raw) {
      const d = JSON.parse(raw);
      d.settings = { ...d.settings, ...s };
      localStorage.setItem('life-luna-data', JSON.stringify(d));
    }
    goto('/');
  }

  let daisyOpen = $state(false);
  const DAISY_ITEMS = [
    { icon: 'droplet',    label: 'Règles',    onclick: () => goto('/cycle') },
    { icon: 'thermometer',label: 'Symptôme',  onclick: () => goto('/cycle') },
    { icon: 'smile',      label: 'Humeur',    onclick: () => goto('/insights') },
    { icon: 'moon',       label: 'Ovulation', onclick: () => goto('/fertility') },
  ];
</script>

<div class="screen" data-app="luna">
  <main class="content">
    <h1 class="title">Settings</h1>
    <div class="rows">
      <label class="row">
        <span>Cycle length</span>
        <span class="field"><input type="number" bind:value={cycleLength} min="20" max="45" /><span class="unit">days</span></span>
      </label>
      <label class="row">
        <span>Period length</span>
        <span class="field"><input type="number" bind:value={periodLength} min="1" max="10" /><span class="unit">days</span></span>
      </label>
      <label class="row">
        <span>Cycle start date</span>
        <input type="date" bind:value={cycleStartDate} class="date-input" />
      </label>
    </div>
    <div class="rows" style="margin-top:8px">
      <button class="row export-row" onclick={() => goto('/export')}>
        <span>Export data</span>
        <span class="export-hint">CSV for gynecologist →</span>
      </button>
    </div>
    <div class="rows" style="margin-top:0">
      <button class="share-row" onclick={() => shareOpen = true} aria-label="Recommander l'app">
        <span class="share-row-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </span>
        <span class="share-row-label">Recommander l'app</span>
        <svg class="share-row-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <PebbleButton label="Save" size="lg" onclick={save} />
  </main>
  <DSShareSheet
    bind:open={shareOpen}
    url={shareConfig.url}
    title={shareConfig.title}
    text={shareConfig.text}
    onclose={() => shareOpen = false}
  />
  <DSFloatingNav
  tabs={TABS}
  active="settings"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
  onfab={() => daisyOpen = !daisyOpen}
  bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  .content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-6); }
  .title { font-size: var(--text-2xl); font-weight: var(--weight-bold); margin: 0; }
  .rows { display: flex; flex-direction: column; gap: var(--space-4); width: 100%; max-width: 320px; }
  .row { display: flex; align-items: center; justify-content: space-between; font-size: var(--text-base); }
  .field { display: flex; align-items: center; gap: var(--space-2); }
  .row input[type=number] { width: 60px; text-align: center; border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); padding: var(--space-1) var(--space-2); background: transparent; color: var(--c-text); font-size: var(--text-base); }
  .date-input { border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); padding: var(--space-1) var(--space-2); background: transparent; color: var(--c-text); font-size: var(--text-sm); }
  .unit { color: var(--c-text-secondary); font-size: var(--text-sm); }
  .export-row { background: none; border: none; cursor: pointer; color: var(--c-text); text-align: left; width: 100%; padding: 0; }
  .export-hint { color: #E91E8C; font-size: var(--text-sm); }
  .share-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; background: var(--c-surface-raised, #f5f5f5); border: none; border-radius: 16px; cursor: pointer; text-align: left; color: var(--c-text); font-size: var(--text-base, 15px); transition: background 120ms ease; min-height: 44px; }
  .share-row:hover { background: var(--c-surface-container, #ebebeb); }
  .share-row:focus-visible { outline: 2px solid var(--c-brand); outline-offset: 2px; }
  .share-row-icon { color: var(--c-brand); flex-shrink: 0; }
  .share-row-label { flex: 1; font-weight: 500; }
  .share-row-chevron { color: var(--c-text-secondary); flex-shrink: 0; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
