<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, Icon, TabBar, EmpathyBanner, SegmentedRing } from '$ds/index.js';
  import { Home, Calendar, Sparkles, Settings } from 'lucide-svelte';
  import { loadData, getCurrentPhase } from '$lib/cycle-engine.js';

  let data = $state({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null }, log: { period: [], symptoms: [], mood: [] } });
  let cycleInfo = $state({ phase: 'unknown', dayOfCycle: 1, daysUntilNextPeriod: 14 });

  const empathyMessages = {
    morning: [
      'A new day, a new beginning.',
      'Take a moment for yourself.',
      'Your body, your rhythm.'
    ],
    evening: [
      'Rest is part of the cycle.',
      'Tomorrow is a new opportunity.',
      'Listen to your body.'
    ]
  };

  const empathy = $derived(() => {
    const hour = new Date().getHours();
    const timeKey = hour < 12 ? 'morning' : 'evening';
    const messages = empathyMessages[timeKey];
    return messages[Math.floor(Math.random() * messages.length)];
  });

  const phaseLabels = {
    menstrual: 'Menstrual',
    follicular: 'Follicular',
    ovulation: 'Ovulation',
    luteal: 'Luteal',
    unknown: 'Unknown'
  };

  onMount(() => {
    const onboarded = localStorage.getItem('life-luna-onboarded');
    if (!onboarded) {
      goto('/onboarding');
      return;
    }
    data = loadData();
    updateCycleInfo();
  });

  function updateCycleInfo() {
    cycleInfo = getCurrentPhase(data.settings.lastPeriodDate, data.settings.cycleLength);
  }

  const PHASE_IDX = { menstrual: 0, follicular: 1, ovulation: 2, luteal: 3, unknown: 0 };
  const phaseIndex = $derived(PHASE_IDX[cycleInfo.phase] ?? 0);
  const periodLength = $derived(data.settings?.periodLength ?? 5);
  const cycleLength = $derived(data.settings?.cycleLength ?? 28);

  const todayLogged = $derived(() => {
    const today = new Date().toISOString().split('T')[0];
    return data.log.period?.find(p => p.date === today);
  });
</script>

<div class="home-page" data-app="luna">
  <main class="hero">
    <div class="day-display">
      <span class="day-number">{cycleInfo.dayOfCycle}</span>
      <span class="day-label">Day</span>
    </div>
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
      size={200}
    />
    <p class="phase-name">{phaseLabels[cycleInfo.phase] || 'Unknown'}</p>
    <PebbleButton label="Log today" size="lg" onclick={() => goto('/log')} />
    {#if cycleInfo.daysUntilNextPeriod > 0}
      <p class="next-hint">Next period in {cycleInfo.daysUntilNextPeriod} days</p>
    {:else if cycleInfo.daysUntilNextPeriod === 0}
      <p class="next-hint">Period expected today</p>
    {/if}
  </main>

  <EmpathyBanner message={empathy()} />

  <TabBar
    tabs={[
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'cycle', label: 'Cycle', icon: 'calendar' },
      { id: 'insights', label: 'Insights', icon: 'bar-chart' },
      { id: 'settings', label: 'Settings', icon: 'settings' }
    ]}
    activeTab="home"
    onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
    brand="luna"
  />
</div>

<style>
  .home-page {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    max-width: 390px;
    margin: 0 auto;
  }

  .hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-8) var(--space-4);
    gap: var(--space-4);
    text-align: center;
  }

  .day-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--c-brand, #E57373);
  }

  .day-number {
    font-size: clamp(52px, 14vw, 96px);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .day-label {
    font-size: var(--text-lg);
    font-weight: var(--weight-medium);
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 0.1em;
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

  @media (prefers-reduced-motion: reduce) {
    .day-number {
      transition: none;
    }
  }
</style>
