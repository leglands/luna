<script>
  import { StitchCalendar, Icon, PrivacyBadge } from '$ds/index.js';
  import { loadData, getCalendarDays } from '$lib/cycle-engine.js';

  let data = $state(null);
  let calendarDate = $state(new Date());

  $effect(() => {
    data = loadData();
  });

  function prevMonth() {
    const d = new Date(calendarDate);
    d.setMonth(d.getMonth() - 1);
    calendarDate = d;
  }

  function nextMonth() {
    const d = new Date(calendarDate);
    d.setMonth(d.getMonth() + 1);
    calendarDate = d;
  }

  const calendarDays = $derived(
    getCalendarDays(calendarDate.getFullYear(), calendarDate.getMonth())
  );

  function getDayStatus(day) {
    if (!data?.log?.period) return {};
    const hasPeriod = data.log.period.some(p => p.date === day.dateStr);
    const hasSymptom = data.log.symptoms?.some(s => s.date === day.dateStr);
    return {
      hasPeriod,
      hasSymptom,
      dot: hasPeriod ? '#D4678A' : hasSymptom ? '#E5A855' : null
    };
  }

  const monthLabel = $derived(
    calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );
</script>

<div class="page" data-testid="history-page">
  <header class="page-header">
    <button class="back-btn" onclick={() => window.history.back()} aria-label="Back">
      <Icon name="arrow-left" size={20} />
    </button>
    <h1>History</h1>
    <PrivacyBadge />
  </header>

  <main class="page-content">
    <div class="month-nav" data-testid="month-nav">
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
      onDayClick={(day) => console.log('Day clicked:', day)}
    />

    <div class="legend" data-testid="calendar-legend">
      <div class="legend-item">
        <span class="legend-dot" style="background: #D4678A"></span>
        <span>Period</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background: #E5A855"></span>
        <span>Symptoms logged</span>
      </div>
    </div>
  </main>
</div>

<style>
  .page { max-width: 430px; margin: 0 auto; padding: var(--space-4); min-height: 100dvh; }
  .page-header { display: flex; align-items: center; gap: var(--space-3); padding-bottom: var(--space-4); }
  .back-btn { background: none; border: none; cursor: pointer; color: var(--c-text); min-width: var(--tap-target); min-height: var(--tap-target); display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); }
  .back-btn:hover { background: var(--c-surface-raised); }
  h1 { font-size: var(--text-xl); font-weight: var(--weight-bold); color: var(--c-text); flex: 1; margin: 0; }
  .page-content { display: flex; flex-direction: column; gap: var(--space-4); }
  .month-nav { display: flex; align-items: center; justify-content: space-between; padding: var(--space-2) 0; }
  .nav-btn { background: none; border: none; cursor: pointer; color: var(--c-text); min-width: var(--tap-target); min-height: var(--tap-target); display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); }
  .nav-btn:hover { background: var(--c-surface-raised); }
  .month-label { font-size: var(--text-base); font-weight: var(--weight-semibold); color: var(--c-text); }
  .legend { display: flex; gap: var(--space-4); padding: var(--space-2) 0; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-sm); color: var(--c-text-secondary); }
  .legend-dot { width: 10px; height: 10px; border-radius: var(--radius-full); display: inline-block; flex-shrink: 0; }
</style>