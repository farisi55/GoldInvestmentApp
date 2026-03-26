/**
 * App.js — Catat Emas
 * Entry point utama aplikasi.
 *
 * Perubahan dari versi sebelumnya:
 * 1. initialRouteName diubah ke "Splash" agar splash screen tidak dilewati.
 * 2. mobileAds().initialize() dipanggil di sini sebelum navigator dirender,
 *    sehingga AdMob SDK siap sebelum iklan pertama diminta.
 * 3. Request configuration (tag for child-directed treatment & under-age consent)
 *    ditambahkan sebelum initialize untuk policy compliance.
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import HomeScreen from './screens/HomeScreen';
import GraphScreen from './screens/GraphScreen';
import AddInvestmentScreen from './screens/AddInvestmentScreen';
import InvestmentDetailScreen from './screens/InvestmentDetailScreen';
import GoldPriceScreen from './screens/GoldPriceScreen';
import AboutScreen from './screens/AboutScreen';
import SplashScreen from './screens/SplashScreen';
import BackupRestoreScreen from './screens/BackupRestoreScreen';
import { GoldRateProvider } from './context/GoldRateContext';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Inisialisasi AdMob SDK sekali saat app pertama kali dimuat.
    // Request configuration harus diset SEBELUM initialize().
    mobileAds()
      .setRequestConfiguration({
        // Tidak menargetkan anak-anak (aplikasi keuangan untuk umum)
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
        maxAdContentRating: MaxAdContentRating.PG,
      })
      .then(() => mobileAds().initialize())
      .then(adapterStatuses => {
        // SDK siap — AdManager boleh mulai load iklan setelah ini.
        console.log('AdMob initialized', adapterStatuses);
      })
      .catch(err => {
        // Gagal init tidak boleh crash app; cukup log.
        console.warn('AdMob initialization failed:', err);
      });
  }, []);

  return (
    <GoldRateProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash" // ← FIX: Splash sebagai entry point
          screenOptions={{
            headerStyle: { backgroundColor: '#f5a623' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Graph"
            component={GraphScreen}
            options={{ title: 'Grafik Investasi' }}
          />
          <Stack.Screen name="AddInvestment" component={AddInvestmentScreen} />
          <Stack.Screen
            name="InvestmentDetail"
            component={InvestmentDetailScreen}
          />
          <Stack.Screen
            name="BackupRestore"
            component={BackupRestoreScreen}
          />
          <Stack.Screen name="Gold Prices" component={GoldPriceScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GoldRateProvider>
  );
}
