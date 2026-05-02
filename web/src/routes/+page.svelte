  <script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, Icon, DSCycleGraph, DSCard } from '$ds/index.js';
  import { _, locale } from 'svelte-i18n';
  import { loadData, getCurrentPhase } from '$lib/cycle-engine.js';
  import FeatureTour from '$lib/components/FeatureTour.svelte';

  const PHASE_COLORS  = { menstrual:'#E57373', follicular:'#F48FB1', ovulation:'#CE93D8', luteal:'#9FA8DA', unknown:'#9D7BC9' };
  const PHASE_LABELS  = $derived({
    menstrual: $_('phases.menstrual', { default: 'Menstrual' }),
    follicular: $_('phases.follicular', { default: 'Follicular' }),
    ovulation: $_('phases.ovulation', { default: 'Ovulation' }),
    luteal: $_('phases.luteal', { default: 'Luteal' }),
    unknown: '—'
  });
  const QUICK = $derived([
    { icon:'droplets',    label: $_('logging.period', { default: 'Period' }),           bg:'#FFCDD2', fg:'#C62828', type:'period'      },
    { icon:'activity',    label: $_('logging.symptoms', { default: 'Symptoms' }),       bg:'#FCE4EC', fg:'#AD1457', type:'symptoms'    },
    { icon:'thermometer', label: $_('logging.temperature', { default: 'Temperature' }), bg:'#EDE7F6', fg:'#5E35B1', type:'temperature' },
    { icon:'smile',       label: $_('logging.mood', { default: 'Mood' }),               bg:'#FFF9C4', fg:'#F57F17', type:'mood'        },
  ]);
  const EMPATHY = [
    'Your body, your rhythm.',
    'Take a moment for yourself.',
    'A new day, a new cycle.',
    'Listen to what your body tells you.',
    'Rest is part of the journey.',
    'Every phase has its beauty.',
    'You are in tune with yourself.',
  ];

  let settings  = $state({ cycleLength:28, periodLength:5, lastPeriodDate:null });
  let cycleInfo = $state({ phase:'unknown', dayOfCycle:0, daysUntilNextPeriod:0 });
  let events    = $state({});
  let hasData   = $state(false);
  let showTour  = $state(false);

  const today   = new Date();
  const fmtDate = d => d.toISOString().split('T')[0];
  const isToday = d => fmtDate(d) === fmtDate(today);

  const weekDays = $derived(Array.from({length:7}, (_,i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i);
    return {
      date: d,
      label: new Intl.DateTimeFormat($locale ?? 'en', { weekday: 'short' }).format(d)
    };
  }));

  const empathy    = $derived(EMPATHY[today.getDay()]);

  function dotColor(d) {
    const e = events[fmtDate(d)];
    if (e === 'period')    return '#E57373';
    if (e === 'ovulation') return '#CE93D8';
    if (e === 'fertile')   return '#81C784';
    return 'transparent';
  }

  function buildEvents(s, log) {
    const ev = {};
    if (!s.lastPeriodDate) return ev;
    const start = new Date(s.lastPeriodDate);
    for (let c = -3; c <= 3; c++) {
      const cs = new Date(start);
      cs.setDate(start.getDate() + c * s.cycleLength);
      for (let d = 0; d < s.periodLength; d++) {
        const day = new Date(cs); day.setDate(cs.getDate() + d);
        ev[fmtDate(day)] = 'period';
      }
      for (let d = 9; d <= 15; d++) {
        const day = new Date(cs); day.setDate(cs.getDate() + d);
        if (!ev[fmtDate(day)]) ev[fmtDate(day)] = 'fertile';
      }
      const ov = new Date(cs); ov.setDate(cs.getDate() + 13);
      ev[fmtDate(ov)] = 'ovulation';
    }
    (log.symptoms ?? []).forEach(e => { if (!ev[e.date]) ev[e.date] = 'logged'; });
    (log.mood      ?? []).forEach(e => { if (!ev[e.date]) ev[e.date] = 'logged'; });
    return ev;
  }

  onMount(() => {
    const d = loadData();
    settings = { cycleLength:28, periodLength:5, lastPeriodDate:null, ...d.settings };
    hasData  = !!settings.lastPeriodDate;
    if (hasData) {
      cycleInfo = getCurrentPhase(settings.lastPeriodDate, settings.cycleLength);
      events    = buildEvents(settings, d.log ?? {});
    }
    if (localStorage.getItem('life-luna-tour-pending') === '1') showTour = true;
  });
