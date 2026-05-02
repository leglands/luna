function hardRefresh() {
  const next = new URL(window.location.href);
  next.searchParams.set('__refresh', String(Date.now()));
  window.location.replace(next.toString());
}

async function purgeLegacyShell() {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } finally {
    hardRefresh();
  }
}

export const load_css = () => {};
export function start() {
  if (typeof window !== 'undefined') {
    purgeLegacyShell();
  }
}
