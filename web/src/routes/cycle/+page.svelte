<script>
  import { Icon, SegmentedRing, EvidenceCard, PebbleButton, EmpathyBanner, PrivacyBadge } from '$ds/index.js';
  import { loadData, getCurrentPhase, getFertileWindow } from '$lib/cycle-engine.js';

  let data = $state(null);
  let cycleInfo = $state(null);

  const phases = [
    { id: 'menstrual', label: 'Menstrual' },
    { id: 'follicular', label: 'Follicular' },
    { id: 'ovulation', label: 'Ovulation' },
    { id: 'luteal', label: 'Luteal' }
  ];

  const symptomChips = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'mood', label: 'Mood' },
    { id: 'energy', label: 'Energy' },
    { id: 'flow', label: 'Flow' }
  ];

  const ringSegments = $derived([
    { label: 'Menstrual', color: 'var(--c-error)' },
    { label: 'Follicular', color: 'var(--c-brand)' },
    { label: 'Ovulation', color: 'var(--c-growth)' },
    { label: 'Luteal', color: 'var(--c-text-secondary)' }
  ]);

  const currentPhaseIndex = $derived(
    cycleInfo ? phases.findIndex(p => p.id === cycleInfo.phase) : 0
  );

  const cycleLength = $derived(data?.settings?.cycleLength || 28);

  const fertileWindow = $derived(
    getFertileWindow(data?.settings?.lastPeriodDate, cycleLength)
  );

  const hasData = $derived(data && data.settings.lastPeriodDate);

  function handleBack() {
    window.location.href = '/';
  }

  function toggleSymptom(symptomId) {
    console.log('Toggle symptom:', symptomId);
  }

  $effect(() => {
    data = loadData();
    if (data && data.settings.lastPeriodDate) {
      cycleInfo = getCurrentPhase(data.settings.lastPeriodDate, cycleLength);
    }
  });
</script>

<div class="cycle-page">
  <header class="page-header">
    <button class="back-link" onclick={handleBack}>
      <Icon name="chevron-left" size={20} />
      <span>Home</span>
    </button>
    <h1 class="page-title">My Cycle</h1>
    <PrivacyBadge />
  </header>

  {#if hasData && cycleInfo}
    <main class="page-content">
      <div class="phase-pill">
        <Icon name={cycleInfo.phase === 'menstrual' ? 'droplets' : cycleInfo.phase === 'follicular' ? 'sun' : cycleInfo.phase === 'ovulation' ? 'sparkles' : 'moon'} size={16} />
        <span class="phase-name">{phases[currentPhaseIndex]?.label || 'Unknown'}</span>
      </div>

      <section class="ring-section">
        <SegmentedRing
          segments={ringSegments}
          currentIndex={currentPhaseIndex}
          centerText="Day {cycleInfo.dayOfCycle}"
          centerSubtext="of {cycleLength}"
          size={180}
        />
      </section>

      <section class="prediction-section">
        {#if cycleInfo.daysUntilNextPeriod > 0}
          <p class="prediction-text">
            Next period in <strong>{cycleInfo.daysUntilNextPeriod} days</strong>
          </p>
        {:else if cycleInfo.daysUntilNextPeriod === 0}
          <p class="prediction-text">
            <strong>Period expected today</strong>
          </p>
        {:else}
          <p class="prediction-text late">
            Period <strong>{Math.abs(cycleInfo.daysUntilNextPeriod)} days late</strong>
          </p>
        {/if}
      </section>

      <section class="symptoms-section">
        <h2 class="section-title">Quick log</h2>
        <div class="symptom-chips">
          {#each symptomChips as symptom}
            <button
              class="symptom-chip"
              onclick={() => toggleSymptom(symptom.id)}
            >
              <Icon name={symptom.id === 'flow' ? 'droplets' : symptom.id === 'mood' ? 'smile' : symptom.id === 'energy' ? 'battery' : 'flame'} size={14} />
              {symptom.label}
            </button>
          {/each}
        </div>
      </section>

      {#if fertileWindow.start && fertileWindow.end}
        <section class="ovulation-section">
          <div class="ovulation-card">
            <Icon name="sparkles" size={18} />
            <div class="ovulation-info">
              <p class="ovulation-label">Ovulation window</p>
              <p class="ovulation-dates">{fertileWindow.start} - {fertileWindow.end}</p>
            </div>
          </div>
        </section>
      {/if}

      <section class="evidence-section">
        <EvidenceCard
          text="Cycle length varies between 21-35 days in healthy women. Tracking helps identify your personal pattern."
          source="ESHRE 2018"
          doi="10.1093/humrep/dey203"
          icon="book-open"
        />
      </section>
    </main>
  {:else}
    <main class="empty-state">
      <div class="empty-icon">
        <Icon name="calendar" size={48} />
      </div>
      <h2 class="empty-title">No cycle data yet</h2>
      <p class="empty-description">Start tracking your cycle to see insights and predictions.</p>
      <PebbleButton label="Log period" onclick={handleBack} />
    </main>
  {/if}
</div>

<style>
  .cycle-page {
    min-height: 100vh;
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

  .back-link {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    background: none;
    border: none;
    color: var(--c-text-secondary);
    font-size: var(--text-sm);
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    min-height: var(--tap-target);
    min-width: var(--tap-target);
  }

  .back-link:hover {
    background: var(--c-surface-container);
    color: var(--c-text);
  }

  .page-title {
    flex: 1;
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
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

  .phase-pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: color-mix(in srgb, var(--c-brand) 12%, var(--c-surface));
    color: var(--c-brand);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    width: fit-content;
  }

  .phase-name {
    text-transform: capitalize;
  }

  .ring-section {
    display: flex;
    justify-content: center;
    padding: var(--space-4) 0;
  }

  .prediction-section {
    text-align: center;
    padding: var(--space-2) 0;
  }

  .prediction-text {
    font-size: var(--text-base);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .prediction-text strong {
    color: var(--c-text);
    font-weight: var(--weight-semibold);
  }

  .prediction-text.late {
    color: var(--c-error);
  }

  .symptoms-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .section-title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .symptom-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .symptom-chip {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .symptom-chip:hover {
    border-color: var(--c-brand);
    color: var(--c-brand);
  }

  .symptom-chip:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .ovulation-section {
    padding: var(--space-2) 0;
  }

  .ovulation-card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: color-mix(in srgb, var(--c-growth) 10%, var(--c-surface));
    border-radius: var(--radius-lg);
    color: var(--c-growth);
  }

  .ovulation-info {
    flex: 1;
  }

  .ovulation-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--c-text);
    margin: 0 0 var(--space-1) 0;
  }

  .ovulation-dates {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .evidence-section {
    padding: var(--space-2) 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-12) var(--space-4);
    text-align: center;
    gap: var(--space-4);
    min-height: 60vh;
  }

  .empty-icon {
    color: var(--c-text-secondary);
    opacity: 0.5;
  }

  .empty-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .empty-description {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
    max-width: 280px;
  }

  @media (prefers-reduced-motion: reduce) {
    .symptom-chip {
      transition: none;
    }
  }
</style>