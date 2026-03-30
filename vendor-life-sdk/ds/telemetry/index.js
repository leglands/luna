// life-telemetry - Shared telemetry module for web apps
// Pure JS - no TypeScript, no build step needed
// Works in Chrome 90+, Safari 15+, Firefox 90+

export {
  Severity,
  ErrorCategory,
  BreadcrumbType,
  Platform,
  DeviceType,
  BreadcrumbCategory,
  ErrorLevel,
  createBreadcrumb,
  createErrorEvent,
  getDeviceContext
} from './types.js';

export {
  initErrorTracker,
  addBreadcrumb,
  captureError,
  setUser,
  clearUser,
  setTag,
  setTags,
  flush,
  destroyErrorTracker
} from './error-tracker.js';

export {
  initCrashReporter,
  reportCrash,
  reportManualCrash
} from './crash-reporter.js';

export { default as errorTracker } from './error-tracker.js';
export { default as crashReporter } from './crash-reporter.js';
