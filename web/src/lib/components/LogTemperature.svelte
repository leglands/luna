<script>
  import PebbleButton from '$ds/PebbleButton.svelte';
  import { Thermometer } from 'lucide-svelte';

  let { onLog = () => {} } = $props();

  let temperature = $state('');
  let time = $state(new Date().toTimeString().slice(0, 5));

  function handleLog() {
    if (!temperature) return;
    onLog({
      temperature: parseFloat(temperature),
      time,
      date: new Date().toISOString().split('T')[0]
    });
    temperature = '';
  }
</script>

<div class="temp-input">
  <div class="input-row">
    <Thermometer size={24} color="var(--luna-primary)" />
    <input
      type="number"
      step="0.01"
      min="35"
      max="40"
      placeholder="36.5"
      bind:value={temperature}
    />
    <span class="unit">°C</span>
  </div>

  <div class="time-row">
    <label for="temp-time">Time:</label>
    <input
      id="temp-time"
      type="time"
      bind:value={time}
    />
  </div>

  <PebbleButton variant="primary" size="md" onclick={handleLog} disabled={!temperature}>
    Log Temperature
  </PebbleButton>
</div>

<style>
  .temp-input {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 16px);
    margin: var(--spacing-4, 16px) 0;
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-3, 12px);
    padding: var(--spacing-3, 12px);
    border: 1px solid var(--luna-secondary, #9D7BC9);
    border-radius: var(--radius-md, 12px);
  }

  input[type="number"] {
    flex: 1;
    border: none;
    background: transparent;
    font-size: var(--font-size-xl, 22px);
    color: var(--luna-primary, #6B3FA0);
    outline: none;
  }

  input[type="number"]::placeholder {
    color: var(--luna-secondary, #9D7BC9);
  }

  .unit {
    font-size: var(--font-size-lg, 17px);
    color: var(--luna-secondary, #9D7BC9);
  }

  .time-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-2, 8px);
  }

  .time-row label {
    font-size: var(--font-size-sm, 13px);
    color: var(--luna-secondary, #9D7BC9);
  }

  input[type="time"] {
    padding: var(--spacing-2, 8px);
    border: 1px solid var(--luna-secondary, #9D7BC9);
    border-radius: var(--radius-sm, 8px);
    font-size: var(--font-size-sm, 13px);
    color: var(--luna-primary, #6B3FA0);
  }
</style>
