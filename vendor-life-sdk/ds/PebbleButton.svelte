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
    'data-testid': dataTestid = undefined,
    ...restProps
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
  const iconSize = { sm: 14, md: 16, lg: 18 }[size] ?? 16;

  function handleMouseEnter(e) {
    if (disabled || loading) return;
    const angle = Math.random() * 6 - 3;
    e.currentTarget.style.setProperty('--pebble-rot', `${angle}deg`);
  }

  function handleMouseLeave(e) {
    e.currentTarget.style.setProperty('--pebble-rot', '0deg');
  }
</script>

<button
  class="pebble-btn pebble-btn--{size} pebble-btn--{variant} {className}"
  class:pebble-btn--loading={loading}
  disabled={disabled || loading}
  {onclick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  style="--pebble-brand: {brandColor}"
  data-testid={dataTestid}
  {...restProps}
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
    /* Organic pebble radius — fixed px so it never telescopes on wide buttons.
       v-radii < h/2 keeps overflow:hidden from clipping text. */
    border-radius: 24px 22px 26px 28px / 18px 16px 20px 20px;
    box-shadow:
      0 4px 16px color-mix(in srgb, var(--pebble-brand) 30%, transparent),
      0 2px 6px  color-mix(in srgb, var(--pebble-brand) 20%, transparent);
    transition:
      transform var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out),
      opacity var(--duration-fast) var(--ease-out);
    position: relative;
    overflow: hidden;
    --pebble-rot: 0deg;
    transform: rotate(var(--pebble-rot, 0deg)) translateZ(0);
  }

  .pebble-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    pointer-events: none;
  }

  .pebble-btn:active:not(:disabled) {
    transform: scale(0.96) rotate(-1deg) translateZ(0);
    box-shadow: 0 1px 4px color-mix(in srgb, var(--pebble-brand) 20%, transparent);
  }

  .pebble-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pebble-btn:focus-visible {
    outline: 3px solid var(--c-focus, var(--pebble-brand));
    outline-offset: 3px;
  }

  /* Sizes — taller than standard to give the pebble its plump silhouette */
  .pebble-btn--sm {
    min-height: 44px;
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
  }

  .pebble-btn--md {
    min-height: 56px;
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-sm);
  }

  .pebble-btn--lg {
    min-height: 64px;
    padding: var(--space-4) var(--space-7);
    font-size: var(--text-base);
  }

  .pebble-btn--primary {
    background: var(--pebble-brand);
    color: #fff;
  }

  .pebble-btn--primary:hover:not(:disabled) {
    box-shadow:
      0 8px 28px color-mix(in srgb, var(--pebble-brand) 40%, transparent),
      0 4px 12px color-mix(in srgb, var(--pebble-brand) 25%, transparent);
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
