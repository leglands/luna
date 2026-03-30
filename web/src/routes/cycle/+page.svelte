<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, TabBar } from '$ds/index.js';

  const TABS = [{id:'home',label:'Home'},{id:'cycle',label:'Cycle'},{id:'insights',label:'Insights'},{id:'settings',label:'Settings'}];
  const PHASE_LABELS = { menstrual:'Menstrual', follicular:'Follicular', ovulation:'Ovulation', luteal:'Luteal' };

  let heroValue = $state('—');
  let statusLine = $state('');
  let hint1 = $state('');
  let hint2 = $state('');

  function getPhase(pos, len) {
    if (pos < 5) return 'menstrual';
    if (pos < Math.floor(len * 0.43)) return 'follicular';
    if (pos < Math.floor(len * 0.57)) return 'ovulation';
    return 'luteal';
  }

  onMount(() => {
    const raw = localStorage.getItem('life-luna-data');
    if (!raw) { goto('/onboarding'); return; }
    const d = JSON.parse(raw);
    const { cycleLength = 28, lastPeriodDate } = d.settings ?? {};
    if (!lastPeriodDate) return;
    const diffDays = Math.floor((Date.now() - new Date(lastPeriodDate)) / 86400000);
    const cyclePos = ((diffDays % cycleLength) + cycleLength) % cycleLength;
    const dayOfCycle = cyclePos + 1;
    const daysUntilNext = cycleLength - cyclePos;
    heroValue = String(dayOfCycle);
    statusLine = PHASE_LABELS[getPhase(cyclePos, cycleLength)];
    hint1 = `Cycle day ${dayOfCycle} of ${cycleLength}`;
    if (daysUntilNext > 0) hint2 = `Period in ${daysUntilNext} days`;
  });
</script>

<div class="screen" data-app="luna">
  <main class="hero">
    <div class="hero-display">
      <span class="hero-value">{heroValue}</span>
      <span class="hero-label">Day of cycle</span>
    </div>
    <p class="status">{statusLine}</p>
    <PebbleButton label="Log today" size="lg" onclick={() => goto('/log')} />
    {#if hint1}<p class="hint">{hint1}</p>{/if}
    {#if hint2}<p class="hint secondary">{hint2}</p>{/if}
  </main>
  <TabBar tabs={TABS} activeTab="cycle" onchange={(id) => goto('/' + (id === 'home' ? '' : id))} brand="luna" />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-5); text-align: center; }
  .hero-display { display: flex; flex-direction: column; align-items: center; }
  .hero-value { font-size: 96px; font-weight: var(--weight-bold); line-height: 1; letter-spacing: -0.02em; color: var(--c-brand); }
  .hero-label { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-top: var(--space-2); }
  .status { font-size: var(--text-xl); font-weight: var(--weight-semibold); margin: 0; }
  .hint { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0; }
  .hint.secondary { opacity: 0.6; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
