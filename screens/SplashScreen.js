import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')} // Ganti dengan logomu
        style={styles.logo}
      />
      <Text style={styles.title}>GoldInvestmentApp</Text>

      {/* ANIMASI LOTTIE */}
      <LottieView
        source={require('../assets/lottie/loading_gold.json')} // Ganti dengan file animasi kamu
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#bfa100',
    marginBottom: 15,
  },
  lottie: {
    width: 150,
    height: 150,
  },
});