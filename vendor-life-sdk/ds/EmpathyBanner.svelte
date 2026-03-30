<script>
  import Icon from './Icon.svelte';

  let {
    message = null,
    onDismiss = () => {},
    class: className = '',
  } = $props();

  let visible = $state(true);

  function dismiss() {
    visible = false;
    onDismiss();
  }
</script>

{#if visible && message}
  <div
    class="empathy-banner {className}"
    class:empathy-banner--celebration={message.category === 'celebration'}
    role="status"
    aria-live="polite"
  >
    <div class="empathy-icon">
      <Icon name={message.icon || 'heart'} size={20} />
    </div>
    <p class="empathy-text">{message.fallback || message.key}</p>
    <button
      class="empathy-close"
      onclick={dismiss}
      aria-label="Dismiss"
    >
      <Icon name="x" size={16} />
    </button>
  </div>
{/if}

<style>
  .empathy-banner {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    border-inline-start: 3px solid var(--c-brand);
    box-shadow: var(--shadow-sm);
    animation: empathy-slide-in var(--duration-enter) var(--ease-spring);
  }

  .empathy-banner--celebration {
    border-inline-start-color: var(--c-growth);
  }

  .empathy-icon {
    color: var(--c-brand);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-top: 1px;
  }

  .empathy-banner--celebration .empathy-icon {
    color: var(--c-growth);
  }

  .empathy-text {
    flex: 1;
    font-size: var(--text-sm);
    color: var(--c-text);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  .empathy-close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: var(--c-text-tertiary);
    cursor: pointer;
    padding: var(--space-1);
    border-radius: var(--radius-sm);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--duration-fast);
  }

  .empathy-close:hover {
    color: var(--c-text);
  }

  .empathy-close:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  @keyframes empathy-slide-in {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .empathy-banner {
      animation: none;
    }
  }
</style>
