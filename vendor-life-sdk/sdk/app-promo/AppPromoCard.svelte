<script>
  /**
   * Mobile app download card — promotes iOS App Store and Google Play.
   * Shows nothing if both store URLs are null (not yet published).
   *
   * @prop {string} appId   - App identifier (luna|aura|sienna|alma|nova|aida)
   * @prop {string} appName - Display name
   * @prop {string} tagline - Short description in current locale
   * @prop {string|null} appStoreUrl  - App Store URL (null = coming soon)
   * @prop {string|null} playStoreUrl - Google Play URL (null = coming soon)
   * @prop {string} color   - Brand accent color (hex)
   * @prop {string} class   - Extra CSS classes
   */
  let {
    appId = '',
    appName = '',
    tagline = '',
    appStoreUrl = null,
    playStoreUrl = null,
    color = '#6B5BD4',
    class: className = '',
  } = $props();
</script>

<aside
  class="app-promo {className}"
  style="--promo-color: {color}"
  aria-label="Download {appName} on mobile"
>
  <div class="promo-identity">
    <span class="promo-dot" aria-hidden="true"></span>
    <div class="promo-text">
      <p class="promo-name">{appName}</p>
      {#if tagline}
        <p class="promo-tagline">{tagline}</p>
      {/if}
    </div>
  </div>

  <div class="badge-row" role="list">
    {#if appStoreUrl}
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="store-badge"
        role="listitem"
        aria-label="Download {appName} on the App Store"
      >
        <!-- Apple mark (simplified) -->
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <span class="badge-label">
          <span class="badge-sub">Download on the</span>
          <span class="badge-main">App Store</span>
        </span>
      </a>
    {:else}
      <span class="store-badge store-badge--soon" role="listitem" aria-label="App Store — coming soon">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <span class="badge-label">
          <span class="badge-sub">Coming soon</span>
          <span class="badge-main">App Store</span>
        </span>
      </span>
    {/if}

    {#if playStoreUrl}
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="store-badge"
        role="listitem"
        aria-label="Download {appName} on Google Play"
      >
        <!-- Google Play triangle mark -->
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M3 20.5v-17c0-.83 1-.95 1.37-.37l14 8.5c.42.26.42.88 0 1.14l-14 8.5C3.71 21.45 3 21.33 3 20.5z"/>
        </svg>
        <span class="badge-label">
          <span class="badge-sub">Get it on</span>
          <span class="badge-main">Google Play</span>
        </span>
      </a>
    {:else}
      <span class="store-badge store-badge--soon" role="listitem" aria-label="Google Play — coming soon">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M3 20.5v-17c0-.83 1-.95 1.37-.37l14 8.5c.42.26.42.88 0 1.14l-14 8.5C3.71 21.45 3 21.33 3 20.5z"/>
        </svg>
        <span class="badge-label">
          <span class="badge-sub">Coming soon</span>
          <span class="badge-main">Google Play</span>
        </span>
      </span>
    {/if}
  </div>
</aside>

<style>
  .app-promo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px) var(--space-5, 20px);
    background: color-mix(in srgb, var(--promo-color) 6%, var(--c-surface, #fff));
    border-radius: var(--radius-lg, 20px);
    border: 1px solid color-mix(in srgb, var(--promo-color) 20%, transparent);
  }

  .promo-identity {
    display: flex;
    align-items: center;
    gap: var(--space-3, 12px);
  }

  .promo-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--promo-color);
    flex-shrink: 0;
  }

  .promo-name {
    font-size: var(--text-sm, 0.9375rem);
    font-weight: 600;
    color: var(--c-text, #2D2926);
    margin: 0;
    line-height: 1.3;
  }

  .promo-tagline {
    font-size: var(--text-xs, 0.8125rem);
    color: var(--c-text-secondary, #5A5650);
    margin: 2px 0 0;
    line-height: 1.4;
  }

  .badge-row {
    display: flex;
    gap: var(--space-2, 8px);
    flex-wrap: wrap;
  }

  .store-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: 0 var(--space-3, 12px);
    height: 44px;
    min-width: 120px;
    background: var(--c-text, #1a1a1a);
    color: #fff;
    border-radius: var(--radius-md, 12px);
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: opacity 120ms ease;
    flex-shrink: 0;
  }

  .store-badge:hover {
    opacity: 0.88;
  }

  .store-badge:focus-visible {
    outline: 2px solid var(--promo-color);
    outline-offset: 2px;
  }

  .store-badge--soon {
    background: var(--c-surface-container, #f0ece8);
    color: var(--c-text-tertiary, #8A8580);
    cursor: default;
  }

  .store-badge--soon:hover {
    opacity: 1;
  }

  .badge-label {
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  .badge-sub {
    font-size: 0.625rem;
    line-height: 1.2;
    opacity: 0.8;
    letter-spacing: 0.01em;
  }

  .badge-main {
    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  @media (prefers-reduced-motion: reduce) {
    .store-badge {
      transition: none;
    }
  }

  @media (max-width: 480px) {
    .app-promo {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
