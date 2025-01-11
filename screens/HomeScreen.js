import React, { useEffect, useState, useContext } from "react";
import { BackHandler, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createTables, getTotalInvestment } from "../repository/GoldInvestmentRepository";
import { fetchGoldPrice } from "../utils/GoldPriceHelper";
import { GoldRateContext } from "../context/GoldRateContext";
import styles from "../styles/CssStyles";
import DashboardView from "../components/DashboardView";
import useBackHandler from "../utils/ButtonBackHandler"; // Import custom hook

export default function HomeScreen() {
  const [totalWeight, setTotalWeight] = useState(0);
  const { currentGoldRate, setCurrentGoldRate } = useContext(GoldRateContext);
  const navigation = useNavigation();
  useBackHandler(); // Gunakan custom hook untuk menangani tombol back

  useEffect(() => {
    // Fetch data and setup
    async function init() {
      const goldPrice = await fetchGoldPrice();
      setCurrentGoldRate(goldPrice);

      createTables();
      const total = await getTotalInvestment();
      setTotalWeight(total);
    }

    init();
  }, []);


  return (
    <DashboardView
      styles={styles}
      currentGoldRate={currentGoldRate}
      totalWeight={totalWeight}
      navigation={navigation}
    />
  );
}
