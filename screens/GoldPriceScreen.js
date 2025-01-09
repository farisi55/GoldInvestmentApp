import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";

const GoldPriceScreen = () => {
  const [goldRates, setGoldRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoldRates = async () => {
    try {
      const response = await fetch("https://data-asg.goldprice.org/dbXRates/IDR");
      const data = await response.json();

      // Initialize conversion constants
      const OZ_TO_GRAM = 31.1035;
      const TOLA_TO_GRAM = 11.66;

      const processedRates = data.items.map((item) => {
        const goldPriceOZ = item.xauPrice;
        const goldPriceG = goldPriceOZ / OZ_TO_GRAM;
        const goldPriceTola = goldPriceG * TOLA_TO_GRAM;


      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

        return {
          currency: item.curr,
          goldRates: {
            "Price per Gram": formatter.format(goldPriceG),
            "Price per Tola": formatter.format(goldPriceTola),
            "Price per Ounce": formatter.format(goldPriceOZ),
          },
        };
      });

      setGoldRates(processedRates);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch gold rates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoldRates();
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
    <View style={styles.container}>
      <Text style={styles.header}>Gold Rates (Realtime)</Text>
      <FlatList
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  currency: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rateText: {
    fontSize: 16,
    color: "#333",
  },
});

export default GoldPriceScreen;
