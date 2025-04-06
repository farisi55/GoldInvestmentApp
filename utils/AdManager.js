import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// Ganti ini dengan unit ID asli kamu dari AdMob dashboard (pastikan sesuai dengan platform)
const productionUnitIds = {
  banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/BBBBBBBBBB',
  interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/IIIIIIIIII',
  rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/RRRRRRRRRR',
  appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/OOOOOOOOOO',
};

// Jika kamu masih dalam development, gunakan TestIds
const isDev = __DEV__;

const unitIds = {
  banner: isDev ? TestIds.BANNER : productionUnitIds.banner,
  interstitial: isDev ? TestIds.INTERSTITIAL : productionUnitIds.interstitial,
  rewarded: isDev ? TestIds.REWARDED : productionUnitIds.rewarded,
  appOpen: isDev ? TestIds.APP_OPEN : productionUnitIds.appOpen,
};

class AdManager {
  constructor() {
    this.interstitial = InterstitialAd.createForAdRequest(unitIds.interstitial, {
      requestNonPersonalizedAdsOnly: true,
      keywords: [
        'emas',
        'investasi',
        'keuangan',
        'logam mulia',
        'syariah',
        'tabungan',
        'reksa dana',
        'perencanaan keuangan',
      ],
    });

    this.loaded = false;

    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.loaded = true;
    });

    this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      this.loaded = false;
      this.interstitial.load(); // Siapkan iklan berikutnya
    });

    // Pertama kali load iklan
    this.interstitial.load();
  }

  showAd() {
    if (this.loaded) {
      this.interstitial.show();
    } else {
      console.log('Interstitial ad not ready');
    }
  }

  getBannerUnitId() {
    return unitIds.banner;
  }
}

export default new AdManager();
