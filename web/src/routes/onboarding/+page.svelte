<script>
  import { goto } from '$app/navigation';
  import { DSOnboarding } from '$ds/index.js';

  const TOTAL = 5;
  let step = $state(0);

  let firstName = $state('');
  let lastPeriodDate = $state('');
  let cycleLength = $state(28);
  let periodLength = $state(5);
  let selectedGoals = $state(new Set());

  const GOALS = [
    { id: 'track', label: 'Track my cycle' },
    { id: 'pregnancy', label: 'Plan a pregnancy' },
    { id: 'understand', label: 'Understand my body' },
    { id: 'pms', label: 'Manage PMS' },
    { id: 'curious', label: 'Just curious' },
  ];

  function next() {
    if (step < TOTAL - 1) { step++; return; }
    complete();
  }

  function prev() { if (step > 0) step--; }

  function toggleGoal(id) {
    const g = new Set(selectedGoals);
    if (g.has(id)) g.delete(id); else g.add(id);
    selectedGoals = g;
  }

  function complete() {
    const data = {
      settings: {
        firstName: firstName.trim(),
        lastPeriodDate,
        cycleLength: Number(cycleLength),
        periodLength: Number(periodLength),
        goals: [...selectedGoals],
      },
      log: { period: [], symptoms: [], temperature: [], mood: [], energy: [] },
    };
    localStorage.setItem('life-luna-data', JSON.stringify(data));
    localStorage.setItem('life-luna-onboarded', '1');
    localStorage.setItem('life-luna-tour-pending', '1');
    goto('/');
  }

  const canProceed = $derived(step !== 2 || lastPeriodDate !== '');
</script>

<DSOnboarding
  currentStep={step}
  totalSteps={TOTAL}
  {canProceed}
  onNext={next}
  onBack={prev}
  brand="luna"
  finishLabel="Start tracking"
>
  {#snippet children()}
    {#if step === 0}
      <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="var(--c-brand)" fill-opacity="0.12"/>
        <path d="M72 30 A34 34 0 1 0 72 90 A22 22 0 1 1 72 30Z"
              fill="none" stroke="var(--c-brand)" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <h1>Hi, I'm Luna</h1>
      <p>Your cycle, understood. Log in seconds, understand your body over time — privately, on your device.</p>

    {:else if step === 1}
      <h1>What should I call you?</h1>
      <p>Optional — only used to personalise your experience.</p>
      <input
        type="text"
        bind:value={firstName}
        placeholder="Your first name"
        class="ob-input"
        autocomplete="given-name"
      />

    {:else if step === 2}
      <h1>When did your last period start?</h1>
      <p>This helps Luna predict your next cycle right away.</p>
      <input
        type="date"
        bind:value={lastPeriodDate}
        class="ob-input"
        max={new Date().toISOString().split('T')[0]}
      />

    {:else if step === 3}
      <h1>Your cycle rhythm</h1>
      <p>We'll refine this over time as Luna learns your pattern.</p>
      <div class="slider-group">
        <label>Cycle length: <strong>{cycleLength} days</strong></label>
        <input type="range" bind:value={cycleLength} min="21" max="35" step="1" class="slider" />
        <div class="slider-range"><span>21</span><span>35</span></div>
      </div>
      <div class="slider-group">
        <label>Period length: <strong>{periodLength} days</strong></label>
        <input type="range" bind:value={periodLength} min="2" max="8" step="1" class="slider" />
        <div class="slider-range"><span>2</span><span>8</span></div>
      </div>

    {:else}
      <h1>What brings you to Luna?</h1>
      <p>Choose all that apply. You can change this anytime.</p>
      <div class="goals-grid">
        {#each GOALS as g}
          <button
            class="goal-chip"
            class:active={selectedGoals.has(g.id)}
            onclick={() => toggleGoal(g.id)}
          >{g.label}</button>
        {/each}
      </div>
    {/if}
  {/snippet}
</DSOnboarding>

<style>
  h1 {
    font-size: clamp(24px, 7vw, 32px);
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
    text-align: center;
  }

  p {
    font-size: var(--text-base);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: 1.5;
    max-width: 280px;
    text-align: center;
  }

  .ob-input {
    width: 100%;
    padding: 14px 16px;
    border: 1.5px solid var(--c-border);
    border-radius: var(--radius-lg);
    font-size: 16px;
    box-sizing: border-box;
    background: var(--c-surface);
    color: var(--c-text);
    font-family: inherit;
  }

  .slider-group {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .slider-group label {
    font-size: var(--text-base);
    font-weight: 500;
  }

  .slider {
    width: 100%;
    accent-color: var(--c-brand);
  }

  .slider-range {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
  }

  .goals-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    width: 100%;
  }

  .goal-chip {
    padding: 10px 18px;
    border-radius: 24px;
    border: 1.5px solid var(--c-border);
    background: var(--c-surface);
    color: var(--c-text);
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;
    font-family: inherit;
    min-height: 44px;
  }

  .goal-chip.active {
    background: var(--c-brand);
    color: #fff;
    border-color: var(--c-brand);
  }

  @media (prefers-reduced-motion: reduce) {
    .goal-chip { transition: none; }
  }
</style>
