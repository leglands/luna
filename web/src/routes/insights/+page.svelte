<script>
  import { StitchInsight, StitchChart, EvidenceCard, Icon, PrivacyBadge } from '$ds/index.js';
  import { loadData, getAverageCycleLength, getAveragePeriodLength } from '$lib/cycle-engine.js';

  let data = $state(null);
  
  $effect(() => {
    data = loadData();
  });

  const avgCycle = $derived(data ? getAverageCycleLength(data.log) : null);
  const avgPeriod = $derived(data ? getAveragePeriodLength(data.log) : null);
  
  const last6Cycles = $derived(() => {
    if (!data?.log?.period || data.log.period.length < 2) return [];
    const periods = [...data.log.period].map(p => new Date(p.date)).sort((a, b) => b - a);
    const cycles = [];
    for (let i = 0; i < Math.min(5, periods.length - 1); i++) {
      const diff = (periods[i] - periods[i + 1]) / (1000 * 60 * 60 * 24);
      cycles.unshift(diff);
    }
    return cycles;
  })();

  const topSymptoms = $derived(() => {
    if (!data?.log?.symptoms || data.log.symptoms.length === 0) return [];
    const counts = {};
    data.log.symptoms.forEach(s => {
      (s.symptoms || []).forEach(symptom => {
        counts[symptom] = (counts[symptom] || 0) + 1;
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, count]) => ({ name, count }));
  })();

  const isIrregular = $derived(avgCycle && (avgCycle < 21 || avgCycle > 35));
  const hasEnoughData = $derived(last6Cycles.length >= 2);
</script>

<div class="page" data-testid="insights-page">
  <header class="page-header">
    <button class="back-btn" onclick={() => window.history.back()} aria-label="Back">
      <Icon name="arrow-left" size={20} />
    </button>
    <h1>Insights</h1>
    <PrivacyBadge />
  </header>

  <main class="page-content">
    {#if !hasEnoughData}
      <div class="empty-state" data-testid="insights-empty">
        <Icon name="bar-chart" size={48} />
        <p>Track at least 3 cycles to unlock insights about your cycle patterns.</p>
        <EvidenceCard
          text="Cycle tracking improves self-awareness and helps identify irregularities."
          source="Fehring et al. 2006"
          doi="10.1111/j.1552-6909.2006.00030.x"
        />
      </div>
    {:else}
      {#if avgCycle}
        <StitchInsight
          brand="luna"
          insight="Your average cycle is {avgCycle} days"
          source="Fehring et al. 2006"
          doi="10.1111/j.1552-6909.2006.00030.x"
        />
      {/if}
      {#if avgPeriod}
        <StitchInsight
          brand="luna"
          insight="Average period duration: {avgPeriod} days"
          source="Fehring et al. 2006"
          doi="10.1111/j.1552-6909.2006.00030.x"
        />
      {/if}
      <section class="chart-section" data-testid="cycle-chart">
        <h2>Cycle length (last {last6Cycles.length} cycles)</h2>
        <StitchChart
          type="bar"
          data={last6Cycles}
          labels={last6Cycles.map((_, i) => `Cycle ${i + 1}`)}
          color="#6B3FA0"
        />
      </section>
      {#if topSymptoms.length > 0}
        <section class="chart-section" data-testid="symptoms-chart">
          <h2>Top symptoms</h2>
          <StitchChart
            type="bar"
            data={topSymptoms.map(s => s.count)}
            labels={topSymptoms.map(s => s.name.replace('-', ' '))}
            color="#D4678A"
          />
        </section>
      {/if}
      {#if isIrregular}
        <div class="alert-card" data-testid="irregular-alert" role="alert">
          <Icon name="alert-triangle" size={20} />
          <p>Your cycle appears irregular (outside the 21–35 day range). Consider consulting your gynecologist.</p>
        </div>
      {/if}
      <EvidenceCard
        text="Average cycle is 28 days, range 21–35 is considered normal."
        source="Fehring et al. 2006"
        doi="10.1111/j.1552-6909.2006.00030.x"
      />
    {/if}
  </main>
</div>

<style>
  .page { max-width: 430px; margin: 0 auto; padding: var(--space-4); min-height: 100dvh; }
  .page-header { display: flex; align-items: center; gap: var(--space-3); padding-bottom: var(--space-4); }
  .back-btn { background: none; border: none; cursor: pointer; color: var(--c-text); min-width: var(--tap-target); min-height: var(--tap-target); display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); }
  .back-btn:hover { background: var(--c-surface-raised); }
  h1 { font-size: var(--text-xl); font-weight: var(--weight-bold); color: var(--c-text); flex: 1; margin: 0; }
  .page-content { display: flex; flex-direction: column; gap: var(--space-4); }
  .empty-state { text-align: center; padding: var(--space-8) var(--space-4); display: flex; flex-direction: column; align-items: center; gap: var(--space-4); color: var(--c-text-secondary); }
  .chart-section { background: var(--c-surface); border-radius: var(--radius-lg); padding: var(--space-4); }
  h2 { font-size: var(--text-base); font-weight: var(--weight-semibold); color: var(--c-text); margin: 0 0 var(--space-3); }
  .alert-card { display: flex; gap: var(--space-2); align-items: flex-start; background: color-mix(in srgb, var(--c-error) 10%, transparent); border: 1px solid var(--c-error); border-radius: var(--radius-md); padding: var(--space-3); color: var(--c-text); }
</style>