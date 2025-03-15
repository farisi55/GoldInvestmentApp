import React from 'react';
import { View } from 'react-native';
import { GAMBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BannerAdComponent = () => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <GAMBannerAd
        unitId={TestIds.BANNER}
        sizes={[BannerAdSize.FULL_BANNER]}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default BannerAdComponent;