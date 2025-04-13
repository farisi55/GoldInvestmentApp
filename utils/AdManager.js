import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const productionUnitIds = {
  banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/BBBBBBBBBB',
  interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/IIIIIIIIII',
  rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/RRRRRRRRRR',
  appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/OOOOOOOOOO',
};

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
    this.onCloseCallback = null;

    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.loaded = true;
    });

    this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      this.loaded = false;
      this.interstitial.load(); // Siapkan iklan berikutnya

      // Jalankan callback jika ada
      if (this.onCloseCallback) {
        this.onCloseCallback();
        this.onCloseCallback = null; // Reset setelah dipanggil
      }
    });

    // Load pertama kali
    this.interstitial.load();
  }

  showAd(callback) {
    if (this.loaded) {
      this.onCloseCallback = callback;
      this.interstitial.show();
    } else {
      console.log('Interstitial ad not ready');
      // Jalankan langsung jika iklan tidak siap
      if (callback) callback();
    }
  }

  getBannerUnitId() {
    return unitIds.banner;
  }
}

export default new AdManager();
