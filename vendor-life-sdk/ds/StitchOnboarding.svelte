<script>
  import { onMount } from 'svelte';
  import PebbleButton from './PebbleButton.svelte';
  import Icon from './Icon.svelte';

  let { steps = [], brand = 'luna', onComplete = () => {}, onSkip = () => {} } = $props();

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let currentStep = $state(0);
  let touchStartX = $state(0);
  let touchEndX = $state(0);
  let reducedMotion = $state(false);
  let translateX = $state(0);

  const isLastStep = $derived(currentStep === steps.length - 1);
  const progress = $derived(((currentStep + 1) / steps.length) * 100);

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const stored = localStorage.getItem(`life-${brand}-onboarded`);
    if (stored === 'true') {
      onComplete();
    }
  });

  function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (!reducedMotion) {
      translateX = -diff * 0.3;
    }
  }

  function handleTouchEnd() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentStep < steps.length - 1) {
        nextStep();
      } else if (diff < 0 && currentStep > 0) {
        prevStep();
      }
    }
    translateX = 0;
  }

  function nextStep() {
    if (isLastStep) {
      complete();
    } else {
      currentStep++;
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }

  function complete() {
    localStorage.setItem(`life-${brand}-onboarded`, 'true');
    onComplete();
  }

  function skip() {
    localStorage.setItem(`life-${brand}-onboarded`, 'true');
    onSkip();
  }
</script>

<div class="stitch-onboarding" style="--onboard-brand: {brandColor}">
  <div class="onboarding-header">
    <button class="skip-btn" onclick={skip} aria-label="Skip onboarding">
      Skip
    </button>
  </div>

  <div
    class="slides-container"
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
    role="region"
    aria-label="Onboarding slides"
  >
    <div
      class="slides-track"
      style="transform: translateX({-currentStep * 100 + translateX}%); transition: {reducedMotion ? 'none' : 'transform var(--duration-normal) var(--ease-spring)'}"
    >
      {#each steps as step, i}
        <div class="slide" aria-hidden={i !== currentStep}>
          <div class="illustration-area">
            {#if step.illustration}
              <div class="illustration">
                {@html step.illustration}
              </div>
            {:else}
              <div class="illustration-placeholder">
                <Icon name="sparkles" size={48} />
              </div>
            {/if}
          </div>
          <div class="content-area">
            <h2 class="slide-title">{step.title}</h2>
            {#if step.subtitle}
              <p class="slide-subtitle">{step.subtitle}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="onboarding-footer">
    <div class="progress-dots" role="tablist" aria-label="Slide progress">
      {#each steps as _, i}
        <button
          class="dot"
          class:dot--active={i === currentStep}
          onclick={() => currentStep = i}
          role="tab"
          aria-selected={i === currentStep}
          aria-label="Go to slide {i + 1}"
        ></button>
      {/each}
    </div>

    <div class="cta-area">
      <PebbleButton
        {brand}
        label={isLastStep ? 'Get Started' : 'Next'}
        variant="primary"
        size="lg"
        icon={isLastStep ? 'sparkles' : 'arrow-right'}
        onclick={nextStep}
      />
    </div>
  </div>
</div>

<style>
  .stitch-onboarding {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    background: var(--c-surface);
  }

  .onboarding-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;
    padding: var(--space-4);
  }

  .skip-btn {
    background: transparent;
    border: none;
    color: var(--c-text-secondary);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    transition: color var(--duration-fast);
  }

  .skip-btn:hover {
    color: var(--c-text);
  }

  .skip-btn:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .slides-container {
    flex: 1;
    overflow: hidden;
    touch-action: pan-y;
  }

  .slides-track {
    display: flex;
    height: 100%;
    will-change: transform;
  }

  .slide {
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
  }

  .illustration-area {
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--onboard-brand) 5%, var(--c-surface-container-low));
    padding: var(--space-8);
  }

  .illustration {
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .illustration :global(svg) {
    width: 100%;
    height: auto;
    max-height: 280px;
  }

  .illustration-placeholder {
    color: var(--onboard-brand);
    opacity: 0.5;
  }

  .content-area {
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-6) var(--space-6) var(--space-4);
  }

  .slide-title {
    font-size: var(--text-title);
    font-weight: var(--weight-semibold);
    color: var(--c-text);
    margin: 0 0 var(--space-2) 0;
    line-height: var(--leading-title);
  }

  .slide-subtitle {
    font-size: var(--text-body);
    color: var(--c-text-secondary);
    margin: 0;
    line-height: var(--leading-relaxed);
    max-width: 320px;
  }

  .onboarding-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-6);
    padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
  }

  .progress-dots {
    display: flex;
    gap: var(--space-2);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--c-outline-variant);
    border: none;
    cursor: pointer;
    padding: 0;
    transition:
      background var(--duration-fast),
      transform var(--duration-fast);
  }

  .dot--active {
    background: var(--onboard-brand);
    transform: scale(1.25);
  }

  .dot:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .cta-area {
    width: 100%;
    max-width: 320px;
  }

  .cta-area :global(.pebble-btn) {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .dot--active {
      transform: none;
    }
  }
</style>
