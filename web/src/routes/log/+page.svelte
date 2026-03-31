<script>
  // Luna Log - LEAN: hero = today's date, log flow+symptoms+mood+energy+BBT
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  const BRAND = '#E91E8C';
  const KEY = 'life-luna-data';
  const today = new Date().toISOString().split('T')[0];
  const heroText = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  function loadToday() {
    const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    const log = d.log ?? {};
    const periodEntry = (log.period ?? []).find(e => e.date === today);
    const moodEntry = (log.mood ?? []).find(e => e.date === today);
    const energyEntry = (log.energy ?? []).find(e => e.date === today);
    const sympEntry = (log.symptoms ?? []).find(e => e.date === today);
    const tempEntry = (log.temperature ?? []).find(e => e.date === today);
    return {
      flow: periodEntry?.flow ?? 'none',
      mood: moodEntry?.score ?? 0,
      energy: energyEntry?.score ?? 0,
      symptoms: sympEntry?.items ?? [],
      temperature: tempEntry?.value ?? ''
    };
  }

  let existing = loadToday();
  let flow = $state(existing.flow);
  let mood = $state(existing.mood);
  let energy = $state(existing.energy);
  let selectedSymptoms = $state(new Set(existing.symptoms));
  let temperature = $state(existing.temperature);
  let showAdvanced = $state(false);

  const FLOW_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'spotting', label: 'Spotting' },
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'heavy', label: 'Heavy' },
  ];

  const MOOD_LABELS = ['', 'Difficult', 'Low', 'Okay', 'Good', 'Great'];
  const ENERGY_LABELS = ['', 'Exhausted', 'Tired', 'Normal', 'Energized', 'Amazing'];

  const QUICK_SYMPTOMS = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'bloating', label: 'Bloating' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'headache', label: 'Headache' },
    { id: 'breast_tenderness', label: 'Breast tenderness' },
    { id: 'irritability', label: 'Irritability' },
    { id: 'low_mood', label: 'Low mood' },
    { id: 'high_energy', label: 'High energy' },
    { id: 'nausea', label: 'Nausea' },
    { id: 'lower_back_pain', label: 'Back pain' },
  ];

  const ADVANCED_SYMPTOMS = [
    { id: 'acne', label: 'Acne' },
    { id: 'insomnia', label: 'Insomnia' },
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'cravings', label: 'Cravings' },
    { id: 'hot_flash', label: 'Hot flash' },
    { id: 'migraine', label: 'Migraine' },
  ];

  function toggleSymptom(id) {
    const s = new Set(selectedSymptoms);
    if (s.has(id)) s.delete(id); else s.add(id);
    selectedSymptoms = s;
  }

  function save() {
    const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    if (!d.log) d.log = {};

    if (!d.log.period) d.log.period = [];
    d.log.period = d.log.period.filter(e => e.date !== today);
    if (flow !== 'none') {
      d.log.period.push({ date: today, flow });
      if (!d.settings) d.settings = {};
      d.settings.lastPeriodDate = today;
    }

    if (!d.log.mood) d.log.mood = [];
    d.log.mood = d.log.mood.filter(e => e.date !== today);
    if (mood > 0) d.log.mood.push({ date: today, score: mood, label: MOOD_LABELS[mood].toLowerCase() });

    if (!d.log.energy) d.log.energy = [];
    d.log.energy = d.log.energy.filter(e => e.date !== today);
    if (energy > 0) d.log.energy.push({ date: today, score: energy });

    if (!d.log.symptoms) d.log.symptoms = [];
    d.log.symptoms = d.log.symptoms.filter(e => e.date !== today);
    if (selectedSymptoms.size > 0) d.log.symptoms.push({ date: today, items: [...selectedSymptoms] });

    if (!d.log.temperature) d.log.temperature = [];
    d.log.temperature = d.log.temperature.filter(e => e.date !== today);
    if (temperature) d.log.temperature.push({ date: today, value: parseFloat(temperature), time: new Date().toTimeString().slice(0,5) });

    localStorage.setItem(KEY, JSON.stringify(d));
    goto('/');
  }
</script>

