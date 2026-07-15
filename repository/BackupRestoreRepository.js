/**
 * repository/BackupRestoreRepository.js
 * Handles JSON backup and restore for gold investment data.
 *
 * Updated by Task #003: replaced console.error with logError (CrashReporter).
 */

import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';
import { logError } from '../utils/CrashReporter';

const db = SQLite.openDatabase({ name: 'GoldInvestment.db', location: 'default' });

// Fungsi untuk Backup Database ke File JSON
export const handleBackup = async () => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT input_date, weight_gram, price_gold, investment_value, use_data FROM gold_investments WHERE use_data = 'Y';`,
        [],
        async (_, { rows }) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }

          const jsonData = JSON.stringify(data);
          const currentDate = new Date();
          const formattedDate = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}`;

          const filePath = `${RNFS.DownloadDirectoryPath}/gold_invest_bck${formattedDate}.json`;
          await RNFS.writeFile(filePath, jsonData, 'utf8');

          Alert.alert(
            'Backup Sukses',
            `File backup berhasil disimpan di ${filePath}. Apakah Anda ingin mengirim file ini via email?`,
            [
              { text: 'Tidak', style: 'cancel' },
              { text: 'Ya', onPress: () => handleShareFile(filePath) },
            ],
          );
        },
        (error) => {
          logError('BackupRestoreRepository.handleBackup.read', error);
          Alert.alert('Error', 'Gagal membaca data dari database.');
        },
      );
    });
  } catch (error) {
    logError('BackupRestoreRepository.handleBackup', error);
    Alert.alert('Error', 'Gagal melakukan backup.');
  }
};

// Fungsi untuk Share File
const handleShareFile = async (filePath) => {
  try {
    const options = {
      title: 'Kirim Backup',
      message: 'Ini adalah file backup database Anda.',
      url: `file://${filePath}`,
      type: 'application/json',
    };
    await Share.open(options);
  } catch (error) {
    logError('BackupRestoreRepository.handleShareFile', error);
  }
};

// Fungsi untuk Restore Database dari File JSON
export const handleRestore = async () => {
  try {
    const file = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.allFiles],
    });

    const jsonData = await RNFS.readFile(file.uri, 'utf8');
    const data = JSON.parse(jsonData);

    db.transaction((tx) => {
      tx.executeSql('DELETE FROM gold_investments;', [], () => {
        // Database cleared successfully — informational only.
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
          ],
        );
      });

      Alert.alert('Restore Sukses', 'Data berhasil di-restore dari file backup.');
    });
  } catch (error) {
    if (DocumentPicker.isCancel(error)) {
      // User dismissed picker — not an error.
    } else {
      logError('BackupRestoreRepository.handleRestore', error);
      Alert.alert('Error', 'Gagal melakukan restore.');
    }
  }
};
