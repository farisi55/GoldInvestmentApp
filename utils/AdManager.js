import { Alert } from 'react-native';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

class AdManager {
  constructor() {
    this.interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });

    this.adLoaded = false;

    // Listener untuk menangani event iklan
    this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
      this.adLoaded = true;
    });

    this.interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.error('Ad failed to load:', error);
    });

    // Load iklan pertama kali
    this.interstitial.load();
  }

  showAd() {
    if (this.adLoaded) {
      this.interstitial.show();
      this.adLoaded = false; // Reset status setelah iklan ditampilkan
      this.interstitial.load(); // Muat ulang iklan untuk ditampilkan kembali di lain waktu
    } else {
      Alert.alert('Iklan belum siap', 'Tunggu hingga iklan selesai dimuat.');
    }
  }
}

export default new AdManager();
