<script>
  import { Icon, PebbleButton, EmpathyBanner, PrivacyBadge } from '$ds/index.js';

  const flowTypes = [
    { id: 'period-start', label: 'Period start', icon: 'droplets' },
    { id: 'period-end', label: 'Period end', icon: 'droplet' },
    { id: 'spotting', label: 'Spotting', icon: 'circle' },
    { id: 'none', label: 'None', icon: 'x' }
  ];

  const flowIntensities = [
    { id: 'light', label: 'Light' },
    { id: 'medium', label: 'Medium' },
    { id: 'heavy', label: 'Heavy' },
    { id: 'very-heavy', label: 'Very heavy' }
  ];

  const symptoms = [
    { id: 'cramps', label: 'Cramps', icon: 'flame' },
    { id: 'bloating', label: 'Bloating', icon: 'waves' },
    { id: 'headache', label: 'Headache', icon: 'zap' },
    { id: 'fatigue', label: 'Fatigue', icon: 'moon' },
    { id: 'mood-swings', label: 'Mood swings', icon: 'sun-moon' },
    { id: 'breast-tenderness', label: 'Breast tenderness', icon: 'heart' },
    { id: 'nausea', label: 'Nausea', icon: 'activity' },
    { id: 'backache', label: 'Backache', icon: 'arrow-left' }
  ];

  const mucusTypes = [
    { id: 'dry', label: 'Dry' },
    { id: 'sticky', label: 'Sticky' },
    { id: 'creamy', label: 'Creamy' },
    { id: 'watery', label: 'Watery' },
    { id: 'egg-white', label: 'Egg white' }
  ];

  const moods = [
    { id: 'happy', label: 'Happy', icon: 'smile' },
    { id: 'neutral', label: 'Neutral', icon: 'circle' },
    { id: 'anxious', label: 'Anxious', icon: 'alert-circle' },
    { id: 'sad', label: 'Sad', icon: 'droplet' },
    { id: 'irritable', label: 'Irritable', icon: 'flame' },
    { id: 'energetic', label: 'Energetic', icon: 'zap' }
  ];

  let flowType = $state(null);
  let flowIntensity = $state(null);
  let selectedSymptoms = $state([]);
  let temperature = $state('');
  let mucus = $state(null);
  let mood = $state(null);
  let notes = $state('');
  let saving = $state(false);

  const isPeriod = $derived(flowType === 'period-start' || flowType === 'period-end');

  const today = $derived(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }));

  function toggleFlowType(id) {
    flowType = flowType === id ? null : id;
    if (!isPeriod) {
      flowIntensity = null;
    }
  }

  function toggleIntensity(id) {
    flowIntensity = flowIntensity === id ? null : id;
  }

  function toggleSymptom(id) {
    if (selectedSymptoms.includes(id)) {
      selectedSymptoms = selectedSymptoms.filter(s => s !== id);
    } else {
      selectedSymptoms = [...selectedSymptoms, id];
    }
  }

  function toggleMucus(id) {
    mucus = mucus === id ? null : id;
  }

  function toggleMood(id) {
    mood = mood === id ? null : id;
  }

  function handleBack() {
    window.location.href = '/cycle';
  }

  async function handleSave() {
    saving = true;
    const entry = {
      date: new Date().toISOString().split('T')[0],
      flowType,
      flowIntensity: isPeriod ? flowIntensity : null,
      symptoms: selectedSymptoms,
      temperature: temperature || null,
      mucus,
      mood,
      notes: notes.trim() || null
    };
    console.log('Saving entry:', entry);
    await new Promise(resolve => setTimeout(resolve, 500));
    saving = false;
    window.location.href = '/cycle';
  }
</script>

