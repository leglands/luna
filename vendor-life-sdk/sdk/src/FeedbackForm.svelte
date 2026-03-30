<script lang="ts">
  let {
    appId,
    apiBase,
    jwtToken,
    onSuccess = () => {},
    onClose = () => {},
  } = $props();

  let rating = $state(0);
  let hoverRating = $state(0);
  let category = $state('general');
  let message = $state('');
  let submitting = $state(false);
  let errorMessage = $state('');
  let successMessage = $state('');
  let submittedId = $state('');

  const MAX_CHARS = 2000;
  const MIN_CHARS = 10;

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
  ];

  const charCount = $derived(message.length);
  const isValid = $derived(charCount >= MIN_CHARS && charCount <= MAX_CHARS);

  function handleStarClick(star: number) {
    rating = star;
  }

  function handleStarKeydown(e: KeyboardEvent, star: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      rating = star;
    }
  }

  function handleStarMouseenter(star: number) {
    hoverRating = star;
  }

  function handleStarMouseleave() {
    hoverRating = 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!isValid || submitting) return;

    errorMessage = '';
    successMessage = '';
    submitting = true;

    try {
      const { submitFeedback } = await import('./api/support');
      const result = await submitFeedback({
        apiBase,
        jwtToken,
        appId,
        rating,
        category,
        message,
      });

      submittedId = result.id;
      successMessage = 'Thank you for your feedback!';
      onSuccess(result.id);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : 'Failed to submit feedback';
    } finally {
      submitting = false;
    }
  }

  function handleClose() {
    if (!submitting) {
      onClose();
    }
  }
</script>

