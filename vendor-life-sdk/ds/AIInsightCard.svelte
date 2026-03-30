<script>
  import Icon from './Icon.svelte';
  import PebbleButton from './PebbleButton.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  let {
    text = '',
    disclaimer = 'Generated insight',
    brand = 'luna',
    onLearnMore = null,
    class: className = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
</script>

<div
  class="ai-insight-card {className}"
  style="--insight-brand: {brandColor}"
>
  <div class="insight-header">
    <span class="insight-icon">
      <Icon name="sparkles" size={18} />
    </span>
    <span class="insight-badge">{disclaimer}</span>
  </div>

  {#if text}
    <p class="insight-text">{text}</p>
  {/if}

  {#if onLearnMore}
    <div class="insight-footer">
      <PebbleButton
        {brand}
        label="Learn more"
        variant="ghost"
        size="sm"
        icon="arrow-right"
        onclick={onLearnMore}
      />
    </div>
  {/if}
</div>

<style>
  .ai-insight-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--c-surface-container-low);
    border-radius: var(--radius-lg);
    border: none;
  }

  .insight-header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .insight-icon {
    color: var(--insight-brand);
    display: flex;
    align-items: center;
  }

  .insight-badge {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    font-weight: var(--weight-medium);
  }

  .insight-text {
    font-size: var(--text-sm);
    color: var(--c-text);
    line-height: var(--leading-relaxed);
    margin: 0;
  }

  .insight-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
