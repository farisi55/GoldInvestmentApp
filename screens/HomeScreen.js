import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createTables, getTotalInvestmentData } from "../repository/GoldInvestmentRepository";
import { fetchGoldPrice } from "../utils/GoldPriceHelper";
import { GoldRateContext } from "../context/GoldRateContext";
import DashboardView from "../components/DashboardView";
import useBackHandler from "../utils/ButtonBackHandler";
import { View, Text, Alert, ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const [totalWeight, setTotalWeight] = useState(0);
  const [isLoadingGoldPrice, setIsLoadingGoldPrice] = useState(false);
  const [totalInvestmentValue, setTotalInvestmentValue] = useState(0);
  const { currentGoldRate, setCurrentGoldRate } = useContext(GoldRateContext);
  const navigation = useNavigation();

  useBackHandler(); // custom back button handler

   useEffect(() => {
      async function init() {
        setIsLoadingGoldPrice(true); // Mulai loading

        try {
          const goldPrice = await fetchGoldPrice();
          setCurrentGoldRate(goldPrice);
        } catch (error) {
          console.log('Error fetching gold price:', error);
          Alert.alert('Gagal', 'Gagal memuat harga emas. Silakan coba lagi nanti.');
        } finally {
          setIsLoadingGoldPrice(false); // Selesai loading
        }

        await createTables();
        const { totalWeight, totalInvestmentValue } = await getTotalInvestmentData();
        setTotalWeight(totalWeight);
        setTotalInvestmentValue(totalInvestmentValue);
      }

      init();
    }, []);

  return (
    <DashboardView
      currentGoldRate={currentGoldRate}
      totalWeight={totalWeight}
      totalInvestmentValue={totalInvestmentValue}
      navigation={navigation}
    />
  );
}
