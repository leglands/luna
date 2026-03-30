<script>
  import Icon from './Icon.svelte';
  import PebbleButton from './PebbleButton.svelte';

  const BRAND_COLORS = {
    luna: '#D4678A',
    aura: '#E8A87C',
    sienna: '#3c684b',
    alma: '#7BA7A7',
    nova: '#6366F1',
    aida: '#8B5CF6',
  };

  let {
    placeholder = 'Type a message...',
    chips = [],
    onsend = null,
    brand = 'luna',
    class: className = '',
  } = $props();

  const brandColor = $derived(BRAND_COLORS[brand] ?? BRAND_COLORS.luna);

  let inputValue = $state('');

  function handleSend() {
    if (inputValue.trim() && onsend) {
      onsend(inputValue.trim());
      inputValue = '';
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleChipClick(chip) {
    if (onsend) {
      onsend(chip);
    }
  }
</script>

<div class="chat-input {className}" style="--input-brand: {brandColor}">
  {#if chips.length > 0}
    <div class="chip-row" role="listbox" aria-label="Quick responses">
      {#each chips as chip}
        <button
          type="button"
          class="chip"
          onclick={() => handleChipClick(chip)}
          role="option"
        >
          {chip}
        </button>
      {/each}
    </div>
  {/if}

  <div class="input-row">
    <div class="input-wrapper">
      <input
        type="text"
        class="input-field"
        bind:value={inputValue}
        {placeholder}
        onkeydown={handleKeydown}
        aria-label={placeholder}
      />
    </div>

    <PebbleButton
      {brand}
      icon="send"
      size="md"
      variant="primary"
      disabled={!inputValue.trim()}
      onclick={handleSend}
      aria-label="Send message"
    />
  </div>
</div>

<style>
  .chat-input {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .chip-row {
    display: flex;
    gap: var(--space-2);
    overflow-x: auto;
    padding: var(--space-1) 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .chip-row::-webkit-scrollbar {
    display: none;
  }

  .chip {
    flex-shrink: 0;
    padding: var(--space-1) var(--space-3);
    background: var(--c-surface-container-low);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-full);
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: var(--weight-medium);
    color: var(--c-text-secondary);
    cursor: pointer;
    transition:
      background var(--duration-fast),
      color var(--duration-fast),
      border-color var(--duration-fast);
    min-height: var(--tap-target);
    display: inline-flex;
    align-items: center;
  }

  .chip:hover {
    background: color-mix(in srgb, var(--input-brand) 10%, var(--c-surface-container-low));
    color: var(--input-brand);
    border-color: color-mix(in srgb, var(--input-brand) 30%, transparent);
  }

  .chip:focus-visible {
    outline: 2px solid var(--c-focus);
    outline-offset: 2px;
  }

  .input-row {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }

  .input-wrapper {
    flex: 1;
    position: relative;
  }

  .input-field {
    width: 100%;
    height: var(--tap-target);
    padding: 0 var(--space-4);
    background: var(--c-surface);
    border: 1px solid var(--c-border);
    border-radius: var(--radius-xl);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--c-text);
    outline: none;
    transition:
      border-color var(--duration-fast),
      box-shadow var(--duration-fast);
  }

  .input-field::placeholder {
    color: var(--c-text-tertiary);
  }

  .input-field:focus {
    border-color: var(--input-brand);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--input-brand) 15%, transparent);
  }

  .input-field:focus-visible {
    outline: none;
  }
</style>
