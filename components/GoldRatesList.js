import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../styles/CssStyles";

const GoldRatesList = ({ goldRates }) => {
  return (
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
  );
};

export default GoldRatesList;
