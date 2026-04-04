<script>
  import { goto } from '$app/navigation';
  import PebbleButton from '$ds/PebbleButton.svelte';
  import Icon from '$ds/Icon.svelte';

  // Symptoms: ACOG PMS criteria (Am J Obstet Gynecol 2000)
  const KEY = 'life-luna-data';
  const BRAND = 'luna';
  const todayISO = new Date().toISOString().slice(0, 10);
  const todayObj = new Date();
  const weekday = todayObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = todayObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  let date = todayISO;
  let periodStart = false;
  let flow = '';
  let symptoms = [];
  let mood = 0;
  let energy = 0;
  let notes = '';
  const ENERGY_LABELS = ['', 'Very low', 'Low', 'Neutral', 'Good', 'High'];

  const FLOW_OPTIONS = [
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'heavy', label: 'Heavy' },
    { value: 'spotting', label: 'Spotting' },
  ];
  const SYMPTOMS = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'headache', label: 'Headache' },
    { id: 'bloating', label: 'Bloating' },
    { id: 'mood_swings', label: 'Mood swings' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'tender_breasts', label: 'Tender breasts' },
    { id: 'acne', label: 'Acne' },
    { id: 'back_pain', label: 'Back pain' },
  ];
  const MOOD_COLORS = ['#D9D9D9', '#B0E0A8', '#A7D8F0', '#FFD580', '#FFB3B3'];

  function toggleSymptom(id) {
    symptoms = symptoms.includes(id) ? symptoms.filter(s => s !== id) : [...symptoms, id];
  }

  function save() {
    let data = JSON.parse(localStorage.getItem(KEY) || '{"entries":[]}');
    if (!data.entries) data.entries = [];
    // Remove existing entry for date
    data.entries = data.entries.filter(e => e.date !== date);
    data.entries.push({
      date,
      periodStart,
      flow: periodStart ? flow : '',
      symptoms,
      mood,
      energy,
      notes: notes.trim()
    });
    localStorage.setItem(KEY, JSON.stringify(data));
    goto('/');
  }
</script>

<div class="screen" data-app="luna">
  <header>
    <button class="back" aria-label="Back" onclick={() => goto('/')}><Icon name="arrow-left" size={22} color="var(--c-brand)" /></button>
    <h1 class="title">Log</h1>
  </header>

  <main class="content">
    <section class="date-section">
      <label class="section-label">Date</label>
      <input class="date-input" type="date" bind:value={date} max={todayISO} />
    </section>
    <section class="section">
      <button class="period-toggle" class:active={periodStart} onclick={() => periodStart = !periodStart}>
        Period started today
      </button>
    </section>
    {#if periodStart}
    <section class="section">
      <label class="section-label">Flow intensity</label>
      <div class="chip-row">
        {#each FLOW_OPTIONS as opt}
          <button class="chip" class:active={flow === opt.value} onclick={() => flow = opt.value}>{opt.label}</button>
        {/each}
      </div>
    </section>
    {/if}

    <section class="section">
      <label class="section-label">Mood</label>
      <div class="mood-row">
        {#each [1,2,3,4,5] as i}
          <button class="mood-dot" class:active={mood === i} style="background:{mood === i ? 'var(--c-brand)' : MOOD_COLORS[i-1]};" onclick={() => mood = mood === i ? 0 : i}></button>
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
            onclick={() => energy = energy === i ? 0 : i}
          >{i}</button>
        {/each}
      </div>
    </section>

    <section class="section">
      <label class="section-label">Symptoms</label>
      <div class="chip-row wrap">
        {#each SYMPTOMS as s}
          <button class="chip" class:active={symptoms.includes(s.id)} onclick={() => toggleSymptom(s.id)}>{s.label}</button>
        {/each}
      </div>
    </section>

    <section class="section">
      <label class="section-label">Notes</label>
      <textarea class="notes" bind:value={notes} rows="2" maxlength="200" placeholder="Add a note..."></textarea>
    </section>
    <div class="cta">
      <PebbleButton brand={BRAND} label="Save entry" onclick={save} />
    </div>
  </main>
</div>

<style>
  .screen {
    max-width: 390px;
    margin: 0 auto;
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
    padding: 24px 20px;
  }
  header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 12px;
  }
  .back {
    background: none;
    border: none;
    color: var(--c-brand);
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
  .title {
    font-size: 22px;
    font-weight: 700;
    margin: 0;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding-bottom: 40px;
  }
  .date-section {
    margin-bottom: 18px;
  }
  .date-input {
    width: 100%;
    height: 52px;
    border-radius: var(--radius-md, 16px);
    border: 1.5px solid var(--c-border);
    background: var(--c-surface-raised);
    color: var(--c-text);
    font-size: 16px;
    padding: 0 16px;
    font-family: inherit;
    box-sizing: border-box;
    cursor: pointer;
  }
  .date-input:focus { outline: 2px solid var(--c-brand); outline-offset: 2px; }
  .section {
    margin-bottom: 18px;
  }
  .section-label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--c-text-secondary);
    margin: 0 0 10px;
    display: block;
  }
  .period-toggle {
    width: 100%;
    height: 56px;
    border-radius: 9999px;
    border: 2px solid var(--c-brand);
    background: var(--c-surface-raised);
    color: var(--c-brand);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    margin-bottom: 0;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .period-toggle.active {
    background: var(--c-brand);
    color: #fff;
    border-color: var(--c-brand);
  }
  .chip-row {
    display: flex;
    gap: 8px;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 2px;
  }
  .chip-row.wrap {
    flex-wrap: wrap;
    overflow: visible;
  }
  .chip {
    border-radius: 9999px;
    padding: 8px 16px;
    min-height: 44px;
    border: 1.5px solid var(--c-brand);
    background: var(--c-surface-raised);
    color: var(--c-brand);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    margin-bottom: 6px;
  }
  .chip.active {
    background: var(--c-brand);
    color: #fff;
    border-color: var(--c-brand);
  }
  .mood-row {
    display: flex;
    gap: 16px;
    margin-top: 8px;
    margin-bottom: 0;
    justify-content: flex-start;
  }
  .mood-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--c-border);
    background: #D9D9D9;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    margin: 0;
    padding: 0;
  }
  .mood-dot.active {
    border-color: var(--c-brand);
    background: var(--c-brand);
  }
  .notes {
    width: 100%;
    min-height: 44px;
    border-radius: 12px;
    border: 1.5px solid var(--c-border);
    background: var(--c-surface-raised);
    color: var(--c-text);
    font-size: 15px;
    padding: 10px 12px;
    resize: none;
    margin-top: 0;
    margin-bottom: 0;
    font-family: inherit;
  }
  .cta {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
</style>
