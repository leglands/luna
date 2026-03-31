<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { PebbleButton } from '$ds/index.js';

  let heroValue = $state('0');
  let statusLine = $state('Start logging to see history');
  let cycles = $state([]);

  onMount(() => {
    const raw = localStorage.getItem('life-luna-data');
    if (!raw) return;
    const d = JSON.parse(raw);
    const periods = (d.log?.period ?? []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    heroValue = String(periods.length);
    if (periods.length > 0) {
      const earliest = new Date(periods[0].date);
      statusLine = `Since ${earliest.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
    }
    cycles = periods.map((p, i) => {
      if (i === 0) return null;
      const len = Math.round((new Date(p.date) - new Date(periods[i-1].date)) / 86400000);
      const label = new Date(p.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
      return { label, len };
    }).filter(Boolean).reverse();
  });
</script>

<div class="screen" data-app="luna">
  <header>
    <button class="back" onclick={() => goto('/insights')}>Back</button>
  </header>
  <main class="hero">
    <div class="hero-display">
      <span class="hero-value">{heroValue}</span>
      <span class="hero-label">Cycles tracked</span>
    </div>
    <p class="status">{statusLine}</p>
    {#if cycles.length === 0}
      <PebbleButton label="Log today" size="lg" onclick={() => goto('/log')} />
    {:else}
      <ul class="list">
        {#each cycles as c}
          <li class="row">
            <span class="row-label">{c.label}</span>
            <span class="row-value">{c.len} days</span>
          </li>
        {/each}
      </ul>
    {/if}
  </main>
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  header { padding: var(--space-4); }
  .back { background: none; border: none; color: var(--c-brand); font-size: var(--text-base); cursor: pointer; padding: 0; }
  .hero { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-5); text-align: center; }
  .hero-display { display: flex; flex-direction: column; align-items: center; }
  .hero-value { font-size: clamp(52px, 14vw, 96px); font-weight: var(--weight-bold); line-height: 1; letter-spacing: -0.02em; color: var(--c-brand); }
  .hero-label { font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; margin-top: var(--space-2); }
  .status { font-size: var(--text-xl); font-weight: var(--weight-semibold); margin: 0; }
  .list { list-style: none; margin: 0; padding: 0; max-height: 40vh; overflow-y: auto; width: 100%; max-width: 320px; text-align: left; }
  .row { display: flex; justify-content: space-between; padding: var(--space-3) 0; border-bottom: 1px solid var(--c-border); font-size: var(--text-sm); }
  .row-value { color: var(--c-brand); font-weight: var(--weight-semibold); }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
