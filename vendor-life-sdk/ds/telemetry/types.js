// Shared type definitions for life-telemetry
// Pure JS - no TypeScript, no build step needed

export const Severity = {
  DEBUG: 'debug',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  FATAL: 'fatal'
};

export const ErrorCategory = {
  NETWORK: 'network',
  AUTH: 'auth',
  DATA: 'data',
  UI: 'ui',
  SYSTEM: 'system'
};

export const BreadcrumbType = {
  NAVIGATION: 'navigation',
  CLICK: 'click',
  XHR: 'xhr',
  CONSOLE: 'console',
  USER: 'user',
  ERROR: 'error'
};

export const Platform = {
  WEB: 'web'
};

export const DeviceType = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
};

export const BreadcrumbCategory = {
  NAVIGATION: 'navigation',
  UI: 'ui',
  HTTP: 'http',
  CONSOLE: 'console',
  USER: 'user',
  ERROR: 'error',
  INFO: 'info'
};

export const ErrorLevel = Severity;

export function createBreadcrumb(category, message, data = {}, level = Severity.INFO) {
  return {
    timestamp: new Date().toISOString(),
    category,
    message,
    data,
    level
  };
}

export function createErrorEvent(type, message, options = {}) {
  return {
    id: generateId(),
    type,
    level: options.level || Severity.ERROR,
    message,
    stack: options.stack || '',
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    fingerprint: options.fingerprint || '',
    tags: options.tags || {},
    extra: options.extra || {},
    breadcrumbs: options.breadcrumbs || [],
    user: options.user || null,
    device: options.device || null,
    appId: options.appId || '',
    appVersion: options.appVersion || ''
  };
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getDeviceContext() {
  if (typeof window === 'undefined') {
    return {
      userAgent: '',
      platform: '',
      language: '',
      screenSize: '',
      timezone: '',
      browserName: 'unknown',
      browserVersion: 'unknown',
      osName: '',
      osVersion: '',
      deviceType: DeviceType.DESKTOP
    };
  }

  const ua = navigator.userAgent;
  return {
    userAgent: ua,
    platform: navigator.platform,
    language: navigator.language,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    browserName: getBrowserName(ua),
    browserVersion: getBrowserVersion(ua),
    osName: getOSName(ua),
    osVersion: getOSVersion(ua),
    deviceType: getDeviceType(ua)
  };
}

function getBrowserName(ua) {
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Safari/') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edge/')) return 'Edge';
  return 'unknown';
}

function getBrowserVersion(ua) {
  let match;
  if ((match = ua.match(/Firefox\/(\d+)/))) return match[1];
  if ((match = ua.match(/Chrome\/(\d+)/))) return match[1];
  if ((match = ua.match(/Version\/(\d+)/))) return match[1];
  if ((match = ua.match(/Edge\/(\d+)/))) return match[1];
  return 'unknown';
}

function getOSName(ua) {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  return 'unknown';
}

function getOSVersion(ua) {
  const match = ua.match(/OS (\d+[._]\d+)/);
  return match ? match[1].replace('_', '.') : '';
}

function getDeviceType(ua) {
  if (/tablet|ipad/i.test(ua)) return DeviceType.TABLET;
  if (/mobile|iphone|android/i.test(ua)) return DeviceType.MOBILE;
  return DeviceType.DESKTOP;
}
