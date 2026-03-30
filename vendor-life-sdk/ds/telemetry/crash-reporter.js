// life-telemetry: Encrypted crash reporter for native-grade crash reports from web
// Pure JS - no TypeScript, no build step needed
// Uses AES-GCM via Web Crypto API and pako for gzip compression

import { getDeviceContext, DeviceType } from './types.js';

const DEFAULT_CONFIG = {
  appName: 'web-app',
  appVersion: '1.0.0',
  endpoint: '/api/crashes',
  encryptionKey: 'dev_crash_key_32_bytes_long!!'
};

let config = { ...DEFAULT_CONFIG };
let pendingReports = [];
let isInitialized = false;
let isUploading = false;

const PAKO_AVAILABLE = typeof pako !== 'undefined';

function getStorageKey(key) {
  return `${config.appName}_${key}`;
}

function setupErrorHandlers() {
  window.onerror = function(message, source, lineno, colno, error) {
    const crashData = createCrashData('error', message, source, lineno, colno, error);
    reportCrash(crashData);
    return false;
  };

  window.addEventListener('unhandledrejection', function(event) {
    const crashData = createCrashData(
      'unhandledRejection',
      event.reason?.message || String(event.reason),
      window.location.href,
      null,
      null,
      event.reason
    );
    reportCrash(crashData);
  });

  const originalConsoleError = console.error;
  console.error = function(...args) {
    originalConsoleError.apply(console, args);

    const message = args.map(arg => String(arg)).join(' ');
    if (message.includes('timeout after') || message.includes('build:')) {
      return;
    }

    const firstArg = args[0];
    if (firstArg instanceof Error || (typeof firstArg === 'string' && firstArg.includes('Error'))) {
      const crashData = createCrashData(
        'consoleError',
        message,
        window.location.href,
        null,
        null,
        firstArg instanceof Error ? firstArg : null
      );
      reportCrash(crashData);
    }
  };
}

function createCrashData(type, message, source, lineno, colno, error) {
  return {
    type: type,
    message: typeof message === 'string' ? message : String(message),
    stack: error?.stack || '',
    url: source || (typeof window !== 'undefined' ? window.location.href : ''),
    line: lineno,
    column: colno,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: new Date().toISOString(),
    appVersion: config.appVersion
  };
}

async function encryptData(plaintext) {
  const keyBytes = new TextEncoder().encode(config.encryptionKey);

  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const nonce = crypto.getRandomValues(new Uint8Array(12));

  const plaintextBytes = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce },
    key,
    plaintextBytes
  );

  const encrypted = new Uint8Array(nonce.length + ciphertext.byteLength);
  encrypted.set(nonce, 0);
  encrypted.set(new Uint8Array(ciphertext), nonce.length);

  return encrypted;
}

function compressData(data) {
  if (!PAKO_AVAILABLE) {
    return data;
  }
  return pako.gzip(data);
}

async function reportCrash(crashData) {
  try {
    const crashLog = JSON.stringify(crashData);

    let encrypted = await encryptData(crashLog);
    let compressed = compressData(encrypted);

    await sendCrashReport(compressed, crashData);

    savePendingReports();
  } catch (error) {
    pendingReports.push(crashData);
    savePendingReports();
  }
}

async function sendCrashReport(compressed, crashData) {
  const endpoint = config.endpoint || '/api/crashes';

  const payload = {
    crashLogEncryptedCompressed: Array.from(compressed),
    appVersion: crashData.appVersion,
    appVersionName: crashData.appVersion,
    deviceModel: navigator.userAgent,
    osVersion: navigator.platform,
    timestamp: crashData.timestamp,
    platform: 'web'
  };

  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    const sent = navigator.sendBeacon(endpoint, blob);
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
    throw new Error(`Failed to send crash report: ${response.status}`);
  }
}

function savePendingReports() {
  try {
    localStorage.setItem(getStorageKey('pending_crashes'), JSON.stringify(pendingReports.slice(0, 50)));
  } catch (error) {
    // localStorage might be full or unavailable
  }
}

function loadPendingReports() {
  try {
    const saved = localStorage.getItem(getStorageKey('pending_crashes'));
    if (saved) {
      pendingReports = JSON.parse(saved);
    }
  } catch (error) {
    pendingReports = [];
  }
}

async function uploadPendingReports() {
  if (isUploading || pendingReports.length === 0) {
    return;
  }

  loadPendingReports();

  if (pendingReports.length === 0) {
    return;
  }

  isUploading = true;

  const reportsToUpload = [...pendingReports];
  pendingReports = [];

  for (const report of reportsToUpload) {
    try {
      await reportCrash(report);
    } catch (error) {
      pendingReports.push(report);
    }
  }

  savePendingReports();
  isUploading = false;
}

async function reportManualCrash(message, additionalData) {
  const crashData = {
    type: 'manual',
    message: message,
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    timestamp: new Date().toISOString(),
    appVersion: config.appVersion,
    ...additionalData
  };

  await reportCrash(crashData);
}

function initCrashReporter(userConfig) {
  if (isInitialized) {
    return;
  }
  isInitialized = true;

  config = { ...DEFAULT_CONFIG, ...userConfig };

  if (typeof window === 'undefined') {
    return;
  }

  setupErrorHandlers();
  uploadPendingReports();
}

export {
  initCrashReporter,
  reportCrash,
  reportManualCrash
};

export default initCrashReporter;
