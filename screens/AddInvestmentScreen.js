import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DatePickerInput from '../components/DatePickerInput';
import { addInvestmentToDatabase } from '../repository/GoldInvestmentRepository';
import { GoldRateContext } from '../context/GoldRateContext';
import styles from '../styles/CssStyles';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

// Membuat iklan interstitial
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const AddInvestmentScreen = ({ navigation }) => {
  const [inputDate, setInputDate] = useState(new Date());
  const [goldWeight, setGoldWeight] = useState('');
  const [investmentValue, setInvestmentValue] = useState('');
  const { currentGoldRate } = useContext(GoldRateContext);
  const [adLoaded, setAdLoaded] = useState(false); // Status apakah iklan sudah dimuat
  const [isWaiting, setIsWaiting] = useState(false); // Status apakah sedang menunggu


    useEffect(() => {
      // Listener untuk event iklan
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setAdLoaded(true);
        setIsWaiting(false); // Stop timer ketika iklan selesai dimuat
      });

      const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
        console.error('Ad failed to load:', error);
      });

      // Memuat iklan
      interstitial.load();

      // Membersihkan listener ketika komponen unmount
      return () => {
        unsubscribe();
        unsubscribeError();
      };
    }, []);

  const handleShowAd = () => {
      if (adLoaded) {
        interstitial.show();
        setAdLoaded(false); // Reset status setelah iklan ditampilkan
        interstitial.load(); // Memulai kembali proses pemuatan iklan
      } else {
        Alert.alert('Iklan belum siap', 'Tunggu hingga iklan selesai dimuat.');
      }
    };

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
      const success = await addInvestmentToDatabase(inputDate, parseFloat(goldWeight), currentGoldRate, parseFloat(investmentValue.replace(/\D/g, '')));
      if (success) {
          if (!adLoaded) {
             //startAdTimer(); // Mulai timer jika iklan belum siap
          } else {
            handleShowAd(); // Tampilkan iklan jika sudah siap
          }
        Alert.alert('Sukses', 'Investasi berhasil ditambahkan!');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Gagal menambahkan investasi:', error);
      Alert.alert('Error', 'Gagal menambahkan investasi.');
    }
  };

  return (
    <View style={styles.containerAddInvestment}>
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
      <Button title="Tambah Investasi" onPress={addInvestment} />
    </View>
  );
};

export default AddInvestmentScreen;
