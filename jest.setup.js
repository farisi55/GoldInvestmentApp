jest.mock('react-native-gesture-handler', () => {
  const RN = require('react-native');
  const mockView = RN.View;
  return {
    __esModule: true,
    default: { ScrollView: mockView, DrawerLayout: mockView, State: {} },
    ScrollView: mockView,
    DrawerLayout: mockView,
    GestureHandlerRootView: mockView,
    Swipeable: mockView,
    PanGestureHandler: mockView,
    TapGestureHandler: mockView,
    LongPressGestureHandler: mockView,
    RotationGestureHandler: mockView,
    FlingGestureHandler: mockView,
    PinchGestureHandler: mockView,
    NativeViewGestureHandler: mockView,
    GestureHandler: mockView,
    State: {},
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-screens', () => {
  const mockView = require('react-native').View;
  return {
    ScreenContainer: mockView,
    Screen: mockView,
  };
});

jest.mock('react-native-safe-area-context', () => {
  const mockView = require('react-native').View;
  return {
    __esModule: true,
    SafeAreaProvider: mockView,
    SafeAreaView: mockView,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
  };
});

jest.mock('react-native-google-mobile-ads', () => {
  const mockAdInstance = {
    load: jest.fn(() => Promise.resolve()),
    show: jest.fn(() => Promise.resolve()),
    addAdEventListener: jest.fn(() => jest.fn()),
    remove: jest.fn(),
  };
  const mockMobileAds = () => ({
    setRequestConfiguration: jest.fn(() => Promise.resolve()),
    initialize: jest.fn(() => Promise.resolve([])),
  });
  mockMobileAds.MaxAdContentRating = { G: 'G', PG: 'PG', T: 'T', MA: 'MA' };
  return {
    __esModule: true,
    default: mockMobileAds,
    MaxAdContentRating: { G: 'G', PG: 'PG', T: 'T', MA: 'MA' },
    AdEventType: { LOADED: 'loaded', ERROR: 'error', OPENED: 'opened', CLOSED: 'closed' },
    BannerAdSize: { ADAPTIVE_BANNER: 'ADAPTIVE_BANNER', BANNER: 'BANNER', LARGE_BANNER: 'LARGE_BANNER', MEDIUM_RECTANGLE: 'MEDIUM_RECTANGLE', FULL_BANNER: 'FULL_BANNER', LEADERBOARD: 'LEADERBOARD', SMART_BANNER: 'SMART_BANNER' },
    BannerAd: Object.assign(jest.fn(() => mockAdInstance), { sizes: {} }),
    InterstitialAd: Object.assign(jest.fn(() => mockAdInstance), { createForAdRequest: jest.fn(() => mockAdInstance) }),
    RewardedAd: Object.assign(jest.fn(() => mockAdInstance), { createForAdRequest: jest.fn(() => mockAdInstance) }),
    RewardedInterstitialAd: Object.assign(jest.fn(() => mockAdInstance), { createForAdRequest: jest.fn(() => mockAdInstance) }),
    AppOpenAd: Object.assign(jest.fn(() => mockAdInstance), { createForAdRequest: jest.fn(() => mockAdInstance) }),
    TestIds: { BANNER: 'ca-app-pub-3940256099942544/6300978111', INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712', REWARDED: 'ca-app-pub-3940256099942544/5224354917', APP_OPEN: 'ca-app-pub-3940256099942544/1033173712' },
  };
});

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    ADMOB_BANNER_UNIT_ID: 'ca-app-pub-3940256099942544/6300978111',
    ADMOB_INTERSTITIAL_UNIT_ID: 'ca-app-pub-3940256099942544/1033173712',
    ADMOB_REWARDED_UNIT_ID: 'ca-app-pub-3940256099942544/5224354917',
    ADMOB_APPOPEN_UNIT_ID: 'ca-app-pub-3940256099942544/1033173712',
    SENTRY_DSN: '',
    NODE_ENV: 'development',
  },
}));

jest.mock('react-native-sqlite-storage', () => ({
  __esModule: true,
  default: {
    enablePromise: jest.fn(),
    openDatabase: jest.fn(() => ({
      executeSql: jest.fn(() => Promise.resolve([])),
      transaction: jest.fn(),
    })),
  },
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-vector-icons', () => ({
  __esModule: true,
  default: 'Icon',
  createIconSet: jest.fn(() => 'Icon'),
}));

jest.mock('react-native-chart-kit', () => {
  const mockView = require('react-native').View;
  return {
    __esModule: true,
    LineChart: mockView,
    BarChart: mockView,
    PieChart: mockView,
    ProgressChart: mockView,
    ContributionGraph: mockView,
    StackedBarChart: mockView,
  };
});

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('lottie-react-native', () => 'LottieView');
jest.mock('react-native-document-picker', () => ({
  __esModule: true,
  default: { pick: jest.fn(() => Promise.resolve({})), types: {} },
  pick: jest.fn(() => Promise.resolve({})),
  types: {},
}));
jest.mock('react-native-share', () => ({
  __esModule: true,
  default: { open: jest.fn(() => Promise.resolve()) },
}));
jest.mock('react-native-fs', () => ({
  __esModule: true,
  default: { readDir: jest.fn(), readFile: jest.fn(), writeFile: jest.fn() },
  DocumentDirectoryPath: '/mock',
  DownloadDirectoryPath: '/mock',
}));
jest.mock('@react-navigation/native', () => {
  const mockView = require('react-native').View;
  return {
    __esModule: true,
    NavigationContainer: ({ children }) => children,
    useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn(), dispatch: jest.fn() }),
    useRoute: () => ({ params: {} }),
    useFocusEffect: jest.fn(),
    CommonActions: { navigate: jest.fn(), goBack: jest.fn() },
    StackActions: { push: jest.fn(), pop: jest.fn() },
  };
});

jest.mock('@react-navigation/stack', () => ({
  __esModule: true,
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  }),
}));

jest.mock('@sentry/react-native', () => ({
  __esModule: true,
  init: jest.fn(),
  captureMessage: jest.fn(),
  captureException: jest.fn(),
  withScope: jest.fn(),
  Severity: { Warning: 'warning', Error: 'error', Info: 'info' },
}));