<div class="log-page">
  <header class="page-header">
    <button class="back-link" onclick={handleBack}>
      <Icon name="chevron-left" size={20} />
      <span>Back</span>
    </button>
    <div class="header-center">
      <h1 class="page-title">Log Today</h1>
      <p class="page-date">{today}</p>
    </div>
    <PrivacyBadge />
  </header>

  <main class="page-content">
    <EmpathyBanner type="info" />

    <section class="form-section">
      <h2 class="section-label">Flow type</h2>
      <div class="chip-grid chip-grid-4">
        {#each flowTypes as ft}
          <button
            class="chip"
            class:chip-selected={flowType === ft.id}
            onclick={() => toggleFlowType(ft.id)}
          >
            <Icon name={ft.icon} size={16} />
            <span>{ft.label}</span>
          </button>
        {/each}
      </div>
    </section>

    {#if isPeriod}
      <section class="form-section">
        <h2 class="section-label">Flow intensity</h2>
        <div class="chip-grid chip-grid-4">
          {#each flowIntensities as intensity}
            <button
              class="chip"
              class:chip-selected={flowIntensity === intensity.id}
              onclick={() => toggleIntensity(intensity.id)}
            >
              <span>{intensity.label}</span>
            </button>
          {/each}
        </div>
      </section>
    {/if}

    <section class="form-section">
      <h2 class="section-label">Symptoms</h2>
      <div class="symptom-grid">
        {#each symptoms as symptom}
          <button
            class="chip chip-symptom"
            class:chip-selected={selectedSymptoms.includes(symptom.id)}
            onclick={() => toggleSymptom(symptom.id)}
          >
            <Icon name={symptom.icon} size={14} />
            <span>{symptom.label}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-label">Basal body temperature <span class="optional">(optional)</span></h2>
      <div class="input-row">
        <Icon name="thermometer" size={18} class="input-icon" />
        <input
          type="number"
          step="0.01"
          min="35"
          max="42"
          placeholder="36.5"
          bind:value={temperature}
          class="text-input"
        />
        <span class="input-unit">C</span>
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-label">Cervical mucus</h2>
      <div class="chip-grid chip-grid-5">
        {#each mucusTypes as m}
          <button
            class="chip chip-small"
            class:chip-selected={mucus === m.id}
            onclick={() => toggleMucus(m.id)}
          >
            <span>{m.label}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-label">Mood</h2>
      <div class="mood-grid">
        {#each moods as m}
          <button
            class="mood-chip"
            class:chip-selected={mood === m.id}
            onclick={() => toggleMood(m.id)}
          >
            <Icon name={m.icon} size={20} />
            <span>{m.label}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="form-section">
      <h2 class="section-label">Notes <span class="optional">(optional)</span></h2>
      <textarea
        bind:value={notes}
        placeholder="How are you feeling today?"
        class="notes-input"
        rows="3"
      ></textarea>
    </section>

    <div class="save-section">
      <PebbleButton
        brand="luna"
        label="Save"
        size="lg"
        variant="primary"
        loading={saving}
        onclick={handleSave}
      />
    </div>
  </main>
</div>

<style>
  .log-page {
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

  .header-center {
    flex: 1;
    text-align: center;
  }

  .page-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .page-date {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    margin: var(--space-1) 0 0 0;
  }

  .page-content {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    max-width: 480px;
    margin: 0 auto;
    padding-bottom: var(--space-12);
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .section-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .optional {
    font-weight: var(--weight-normal);
    color: var(--c-text-secondary);
  }

  .chip-grid {
    display: grid;
    gap: var(--space-2);
  }

  .chip-grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .chip-grid-5 {
    grid-template-columns: repeat(5, 1fr);
  }

  .symptom-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2);
  }

  .chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-2);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .chip:hover {
    border-color: var(--c-brand);
    color: var(--c-brand);
  }

  .chip-selected {
    background: var(--c-brand);
    border-color: var(--c-brand);
    color: white;
  }

  .chip-selected:hover {
    color: white;
  }

  .chip-symptom {
    justify-content: flex-start;
    padding: var(--space-3);
    font-size: var(--text-sm);
  }

  .chip-small {
    font-size: var(--text-xs);
    padding: var(--space-2);
  }

  .mood-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }

  .mood-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .mood-chip:hover {
    border-color: var(--c-brand);
    color: var(--c-brand);
  }

  .mood-chip:has(.chip-selected) {
    border-color: var(--c-brand);
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
  }

  .input-icon {
    color: var(--c-text-secondary);
    flex-shrink: 0;
  }

  .text-input {
    flex: 1;
    background: transparent;
    border: none;
    font-size: var(--text-base);
    color: var(--c-text);
    font-family: var(--font-sans);
    min-height: var(--tap-target);
  }

  .text-input:focus {
    outline: none;
  }

  .text-input::placeholder {
    color: var(--c-text-secondary);
  }

  .input-unit {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
  }

  .notes-input {
    width: 100%;
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    color: var(--c-text);
    font-family: var(--font-sans);
    resize: vertical;
    min-height: 80px;
  }

  .notes-input:focus {
    outline: none;
    border-color: var(--c-brand);
  }

  .notes-input::placeholder {
    color: var(--c-text-secondary);
  }

  .save-section {
    padding-top: var(--space-4);
    display: flex;
    justify-content: center;
  }

  .save-section :global(button) {
    width: 100%;
    max-width: 280px;
  }

  @media (prefers-reduced-motion: reduce) {
    .chip,
    .mood-chip {
      transition: none;
    }
  }
</style>
