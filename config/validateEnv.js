/**
 * config/validateEnv.js
 * Startup environment variable validation.
 *
 * Validates that required env vars are present in production builds.
 * In development (__DEV__), AdMob falls back to Test IDs automatically
 * (via admob.config.js), so this check is informational only in dev.
 *
 * Behaviour:
 * - __DEV__ = true  → warns about missing vars but does NOT throw (dev is always safe with Test IDs)
 * - __DEV__ = false → throws a clear, human-readable Error if any ADMOB_*_UNIT_ID is missing
 *
 * Installed by: Task #004 — Env Var Validation at Startup
 */

import Config from 'react-native-config';
import { captureMessage } from '../utils/CrashReporter';

/**
 * Required production env vars.
 * Only BANNER and INTERSTITIAL are actively used in the current build.
 * REWARDED and APPOPEN are reserved for future use but must be configured
 * for production to signal intentional setup (prevents silent misconfiguration).
 */
const REQUIRED_ADMOB_VARS = [
  'ADMOB_BANNER_UNIT_ID',
  'ADMOB_INTERSTITIAL_UNIT_ID',
  'ADMOB_REWARDED_UNIT_ID',
  'ADMOB_APPOPEN_UNIT_ID',
];

/**
 * Placeholder pattern: values like 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY'
 * from .env.example are treated as missing in production.
 */
const PLACEHOLDER_PATTERN = /^ca-app-pub-[X]+\/[Y]+$/;

/**
 * Validates that the value is a real unit ID, not a placeholder.
 * @param {string | undefined} value
 * @returns {boolean}
 */
function isRealUnitId(value) {
  if (!value || value.trim() === '') return false;
  if (PLACEHOLDER_PATTERN.test(value.trim())) return false;
  return true;
}

/**
 * Validate all required env vars at startup.
 *
 * Call once at app startup, before any AdMob initialization.
 *
 * @throws {Error} In production builds, throws if any required var is missing/placeholder.
 */
export function validateEnv() {
  const missing = REQUIRED_ADMOB_VARS.filter(
    key => !isRealUnitId(Config[key]),
  );

  if (missing.length === 0) {
    // All vars present and look like real IDs.
    return;
  }

  const message =
    `[validateEnv] Missing or placeholder AdMob Unit IDs detected:\n` +
    missing.map(k => `  - ${k}: "${Config[k] ?? '(not set)'}"`)
      .join('\n') +
    `\n\nAction required:\n` +
    `  1. Copy .env.example → .env\n` +
    `  2. Fill in real Unit IDs from your AdMob dashboard\n` +
    `  3. Rebuild the app\n` +
    `\n(In development mode this is a warning only — Test IDs are used automatically.)`;

  if (__DEV__) {
    // Dev mode: warn but don't crash. Test IDs are used anyway.
    captureMessage(message, 'warning');
    console.warn(message); // eslint-disable-line no-console
  } else {
    // Production mode: fail fast with a human-readable error.
    // This surfaces misconfiguration before any user sees broken ad slots.
    throw new Error(message);
  }
}
