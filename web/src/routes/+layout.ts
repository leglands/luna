import { browser } from '$app/environment';
import { waitLocale } from 'svelte-i18n';
import { setupI18n, detectLocale, setLocale } from '$lib/i18n.js';

export const load = async () => {
  if (browser) {
    setupI18n();
    setLocale(detectLocale());
    await waitLocale();
  }
};
