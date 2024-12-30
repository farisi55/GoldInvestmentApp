import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import SQLite from 'react-native-sqlite-storage';
import { GoldRateContext } from "../context/GoldRateContext"; // Import context

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

const AddInvestmentScreen = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date()); // Default tanggal saat ini
  const [showPicker, setShowPicker] = useState(false); // Kontrol visibilitas DateTimePicker
  const [goldWeight, setGoldWeight] = useState("");
  const [investmentValue, setInvestmentValue] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const { currentGoldRate } = useContext(GoldRateContext); // Gunakan context

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false); // Tutup DateTimePicker setelah pemilihan
    if (selectedDate) {
      // Ambil waktu dalam UTC dan tambahkan offset lokal
      const utcDate = new Date(selectedDate);
      const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
      setInputDate(localDate); // Set tanggal yang sesuai dengan zona waktu lokal
    }
  };

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
    const numericValue = value.replace(/\D/g, ""); // Hapus semua karakter non-numeric
    const formattedValue = new Intl.NumberFormat("id-ID").format(numericValue);
    setInvestmentValue(formattedValue);

    if (numericValue) {
      const weight = parseFloat(numericValue) / currentGoldRate;
      setGoldWeight(weight.toFixed(3)); // Format 0,xxx gram
    } else {
      setGoldWeight("");
    }
  };

  const addInvestment = () => {
    if (!inputDate || !goldWeight || !investmentValue) {
      Alert.alert('Error', 'Semua harus diisi!');
      return;
    }

    const formatDateToLocal = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
     };

    const weightGram = parseFloat(goldWeight);
    const investmentValueFormat = parseFloat(investmentValue.replace(/\D/g, ""));

    // Gunakan formatDateToLocal untuk menampilkan tanggal
    const formattedDate = formatDateToLocal(inputDate);

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO gold_investments (input_date, weight_gram, price_gold, investment_value)
         VALUES (?, ?, ?, ?)`,
        [formattedDate, weightGram, currentGoldRate, investmentValueFormat],
        (_, result) => {
          Alert.alert('Sukses', 'Investasi berhasil ditambahkan!');
          navigation.navigate('Home'); // Kembali ke layar Home
        },
        (_, error) => {
          console.error('Gagal menambahkan data:', error);
          Alert.alert('Error', 'Gagal menambahkan investasi.');
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tanggal (YYYY-MM-DD):</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
        <Text>{inputDate.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={inputDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.label}>Berat (gram):</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan berat (gram)"
        keyboardType="numeric"
        value={goldWeight}
        onChangeText={handleGoldWeightChange}
      />
      <Text style={styles.label}>Nilai Investasi (Rp):</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nilai Investasi (Rp)"
        keyboardType="numeric"
        value={investmentValue}
        onChangeText={handleInvestmentValueChange}
      />
      <Button title="Tambah Investasi" onPress={addInvestment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});

export default AddInvestmentScreen;