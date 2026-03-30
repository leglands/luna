/**
 * Cross-Promotion Rules Engine
 *
 * Pure evaluator: given rules, app state, and dismissals,
 * returns the single highest-priority rule that should fire.
 * Each app defines its own rules and evaluates them locally.
 */

/**
 * @typedef {Object} CrossPromoRule
 * @property {string} id
 * @property {string} targetApp - 'luna'|'aura'|'sienna'|'alma'|'nova'|'aida'
 * @property {number} priority - 1=highest, 100=lowest
 * @property {Array<{stateKey: string, op: string, value: *}>} conditions
 * @property {number} [minDaysActive]
 * @property {string} placement - 'home_banner'|'wellness_section'|'post_action'|'settings'|'event_footer'
 * @property {string} i18nKeyPrefix
 * @property {string} icon - Lucide icon name
 * @property {string} targetColor - hex color
 * @property {number} cooldownDays - default 30
 */

/**
 * Evaluate a condition against current state.
 * @param {{stateKey: string, op: string, value: *}} condition
 * @param {Object} state
 * @returns {boolean}
 */
function evaluateCondition(condition, state) {
  const actual = state[condition.stateKey];

  switch (condition.op) {
    case 'exists':
      return actual != null;
    case 'eq':
      return actual === condition.value;
    case 'neq':
      return actual !== condition.value;
    case 'gte':
      return typeof actual === 'number' && actual >= condition.value;
    case 'lte':
      return typeof actual === 'number' && actual <= condition.value;
    case 'gt':
      return typeof actual === 'number' && actual > condition.value;
    case 'lt':
      return typeof actual === 'number' && actual < condition.value;
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(actual);
    case 'true':
      return !!actual;
    default:
      return false;
  }
}

/**
 * Evaluate cross-promo rules and return the best match.
 *
 * @param {CrossPromoRule[]} rules - all rules for the current app
 * @param {Object} state - current app state
 * @param {Object<string, number>} dismissals - {ruleId: timestamp}
 * @param {number} firstLaunchTs - timestamp of first app launch
 * @param {number} [now] - current timestamp (for testing)
 * @returns {CrossPromoRule|null}
 */
export function evaluateCrossPromo(rules, state, dismissals, firstLaunchTs, now = Date.now()) {
  const MS_PER_DAY = 86400000;
  const daysActive = Math.floor((now - firstLaunchTs) / MS_PER_DAY);

  return rules
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .find(rule => {
      // Check minDaysActive
      if (rule.minDaysActive && daysActive < rule.minDaysActive) return false;

      // Check cooldown
      const dismissed = dismissals[rule.id];
      if (dismissed) {
        const daysSinceDismiss = Math.floor((now - dismissed) / MS_PER_DAY);
        if (daysSinceDismiss < (rule.cooldownDays || 30)) return false;
      }

      // All conditions must pass (AND)
      return rule.conditions.every(c => evaluateCondition(c, state));
    }) || null;
}

/**
 * App metadata for cross-promo links.
 */
export const APP_LINKS = {
  luna:   { web: null, ios: null, android: null, color: '#6B3FA0', icon: 'moon' },
  aura:   { web: null, ios: null, android: null, color: '#C86B5A', icon: 'heart' },
  sienna: { web: 'https://sienna.macaron-software.com', ios: null, android: null, color: '#3C684B', icon: 'leaf' },
  alma:   { web: null, ios: null, android: null, color: '#4A8F8F', icon: 'brain' },
  nova:   { web: 'https://yolonow.com', ios: null, android: null, color: '#E94B3C', icon: 'sparkles' },
  aida:   { web: null, ios: null, android: null, color: '#D4903A', icon: 'hand-helping' },
};

/**
 * Get the best link for a target app based on current platform.
 * @param {string} targetApp
 * @returns {string|null}
 */
export function getAppLink(targetApp) {
  const meta = APP_LINKS[targetApp];
  if (!meta) return null;
  if (meta.web) return meta.web;
  // Native-only: detect platform from user-agent
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/iPhone|iPad/.test(ua) && meta.ios) return meta.ios;
  if (/Android/.test(ua) && meta.android) return meta.android;
  return meta.ios || meta.android || null;
}
