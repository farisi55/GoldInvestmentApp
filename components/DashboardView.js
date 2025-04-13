import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import BannerAdComponent from "./BannerAdComponent";

const DashboardView = ({
  currentGoldRate,
  totalWeight,
  totalInvestmentValue,
  navigation,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const iconSize = screenWidth / 4;

  const IconButton = ({ icon, label, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    return (
      <TouchableWithoutFeedback
        onPressIn={() => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start()}
        onPressOut={() =>
          Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start(() => onPress && onPress())
        }
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', margin: 8 }}>
          <Image source={icon} style={{ width: iconSize, height: iconSize }} resizeMode="contain" />
          <Text style={{
            fontSize: 13,
            fontWeight: '600',
            color: '#333',
            textAlign: 'center',
            marginTop: 4,
          }}>{label}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const currentValue = totalWeight * currentGoldRate;
  const difference = currentValue - totalInvestmentValue;
  const percentageChange = (difference / totalInvestmentValue) * 100;
  const isProfit = difference >= 0;
  const differenceColor = isProfit ? 'green' : 'red';
  const arrowIcon = isProfit
    ? require("../assets/icons/arrow_up.png")
    : require("../assets/icons/arrow_down.png");

  return (
    <LinearGradient
      colors={["#fff8e1", "#ffe082", "#ffca28"]}
      style={{ flex: 1, padding: 20, justifyContent: "space-between" }}
    >
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>Dashboard Investasi</Text>
        <Text style={{ fontSize: 16, marginBottom: 6 }}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
        <Text style={{ fontSize: 16, marginBottom: 6 }}>
          Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString("id-ID")}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <Image source={arrowIcon} style={{ width: 24, height: 24 }} />
          <Text style={{ color: differenceColor, marginLeft: 6 }}>
            {isProfit ? 'Profit' : 'Lost'} {Math.abs(percentageChange).toFixed(2)}% (
            Rp {Math.abs(difference).toLocaleString("id-ID")})
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginTop: 10,
          marginBottom: 16,
        }}
      >
        <IconButton
          icon={require("../assets/icons/view_graph.png")}
          label="Grafik Investasi"
          onPress={() => navigation.navigate("Graph")}
        />
        <IconButton
          icon={require("../assets/icons/add_investment.png")}
          label="Tambah Catatan"
          onPress={() => navigation.navigate("AddInvestment")}
        />
        <IconButton
          icon={require("../assets/icons/investment_detail.png")}
          label="Detail Catatan"
          onPress={() => navigation.navigate("InvestmentDetail")}
        />
        <IconButton
          icon={require("../assets/icons/backup_restore.png")}
          label="Backup Restore"
          onPress={() => navigation.navigate("BackupRestore")}
        />
        <IconButton
          icon={require("../assets/icons/gold_prices.png")}
          label="Harga Emas"
          onPress={() => navigation.navigate("Gold Prices")}
        />
        <IconButton
          icon={require("../assets/icons/about.png")}
          label="Tentang App"
          onPress={() => navigation.navigate("About")}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 14, fontStyle: "italic", color: "#333" }}>
          Selamat datang di aplikasi pencatatan emas!
        </Text>
      </View>

      {/* Banner Iklan di bagian bawah */}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <BannerAdComponent />
      </View>
    </LinearGradient>
  );
};

export default DashboardView;
