<script>
  import CrossPromoCard from './CrossPromoCard.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  const TARGET_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  let {
    sourceApp = '',
    targetApp = '',
    message = '',
    cta = 'Learn more',
    targetUrl = '',
    onDismiss = () => {},
    onAccept = () => {},
  } = $props();

  const targetColor = $derived(TARGET_COLORS[targetApp.toLowerCase()] ?? TARGET_COLORS.luna);
  const STORAGE_KEY = `life-cp-impressions-${sourceApp.toLowerCase()}`;

  function trackImpression() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const today = new Date().toISOString().split('T')[0];
      if (!stored[targetApp]) {
        stored[targetApp] = { date: today, count: 0 };
      }
      stored[targetApp].count++;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      // localStorage not available
    }
  }

  function shouldShow() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const today = new Date().toISOString().split('T')[0];
      const targetData = stored[targetApp];

      if (!targetData) return true;
      if (targetData.date !== today) return true;
      if (targetData.count >= 1) return false;

      return true;
    } catch (e) {
      return true;
    }
  }

  let visible = $state(shouldShow());

  if (visible) {
    trackImpression();
  }

  function handleDismiss() {
    visible = false;
    onDismiss();
  }

  function handleAccept() {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener');
    }
    onAccept();
    visible = false;
  }
</script>

{#if visible}
  <CrossPromoCard
    {targetApp}
    targetColor={targetColor}
    icon="heart"
    title="{sourceApp} loves {targetApp}"
    body={message}
    ctaLabel={cta}
    ctaHref={targetUrl}
    dismissible={true}
    ondismiss={handleDismiss}
    onaction={handleAccept}
  />
{/if}

<style>
  :global(.stitch-cp) {
    position: fixed;
    bottom: calc(60px + env(safe-area-inset-bottom, 0px));
    left: var(--space-4);
    right: var(--space-4);
    z-index: var(--z-sticky);
    max-width: 400px;
    margin: 0 auto;
  }
</style>
