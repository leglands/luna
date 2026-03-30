<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Icon, StitchChart } from '$ds/index.js';
  import { ChevronLeft } from 'lucide-svelte';
  import { loadData, getAverageCycleLength, getAveragePeriodLength } from '$lib/cycle-engine.js';

  let data = $state({ log: { period: [] } });
  let avgCycle = $state(null);
  let avgPeriod = $state(null);
  let regularity = $state(null);
  let last6Cycles = $state([]);

  onMount(() => {
    data = loadData();
    avgCycle = getAverageCycleLength(data.log);
    avgPeriod = getAveragePeriodLength(data.log);
    regularity = calculateRegularity();
    last6Cycles = getLast6Cycles();
  });

  function getLast6Cycles() {
    if (!data.log.period || data.log.period.length < 2) return [];
    const periods = [...data.log.period].map(p => new Date(p.date)).sort((a, b) => b - a);
    const cycles = [];
    for (let i = 0; i < Math.min(5, periods.length - 1); i++) {
      const diff = Math.round((periods[i] - periods[i + 1]) / (1000 * 60 * 60 * 24));
      cycles.unshift(diff);
    }
    return cycles;
  }

  function calculateRegularity() {
    if (!data.log.period || data.log.period.length < 3) return null;
    const cycles = getLast6Cycles();
    if (cycles.length < 2) return null;
    const avg = cycles.reduce((a, b) => a + b, 0) / cycles.length;
    const variance = cycles.reduce((sum, c) => sum + Math.pow(c - avg, 2), 0) / cycles.length;
    const stdDev = Math.sqrt(variance);
    if (stdDev <= 2) return 100;
    if (stdDev <= 5) return 80;
    if (stdDev <= 7) return 60;
    return 40;
  }

  const hasEnoughData = $derived(last6Cycles.length >= 2);
</script>

<div class="insights-page" data-app="luna">
  <header class="page-header">
    <button class="back-btn" onclick={() => goto('/')} aria-label="Back">
      <Icon name="chevron-left" size={20} />
    </button>
    <h1>Insights</h1>
  </header>

  <main class="page-content">
    {#if !hasEnoughData}
      <div class="empty-state">
        <Icon name="bar-chart" size={48} />
        <p>Track at least 2 cycles to see insights.</p>
      </div>
    {:else}
      <div class="hero-stat">
        <span class="stat-number">{avgCycle}</span>
        <span class="stat-label">Average cycle (days)</span>
      </div>

      <div class="secondary-stats">
        <div class="stat-card">
          <span class="stat-value">{avgPeriod ?? '—'}</span>
          <span class="stat-name">Avg period (days)</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">{regularity ?? '—'}%</span>
          <span class="stat-name">Regularity</span>
        </div>
      </div>

      <section class="chart-section">
        <h2>Last {last6Cycles.length} cycles</h2>
        <StitchChart
          type="bar"
          data={last6Cycles}
          labels={last6Cycles.map((_, i) => `Cycle ${i + 1}`)}
          color="#E57373"
        />
      </section>
    {/if}
  </main>
</div>

<style>
  .insights-page {
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
    padding: var(--space-6) var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    max-width: 480px;
    margin: 0 auto;
  }

  .hero-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-6) 0;
  }

  .stat-number {
    font-size: 64px;
    font-weight: var(--weight-bold);
    color: var(--c-brand, #E57373);
    line-height: 1;
  }

  .stat-label {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .secondary-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-4);
    background: var(--c-surface);
    border-radius: var(--radius-lg);
  }

  .stat-value {
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    color: var(--c-text);
  }

  .stat-name {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    text-align: center;
  }

  .chart-section {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
  }

  .chart-section h2 {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    margin: 0 0 var(--space-3) 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-12) var(--space-4);
    gap: var(--space-4);
    color: var(--c-text-secondary);
    text-align: center;
  }

  .empty-state p {
    font-size: var(--text-sm);
    margin: 0;
  }
</style>