</script>

<div class="page" data-app="luna">
  <div class="wide-grid">
    <main class="content wide-screen-1">

      {#if !hasData}
        <!-- Setup banner (compact) — ring still shows with default 28-day cycle -->
        <div class="setup-banner">
          <div class="setup-text">
            <p class="setup-msg">{$_('home.setupBanner', { default: 'Set up your cycle to get personalised predictions' })}</p>
          </div>
          <PebbleButton label={$_('home.getStarted', { default: 'Get started' })} size="sm" onclick={() => goto('/onboarding')} />
        </div>
      {/if}

      <!-- ── 1. Cycle ring card — always visible ── -->
      <DSCard class="ring-card" padding>
        <DSCycleGraph
          cycleLength={settings.cycleLength}
          currentDay={hasData ? cycleInfo.dayOfCycle : null}
          size={210}
        />
        {#if hasData}
          <p class="phase-name" style="color:{PHASE_COLORS[cycleInfo.phase]}">{PHASE_LABELS[cycleInfo.phase]}</p>
          {#if cycleInfo.daysUntilNextPeriod > 0}
            <p class="next-hint">{$_('cycle.nextPeriod', { values: { days: cycleInfo.daysUntilNextPeriod }, default: `Next period in ${cycleInfo.daysUntilNextPeriod} days` })}</p>
          {:else if cycleInfo.daysUntilNextPeriod === 0}
            <p class="next-hint" style="color:#E57373">{$_('cycle.periodExpectedToday', { default: 'Period expected today' })}</p>
          {/if}
        {:else}
          <p class="next-hint">{$_('home.addLastPeriod', { default: 'Add your last period date to see predictions' })}</p>
        {/if}
      </DSCard>

      {#if hasData}

        <!-- ── 2. Week strip ── -->
        <DSCard class="week-strip" role="list" aria-label="This week">
          {#each weekDays as day (fmtDate(day.date))}
            <div class="wd" class:wd-today={isToday(day.date)} role="listitem">
              <span class="wd-name">{day.label}</span>
              <div class="wd-num" class:wd-num-today={isToday(day.date)}>{day.date.getDate()}</div>
              <div class="wd-dot" style="background:{dotColor(day.date)}"></div>
            </div>
          {/each}
        </DSCard>

        <!-- ── 3. Quick log ── -->
        <DSCard padding>
          <p class="section-title">{$_('home.quickLog', { default: 'Quick log' })}</p>
          <div class="qa-row">
            {#each QUICK as qa}
              <button class="qa-btn" onclick={() => goto('/log?type=' + qa.type)} aria-label="Log {qa.label}">
                <span class="qa-icon" style="background:{qa.bg}">
                  <Icon name={qa.icon} size={22} color={qa.fg} />
                </span>
                <span class="qa-label">{qa.label}</span>
              </button>
            {/each}
          </div>
        </DSCard>

        <!-- ── 4. Empathy ── -->
        <div class="empathy-card">
          <p class="empathy-msg">{empathy}</p>
        </div>

      {/if}

      <div class="log-cta">
        <PebbleButton label={$_('home.logToday', { default: 'Log today' })} onclick={() => goto('/log')} />
      </div>
    </main>

    <!-- ── Screen 2: Calendar preview (wide ≥1024px) ── -->
    <aside class="wide-screen-2">
      <DSCard class="calendar-preview" padding>
        <p class="section-title">{$_('home.thisMonth', { default: 'This month' })}</p>
        {#if hasData}
          <p class="preview-hint">Phase: <strong style="color:{PHASE_COLORS[cycleInfo.phase]}">{PHASE_LABELS[cycleInfo.phase]}</strong></p>
          <p class="preview-hint">{$_('cycle.dayOfLength', { values: { day: cycleInfo.dayOfCycle, length: settings.cycleLength }, default: `Day ${cycleInfo.dayOfCycle} of ${settings.cycleLength}` })}</p>
          {#if cycleInfo.daysUntilNextPeriod > 0}
            <p class="preview-hint">{$_('cycle.nextPeriod', { values: { days: cycleInfo.daysUntilNextPeriod }, default: `Next period in ${cycleInfo.daysUntilNextPeriod} days` })}</p>
          {/if}
        {:else}
          <p class="preview-hint">{$_('home.logLastPeriod', { default: 'Log your last period to see calendar predictions.' })}</p>
        {/if}
        <div class="preview-cta">
          <PebbleButton label={$_('home.viewCycle', { default: 'View cycle' })} size="sm" onclick={() => goto('/cycle')} />
        </div>
      </DSCard>
    </aside>
  </div>

  {#if showTour}<FeatureTour onDone={() => showTour = false} />{/if}
</div>

<style>
  .page { max-width: 390px; margin: 0 auto; min-height: 100dvh; display: flex; flex-direction: column; background: var(--c-bg); color: var(--c-text); }
  .content { flex: 1; display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-6) var(--space-4) calc(80px + env(safe-area-inset-bottom, 0px)); }

  @media (min-width: 768px) {
    .content { padding-bottom: var(--space-8, 32px); }
  }

  /* Wide 2-column split */
  .wide-grid { display: flex; flex-direction: column; }

  @media (min-width: 1024px) {
    .page { max-width: none; }
    .wide-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6, 24px); align-items: start; padding: var(--space-6); }
  }

  /* Screen 2: hidden below 1024px */
  .wide-screen-2 { display: none; }
  @media (min-width: 1024px) { .wide-screen-2 { display: block; } }

  /* Ring card */
  :global(.ring-card) { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
  .phase-name { font-size: var(--text-xl); font-weight: var(--weight-bold); margin: 0; }
  .next-hint  { font-size: var(--text-sm); color: var(--c-text-secondary); margin: var(--space-1) 0 0; }

  /* Week strip */
  :global(.week-strip) { display: flex; justify-content: space-between; padding: var(--space-3) var(--space-2); }
  .wd { display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; }
  .wd-name { font-size: 10px; font-weight: 600; text-transform: uppercase; color: var(--c-text-secondary); letter-spacing: .04em; }
  .wd-num { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .wd-num-today { background: color-mix(in srgb, var(--c-brand) 12%, transparent); color: var(--c-brand); font-weight: 700; outline: 2px solid var(--c-brand); outline-offset: -2px; }
  .wd-dot { width: 6px; height: 6px; border-radius: 50%; }

  /* Quick actions */
  .section-title { font-size: var(--text-sm); font-weight: var(--weight-semibold); text-transform: uppercase; letter-spacing: .06em; color: var(--c-text-secondary); margin: 0 0 var(--space-3); }
  .qa-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2); }
  .qa-btn { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); background: none; border: none; cursor: pointer; padding: 0; }
  .qa-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
  .qa-label { font-size: 11px; font-weight: 500; color: var(--c-text-secondary); }

  /* Empathy */
  .empathy-card { background: color-mix(in srgb, var(--c-brand) 6%, transparent); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); border-left: 3px solid var(--c-brand); }
  .empathy-msg { font-size: var(--text-base); font-style: italic; color: var(--c-text); margin: 0; line-height: 1.5; }

  /* CTA */
  .log-cta { display: flex; justify-content: center; padding-top: var(--space-2); }

  /* Setup banner */
  .setup-banner { display: flex; align-items: center; gap: var(--space-3); background: var(--c-surface); border-radius: var(--radius-lg); padding: var(--space-3) var(--space-4); }
  .setup-text { flex: 1; }
  .setup-msg { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0; line-height: 1.4; }

  /* Calendar preview (screen 2) */
  :global(.calendar-preview) { display: flex; flex-direction: column; gap: var(--space-3); }
  .preview-hint { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0; }
  .preview-cta { margin-top: var(--space-3); }
</style>
