<script>
  import Icon from './Icon.svelte';

  let {
    expanded = false,
    class: className = '',
  } = $props();
</script>

<div class="privacy-badge {className}">
  {#if expanded}
    <div class="badge-expanded">
      <span class="badge-icon">
        <Icon name="shield-check" size={18} />
      </span>
      <div class="badge-content">
        <p class="badge-title">Private & Encrypted</p>
        <p class="badge-desc">
          Your data is protected with AES-256-GCM encryption and Argon2id key derivation (64MB RAM, 3 iterations). Only you have access to your personal information.
        </p>
      </div>
    </div>
  {:else}
    <span class="badge-compact">
      <Icon name="shield-check" size={14} />
      <span>Private & Encrypted</span>
    </span>
  {/if}
</div>

<style>
  .privacy-badge {
    display: inline-flex;
  }

  .badge-compact {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-1) var(--space-2);
    background: color-mix(in srgb, var(--c-success) 10%, transparent);
    color: var(--c-success);
    border-radius: var(--radius-full);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
  }

  .badge-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: var(--c-success);
  }

  .badge-expanded {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-3);
    background: color-mix(in srgb, var(--c-success) 8%, var(--c-surface-container-low));
    border-radius: var(--radius-lg);
    max-width: 320px;
  }

  .badge-content {
    flex: 1;
    min-width: 0;
  }

  .badge-title {
    font-size: var(--text-sm);
    font-weight: var(--weight-semibold);
    color: var(--c-success);
    margin: 0 0 var(--space-1) 0;
  }

  .badge-desc {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
</style>
