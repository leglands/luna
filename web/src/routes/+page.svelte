<script>
  import { _, locale, locales } from 'svelte-i18n';
  import CycleRing from '$lib/components/CycleRing.svelte';
  import LogSymptoms from '$lib/components/LogSymptoms.svelte';
  import LogTemperature from '$lib/components/LogTemperature.svelte';
  import EmpathyBanner from '$ds/EmpathyBanner.svelte';
  import CrossPromoCard from '$ds/CrossPromoCard.svelte';
  import PrivacyBadge from '$ds/PrivacyBadge.svelte';
  import MedicalDisclaimer from '$ds/MedicalDisclaimer.svelte';
  import PebbleButton from '$ds/PebbleButton.svelte';
  import PebbleAction from '$ds/PebbleAction.svelte';
  import TabBar from '$ds/TabBar.svelte';
  import Icon from '$ds/Icon.svelte';
  import {
    Calendar,
    BarChart3,
    Settings,
    Droplets,
    Thermometer,
    Brain,
    Heart
  } from 'lucide-svelte';

  import {
    loadData,
    updateSettings,
    logEntry,
    getCurrentPhase,
    getPhaseColor,
    getCalendarDays,
    getAverageCycleLength,
    getAveragePeriodLength
  } from '$lib/cycle-engine.js';

  import { onMount } from 'svelte';

  let data = $state({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null }, log: { period: [], symptoms: [], temperature: [], mood: [] } });
  let activeTab = $state('today');
  let showSettings = $state(false);
  let showLogModal = $state(null);
  let cycleInfo = $state({ phase: 'follicular', dayOfPhase: 1, dayOfCycle: 1, daysUntilNextPeriod: 14 });
  let calendarDate = $state(new Date());

  let tempSetting = $state({ cycleLength: 28, periodLength: 5, lastPeriodDate: '' });

  onMount(() => {
    data = loadData();
    updateCycleInfo();
  });

  function updateCycleInfo() {
    cycleInfo = getCurrentPhase(
      data.settings.lastPeriodDate,
      data.settings.cycleLength
    );
  }

  function handleLogPeriod() {
    logEntry('period', { date: new Date().toISOString().split('T')[0], flow: data.settings.periodLength });
    data = loadData();
    updateCycleInfo();
    showLogModal = null;
  }

  function handleLogSymptoms(entry) {
    logEntry('symptoms', entry);
    data = loadData();
    showLogModal = null;
  }

  function handleLogTemperature(entry) {
    logEntry('temperature', entry);
    data = loadData();
    showLogModal = null;
  }

  function handleSaveSettings() {
    updateSettings({
      cycleLength: parseInt(tempSetting.cycleLength),
      periodLength: parseInt(tempSetting.periodLength),
      lastPeriodDate: tempSetting.lastPeriodDate || null
    });
    data = loadData();
    updateCycleInfo();
    showSettings = false;
  }

  function openSettings() {
    tempSetting = {
      cycleLength: data.settings.cycleLength,
      periodLength: data.settings.periodLength,
      lastPeriodDate: data.settings.lastPeriodDate || ''
    };
    showSettings = true;
  }

  $effect(() => {
    if (data.settings.lastPeriodDate) {
      updateCycleInfo();
    }
  });

  const calendarDays = $derived(getCalendarDays(calendarDate.getFullYear(), calendarDate.getMonth()));
  const monthName = $derived(calendarDate.toLocaleString('en', { month: 'long', year: 'numeric' }));

  function prevMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  }

  function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  }

  const phaseMessage = $derived($_('messages.' + cycleInfo.phase));
  const phaseName = $derived($_('phases.' + cycleInfo.phase));
  const phaseColor = $derived(getPhaseColor(cycleInfo.phase));

  const avgCycle = $derived(getAverageCycleLength(data.log));
  const avgPeriod = $derived(getAveragePeriodLength(data.log));
</script>

