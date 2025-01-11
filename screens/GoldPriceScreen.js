import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import GoldRatesList from "../components/GoldRatesList";
import DeveloperInfo from "../components/DeveloperInfo";
import { fetchGoldRates } from "../services/GoldRateService";
import styles from "../styles/CssStyles";

const GoldPriceScreen = () => {
  const [goldRates, setGoldRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGoldRates = async () => {
      const rates = await fetchGoldRates();
      setGoldRates(rates);
      setLoading(false);
    };
    loadGoldRates();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading gold rates...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerAbout}>
      <Text style={styles.headerAbout}>Gold Rates (Realtime)</Text>
      <GoldRatesList goldRates={goldRates} />
      <DeveloperInfo />
    </View>
  );
};

export default GoldPriceScreen;
