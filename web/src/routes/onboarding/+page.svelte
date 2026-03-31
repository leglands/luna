<script>
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  const BRAND = '#E91E8C';
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

  function skip() { step++; }

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

<div class="onboarding" data-app="luna">
  <div class="dots">
    {#each Array(TOTAL) as _, i}
      <span class="dot" class:active={i === step}></span>
    {/each}
  </div>

  {#if step === 0}
    <!-- Slide 1: Welcome -->
    <div class="slide">
      <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill={BRAND} fill-opacity="0.12"/>
        <path d="M72 30 A34 34 0 1 0 72 90 A22 22 0 1 1 72 30Z"
              fill="none" stroke={BRAND} stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      <h1>Hi, I'm Luna</h1>
      <p>Your cycle, understood. Log in seconds, understand your body over time — privately, on your device.</p>
      <PebbleButton label="Get started" size="lg" onclick={next} style="--pebble-brand:{BRAND}" />
    </div>

  {:else if step === 1}
    <!-- Slide 2: Name (optional) -->
    <div class="slide">
      <h1>What should I call you?</h1>
      <p>Optional — only used to personalise your experience.</p>
      <input
        type="text"
        bind:value={firstName}
        placeholder="Your first name"
        class="input"
        autocomplete="given-name"
      />
      <PebbleButton label="Continue" size="lg" onclick={next} style="--pebble-brand:{BRAND}" />
      <button class="skip" onclick={skip}>Skip</button>
    </div>

  {:else if step === 2}
    <!-- Slide 3: Last period (required) -->
    <div class="slide">
      <h1>When did your last period start?</h1>
      <p>This helps Luna predict your next cycle right away.</p>
      <input
        type="date"
        bind:value={lastPeriodDate}
        class="input"
        max={new Date().toISOString().split('T')[0]}
      />
      <PebbleButton label="Continue" size="lg" onclick={next} disabled={!lastPeriodDate} style="--pebble-brand:{BRAND}" />
    </div>

  {:else if step === 3}
    <!-- Slide 4: Cycle profile -->
    <div class="slide">
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

      <PebbleButton label="Continue" size="lg" onclick={next} style="--pebble-brand:{BRAND}" />
    </div>

  {:else}
    <!-- Slide 5: Goals -->
    <div class="slide">
      <h1>What brings you to Luna?</h1>
      <p>Choose all that apply. You can change this anytime.</p>
      <div class="goals-grid">
        {#each GOALS as g}
          <button
            class="goal-chip"
            class:active={selectedGoals.has(g.id)}
            style={selectedGoals.has(g.id) ? `background:${BRAND};color:white;border-color:${BRAND}` : ''}
            onclick={() => toggleGoal(g.id)}
          >{g.label}</button>
        {/each}
      </div>
      <PebbleButton label="Start tracking" size="lg" onclick={complete} style="--pebble-brand:{BRAND}" />
      <button class="skip" onclick={complete}>Skip</button>
    </div>
  {/if}
</div>

<style>
  .onboarding {
    min-height: 100dvh;
    background: var(--c-bg, #fff);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px 40px;
    gap: var(--space-6);
    text-align: center;
    max-width: 780px;
    margin: 0 auto;
  }

  .dots {
    display: flex;
    gap: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
    transition: all 0.2s;
  }

  .dot.active {
    width: 24px;
    border-radius: 4px;
    background: #E91E8C;
  }

  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    width: 100%;
    max-width: 320px;
  }

  h1 {
    font-size: clamp(24px, 7vw, 32px);
    font-weight: 700;
    margin: 0;
    line-height: 1.2;
  }

  p {
    font-size: var(--text-base);
    color: #666;
    margin: 0;
    line-height: 1.5;
    max-width: 280px;
  }

  .input {
    width: 100%;
    padding: 14px 16px;
    border: 1.5px solid #ddd;
    border-radius: var(--radius-lg);
    font-size: 16px;
    box-sizing: border-box;
    background: var(--c-surface, #fafafa);
    color: var(--c-text, #111);
  }

  .skip {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 14px;
    margin-top: 4px;
    padding: 4px 8px;
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
    accent-color: #E91E8C;
  }

  .slider-range {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs);
    color: #aaa;
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
    border: 1.5px solid #ddd;
    background: white;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.15s;
  }

  @media (prefers-reduced-motion: reduce) {
    .dot,
    .goal-chip { transition: none; }
  }
</style>
