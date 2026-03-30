<script>
  import Icon from './Icon.svelte';
  import Modal from './Modal.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  let {
    brand = 'luna',
    sections = [],
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let selectModalOpen = $state(false);
  let selectedItem = $state(null);
  let selectedOptions = $state({});

  function handleToggle(item, value) {
    selectedOptions[item.label] = value;
    if (item.onChange) {
      item.onChange(value);
    }
  }

  function openSelectModal(item) {
    selectedItem = item;
    selectModalOpen = true;
  }

  function selectOption(option) {
    if (selectedItem) {
      selectedOptions[selectedItem.label] = option;
      if (selectedItem.onChange) {
        selectedItem.onChange(option);
      }
    }
    selectModalOpen = false;
    selectedItem = null;
  }

  function handleAction(item) {
    if (item.onChange) {
      item.onChange();
    }
  }
</script>

<div class="stitch-settings" style="--settings-brand: {brandColor}">
  {#each sections as section, sectionIndex}
    <section class="settings-section">
      {#if section.title}
        <h2 class="section-title">{section.title}</h2>
      {/if}

      <div class="settings-group">
        {#each section.items || [] as item}
          <div class="settings-item">
            {#if item.type === 'toggle'}
              <label class="item-label">
                <div class="item-content">
                  <span class="item-icon" style="color: var(--settings-brand)">
                    {#if item.icon}
                      <Icon name={item.icon} size={20} />
                    {/if}
                  </span>
                  <div class="item-text">
                    <span class="item-title">{item.label}</span>
                    {#if item.subtitle}
                      <span class="item-subtitle">{item.subtitle}</span>
                    {/if}
                  </div>
                </div>
                <label class="toggle">
                  <input
                    type="checkbox"
                    checked={selectedOptions[item.label] ?? item.value ?? false}
                    onchange={(e) => handleToggle(item, e.target.checked)}
                  />
                  <span class="toggle-slider"></span>
                </label>
              </label>

            {:else if item.type === 'select'}
              <button
                class="item-button"
                onclick={() => openSelectModal(item)}
              >
                <div class="item-content">
                  <span class="item-icon" style="color: var(--settings-brand)">
                    {#if item.icon}
                      <Icon name={item.icon} size={20} />
                    {/if}
                  </span>
                  <div class="item-text">
                    <span class="item-title">{item.label}</span>
                    {#if item.subtitle || item.value}
                      <span class="item-subtitle">{item.value || item.subtitle}</span>
                    {/if}
                  </div>
                </div>
                <span class="item-arrow">
                  <Icon name="chevron-right" size={16} />
                </span>
              </button>

            {:else if item.type === 'link'}
              <a
                href={item.href || '#'}
                class="item-button"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <div class="item-content">
                  <span class="item-icon" style="color: var(--settings-brand)">
                    {#if item.icon}
                      <Icon name={item.icon} size={20} />
                    {/if}
                  </span>
                  <div class="item-text">
                    <span class="item-title">{item.label}</span>
                    {#if item.subtitle}
                      <span class="item-subtitle">{item.subtitle}</span>
                    {/if}
                  </div>
                </div>
                <span class="item-arrow">
                  <Icon name="chevron-right" size={16} />
                </span>
              </a>

            {:else if item.type === 'action'}
              <button
                class="item-button"
                onclick={() => handleAction(item)}
              >
                <div class="item-content">
                  <span class="item-icon" style="color: var(--settings-brand)">
                    {#if item.icon}
                      <Icon name={item.icon} size={20} />
                    {/if}
                  </span>
                  <div class="item-text">
                    <span class="item-title" class:item-title--destructive={item.destructive}>
                      {item.label}
                    </span>
                    {#if item.subtitle}
                      <span class="item-subtitle">{item.subtitle}</span>
                    {/if}
                  </div>
                </div>
                <span class="item-arrow">
                  <Icon name="chevron-right" size={16} />
                </span>
              </button>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<Modal
  open={selectModalOpen}
  title={selectedItem?.label || 'Select'}
  onclose={() => { selectModalOpen = false; selectedItem = null; }}
>
  {#each selectedItem?.options || [] as option}
    <button
      class="select-option"
      class:select-option--selected={selectedOptions[selectedItem?.label] === option}
      onclick={() => selectOption(option)}
    >
      <span class="option-label">{option}</span>
      {#if selectedOptions[selectedItem?.label] === option}
        <Icon name="check" size={18} style="color: var(--settings-brand)" />
      {/if}
    </button>
  {/each}
</Modal>

<style>
  .stitch-settings {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
  }

  .settings-section {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .section-title {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-label);
    margin: 0;
    padding: 0 var(--space-2);
  }

  .settings-group {
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .settings-item {
    border-bottom: 1px solid var(--c-border);
  }

  .settings-item:last-child {
    border-bottom: none;
  }

  .item-button,
  .item-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-sans);
    min-height: var(--tap-target);
    transition: background var(--duration-fast);
  }

  .item-button:hover {
    background: var(--c-surface-container-low);
  }

  .item-button:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: -2px;
  }

  .item-content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex: 1;
    min-width: 0;
  }

  .item-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .item-title {
    font-size: var(--text-body);
    font-weight: var(--weight-medium);
    color: var(--c-text);
    line-height: var(--leading-snug);
  }

  .item-title--destructive {
    color: var(--c-alert-urgent);
  }

  .item-subtitle {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    line-height: var(--leading-snug);
  }

  .item-arrow {
    flex-shrink: 0;
    color: var(--c-text-tertiary);
    display: flex;
    align-items: center;
  }

  .toggle {
    position: relative;
    display: inline-flex;
    cursor: pointer;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .toggle-slider {
    width: 44px;
    height: 24px;
    background: var(--c-outline-variant);
    border-radius: var(--radius-full);
    position: relative;
    transition: background var(--duration-fast);
  }

  .toggle-slider::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: var(--c-surface);
    border-radius: var(--radius-full);
    top: 3px;
    left: 3px;
    transition: transform var(--duration-fast) var(--ease-out);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  .toggle input:checked + .toggle-slider {
    background: var(--settings-brand);
  }

  .toggle input:checked + .toggle-slider::before {
    transform: translateX(20px);
  }

  .toggle input:focus-visible + .toggle-slider {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .select-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--space-3) var(--space-4);
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    font-family: var(--font-sans);
    font-size: var(--text-body);
    color: var(--c-text);
    min-height: var(--tap-target);
    border-radius: var(--radius-md);
    transition: background var(--duration-fast);
  }

  .select-option:hover {
    background: var(--c-surface-container-low);
  }

  .select-option:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: -2px;
  }

  .select-option--selected {
    background: color-mix(in srgb, var(--settings-brand) 8%, var(--c-surface-container-low));
  }

  .option-label {
    font-weight: var(--weight-medium);
  }

  @media (prefers-reduced-motion: reduce) {
    .toggle-slider::before {
      transition: none;
    }
  }
</style>
