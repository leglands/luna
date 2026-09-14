import { browser } from '$app/environment';
import { waitLocale } from 'svelte-i18n';
import { setupI18n, detectLocale, setLocale } from '$lib/i18n.js';
import { initStorage } from '$lib/cycle-engine.js';

export const prerender = true;
export const trailingSlash = 'always';

export const load = async () => {
  if (browser) {
    await initStorage();
    setupI18n();
    setLocale(detectLocale());
    await waitLocale();
  }
};
