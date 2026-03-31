<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, TabBar } from '$ds/index.js';

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
    <PebbleButton label="Save" size="lg" onclick={save} />
  </main>
  <TabBar tabs={TABS} activeTab="settings" onchange={(id) => goto('/' + (id === 'home' ? '' : id))} brand="luna" />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; max-width: 390px; margin: 0 auto; }
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
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
