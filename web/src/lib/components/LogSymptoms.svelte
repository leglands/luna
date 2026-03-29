<script>
  import PebbleButton from '$ds/PebbleButton.svelte';
  import { Heart, Thermometer, Brain, Droplets } from 'lucide-svelte';

  let { onLog = () => {} } = $props();

  const symptoms = [
    { id: 'cramp', label: 'Cramp', icon: Heart },
    { id: 'bloating', label: 'Bloating', icon: Droplets },
    { id: 'fatigue', label: 'Fatigue', icon: Brain },
    { id: 'headache', label: 'Headache', icon: Brain },
    { id: 'breast_tenderness', label: 'Breast tenderness', icon: Heart },
    { id: 'backache', label: 'Backache', icon: Brain },
    { id: 'acne', label: 'Acne', icon: Droplets },
    { id: 'cravings', label: 'Cravings', icon: Brain }
  ];

  let selected = $state([]);

  function toggle(id) {
    if (selected.includes(id)) {
      selected = selected.filter(s => s !== id);
    } else {
      selected = [...selected, id];
    }
  }

  function handleLog() {
    onLog({ symptoms: selected, date: new Date().toISOString().split('T')[0] });
    selected = [];
  }
</script>

<div class="symptom-grid">
  {#each symptoms as symptom}
    <button
      class="symptom-chip"
      class:selected={selected.includes(symptom.id)}
      onclick={() => toggle(symptom.id)}
    >
      <svelte:component this={symptom.icon} size={16} />
      <span>{symptom.label}</span>
    </button>
  {/each}
</div>

{#if selected.length > 0}
  <PebbleButton variant="primary" size="md" onclick={handleLog}>
    Log {selected.length} symptom{selected.length > 1 ? 's' : ''}
  </PebbleButton>
{/if}

<style>
  .symptom-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-2, 8px);
    margin: var(--spacing-4, 16px) 0;
  }

  .symptom-chip {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 8px);
    padding: var(--spacing-3, 12px);
    border-radius: var(--radius-md, 12px);
    border: 1px solid var(--luna-secondary, #9D7BC9);
    background: transparent;
    color: var(--luna-primary, #6B3FA0);
    font-size: var(--font-size-sm, 13px);
    font-weight: var(--font-weight-medium, 500);
    cursor: pointer;
    transition: all var(--transition-fast, 150ms ease);
  }

  .symptom-chip:hover {
    background: var(--luna-primary-container, #E8DFF5);
  }

  .symptom-chip.selected {
    background: var(--luna-primary, #6B3FA0);
    color: white;
    border-color: var(--luna-primary, #6B3FA0);
  }
</style>
