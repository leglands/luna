<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { _ } from 'svelte-i18n';
  import { PebbleButton, DSFloatingNav, DaisyMenu, Modal, DSButton, DSUndoToast } from '$ds/index.js';
  import DSShareSheet from '$ds/DSShareSheet.svelte';
  import Icon from '$ds/Icon.svelte';
  import { getShareConfig } from '$ds/share-config.js';
  import { loadData, updateSettings, clearStoredData, restoreStoredData } from '$lib/cycle-engine.js';
  import { LOCALES, detectLocale, setLocale, setupI18n } from '$lib/i18n.js';

  setupI18n();

  const shareConfig = getShareConfig('luna');
  let shareOpen = $state(false);

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

  function applyForm(data) {
    cycleLength = data.settings?.cycleLength ?? 28;
    periodLength = data.settings?.periodLength ?? 5;
    cycleStartDate = data.settings?.lastPeriodDate ?? '';
  }

  onMount(() => {
    applyForm(loadData());
    selectedLocale = detectLocale();
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
  }

  async function undoDeleteData() {
    if (!undoSnapshot) return;
    await restoreStoredData(undoSnapshot.data);
    restoreLocalFlag('life-luna-onboarded', undoSnapshot.onboarded);
    restoreLocalFlag('life-luna-tour-pending', undoSnapshot.tourPending);
    restoreLocalFlag('life-luna-tour-done', undoSnapshot.tourDone);
    applyForm(undoSnapshot.data);
    undoSnapshot = null;
  }

  function finalizeDeleteData() {
    undoSnapshot = null;
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
      <button class="share-row" onclick={() => shareOpen = true} aria-label={$_('settings.shareApp', { default: 'Recommend the app' })}>
        <span class="share-row-icon">
          <Icon name="share-2" size={20} />
        </span>
        <span class="share-row-label">{$_('settings.shareApp', { default: 'Recommend the app' })}</span>
        <Icon name="chevron-right" size={16} class="share-row-chevron" />
      </button>
    </div>
    <div class="rows rows--danger" style="margin-top:0">
      <button class="share-row share-row--danger" onclick={() => deleteModalOpen = true}>
        <span class="share-row-icon">
          <Icon name="trash-2" size={20} />
        </span>
        <span class="share-row-label">{$_('settings.deleteData', { default: 'Delete my data' })}</span>
        <Icon name="chevron-right" size={16} class="share-row-chevron" />
      </button>
    </div>
    <PebbleButton label={$_('settings.save', { default: 'Save' })} size="lg" onclick={save} />
  </main>
  <DSShareSheet
    bind:open={shareOpen}
    url={shareConfig.url}
    title={shareConfig.title}
    text={shareConfig.text}
    onclose={() => shareOpen = false}
  />
  <DSFloatingNav
  tabs={TABS}
  active="settings"
  brand="luna"
  onchange={(id) => goto('/' + (id === 'home' ? '' : id))}
   onfab={() => daisyOpen = !daisyOpen}
   bind:daisyOpen
/>
<DaisyMenu open={daisyOpen} onclose={() => daisyOpen = false} items={DAISY_ITEMS} />
<Modal
  title={$_('settings.deleteData', { default: 'Delete my data' })}
  bind:open={deleteModalOpen}
  onclose={() => deleteModalOpen = false}
>
  {#snippet children()}
    <p class="modal-copy">{$_('settings.deleteBody', { default: 'This removes your cycle data from this device. Theme and language stay unchanged.' })}</p>
  {/snippet}
  {#snippet footer()}
    <DSButton variant="secondary" onclick={() => deleteModalOpen = false}>{$_('common.cancel', { default: 'Cancel' })}</DSButton>
    <DSButton variant="danger" onclick={() => { void confirmDeleteData(); }}>{$_('settings.deleteConfirm', { default: 'Delete data' })}</DSButton>
  {/snippet}
</Modal>
<div class="undo-wrap">
  <DSUndoToast
    bind:open={undoDeleteOpen}
    message={$_('settings.deleted', { default: 'Your Luna data was deleted from this device.' })}
    undoLabel={$_('common.undo', { default: 'Undo' })}
    duration={30000}
    onundo={() => { void undoDeleteData(); }}
    ondismiss={finalizeDeleteData}
  />
</div>
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
  .modal-copy { margin: 0; line-height: 1.5; color: var(--c-text); }
  .undo-wrap { position: fixed; inset-inline: 0; bottom: calc(24px + env(safe-area-inset-bottom, 0px)); display: flex; justify-content: center; pointer-events: none; z-index: var(--z-modal); }
  .undo-wrap :global(.undo-toast) { pointer-events: auto; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
