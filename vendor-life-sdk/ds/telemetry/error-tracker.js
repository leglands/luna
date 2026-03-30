// life-telemetry: Universal web error tracker
// Pure JS - no TypeScript, no build step needed
// Works in Chrome 90+, Safari 15+, Firefox 90+

import {
  Severity,
  ErrorLevel,
  BreadcrumbCategory,
  createBreadcrumb,
  createErrorEvent,
  getDeviceContext
} from './types.js';

const DEFAULT_CONFIG = {
  appName: 'web-app',
  appVersion: '1.0.0',
  endpoint: '/api/errors',
  encryptionKey: null,
  sampleRate: 1.0,
  maxBreadcrumbs: 50,
  flushInterval: 30000
};

let config = { ...DEFAULT_CONFIG };
let breadcrumbs = [];
let userContext = {};
let tags = {};
let pendingErrors = [];
let isInitialized = false;
let flushTimer = null;
let recentErrors = new Map();

function getStorageKey(key) {
  return `${config.appName}_${key}`;
}

function setupErrorHandlers() {
  window.onerror = function(message, source, lineno, colno, error) {
    captureError(error || new Error(String(message)), {
      level: Severity.ERROR,
      tags: { source: 'window.onerror' },
      extra: { source, lineno, colno }
    });
    return false;
  };

  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason instanceof Error
      ? event.reason
      : new Error(String(event.reason));

    captureError(error, {
      level: Severity.ERROR,
      tags: { source: 'unhandledrejection' }
    });
  });

  const originalConsoleError = console.error;
  console.error = function(...args) {
    originalConsoleError.apply(console, args);

    addBreadcrumb({
      category: BreadcrumbCategory.CONSOLE,
      message: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
      level: Severity.ERROR
    });

    const firstArg = args[0];
    if (firstArg instanceof Error) {
      captureError(firstArg, {
        level: Severity.WARNING,
        tags: { source: 'console.error' }
      });
    }
  };
}

function setupNavigationTracking() {
  addBreadcrumb({
    category: BreadcrumbCategory.NAVIGATION,
    message: `Page loaded: ${window.location.pathname}`,
    data: { url: window.location.href }
  });

  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    addBreadcrumb({
      category: BreadcrumbCategory.NAVIGATION,
      message: `Navigated to: ${window.location.pathname}`,
      data: { url: window.location.href }
    });
  };

  window.addEventListener('popstate', function() {
    addBreadcrumb({
      category: BreadcrumbCategory.NAVIGATION,
      message: `Back/Forward to: ${window.location.pathname}`,
      data: { url: window.location.href }
    });
  });

  document.addEventListener('click', function(event) {
    const target = event.target;
    const element = target.closest('button, a, [data-track]');
    if (!element) return;

    const message = element.getAttribute('data-track') ||
      `${element.tagName.toLowerCase()}${element.id ? '#' + element.id : ''} "${(element.textContent || '').trim().substring(0, 50)}"`;

    addBreadcrumb({
      category: BreadcrumbCategory.UI,
      message: `Clicked: ${message}`,
      data: {
        tagName: element.tagName,
        id: element.id,
        text: element.textContent?.trim().substring(0, 50) || ''
      }
    });
  }, { capture: true });
}

function wrapFetch() {
  const originalFetch = window.fetch;
  const tracker = this;

  window.fetch = async function(input, init) {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const method = init?.method || 'GET';
    const startTime = performance.now();

    addBreadcrumb({
      category: BreadcrumbCategory.HTTP,
      message: `${method} ${url}`,
      level: Severity.INFO,
      data: { method, url }
    });

    try {
      const response = await originalFetch.apply(window, arguments);
      const duration = performance.now() - startTime;

      addBreadcrumb({
        category: BreadcrumbCategory.HTTP,
        message: `${method} ${url} → ${response.status}`,
        level: response.ok ? Severity.INFO : Severity.WARNING,
        data: { method, url, status: response.status, duration: Math.round(duration) }
      });

      if (!response.ok && response.status !== 401 && response.status !== 403) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        captureError(error, {
          level: response.status >= 500 ? Severity.ERROR : Severity.WARNING,
          tags: { source: 'fetch', status: String(response.status) },
          extra: { url, method, status: response.status, duration: Math.round(duration) }
        });
      }

      return response;
    } catch (error) {
      const duration = performance.now() - startTime;

      addBreadcrumb({
        category: BreadcrumbCategory.HTTP,
        message: `${method} ${url} → FAILED`,
        level: Severity.ERROR,
        data: { method, url, error: error.message, duration: Math.round(duration) }
      });

      captureError(error, {
        level: Severity.ERROR,
        tags: { source: 'fetch', type: 'network_error' },
        extra: { url, method, duration: Math.round(duration) }
      });

      throw error;
    }
  };
}

