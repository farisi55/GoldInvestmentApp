import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import BannerAdComponent from "./BannerAdComponent"; // Import komponen banner iklan
import Icon from 'react-native-vector-icons/MaterialIcons'; // pastikan sudah install

const DashboardView = ({
  styles,
  currentGoldRate,
  totalWeight,
  totalInvestmentValue,
  navigation,
}) => {
  const currentValue = totalWeight * currentGoldRate;
  const difference = currentValue - totalInvestmentValue;
  const percentageChange = (difference / totalInvestmentValue) * 100;

  const isProfit = difference >= 0;
  const differenceColor = isProfit ? 'green' : 'red';
  //const arrowIcon = isProfit ? 'arrow-upward' : 'arrow-downward';
  //const arrowIcon = isProfit ? '📈' : '📉';
  const arrowIcon = isProfit
    ? require("../assets/icons/arrow_up.png")
    : require("../assets/icons/arrow_down.png");
  const investmentStatusText = `${isProfit ? 'Profit' : 'Lost'} ${Math.abs(percentageChange).toFixed(2)}% (Rp ${Math.abs(difference).toLocaleString("id-ID")})`;


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Investasi</Text>
      <Text style={styles.summary}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
      <Text style={styles.summary}>
        Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString("id-ID")}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
         <Image
           source={arrowIcon}
           style={{ width: 24, height: 24 }}
         />
         <Text style={{ color: differenceColor, marginLeft: 5 }}>
           {isProfit ? 'Profit' : 'Lost'} {Math.abs(percentageChange).toFixed(2)}% (
           Rp {Math.abs(difference).toLocaleString("id-ID")})
         </Text>
      </View>
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