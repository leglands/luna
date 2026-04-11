<script>
  // Luna Fertility - LEAN: hero = days to ovulation, fertile window
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, DSCard, DSFloatingNav, DaisyMenu } from '$ds/index.js';

  const KEY = 'life-luna-data';
  const TABS = [
    {id:'home',label:'Home',icon:'home'},
    {id:'cycle',label:'Cycle',icon:'calendar'},
    {id:'fertility',label:'Fertile',icon:'heart'},
    {id:'insights',label:'Insights',icon:'bar-chart'},
    {id:'settings',label:'Settings',icon:'settings'}
  ];

  let heroValue = $state('—');
  let heroLabel = $state('Days to ovulation');
  let statusLine = $state('');
  let fertileStart = $state('');
  let fertileEnd = $state('');
  let ovulationDate = $state('');
  let isFertileNow = $state(false);
  let isInPeriod = $state(false);
  let cycleDay = $state(0);

  onMount(() => {
    const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    if (!d.settings?.lastPeriodDate) {  return; }

    const { cycleLength = 28, lastPeriodDate } = d.settings;
    const today = new Date();
    const lastPeriod = new Date(lastPeriodDate);
    const diffDays = Math.floor((today - lastPeriod) / 86400000);
    const pos = ((diffDays % cycleLength) + cycleLength) % cycleLength;
    cycleDay = pos + 1;

    // Ovulation = cycleLength - 14 days from period start (ACOG)
    const ovulationDay = cycleLength - 14;
    // Fertile window: ovulation - 5 to ovulation + 1 (sperm lives 5d, egg 24h)
    const fertileStartDay = ovulationDay - 5;
    const fertileEndDay = ovulationDay + 1;

    const ovDate = new Date(lastPeriod);
    ovDate.setDate(ovDate.getDate() + ovulationDay);
    const fStart = new Date(lastPeriod);
    fStart.setDate(fStart.getDate() + fertileStartDay);
    const fEnd = new Date(lastPeriod);
    fEnd.setDate(fEnd.getDate() + fertileEndDay);

    ovulationDate = ovDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    fertileStart = fStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    fertileEnd = fEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    isFertileNow = pos >= fertileStartDay && pos <= fertileEndDay;
    isInPeriod = pos < (d.settings.periodLength ?? 5);

    const daysToOv = ovulationDay - pos;

    if (isInPeriod) {
      heroValue = String(cycleLength - 14 - pos);
      heroLabel = 'Days to fertile window';
      statusLine = 'Currently in period';
    } else if (isFertileNow) {
      heroValue = '✦';
      heroLabel = 'Fertile window';
      statusLine = pos === ovulationDay ? 'Ovulation day' : 'Most fertile days';
    } else if (daysToOv > 0) {
      heroValue = String(daysToOv);
      heroLabel = 'Days to ovulation';
      statusLine = `Fertile window: ${fertileStart} – ${fertileEnd}`;
    } else {
      heroValue = String(cycleLength - pos);
      heroLabel = 'Days to next cycle';
      statusLine = 'Ovulation passed';
    }
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
    <p class="label">Cycle day {cycleDay}</p>
    <p class="hero-val brand-text" class:fertile={isFertileNow}>{heroValue}</p>
    <p class="hero-lbl">{heroLabel}</p>
    <p class="status">{statusLine}</p>

    <div class="info-cards">
      <DSCard padding>
        <p class="card-label">Fertile window</p>
        <p class="card-value">{fertileStart} – {fertileEnd}</p>
        <p class="card-sub">6 days of peak fertility</p>
      </DSCard>
      <DSCard padding class={!isInPeriod && !isFertileNow ? 'highlight' : ''}>
        <p class="card-label">Ovulation</p>
        <p class="card-value">{ovulationDate}</p>
        <p class="card-sub">Predicted (ACOG method)</p>
      </DSCard>
    </div>

    <p class="disclaimer">Prediction based on average cycle. Use for awareness, not contraception.</p>
    <PebbleButton label="Log today" onclick={() => goto('/log')} style="--pebble-brand:var(--c-brand)" />
  </main>

  <DSFloatingNav
  tabs={TABS}
  active="fertility"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
  onfab={() => daisyOpen = !daisyOpen}
  bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg, #fff); color: var(--c-text, #111); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px 100px; gap: var(--space-2); text-align: center; }
  .label { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0; }
  .hero-val { font-size: clamp(52px,14vw,96px); font-weight: 700; line-height: 1; margin: 8px 0 0; }
  .hero-val.fertile { font-size: clamp(52px,14vw,80px); }
  .hero-lbl { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0; }
  .status { font-size: var(--text-lg); font-weight: 600; margin: 4px 0 16px; }
  .info-cards { display: flex; gap: 12px; width: 100%; margin: 8px 0 12px; text-align: left; }
  .info-cards :global(.ds-card) { flex: 1; }
  .info-cards :global(.ds-card.highlight) { background: #FCE4EC; }
  .brand-text { color: var(--c-brand); }
  .card-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--c-brand); margin: 0 0 4px; font-weight: 600; }
  .card-value { font-size: var(--text-base); font-weight: 700; margin: 0 0 2px; }
  .card-sub { font-size: 11px; color: #aaa; margin: 0; }
  .disclaimer { font-size: 11px; color: #bbb; text-align: center; max-width: 280px; margin: 4px 0; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
