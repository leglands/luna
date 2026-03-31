<script>
  // FeatureTour — 5-step coach marks shown once after onboarding
  // Triggered when localStorage 'life-luna-tour-pending' === '1'
  // Dismissed: sets 'life-luna-tour-done' = '1'

  let { onDone = () => {} } = $props();

  const BRAND = '#E91E8C';

  const STEPS = [
    {
      id: 'ring',
      title: 'Your cycle at a glance',
      body: 'The ring shows where you are in your cycle — menstrual, follicular, ovulation, luteal.',
      icon: '◎',
      anchor: 'home',
    },
    {
      id: 'log',
      title: 'Log in seconds',
      body: 'Tap "Log today" to record flow, mood, symptoms and temperature. The more you log, the smarter Luna gets.',
      icon: '+',
      anchor: 'log',
    },
    {
      id: 'fertile',
      title: 'Know your fertile window',
      body: 'The Fertile tab shows your predicted ovulation and most fertile days, based on ACOG guidelines.',
      icon: '♥',
      anchor: 'fertility',
    },
    {
      id: 'insights',
      title: 'Spot your patterns',
      body: 'After a few cycles, Insights shows your average cycle length, common symptoms, and trends.',
      icon: '↗',
      anchor: 'insights',
    },
    {
      id: 'export',
      title: 'Share with your doctor',
      body: 'Export your data as CSV any time from Settings → Export data. Everything stays on your device.',
      icon: '⬇',
      anchor: 'settings',
    },
  ];

  let currentStep = $state(0);
  let visible = $state(true);

  function next() {
    if (currentStep < STEPS.length - 1) {
      currentStep++;
    } else {
      done();
    }
  }

  function done() {
    visible = false;
    localStorage.removeItem('life-luna-tour-pending');
    localStorage.setItem('life-luna-tour-done', '1');
    onDone();
  }

  const step = $derived(STEPS[currentStep]);
  const isLast = $derived(currentStep === STEPS.length - 1);
</script>

{#if visible}
  <div class="tour-overlay" role="dialog" aria-modal="true" aria-label="Feature tour step {currentStep + 1} of {STEPS.length}">
    <div class="tour-card">
      <div class="tour-icon" style="color:{BRAND}">{step.icon}</div>
      <p class="tour-step-count">{currentStep + 1} / {STEPS.length}</p>
      <h2 class="tour-title">{step.title}</h2>
      <p class="tour-body">{step.body}</p>
      <div class="tour-dots">
        {#each STEPS as _, i}
          <span class="tdot" class:active={i === currentStep}></span>
        {/each}
      </div>
      <button
        class="tour-btn"
        style="background:{BRAND}"
        onclick={next}
      >
        {isLast ? 'Got it!' : 'Next'}
      </button>
      <button class="tour-skip" onclick={done}>Skip tour</button>
    </div>
  </div>
{/if}

<style>
  .tour-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .tour-card {
    background: white;
    border-radius: 24px;
    padding: 32px 24px 24px;
    max-width: 340px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  .tour-icon {
    font-size: 40px;
    line-height: 1;
  }

  .tour-step-count {
    font-size: 12px;
    color: #bbb;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .tour-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }

  .tour-body {
    font-size: 15px;
    color: #555;
    line-height: 1.5;
    margin: 0;
  }

  .tour-dots {
    display: flex;
    gap: 6px;
  }

  .tdot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ddd;
    transition: background 0.2s;
  }

  .tdot.active {
    background: #E91E8C;
  }

  .tour-btn {
    width: 100%;
    padding: 14px;
    border-radius: 24px 28px 26px 22px;
    border: none;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 4px;
  }

  .tour-skip {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 13px;
  }

  @media (prefers-reduced-motion: reduce) {
    .tdot { transition: none; }
  }
</style>
