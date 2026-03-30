<script>
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  const today = new Date();
  const heroText = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const dateStr = today.toISOString().split('T')[0];

  let mood = $state('');
  let periodToday = $state(false);

  function save() {
    const raw = localStorage.getItem('life-luna-data');
    const d = raw ? JSON.parse(raw) : { settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null }, log: { period: [], mood: [] } };
    if (!d.log) d.log = {};
    if (mood) {
      if (!d.log.mood) d.log.mood = [];
      d.log.mood = d.log.mood.filter(e => e.date !== dateStr);
      d.log.mood.push({ date: dateStr, mood });
    }
    if (periodToday) {
      if (!d.log.period) d.log.period = [];
      d.log.period = d.log.period.filter(e => e.date !== dateStr);
      d.log.period.push({ date: dateStr, flow: 1 });
      if (!d.settings) d.settings = {};
      d.settings.lastPeriodDate = dateStr;
    }
    localStorage.setItem('life-luna-data', JSON.stringify(d));
    goto('/');
  }
</script>

<div class="screen" data-app="luna">
  <header>
    <button class="back" onclick={() => goto('/')}>Back</button>
  </header>
  <main class="hero">
    <div class="hero-display">
      <span class="hero-value">{heroText}</span>
      <span class="hero-label">How do you feel?</span>
    </div>
    <div class="chips">
      {#each ['Good','Okay','Hard'] as m}
        <button class="chip" class:active={mood === m.toLowerCase()} onclick={() => mood = m.toLowerCase()}>{m}</button>
      {/each}
    </div>
    <label class="toggle-row">
      <span>Period today</span>
      <input type="checkbox" bind:checked={periodToday} />
    </label>
    <PebbleButton label="Save" size="lg" onclick={save} />
  </main>
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; }
  header { padding: var(--space-4); }
  .back { background: none; border: none; color: var(--c-brand); font-size: var(--text-base); cursor: pointer; padding: 0; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-5); text-align: center; }
  .hero-display { display: flex; flex-direction: column; align-items: center; }
  .hero-value { font-size: 96px; font-weight: var(--weight-bold); line-height: 1; letter-spacing: -0.02em; color: var(--c-brand); }
  .hero-label { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-top: var(--space-2); }
  .chips { display: flex; gap: var(--space-3); }
  .chip { padding: var(--space-2) var(--space-4); border-radius: 999px; border: 1.5px solid var(--c-border); background: transparent; color: var(--c-text); font-size: var(--text-sm); cursor: pointer; transition: background 180ms, border-color 180ms; }
  .chip.active { background: var(--c-brand); border-color: var(--c-brand); color: #fff; }
  .toggle-row { display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-base); cursor: pointer; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
