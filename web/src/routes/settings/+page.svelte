<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  import { PebbleButton, DSFloatingNav, DaisyMenu } from '$ds/index.js';
  import { getShareConfig } from '$ds/share-config.js';
  import { initStorage, loadData, updateSettings, clearStoredData, restoreStoredData } from '$lib/cycle-engine.js';
  import { LOCALES, detectLocale, setLocale, setupI18n } from '$lib/i18n.js';

  setupI18n();

  const shareConfig = getShareConfig('luna');

  const TABS = $derived([
    { id:'home',      label: $_('nav.home', { default: 'Home' }),         icon:'home' },
    { id:'cycle',     label: $_('nav.cycle', { default: 'Cycle' }),       icon:'calendar' },
    { id:'fertility', label: $_('nav.fertility', { default: 'Fertility' }), icon:'heart' },
    { id:'insights',  label: $_('nav.insights', { default: 'Insights' }), icon:'bar-chart' },
    { id:'settings',  label: $_('nav.settings', { default: 'Settings' }), icon:'settings' }
  ]);

  let cycleLength = $state(28);
  let periodLength = $state(5);
  let cycleStartDate = $state('');
  let selectedLocale = $state('en');
  let deleteModalOpen = $state(false);
  let undoDeleteOpen = $state(false);
  let undoSnapshot = $state(null);
  let undoTimer = $state(null);
  let didBoot = false;

  function applyForm(data) {
    cycleLength = data.settings?.cycleLength ?? 28;
    periodLength = data.settings?.periodLength ?? 5;
    cycleStartDate = data.settings?.lastPeriodDate ?? '';
  }

  $effect(() => {
    if (!browser || didBoot) return;
    didBoot = true;
    void (async () => {
      await initStorage();
      applyForm(loadData());
      selectedLocale = detectLocale();
    })();
  });

  function save() {
    const s = { cycleLength: Number(cycleLength), periodLength: Number(periodLength), lastPeriodDate: cycleStartDate || null };
    updateSettings(s);
    goto('/');
  }

  function changeLocale(code) {
    selectedLocale = code;
    setLocale(code);
  }

  async function shareApp() {
    try {
      if (navigator.share) {
        await navigator.share(shareConfig);
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareConfig.url);
      }
    } catch {}
  }

  function snapshotLocalFlag(key) {
    return localStorage.getItem(key);
  }

  function restoreLocalFlag(key, value) {
    if (value == null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  }

  async function confirmDeleteData() {
    undoSnapshot = {
      data: JSON.parse(JSON.stringify(loadData())),
      onboarded: snapshotLocalFlag('life-luna-onboarded'),
      tourPending: snapshotLocalFlag('life-luna-tour-pending'),
      tourDone: snapshotLocalFlag('life-luna-tour-done')
    };

    await clearStoredData();
    localStorage.removeItem('life-luna-onboarded');
    localStorage.removeItem('life-luna-tour-pending');
    localStorage.removeItem('life-luna-tour-done');

    applyForm({ settings: { cycleLength: 28, periodLength: 5, lastPeriodDate: null } });
    deleteModalOpen = false;
    undoDeleteOpen = true;
    if (undoTimer) clearTimeout(undoTimer);
    undoTimer = setTimeout(() => {
      finalizeDeleteData();
    }, 30000);
  }

  async function undoDeleteData() {
    if (!undoSnapshot) return;
    if (undoTimer) clearTimeout(undoTimer);
    await restoreStoredData(undoSnapshot.data);
    restoreLocalFlag('life-luna-onboarded', undoSnapshot.onboarded);
    restoreLocalFlag('life-luna-tour-pending', undoSnapshot.tourPending);
    restoreLocalFlag('life-luna-tour-done', undoSnapshot.tourDone);
    applyForm(undoSnapshot.data);
    undoSnapshot = null;
    undoDeleteOpen = false;
  }

  function finalizeDeleteData() {
    if (undoTimer) clearTimeout(undoTimer);
    undoTimer = null;
    undoSnapshot = null;
    undoDeleteOpen = false;
    goto('/onboarding');
  }

  let daisyOpen = $state(false);
  const DAISY_ITEMS = $derived([
    { icon: 'droplet',     label: $_('logging.period', { default: 'Period' }), onclick: () => goto('/cycle') },
    { icon: 'thermometer', label: $_('logging.symptoms', { default: 'Symptoms' }), onclick: () => goto('/cycle') },
    { icon: 'smile',       label: $_('logging.mood', { default: 'Mood' }), onclick: () => goto('/insights') },
    { icon: 'moon',        label: $_('phases.ovulation', { default: 'Ovulation' }), onclick: () => goto('/fertility') },
  ]);
</script>

<div class="screen" data-app="luna">
  <main class="content">
    <h1 class="title">{$_('settings.title', { default: 'Settings' })}</h1>
    <div class="rows">
      <label class="row">
        <span>{$_('settings.cycleLength', { default: 'Cycle length' })}</span>
        <span class="field"><input type="number" bind:value={cycleLength} min="20" max="45" /><span class="unit">{$_('common.days', { default: 'days' })}</span></span>
      </label>
      <label class="row">
        <span>{$_('settings.periodLength', { default: 'Period length' })}</span>
        <span class="field"><input type="number" bind:value={periodLength} min="1" max="10" /><span class="unit">{$_('common.days', { default: 'days' })}</span></span>
      </label>
      <label class="row">
        <span>{$_('settings.lastPeriod', { default: 'Last period date' })}</span>
        <input type="date" bind:value={cycleStartDate} class="date-input" />
      </label>
      <label class="row row--stacked" for="luna-language">
        <span>{$_('settings.language', { default: 'Language' })}</span>
        <select id="luna-language" class="select-input" bind:value={selectedLocale} onchange={(e) => changeLocale(e.currentTarget.value)}>
          {#each LOCALES as option}
            <option value={option.code}>{option.label}</option>
          {/each}
        </select>
      </label>
    </div>
    <div class="rows" style="margin-top:8px">
      <button class="row export-row" onclick={() => goto('/export')}>
        <span>{$_('settings.exportData', { default: 'Export data' })}</span>
        <span class="export-hint">{$_('settings.exportHint', { default: 'CSV for your doctor' })} →</span>
      </button>
    </div>
    <div class="rows" style="margin-top:0">
      <button class="share-row" onclick={() => { void shareApp(); }} aria-label={$_('settings.shareApp', { default: 'Recommend the app' })}>
        <span class="share-row-icon" aria-hidden="true">↗</span>
        <span class="share-row-label">{$_('settings.shareApp', { default: 'Recommend the app' })}</span>
        <span class="share-row-chevron" aria-hidden="true">›</span>
      </button>
    </div>
    <div class="rows rows--danger" style="margin-top:0">
      <button class="share-row share-row--danger" onclick={() => deleteModalOpen = true}>
        <span class="share-row-icon" aria-hidden="true">×</span>
        <span class="share-row-label">{$_('settings.deleteData', { default: 'Delete my data' })}</span>
        <span class="share-row-chevron" aria-hidden="true">›</span>
      </button>
    </div>
    {#if deleteModalOpen}
      <div class="danger-card">
        <p class="danger-copy">{$_('settings.deleteBody', { default: 'This removes your cycle data from this device. Theme and language stay unchanged.' })}</p>
        <div class="danger-actions">
          <button class="secondary-btn" onclick={() => deleteModalOpen = false}>{$_('common.cancel', { default: 'Cancel' })}</button>
          <button class="danger-btn" onclick={() => { void confirmDeleteData(); }}>{$_('settings.deleteConfirm', { default: 'Delete data' })}</button>
        </div>
      </div>
    {/if}
    {#if undoDeleteOpen}
      <div class="undo-banner" role="status" aria-live="polite">
        <span>{$_('settings.deleted', { default: 'Your Luna data was deleted from this device.' })}</span>
        <button class="undo-btn" onclick={() => { void undoDeleteData(); }}>{$_('common.undo', { default: 'Undo' })}</button>
      </div>
    {/if}
    <PebbleButton label={$_('settings.save', { default: 'Save' })} size="lg" onclick={save} />
  </main>
  <DSFloatingNav
  tabs={TABS}
  active="settings"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
   onfab={() => daisyOpen = !daisyOpen}
   bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
</div>

<style>
  .screen { min-height: 100dvh; background: var(--c-bg); color: var(--c-text); display: flex; flex-direction: column; max-width: 780px; margin: 0 auto; }
  .content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-10) var(--space-4); gap: var(--space-6); }
  .title { font-size: var(--text-2xl); font-weight: var(--weight-bold); margin: 0; }
  .rows { display: flex; flex-direction: column; gap: var(--space-4); width: 100%; max-width: 320px; }
  .rows--danger { margin-bottom: var(--space-2); }
  .row { display: flex; align-items: center; justify-content: space-between; font-size: var(--text-base); }
  .row--stacked { align-items: flex-start; flex-direction: column; gap: var(--space-2); }
  .field { display: flex; align-items: center; gap: var(--space-2); }
  .row input[type=number] { width: 60px; text-align: center; border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); padding: var(--space-1) var(--space-2); background: transparent; color: var(--c-text); font-size: var(--text-base); }
  .date-input { border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); padding: var(--space-1) var(--space-2); background: transparent; color: var(--c-text); font-size: var(--text-sm); }
  .select-input { width: 100%; border: 1.5px solid var(--c-border); border-radius: var(--radius-sm); padding: var(--space-2) var(--space-3); background: var(--c-surface); color: var(--c-text); font-size: var(--text-sm); min-height: 44px; }
  .unit { color: var(--c-text-secondary); font-size: var(--text-sm); }
  .export-row { background: none; border: none; cursor: pointer; color: var(--c-text); text-align: left; width: 100%; padding: 0; }
  .export-hint { color: #E91E8C; font-size: var(--text-sm); }
  .share-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 14px 16px; background: var(--c-surface-raised, #f5f5f5); border: none; border-radius: 16px; cursor: pointer; text-align: left; color: var(--c-text); font-size: var(--text-base, 15px); transition: background 120ms ease; min-height: 44px; }
  .share-row:hover { background: var(--c-surface-container, #ebebeb); }
  .share-row:focus-visible { outline: 2px solid var(--c-brand); outline-offset: 2px; }
  .share-row-icon { color: var(--c-brand); flex-shrink: 0; }
  .share-row-label { flex: 1; font-weight: 500; }
  .share-row-chevron { color: var(--c-text-secondary); flex-shrink: 0; }
  .share-row--danger { background: color-mix(in srgb, var(--c-error) 8%, var(--c-surface-raised, #f5f5f5)); }
  .share-row--danger .share-row-icon,
  .share-row--danger .share-row-label { color: var(--c-error); }
  .danger-card { width: 100%; max-width: 320px; border: 1px solid color-mix(in srgb, var(--c-error) 20%, var(--c-border)); border-radius: 16px; padding: 16px; background: color-mix(in srgb, var(--c-error) 6%, var(--c-surface)); display: flex; flex-direction: column; gap: 12px; }
  .danger-copy { margin: 0; line-height: 1.5; color: var(--c-text); }
  .danger-actions { display: flex; gap: 10px; justify-content: flex-end; }
  .secondary-btn, .danger-btn, .undo-btn { min-height: 44px; border-radius: 999px; border: none; padding: 0 16px; font: inherit; cursor: pointer; }
  .secondary-btn { background: var(--c-surface-raised); color: var(--c-text); }
  .danger-btn { background: var(--c-error); color: white; }
  .undo-banner { width: 100%; max-width: 320px; border-radius: 16px; padding: 14px 16px; background: var(--c-surface-raised); box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .undo-btn { background: transparent; color: var(--c-brand); padding-inline: 0; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
