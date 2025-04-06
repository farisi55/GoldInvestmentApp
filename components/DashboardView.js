import React, { useRef }  from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, Animated, TouchableWithoutFeedback } from "react-native";
import BannerAdComponent from "./BannerAdComponent"; // Import komponen banner iklan

const DashboardView = ({
  styles,
  currentGoldRate,
  totalWeight,
  totalInvestmentValue,
  navigation,
}) => {
  const buttonIconSize = { width: 60, height: 60 }; // Bisa diubah sesuai kebutuhan
  const screenWidth = Dimensions.get("window").width;
  const iconSize = screenWidth / 3.5; // biar muat 3 kolom dengan jarak pas

 const IconButton = ({ icon, label, onPress }) => {
   const scaleAnim = useRef(new Animated.Value(1)).current;

   const handlePressIn = () => {
     Animated.spring(scaleAnim, {
       toValue: 0.95,
       useNativeDriver: true,
     }).start();
   };

   const handlePressOut = () => {
     Animated.spring(scaleAnim, {
       toValue: 1,
       useNativeDriver: true,
     }).start(() => {
       onPress && onPress();
     });
   };

   return (
       <TouchableWithoutFeedback
         onPressIn={handlePressIn}
         onPressOut={handlePressOut}
       >
         <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center', margin: 10 }}>
           <Image source={icon} style={{ width: iconSize, height: iconSize }} resizeMode="contain" />
           <Text style={{
             marginTop: 6,
             fontSize: 13,
             fontWeight: '500',
             color: '#444',
             textAlign: 'center',
             maxWidth: iconSize,
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
  //const arrowIcon = isProfit ? 'arrow-upward' : 'arrow-downward';
  //const arrowIcon = isProfit ? '📈' : '📉';
  const arrowIcon = isProfit
    ? require("../assets/icons/arrow_up.png")
    : require("../assets/icons/arrow_down.png");
  //const investmentStatusText = `${isProfit ? 'Profit' : 'Lost'} ${Math.abs(percentageChange).toFixed(2)}% (Rp ${Math.abs(difference).toLocaleString("id-ID")})`;


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Investasi</Text>
      <Text style={styles.summary}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
      <Text style={styles.summary}>
        Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString("id-ID")}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Image source={arrowIcon} style={{ width: 24, height: 24 }} />
        <Text style={{ color: differenceColor, marginLeft: 5 }}>
          {isProfit ? 'Profit' : 'Lost'} {Math.abs(percentageChange).toFixed(2)}% (
          Rp {Math.abs(difference).toLocaleString("id-ID")})
        </Text>
      </View>

      <View style={styles.spacing} />

      {/* Grid 2x3 */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}
      >
       <IconButton
           icon={require("../assets/icons/view_graph.png")}
           label="Grafik"
           onPress={() => navigation.navigate("Graph")}
         />
         <IconButton
           icon={require("../assets/icons/add_investment.png")}
           label="Tambah"
           onPress={() => navigation.navigate("AddInvestment")}
         />
         <IconButton
           icon={require("../assets/icons/investment_detail.png")}
           label="Detail"
           onPress={() => navigation.navigate("InvestmentDetail")}
         />
         <IconButton
           icon={require("../assets/icons/backup_restore.png")}
           label="Backup"
           onPress={() => navigation.navigate("BackupRestore")}
         />
         <IconButton
           icon={require("../assets/icons/gold_prices.png")}
           label="Harga"
           onPress={() => navigation.navigate("Gold Prices")}
         />
         <IconButton
           icon={require("../assets/icons/about.png")}
           label="Tentang"
           onPress={() => navigation.navigate("About")}
         />
       </View>

      <Text style={styles.title}>Welcome to Gold Investment App</Text>

      {/* Menggunakan komponen BannerAdComponent */}
      <BannerAdComponent />
    </View>
  );
};

export default DashboardView;