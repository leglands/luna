<script>
  import Icon from './Icon.svelte';

  let {
    open = false,
    title = '',
    variant = 'sheet',
    onclose = null,
    children,
    class: className = '',
  } = $props();

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && onclose) {
      onclose();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && onclose) {
      onclose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  {#if variant === 'sheet'}
    <div
      class="modal-backdrop modal-backdrop--sheet {className}"
      onclick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div class="modal-sheet">
        <div class="modal-handle" aria-hidden="true"></div>
        {#if title}
          <h2 class="modal-title">{title}</h2>
        {/if}
        <div class="modal-content">
          {#if children}{@render children()}{/if}
        </div>
      </div>
    </div>
  {:else if variant === 'alert'}
    <div
      class="modal-backdrop modal-backdrop--alert {className}"
      onclick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div class="modal-alert">
        {#if title}
          <h2 id="modal-title" class="modal-title">{title}</h2>
        {/if}
        <div class="modal-content">
          {#if children}{@render children()}{/if}
        </div>
      </div>
    </div>
  {:else if variant === 'action'}
    <div
      class="modal-backdrop modal-backdrop--action {className}"
      onclick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Actions'}
    >
      <div class="modal-action">
        {#if title}
          <h2 class="modal-title">{title}</h2>
        {/if}
        <div class="modal-content">
          {#if children}{@render children()}{/if}
        </div>
      </div>
    </div>
  {/if}
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: backdrop-in var(--duration-fast) var(--ease-out);
  }

  .modal-backdrop--sheet {
    background: rgba(0, 0, 0, 0.4);
    align-items: flex-end;
  }

  .modal-backdrop--alert {
    background: rgba(0, 0, 0, 0.5);
    align-items: center;
    padding: var(--space-4);
  }

  .modal-backdrop--action {
    background: rgba(0, 0, 0, 0.4);
    align-items: flex-end;
  }

  .modal-sheet {
    background: var(--c-surface);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: var(--space-3) var(--space-4);
    padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
    width: 100%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
    animation: sheet-slide-up var(--duration-normal) var(--ease-spring);
  }

  .modal-alert {
    background: var(--c-surface);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    width: 100%;
    max-width: 360px;
    text-align: center;
    animation: fade-scale-in var(--duration-normal) var(--ease-spring);
  }

  .modal-action {
    background: var(--c-surface);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
    width: 100%;
    max-width: 600px;
    animation: sheet-slide-up var(--duration-normal) var(--ease-spring);
  }

  .modal-handle {
    width: 36px;
    height: 4px;
    background: var(--c-border);
    border-radius: var(--radius-full);
    margin: 0 auto var(--space-3);
  }

  .modal-title {
    font-size: var(--text-lg);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0 0 var(--space-4) 0;
    text-align: center;
  }

  .modal-content {
    color: var(--c-text);
  }

  @keyframes backdrop-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes sheet-slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes fade-scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal-backdrop,
    .modal-sheet,
    .modal-alert,
    .modal-action {
      animation: none;
    }
  }
</style>
