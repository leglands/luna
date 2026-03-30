<script>
  import { goto } from '$app/navigation';
  import { PebbleButton, Icon } from '$ds/index.js';
  import { ChevronLeft } from 'lucide-svelte';
  import { loadData, logEntry, updateSettings } from '$lib/cycle-engine.js';

  let selectedFlow = $state(null);
  let selectedMood = $state(null);
  let selectedSymptoms = $state([]);
  let symptomsExpanded = $state(false);
  let saving = $state(false);

  const flowOptions = [
    { id: 'none', label: 'None', icon: 'x' },
    { id: 'light', label: 'Light', icon: 'droplet' },
    { id: 'medium', label: 'Medium', icon: 'droplet' },
    { id: 'heavy', label: 'Heavy', icon: 'droplets' }
  ];

  const moodOptions = [
    { id: 'calm', label: 'Calm', icon: 'sun' },
    { id: 'tired', label: 'Tired', icon: 'moon' },
    { id: 'irritable', label: 'Irritable', icon: 'flame' },
    { id: 'happy', label: 'Happy', icon: 'smile' },
    { id: 'anxious', label: 'Anxious', icon: 'alert-circle' }
  ];

  const symptomOptions = [
    'cramps', 'bloating', 'headache', 'fatigue', 'back-pain', 'breast-tenderness', 'nausea', 'acne'
  ];

  function toggleFlow(id) {
    selectedFlow = selectedFlow === id ? null : id;
  }

  function toggleMood(id) {
    selectedMood = selectedMood === id ? null : id;
  }

  function toggleSymptom(symptom) {
    if (selectedSymptoms.includes(symptom)) {
      selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    } else {
      selectedSymptoms = [...selectedSymptoms, symptom];
    }
  }

  async function handleSave() {
    saving = true;
    const today = new Date().toISOString().split('T')[0];
    if (selectedFlow && selectedFlow !== 'none') {
      logEntry('period', { date: today, flow: selectedFlow });
    }
    if (selectedMood || selectedSymptoms.length > 0) {
      logEntry('symptoms', { date: today, mood: selectedMood, symptoms: selectedSymptoms });
    }
    await new Promise(r => setTimeout(r, 300));
    saving = false;
    goto('/');
  }

  function handleBack() {
    goto('/');
  }
</script>

<div class="log-page" data-app="luna">
  <header class="page-header">
    <button class="back-btn" onclick={handleBack} aria-label="Back">
      <Icon name="chevron-left" size={20} />
    </button>
    <h1>How are you today?</h1>
  </header>

  <main class="page-content">
    <section class="section">
      <h2 class="section-label">Flow</h2>
      <div class="flow-grid">
        {#each flowOptions as option}
          <button
            class="flow-btn"
            class:selected={selectedFlow === option.id}
            onclick={() => toggleFlow(option.id)}
            data-testid="flow-{option.id}"
          >
            <Icon name={option.icon} size={20} />
            <span>{option.label}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="section">
      <h2 class="section-label">Mood</h2>
      <div class="mood-grid">
        {#each moodOptions as option}
          <button
            class="mood-btn"
            class:selected={selectedMood === option.id}
            onclick={() => toggleMood(option.id)}
            data-testid="mood-{option.id}"
          >
            <Icon name={option.icon} size={18} />
            <span>{option.label}</span>
          </button>
        {/each}
      </div>
    </section>

    <section class="section">
      <button class="expand-btn" onclick={() => symptomsExpanded = !symptomsExpanded}>
        <span>Add symptoms</span>
        <Icon name={symptomsExpanded ? 'chevron-up' : 'chevron-down'} size={16} />
      </button>
      {#if symptomsExpanded}
        <div class="symptom-grid">
          {#each symptomOptions as symptom}
            <button
              class="symptom-btn"
              class:selected={selectedSymptoms.includes(symptom)}
              onclick={() => toggleSymptom(symptom)}
              data-testid="symptom-{symptom}"
            >
              {symptom.replace('-', ' ')}
            </button>
          {/each}
        </div>
      {/if}
    </section>

    <div class="save-area">
      <PebbleButton
        label="Save"
        size="lg"
        loading={saving}
        onclick={handleSave}
        data-testid="save-btn"
      />
    </div>
  </main>
</div>

<style>
  .log-page {
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
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
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

  .section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .section-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-2);
  }

  .flow-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3);
    background: var(--c-surface);
    border: 2px solid var(--c-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    color: var(--c-text-secondary);
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .flow-btn.selected {
    border-color: var(--c-brand, #E57373);
    color: var(--c-brand, #E57373);
    background: color-mix(in srgb, var(--c-brand, #E57373) 8%, var(--c-surface));
  }

  .flow-btn span {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
  }

  .mood-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-2);
  }

  .mood-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    color: var(--c-text-secondary);
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .mood-btn.selected {
    border-color: var(--c-brand, #E57373);
    color: var(--c-brand, #E57373);
    background: color-mix(in srgb, var(--c-brand, #E57373) 8%, var(--c-surface));
  }

  .mood-btn span {
    font-size: 10px;
    font-weight: var(--weight-medium);
  }

  .expand-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    cursor: pointer;
    color: var(--c-text);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    min-height: var(--tap-target);
  }

  .symptom-grid {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-2);
  }

  .symptom-btn {
    padding: var(--space-2) var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-full);
    cursor: pointer;
    color: var(--c-text-secondary);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .symptom-btn.selected {
    border-color: var(--c-brand, #E57373);
    color: var(--c-brand, #E57373);
    background: color-mix(in srgb, var(--c-brand, #E57373) 8%, var(--c-surface));
  }

  .save-area {
    padding-top: var(--space-4);
    display: flex;
    justify-content: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-btn,
    .mood-btn,
    .symptom-btn {
      transition: none;
    }
  }
</style>
