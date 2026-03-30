<script>
  import Icon from './Icon.svelte';

  let {
    icon = 'plus',
    label = '',
    color = '#3c684b',
    active = false,
    onclick = null,
    class: className = '',
  } = $props();
</script>

<button
  class="pebble-action {className}"
  class:pebble-action--active={active}
  onclick={onclick}
  style="--action-color: {color}"
  aria-pressed={active}
>
  <span class="pebble-icon">
    <Icon name={icon} size={24} />
  </span>
  {#if label}
    <span class="pebble-label">{label}</span>
  {/if}
</button>

<style>
  .pebble-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    width: 56px;
    height: 56px;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
    border-radius: 50% 60% 55% 45% / 55% 50% 60% 45%;
    background: var(--c-surface-raised);
    color: var(--action-color);
    transition:
      background var(--duration-fast) var(--ease-out),
      color var(--duration-fast) var(--ease-out),
      transform var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out);
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--action-color) 10%, transparent);
    min-height: var(--tap-target);
  }

  .pebble-action:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px color-mix(in srgb, var(--action-color) 15%, transparent);
  }

  .pebble-action:active:not(:disabled) {
    transform: scale(0.95);
  }

  .pebble-action:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .pebble-action:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .pebble-action--active {
    background: var(--action-color);
    color: #fff;
    box-shadow: 0 4px 16px color-mix(in srgb, var(--action-color) 25%, transparent);
  }

  .pebble-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pebble-label {
    font-size: 10px;
    font-weight: var(--weight-semibold);
    line-height: var(--leading-tight);
    text-align: center;
    max-width: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .pebble-action:hover:not(:disabled) {
      transform: none;
    }

    .pebble-action:active:not(:disabled) {
      transform: scale(0.95);
    }
  }
</style>
