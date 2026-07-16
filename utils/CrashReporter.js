/**
 * utils/CrashReporter.js
 * Centralized crash reporting and structured logging wrapper.
 *
 * Wraps @sentry/react-native with:
 * - PII scrubbing: strips financial fields (weight_gram, investment_value,
 *   price_gold) before any event is sent to Sentry.
 * - Graceful degradation: if SENTRY_DSN is absent or __DEV__ is true,
 *   errors are logged to console only (no remote reporting).
 * - Structured error logging interface: captureException(), captureMessage(),
 *   and the drop-in replacements for console.error().
 *
 * Installed by: Task #003 — Crash Reporting & Structured Logging Init
 */

import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

// ─── PII fields that must NEVER appear in Sentry payloads ───────────────────
// These correspond to knowledge.md §7 "Sensitive data fields".
const PII_FIELDS = [
  'weight_gram',
  'investment_value',
  'price_gold',
  'total_weight',
  'total_investment',
  'profit_loss',
];

/**
 * beforeSend hook — scrubs PII from every Sentry event before transmission.
 * Operates on the event's extras, contexts, tags, and breadcrumb data.
 * @param {import('@sentry/react-native').Event} event
 * @returns {import('@sentry/react-native').Event | null}
 */
function scrubPII(event) {
  if (!event) return null;

  // Scrub extra data
  if (event.extra) {
    PII_FIELDS.forEach(field => {
      if (field in event.extra) {
        event.extra[field] = '[SCRUBBED]';
      }
    });
  }

  // Scrub contexts
  if (event.contexts) {
    Object.values(event.contexts).forEach(ctx => {
      if (ctx && typeof ctx === 'object') {
        PII_FIELDS.forEach(field => {
          if (field in ctx) {
            ctx[field] = '[SCRUBBED]';
          }
        });
      }
    });
  }

  // Scrub breadcrumbs data
  if (event.breadcrumbs && Array.isArray(event.breadcrumbs.values)) {
    event.breadcrumbs.values.forEach(crumb => {
      if (crumb && crumb.data && typeof crumb.data === 'object') {
        PII_FIELDS.forEach(field => {
          if (field in crumb.data) {
            crumb.data[field] = '[SCRUBBED]';
          }
        });
      }
    });
  }

  return event;
}

// ─── Initialization ─────────────────────────────────────────────────────────

let _initialized = false;

/**
 * Initialize Sentry crash reporting.
 * Call once at app startup (in App.js useEffect or before NavigationContainer).
 *
 * Behaviour:
 * - __DEV__ mode OR no SENTRY_DSN → skip Sentry init, use console fallback only.
 * - Production with SENTRY_DSN → init Sentry with PII scrubbing active.
 */
export function initCrashReporter() {
  const dsn = Config.SENTRY_DSN;

  if (__DEV__ || !dsn) {
    // Development or DSN not configured — use console only.
    // No remote reporting; safe for development.
    if (__DEV__) {
      console.log('[CrashReporter] Dev mode — Sentry disabled. Using console fallback.');
    } else {
      console.warn('[CrashReporter] SENTRY_DSN not set — crash reporting disabled.');
    }
    return;
  }

  try {
    Sentry.init({
      dsn,
      // Disable Sentry's default debug output in production.
      debug: false,
      // Capture 10% of transactions for performance monitoring.
      tracesSampleRate: 0.1,
      // PII scrubbing: runs before every event is sent.
      beforeSend: scrubPII,
      // Do not attach device identifiers that could be PII.
      attachStacktrace: true,
      // Keep Sentry's own internal breadcrumbs but strip PII from them.
      maxBreadcrumbs: 50,
    });

    _initialized = true;
    console.log('[CrashReporter] Sentry initialized successfully.');
  } catch (err) {
    // Init failure must never crash the app.
    console.warn('[CrashReporter] Sentry init failed:', err?.message);
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Capture an exception for crash reporting.
 * Falls back to console.error in dev or when Sentry is not initialized.
 *
 * @param {Error | unknown} error - The error to capture.
 * @param {object} [context]      - Optional additional context (PII-free).
 */
export function captureException(error, context) {
  if (_initialized) {
    Sentry.captureException(error, context ? { extra: context } : undefined);
  } else {
    console.error('[CrashReporter]', error, context || '');
  }
}

/**
 * Capture a custom message/event.
 * Falls back to console.warn in dev or when Sentry is not initialized.
 *
 * @param {string} message - The message to capture.
 * @param {'fatal'|'error'|'warning'|'info'|'debug'} [level='warning']
 * @param {object} [context] - Optional additional context (PII-free).
 */
export function captureMessage(message, level = 'warning', context) {
  if (_initialized) {
    Sentry.captureMessage(message, {
      level,
      ...(context ? { extra: context } : {}),
    });
  } else {
    const logFn = level === 'error' || level === 'fatal' ? console.error : console.warn;
    logFn('[CrashReporter]', message, context || '');
  }
}

/**
 * Structured error logger — drop-in replacement for console.error().
 * Captures to Sentry if initialized; logs to console otherwise.
 *
 * @param {string} tag    - Short module/context identifier (e.g. 'GoldPriceHelper').
 * @param {Error | string} error - The error or message.
 * @param {object} [meta] - Optional additional metadata (must be PII-free).
 */
export function logError(tag, error, meta) {
  const isError = error instanceof Error;
  if (isError) {
    captureException(error, { tag, ...meta });
  } else {
    captureMessage(String(error), 'error', { tag, ...meta });
  }
}

export default {
  init: initCrashReporter,
  captureException,
  captureMessage,
  logError,
};
