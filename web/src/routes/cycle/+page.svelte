<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton, Icon, SegmentedRing } from '$ds/index.js';
  import { ChevronLeft } from 'lucide-svelte';
  import { loadData, getCurrentPhase, getFertileWindow } from '$lib/cycle-engine.js';

  let data = $state({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null }, log: { period: [] } });
  let cycleInfo = $state({ phase: 'unknown', dayOfCycle: 1, fertileStart: null, fertileEnd: null });

  const phases = [
    { id: 'menstrual', label: 'Menstrual', color: 'var(--c-error)' },
    { id: 'follicular', label: 'Follicular', color: 'var(--c-brand)' },
    { id: 'ovulation', label: 'Ovulation', color: 'var(--c-growth)' },
    { id: 'luteal', label: 'Luteal', color: 'var(--c-text-secondary)' }
  ];

  const ringSegments = $derived(phases.map(p => ({ label: p.label, color: p.color })));

  const currentPhaseIndex = $derived(phases.findIndex(p => p.id === cycleInfo.phase));

  const fertileWindow = $derived(getFertileWindow(data.settings.lastPeriodDate, data.settings.cycleLength));

  const hasData = $derived(data && data.settings.lastPeriodDate);

  onMount(() => {
    data = loadData();
    if (data.settings.lastPeriodDate) {
      cycleInfo = getCurrentPhase(data.settings.lastPeriodDate, data.settings.cycleLength);
    }
  });

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  }
</script>

<div class="cycle-page" data-app="luna">
  <header class="page-header">
    <button class="back-btn" onclick={() => goto('/')} aria-label="Back to home">
      <Icon name="chevron-left" size={20} />
    </button>
    <h1>My Cycle</h1>
  </header>

  {#if hasData && cycleInfo.phase !== 'unknown'}
    <main class="page-content">
      <div class="ring-container">
        <SegmentedRing
          segments={ringSegments}
          currentIndex={currentPhaseIndex >= 0 ? currentPhaseIndex : 0}
          centerText="Day {cycleInfo.dayOfCycle}"
          centerSubtext="of {data.settings.cycleLength}"
          size={200}
        />
      </div>

      <p class="status-text">Day {cycleInfo.dayOfCycle} — {phases[currentPhaseIndex]?.label || 'Unknown'}</p>

      {#if fertileWindow.start && fertileWindow.end}
        <div class="fertile-card">
          <Icon name="sparkles" size={16} />
          <span>Fertile window: {formatDate(fertileWindow.start)} – {formatDate(fertileWindow.end)}</span>
        </div>
      {/if}

      <PebbleButton label="Log today" onclick={() => goto('/log')} />
    </main>
  {:else}
    <main class="empty-state">
      <p>No cycle data yet. Start by logging your period.</p>
      <PebbleButton label="Log today" onclick={() => goto('/log')} />
    </main>
  {/if}
</div>

<style>
  .cycle-page {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--c-surface);
    border-bottom: 1px solid var(--c-border);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky, 100);
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    border-radius: var(--radius-md);
  }

  .back-btn:hover {
    background: var(--c-surface-container);
  }

  h1 {
    flex: 1;
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .page-content {
    padding: var(--space-8) var(--space-4);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
    max-width: 480px;
    margin: 0 auto;
  }

  .ring-container {
    padding: var(--space-4) 0;
  }

  .status-text {
    font-size: var(--text-base);
    color: var(--c-text-secondary);
    margin: 0;
    text-align: center;
  }

  .fertile-card {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: color-mix(in srgb, var(--c-growth) 10%, var(--c-surface));
    border-radius: var(--radius-lg);
    color: var(--c-growth);
    font-size: var(--text-sm);
    width: 100%;
    max-width: 280px;
  }

  .empty-state {
    padding: var(--space-12) var(--space-4);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .empty-state p {
    color: var(--c-text-secondary);
    font-size: var(--text-sm);
    margin: 0;
  }
</style>
