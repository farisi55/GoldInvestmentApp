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
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-config|@react-native-community|react-native-gesture-handler|react-native-screens|react-native-reanimated|react-native-safe-area-context|react-native-svg|react-native-share|react-native-fs|react-native-document-picker|react-native-get-random-values|date-fns-tz|lottie-react-native|react-native-linear-gradient|react-native-chart-kit|@sentry|@react-native-community/datetimepicker|@react-native-picker|react-native-vector-icons)/)',
  ],
};
