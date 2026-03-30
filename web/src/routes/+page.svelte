<script>
  import { onMount } from 'svelte';
  import {
    TabBar,
    StitchOnboarding,
    StitchCalendar,
    StitchSettings,
    StitchInsight,
    StitchChart,
    EvidenceCard,
    EmpathyBanner,
    PebbleButton,
    PebbleAction,
    Icon,
    Modal
  } from '$ds/index.js';
  import {
    Calendar,
    BarChart3,
    Settings,
    Droplets,
    Thermometer,
    Brain,
    Heart,
    ChevronLeft,
    ChevronRight,
    X
  } from 'lucide-svelte';

  import {
    loadData,
    updateSettings,
    logEntry,
    getCurrentPhase,
    getPhaseColor,
    getCalendarDays,
    getAverageCycleLength,
    getAveragePeriodLength,
    getFertileWindow
  } from '$lib/cycle-engine.js';

  let data = $state({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null }, log: { period: [], symptoms: [], temperature: [], mood: [] } });
  let activeTab = $state('home');
  let showOnboarding = $state(false);
  let cycleInfo = $state({ phase: 'follicular', dayOfPhase: 1, dayOfCycle: 1, daysUntilNextPeriod: 14, fertileStart: null, fertileEnd: null });
  let calendarDate = $state(new Date());
  let showLogModal = $state(false);
  let logDate = $state(new Date().toISOString().split('T')[0]);
  let selectedFlow = $state(null);
  let selectedMood = $state(null);
  let selectedSymptoms = $state([]);
  let logTemperature = $state('');
  let logNotes = $state('');
  let showDayDetail = $state(null);
  let settingsOpen = $state(false);

  const onboardingSteps = [
    { title: "Welcome to Luna", subtitle: "Understand your cycle, know your body", icon: "moon" },
    { title: "When was your last period?", subtitle: "We'll use this to predict your next one", icon: "calendar" },
    { title: "Your typical cycle", subtitle: "Average is 28 days — yours may differ", icon: "repeat" },
    { title: "What to track", subtitle: "Flow, mood, symptoms, temperature — you choose", icon: "check-square" },
    { title: "Your data, your privacy", subtitle: "Nothing leaves your device without your consent", icon: "lock" }
  ];

  const flowOptions = [
    { id: 'light', label: 'Light', icon: 'droplet' },
    { id: 'medium', label: 'Medium', icon: 'droplet' },
    { id: 'heavy', label: 'Heavy', icon: 'droplet' },
    { id: 'spotting', label: 'Spotting', icon: 'circle' }
  ];

  const moodOptions = [
    { id: 'happy', label: 'Happy', icon: 'smile' },
    { id: 'calm', label: 'Calm', icon: 'peace' },
    { id: 'tired', label: 'Tired', icon: 'battery-low' },
    { id: 'anxious', label: 'Anxious', icon: 'alert-circle' },
    { id: 'irritable', label: 'Irritable', icon: 'flame' }
  ];

  const symptomOptions = [
    'cramps', 'bloating', 'headache', 'tender-breasts', 'acne', 'nausea', 'fatigue', 'back-pain'
  ];

  const phaseIcons = {
    menstrual: 'droplets',
    follicular: 'sun',
    ovulation: 'sparkles',
    luteal: 'moon'
  };

  const phaseLabels = {
    menstrual: 'Menstrual',
    follicular: 'Follicular',
    ovulation: 'Fertile',
    luteal: 'Luteal'
  };

  const settingsSections = [
    {
      title: 'My Cycle',
      items: [
        { type: 'number', label: 'Average cycle length (days)', value: data.settings.cycleLength, onChange: (v) => updateSettings({ cycleLength: parseInt(v) }) },
        { type: 'number', label: 'Period duration (days)', value: data.settings.periodLength, onChange: (v) => updateSettings({ periodLength: parseInt(v) }) }
      ]
    },
    {
      title: 'Track',
      items: [
        { type: 'toggle', label: 'Temperature tracking', value: true },
        { type: 'toggle', label: 'Cervical mucus', value: false },
        { type: 'select', label: 'Temperature unit', options: ['°C', '°F'], value: '°C' }
      ]
    },
    {
      title: 'Notifications',
      items: [
        { type: 'toggle', label: 'Period approaching (2 days before)', value: true },
        { type: 'toggle', label: 'Fertile window', value: false }
      ]
    },
    {
      title: 'Privacy',
      items: [
        { type: 'link', label: 'All data stays on your device', href: '/privacy' }
      ]
    }
  ];

  onMount(() => {
    const onboarded = localStorage.getItem('life-luna-onboarded');
    if (!onboarded) {
      showOnboarding = true;
    } else {
      data = loadData();
      updateCycleInfo();
    }
  });

  function finishOnboarding() {
    showOnboarding = false;
    localStorage.setItem('life-luna-onboarded', '1');
    data = loadData();
    updateCycleInfo();
  }

  function updateCycleInfo() {
    cycleInfo = getCurrentPhase(data.settings.lastPeriodDate, data.settings.cycleLength);
  }

  function handleSaveSettings(newSettings) {
    updateSettings(newSettings);
    data = loadData();
    updateCycleInfo();
  }

  function handleLogPeriod() {
    if (selectedFlow) {
      logEntry('period', { date: logDate, flow: selectedFlow });
      data = loadData();
      updateCycleInfo();
      resetLogForm();
    }
  }

  function handleLogSymptoms() {
    if (selectedMood || selectedSymptoms.length > 0 || logTemperature || logNotes) {
      logEntry('symptoms', {
        date: logDate,
        mood: selectedMood,
        symptoms: selectedSymptoms,
        temperature: logTemperature ? parseFloat(logTemperature) : null,
        notes: logNotes
      });
      data = loadData();
      resetLogForm();
    }
  }

  function resetLogForm() {
    showLogModal = false;
    selectedFlow = null;
    selectedMood = null;
    selectedSymptoms = [];
    logTemperature = '';
    logNotes = '';
    logDate = new Date().toISOString().split('T')[0];
  }

  function toggleSymptom(symptom) {
    if (selectedSymptoms.includes(symptom)) {
      selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    } else {
      selectedSymptoms = [...selectedSymptoms, symptom];
    }
  }

  const calendarDays = $derived(getCalendarDays(calendarDate.getFullYear(), calendarDate.getMonth()));
  const monthName = $derived(calendarDate.toLocaleString('en', { month: 'long', year: 'numeric' }));

  const avgCycle = $derived(getAverageCycleLength(data.log));
  const avgPeriod = $derived(getAveragePeriodLength(data.log));

  const cycleDays = $derived(data.settings.cycleLength || 28);
  const fertileWindow = $derived(getFertileWindow(data.settings.lastPeriodDate, cycleDays));

  const isInFertileWindow = $derived(() => {
    if (!fertileWindow.start || !fertileWindow.end) return false;
    const today = new Date().toISOString().split('T')[0];
    return today >= fertileWindow.start && today <= fertileWindow.end;
  });

  const todayLogged = $derived(() => {
    const today = new Date().toISOString().split('T')[0];
    return data.log.period?.find(p => p.date === today);
  });

  const isLatePeriod = $derived(() => {
    if (!cycleInfo.daysUntilNextPeriod) return false;
    return cycleInfo.daysUntilNextPeriod < -5;
  });

  const isHeavyFlow = $derived(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = data.log.period?.find(p => p.date === today);
    return todayEntry && (todayEntry.flow === 'heavy' || todayEntry.flow === 'soaking');
  });

  const isIrregularCycle = $derived(() => {
    return avgCycle && (avgCycle < 21 || avgCycle > 35);
  });

  const phaseColor = $derived(getPhaseColor(cycleInfo.phase));

  function getDayStatus(day) {
    if (!day.currentMonth) return null;
    const dateStr = day.date;
    const periodEntry = data.log.period?.find(p => p.date === dateStr);
    if (periodEntry) {
      return { date: dateStr, color: '#D4678A', label: periodEntry.flow, type: 'period' };
    }
    if (dateStr === fertileWindow.start || dateStr === fertileWindow.end) {
      return { date: dateStr, color: '#5BA876', label: 'Fertile', type: 'fertile' };
    }
    if (dateStr >= fertileWindow.start && dateStr <= fertileWindow.end) {
      return { date: dateStr, color: '#5BA876', label: 'Fertile', type: 'fertile' };
    }
    const symptomsEntry = data.log.symptoms?.find(s => s.date === dateStr);
    if (symptomsEntry) {
      return { date: dateStr, color: '#E5A855', label: 'Logged', type: 'symptoms' };
    }
    return null;
  }

  function handleDayClick({ date, status }) {
    showDayDetail = { date, status };
  }

  function prevMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  }

  function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  }

  function getLast6Cycles() {
    if (!data.log.period || data.log.period.length < 2) return [];
    const periods = [...data.log.period].map(p => new Date(p.date)).sort((a, b) => b - a);
    const cycles = [];
    for (let i = 0; i < Math.min(5, periods.length - 1); i++) {
      const diff = (periods[i] - periods[i + 1]) / (1000 * 60 * 60 * 24);
      cycles.unshift(diff);
    }
    return cycles;
  }

  function getTopSymptoms() {
    if (!data.log.symptoms || data.log.symptoms.length === 0) return [];
    const counts = {};
    data.log.symptoms.forEach(s => {
      (s.symptoms || []).forEach(symptom => {
        counts[symptom] = (counts[symptom] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }

  const last6Cycles = $derived(getLast6Cycles());
  const topSymptoms = $derived(getTopSymptoms());
</script>

{#if showOnboarding}
  <StitchOnboarding steps={onboardingSteps} brand="luna" onComplete={finishOnboarding} onSkip={finishOnboarding} />
{:else}
  <div class="luna-app" data-app="luna">
    <header class="app-header">
      <h1>Luna</h1>
      <button class="icon-btn" onclick={() => activeTab = 'settings'} aria-label="Settings">
        <Icon name="settings" size={20} />
      </button>
    </header>

    <main class="app-main">
      {#if activeTab === 'home'}
        <div class="home-view">
          <div class="hero-card" style="background: var(--c-hero-gradient, linear-gradient(135deg, #D4678A 0%, #E8A87C 100%))">
            <div class="phase-header">
              <Icon name={phaseIcons[cycleInfo.phase] || 'moon'} size={24} />
              <span class="phase-label">{phaseLabels[cycleInfo.phase] || 'Unknown'}</span>
            </div>
            <div class="days-counter">
              <span class="day-number">Day {cycleInfo.dayOfCycle}</span>
              <span class="cycle-of">of {cycleDays}</span>
            </div>
            {#if cycleInfo.daysUntilNextPeriod > 0}
              <p class="next-hint">Next period in {cycleInfo.daysUntilNextPeriod} days</p>
            {:else if cycleInfo.daysUntilNextPeriod === 0}
              <p class="next-hint">Period expected today</p>
            {:else if cycleInfo.daysUntilNextPeriod < 0}
              <p class="next-hint">Period {Math.abs(cycleInfo.daysUntilNextPeriod)} days late</p>
            {/if}
          </div>

          {#if isLatePeriod()}
            <EmpathyBanner
              message={{ icon: 'heart', fallback: 'Your period is a few days late. This can be completely normal. Let us know when it arrives.' }}
            />
          {/if}

          {#if isHeavyFlow()}
            <div class="alert-card alert-warn">
              <Icon name="alert-triangle" size={20} />
              <p>If you're soaking through protection every hour, consider speaking with your doctor.</p>
            </div>
          {/if}

          {#if isInFertileWindow()}
            <div class="fertile-indicator">
              <Icon name="sparkles" size={16} />
              <span>Fertile window</span>
            </div>
          {/if}

          <div class="quick-actions">
            <PebbleAction
              icon="droplets"
              label="Log period"
              color="#D4678A"
              onclick={() => { showLogModal = true; }}
            />
            <PebbleAction
              icon="heart"
              label="Symptoms"
              color="#E5A855"
              onclick={() => { showLogModal = true; }}
            />
            <PebbleAction
              icon="thermometer"
              label="Temperature"
              color="#5BA876"
              onclick={() => { showLogModal = true; }}
            />
          </div>

          <div class="today-card">
            {#if todayLogged()}
              <h3>Today's entry</h3>
              <p class="entry-summary">Logged: {todayLogged().flow} flow</p>
            {:else}
              <h3>Log today</h3>
              <PebbleButton brand="luna" label="Log entry" size="md" onclick={() => showLogModal = true} />
            {/if}
          </div>
        </div>

      {:else if activeTab === 'calendar'}
        <div class="calendar-view">
          <StitchCalendar
            brand="luna"
            year={calendarDate.getFullYear()}
            month={calendarDate.getMonth()}
            days={calendarDays.map(d => ({ ...d, ...getDayStatus(d) }))}
            onDayClick={handleDayClick}
          />
          <div class="calendar-legend">
            <div class="legend-item">
              <span class="legend-dot" style="background: #D4678A"></span>
              <span>Period</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #5BA876"></span>
              <span>Fertile</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #E5A855"></span>
              <span>Logged</span>
            </div>
          </div>
        </div>

      {:else if activeTab === 'log'}
        <div class="log-view">
          <div class="log-header">
            <h2>Log entry</h2>
            <label class="date-picker">
              <Icon name="calendar" size={16} />
              <input type="date" bind:value={logDate} />
            </label>
          </div>

          <section class="log-section">
            <h3>Flow intensity</h3>
            <div class="flow-options">
              {#each flowOptions as option}
                <button
                  class="flow-btn"
                  class:selected={selectedFlow === option.id}
                  onclick={() => selectedFlow = option.id}
                >
                  <Icon name={option.icon} size={20} />
                  <span>{option.label}</span>
                </button>
              {/each}
            </div>
          </section>

          <section class="log-section">
            <h3>Mood</h3>
            <div class="mood-chips">
              {#each moodOptions as option}
                <button
                  class="mood-chip"
                  class:selected={selectedMood === option.id}
                  onclick={() => selectedMood = option.id}
                >
                  <Icon name={option.icon} size={16} />
                  {option.label}
                </button>
              {/each}
            </div>
          </section>

          <section class="log-section">
            <h3>Physical symptoms</h3>
            <div class="symptom-chips">
              {#each symptomOptions as symptom}
                <button
                  class="symptom-chip"
                  class:selected={selectedSymptoms.includes(symptom)}
                  onclick={() => toggleSymptom(symptom)}
                >
                  {symptom.replace('-', ' ')}
                </button>
              {/each}
            </div>
          </section>

          <section class="log-section">
            <h3>Temperature (optional)</h3>
            <div class="temp-input">
              <input
                type="number"
                step="0.1"
                min="35"
                max="42"
                placeholder="36.6"
                bind:value={logTemperature}
              />
              <span>°C</span>
            </div>
          </section>

          <section class="log-section">
            <h3>Notes (optional)</h3>
            <textarea
              placeholder="Any additional notes..."
              bind:value={logNotes}
              rows="3"
            ></textarea>
          </section>

          <div class="log-actions">
            <PebbleButton brand="luna" label="Save entry" size="lg" onclick={handleLogPeriod} />
          </div>
        </div>

      {:else if activeTab === 'insights'}
        <div class="insights-view">
          {#if !avgCycle || last6Cycles.length < 2}
            <div class="empty-insights">
              <EvidenceCard
                text="Track at least 3 cycles to see insights about your cycle patterns."
                source="Fehring et al. 2006"
                doi="10.1111/j.1552-6909.2006.00030.x"
              />
            </div>
          {:else}
            <StitchInsight
              brand="luna"
              insight="Your average cycle is {avgCycle} days"
              source="Fehring et al. 2006"
              doi="10.1111/j.1552-6909.2006.00030.x"
            />

            <section class="chart-section">
              <h3>Cycle length (last 6 cycles)</h3>
              <StitchChart
                type="bar"
                data={last6Cycles}
                labels={last6Cycles.map((_, i) => `Cycle ${i + 1}`)}
                color="#D4678A"
              />
            </section>

            {#if topSymptoms.length > 0}
              <section class="chart-section">
                <h3>Top symptoms</h3>
                <StitchChart
                  type="bar"
                  data={topSymptoms.map(s => s.count)}
                  labels={topSymptoms.map(s => s.name.replace('-', ' '))}
                  color="#E5A855"
                />
              </section>
            {/if}

            <EvidenceCard
              text="Average cycle is 28 days, range 21-35 is normal."
              source="Fehring et al. 2006 doi:10.1111/j.1552-6909.2006.00030.x"
            />

            {#if isIrregularCycle()}
              <div class="alert-card alert-warn">
                <Icon name="alert-triangle" size={20} />
                <p>Your cycle is outside the typical range. Consider consulting your gynecologist.</p>
              </div>
            {/if}
          {/if}
        </div>

      {:else if activeTab === 'settings'}
        <div class="settings-view">
          <StitchSettings
            brand="luna"
            sections={settingsSections}
          />
        </div>
      {/if}
    </main>

    <TabBar
      tabs={[
        { id: 'home', label: 'Home', icon: 'home' },
        { id: 'calendar', label: 'Calendar', icon: 'calendar' },
        { id: 'log', label: 'Log', icon: 'plus-circle' },
        { id: 'insights', label: 'Insights', icon: 'chart' },
        { id: 'settings', label: 'Settings', icon: 'settings' }
      ]}
      {activeTab}
      onchange={(id) => activeTab = id}
      brand="luna"
    />
  </div>
{/if}

{#if showDayDetail}
  <div class="modal-overlay" onclick={() => showDayDetail = null}>
    <div class="modal" onclick={(e) => e.stopPropagation()}>
      <header class="modal-header">
        <h3>{new Date(showDayDetail.date).toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
        <button class="close-btn" onclick={() => showDayDetail = null}>
          <Icon name="x" size={20} />
        </button>
      </header>
      {#if showDayDetail.status}
        <div class="day-detail">
          <p><strong>Type:</strong> {showDayDetail.status.type}</p>
          {#if showDayDetail.status.type === 'period'}
            <p><strong>Flow:</strong> {showDayDetail.status.label}</p>
          {/if}
        </div>
      {:else}
        <p class="no-data">No entries for this day</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  .luna-app {
    min-height: 100vh;
    background: var(--c-bg);
    color: var(--c-text);
    display: flex;
    flex-direction: column;
  }

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4);
    background: var(--c-surface);
  }

  .app-header h1 {
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
    color: var(--c-brand);
    margin: 0;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    color: var(--c-text-secondary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--tap-target);
    min-height: var(--tap-target);
  }

  .icon-btn:hover {
    background: var(--c-surface-container);
  }

  .app-main {
    flex: 1;
    padding: var(--space-4);
    padding-bottom: calc(80px + var(--space-4));
  }

  .home-view {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .hero-card {
    border-radius: var(--radius-pebble);
    padding: var(--space-6);
    color: white;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .phase-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .phase-label {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.9;
  }

  .days-counter {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .day-number {
    font-size: var(--text-2xl);
    font-weight: var(--weight-bold);
    line-height: 1;
  }

  .cycle-of {
    font-size: var(--text-sm);
    opacity: 0.8;
  }

  .next-hint {
    font-size: var(--text-sm);
    opacity: 0.9;
    margin: 0;
  }

  .alert-card {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    background: var(--c-surface);
  }

  .alert-warn {
    border: 1px solid var(--c-error);
    color: var(--c-error);
  }

  .alert-card p {
    margin: 0;
    font-size: var(--text-sm);
  }

  .fertile-indicator {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-4);
    background: color-mix(in srgb, #5BA876 10%, var(--c-surface));
    border-radius: var(--radius-full);
    color: #5BA876;
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    width: fit-content;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }

  .today-card {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .today-card h3 {
    font-size: var(--text-base);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .entry-summary {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .calendar-view {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .calendar-legend {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    padding: var(--space-2);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
  }

  .legend-dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
  }

  .log-view {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .log-header h2 {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .date-picker {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    background: var(--c-surface);
    border-radius: var(--radius-md);
    color: var(--c-text-secondary);
    cursor: pointer;
  }

  .date-picker input {
    border: none;
    background: transparent;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--c-text);
  }

  .log-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .log-section h3 {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .flow-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-2);
  }

  .flow-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-3);
    background: var(--c-surface);
    border: 2px solid var(--c-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    color: var(--c-text-secondary);
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .flow-btn.selected {
    border-color: var(--c-brand);
    color: var(--c-brand);
    background: color-mix(in srgb, var(--c-brand) 8%, var(--c-surface));
  }

  .flow-btn span {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
  }

  .mood-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .mood-chip {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .mood-chip.selected {
    border-color: var(--c-brand);
    color: var(--c-brand);
    background: color-mix(in srgb, var(--c-brand) 8%, var(--c-surface));
  }

  .symptom-chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .symptom-chip {
    padding: var(--space-2) var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition: all var(--duration-fast);
    min-height: var(--tap-target);
  }

  .symptom-chip.selected {
    border-color: var(--c-brand);
    color: var(--c-brand);
    background: color-mix(in srgb, var(--c-brand) 8%, var(--c-surface));
  }

  .temp-input {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
  }

  .temp-input input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: var(--text-base);
    color: var(--c-text);
    font-family: var(--font-sans);
  }

  .temp-input span {
    color: var(--c-text-secondary);
  }

  .log-view textarea {
    width: 100%;
    padding: var(--space-3);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--c-text);
    resize: vertical;
    box-sizing: border-box;
  }

  .log-actions {
    margin-top: var(--space-4);
  }

  .insights-view {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .empty-insights {
    padding: var(--space-6);
    text-align: center;
  }

  .chart-section {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
  }

  .chart-section h3 {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    margin: 0 0 var(--space-3) 0;
  }

  .settings-view {
    padding-bottom: var(--space-8);
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: var(--c-overlay);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: var(--z-modal);
    padding: var(--space-4);
  }

  .modal {
    background: var(--c-surface);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: var(--space-6);
    width: 100%;
    max-width: 480px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-4);
  }

  .modal-header h3 {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    margin: 0;
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    color: var(--c-text-secondary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .day-detail p {
    font-size: var(--text-sm);
    color: var(--c-text);
    margin: 0 0 var(--space-2) 0;
  }

  .no-data {
    text-align: center;
    color: var(--c-text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-4);
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-btn,
    .mood-chip,
    .symptom-chip {
      transition: none;
    }
  }
</style>