<div class="feedback-form" role="form" aria-label="Feedback form">
  <button
    class="close-btn"
    onclick={handleClose}
    disabled={submitting}
    aria-label="Close feedback form"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </button>

  <h2 class="form-title">Share Your Feedback</h2>

  <div class="star-rating" role="radiogroup" aria-label="Rating">
    {#each [1, 2, 3, 4, 5] as star}
      {@const filled = hoverRating ? star <= hoverRating : star <= rating}
      <button
        class="star-btn"
        class:star-filled={filled}
        onclick={() => handleStarClick(star)}
        onkeydown={(e) => handleStarKeydown(e, star)}
        onmouseenter={() => handleStarMouseenter(star)}
        onmouseleave={handleStarMouseleave}
        aria-label={`Rate ${star} out of 5 stars`}
        aria-pressed={rating === star}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill={filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>
    {/each}
  </div>

  <div class="form-group">
    <label for="category" class="form-label">Category</label>
    <select
      id="category"
      bind:value={category}
      class="form-select"
      disabled={submitting}
      aria-label="Feedback category"
    >
      {#each categories as cat}
        <option value={cat.value}>{cat.label}</option>
      {/each}
    </select>
  </div>

  <div class="form-group">
    <label for="message" class="form-label">
      Message
      <span class="char-count" class:char-error={charCount > MAX_CHARS}>
        {charCount}/{MAX_CHARS}
      </span>
    </label>
    <textarea
      id="message"
      bind:value={message}
      class="form-textarea"
      placeholder="Tell us what you think..."
      rows="4"
      maxlength={MAX_CHARS}
      disabled={submitting}
      aria-label="Your feedback message"
      aria-describedby="message-hint"
    ></textarea>
    <span id="message-hint" class="sr-only">
      Minimum {MIN_CHARS} characters required
    </span>
    {#if charCount < MIN_CHARS && charCount > 0}
      <span class="field-hint">Minimum {MIN_CHARS} characters</span>
    {/if}
  </div>

  {#if errorMessage}
    <div class="message message-error" role="alert" aria-live="polite">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>{errorMessage}</span>
    </div>
  {/if}

  {#if successMessage}
    <div class="message message-success" role="status" aria-live="polite">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>{successMessage}</span>
    </div>
  {/if}

  <button
    class="submit-btn"
    onclick={handleSubmit}
    disabled={!isValid || submitting}
    aria-label="Submit feedback"
  >
    {#if submitting}
      <span class="spinner" aria-hidden="true"></span>
      <span>Submitting...</span>
    {:else}
      <span>Submit Feedback</span>
    {/if}
  </button>
</div>

<style>
  .feedback-form {
    position: relative;
    padding: var(--space-5, 20px);
    background: var(--color-surface, #FFFFFF);
    border-radius: var(--radius-lg, 24px);
    max-width: 400px;
    width: 100%;
  }

  .close-btn {
    position: absolute;
    top: var(--space-3, 12px);
    right: var(--space-3, 12px);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-2, 8px);
    color: var(--color-text-secondary, #5A5650);
    border-radius: var(--radius-sm, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    min-width: 44px;
    transition: background-color var(--duration-fast, 120ms) ease;
  }

  .close-btn:hover:not(:disabled) {
    background: var(--color-surface-container, #EFEEE9);
  }

  .close-btn:focus-visible {
    outline: 2px solid var(--c-focus, #5D82B8);
    outline-offset: 2px;
  }

  .form-title {
    font-family: var(--font-headline, 'Plus Jakarta Sans', sans-serif);
    font-size: var(--font-size-title, 22px);
    font-weight: 600;
    color: var(--color-text-primary, #31332F);
    margin: 0 0 var(--space-5, 20px) 0;
    text-align: center;
  }

  .star-rating {
    display: flex;
    justify-content: center;
    gap: var(--space-2, 8px);
    margin-bottom: var(--space-5, 20px);
  }

  .star-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-1, 4px);
    color: var(--color-outline-variant, #B2B2AD);
    border-radius: var(--radius-sm, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    min-width: 44px;
    transition: color var(--duration-fast, 120ms) ease, transform var(--duration-fast, 120ms) ease;
  }

  .star-btn:hover {
    transform: scale(1.1);
  }

  .star-btn.star-filled {
    color: #D4903A;
  }

  .star-btn:focus-visible {
    outline: 2px solid var(--c-focus, #5D82B8);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .star-btn:hover {
      transform: none;
    }
  }

  .form-group {
    margin-bottom: var(--space-4, 16px);
  }

  .form-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: var(--font-size-caption, 13px);
    font-weight: 500;
    color: var(--color-text-secondary, #5A5650);
    margin-bottom: var(--space-2, 8px);
  }

  .char-count {
    font-size: var(--font-size-label, 12px);
    color: var(--color-text-tertiary, #8A8580);
  }

  .char-count.char-error {
    color: var(--color-alert-urgent, #A83836);
  }

  .form-select,
  .form-textarea {
    width: 100%;
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: var(--font-size-body, 15px);
    color: var(--color-text-primary, #31332F);
    background: var(--color-surface, #FFFFFF);
    border: 1px solid var(--color-outline-variant, #B2B2AD);
    border-radius: var(--radius-md, 16px);
    padding: var(--space-3, 12px);
    transition: border-color var(--duration-fast, 120ms) ease, box-shadow var(--duration-fast, 120ms) ease;
    min-height: 44px;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-select:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--c-focus, #5D82B8);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-focus, #5D82B8) 20%, transparent);
  }

  .form-select:disabled,
  .form-textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .field-hint {
    display: block;
    font-size: var(--font-size-label, 12px);
    color: var(--color-text-tertiary, #8A8580);
    margin-top: var(--space-1, 4px);
  }

  .message {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-3, 12px);
    border-radius: var(--radius-md, 16px);
    font-size: var(--font-size-caption, 13px);
    margin-bottom: var(--space-4, 16px);
  }

  .message-error {
    background: color-mix(in srgb, var(--color-alert-urgent, #A83836) 10%, transparent);
    color: var(--color-alert-urgent, #A83836);
  }

  .message-success {
    background: color-mix(in srgb, var(--color-alert-success, #3A7A48) 10%, transparent);
    color: var(--color-alert-success, #3A7A48);
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    width: 100%;
    min-height: var(--tap-target, 44px);
    padding: 0 var(--space-5, 20px);
    font-family: var(--font-body, 'Inter', sans-serif);
    font-size: var(--font-size-body, 15px);
    font-weight: 600;
    color: #fff;
    background: var(--color-primary, #6B3FA0);
    border: none;
    border-radius: 24px 28px 22px 26px;
    cursor: pointer;
    transition: transform var(--duration-fast, 120ms) ease, box-shadow var(--duration-fast, 120ms) ease, opacity var(--duration-fast, 120ms) ease;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--color-primary, #6B3FA0) 8%, transparent);
  }

  .submit-btn:hover:not(:disabled) {
    box-shadow: 0 6px 20px color-mix(in srgb, var(--color-primary, #6B3FA0) 15%, transparent);
  }

  .submit-btn:active:not(:disabled) {
    transform: scale(0.95) rotate(-1deg);
  }

  .submit-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .submit-btn:focus-visible {
    outline: 2px solid var(--c-focus, #5D82B8);
    outline-offset: 2px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .submit-btn:active:not(:disabled) {
      transform: scale(0.95);
    }

    .spinner {
      animation-duration: 1.5s;
    }
  }
</style>
