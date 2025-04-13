import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createTables, getTotalInvestmentData } from "../repository/GoldInvestmentRepository";
import { fetchGoldPrice } from "../utils/GoldPriceHelper";
import { GoldRateContext } from "../context/GoldRateContext";
import DashboardView from "../components/DashboardView";
import useBackHandler from "../utils/ButtonBackHandler";

export default function HomeScreen() {
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalInvestmentValue, setTotalInvestmentValue] = useState(0);
  const { currentGoldRate, setCurrentGoldRate } = useContext(GoldRateContext);
  const navigation = useNavigation();

  useBackHandler(); // custom back button handler

  useEffect(() => {
    async function init() {
      const goldPrice = await fetchGoldPrice();
      setCurrentGoldRate(goldPrice);

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
