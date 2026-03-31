<script>
  // Luna Export - LEAN: hero = data points, CTA = download CSV
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  const BRAND = '#E91E8C';
  const KEY = 'life-luna-data';

  let periodCount = $state(0);
  let symptomDays = $state(0);
  let tempDays = $state(0);

  onMount(() => {
    const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    periodCount = (d.log?.period ?? []).length;
    symptomDays = (d.log?.symptoms ?? []).length;
    tempDays = (d.log?.temperature ?? []).length;
  });

  function exportCSV() {
    const d = JSON.parse(localStorage.getItem(KEY) ?? '{}');
    const rows = [['Date', 'Flow', 'Mood', 'Energy', 'Symptoms', 'Temperature_C']];

    const allDates = new Set([
      ...(d.log?.period ?? []).map(e => e.date),
      ...(d.log?.mood ?? []).map(e => e.date),
      ...(d.log?.energy ?? []).map(e => e.date),
      ...(d.log?.symptoms ?? []).map(e => e.date),
      ...(d.log?.temperature ?? []).map(e => e.date),
    ]);

    const sorted = [...allDates].sort();
    for (const date of sorted) {
      const flow = (d.log?.period ?? []).find(e => e.date === date)?.flow ?? '';
      const mood = (d.log?.mood ?? []).find(e => e.date === date)?.score ?? '';
      const energy = (d.log?.energy ?? []).find(e => e.date === date)?.score ?? '';
      const symptoms = ((d.log?.symptoms ?? []).find(e => e.date === date)?.items ?? []).join('; ');
      const temp = (d.log?.temperature ?? []).find(e => e.date === date)?.value ?? '';
      rows.push([date, flow, mood, energy, symptoms, temp]);
    }

    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'luna-cycle-data-' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<div class="screen" data-app="luna">
  <header>
    <button class="back" onclick={() => goto('/settings')}>Back</button>
    <h1 class="title">Export data</h1>
  </header>

  <main class="hero">
    <p class="hero-val" style="color:{BRAND}">{periodCount}</p>
    <p class="hero-lbl">Period entries</p>
    <p class="status">{symptomDays} symptom days · {tempDays} temp readings</p>

    <div class="info">
      <p class="info-text">Export your cycle data as CSV to share with your gynecologist or import into another app.</p>
      <div class="privacy-note">
        <p>Data never leaves your device. Export is generated locally.</p>
      </div>
    </div>

    <PebbleButton label="Download CSV" onclick={exportCSV} style="--pebble-brand:{BRAND}" />
    <button class="cancel" onclick={() => goto('/settings')}>Cancel</button>
  </main>
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg, #fff); color: var(--c-text, #111); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  header { display: flex; align-items: center; gap: 12px; padding: var(--space-4); border-bottom: 1px solid #f0f0f0; }
  .back { background: none; border: none; color: #E91E8C; cursor: pointer; font-size: var(--text-base); padding: 0; }
  .title { font-size: var(--text-lg); font-weight: 600; margin: 0; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; gap: var(--space-2); text-align: center; }
  .hero-val { font-size: clamp(52px,14vw,96px); font-weight: 700; line-height: 1; margin: 0; }
  .hero-lbl { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin: 0; }
  .status { font-size: var(--text-base); color: #666; margin: 0 0 24px; }
  .info { max-width: 320px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
  .info-text { font-size: var(--text-base); line-height: 1.5; color: #444; margin: 0; }
  .privacy-note { background: #F1F8E9; border-radius: var(--radius-md); padding: 12px 14px; }
  .privacy-note p { font-size: var(--text-sm); color: #555; margin: 0; }
  .cancel { background: none; border: none; color: #888; cursor: pointer; font-size: 14px; margin-top: 8px; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
