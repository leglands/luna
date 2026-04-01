<script>
  /**
   * SegmentedRing — DS component matching iOS DSSegmentedRing
   *
   * segments: Array of { value: number (0-1, proportion), color: string, label: string }
   *   If value is omitted, falls back to equal division (1/n each).
   *
   * Matches iOS: active segment wider (strokeWidth+8), pulsing glow,
   * 2° gap between segments, proportional arcs.
   */
  import { onMount } from 'svelte';

  let {
    segments = [],
    currentIndex = 0,
    centerText = '',
    centerSubtext = '',
    size = 200,
    class: className = '',
  } = $props();

  let reducedMotion = $state(false);
  let pulsing = $state(false);

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      setTimeout(() => { pulsing = true; }, 100);
    }
  });

  const GAP_DEG = 2; // 2° gap between segments (matches iOS)
  const BASE_SW  = 12;
  const ACTIVE_SW = 20;

  const cx = $derived(size / 2);
  const cy = $derived(size / 2);
  const radius = $derived((size - ACTIVE_SW - 4) / 2);

  // Normalise: sum all values and divide — works with proportions (0-1) OR day counts (5,9,3,11)
  const totalValue = $derived(
    segments.reduce((s, seg) => s + (seg.value ?? 1), 0)
  );
  const normSegments = $derived(
    segments.map(seg => ({
      ...seg,
      norm: totalValue > 0 ? (seg.value ?? 1) / totalValue : 1 / segments.length
    }))
  );

  function toRad(deg) { return (deg - 90) * Math.PI / 180; }

  function polarXY(angleDeg) {
    const r = toRad(angleDeg);
    return { x: cx + radius * Math.cos(r), y: cy + radius * Math.sin(r) };
  }

  function arcPath(startDeg, endDeg) {
    const s = polarXY(startDeg);
    const e = polarXY(endDeg);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  // Build arc paths with proportional angles
  const arcPaths = $derived(() => {
    let cursor = 0;
    return normSegments.map((seg, i) => {
      const span = seg.norm * 360;
      const startDeg = cursor + GAP_DEG / 2;
      const endDeg   = cursor + span - GAP_DEG / 2;
      cursor += span;
      const isActive = i === currentIndex;
      return {
        ...seg,
        path: arcPath(startDeg, endDeg),
        isActive,
        sw: isActive ? ACTIVE_SW : BASE_SW,
      };
    });
  });
</script>

<div
  class="segmented-ring {className}"
  style="width:{size}px;height:{size}px"
  role="img"
  aria-label="{centerText} {centerSubtext}"
>
  <svg
    width={size}
    height={size}
    viewBox="0 0 {size} {size}"
    aria-hidden="true"
    overflow="visible"
  >
    <!-- Track -->
    <circle
      cx={cx} cy={cy} r={radius}
      fill="none"
      stroke="var(--c-surface-container, #f0f0f0)"
      stroke-width={BASE_SW}
    />

    {#each arcPaths() as arc}
      <!-- Glow (active only) -->
      {#if arc.isActive && !reducedMotion}
        <path
          d={arc.path}
          fill="none"
          stroke={arc.color}
          stroke-width={arc.sw + 10}
          stroke-linecap="round"
          opacity="0"
          class:glow-pulse={pulsing}
          style="--glow-color:{arc.color}"
        />
      {/if}
      <!-- Arc -->
      <path
        d={arc.path}
        fill="none"
        stroke={arc.color}
        stroke-width={arc.sw}
        stroke-linecap="round"
        class:arc-active={arc.isActive}
        style={arc.isActive ? `filter:drop-shadow(0 0 6px ${arc.color}88)` : ''}
      />
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
    flex-shrink: 0;
  }

  svg {
    position: absolute;
    inset: 0;
  }

  .ring-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 1;
    pointer-events: none;
  }

  .ring-text {
    font-size: var(--text-xl, 22px);
    font-weight: var(--weight-semibold, 600);
    color: var(--c-text, #111);
    line-height: 1.1;
  }

  .ring-subtext {
    font-size: var(--text-xs, 12px);
    color: var(--c-text-secondary, #666);
    line-height: 1.2;
    margin-top: 2px;
  }

  .glow-pulse {
    animation: glow 2s ease-in-out infinite;
  }

  @keyframes glow {
    0%, 100% { opacity: 0.25; }
    50%       { opacity: 0.08; }
  }

  @media (prefers-reduced-motion: reduce) {
    .glow-pulse { animation: none; opacity: 0.12; }
  }
</style>
