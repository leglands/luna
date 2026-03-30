<script>
  import { StitchSettings, Icon, PrivacyBadge } from '$ds/index.js';
  import { loadData, updateSettings } from '$lib/cycle-engine.js';

  let data = $state(null);

  $effect(() => {
    data = loadData();
  });

  const settingsSections = $derived(data ? [
    {
      title: 'My Cycle',
      items: [
        {
          type: 'number',
          label: 'Average cycle length (days)',
          value: data.settings.cycleLength,
          onChange: (v) => { updateSettings({ cycleLength: parseInt(v) }); data = loadData(); }
        },
        {
          type: 'number',
          label: 'Period duration (days)',
          value: data.settings.periodLength,
          onChange: (v) => { updateSettings({ periodLength: parseInt(v) }); data = loadData(); }
        }
      ]
    },
    {
      title: 'Start date',
      items: [
        {
          type: 'date',
          label: 'Last period start date',
          value: data.settings.lastPeriodDate || '',
          onChange: (v) => { updateSettings({ lastPeriodDate: v }); data = loadData(); }
        }
      ]
    }
  ] : []);
</script>

<div class="page" data-testid="settings-page">
  <header class="page-header">
    <button class="back-btn" onclick={() => window.history.back()} aria-label="Back">
      <Icon name="arrow-left" size={20} />
    </button>
    <h1>Settings</h1>
    <PrivacyBadge />
  </header>

  <main class="page-content">
    {#if data}
      <StitchSettings brand="luna" sections={settingsSections} />
    {/if}
    <div class="privacy-note" data-testid="privacy-note">
      <Icon name="lock" size={16} />
      <p>All data is stored locally on your device. Nothing is sent to any server.</p>
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
  .privacy-note { display: flex; gap: var(--space-2); align-items: center; padding: var(--space-3); background: var(--c-surface); border-radius: var(--radius-md); color: var(--c-text-secondary); font-size: var(--text-sm); }
  .privacy-note p { margin: 0; }
</style>