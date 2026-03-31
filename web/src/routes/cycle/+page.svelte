<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { TabBar, SegmentedRing, Icon } from '$ds/index.js';

  let data = $state({
    settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null },
    log: { period: [], symptoms: [], mood: [] }
  });
  let displayMonth = $state(new Date());
  let selectedDate = $state(null);

  const TABS = [
    { id: 'home',      label: 'Home',     icon: 'home' },
    { id: 'cycle',     label: 'Cycle',    icon: 'calendar' },
    { id: 'fertility', label: 'Fertile',  icon: 'heart' },
    { id: 'insights',  label: 'Insights', icon: 'bar-chart' },
    { id: 'settings',  label: 'Settings', icon: 'settings' }
  ];

  const PHASE_LABELS = {
    menstrual: 'Menstrual', follicular: 'Follicular',
    ovulation: 'Ovulation', luteal: 'Luteal', unknown: 'Unknown'
  };

  const PHASE_IDX = { menstrual: 0, follicular: 1, ovulation: 2, luteal: 3, unknown: 0 };

  onMount(() => {
    const raw = localStorage.getItem('life-luna-data');
    if (!raw) { goto('/onboarding'); return; }
    data = JSON.parse(raw);
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

  const phaseIndex  = $derived(PHASE_IDX[cycleInfo.phase] ?? 0);
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

  // Calendar cells for display month (null = empty padding cell)
  const calendarDays = $derived.by(() => {
    const year  = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDow    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDow; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  });

  const monthTitle = $derived(
    displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
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
</script>

<div class="screen" data-app="luna">
  <main class="calendar-page">

    <!-- Overview ring card -->
    <div class="card overview-card">
      <SegmentedRing
        segments={[
          { label: 'Menstrual', color: '#E57373', value: periodLength },
          { label: 'Follicular', color: '#F48FB1', value: Math.floor(cycleLength * 0.35) },
          { label: 'Ovulation', color: '#CE93D8', value: Math.floor(cycleLength * 0.14) },
          { label: 'Luteal',    color: '#9FA8DA', value: cycleLength - periodLength - Math.floor(cycleLength * 0.49) },
        ]}
        currentIndex={phaseIndex}
        centerText={String(cycleInfo.dayOfCycle)}
        centerSubtext="Day"
        size={80}
      />
      <div class="phase-info">
        <p class="phase-name">{PHASE_LABELS[cycleInfo.phase] || 'Unknown'}</p>
        {#if cycleInfo.daysUntilNextPeriod > 0}
          <p class="phase-hint">Next period in {cycleInfo.daysUntilNextPeriod} days</p>
        {:else}
          <p class="phase-hint">Period expected today</p>
        {/if}
      </div>
    </div>

    <!-- Calendar card -->
    <div class="card calendar-card">

      <div class="month-header">
        <button class="month-nav" onclick={prevMonth} aria-label="Previous month">
          <Icon name="chevron-left" size={20} />
        </button>
        <h2 class="month-title">{monthTitle}</h2>
        <button class="month-nav" onclick={nextMonth} aria-label="Next month">
          <Icon name="chevron-right" size={20} />
        </button>
      </div>

      <div class="weekday-header">
        {#each ['Su','Mo','Tu','We','Th','Fr','Sa'] as d}
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
        <span class="leg-item"><span class="leg-dot" style="background:#6B3FA0"></span> Period</span>
        <span class="leg-item"><span class="leg-dot" style="background:#34C759"></span> Fertile</span>
        <span class="leg-item"><span class="leg-dot" style="background:#CE93D8"></span> Ovulation</span>
      </div>
    </div>

  </main>

  <TabBar
    tabs={TABS}
    activeTab="cycle"
    onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
    brand="luna"
  />
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

  /* ── Cards ── */
  .card {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
  }

  /* ── Overview card ── */
  .overview-card {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .phase-info { flex: 1; }

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
  .calendar-card { display: flex; flex-direction: column; }

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

  .is-period    { background: #6B3FA026; color: #6B3FA0; font-weight: 600; }
  .is-fertile   { background: #34C75926; color: #2E7D32; }
  .is-ovulation { background: #CE93D840; color: #7B1FA2; font-weight: 600; }
  .is-today     { outline: 2px solid #6B3FA0; outline-offset: -2px; font-weight: 700; }
  .is-selected  { background: #6B3FA0 !important; color: white !important; }

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
</style>
