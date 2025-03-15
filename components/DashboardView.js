import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BannerAdComponent from "./BannerAdComponent"; // Import komponen banner iklan

const DashboardView = ({ styles, currentGoldRate, totalWeight, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.goldRate}>
        Harga Emas Hari Ini: Rp {currentGoldRate.toLocaleString("id-ID")}/gram
      </Text>
      <Text style={styles.header}>Dashboard Investasi</Text>
      <Text style={styles.summary}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
      <Text style={styles.summary}>
        Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString("id-ID")}
      </Text>
      <View style={styles.spacing} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Graph")}
      >
        <Text style={styles.buttonText}>View Graph</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddInvestment")}
      >
        <Text style={styles.buttonText}>Add Investment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("InvestmentDetail")}
      >
        <Text style={styles.buttonText}>Investment Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BackupRestore")}
      >
        <Text style={styles.buttonText}>Backup/Restore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Gold Prices")}
      >
        <Text style={styles.buttonText}>Gold Prices</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to Gold Investment App</Text>

      {/* Menggunakan komponen BannerAdComponent */}
      <BannerAdComponent />
    </View>
  );
};

export default DashboardView;