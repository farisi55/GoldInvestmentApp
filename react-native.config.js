module.exports = {
  // react-native-config is autolinked like every other dependency.
  // The dotenv.gradle include in android/app/build.gradle stays — it's applied
  // separately from autolinking and gives BuildConfig access to .env values.
};
