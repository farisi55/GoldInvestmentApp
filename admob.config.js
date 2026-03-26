/**
 * admob.config.js — Catat Emas
 *
 * Satu tempat untuk semua konfigurasi AdMob.
 * Import file ini di AdManager dan BannerAdComponent.
 *
 * Dev mode  : Selalu pakai Test IDs resmi Google → tidak bisa kena policy violation.
 * Prod mode : Baca dari react-native-config (.env) → tidak ada hardcoded ID di source.
 *
 * Untuk mengganti ke production:
 *   1. Isi ADMOB_* di file .env (lihat .env.example)
 *   2. Ganti android_app_id di app.json dengan App ID production
 *   3. Build release → ID production otomatis dipakai
 */

import { TestIds } from 'react-native-google-mobile-ads';
import Config from 'react-native-config';

const isDev = __DEV__;

const AdConfig = {
  /** Apakah saat ini berjalan dalam mode development */
  isDev,

  /** Unit IDs — otomatis Test ID saat dev, production ID saat release */
  unitIds: {
    banner: isDev
      ? TestIds.BANNER
      : Config.ADMOB_BANNER_UNIT_ID || 'ca-app-pub-MISSING/BANNER',

    interstitial: isDev
      ? TestIds.INTERSTITIAL
      : Config.ADMOB_INTERSTITIAL_UNIT_ID || 'ca-app-pub-MISSING/INTERSTITIAL',

    rewarded: isDev
      ? TestIds.REWARDED
      : Config.ADMOB_REWARDED_UNIT_ID || 'ca-app-pub-MISSING/REWARDED',

    appOpen: isDev
      ? TestIds.APP_OPEN
      : Config.ADMOB_APPOPEN_UNIT_ID || 'ca-app-pub-MISSING/APP_OPEN',
  },

  /**
   * Request options default yang dipakai di semua permintaan iklan.
   * requestNonPersonalizedAdsOnly: true → aman untuk GDPR/compliance dasar.
   */
  defaultRequestOptions: {
    requestNonPersonalizedAdsOnly: true,
    keywords: [
      'emas',
      'investasi',
      'keuangan',
      'logam mulia',
      'tabungan',
      'perencanaan keuangan',
      'gold investment',
      'financial planning',
    ],
  },
};

export default AdConfig;
