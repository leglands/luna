<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Icon, StitchCalendar } from '$ds/index.js';
  import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';
  import { loadData, getCalendarDays } from '$lib/cycle-engine.js';

  let data = $state({ log: { period: [], symptoms: [] } });
  let calendarDate = $state(new Date());
  let selectedDay = $state(null);
  let sheetOpen = $state(false);

  onMount(() => {
    data = loadData();
  });

  function prevMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  }

  function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  }

  const calendarDays = $derived(getCalendarDays(calendarDate.getFullYear(), calendarDate.getMonth()));

  const monthLabel = $derived(calendarDate.toLocaleDateString('en', { month: 'long', year: 'numeric' }));

  function getDayStatus(day) {
    if (!day.currentMonth) return {};
    const periodEntry = data.log.period?.find(p => p.date === day.date);
    if (periodEntry) {
      return { color: '#E57373', label: periodEntry.flow };
    }
    return {};
  }

  function handleDayClick(day) {
    if (!day.currentMonth) return;
    selectedDay = day;
    sheetOpen = true;
  }

  function closeSheet() {
    sheetOpen = false;
    selectedDay = null;
  }

  function getDayEntries(dateStr) {
    const period = data.log.period?.find(p => p.date === dateStr);
    const symptoms = data.log.symptoms?.find(s => s.date === dateStr);
    return { period, symptoms };
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });
  }
</script>

<div class="history-page" data-app="luna">
  <header class="page-header">
    <button class="back-btn" onclick={() => goto('/')} aria-label="Back">
      <Icon name="chevron-left" size={20} />
    </button>
    <h1>History</h1>
  </header>

  <main class="page-content">
    <div class="month-nav">
      <button class="nav-btn" onclick={prevMonth} aria-label="Previous month">
        <Icon name="chevron-left" size={20} />
      </button>
      <span class="month-label">{monthLabel}</span>
      <button class="nav-btn" onclick={nextMonth} aria-label="Next month">
        <Icon name="chevron-right" size={20} />
      </button>
    </div>

    <StitchCalendar
      brand="luna"
      year={calendarDate.getFullYear()}
      month={calendarDate.getMonth()}
      days={calendarDays.map(d => ({ ...d, ...getDayStatus(d) }))}
      onDayClick={handleDayClick}
    />

    <div class="legend">
      <div class="legend-item">
        <span class="legend-dot" style="background: #E57373"></span>
        <span>Period</span>
      </div>
    </div>
  </main>
</div>

{#if sheetOpen && selectedDay}
  <div class="sheet-overlay" onclick={closeSheet}>
    <div class="bottom-sheet" onclick={(e) => e.stopPropagation()}>
      <header class="sheet-header">
        <h2>{formatDate(selectedDay.date)}</h2>
        <button class="close-btn" onclick={closeSheet}>
          <Icon name="x" size={20} />
        </button>
      </header>
      <div class="sheet-content">
        {#if selectedDay.color}
          <div class="entry-row">
            <Icon name="droplets" size={18} />
            <span>Period: {selectedDay.label}</span>
          </div>
        {:else}
          <p class="no-data">No entries for this day</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .history-page {
    min-height: 100dvh;
    background: var(--c-bg);
    color: var(--c-text);
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--c-surface);
    border-bottom: 1px solid var(--c-border);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky, 100);
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    border-radius: var(--radius-md);
  }

  .back-btn:hover {
    background: var(--c-surface-container);
  }

  h1 {
    flex: 1;
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .page-content {
    padding: var(--space-4);
    max-width: 480px;
    margin: 0 auto;
  }

  .month-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-2) 0;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    border-radius: var(--radius-md);
  }

  .nav-btn:hover {
    background: var(--c-surface-container);
  }

  .month-label {
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
  }

  .legend {
    display: flex;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    justify-content: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: var(--radius-full);
  }

  .sheet-overlay {
    position: fixed;
    inset: 0;
    background: var(--c-overlay);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: var(--z-modal);
    padding: var(--space-4);
  }

  .bottom-sheet {
    background: var(--c-surface);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: var(--space-6);
    width: 100%;
    max-width: 480px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .sheet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .sheet-header h2 {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text-secondary);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    border-radius: var(--radius-md);
  }

  .close-btn:hover {
    background: var(--c-surface-container);
  }

  .sheet-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .entry-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background: var(--c-surface-container);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
  }

  .no-data {
    text-align: center;
    color: var(--c-text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-4);
  }
</style>
