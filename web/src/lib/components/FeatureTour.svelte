<script>
  let { onDone = () => {} } = $props();

  const BRAND = '#E91E8C';
  const PREVIEW_BG = '#E57373';

  const STEPS = [
    { title: 'Your cycle at a glance', body: 'The ring shows where you are in your cycle \u2014 menstrual, follicular, ovulation, luteal.' },
    { title: 'Log in seconds', body: 'Tap \u201cLog today\u201d to record flow, mood, symptoms and temperature. The more you log, the smarter Luna gets.' },
    { title: 'Know your fertile window', body: 'The Fertile tab shows your predicted ovulation and most fertile days, based on ACOG guidelines.' },
    { title: 'Spot your patterns', body: 'After a few cycles, Insights shows your average cycle length, common symptoms, and trends.' },
    { title: 'Share with your doctor', body: 'Export your data as CSV any time from Settings. Everything stays on your device.' },
  ];

  let currentStep = $state(0);
  let visible = $state(true);

  function next() {
    if (currentStep < STEPS.length - 1) { currentStep++; } else { done(); }
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
  <div class="tour-container">

    <!-- Top 60%: visual preview -->
    <div class="tour-preview" style="background:{PREVIEW_BG}">
      {#if currentStep === 0}
        <!-- Cycle ring mock -->
        <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
          <!-- Menstrual arc (0-90deg) -->
          <path d="M 80 14 A 66 66 0 0 1 146 80" fill="none" stroke="#E57373" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
          <!-- Follicular arc (90-180deg) -->
          <path d="M 146 80 A 66 66 0 0 1 80 146" fill="none" stroke="#F48FB1" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
          <!-- Ovulation arc (180-225deg) - highlighted -->
          <path d="M 80 146 A 66 66 0 0 1 33 113" fill="none" stroke="#CE93D8" stroke-width="18" stroke-linecap="round"/>
          <!-- Luteal arc (225-360deg) -->
          <path d="M 33 113 A 66 66 0 0 1 80 14" fill="none" stroke="#9FA8DA" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
          <text x="80" y="74" text-anchor="middle" dominant-baseline="middle" font-size="28" font-weight="700" fill="#fff">14</text>
          <text x="80" y="96" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="rgba(255,255,255,0.8)">Day</text>
        </svg>
      {:else if currentStep === 1}
        <!-- Log form mock -->
        <div class="mock-log">
          <div class="mock-section-label">Period flow</div>
          <div class="mock-chips">
            <span class="mock-chip">None</span>
            <span class="mock-chip">Light</span>
            <span class="mock-chip mock-chip--active">Medium</span>
            <span class="mock-chip">Heavy</span>
          </div>
          <div class="mock-section-label" style="margin-top:14px">Mood</div>
          <div class="mock-scale">
            {#each [1,2,3,4,5] as i}
              <span class="mock-scale-btn" class:mock-scale-btn--active={i === 4}>{i}</span>
            {/each}
          </div>
        </div>
      {:else if currentStep === 2}
        <!-- Fertile window strip -->
        <div class="mock-fertile">
          <div class="fertile-strip">
            {#each [['Mon',false],['Tue',false],['Wed',true,false],['Thu',true,false],['Fri',true,true],['Sat',true,false],['Sun',false]] as [d, fertile, ov]}
              <div class="fertile-day">
                <span class="fertile-label">{d}</span>
                <span
                  class="fertile-dot"
                  style={ov ? 'background:#CE93D8;color:#fff' : fertile ? 'background:#F8BBD9;color:#333' : 'background:rgba(255,255,255,0.2);color:rgba(255,255,255,0.7)'}
                ></span>
              </div>
            {/each}
          </div>
          <div class="fertile-legend">
            <span class="fl-item"><span class="fl-dot" style="background:#F8BBD9"></span>Fertile</span>
            <span class="fl-item"><span class="fl-dot" style="background:#CE93D8"></span>Ovulation</span>
          </div>
        </div>
      {:else if currentStep === 3}
        <!-- Insights bar chart -->
        <svg viewBox="0 0 180 110" width="180" height="110" aria-hidden="true">
          <line x1="10" y1="95" x2="170" y2="95" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <line x1="10" y1="65" x2="170" y2="65" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <line x1="10" y1="35" x2="170" y2="35" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <rect x="22" y="50" width="22" height="45" rx="4" fill="#E57373" opacity="0.8"/>
          <rect x="58" y="30" width="22" height="65" rx="4" fill="#E57373"/>
          <rect x="94" y="42" width="22" height="53" rx="4" fill="#E57373" opacity="0.8"/>
          <rect x="130" y="20" width="22" height="75" rx="4" fill="#E91E8C"/>
          <text x="33" y="108" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.7)">Jan</text>
          <text x="69" y="108" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.7)">Feb</text>
          <text x="105" y="108" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.7)">Mar</text>
          <text x="141" y="108" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.7)">Apr</text>
        </svg>
      {:else}
        <!-- Export mock -->
        <div class="mock-export">
          <div class="export-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E91E8C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span class="export-filename">luna-data.csv</span>
            <div class="export-rows">
              <div class="export-row">2024-01-15 · Medium flow</div>
              <div class="export-row">2024-01-16 · Light flow</div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Bottom 40%: text card -->
    <div class="tour-card">
      <p class="tour-count">{currentStep + 1} / {STEPS.length}</p>
      <h2 class="tour-title">{step.title}</h2>
      <p class="tour-body">{step.body}</p>
      <div class="tour-dots">
        {#each STEPS as _, i}
          <span class="tdot" class:active={i === currentStep}></span>
        {/each}
      </div>
      <button class="tour-btn" style="background:{BRAND}" onclick={next}>
        {isLast ? 'Got it!' : 'Next'}
      </button>
      <button class="tour-skip" onclick={done}>Skip tour</button>
    </div>

  </div>
</div>
{/if}

<style>
  .tour-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4);
  }

  .tour-container {
    width: 100%;
    max-width: 480px;
    max-height: 90dvh;
    display: flex;
    flex-direction: column;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
  }

  .tour-preview {
    flex: 0 0 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6);
    min-height: 200px;
  }

  /* Mock log */
  .mock-log {
    background: rgba(255,255,255,0.15);
    border-radius: 16px;
    padding: 16px 20px;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .mock-section-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.7);
  }
  .mock-chips {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .mock-chip {
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    background: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.85);
    border: 1px solid rgba(255,255,255,0.3);
  }
  .mock-chip--active {
    background: #E91E8C;
    color: #fff;
    border-color: #E91E8C;
  }
  .mock-scale {
    display: flex;
    gap: 6px;
  }
  .mock-scale-btn {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    background: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
  }
  .mock-scale-btn--active {
    background: #E91E8C;
    color: #fff;
  }

  /* Mock fertile */
  .mock-fertile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  .fertile-strip {
    display: flex;
    gap: 8px;
  }
  .fertile-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .fertile-label {
    font-size: 10px;
    color: rgba(255,255,255,0.7);
  }
  .fertile-dot {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: block;
  }
  .fertile-legend {
    display: flex;
    gap: 12px;
  }
  .fl-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: rgba(255,255,255,0.8);
  }
  .fl-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  /* Mock export */
  .mock-export {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .export-card {
    background: rgba(255,255,255,0.15);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 200px;
  }
  .export-filename {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
  .export-rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
  .export-row {
    font-size: 11px;
    color: rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 4px 8px;
  }

  /* Bottom card */
  .tour-card {
    flex: 0 0 40%;
    background: #fff;
    border-radius: 24px 28px 26px 22px;
    padding: var(--space-5) var(--space-5) var(--space-4);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
  }

  .tour-count {
    font-size: 11px;
    color: #bbb;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0;
    font-weight: 600;
  }

  .tour-title {
    font-size: 18px;
    font-weight: 700;
    color: #111;
    margin: 0;
    line-height: 1.3;
  }

  .tour-body {
    font-size: 13px;
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
    min-height: 44px;
    padding: 0 var(--space-4);
    border-radius: 24px 28px 26px 22px;
    border: none;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 2px;
    transition: opacity 0.15s;
  }

  .tour-btn:hover { opacity: 0.9; }

  .tour-skip {
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
    font-size: 13px;
    min-height: 36px;
    padding: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .tdot { transition: none; }
    .tour-btn { transition: none; }
  }
</style>
