<script>
  import { onMount } from 'svelte';

  let {
    segments = [],
    currentIndex = 0,
    centerText = '',
    centerSubtext = '',
    size = 120,
    class: className = '',
  } = $props();

  let reducedMotion = $state(false);

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  function polarToCartesian(cx, cy, r, angle) {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  function describeArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  }

  const totalSegments = $derived(segments.length);
  const segmentAngle = $derived(360 / totalSegments);

  const arcPaths = $derived(segments.map((seg, i) => {
    const startAngle = i * segmentAngle;
    const endAngle = startAngle + segmentAngle - 2;
    return {
      ...seg,
      path: describeArc(size / 2, size / 2, radius, startAngle, endAngle),
      isCurrent: i === currentIndex
    };
  }));
</script>

<div
  class="segmented-ring {className}"
  style="--ring-size: {size}px"
  role="img"
  aria-label={centerText || 'Progress ring'}
>
  <svg
    width={size}
    height={size}
    viewBox="0 0 {size} {size}"
    class="ring-svg"
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      fill="none"
      stroke="var(--c-surface-container)"
      stroke-width={strokeWidth}
    />

    {#each arcPaths as arc}
      <g class="arc-group">
        <path
          d={arc.path}
          fill="none"
          stroke={arc.color}
          stroke-width={arc.isCurrent && !reducedMotion ? strokeWidth + 4 : strokeWidth}
          stroke-linecap="round"
          class="arc"
          class:arc--active={arc.isCurrent}
        />
        {#if arc.isCurrent && !reducedMotion}
          <path
            d={arc.path}
            fill="none"
            stroke={arc.color}
            stroke-width={strokeWidth + 8}
            stroke-linecap="round"
            opacity="0.2"
            class="arc-glow"
          />
        {/if}
      </g>
    {/each}
  </svg>

  <div class="ring-center">
    {#if centerText}
      <span class="ring-text">{centerText}</span>
    {/if}
    {#if centerSubtext}
      <span class="ring-subtext">{centerSubtext}</span>
    {/if}
  </div>
</div>

<style>
  .segmented-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--ring-size);
    height: var(--ring-size);
  }

  .ring-svg {
    transform: rotate(-90deg);
    position: absolute;
    inset: 0;
  }

  .arc {
    transition: stroke-width var(--duration-normal) var(--ease-out);
  }

  .arc--active {
    filter: drop-shadow(0 0 6px currentColor);
  }

  .arc-glow {
    animation: arc-pulse 2s ease-in-out infinite;
  }

  @keyframes arc-pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.1; }
  }

  .ring-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
  }

  .ring-text {
    font-size: var(--text-xl);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    line-height: var(--leading-tight);
  }

  .ring-subtext {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    line-height: var(--leading-tight);
    margin-top: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .arc--active {
      filter: none;
    }

    .arc-glow {
      animation: none;
      opacity: 0.15;
    }
  }
</style>
