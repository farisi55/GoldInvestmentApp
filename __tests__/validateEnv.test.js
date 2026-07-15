/**
 * __tests__/validateEnv.test.js
 *
 * Tests for config/validateEnv.js
 * Verifies:
 * 1. Production build throws Error with human-readable message when ADMOB vars are missing.
 * 2. Production build throws when values are .env.example placeholders.
 * 3. Development build (__DEV__=true) warns but does NOT throw.
 * 4. Passes without error or warning when all required vars are set to real values.
 *
 * Installed by: Task #004 — Env Var Validation at Startup
 */

// Mock react-native-config (values controlled per test)
jest.mock('react-native-config', () => ({}));

// Mock CrashReporter (we test CrashReporter separately)
jest.mock('../utils/CrashReporter', () => ({
  captureMessage: jest.fn(),
  initCrashReporter: jest.fn(),
}));

// Mock global __DEV__ — default to false (production); override per test
global.__DEV__ = false;

describe('validateEnv()', () => {
  let Config;
  let captureMessage;
  let validateEnv;

  const REAL_IDS = {
    ADMOB_BANNER_UNIT_ID: 'ca-app-pub-1234567890123456/1111111111',
    ADMOB_INTERSTITIAL_UNIT_ID: 'ca-app-pub-1234567890123456/2222222222',
    ADMOB_REWARDED_UNIT_ID: 'ca-app-pub-1234567890123456/3333333333',
    ADMOB_APPOPEN_UNIT_ID: 'ca-app-pub-1234567890123456/4444444444',
  };

  const PLACEHOLDER_IDS = {
    ADMOB_BANNER_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    ADMOB_INTERSTITIAL_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    ADMOB_REWARDED_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    ADMOB_APPOPEN_UNIT_ID: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  };

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    global.__DEV__ = false; // default: production mode

    Config = require('react-native-config');
    captureMessage = require('../utils/CrashReporter').captureMessage;

    // Reset Config to empty before each test
    Object.keys(Config).forEach(k => delete Config[k]);
  });

  // ── 1. Production — missing vars → throws ──────────────────────────────────

  describe('production mode (__DEV__ = false)', () => {
    it('throws Error when all ADMOB vars are missing', () => {
      // Config is empty (no vars set)
      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).toThrow(Error);
    });

    it('error message mentions missing var names', () => {
      validateEnv = require('../config/validateEnv').validateEnv;

      let errorMessage = '';
      try {
        validateEnv();
      } catch (e) {
        errorMessage = e.message;
      }

      expect(errorMessage).toContain('ADMOB_BANNER_UNIT_ID');
      expect(errorMessage).toContain('ADMOB_INTERSTITIAL_UNIT_ID');
      expect(errorMessage).toContain('Action required');
    });

    // ── 2. Production — placeholder values → throws ────────────────────────

    it('throws when values are .env.example placeholders', () => {
      Object.assign(Config, PLACEHOLDER_IDS);
      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).toThrow(Error);
    });

    it('does NOT throw when all vars are set to real unit IDs', () => {
      Object.assign(Config, REAL_IDS);
      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).not.toThrow();
    });

    it('throws when only some vars are missing', () => {
      // Set only 2 of the 4 required vars
      Config.ADMOB_BANNER_UNIT_ID = REAL_IDS.ADMOB_BANNER_UNIT_ID;
      Config.ADMOB_INTERSTITIAL_UNIT_ID = REAL_IDS.ADMOB_INTERSTITIAL_UNIT_ID;
      // REWARDED and APPOPEN missing

      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).toThrow(Error);
    });
  });

  // ── 3. Development mode — warns but does NOT throw ────────────────────────

  describe('development mode (__DEV__ = true)', () => {
    beforeEach(() => {
      global.__DEV__ = true;
    });

    it('does NOT throw when ADMOB vars are missing in dev mode', () => {
      // Config is empty
      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).not.toThrow();
    });

    it('calls console.warn when vars are missing in dev mode', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      validateEnv = require('../config/validateEnv').validateEnv;

      validateEnv();

      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('does NOT throw and does NOT warn when all vars are set in dev mode', () => {
      Object.assign(Config, REAL_IDS);
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      validateEnv = require('../config/validateEnv').validateEnv;

      validateEnv();

      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
    });

    it('does NOT throw when placeholder values in dev mode', () => {
      Object.assign(Config, PLACEHOLDER_IDS);
      validateEnv = require('../config/validateEnv').validateEnv;

      expect(() => validateEnv()).not.toThrow();
    });
  });
});
