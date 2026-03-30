<script>
  import TabBar from './TabBar.svelte';
  import PrivacyBadge from './PrivacyBadge.svelte';
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
    tabs = [],
    activeTab = 0,
    onTabChange = () => {},
    title = '',
    subtitle = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);
</script>

<div class="stitch-dashboard" style="--dashboard-brand: {brandColor}">
  <header class="dashboard-header">
    <div class="header-gradient" aria-hidden="true"></div>
    <div class="header-content">
      <div class="header-top">
        {#if title}
          <h1 class="dashboard-title">{title}</h1>
        {/if}
        <PrivacyBadge />
      </div>
      {#if subtitle}
        <p class="dashboard-subtitle">{subtitle}</p>
      {/if}
    </div>
  </header>

  <main class="dashboard-content">
    <slot />
  </main>

  <TabBar {tabs} {activeIndex} {brand} {onTabChange} />
</div>

<style>
  .stitch-dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--c-surface);
  }

  .dashboard-header {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    overflow: hidden;
  }

  .header-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--dashboard-brand) 15%, var(--c-surface)) 0%,
      color-mix(in srgb, var(--dashboard-brand) 8%, var(--c-surface)) 50%,
      var(--c-surface) 100%
    );
  }

  .header-content {
    position: relative;
    padding: var(--space-4);
    padding-top: calc(var(--space-4) + env(safe-area-inset-top, 0px));
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .dashboard-title {
    font-size: var(--text-title);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
    line-height: var(--leading-title);
  }

  .dashboard-subtitle {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: var(--space-1) 0 0 0;
    line-height: var(--leading-relaxed);
  }

  .dashboard-content {
    flex: 1;
    padding: var(--space-4);
    padding-bottom: calc(var(--space-4) + 60px + env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
  }
</style>
