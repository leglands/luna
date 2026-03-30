/**
 * Cross-Promotion Dismissal Store
 *
 * Persists dismissals in localStorage with automatic cleanup.
 * Mirrors the empathy.js pattern (30-day cooldown, cleanup on load).
 */

const LS_KEY = 'nb_cross_promo_dismissed';
const LS_FIRST_LAUNCH = 'nb_first_launch_ts';
const MAX_AGE_MS = 90 * 86400000; // 90 days

/**
 * Load all dismissals from localStorage.
 * @returns {Object<string, number>} ruleId → timestamp
 */
export function loadDismissals() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Save a dismissal for a rule.
 * @param {string} ruleId
 */
export function dismissRule(ruleId) {
  const dict = loadDismissals();
  dict[ruleId] = Date.now();
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(dict));
  } catch {
    // localStorage full — non-critical
  }
}

/**
 * Remove entries older than 90 days to prevent unbounded growth.
 */
export function cleanupDismissals() {
  const dict = loadDismissals();
  const cutoff = Date.now() - MAX_AGE_MS;
  const cleaned = {};
  for (const [id, ts] of Object.entries(dict)) {
    if (ts > cutoff) cleaned[id] = ts;
  }
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(cleaned));
  } catch {
    // non-critical
  }
}

/**
 * Get or set the first launch timestamp.
 * @returns {number}
 */
export function getFirstLaunchTs() {
  try {
    const stored = localStorage.getItem(LS_FIRST_LAUNCH);
    if (stored) return parseInt(stored, 10);
    const now = Date.now();
    localStorage.setItem(LS_FIRST_LAUNCH, String(now));
    return now;
  } catch {
    return Date.now();
  }
}
