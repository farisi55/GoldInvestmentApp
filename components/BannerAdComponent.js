// BannerAdComponent.js

import React from 'react';
import { View } from 'react-native';
import { GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import AdManager from '../utils/AdManager';

const BannerAdComponent = () => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <GAMBannerAd
        unitId={AdManager.getBannerUnitId()}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          keywords: [
            'emas',
            'investasi',
            'keuangan',
            'syariah',
            'logam mulia',
            'gold investment',
            'financial planning',
            'pengelolaan uang',
            'tabungan emas',
            'investasi halal',
          ],
        }}
      />
    </View>
  );
};

export default BannerAdComponent;