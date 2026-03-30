<script>
  import { onMount } from 'svelte';
  import Icon from './Icon.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  let {
    role = 'ai',
    text = '',
    streaming = false,
    typing = false,
    brand = 'luna',
    class: className = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let displayedText = $state('');
  let cursorVisible = $state(true);
  let reducedMotion = $state(false);

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  $effect(() => {
    if (streaming && text) {
      cursorVisible = true;
      displayedText = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          displayedText += text[i];
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    } else if (!streaming) {
      displayedText = text;
    }
  });

  $effect(() => {
    if (streaming) {
      const cursorInterval = setInterval(() => {
        cursorVisible = v => !v;
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  });
</script>

<div
  class="chat-bubble chat-bubble--{role} {className}"
  style="--bubble-brand: {brandColor}"
>
  {#if role === 'ai' && !streaming && !typing}
    <span class="bubble-icon">
      <Icon name="sparkles" size={14} />
    </span>
  {/if}

  <div class="bubble-content">
    {#if typing}
      <span class="typing-indicator" aria-label="Typing">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </span>
    {:else}
      <p class="bubble-text">
        {displayedText}{#if streaming}<span class="cursor" class:cursor--visible={cursorVisible}>|</span>{/if}
      </p>
    {/if}
  </div>
</div>

<style>
  .chat-bubble {
    display: flex;
    gap: var(--space-2);
    max-width: 80%;
    animation: bubble-slide-in var(--duration-normal) var(--ease-spring);
  }

  .chat-bubble--ai {
    align-self: flex-start;
    flex-direction: row;
  }

  .chat-bubble--user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }

  .bubble-icon {
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 6px;
    color: var(--bubble-brand);
  }

  .bubble-content {
    padding: var(--space-3) var(--space-4);
    line-height: var(--leading-normal);
  }

  .chat-bubble--ai .bubble-content {
    background: color-mix(in srgb, var(--bubble-brand) 8%, var(--c-surface));
    border-radius: 20px 20px 20px 4px;
    color: var(--c-text);
  }

  .chat-bubble--user .bubble-content {
    background: color-mix(in srgb, var(--bubble-brand) 15%, var(--c-surface-container-low));
    border-radius: 20px 20px 4px 20px;
    color: var(--c-text);
  }

  .bubble-text {
    font-size: var(--text-sm);
    margin: 0;
    word-wrap: break-word;
  }

  .cursor {
    color: var(--bubble-brand);
    font-weight: var(--weight-bold);
    opacity: 0;
    transition: opacity var(--duration-fast);
  }

  .cursor--visible {
    opacity: 1;
  }

  .typing-indicator {
    display: inline-flex;
    gap: 4px;
    padding: var(--space-1) 0;
  }

  .typing-dot {
    width: 6px;
    height: 6px;
    background: var(--c-text-secondary);
    border-radius: var(--radius-full);
    animation: typing-bounce 1.4s ease-in-out infinite;
  }

  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing-bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }

  @keyframes bubble-slide-in {
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
    .chat-bubble {
      animation: none;
    }

    .cursor {
      animation: cursor-blink 1s step-end infinite;
    }

    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    .typing-dot {
      animation: none;
      opacity: 0.5;
    }
  }
</style>
