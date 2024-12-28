import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { GoldRateContext } from "../context/GoldRateContext"; // Import context

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

const InvestmentDetailScreen = () => {
  const [investmentHistory, setInvestmentHistory] = useState([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const { currentGoldRate } = useContext(GoldRateContext); // Gunakan context

  useEffect(() => {
    fetchInvestmentDetails();
  }, []);

  useEffect(() => {
        console.log("Current Gold Rate from Context:", currentGoldRate);
      }, [currentGoldRate]);

  const fetchInvestmentDetails = () => {
    db.transaction(tx => {
      // Fetch total weight
      tx.executeSql(
        `SELECT SUM(weight) AS totalWeight FROM Investments;`,
        [],
        (_, { rows }) => {
          const total = rows.item(0).totalWeight || 0;
          setTotalWeight(total);
        }
      );

      // Fetch investment history
      tx.executeSql(
        `SELECT * FROM Investments ORDER BY date DESC;`,
        [],
        (_, { rows }) => {
          setInvestmentHistory(rows._array);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detail Investasi</Text>
      <Text style={styles.summary}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
      <Text style={styles.summary}>
        Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString('id-ID')}
      </Text>
      <FlatList
        data={investmentHistory}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.weight}>{item.weight} gram</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  date: {
    fontSize: 16,
  },
  weight: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InvestmentDetailScreen;
