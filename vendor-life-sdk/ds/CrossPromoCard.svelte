<script>
  import Icon from './Icon.svelte';
  import PebbleButton from './PebbleButton.svelte';

  let {
    targetApp = '',
    targetColor = '#3c684b',
    icon = 'heart',
    title = '',
    body = '',
    ctaLabel = 'Learn more',
    ctaHref = '',
    dismissible = true,
    ondismiss = () => {},
    onaction = () => {},
    class: className = '',
  } = $props();

  let visible = $state(true);

  const brandMap = {
    luna: 'luna',
    aura: 'aura',
    sienna: 'sienna',
    alma: 'alma',
    nova: 'nova',
    aida: 'aida',
  };

  const inferredBrand = $derived(brandMap[targetApp.toLowerCase()] ?? 'luna');

  function dismiss() {
    visible = false;
    ondismiss();
  }

  function handleAction() {
    if (ctaHref) {
      window.open(ctaHref, '_blank', 'noopener');
    }
    onaction();
  }
</script>

{#if visible}
  <div
    class="cross-promo-card {className}"
    style="--promo-color: {targetColor}"
    role="status"
    aria-live="polite"
  >
    <div class="promo-icon">
      <Icon name={icon} size={24} />
    </div>

    <div class="promo-content">
      {#if title}
        <p class="promo-title">{title}</p>
      {/if}
      {#if body}
        <p class="promo-body">{body}</p>
      {/if}

      <PebbleButton
        brand={inferredBrand}
        label={ctaLabel}
        variant="primary"
        size="sm"
        icon="arrow-right"
        onclick={handleAction}
      />
    </div>

    {#if dismissible}
      <button
        class="promo-close"
        onclick={dismiss}
        aria-label="Dismiss"
      >
        <Icon name="x" size={16} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .cross-promo-card {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    border-inline-start: 3px solid var(--promo-color);
    box-shadow: var(--shadow-sm);
    animation: promo-slide-in var(--duration-enter) var(--ease-spring);
  }

  .promo-icon {
    color: var(--promo-color);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-top: 2px;
  }

  .promo-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .promo-title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
    line-height: var(--leading-snug);
  }

  .promo-body {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  .promo-close {
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

  .promo-close:hover {
    color: var(--c-text);
  }

  .promo-close:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  @keyframes promo-slide-in {
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
    .cross-promo-card {
      animation: none;
    }
  }
</style>
