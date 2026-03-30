<script>
  import Icon from './Icon.svelte';
</script>

<footer class="medical-disclaimer" role="contentinfo">
  <div class="disclaimer-icon">
    <Icon name="info" size={14} />
  </div>
  <p class="disclaimer-text">
    This information does not replace professional medical advice. Always consult a qualified healthcare provider for medical concerns.
  </p>
</footer>

<style>
  .medical-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: var(--c-surface-container-low);
    border-radius: var(--radius-lg);
  }

  .disclaimer-icon {
    flex-shrink: 0;
    color: var(--c-text-tertiary);
    margin-top: 2px;
  }

  .disclaimer-text {
    font-size: var(--text-xs);
    color: var(--c-text-secondary);
    line-height: var(--leading-relaxed);
    margin: 0;
  }
</style>
