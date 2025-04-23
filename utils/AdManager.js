import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import Config from 'react-native-config';

const productionUnitIds = {
  banner: Config.ADMOB_BANNER_UNIT_ID,
  interstitial: Config.ADMOB_INTERSTITIAL_UNIT_ID,
  rewarded: Config.ADMOB_REWARDED_UNIT_ID,
  appOpen: Config.ADMOB_APPOPEN_UNIT_ID,
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
      // Keywords untuk menargetkan audiens yang relevan dengan aplikasi Catat Emas
      keywords: [
        'emas', 'investasi', 'keuangan', 'logam mulia', 'syariah',
        'tabungan', 'reksa dana', 'perencanaan keuangan',
      ],
    });

    this.loaded = false;
    this.onCloseCallback = null;

    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
      this.loaded = true;
    });

    this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial ad closed');
      this.loaded = false;
      this.interstitial.load(); // Siapkan iklan berikutnya
      if (this.onCloseCallback) {
        this.onCloseCallback();
        this.onCloseCallback = null;
      }
    });

    this.interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Interstitial Ad Error:', error);
    });

    this.interstitial.load();
  }

  showAd(callback) {
    if (this.loaded) {
      this.onCloseCallback = callback;
      this.interstitial.show();
    } else {
      console.warn('Interstitial ad not ready. Reloading...');
      this.interstitial.load();
      if (callback) callback(); // Lanjutkan alur meski iklan tidak tampil
    }
  }

  getBannerUnitId() {
    return unitIds.banner;
  }
}

export default new AdManager();
