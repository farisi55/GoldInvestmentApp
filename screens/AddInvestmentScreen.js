import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

const AddInvestmentScreen = ({ navigation }) => {
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const addInvestment = () => {
    if (!date || !weight) {
      Alert.alert('Error', 'Tanggal dan berat harus diisi!');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Investments (date, weight) VALUES (?, ?);`,
        [date, parseFloat(weight)],
        (_, result) => {
          Alert.alert('Sukses', 'Investasi berhasil ditambahkan!');
          navigation.goBack(); // Kembali ke layar sebelumnya
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
      <TextInput
        style={styles.input}
        placeholder="Masukkan tanggal"
        value={date}
        onChangeText={setDate}
      />
      <Text style={styles.label}>Berat (gram):</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan berat (gram)"
        value={weight}
        keyboardType="numeric"
        onChangeText={setWeight}
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
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default AddInvestmentScreen;
