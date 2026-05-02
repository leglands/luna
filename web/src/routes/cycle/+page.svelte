<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _, locale } from 'svelte-i18n';
  import { DSCycleGraph, Icon, PebbleButton, DSCard, DSFloatingNav, DaisyMenu } from '$ds/index.js';
  import { loadData } from '$lib/cycle-engine.js';

  let data = $state({
    settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null },
    log: { period: [], symptoms: [], mood: [] }
  });
  let displayMonth = $state(new Date());
  let selectedDate = $state(null);

  const TABS = $derived([
    { id: 'home',      label: $_('nav.home', { default: 'Home' }), icon: 'home' },
    { id: 'cycle',     label: $_('nav.cycle', { default: 'Cycle' }), icon: 'calendar' },
    { id: 'fertility', label: $_('nav.fertility', { default: 'Fertility' }), icon: 'heart' },
    { id: 'insights',  label: $_('nav.insights', { default: 'Insights' }), icon: 'bar-chart' },
    { id: 'settings',  label: $_('nav.settings', { default: 'Settings' }), icon: 'settings' }
  ]);

  const PHASE_LABELS = $derived({
    menstrual: $_('phases.menstrual', { default: 'Menstrual' }),
    follicular: $_('phases.follicular', { default: 'Follicular' }),
    ovulation: $_('phases.ovulation', { default: 'Ovulation' }),
    luteal: $_('phases.luteal', { default: 'Luteal' }),
    unknown: '—'
  });

  onMount(() => {
    data = loadData();
    displayMonth = new Date();
  });

  function fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function isToday(d) {
    if (!d) return false;
    const t = new Date();
    return d.getDate() === t.getDate() &&
           d.getMonth() === t.getMonth() &&
           d.getFullYear() === t.getFullYear();
  }

  // Current cycle info for the overview card
  const cycleInfo = $derived.by(() => {
    const { lastPeriodDate, cycleLength: cl = 28 } = data.settings;
    if (!lastPeriodDate) return { phase: 'unknown', dayOfCycle: 1, daysUntilNextPeriod: cl };
    const start = new Date(lastPeriodDate + 'T00:00:00');
    const diffDays = Math.floor((Date.now() - start.getTime()) / 86400000);
    const pos = ((diffDays % cl) + cl) % cl;
    const fertileStart = Math.floor(cl / 2) - 5;
    const fertileEnd   = Math.floor(cl / 2);
    let phase;
    if (pos < 5) phase = 'menstrual';
    else if (pos < fertileStart) phase = 'follicular';
    else if (pos <= fertileEnd)  phase = 'ovulation';
    else phase = 'luteal';
    return { phase, dayOfCycle: diffDays + 1, daysUntilNextPeriod: cl - pos };
  });

  const periodLength = $derived(data.settings?.periodLength ?? 5);
  const cycleLength  = $derived(data.settings?.cycleLength ?? 28);

  // "YYYY-MM-DD" → event type for 5 cycles around today
  const cycleEvents = $derived.by(() => {
    const events = {};
    const { lastPeriodDate, cycleLength: cl = 28, periodLength: pl = 5 } = data.settings;
    if (!lastPeriodDate) return events;
    const start = new Date(lastPeriodDate + 'T00:00:00');
    for (let c = -3; c <= 2; c++) {
      const cycleStart = new Date(start);
      cycleStart.setDate(start.getDate() + c * cl);
      for (let d = 0; d < pl; d++) {
        const day = new Date(cycleStart);
        day.setDate(cycleStart.getDate() + d);
        events[fmtDate(day)] = 'period';
      }
      for (let d = 9; d <= 15; d++) {
        const day = new Date(cycleStart);
        day.setDate(cycleStart.getDate() + d);
        if (!events[fmtDate(day)]) events[fmtDate(day)] = 'fertile';
      }
      const ov = new Date(cycleStart);
      ov.setDate(cycleStart.getDate() + 13);
      events[fmtDate(ov)] = 'ovulation';
    }
    (data.log.symptoms ?? []).forEach(e => { if (!events[e.date]) events[e.date] = 'logged'; });
    (data.log.mood    ?? []).forEach(e => { if (!events[e.date]) events[e.date] = 'logged'; });
    return events;
  });

  // Calendar cells for display month (null = empty padding cell), Mon-first
  const calendarDays = $derived.by(() => {
    const year  = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDow    = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDow; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    // Pad to full weeks
    while (days.length % 7 !== 0) days.push(null);
    return days;
  });

  const monthTitle = $derived(
    displayMonth.toLocaleDateString($locale ?? 'en', { month: 'long', year: 'numeric' })
  );

  const weekdayLabels = $derived(
    Array.from({ length: 7 }, (_, index) => {
      const base = new Date(Date.UTC(2024, 0, 1 + index));
      return new Intl.DateTimeFormat($locale ?? 'en', { weekday: 'short' }).format(base);
    })
  );

  function prevMonth() {
    displayMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 1);
  }

  function nextMonth() {
    displayMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1);
  }

  function selectDay(day) {
    if (!day) return;
    const fmt = fmtDate(day);
    selectedDate = fmt;
    goto('/log?date=' + fmt);
  }

  let daisyOpen = $state(false);
  const DAISY_ITEMS = $derived([
    { icon: 'droplet', label: $_('logging.period', { default: 'Period' }), onclick: () => goto('/cycle') },
    { icon: 'thermometer', label: $_('logging.symptoms', { default: 'Symptoms' }), onclick: () => goto('/cycle') },
    { icon: 'smile', label: $_('logging.mood', { default: 'Mood' }), onclick: () => goto('/insights') },
    { icon: 'moon', label: $_('phases.ovulation', { default: 'Ovulation' }), onclick: () => goto('/fertility') },
  ]);
