<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { Icon } from '$ds/index.js';
  import { ChevronLeft } from 'lucide-svelte';
  import { loadData, updateSettings } from '$lib/cycle-engine.js';

  let data = $state({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null } });

  const settingsItems = [
    { id: 'cycle-length', label: 'Cycle length', type: 'number', key: 'cycleLength', unit: 'days' },
    { id: 'period-length', label: 'Period length', type: 'number', key: 'periodLength', unit: 'days' },
    { id: 'notifications', label: 'Notifications', type: 'toggle' },
    { id: 'theme', label: 'Theme', type: 'link' },
    { id: 'export', label: 'Export data', type: 'link' }
  ];

  let notificationsEnabled = $state(true);
  let cycleLength = $state(28);
  let periodLength = $state(5);

  onMount(() => {
    data = loadData();
    cycleLength = data.settings.cycleLength;
    periodLength = data.settings.periodLength;
    notificationsEnabled = localStorage.getItem('life-luna-notifications') !== 'false';
  });

  function handleCycleLengthChange(e) {
    const val = parseInt(e.target.value) || 28;
    cycleLength = val;
    updateSettings({ cycleLength: val });
  }

  function handlePeriodLengthChange(e) {
    const val = parseInt(e.target.value) || 5;
    periodLength = val;
    updateSettings({ periodLength: val });
  }

  function toggleNotifications() {
    notificationsEnabled = !notificationsEnabled;
    localStorage.setItem('life-luna-notifications', String(notificationsEnabled));
  }

  function handleTheme() {
    const current = localStorage.getItem('life-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('life-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  function handleExport() {
    const data_str = localStorage.getItem('luna_data');
    if (data_str) {
      const blob = new Blob([data_str], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'luna-data.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  }
</script>

<div class="settings-page" data-app="luna">
  <header class="page-header">
    <button class="back-btn" onclick={() => goto('/')} aria-label="Back">
      <Icon name="chevron-left" size={20} />
    </button>
    <h1>Settings</h1>
  </header>

  <main class="page-content">
    <div class="settings-list">
      <div class="setting-row">
        <span class="setting-label">Cycle length</span>
        <div class="setting-control">
          <input
            type="number"
            min="21"
            max="35"
            value={cycleLength}
            onchange={handleCycleLengthChange}
            class="number-input"
            data-testid="cycle-length-input"
          />
          <span class="unit">days</span>
        </div>
      </div>

      <div class="setting-row">
        <span class="setting-label">Period length</span>
        <div class="setting-control">
          <input
            type="number"
            min="1"
            max="10"
            value={periodLength}
            onchange={handlePeriodLengthChange}
            class="number-input"
            data-testid="period-length-input"
          />
          <span class="unit">days</span>
        </div>
      </div>

      <div class="setting-row">
        <span class="setting-label">Notifications</span>
        <button
          class="toggle-btn"
          class:active={notificationsEnabled}
          onclick={toggleNotifications}
          data-testid="notifications-toggle"
        >
          <span class="toggle-knob"></span>
        </button>
      </div>

      <div class="setting-row">
        <span class="setting-label">Theme</span>
        <button class="link-btn" onclick={handleTheme} data-testid="theme-btn">
          <span>System</span>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>

      <div class="setting-row">
        <span class="setting-label">Export data</span>
        <button class="link-btn" onclick={handleExport} data-testid="export-btn">
          <span>Download</span>
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </div>

    <div class="privacy-note">
      <Icon name="lock" size={14} />
      <span>All data stored locally on your device</span>
    </div>
  </main>
</div>

<style>
  .settings-page {
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
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .settings-list {
    display: flex;
    flex-direction: column;
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4);
    border-bottom: 1px solid var(--c-border);
    min-height: var(--tap-target);
  }

  .setting-row:last-child {
    border-bottom: none;
  }

  .setting-label {
    font-size: var(--text-base);
    color: var(--c-text);
  }

  .setting-control {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .number-input {
    width: 56px;
    padding: var(--space-2);
    background: var(--c-surface-container);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    color: var(--c-text);
    text-align: center;
    font-family: var(--font-sans);
  }

  .number-input:focus {
    outline: none;
    border-color: var(--c-brand, #E57373);
  }

  .unit {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
  }

  .toggle-btn {
    width: 48px;
    height: 28px;
    background: var(--c-border);
    border: none;
    border-radius: 14px;
    cursor: pointer;
    position: relative;
    transition: background var(--duration-fast);
    min-height: 28px;
  }

  .toggle-btn.active {
    background: var(--c-brand, #E57373);
  }

  .toggle-knob {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 12px;
    transition: transform var(--duration-fast);
  }

  .toggle-btn.active .toggle-knob {
    transform: translateX(20px);
  }

  .link-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--c-text-secondary);
    font-size: var(--text-sm);
    padding: var(--space-2);
    margin: calc(-1 * var(--space-2));
    border-radius: var(--radius-md);
    min-height: var(--tap-target);
  }

  .link-btn:hover {
    color: var(--c-text);
  }

  .privacy-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3);
    color: var(--c-text-secondary);
    font-size: var(--text-xs);
  }

  @media (prefers-reduced-motion: reduce) {
    .toggle-btn,
    .toggle-knob {
      transition: none;
    }
  }
</style>