function generateFingerprint(error) {
  const stack = error.stack || '';
  const frames = stack.split('\n');
  const firstMeaningfulFrame = frames.find(function(frame) {
    return frame && !frame.includes('node_modules') && !frame.includes('webpack') && !frame.includes('chrome-extension');
  }) || '';

  const message = error.message || '';
  const normalizedMessage = message.replace(/[0-9]/g, '#').substring(0, 100);

  return hashString([
    error.name || 'Error',
    normalizedMessage,
    firstMeaningfulFrame.trim().substring(0, 100)
  ].join('|'));
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function addBreadcrumb(crumb) {
  breadcrumbs.push(createBreadcrumb(crumb.category, crumb.message, crumb.data || {}, crumb.level || Severity.INFO));

  if (breadcrumbs.length > config.maxBreadcrumbs) {
    breadcrumbs = breadcrumbs.slice(-config.maxBreadcrumbs);
  }
}

function captureError(error, options = {}) {
  if (Math.random() > config.sampleRate) {
    return;
  }

  const level = options.level || Severity.ERROR;
  const fingerprint = options.fingerprint || generateFingerprint(error);

  const lastSent = recentErrors.get(fingerprint);
  if (lastSent && Date.now() - lastSent < 5000) {
    return;
  }
  recentErrors.set(fingerprint, Date.now());

  const now = Date.now();
  for (const [fp, ts] of recentErrors.entries()) {
    if (now - ts > 60000) {
      recentErrors.delete(fp);
    }
  }

  const errorEvent = createErrorEvent(
    error.name || 'Error',
    error.message,
    {
      level,
      stack: error.stack,
      fingerprint,
      tags: { ...tags, ...options.tags },
      extra: options.extra || {},
      breadcrumbs: [...breadcrumbs],
      user: Object.keys(userContext).length > 0 ? userContext : null,
      device: getDeviceContext(),
      appId: config.appName,
      appVersion: config.appVersion
    }
  );

  pendingErrors.push(errorEvent);
  savePendingData();

  if (level === Severity.FATAL || level === Severity.ERROR) {
    flush();
  }
}

function savePendingData() {
  try {
    localStorage.setItem(getStorageKey('pending_errors'), JSON.stringify(pendingErrors.slice(0, 50)));
  } catch (e) {
    // localStorage might be full or unavailable
  }
}

function loadPendingData() {
  try {
    const saved = localStorage.getItem(getStorageKey('pending_errors'));
    if (saved) {
      pendingErrors = JSON.parse(saved);
    }
  } catch (e) {
    // Ignore parse errors
  }
}

async function flush() {
  if (pendingErrors.length === 0) {
    return;
  }

  if (!navigator.onLine) {
    return;
  }

  const errorsToSend = [...pendingErrors];
  pendingErrors = [];
  savePendingData();

  for (const error of errorsToSend) {
    try {
      await sendError(error);
    } catch (e) {
      pendingErrors.push(error);
    }
  }

  savePendingData();
}

async function sendError(error) {
  const payload = {
    errorType: error.type,
    message: error.message,
    stackTrace: error.stack || '',
    url: error.url,
    userAgent: error.device?.userAgent || '',
    appName: error.appId,
    appVersion: error.appVersion,
    release: error.appVersion,
    environment: 'production',
    userId: error.user?.id || '',
    userType: error.user?.pseudo ? 'user' : '',
    breadcrumbs: error.breadcrumbs.map(function(b) {
      return {
        timestamp: b.timestamp,
        type: b.category === BreadcrumbCategory.NAVIGATION ? 'navigation' :
              b.category === BreadcrumbCategory.UI ? 'click' :
              b.category === BreadcrumbCategory.HTTP ? 'xhr' : 'console',
        category: b.category,
        message: b.message,
        dataJson: b.data ? JSON.stringify(b.data) : '',
        level: b.level || Severity.INFO
      };
    }),
    extraContextJson: JSON.stringify(error.extra),
    tagsJson: JSON.stringify(error.tags),
    browserName: error.device?.browserName || 'unknown',
    browserVersion: error.device?.browserVersion || 'unknown',
    osName: error.device?.platform || '',
    osVersion: error.device?.osVersion || '',
    deviceType: error.device?.deviceType || 'desktop',
    timestamp: error.timestamp
  };

  const endpoint = config.endpoint || '/api/errors';

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(endpoint, JSON.stringify(payload));
    if (sent) {
      return;
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true
  });

  if (!response.ok) {
    throw new Error(`Failed to send error: ${response.status}`);
  }
}

function setUser(user) {
  userContext = { ...userContext, ...user };
}

function clearUser() {
  userContext = {};
}

function setTag(key, value) {
  tags[key] = value;
}

function setTags(newTags) {
  tags = { ...tags, ...newTags };
}

function initErrorTracker(userConfig) {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  config = { ...DEFAULT_CONFIG, ...userConfig };

  if (typeof window === 'undefined') {
    return;
  }

  setupErrorHandlers();
  setupNavigationTracking();
  wrapFetch();
  loadPendingData();

  flushTimer = setInterval(flush, config.flushInterval);

  window.addEventListener('beforeunload', flush);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      flush();
    }
  });

  window.addEventListener('online', flush);
}

function destroyErrorTracker() {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  flush();
  isInitialized = false;
}

export {
  initErrorTracker,
  addBreadcrumb,
  captureError,
  setUser,
  clearUser,
  setTag,
  setTags,
  flush,
  destroyErrorTracker,
  Severity,
  ErrorLevel,
  BreadcrumbCategory
};

export default initErrorTracker;