</script>

<div class="screen" data-app="luna">
  <main class="calendar-page">

    <!-- Phase summary (compact, no extra ring here) -->
    <DSCard class="phase-summary">
      <p class="phase-name">{PHASE_LABELS[cycleInfo.phase] || '—'}</p>
      {#if cycleInfo.daysUntilNextPeriod > 0}
        <p class="phase-hint">{$_('cycle.nextPeriod', { values: { days: cycleInfo.daysUntilNextPeriod }, default: `Next period in ${cycleInfo.daysUntilNextPeriod} days` })}</p>
      {:else}
        <p class="phase-hint">{$_('cycle.periodExpectedToday', { default: 'Period expected today' })}</p>
      {/if}
    </DSCard>

    <!-- Calendar card -->
    <DSCard class="calendar-card" padding>

      <div class="month-header">
        <button class="month-nav" onclick={prevMonth} aria-label={$_('calendar.previousMonth', { default: 'Previous month' })}>
          <Icon name="chevron-left" size={20} />
        </button>
        <h2 class="month-title">{monthTitle}</h2>
        <button class="month-nav" onclick={nextMonth} aria-label={$_('calendar.nextMonth', { default: 'Next month' })}>
          <Icon name="chevron-right" size={20} />
        </button>
      </div>

      <div class="weekday-header">
        {#each weekdayLabels as d}
          <span>{d}</span>
        {/each}
      </div>

      <div class="calendar-grid">
        {#each calendarDays as day}
          {#if day}
            <button
              class="cal-day"
              class:is-today={isToday(day)}
              class:is-selected={selectedDate === fmtDate(day)}
              class:is-period={cycleEvents[fmtDate(day)] === 'period'}
              class:is-fertile={cycleEvents[fmtDate(day)] === 'fertile'}
              class:is-ovulation={cycleEvents[fmtDate(day)] === 'ovulation'}
              onclick={() => selectDay(day)}
              aria-label={day.toLocaleDateString()}
            >
              {day.getDate()}
            </button>
          {:else}
            <span></span>
          {/if}
        {/each}
      </div>

      <div class="legend">
        <span class="leg-item"><span class="leg-dot" style="background:#E57373"></span>{$_('logging.period', { default: 'Period' })}</span>
        <span class="leg-item"><span class="leg-dot" style="background:#F8BBD9;border:1px solid #f0b0c8"></span>{$_('cycle.fertileWindow', { default: 'Fertile window' })}</span>
        <span class="leg-item"><span class="leg-dot" style="background:#CE93D8"></span>{$_('phases.ovulation', { default: 'Ovulation' })}</span>
      </div>

      <div class="cal-cta">
        <PebbleButton label={$_('home.logToday', { default: 'Log today' })} size="lg" onclick={() => goto('/log')} />
      </div>

      <div class="ring-section">
        <DSCycleGraph
          cycleLength={cycleLength}
          currentDay={cycleInfo.dayOfCycle}
          size={180}
        />
        <p class="ring-phase">{PHASE_LABELS[cycleInfo.phase] || '—'} — {$_('cycle.day', { values: { day: cycleInfo.dayOfCycle }, default: `Day ${cycleInfo.dayOfCycle}` })}</p>
      </div>

    </DSCard><!-- /calendar-card -->
  </main>

  <DSFloatingNav
  tabs={TABS}
  active="cycle"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
  onfab={() => daisyOpen = !daisyOpen}
  bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
</div>

<style>
  .screen {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    max-width: 780px;
    margin: 0 auto;
  }

  .calendar-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
    padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
  }

  /* ── Phase summary (compact) ── */
  :global(.phase-summary) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
  }

  .phase-name {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0 0 var(--space-1);
  }

  .phase-hint {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
  }

  /* ── Calendar card ── */
  :global(.calendar-card) { display: flex; flex-direction: column; }

  .month-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-3);
  }

  .month-nav {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text-secondary);
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    transition: background var(--duration-fast);
    -webkit-tap-highlight-color: transparent;
  }

  .month-nav:hover { background: var(--c-surface-raised); }
  .month-nav:focus-visible { outline: 2px solid var(--c-focus); outline-offset: 2px; }

  .month-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .weekday-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 11px;
    color: var(--c-text-secondary);
    padding-block: 8px;
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .cal-day {
    aspect-ratio: 1;
    width: 100%;
    border: none;
    background: none;
    border-radius: 50%;
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-sans);
    color: var(--c-text);
    transition: background var(--duration-fast), color var(--duration-fast);
    -webkit-tap-highlight-color: transparent;
    min-height: 0;
  }

  .cal-day:hover:not(.is-selected) { background: var(--c-surface-raised); }
  .cal-day:focus-visible { outline: 2px solid var(--c-focus); outline-offset: 2px; }

  .is-period    { background: #E5737340; color: #c62828; font-weight: 600; }
  .is-fertile   { background: #F8BBD9; color: #333; }
  .is-ovulation { background: #CE93D8; color: #4a148c; font-weight: 600; }
  .is-today     { outline: 2px solid #E57373; outline-offset: -2px; font-weight: 700; }
  .is-selected  { background: #E57373 !important; color: white !important; }

  /* ── Legend ── */
  .legend {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    flex-wrap: wrap;
    padding-top: var(--space-3);
    border-top: 1px solid var(--c-border);
    margin-top: var(--space-3);
  }

  .leg-item {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
  }

  .leg-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .cal-day, .month-nav { transition: none; }
  }

  /* ── CTA + ring below calendar ── */
  .cal-cta {
    display: flex;
    justify-content: center;
    padding: var(--space-4) 0 var(--space-2);
  }

  .ring-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) 0 var(--space-4);
  }

  .ring-phase {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
  }
</style>
