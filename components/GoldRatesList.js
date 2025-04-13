import React from "react";
import { View, Text, FlatList, SafeAreaView, Button, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/CssStyles";
import BannerAdComponent from "./BannerAdComponent";
import AdManager from '../utils/AdManager'; // Import AdManager

const GoldRatesList = ({ goldRates }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={goldRates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.currency}>{item.currency}</Text>
              {Object.entries(item.goldRates).map(([key, value]) => (
                <Text key={key} style={styles.rateText}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          )}
        />

        {/* Tombol dan iklan di bawah */}
        <View style={{ padding: 16 }}>
          <TouchableOpacity
             style={styles.backButton}
             onPress={() => {
               AdManager.showAd();
               navigation.navigate('Home');
             }}
           >
             <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </View>

        <BannerAdComponent />
      </View>
    </SafeAreaView>
  );
};

export default GoldRatesList;
