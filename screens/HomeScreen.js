import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import { fetchGoldPrice } from "../utils/goldPriceHelper"; // Impor fungsi fetchGoldPrice
import { GoldRateContext } from "../context/GoldRateContext"; // Import context

// Buka database SQLite
const db = SQLite.openDatabase({ name: "GoldInvestment.db", location: "default" });

export default function HomeScreen() {
  const [goldWeight, setGoldWeight] = useState("");
  const [investmentValue, setInvestmentValue] = useState("");
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
  }, []);

  // CEK LOG current Gold Rate
  //    useEffect(() => {
  //      console.log("Current Gold Rate from Context:", currentGoldRate);
  //    }, [currentGoldRate]);

  const handleGoldWeightChange = (weight) => {
    setGoldWeight(weight);
    if (!isNaN(weight) && weight !== "") {
      const value = parseFloat(weight) * currentGoldRate;
      setInvestmentValue(value.toLocaleString("id-ID")); // Format Rp
    } else {
      setInvestmentValue("");
    }
  };

  const handleInvestmentValueChange = (value) => {
    // Hapus semua karakter non-numeric sebelum diolah
    const numericValue = value.replace(/\D/g, "");

    // Format angka dengan separator ribuan
    const formattedValue = new Intl.NumberFormat("id-ID").format(numericValue);

    setInvestmentValue(formattedValue);

    if (numericValue) {
      // Konversi ke berat emas
      const weight = parseFloat(numericValue) / currentGoldRate;
      setGoldWeight(weight.toFixed(3)); // Format 0,xxx gram
    } else {
      setGoldWeight("");
    }
  };

  const saveInvestment = () => {
    if (!goldWeight || !investmentValue) {
      Alert.alert("Error", "Mohon isi semua data!");
      return;
    }

    const weight = parseFloat(goldWeight);
    const value = parseFloat(investmentValue.replace(/\D/g, ""));
    const currentValue = weight * currentGoldRate;

    console.log('nilai value', value);
    console.log('nilai currentValue', currentValue);

    // DROP TABLE
    //    db.transaction(tx => {
    //      tx.executeSql(
    //        'DROP TABLE IF EXISTS Investments',
    //        [],
    //        () => console.log('Old Investments table dropped'),
    //        error => console.error('Error dropping old Investments table:', error)
    //      );
    //    });


    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS investments (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, weight REAL, investment REAL, currentValue REAL)",
        [],
        () => {
          tx.executeSql(
            "INSERT INTO investments (weight, investment, currentValue) VALUES (?, ?, ?)",
            [weight, value, currentValue],
            () => Alert.alert("Sukses", "Data berhasil disimpan!"),
            (error) => Alert.alert("Error", "Gagal menyimpan data: " + error.message)
          );
        },
        (error) => Alert.alert("Error", "Gagal membuat tabel: " + error.message)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.goldRate}>
        Harga Emas Hari Ini: Rp {currentGoldRate.toLocaleString("id-ID")}/gram
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Berat Emas (gram)"
        keyboardType="numeric"
        value={goldWeight}
        onChangeText={handleGoldWeightChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Nilai Investasi (Rp)"
        keyboardType="numeric"
        value={investmentValue}
        onChangeText={handleInvestmentValueChange}
      />
      <Button title="Catat Investasi" onPress={saveInvestment} />
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
});
