<script>
  import Icon from './Icon.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
    stella: '#F59E0B',
    vera: '#E91E8C',
    vita: '#22C55E',
    aria: '#3B82F6',
  };

  let {
    open = false,
    items = [],
    onselect = null,
    onclose = null,
    brand = 'luna',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  function handleSelect(item) {
    if (onselect) onselect(item);
    if (onclose) onclose();
  }

  function handleBackdropClick() {
    if (onclose) onclose();
  }

  function onPetalEnter(e) {
    const rot = (Math.random() * 6 - 3).toFixed(1);
    e.currentTarget.style.setProperty('--petal-rot', `${rot}deg`);
  }

  function onPetalLeave(e) {
    e.currentTarget.style.setProperty('--petal-rot', '0deg');
  }

  const RADIUS = 120;
  const START_ANGLE = -190;
  const END_ANGLE = -10;

  function getPetalPosition(index) {
    const totalItems = items.length;
    const angleStep = (END_ANGLE - START_ANGLE) / (totalItems - 1);
    const angle = START_ANGLE + angleStep * index;
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * RADIUS;
    const y = Math.sin(rad) * RADIUS;
    return { x, y, angle };
  }
</script>

{#if open}
  <div
    class="daisy-backdrop"
    onclick={handleBackdropClick}
    role="presentation"
  ></div>

  <div
    class="daisy-container"
    style="--daisy-brand: {brandColor}"
    role="menu"
    aria-label="Menu"
  >
    {#each items as item, i}
      {@const pos = getPetalPosition(i)}
      <button
        class="daisy-petal"
        style="
          left: calc(50% + {pos.x}px - 32px);
          top: calc(50% + {pos.y}px - 32px);
          background: {item.color || brandColor};
          animation-delay: {i * 40}ms;
        "
        onclick={() => handleSelect(item)}
        onmouseenter={onPetalEnter}
        onmouseleave={onPetalLeave}
        role="menuitem"
        aria-label={item.label}
      >
        <Icon name={item.icon || 'circle'} size={24} color="#fff" />
        <span class="daisy-label">{item.label}</span>
      </button>
    {/each}
  </div>
{/if}

<style>
  .daisy-backdrop {
    position: fixed;
    inset: 0;
    z-index: 150;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.15);
  }

  .daisy-container {
    position: fixed;
    bottom: 88px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    z-index: 151;
  }

  .daisy-petal {
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: var(--radius-pebble);
    border: none;
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.25),
      0 2px 6px  rgba(0, 0, 0, 0.15);
    /* Use individual CSS `scale` for entrance — keeps `transform` free for hover */
    scale: 0;
    opacity: 0;
    animation: petal-appear 220ms var(--ease-spring) forwards;
    /* Only transition transform/shadow/filter — NOT scale (handled by animation) */
    transition:
      transform  var(--duration-fast) var(--ease-out),
      box-shadow var(--duration-fast) var(--ease-out),
      filter     var(--duration-fast) var(--ease-out);
    --petal-rot: 0deg;
  }

  .daisy-petal:hover {
    /* transform is separate from `scale` property → no animation conflict */
    transform: scale(1.12) rotate(var(--petal-rot, 0deg));
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.35),
      0 4px 10px rgba(0, 0, 0, 0.20);
    filter: brightness(1.08);
  }

  .daisy-petal:active {
    transform: scale(0.94) rotate(-2deg);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.20);
    filter: brightness(0.95);
  }

  .daisy-petal:focus-visible {
    outline: 3px solid white;
    outline-offset: 3px;
  }

  .daisy-label {
    font-size: 10px;
    font-weight: var(--weight-medium);
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
    line-height: 1;
  }

  /* Animate only `scale` + `opacity` — leaves `transform` free for hover */
  @keyframes petal-appear {
    from { scale: 0; opacity: 0; }
    to   { scale: 1; opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .daisy-petal { animation: none; scale: 1; opacity: 1; }
    .daisy-petal:hover  { transform: scale(1.05); }
    .daisy-petal:active { transform: scale(0.95); }
  }
</style>
