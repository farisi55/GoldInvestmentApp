import React from 'react';
import { View } from 'react-native';
import { GAMBannerAd, BannerAdSize, TestIds  } from 'react-native-google-mobile-ads';


  const BannerAdComponent = () => {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <GAMBannerAd
          unitId={TestIds.BANNER}
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
            ]
          }}
        />
      </View>
    );
  };

export default BannerAdComponent;