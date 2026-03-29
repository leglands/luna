<script>
  import SegmentedRing from '$ds/SegmentedRing.svelte';

  let {
    segments = 28,
    currentSegment = 1,
    phase = 'follicular',
    dayOfPhase = 1,
    centerText = '',
    centerSubtext = ''
  } = $props();

  const phaseColors = {
    menstrual: '#D4737A',
    follicular: '#E5A855',
    ovulation: '#5BA876',
    luteal: '#6B7FC4'
  };

  const phaseColor = $derived(phaseColors[phase] || phaseColors.follicular);
  const segmentColor = $derived((index) => {
    if (index < currentSegment) return phaseColor;
    return index === currentSegment ? phaseColor : '#E8E0F0';
  });
</script>

<SegmentedRing
  {segments}
  {currentSegment}
  segmentColor={segmentColor}
  glowColor={phaseColor}
  {centerText}
  {centerSubtext}
/>
