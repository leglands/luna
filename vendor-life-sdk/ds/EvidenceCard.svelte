<script>
  import Icon from './Icon.svelte';

  let {
    text = '',
    source = '',
    doi = '',
    icon = 'book-open',
    class: className = '',
  } = $props();
</script>

<div class="evidence-card {className}">
  <div class="evidence-icon">
    <Icon name={icon} size={18} />
  </div>
  <div class="evidence-content">
    {#if text}
      <p class="evidence-text">{text}</p>
    {/if}
    <div class="evidence-meta">
      {#if source}
        <span class="evidence-source">{source}</span>
      {/if}
      {#if doi}
        <a
          href="https://doi.org/{doi}"
          target="_blank"
          rel="noopener noreferrer"
          class="evidence-doi"
        >
          DOI: {doi}
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  .evidence-card {
    display: flex;
    gap: var(--space-3);
    padding: var(--space-4);
    background: var(--c-surface-container-low);
    border-radius: var(--radius-lg);
    border: none;
  }

  .evidence-icon {
    flex-shrink: 0;
    color: var(--c-text-secondary);
    margin-top: 2px;
  }

  .evidence-content {
    flex: 1;
    min-width: 0;
  }

  .evidence-text {
    font-size: var(--text-sm);
    color: var(--c-text);
    line-height: var(--leading-relaxed);
    margin: 0 0 var(--space-2) 0;
  }

  .evidence-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .evidence-source {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    font-style: italic;
  }

  .evidence-doi {
    font-size: var(--text-xs);
    color: var(--c-brand);
    text-decoration: none;
    word-break: break-all;
  }

  .evidence-doi:hover {
    text-decoration: underline;
  }

  .evidence-doi:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
    border-radius: 2px;
  }
</style>
