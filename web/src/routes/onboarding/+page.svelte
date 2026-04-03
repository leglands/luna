<script>
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  const today = new Date().toISOString().split('T')[0];
  let lastPeriodDate = $state('');
  let cycleLength    = $state(28);
  let periodLength   = $state(5);

  function complete() {
    const data = {
      settings: {
        lastPeriodDate: lastPeriodDate || null,
        cycleLength:    Number(cycleLength),
        periodLength:   Number(periodLength),
      },
      log: { period: [], symptoms: [], temperature: [], mood: [], energy: [] },
    };
    localStorage.setItem('life-luna-data', JSON.stringify(data));
    localStorage.setItem('life-luna-onboarded', '1');
    goto('/');
  }

  function skip() {
    localStorage.setItem('life-luna-onboarded', '1');
    goto('/');
  }
</script>

<div class="screen" data-app="luna">
  <div class="ob-page">

    <div class="ob-header">
      <svg viewBox="0 0 80 80" width="56" height="56" aria-hidden="true">
        <path d="M50 14 A28 28 0 1 0 50 66 A18 18 0 1 1 50 14Z"
              fill="none" stroke="var(--c-brand)" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h1 class="ob-title">Welcome to Luna</h1>
      <p class="ob-sub">Your cycle, on your device. Private by design.</p>
    </div>

    <div class="ob-form">

      <div class="field">
        <label class="field-label" for="last-period">
          Last period start
          <span class="field-hint">Optional</span>
        </label>
        <input
          id="last-period"
          type="date"
          bind:value={lastPeriodDate}
          max={today}
          class="ob-input"
        />
      </div>

      <div class="field">
        <label class="field-label" for="cycle-len">
          Cycle length
          <span class="field-value">{cycleLength} days</span>
        </label>
        <input
          id="cycle-len"
          type="range"
          bind:value={cycleLength}
          min="21" max="45" step="1"
          class="slider"
          aria-valuenow={cycleLength}
          aria-valuemin="21"
          aria-valuemax="45"
        />
        <div class="slider-range"><span>21</span><span>45</span></div>
      </div>

      <div class="field">
        <label class="field-label" for="period-len">
          Period length
          <span class="field-value">{periodLength} days</span>
        </label>
        <input
          id="period-len"
          type="range"
          bind:value={periodLength}
          min="2" max="8" step="1"
          class="slider"
          aria-valuenow={periodLength}
          aria-valuemin="2"
          aria-valuemax="8"
        />
        <div class="slider-range"><span>2</span><span>8</span></div>
      </div>

    </div>

    <div class="ob-actions">
      <PebbleButton label="Start tracking" onclick={complete} />
      <button class="skip-btn" onclick={skip}>Skip for now</button>
    </div>

  </div>
</div>

<style>
  .screen {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    justify-content: center;
  }

  .ob-page {
    width: 100%;
    max-width: 390px;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    padding: 52px 24px 32px;
    box-sizing: border-box;
    gap: 32px;
  }

  .ob-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  .ob-title {
    font-size: clamp(26px, 7vw, 32px);
    font-weight: 700;
    margin: 0;
    line-height: 1.15;
  }

  .ob-sub {
    font-size: var(--text-base, 15px);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  .ob-form {
    display: flex;
    flex-direction: column;
    gap: 28px;
    flex: 1;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .field-label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-size: var(--text-base, 15px);
    font-weight: 600;
    color: var(--c-text);
    gap: 8px;
  }

  .field-hint {
    font-size: var(--text-xs, 11px);
    font-weight: 400;
    color: var(--c-text-secondary);
  }

  .field-value {
    font-size: var(--text-sm, 13px);
    font-weight: 700;
    color: var(--c-brand);
  }

  .ob-input {
    width: 100%;
    padding: 14px 16px;
    border: 1.5px solid var(--c-border);
    border-radius: var(--radius-lg, 24px);
    font-size: 16px;
    box-sizing: border-box;
    background: var(--c-surface);
    color: var(--c-text);
    font-family: inherit;
    min-height: 44px;
  }

  .ob-input:focus {
    outline: 2px solid var(--c-brand);
    outline-offset: 2px;
    border-color: transparent;
  }

  .slider {
    width: 100%;
    accent-color: var(--c-brand);
    height: 44px;
    cursor: pointer;
  }

  .slider-range {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-xs, 11px);
    color: var(--c-text-secondary);
    margin-top: -6px;
  }

  .ob-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .skip-btn {
    background: none;
    border: none;
    color: var(--c-text-secondary);
    font-size: var(--text-sm, 13px);
    cursor: pointer;
    font-family: inherit;
    min-height: 44px;
    padding: 8px 16px;
    border-radius: var(--radius-md, 16px);
  }

  .skip-btn:hover { color: var(--c-text); }
  .skip-btn:focus-visible { outline: 2px solid var(--c-brand); outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; }
  }
</style>