<div class="app">
  <header>
    <h1>Luna</h1>
    <button class="icon-btn" onclick={openSettings}>
      <Icon name="settings" size={20} />
    </button>
  </header>

  <main>
    {#if !data.settings.lastPeriodDate}
      <div class="onboarding">
        <EmpathyBanner
          message={$_('app.tagline')}
          brand="luna"
        />
        <div class="setup-form">
          <label>
            <span>{$_('settings.lastPeriod')}</span>
            <input type="date" bind:value={tempSetting.lastPeriodDate} />
          </label>
          <label>
            <span>{$_('settings.cycleLength')}</span>
            <input type="number" min="21" max="35" bind:value={tempSetting.cycleLength} />
          </label>
          <PebbleButton variant="primary" size="lg" onclick={handleSaveSettings}>
            {$_('settings.save')}
          </PebbleButton>
        </div>
      </div>
    {:else}
      {#if activeTab === 'today'}
        <div class="today-view">
          <div class="ring-container">
            <CycleRing
              segments={28}
              currentSegment={cycleInfo.dayOfPhase}
              phase={cycleInfo.phase}
              centerText={cycleInfo.dayOfCycle.toString()}
              centerSubtext={$_('cycle.ofCycle')}
            />
          </div>

          <EmpathyBanner message={phaseMessage} brand="luna" />

          <div class="phase-info">
            <span class="phase-badge" style="background: {phaseColor}">{phaseName}</span>
            <span class="day-counter">{$_('cycle.day', { values: { day: cycleInfo.dayOfPhase } })}</span>
          </div>

          {#if cycleInfo.daysUntilNextPeriod > 0}
            <p class="next-period">{$_('cycle.periodExpected', { values: { days: cycleInfo.daysUntilNextPeriod } })}</p>
          {/if}

          <div class="quick-actions">
            <PebbleAction
              icon="droplets"
              label={$_('logging.period')}
              brand="luna"
              onclick={() => showLogModal = 'period'}
            />
            <PebbleAction
              icon="heart"
              label={$_('logging.symptoms')}
              brand="luna"
              onclick={() => showLogModal = 'symptoms'}
            />
            <PebbleAction
              icon="thermometer"
              label={$_('logging.temperature')}
              brand="luna"
              onclick={() => showLogModal = 'temperature'}
            />
            <PebbleAction
              icon="brain"
              label={$_('logging.mood')}
              brand="luna"
              onclick={() => showLogModal = 'mood'}
            />
          </div>

          <div class="promo-section">
            <CrossPromoCard
              targetApp="aura"
              title={$_('promo.ttcTitle')}
              body={$_('promo.ttcBody')}
              ctaText={$_('promo.auraCTA')}
            />
          </div>
        </div>
      {:else if activeTab === 'calendar'}
        <div class="calendar-view">
          <div class="calendar-header">
            <button onclick={prevMonth}>
              <Icon name="chevron-left" size={20} />
            </button>
            <h2>{monthName}</h2>
            <button onclick={nextMonth}>
              <Icon name="chevron-right" size={20} />
            </button>
          </div>

          <div class="calendar-grid">
            {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
              <div class="day-header">{day}</div>
            {/each}
            {#each calendarDays as day}
              <div
                class="calendar-day"
                class:other-month={!day.currentMonth}
                class:today={day.date === new Date().toISOString().split('T')[0]}
              >
                <span>{day.day}</span>
              </div>
            {/each}
          </div>
        </div>
      {:else if activeTab === 'insights'}
        <div class="insights-view">
          <h2>{$_('insights.title')}</h2>

          {#if avgCycle}
            <div class="stat-card">
              <span class="stat-label">{$_('insights.avgCycle')}</span>
              <span class="stat-value">{avgCycle} days</span>
            </div>
          {/if}

          {#if avgPeriod}
            <div class="stat-card">
              <span class="stat-label">{$_('insights.avgPeriod')}</span>
              <span class="stat-value">{avgPeriod} days</span>
            </div>
          {/if}

          {#if !avgCycle && !avgPeriod}
            <p class="no-data">{$_('insights.noData')}</p>
          {/if}

          <div class="promo-section">
            <CrossPromoCard
              targetApp="nova"
              title={$_('promo.follicularTitle')}
              body={$_('promo.follicularBody')}
              ctaText={$_('promo.novaCTA')}
            />
            <CrossPromoCard
              targetApp="alma"
              title={$_('promo.almaTitle')}
              body={$_('promo.almaBody')}
              ctaText={$_('promo.almaCTA')}
            />
          </div>
        </div>
      {/if}
    {/if}
  </main>

  {#if data.settings.lastPeriodDate}
    <TabBar
      tabs={[
        { id: 'today', label: 'Today', icon: 'home' },
        { id: 'calendar', label: $_('calendar.title'), icon: 'calendar' },
        { id: 'insights', label: $_('calendar.insights'), icon: 'chart' }
      ]}
      {activeTab}
      onchange={(id) => activeTab = id}
      brand="luna"
    />
  {/if}

  <footer>
    <PrivacyBadge />
    <MedicalDisclaimer />
  </footer>
</div>

{#if showLogModal}
  <div class="modal-overlay" onclick={() => showLogModal = null}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      {#if showLogModal === 'period'}
        <h3>{$_('logging.logPeriod')}</h3>
        <PebbleButton variant="primary" size="lg" onclick={handleLogPeriod}>
          {$_('logging.logPeriod')}
        </PebbleButton>
      {:else if showLogModal === 'symptoms'}
        <h3>{$_('logging.logSymptoms')}</h3>
        <LogSymptoms onLog={handleLogSymptoms} />
      {:else if showLogModal === 'temperature'}
        <h3>{$_('logging.logTemperature')}</h3>
        <LogTemperature onLog={handleLogTemperature} />
      {/if}
      <button class="close-btn" onclick={() => showLogModal = null}>
        <Icon name="x" size={20} />
      </button>
    </div>
  </div>
{/if}

{#if showSettings}
  <div class="modal-overlay" onclick={() => showSettings = false}>
    <div class="modal settings-modal" onclick={(e) => e.stopPropagation()}>
      <h3>{$_('settings.title')}</h3>
      <label>
        <span>{$_('settings.lastPeriod')}</span>
        <input type="date" bind:value={tempSetting.lastPeriodDate} />
      </label>
      <label>
        <span>{$_('settings.cycleLength')}</span>
        <input type="number" min="21" max="35" bind:value={tempSetting.cycleLength} />
      </label>
      <label>
        <span>{$_('settings.periodLength')}</span>
        <input type="number" min="1" max="10" bind:value={tempSetting.periodLength} />
      </label>
      <PebbleButton variant="primary" size="md" onclick={handleSaveSettings}>
        {$_('settings.save')}
      </PebbleButton>
      <button class="close-btn" onclick={() => showSettings = false}>
        <Icon name="x" size={20} />
      </button>
    </div>
  </div>
{/if}

<style>
  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--luna-primary-container);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4, 16px) var(--spacing-4, 16px);
    background: white;
    border-radius: 0 0 var(--radius-lg, 16px) var(--radius-lg, 16px);
    box-shadow: var(--shadow-sm);
  }

  h1 {
    font-size: var(--font-size-xl, 22px);
    font-weight: var(--font-weight-bold, 700);
    color: var(--luna-primary);
    margin: 0;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-2, 8px);
    color: var(--luna-primary);
  }

  main {
    flex: 1;
    padding: var(--spacing-4, 16px);
    padding-bottom: calc(80px + var(--spacing-4, 16px));
  }

  .onboarding {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6, 24px);
    margin-top: var(--spacing-8, 32px);
  }

  .setup-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 16px);
    background: white;
    padding: var(--spacing-6, 24px);
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-md);
  }

  .setup-form label {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2, 8px);
  }

  .setup-form span {
    font-size: var(--font-size-sm, 13px);
    font-weight: var(--font-weight-medium, 500);
    color: var(--luna-secondary);
  }

  .setup-form input {
    padding: var(--spacing-3, 12px);
    border: 1px solid var(--luna-secondary);
    border-radius: var(--radius-md, 12px);
    font-size: var(--font-size-base, 15px);
    color: var(--luna-primary);
  }

  .today-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-4, 16px);
  }

  .ring-container {
    padding: var(--spacing-4, 16px);
  }

  .phase-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-3, 12px);
  }

  .phase-badge {
    padding: var(--spacing-2, 8px) var(--spacing-4, 16px);
    border-radius: var(--radius-pebble);
    color: white;
    font-size: var(--font-size-sm, 13px);
    font-weight: var(--font-weight-semibold, 600);
  }

  .day-counter {
    font-size: var(--font-size-lg, 17px);
    font-weight: var(--font-weight-medium, 500);
    color: var(--luna-primary);
  }

  .next-period {
    font-size: var(--font-size-sm, 13px);
    color: var(--luna-secondary);
    margin: 0;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-3, 12px);
    width: 100%;
    margin-top: var(--spacing-4, 16px);
  }

  .promo-section {
    width: 100%;
    margin-top: var(--spacing-4, 16px);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3, 12px);
  }

  .calendar-view {
    background: white;
    border-radius: var(--radius-lg, 16px);
    padding: var(--spacing-4, 16px);
    box-shadow: var(--shadow-md);
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4, 16px);
  }

  .calendar-header h2 {
    font-size: var(--font-size-lg, 17px);
    font-weight: var(--font-weight-semibold, 600);
    margin: 0;
    color: var(--luna-primary);
  }

  .calendar-header button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-2, 8px);
    color: var(--luna-primary);
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-1, 4px);
  }

  .day-header {
    text-align: center;
    font-size: var(--font-size-xs, 12px);
    font-weight: var(--font-weight-medium, 500);
    color: var(--luna-secondary);
    padding: var(--spacing-2, 8px);
  }

  .calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm, 8px);
    font-size: var(--font-size-sm, 13px);
    color: var(--luna-primary);
  }

  .calendar-day.other-month {
    color: var(--luna-secondary);
    opacity: 0.5;
  }

  .calendar-day.today {
    background: var(--luna-primary);
    color: white;
    font-weight: var(--font-weight-semibold, 600);
  }

  .insights-view {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 16px);
  }

  .insights-view h2 {
    font-size: var(--font-size-lg, 17px);
    font-weight: var(--font-weight-semibold, 600);
    margin: 0;
    color: var(--luna-primary);
  }

  .stat-card {
    background: white;
    padding: var(--spacing-4, 16px);
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stat-label {
    font-size: var(--font-size-sm, 13px);
    color: var(--luna-secondary);
  }

  .stat-value {
    font-size: var(--font-size-lg, 17px);
    font-weight: var(--font-weight-semibold, 600);
    color: var(--luna-primary);
  }

  .no-data {
    text-align: center;
    color: var(--luna-secondary);
    font-size: var(--font-size-sm, 13px);
    padding: var(--spacing-8, 32px);
  }

  footer {
    padding: var(--spacing-4, 16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-2, 8px);
    background: white;
    border-radius: var(--radius-lg, 16px) var(--radius-lg, 16px) 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 100;
    padding: var(--spacing-4, 16px);
  }

  .modal {
    background: white;
    border-radius: var(--radius-lg, 16px) var(--radius-lg, 16px) 0 0;
    padding: var(--spacing-6, 24px);
    width: 100%;
    max-width: 480px;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
  }

  .modal h3 {
    font-size: var(--font-size-lg, 17px);
    font-weight: var(--font-weight-semibold, 600);
    margin: 0 0 var(--spacing-4, 16px) 0;
    color: var(--luna-primary);
  }

  .settings-modal {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4, 16px);
  }

  .settings-modal label {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2, 8px);
  }

  .settings-modal span {
    font-size: var(--font-size-sm, 13px);
    font-weight: var(--font-weight-medium, 500);
    color: var(--luna-secondary);
  }

  .settings-modal input {
    padding: var(--spacing-3, 12px);
    border: 1px solid var(--luna-secondary);
    border-radius: var(--radius-md, 12px);
    font-size: var(--font-size-base, 15px);
    color: var(--luna-primary);
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-4, 16px);
    right: var(--spacing-4, 16px);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-2, 8px);
    color: var(--luna-secondary);
  }
</style>
