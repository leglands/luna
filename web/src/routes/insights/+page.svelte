<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, DSFloatingNav, DaisyMenu } from '$ds/index.js';

  const TABS = [{id:'home',label:'Home',icon:'home'},{id:'cycle',label:'Cycle',icon:'calendar'},{id:'insights',label:'Insights',icon:'bar-chart'},{id:'settings',label:'Settings',icon:'settings'}];

  let heroValue = $state('—');
  let statusLine = $state('Based on 0 cycles');
  let hint1 = $state('');
  let hint2 = $state('');

  function avgLen(periods) {
    if (!periods || periods.length < 2) return null;
    const sorted = periods.map(p => new Date(p.date)).sort((a, b) => a - b);
    let total = 0;
    for (let i = 1; i < sorted.length; i++) total += (sorted[i] - sorted[i-1]) / 86400000;
    return Math.round(total / (sorted.length - 1));
  }

  onMount(() => {
    const raw = localStorage.getItem('life-luna-data');
    if (!raw) return;
    const d = JSON.parse(raw);
    const periods = d.log?.period ?? [];
    const sorted = [...periods].sort((a, b) => new Date(a.date) - new Date(b.date));
    const avg = avgLen(sorted);
    const lastCycleLen = sorted.length >= 2
      ? Math.round((new Date(sorted[sorted.length-1].date) - new Date(sorted[sorted.length-2].date)) / 86400000)
      : null;
    heroValue = avg ? String(avg) : '—';
    statusLine = `Based on ${sorted.length} cycle${sorted.length !== 1 ? 's' : ''}`;
    if (d.settings?.periodLength) hint1 = `Avg period: ${d.settings.periodLength} days`;
    if (lastCycleLen) hint2 = `Last cycle: ${lastCycleLen} days`;
  });

  let daisyOpen = $state(false);
  const DAISY_ITEMS = [
    { icon: 'droplet',    label: 'Règles',    onclick: () => goto('/cycle') },
    { icon: 'thermometer',label: 'Symptôme',  onclick: () => goto('/cycle') },
    { icon: 'smile',      label: 'Humeur',    onclick: () => goto('/insights') },
    { icon: 'moon',       label: 'Ovulation', onclick: () => goto('/fertility') },
  ];
</script>

<div class="screen" data-app="luna">
  <main class="hero">
    <div class="hero-display">
      <span class="hero-value">{heroValue}</span>
      <span class="hero-label">Avg cycle (days)</span>
    </div>
    <p class="status">{statusLine}</p>
    <PebbleButton label="See history" size="lg" onclick={() => goto('/history')} />
    {#if hint1}<p class="hint">{hint1}</p>{/if}
    {#if hint2}<p class="hint secondary">{hint2}</p>{/if}
  </main>
  <DSFloatingNav
  tabs={TABS}
  active="insights"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
  onfab={() => daisyOpen = !daisyOpen}
  bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-5); text-align: center; }
  .hero-display { display: flex; flex-direction: column; align-items: center; }
  .hero-value { font-size: clamp(52px, 14vw, 96px); font-weight: var(--weight-bold); line-height: 1; letter-spacing: -0.02em; color: var(--c-brand); }
  .hero-label { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-top: var(--space-2); }
  .status { font-size: var(--text-xl); font-weight: var(--weight-semibold); margin: 0; }
  .hint { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0; }
  .hint.secondary { opacity: 0.6; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
