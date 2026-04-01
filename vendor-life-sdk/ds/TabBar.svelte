<script>
  import Icon from './Icon.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A', aura: '#E8A87C', sienna: '#E64A19',
    alma: '#7BA7A7', nova: '#6366F1', aida: '#8B5CF6',
    vera: '#F48FB1', vita: '#A5D6A7', stella: '#FFB74D', aria: '#4FC3F7',
  };

  let {
    tabs = [],
    activeTab = '',
    activeIndex = 0,
    onchange = null,
    brand = 'luna',
    class: className = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  // Resolve active index from either string id or number
  const resolvedIndex = $derived(
    activeTab
      ? tabs.findIndex(t => t.id === activeTab)
      : activeIndex
  );
</script>

<nav
  class="tab-bar {className}"
  style="--tab-brand: {brandColor}"
  role="tablist"
  aria-label="Main navigation"
>
  {#each tabs.slice(0, 5) as tab, i}
    {#if onchange}
      <button
        class="tab-item"
        class:tab-item--active={i === resolvedIndex}
        role="tab"
        aria-selected={i === resolvedIndex}
        aria-label={tab.label}
        onclick={() => onchange(tab.id)}
      >
        <span class="tab-icon"><Icon name={tab.icon ?? 'home'} size={20} /></span>
        <span class="tab-label">{tab.label}</span>
      </button>
    {:else}
      <a
        href={tab.href}
        class="tab-item"
        class:tab-item--active={i === resolvedIndex}
        role="tab"
        aria-selected={i === resolvedIndex}
        aria-label={tab.label}
      >
        <span class="tab-icon"><Icon name={tab.icon ?? 'home'} size={20} /></span>
        <span class="tab-label">{tab.label}</span>
      </a>
    {/if}
  {/each}
</nav>

<style>
  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: var(--c-surface);
    border-top: 1px solid var(--c-border);
    padding: var(--space-2) 0;
    padding-bottom: calc(var(--space-2) + env(safe-area-inset-bottom, 0px));
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: var(--app-max-width, 780px);
    z-index: var(--z-sticky);
  }

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    padding: var(--space-2);
    text-decoration: none;
    color: var(--c-text-tertiary, var(--c-text-secondary));
    border-radius: var(--radius-md);
    transition: color var(--duration-fast), background var(--duration-fast);
    min-width: var(--tap-target);
    min-height: var(--tap-target);
    -webkit-tap-highlight-color: transparent;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-sans);
  }

  .tab-item:hover:not(.tab-item--active) {
    color: var(--c-text-secondary);
    background: var(--c-surface-raised);
  }

  .tab-item:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .tab-item--active {
    color: var(--tab-brand);
  }

  .tab-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    line-height: var(--leading-tight);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .tab-item { transition: none; }
  }
</style>
