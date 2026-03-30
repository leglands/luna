<script>
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  let step = $state(0);
  const TOTAL = 3;

  let lastPeriodDate = $state('');
  let cycleLength = $state(28);

  function next() {
    if (step < TOTAL - 1) { step++; return; }
    complete();
  }

  function complete() {
    const data = {
      settings: { lastPeriodDate, cycleLength: Number(cycleLength), periodLength: 5 },
      log: { period: [], symptoms: [], temperature: [], mood: [] }
    };
    localStorage.setItem('luna_data', JSON.stringify(data));
    localStorage.setItem('life-luna-onboarded', '1');
    goto('/');
  }
</script>

<div class="onboarding" data-app="luna">
  <div class="dots">
    {#each Array(TOTAL) as _, i}
      <span class="dot" class:active={i === step}></span>
    {/each}
  </div>

  {#if step === 0}
    <div class="slide">
      <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="var(--c-brand)" fill-opacity="0.15"/>
        <path d="M72 30 A34 34 0 1 0 72 90 A22 22 0 1 1 72 30Z"
              fill="none" stroke="var(--c-brand)" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h1>Know your cycle</h1>
      <p>Your rhythm, made simple.</p>
      <PebbleButton label="Next" size="lg" onclick={next} />
    </div>

  {:else if step === 1}
    <div class="slide">
      <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="var(--c-brand)" fill-opacity="0.15"/>
        <circle cx="60" cy="60" r="28" fill="none" stroke="var(--c-brand)" stroke-width="2"/>
        <circle cx="60" cy="60" r="6" fill="var(--c-brand)"/>
      </svg>
      <h1>Track effortlessly</h1>
      <p>Log in seconds, understand in days.</p>
      <PebbleButton label="Next" size="lg" onclick={next} />
    </div>

  {:else}
    <div class="slide setup">
      <h1>Ready to start</h1>
      <label>
        When did your last period start?
        <input type="date" bind:value={lastPeriodDate} />
      </label>
      <label>
        How long is your cycle?
        <input type="number" bind:value={cycleLength} min="21" max="35" />
      </label>
      <PebbleButton label="Start tracking" size="lg" onclick={complete} />
    </div>
  {/if}
</div>

<style>
  .onboarding {
    min-height: 100dvh;
    background: var(--c-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-8) var(--space-4);
    gap: var(--space-6);
    text-align: center;
  }

  .dots {
    display: flex;
    gap: var(--space-2);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-text-secondary);
    opacity: 0.3;
    transition: opacity 0.2s, width 0.2s;
  }

  .dot.active {
    opacity: 1;
    width: 24px;
    border-radius: 4px;
    background: var(--c-brand);
  }

  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
    max-width: 320px;
    width: 100%;
  }

  h1 {
    font-size: var(--text-3xl, 28px);
    font-weight: var(--weight-bold);
    margin: 0;
  }

  p {
    font-size: var(--text-base, 15px);
    color: var(--c-text-secondary);
    margin: 0;
    max-width: 260px;
    line-height: 1.5;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    font-size: var(--text-sm);
    width: 100%;
    text-align: left;
  }

  input {
    padding: var(--space-3);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md, 16px);
    background: var(--c-surface);
    font-size: var(--text-base);
    color: var(--c-text);
    width: 100%;
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    .dot { transition: none; }
  }
</style>