<div class="screen" data-app="luna">
  <header>
    <button class="back" onclick={() => goto('/')}>Back</button>
    <h1 class="title">Log today</h1>
  </header>

  <main class="content">
    <p class="hero-date" style="color:{BRAND}">{heroText}</p>

    <section class="section">
      <p class="section-label">Period flow</p>
      <div class="chip-row">
        {#each FLOW_OPTIONS as opt}
          <button
            class="chip"
            class:active={flow === opt.value}
            style={flow === opt.value ? `background:${BRAND};color:white;border-color:${BRAND}` : ''}
            onclick={() => flow = opt.value}
          >{opt.label}</button>
        {/each}
      </div>
    </section>

    <section class="section">
      <p class="section-label">Mood {mood > 0 ? '— ' + MOOD_LABELS[mood] : ''}</p>
      <div class="scale-row">
        {#each [1,2,3,4,5] as i}
          <button
            class="scale-btn"
            class:active={mood === i}
            style={mood === i ? `background:${BRAND};color:white` : ''}
            onclick={() => mood = mood === i ? 0 : i}
          >{i}</button>
        {/each}
      </div>
    </section>

    <section class="section">
      <p class="section-label">Energy {energy > 0 ? '— ' + ENERGY_LABELS[energy] : ''}</p>
      <div class="scale-row">
        {#each [1,2,3,4,5] as i}
          <button
            class="scale-btn"
            class:active={energy === i}
            style={energy === i ? `background:${BRAND};color:white` : ''}
            onclick={() => energy = energy === i ? 0 : i}
          >{i}</button>
        {/each}
      </div>
    </section>

    <section class="section">
      <p class="section-label">Symptoms</p>
      <div class="chip-row wrap">
        {#each QUICK_SYMPTOMS as s}
          <button
            class="chip"
            class:active={selectedSymptoms.has(s.id)}
            style={selectedSymptoms.has(s.id) ? `background:${BRAND};color:white;border-color:${BRAND}` : ''}
            onclick={() => toggleSymptom(s.id)}
          >{s.label}</button>
        {/each}
      </div>
      {#if showAdvanced}
        <div class="chip-row wrap" style="margin-top:8px">
          {#each ADVANCED_SYMPTOMS as s}
            <button
              class="chip"
              class:active={selectedSymptoms.has(s.id)}
              style={selectedSymptoms.has(s.id) ? `background:${BRAND};color:white;border-color:${BRAND}` : ''}
              onclick={() => toggleSymptom(s.id)}
            >{s.label}</button>
          {/each}
        </div>
      {/if}
      <button class="more-btn" onclick={() => showAdvanced = !showAdvanced}>
        {showAdvanced ? 'Show less' : 'More symptoms'}
      </button>
    </section>

    <section class="section">
      <p class="section-label">Temperature (BBT) — optional</p>
      <div class="temp-row">
        <input
          type="number"
          bind:value={temperature}
          placeholder="36.7"
          step="0.1"
          min="35"
          max="42"
          class="temp-input"
        />
        <span class="temp-unit">°C</span>
      </div>
      <p class="temp-hint">Take before getting up, at the same time each day</p>
    </section>

    <div class="cta">
      <PebbleButton label="Save" onclick={save} style="--pebble-brand:{BRAND}" />
    </div>
  </main>
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg, #fff); color: var(--c-text, #111); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  header { display: flex; align-items: center; gap: 12px; padding: var(--space-4); border-bottom: 1px solid #f0f0f0; }
  .back { background: none; border: none; color: #E91E8C; cursor: pointer; font-size: var(--text-base); padding: 0; }
  .title { font-size: var(--text-lg); font-weight: 600; margin: 0; }
  .content { flex: 1; padding: var(--space-4); display: flex; flex-direction: column; gap: 0; padding-bottom: 40px; }
  .hero-date { font-size: clamp(36px, 10vw, 52px); font-weight: 700; text-align: center; margin: 8px 0 20px; }
  .section { margin-bottom: 24px; }
  .section-label { font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0 0 10px; }
  .chip-row { display: flex; gap: var(--space-2); flex-wrap: nowrap; overflow-x: auto; padding-bottom: 2px; }
  .chip-row.wrap { flex-wrap: wrap; overflow: visible; }
  .chip { padding: 7px 14px; border-radius: 20px; border: 1.5px solid #ddd; background: white; cursor: pointer; font-size: 14px; white-space: nowrap; transition: all 0.15s; }
  .scale-row { display: flex; gap: var(--space-2); }
  .scale-btn { width: 52px; height: 52px; border-radius: var(--radius-md); border: 1.5px solid #ddd; background: white; cursor: pointer; font-size: 18px; font-weight: 600; transition: all 0.15s; }
  .more-btn { background: none; border: none; color: #E91E8C; cursor: pointer; font-size: var(--text-sm); margin-top: 8px; padding: 0; }
  .temp-row { display: flex; align-items: center; gap: var(--space-2); }
  .temp-input { width: 100px; padding: 10px 12px; border: 1.5px solid #ddd; border-radius: var(--radius-md); font-size: 16px; }
  .temp-unit { font-size: 16px; color: #666; }
  .temp-hint { font-size: var(--text-xs); color: #aaa; margin: 6px 0 0; }
  .cta { margin-top: 16px; display: flex; justify-content: center; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
