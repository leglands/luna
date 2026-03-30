<script>
  import Icon from './Icon.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  let {
    brand = 'luna',
    year = new Date().getFullYear(),
    month = new Date().getMonth(),
    days = [],
    onDayClick = () => {},
    onMonthChange = () => {},
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let currentYear = $state(year);
  let currentMonth = $state(month);

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const todayStr = $derived(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  );

  function getMonthData(y, m) {
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();

    const cells = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      cells.push(null);
    }

    for (let d = 1; d <= totalDays; d++) {
      cells.push(d);
    }

    const remaining = 42 - cells.length;
    for (let i = 0; i < remaining; i++) {
      cells.push(null);
    }

    return cells;
  }

  const monthData = $derived(getMonthData(currentYear, currentMonth));

  function prevMonth() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    onMonthChange?.({ year: currentYear, month: currentMonth });
  }

  function nextMonth() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    onMonthChange?.({ year: currentYear, month: currentMonth });
  }

  function getDayStatus(date) {
    if (!date) return null;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return days.find(d => d.date === dateStr);
  }

  function isToday(date) {
    if (!date) return false;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return dateStr === todayStr;
  }
</script>

<div class="stitch-calendar" style="--calendar-brand: {brandColor}">
  <header class="calendar-header">
    <button
      class="nav-btn"
      onclick={prevMonth}
      aria-label="Previous month"
    >
      <Icon name="chevron-left" size={20} />
    </button>

    <h2 class="month-title">
      {MONTH_NAMES[currentMonth]} {currentYear}
    </h2>

    <button
      class="nav-btn"
      onclick={nextMonth}
      aria-label="Next month"
    >
      <Icon name="chevron-right" size={20} />
    </button>
  </header>

  <div class="calendar-grid">
    <div class="weekday-headers">
      {#each WEEKDAYS as day}
        <span class="weekday">{day}</span>
      {/each}
    </div>

    <div class="days-grid">
      {#each monthData as date}
        {#if date === null}
          <div class="day-cell day-cell--empty"></div>
        {:else}
          {@const status = getDayStatus(date)}
          <button
            class="day-cell"
            class:day-cell--today={isToday(date)}
            class:day-cell--has-status={status}
            style={status?.color ? `--day-color: ${status.color}` : ''}
            onclick={() => onDayClick?.({ date, status })}
            aria-label="{date} {MONTH_NAMES[currentMonth]} {currentYear}{status?.label ? `, ${status.label}` : ''}"
          >
            <span class="day-number">{date}</span>
            {#if status?.label}
              <span class="day-label">{status.label}</span>
            {/if}
          </button>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .stitch-calendar {
    padding: var(--space-4);
    background: var(--c-surface);
    border-radius: var(--radius-lg);
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-4);
  }

  .month-title {
    font-size: var(--text-headline);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .nav-btn {
    background: transparent;
    border: none;
    color: var(--c-text-secondary);
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    transition: color var(--duration-fast), background var(--duration-fast);
  }

  .nav-btn:hover {
    color: var(--calendar-brand);
    background: var(--c-surface-container-low);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .weekday-headers {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-1);
  }

  .weekday {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    text-align: center;
    padding: var(--space-1);
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--space-1);
  }

  .day-cell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-family: var(--font-sans);
    padding: var(--space-1);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    transition:
      background var(--duration-fast),
      color var(--duration-fast);
    gap: 1px;
  }

  .day-cell:hover:not(.day-cell--empty) {
    background: var(--c-surface-container-low);
  }

  .day-cell:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .day-cell--empty {
    cursor: default;
  }

  .day-cell--today .day-number {
    background: var(--calendar-brand);
    color: #fff;
    border-radius: var(--radius-full);
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .day-cell--has-status {
    background: color-mix(in srgb, var(--day-color, var(--calendar-brand)) 12%, transparent);
  }

  .day-cell--has-status .day-number {
    font-weight: var(--weight-semibold);
    color: var(--day-color, var(--calendar-brand));
  }

  .day-number {
    font-size: var(--text-sm);
    color: var(--c-text);
    line-height: 1;
  }

  .day-label {
    font-size: 9px;
    color: var(--day-color, var(--calendar-brand));
    line-height: 1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .day-cell,
    .nav-btn {
      transition: none;
    }
  }
</style>
