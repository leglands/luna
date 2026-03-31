<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, Icon, TabBar, EmpathyBanner, SegmentedRing } from '$ds/index.js';
  import { loadData, getCurrentPhase } from '$lib/cycle-engine.js';
  import FeatureTour from '$lib/components/FeatureTour.svelte';

  let data = $state({
    settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null },
    log: { period: [], symptoms: [], mood: [] }
  });
  let cycleInfo = $state({ phase: 'unknown', dayOfCycle: 1, daysUntilNextPeriod: 14 });
  let showTour = $state(false);

  const EMPATHY = {
    menstrual:  { fallback: 'Rest and be gentle with yourself.', icon: 'heart' },
    follicular: { fallback: 'Your energy is rising — embrace it.', icon: 'sun' },
    ovulation:  { fallback: 'You are at your peak. Shine.', icon: 'sparkles' },
    luteal:     { fallback: 'Take it one step at a time.', icon: 'moon' },
    unknown:    { fallback: 'Your body, your rhythm.', icon: 'heart' },
  };

  const PHASE_LABELS = {
    menstrual: 'Menstrual', follicular: 'Follicular',
    ovulation: 'Ovulation', luteal: 'Luteal', unknown: 'Unknown'
  };

  const PHASE_IDX = { menstrual: 0, follicular: 1, ovulation: 2, luteal: 3, unknown: 0 };
  const SHORT_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  onMount(() => {
    const onboarded = localStorage.getItem('life-luna-onboarded');
    if (!onboarded) { goto('/onboarding'); return; }
    data = loadData();
    cycleInfo = getCurrentPhase(data.settings.lastPeriodDate, data.settings.cycleLength);
    if (localStorage.getItem('life-luna-tour-pending') === '1') showTour = true;
  });

  const empathy = $derived(EMPATHY[cycleInfo.phase] ?? EMPATHY.unknown);
  const phaseIndex = $derived(PHASE_IDX[cycleInfo.phase] ?? 0);
  const periodLength = $derived(data.settings?.periodLength ?? 5);
  const cycleLength = $derived(data.settings?.cycleLength ?? 28);

  // 7-day strip centred on today (-3 … +3)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 3 + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  function fmtDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function isToday(d) {
    const t = new Date();
    return d.getDate() === t.getDate() &&
           d.getMonth() === t.getMonth() &&
           d.getFullYear() === t.getFullYear();
  }

  function getDayEvent(d) {
    const { lastPeriodDate, cycleLength: cl = 28, periodLength: pl = 5 } = data.settings;
    if (!lastPeriodDate) return null;
    const start = new Date(lastPeriodDate + 'T00:00:00');
    const diff = Math.floor((d - start) / 86400000);
    let pos = diff % cl;
    if (pos < 0) pos += cl;
    if (pos < pl) return 'period';
    if (pos === 13) return 'ovulation';
    if (pos >= 9 && pos <= 15) return 'fertile';
    return null;
  }

  function eventColor(d) {
    const ev = getDayEvent(d);
    if (ev === 'period') return '#6B3FA0';
    if (ev === 'ovulation') return '#CE93D8';
    if (ev === 'fertile') return '#34C759';
    return 'transparent';
  }

  function hasEvent(d) { return getDayEvent(d) !== null; }
</script>

