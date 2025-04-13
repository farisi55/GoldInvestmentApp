import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleBackup, handleRestore } from "../repository/BackupRestoreRepository";
import styles from "../styles/CssStyles";
import BannerAdComponent from "../components/BannerAdComponent";
import AdManager from '../utils/AdManager';

const BackupRestoreScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.header, { textAlign: 'center', marginBottom: 30 }]}>
            Backup & Restore
          </Text>

          <View style={styles.backupRestoreContainer}>
            {/* Backup Button */}
            <TouchableOpacity
              style={styles.backupRestoreButton}
              onPress={() => AdManager.showAd(handleBackup)}
            >
              <Image
                source={require('../assets/icons/backup.png')}
                style={styles.backupRestoreIcon}
                resizeMode="contain"
              />
              <Text style={styles.backupRestoreText}>Backup</Text>
            </TouchableOpacity>

            {/* Restore Button */}
            <TouchableOpacity
              style={styles.backupRestoreButton}
              onPress={() => {
                AdManager.showAd();
                handleRestore();
              }}
            >
              <Image
                source={require('../assets/icons/restore.png')}
                style={styles.backupRestoreIcon}
                resizeMode="contain"
              />
              <Text style={styles.backupRestoreText}>Restore</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              AdManager.showAd();
              navigation.navigate('Home');
            }}
          >
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Banner di bagian paling bawah */}
        <BannerAdComponent />
      </View>
    </SafeAreaView>
  );
};

export default BackupRestoreScreen;