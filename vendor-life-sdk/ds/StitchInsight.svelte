<script>
  import { onMount } from 'svelte';
  import AIInsightCard from './AIInsightCard.svelte';
  import EvidenceCard from './EvidenceCard.svelte';
  import PebbleButton from './PebbleButton.svelte';
  import MedicalDisclaimer from './MedicalDisclaimer.svelte';

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
    insight = '',
    source = '',
    doi = '',
    icon = 'sparkles',
    actions = [],
    medical = false,
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let visible = $state(false);
  let reducedMotion = $state(false);

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      visible = true;
    });
  });
</script>

<div
  class="stitch-insight"
  class:stitch-insight--visible={visible}
  style="--insight-brand: {brandColor}"
>
  <div class="insight-main">
    <AIInsightCard
      {brand}
      text={insight}
      disclaimer="AI Insight"
      icon={icon}
    />
  </div>

  {#if source || doi}
    <div class="evidence-section">
      <EvidenceCard
        text={source}
        {doi}
        icon="book-open"
      />
    </div>
  {/if}

  {#if medical}
    <div class="disclaimer-section">
      <MedicalDisclaimer />
    </div>
  {/if}

  {#if actions.length > 0}
    <div class="actions-section">
      {#each actions as action}
        <PebbleButton
          {brand}
          label={action.label}
          variant="secondary"
          size="md"
          onclick={action.onclick}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .stitch-insight {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-4);
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity var(--duration-normal) var(--ease-out),
      transform var(--duration-normal) var(--ease-spring);
  }

  .stitch-insight--visible {
    opacity: 1;
    transform: translateY(0);
  }

  .evidence-section,
  .disclaimer-section {
    animation: insight-slide-up var(--duration-normal) var(--ease-spring);
    animation-delay: 100ms;
    animation-fill-mode: both;
  }

  .actions-section {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    animation: insight-slide-up var(--duration-normal) var(--ease-spring);
    animation-delay: 200ms;
    animation-fill-mode: both;
  }

  @keyframes insight-slide-up {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .stitch-insight {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .evidence-section,
    .disclaimer-section,
    .actions-section {
      animation: none;
    }
  }
</style>
