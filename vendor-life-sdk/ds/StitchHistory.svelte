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
    items = [],
    emptyMessage = 'No history yet',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  function groupByDate(items) {
    const groups = {};
    for (const item of items) {
      const dateKey = item.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    }
    return groups;
  }

  const groupedItems = $derived(groupByDate(items));
  const dateKeys = $derived(Object.keys(groupedItems).sort((a, b) => new Date(b) - new Date(a)));

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }
</script>

<div class="stitch-history" style="--history-brand: {brandColor}">
  {#if items.length === 0}
    <div class="empty-state">
      <span class="empty-icon">
        <Icon name="clock" size={32} />
      </span>
      <p class="empty-message">{emptyMessage}</p>
    </div>
  {:else}
    <div class="timeline">
      {#each dateKeys as dateKey}
        <div class="date-group">
          <h3 class="date-header">{formatDate(dateKey)}</h3>

          <div class="timeline-items">
            {#each groupedItems[dateKey] as item, i}
              <div class="timeline-item">
                <div class="timeline-connector">
                  <div
                    class="timeline-dot"
                    style="background: {item.color || 'var(--history-brand)'}"
                  >
                    {#if item.icon}
                      <Icon name={item.icon} size={12} color="#fff" />
                    {/if}
                  </div>
                  {#if i < groupedItems[dateKey].length - 1}
                    <div class="timeline-line"></div>
                  {/if}
                </div>

                <div class="timeline-content">
                  <div class="item-header">
                    {#if item.icon && !item.color}
                      <span class="item-icon" style="color: var(--history-brand)">
                        <Icon name={item.icon} size={16} />
                      </span>
                    {/if}
                    <span class="item-title">{item.title}</span>
                  </div>
                  {#if item.subtitle}
                    <p class="item-subtitle">{item.subtitle}</p>
                  {/if}
                  {#if item.time}
                    <span class="item-time">{item.time}</span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .stitch-history {
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
    background: var(--c-surface);
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
    text-align: center;
  }

  .empty-icon {
    color: var(--c-text-tertiary);
    margin-bottom: var(--space-3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-message {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .date-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .date-header {
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    color: var(--c-text-secondary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-label);
    margin: 0;
    padding: 0 var(--space-2);
  }

  .timeline-items {
    display: flex;
    flex-direction: column;
  }

  .timeline-item {
    display: flex;
    gap: var(--space-3);
    min-height: 48px;
  }

  .timeline-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 24px;
    flex-shrink: 0;
  }

  .timeline-dot {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .timeline-line {
    width: 2px;
    flex: 1;
    background: var(--c-border);
    margin-top: var(--space-1);
    min-height: 24px;
  }

  .timeline-content {
    flex: 1;
    padding-bottom: var(--space-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }

  .item-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-title {
    font-size: var(--text-body);
    font-weight: var(--weight-medium);
    color: var(--c-text);
    line-height: var(--leading-snug);
  }

  .item-subtitle {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  .item-time {
    font-size: var(--text-xs);
    color: var(--c-text-tertiary);
  }
</style>
