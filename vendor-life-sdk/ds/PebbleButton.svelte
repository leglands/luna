<script>
  import Icon from './Icon.svelte';

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
    label = '',
    icon = null,
    size = 'md',
    variant = 'primary',
    disabled = false,
    loading = false,
    onclick = null,
    class: className = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
  const iconSize = { sm: 14, md: 16, lg: 18 }[size] ?? 16;
</script>

<button
  class="pebble-btn pebble-btn--{size} pebble-btn--{variant} {className}"
  class:pebble-btn--loading={loading}
  disabled={disabled || loading}
  onclick={onclick}
  style="--pebble-brand: {brandColor}"
>
  {#if loading}
    <span class="pebble-spinner" aria-hidden="true"></span>
  {:else if icon}
    <Icon name={icon} size={iconSize} />
  {/if}

  {#if label}
    <span class="pebble-label">{label}</span>
  {/if}
</button>

<style>
  .pebble-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-none);
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    min-height: var(--tap-target);
    border-radius: 24px 28px 26px 22px;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--pebble-brand) 8%, transparent);
    transition:
      transform var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out),
      opacity var(--duration-fast) var(--ease-out);
    position: relative;
    overflow: hidden;
  }

  .pebble-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    pointer-events: none;
  }

  .pebble-btn:active:not(:disabled) {
    transform: scale(0.95) rotate(-1deg);
  }

  .pebble-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pebble-btn:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .pebble-btn--sm {
    height: var(--btn-height-sm);
    padding: 0 var(--space-3);
    font-size: var(--text-xs);
  }

  .pebble-btn--md {
    height: var(--btn-height-md);
    padding: 0 var(--space-4);
    font-size: var(--text-sm);
  }

  .pebble-btn--lg {
    height: var(--btn-height-lg);
    padding: 0 var(--space-5);
    font-size: var(--text-base);
  }

  .pebble-btn--primary {
    background: var(--pebble-brand);
    color: #fff;
  }

  .pebble-btn--primary:hover:not(:disabled) {
    box-shadow: 0 6px 20px color-mix(in srgb, var(--pebble-brand) 15%, transparent);
  }

  .pebble-btn--secondary {
    background: var(--c-surface-raised);
    color: var(--pebble-brand);
    border: 1px solid color-mix(in srgb, var(--pebble-brand) 20%, transparent);
  }

  .pebble-btn--secondary:hover:not(:disabled) {
    background: color-mix(in srgb, var(--pebble-brand) 8%, var(--c-surface-raised));
  }

  .pebble-btn--ghost {
    background: transparent;
    color: var(--pebble-brand);
  }

  .pebble-btn--ghost:hover:not(:disabled) {
    background: color-mix(in srgb, var(--pebble-brand) 8%, transparent);
  }

  .pebble-label {
    display: inline-flex;
    align-items: center;
  }

  .pebble-spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: var(--radius-full);
    animation: pebble-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes pebble-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pebble-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .pebble-btn--loading.pebble-btn--primary {
    animation: pebble-pulse 1s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .pebble-btn:active:not(:disabled) {
      transform: scale(0.95);
    }

    .pebble-btn--loading.pebble-btn--primary {
      animation: pebble-pulse 2s ease-in-out infinite;
    }

    .pebble-spinner {
      animation-duration: 1.5s;
    }
  }
</style>
