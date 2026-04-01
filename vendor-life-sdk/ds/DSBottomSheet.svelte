<script>
  import Icon from './Icon.svelte';

  let {
    open = false,
    title = '',
    onclose = null,
    maxHeight = '85vh',
  } = $props();

  function handleKeydown(e) {
    if (e.key === 'Escape' && open && onclose) {
      onclose();
    }
  }

  function handleOverlayClick() {
    if (onclose) onclose();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div
  class="sheet-overlay"
  class:sheet-overlay--open={open}
  onclick={handleOverlayClick}
  role="presentation"
></div>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="sheet-panel"
  class:sheet-panel--open={open}
  style="--sheet-max: {maxHeight}"
  role="dialog"
  aria-modal="true"
  aria-label={title}
  onclick={(e) => e.stopPropagation()}
>
  <div class="sheet-drag-handle" role="presentation"></div>

  <header class="sheet-header">
    <span class="sheet-title">{title}</span>
    {#if onclose}
      <button class="sheet-close" onclick={onclose} aria-label="Close">
        <Icon name="x" size={20} />
      </button>
    {/if}
  </header>

  <div class="sheet-content">
    <slot />
  </div>
</div>

<style>
  .sheet-overlay {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--duration-normal) var(--ease-out),
      visibility var(--duration-normal) var(--ease-out);
    pointer-events: none;
  }

  .sheet-overlay--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .sheet-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--c-surface, #fff);
    border-radius: 24px 24px 0 0;
    max-height: var(--sheet-max, 85vh);
    overflow-y: auto;
    z-index: 201;
    transform: translateY(100%);
    transition: transform 300ms var(--ease-out);
    pointer-events: none;
    visibility: hidden;
  }

  .sheet-panel--open {
    transform: translateY(0);
    pointer-events: auto;
    visibility: visible;
  }

  .sheet-drag-handle {
    width: 40px;
    height: 4px;
    background: #D0D0D0;
    border-radius: 9999px;
    margin: 12px auto;
  }

  .sheet-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-4) var(--space-3);
  }

  .sheet-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
  }

  .sheet-close {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    color: var(--c-text-secondary);
    padding: 0;
  }

  .sheet-close:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .sheet-content {
    padding: 0 var(--space-4) env(safe-area-inset-bottom, var(--space-4));
  }
</style>
