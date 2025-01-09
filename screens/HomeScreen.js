import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  BackHandler, // Import BackHandler
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import { fetchGoldPrice } from "../utils/goldPriceHelper"; // Impor fungsi fetchGoldPrice
import { GoldRateContext } from "../context/GoldRateContext"; // Import context

// Buka database SQLite
const db = SQLite.openDatabase({ name: "GoldInvestment.db", location: "default" });

export default function HomeScreen() {
  const [totalWeight, setTotalWeight] = useState(0);
  //const [currentGoldRate, setCurrentGoldRate] = useState(0); // Awalnya 0 untuk get dari API
  const { currentGoldRate, setCurrentGoldRate } = useContext(GoldRateContext); // Gunakan context
  const navigation = useNavigation();

//  Set harga emas dari API
//  useEffect(() => {
//      async function getGoldPrice() {
//        const goldPrice = await fetchGoldPrice();
//        setCurrentGoldRate(goldPrice); // Set harga emas dari API
//      }
//
//      getGoldPrice();
//    }, []);

  useEffect(() => {
    const fetchData = async () => {
      const goldPrice = await fetchGoldPrice();
      setCurrentGoldRate(goldPrice); // Perbarui nilai di context
    };
    fetchData();

     // Handle tombol "Back"
        const backAction = () => {
          Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar dari aplikasi?", [
            {
              text: "Tidak",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "Ya",
              onPress: () => BackHandler.exitApp(), // Keluar aplikasi
            },
          ]);
          return true; // Mencegah tindakan default
        };

        // Tambahkan listener BackHandler
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        // Bersihkan listener saat komponen unmount
        return () => backHandler.remove();
  }, []);

  // CEK LOG current Gold Rate
  //    useEffect(() => {
  //      console.log("Current Gold Rate from Context:", currentGoldRate);
  //    }, [currentGoldRate]);



     //DROP TABLE
//        db.transaction(tx => {
//          tx.executeSql(
//            'DROP TABLE IF EXISTS gold_investments',
//            [],
//            () => console.log('Old Investments table dropped'),
//            error => console.error('Error dropping old Investments table:', error)
//          );
//        });

    // CREATE TABLE
    db.transaction((tx) => {
      tx.executeSql(
            `CREATE TABLE IF NOT EXISTS gold_investments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              input_date DATETIME NOT NULL,
              sys_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              sys_update_date DATETIME NULL,
              weight_gram FLOAT NOT NULL,
              price_gold FLOAT NOT NULL,
              investment_value FLOAT NOT NULL,
              use_data VARCHAR(5) DEFAULT 'Y'
         )`,
         [],
         () => {}, //=> console.log("Tabel 'gold_investments' berhasil dibuat"),
         (error) => Alert.alert("Error", "Gagal membuat tabel: " + error.message)
      );
    });

   // QUERY total Invest
   db.transaction((tx) => {
     tx.executeSql(
       `SELECT SUM(weight_gram) AS totalWeight FROM gold_investments WHERE use_data = 'Y';`,
       [],
       (_, { rows }) => {
         if (rows.length > 0) {
           const total = rows.item(0).totalWeight || 0;
           setTotalWeight(total);
         } else {
           setTotalWeight(0);
         }
       },
       (error) => {
         console.error("Gagal mendapatkan total investasi:", error.message);
       }
     );
   });

  return (
    <View style={styles.container}>
      <Text style={styles.goldRate}>
        Harga Emas Hari Ini: Rp {currentGoldRate.toLocaleString("id-ID")}/gram
      </Text>
      <Text style={styles.header}>Dashboard Investasi</Text>
            <Text style={styles.summary}>Total Berat: {totalWeight.toFixed(2)} gram</Text>
            <Text style={styles.summary}>
              Nilai Investasi: Rp {(totalWeight * currentGoldRate).toLocaleString('id-ID')} </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
  },
  spacing: {
    marginVertical: 10,
  },
  result: {
    fontSize: 16,
    marginBottom: 8,
  },
  goldRate: {
    fontSize: 16,
    marginBottom: 24,
    color: "#888",
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
});