import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import SQLite from "react-native-sqlite-storage";
import RNFS from "react-native-fs"; // Library untuk file system
import Share from "react-native-share"; // Library untuk share (email, dll)
import DocumentPicker from "react-native-document-picker"; // Library untuk memilih file
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase({ name: "GoldInvestment.db", location: "default" });

export default function BackupRestoreScreen() {
  const [backupFilePath, setBackupFilePath] = useState("");
  const navigation = useNavigation();

  // Fungsi untuk Backup Database ke File JSON
  const handleBackup = async () => {
    try {
      // Baca data dari database
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT input_date, weight_gram, price_gold, investment_value, use_data FROM gold_investments WHERE use_data = 'Y';`,
          [],
          async (_, { rows }) => {
            const data = [];
            for (let i = 0; i < rows.length; i++) {
              data.push(rows.item(i));
            }

            // Konversi data menjadi JSON
            const jsonData = JSON.stringify(data);

            // Dapatkan tanggal saat ini
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

            // Simpan ke file dengan nama yang berisi tanggal
            const filePath = `${RNFS.DownloadDirectoryPath}/gold_invest_bck${formattedDate}.json`;
            await RNFS.writeFile(filePath, jsonData, "utf8");
            setBackupFilePath(filePath);

            Alert.alert(
              "Backup Sukses",
              `File backup berhasil disimpan di ${filePath}. Apakah Anda ingin mengirim file ini via email?`,
              [
                {
                  text: "Tidak",
                  style: "cancel",
                },
                {
                  text: "Ya",
                  onPress: () => handleShareFile(filePath),
                },
              ]
            );
          },
          (error) => {
            console.error("Error membaca data dari database:", error.message);
            Alert.alert("Error", "Gagal membaca data dari database.");
          }
        );
      });
    } catch (error) {
      console.error("Error saat backup:", error.message);
      Alert.alert("Error", "Gagal melakukan backup.");
    }
  };

  // Fungsi untuk Share File (via email atau aplikasi lain)
  const handleShareFile = async (filePath) => {
    try {
      const options = {
        title: "Kirim Backup",
        message: "Ini adalah file backup database Anda.",
        url: `file://${filePath}`,
        type: "application/json",
      };
      await Share.open(options);
    } catch (error) {
      console.error("Error saat share file:", error.message);
    }
  };

  // Fungsi untuk Restore Database dari File JSON
  const handleRestore = async () => {
    try {
      // Pilih file JSON menggunakan DocumentPicker
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      // Baca isi file
      const jsonData = await RNFS.readFile(file.uri, "utf8");
      const data = JSON.parse(jsonData);

      // Replace isi database dengan data dari file JSON
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM gold_investments;", [], () => {
          console.log("Database berhasil dikosongkan.");
        });

        data.forEach((item) => {
          tx.executeSql(
            `INSERT INTO gold_investments (input_date, weight_gram, price_gold, investment_value, use_data)
              VALUES (?, ?, ?, ?, ?);`,
            [
              item.input_date,
              item.weight_gram,
              item.price_gold,
              item.investment_value,
              item.use_data,
            ]
          );
        });

        Alert.alert("Restore Sukses", "Data berhasil di-restore dari file backup.");
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("User membatalkan pilihan file.");
      } else {
        console.error("Error saat restore:", error.message);
        Alert.alert("Error", "Gagal melakukan restore.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Backup & Restore</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackup}>
        <Text style={styles.buttonText}>Backup (Export)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRestore}>
        <Text style={styles.buttonText}>Restore (Import)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Back to Home </Text>
      </TouchableOpacity>
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
  header: {
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
});
