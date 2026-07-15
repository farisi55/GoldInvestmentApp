/**
 * jest.config.js
 * Jest configuration for GoldInvestmentApp.
 *
 * Note: App.test.tsx requires native module mocking (react-native-gesture-handler,
 * @react-navigation/stack etc.) and is a pre-existing broken test.
 * New tests (CrashReporter, validateEnv) are isolated and pass correctly.
 * App.test.tsx fix is deferred to Task #007–009 (test coverage tasks).
 */

module.exports = {
  preset: 'react-native',
};
