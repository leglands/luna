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
    name = '',
    avatar = null,
    subtitle = '',
    stats = [],
    children,
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
</script>

<div class="stitch-profile" style="--profile-brand: {brandColor}">
  <div class="profile-header">
    <div class="avatar-container">
      {#if avatar}
        <img src={avatar} alt="{name}'s avatar" class="avatar avatar--image" />
      {:else}
        <div class="avatar avatar--initials">
          <span class="avatar-initials">{getInitials(name)}</span>
        </div>
      {/if}
    </div>

    <div class="profile-info">
      <h1 class="profile-name">{name}</h1>
      {#if subtitle}
        <p class="profile-subtitle">{subtitle}</p>
      {/if}
    </div>
  </div>

  {#if stats.length > 0}
    <div class="stats-row">
      {#each stats.slice(0, 3) as stat}
        <div class="stat-item">
          <span class="stat-icon">
            {#if stat.icon}
              <Icon name={stat.icon} size={18} />
            {/if}
          </span>
          <span class="stat-value">{stat.value}</span>
          <span class="stat-label">{stat.label}</span>
        </div>
      {/each}
    </div>
  {/if}

  {#if children}
    <div class="profile-content">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .stitch-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-6) var(--space-4);
    padding-bottom: calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
    background: var(--c-surface);
  }

  .profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }

  .avatar-container {
    position: relative;
  }

  .avatar {
    width: 96px;
    height: 96px;
    border-radius: var(--radius-full);
    object-fit: cover;
  }

  .avatar--image {
    border: 3px solid var(--profile-brand);
  }

  .avatar--initials {
    background: color-mix(in srgb, var(--profile-brand) 15%, var(--c-surface-container-low));
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid var(--profile-brand);
  }

  .avatar-initials {
    font-size: var(--text-title);
    font-weight: var(--weight-semibold);
    color: var(--profile-brand);
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .profile-name {
    font-size: var(--text-title);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0;
    line-height: var(--leading-title);
  }

  .profile-subtitle {
    font-size: var(--text-sm);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: var(--leading-relaxed);
  }

  .stats-row {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-6);
    padding: var(--space-4);
    background: var(--c-surface-container-low);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 400px;
  }

  .stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-1);
    text-align: center;
  }

  .stat-icon {
    color: var(--profile-brand);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-value {
    font-size: var(--text-headline);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    line-height: var(--leading-snug);
  }

  .stat-label {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    line-height: var(--leading-snug);
  }

  .profile-content {
    width: 100%;
    margin-top: var(--space-4);
  }
</style>
