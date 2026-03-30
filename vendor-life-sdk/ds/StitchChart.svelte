<script>
  import SegmentedRing from './SegmentedRing.svelte';

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
    type = 'ring',
    data = [],
    title = '',
    unit = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  const maxValue = $derived(Math.max(...data.map(d => d.value), 1));
  const totalValue = $derived(data.reduce((sum, d) => sum + d.value, 0));

  const ringSegments = $derived(data.map((d, i) => ({
    ...d,
    color: d.color || brandColor,
    value: d.value,
  })));

  const ringCurrentIndex = $derived(data.length > 0 ? 0 : -1);
  const ringCenterText = $derived(type === 'ring' && data.length > 0 ? String(data[0].value) : '');
  const ringCenterSubtext = $derived(type === 'ring' && unit ? unit : '');

  function getBarHeight(value) {
    return (value / maxValue) * 100;
  }

  function getLinePath() {
    if (data.length < 2) return '';
    const width = 100;
    const height = 80;
    const stepX = width / (data.length - 1);
    const points = data.map((d, i) => ({
      x: i * stepX,
      y: height - (d.value / maxValue) * height
    }));
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  function getLineArea() {
    if (data.length < 2) return '';
    const width = 100;
    const height = 80;
    const stepX = width / (data.length - 1);
    const points = data.map((d, i) => ({
      x: i * stepX,
      y: height - (d.value / maxValue) * height
    }));
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
    return areaPath;
  }
</script>

<div class="stitch-chart" style="--chart-brand: {brandColor}">
  {#if title}
    <h3 class="chart-title">{title}</h3>
  {/if}

  <div class="chart-content">
    {#if type === 'ring'}
      <div class="ring-container">
        <SegmentedRing
          segments={ringSegments}
          currentIndex={ringCurrentIndex}
          centerText={ringCenterText}
          centerSubtext={ringCenterSubtext}
          size={140}
        />
      </div>
      <div class="ring-legend">
        {#each data as item}
          <div class="legend-item">
            <span class="legend-color" style="background: {item.color || brandColor}"></span>
            <span class="legend-label">{item.label}</span>
            <span class="legend-value">{item.value}{unit}</span>
          </div>
        {/each}
      </div>

    {:else if type === 'bar'}
      <div class="bar-chart">
        <div class="bar-bars">
          {#each data as item}
            <div class="bar-item">
              <div class="bar-track">
                <div
                  class="bar-fill"
                  style="height: {getBarHeight(item.value)}%; background: {item.color || brandColor}"
                ></div>
              </div>
              <span class="bar-label">{item.label}</span>
              <span class="bar-value">{item.value}{unit}</span>
            </div>
          {/each}
        </div>
      </div>

    {:else if type === 'line'}
      <div class="line-chart">
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" class="line-svg">
          <defs>
            <linearGradient id="lineGradient-{brand}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="{brandColor}" stop-opacity="0.3" />
              <stop offset="100%" stop-color="{brandColor}" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            d={getLineArea()}
            fill="url(#lineGradient-{brand})"
          />
          <path
            d={getLinePath()}
            fill="none"
            stroke="{brandColor}"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          {#each data as item, i}
            {@const x = (100 / (data.length - 1)) * i}
            {@const y = 80 - (item.value / maxValue) * 80}
            <circle
              cx={x}
              cy={y}
              r="3"
              fill="{item.color || brandColor}"
            />
          {/each}
        </svg>
        <div class="line-labels">
          {#each data as item}
            <span class="line-label">{item.label}</span>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .stitch-chart {
    padding: var(--space-4);
    background: var(--c-surface);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .chart-title {
    font-size: var(--text-headline);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
  }

  .chart-content {
    width: 100%;
  }

  .ring-container {
    display: flex;
    justify-content: center;
    margin-bottom: var(--space-3);
  }

  .ring-legend {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: var(--radius-sm);
    flex-shrink: 0;
  }

  .legend-label {
    flex: 1;
    font-size: var(--text-sm);
    color: var(--c-text);
  }

  .legend-value {
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    color: var(--c-text-secondary);
  }

  .bar-chart {
    width: 100%;
  }

  .bar-bars {
    display: flex;
    align-items: flex-end;
    gap: var(--space-3);
    height: 120px;
    padding-bottom: var(--space-6);
    position: relative;
  }

  .bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    height: 100%;
  }

  .bar-track {
    flex: 1;
    width: 100%;
    max-width: 40px;
    background: var(--c-surface-container-low);
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .bar-fill {
    width: 100%;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    transition: height var(--duration-normal) var(--ease-out);
    min-height: 4px;
  }

  .bar-label {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    text-align: center;
    position: absolute;
    bottom: 0;
    white-space: nowrap;
  }

  .bar-value {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--c-text);
    position: absolute;
    bottom: 16px;
  }

  .line-chart {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .line-svg {
    width: 100%;
    height: 120px;
  }

  .line-labels {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--space-1);
  }

  .line-label {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .bar-fill {
      transition: none;
    }
  }
</style>
