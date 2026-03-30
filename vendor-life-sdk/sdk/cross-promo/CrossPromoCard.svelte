<script>
  import Icon from '../ds/Icon.svelte';

  let {
    targetApp = '',
    targetColor = '#7BA7A7',
    icon = 'heart',
    title = '',
    body = '',
    ctaLabel = '',
    ctaHref = '',
    dismissible = true,
    ondismiss = () => {},
    onaction = () => {},
    class: className = '',
  } = $props();

  let visible = $state(true);

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
      <p class="promo-title">{title}</p>
      <p class="promo-body">{body}</p>

      <button class="promo-cta" onclick={handleAction}>
        {ctaLabel}
        <Icon name="arrow-right" size={14} />
      </button>
    </div>

    {#if dismissible}
      <button class="promo-close" onclick={dismiss} aria-label="Dismiss">
        <Icon name="x" size={16} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .cross-promo-card {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    margin: var(--space-2, 8px) var(--space-3, 12px);
    background: var(--c-surface, #fff);
    border-radius: var(--radius-lg, 20px);
    border-inline-start: 3px solid var(--promo-color);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));
    animation: promo-slide-in var(--duration-enter, 250ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  }

  .promo-icon {
    color: var(--promo-color);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .promo-content {
    flex: 1;
    min-width: 0;
  }

  .promo-title {
    font-size: var(--text-sm, 0.9375rem);
    font-weight: var(--weight-semibold, 600);
    color: var(--c-text, #2D2926);
    margin: 0 0 var(--space-1, 4px) 0;
    line-height: 1.4;
  }

  .promo-body {
    font-size: var(--text-xs, 0.875rem);
    color: var(--c-text-secondary, #5A5650);
    line-height: 1.5;
    margin: 0 0 var(--space-3, 12px) 0;
  }

  .promo-cta {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1, 4px);
    padding: var(--space-2, 8px) var(--space-4, 16px);
    background: var(--promo-color);
    color: #fff;
    border: none;
    border-radius: var(--radius-full, 9999px);
    font-size: var(--text-xs, 0.875rem);
    font-weight: var(--weight-semibold, 600);
    cursor: pointer;
    transition: opacity var(--duration-fast, 120ms);
  }

  .promo-cta:hover {
    opacity: 0.9;
  }

  .promo-cta:focus-visible {
    outline: 2px solid var(--promo-color);
    outline-offset: 2px;
  }

  .promo-close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: var(--c-text-tertiary, #8A8580);
    cursor: pointer;
    padding: 2px;
    border-radius: var(--radius-sm, 6px);
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .promo-close:hover {
    color: var(--c-text, #2D2926);
  }

  @keyframes promo-slide-in {
    from { opacity: 0; transform: translateY(-8px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .cross-promo-card {
      animation: none;
    }
  }
</style>