<div class="home-page" data-app="luna">
  <main class="scroll-content">

    <!-- Cycle ring -->
    <section class="hero">
      <SegmentedRing
        segments={[
          { label: 'Menstrual', color: '#E57373', value: periodLength },
          { label: 'Follicular', color: '#F48FB1', value: Math.floor(cycleLength * 0.35) },
          { label: 'Ovulation', color: '#CE93D8', value: Math.floor(cycleLength * 0.14) },
          { label: 'Luteal', color: '#9FA8DA', value: cycleLength - periodLength - Math.floor(cycleLength * 0.49) },
        ]}
        currentIndex={phaseIndex}
        centerText={String(cycleInfo.dayOfCycle)}
        centerSubtext="Day"
        size={180}
      />
      <p class="phase-name">{PHASE_LABELS[cycleInfo.phase] || 'Unknown'}</p>
      {#if cycleInfo.daysUntilNextPeriod > 0}
        <p class="next-hint">Next period in {cycleInfo.daysUntilNextPeriod} days</p>
      {:else if cycleInfo.daysUntilNextPeriod === 0}
        <p class="next-hint">Period expected today</p>
      {/if}
    </section>

    <!-- 7-day week strip -->
    <div class="week-strip">
      {#each weekDays as day}
        <div class="week-day" class:today={isToday(day)}>
          <span class="wd-name">{SHORT_DAYS[day.getDay()]}</span>
          <div class="wd-num" class:wd-today={isToday(day)}>{day.getDate()}</div>
          <div class="wd-dot" style="background:{eventColor(day)}; opacity:{hasEvent(day) ? 1 : 0}"></div>
        </div>
      {/each}
    </div>

    <!-- Phase-aware empathy message -->
    <div class="empathy-wrapper">
      <EmpathyBanner message={empathy} />
    </div>

    <!-- Quick log actions -->
    <section class="quick-actions">
      <h3 class="qa-title">Quick log</h3>
      <div class="qa-row">
        <button class="qa-btn" onclick={() => goto('/log?type=period')}>
          <span class="qa-icon" style="background:#FFCDD2">
            <Icon name="droplets" size={20} color="#C62828" />
          </span>
          <span class="qa-label">Period</span>
        </button>
        <button class="qa-btn" onclick={() => goto('/log?type=symptoms')}>
          <span class="qa-icon" style="background:#FCE4EC">
            <Icon name="clipboard" size={20} color="#AD1457" />
          </span>
          <span class="qa-label">Symptoms</span>
        </button>
        <button class="qa-btn" onclick={() => goto('/log?type=temperature')}>
          <span class="qa-icon" style="background:#EDE7F6">
            <Icon name="thermometer" size={20} color="#5E35B1" />
          </span>
          <span class="qa-label">Temperature</span>
        </button>
        <button class="qa-btn" onclick={() => goto('/log?type=mood')}>
          <span class="qa-icon" style="background:#FFF9C4">
            <Icon name="smile" size={20} color="#F57F17" />
          </span>
          <span class="qa-label">Mood</span>
        </button>
      </div>
    </section>

  </main>

  <!-- Log today — pinned above tab bar -->
  <div class="bottom-cta">
    <PebbleButton label="Log today" size="lg" onclick={() => goto('/log')} />
  </div>

  <TabBar
    tabs={[
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'cycle', label: 'Cycle', icon: 'calendar' },
      { id: 'fertility', label: 'Fertile', icon: 'heart' },
      { id: 'insights', label: 'Insights', icon: 'bar-chart' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ]}
    activeTab="home"
    onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
    brand="luna"
  />

  {#if showTour}
    <FeatureTour onDone={() => showTour = false} />
  {/if}
</div>

<style>
  .home-page {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    max-width: 780px;
    margin: 0 auto;
  }

  .scroll-content {
    flex: 1;
    padding-bottom: calc(140px + env(safe-area-inset-bottom, 0px));
  }

  /* ── Hero ring ── */
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-8) var(--space-4) var(--space-4);
    gap: var(--space-3);
    text-align: center;
  }

  .phase-name {
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
    text-transform: capitalize;
  }

  .next-hint {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
  }

  /* ── Week strip ── */
  .week-strip {
    display: flex;
    justify-content: space-between;
    padding: var(--space-2) var(--space-4);
    gap: var(--space-1);
  }

  .week-day {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) 0;
    border-radius: var(--radius-md);
    min-width: 0;
  }

  .week-day.today {
    background: color-mix(in srgb, var(--c-brand, #6B3FA0) 8%, transparent);
  }

  .wd-name {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .wd-num {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--c-text);
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .wd-num.wd-today {
    background: var(--c-brand, #6B3FA0);
    color: #fff;
    font-weight: var(--weight-bold);
  }

  .wd-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  /* ── Empathy ── */
  .empathy-wrapper {
    padding: var(--space-2) var(--space-4) var(--space-4);
  }

  /* ── Quick log ── */
  .quick-actions {
    padding: 0 var(--space-4) var(--space-4);
  }

  .qa-title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 var(--space-3);
  }

  .qa-row {
    display: flex;
    gap: var(--space-3);
  }

  .qa-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    background: var(--c-surface);
    border: none;
    border-radius: var(--radius-lg);
    padding: var(--space-3) var(--space-2);
    cursor: pointer;
    min-height: var(--tap-target);
    transition: background var(--duration-fast) var(--ease-out),
                transform var(--duration-fast) var(--ease-out);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--font-sans);
  }

  .qa-btn:hover { background: var(--c-surface-raised); }
  .qa-btn:active { transform: scale(0.96); }
  .qa-btn:focus-visible { outline: 2px solid var(--c-focus); outline-offset: 2px; }

  .qa-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qa-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--c-text-secondary);
    text-align: center;
  }

  /* ── Pinned CTA ── */
  .bottom-cta {
    position: fixed;
    bottom: calc(56px + env(safe-area-inset-bottom, 0px));
    left: max(0px, calc(50% - var(--app-max-width, 195px)));
    right: max(0px, calc(50% - var(--app-max-width, 195px)));
    z-index: calc(var(--z-sticky) - 1);
    padding: var(--space-3) var(--space-4) var(--space-2);
    background: linear-gradient(to bottom, transparent, var(--c-bg) 50%);
    display: flex;
    justify-content: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .qa-btn { transition: none; }
    .qa-btn:active { transform: none; }
  }
</style>
