import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, SafeAreaView, TouchableOpacity  } from 'react-native';
import DatePickerInput from '../components/DatePickerInput';
import { addInvestmentToDatabase } from '../repository/GoldInvestmentRepository';
import { GoldRateContext } from '../context/GoldRateContext';
import styles from '../styles/CssStyles';
import AdManager from '../utils/AdManager'; // Import AdManager
import BannerAdComponent from "../components/BannerAdComponent";

const AddInvestmentScreen = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date());
  const [goldWeight, setGoldWeight] = useState('');
  const [investmentValue, setInvestmentValue] = useState('');
  const { currentGoldRate } = useContext(GoldRateContext);

  const handleGoldWeightChange = (weight) => {
    setGoldWeight(weight);
    if (!isNaN(weight) && weight !== '') {
      const value = parseFloat(weight) * currentGoldRate;
      setInvestmentValue(value.toLocaleString('id-ID'));
    } else {
      setInvestmentValue('');
    }
  };

  const handleInvestmentValueChange = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = new Intl.NumberFormat('id-ID').format(numericValue);
    setInvestmentValue(formattedValue);

    if (numericValue) {
      const weight = parseFloat(numericValue) / currentGoldRate;
      setGoldWeight(weight.toFixed(3));
    } else {
      setGoldWeight('');
    }
  };

  const addInvestment = async () => {
    if (!inputDate || !goldWeight || !investmentValue) {
      Alert.alert('Error', 'Semua harus diisi!');
      return;
    }

    try {
      const success = await addInvestmentToDatabase(
        inputDate,
        parseFloat(goldWeight),
        currentGoldRate,
        parseFloat(investmentValue.replace(/\D/g, ''))
      );

      if (success) {
        AdManager.showAd(); // Gunakan AdManager untuk menampilkan iklan
        Alert.alert('Sukses', 'Investasi berhasil ditambahkan!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Gagal menambahkan investasi:', error);
      Alert.alert('Error', 'Gagal menambahkan investasi.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}>
        <View>
          <Text style={styles.label}>Tanggal (YYYY-MM-DD):</Text>
          <DatePickerInput date={inputDate} onDateChange={setInputDate} />

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

          <TouchableOpacity
            style={styles.backButton}
            onPress={addInvestment}
          >
            <Text style={styles.backButtonText}>Tambah Investasi</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Ad di bagian bawah */}
        <View style={{ marginTop: 20 }}>
          <BannerAdComponent />
        </View>
      </View>
    </SafeAreaView>
  );

};

export default AddInvestmentScreen;