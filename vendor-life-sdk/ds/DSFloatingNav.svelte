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
    tabs = [],
    active = '',
    brand = 'luna',
    onchange = null,
    onfab = null,
    daisyOpen = false,
    fabIcon = 'plus',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  function handleTabClick(tabId) {
    if (onchange) onchange(tabId);
  }

  function handleFabClick() {
    if (onfab) onfab();
  }

  const fabIndex = $derived(Math.floor(tabs.length / 2));
</script>

<nav class="floating-nav">
  {#each tabs as tab, i}
    {#if i === fabIndex && onfab}
      <button
        class="nav-fab"
        class:nav-fab--open={daisyOpen}
        style="--fab-brand: {brandColor}"
        onclick={handleFabClick}
        aria-label="Open menu"
      >
        <Icon name={daisyOpen ? 'x' : fabIcon} size={24} color="#fff" />
      </button>
    {/if}

    <button
      class="nav-tab"
      class:nav-tab--active={active === tab.id}
      style="--tab-brand: {brandColor}"
      onclick={() => handleTabClick(tab.id)}
      aria-label={tab.label}
      aria-current={active === tab.id ? 'page' : undefined}
    >
      {#if tab.icon}
        <Icon name={tab.icon} size={22} />
      {/if}
      <span class="nav-tab-label">{tab.label}</span>
    </button>
  {/each}
</nav>

<style>
  .floating-nav {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    min-width: min(calc(100% - 32px), 440px);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 40px;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--space-2) var(--space-3);
    gap: var(--space-1);
    z-index: 100;
  }

  .nav-tab {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: var(--space-2) var(--space-3);
    border: none;
    background: transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    color: var(--c-text-secondary);
    min-width: 52px;
    min-height: var(--tap-target);
    transition:
      color var(--duration-fast) var(--ease-out),
      background var(--duration-fast) var(--ease-out);
  }

  .nav-tab:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .nav-tab--active {
    color: var(--tab-brand);
  }

  .nav-tab-label {
    font-size: 10px;
    font-weight: var(--weight-medium);
    line-height: 1;
  }

  .nav-fab {
    width: 56px;
    height: 56px;
    border: none;
    background: var(--fab-brand);
    border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    margin-top: -16px;
    transform: translateY(0);
    transition:
      transform var(--duration-fast) var(--ease-spring),
      border-radius var(--duration-fast) var(--ease-spring);
    box-shadow: var(--shadow-md);
  }

  .nav-fab:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .nav-fab--open {
    transform: translateY(-4px) rotate(45deg);
    border-radius: 60% 40% 40% 60% / 30% 60% 40% 70%;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-fab {
      transition: none;
    }

    .nav-fab--open {
      transform: translateY(-4px);
      border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
    }
  }
</style>
