import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
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
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
          <Text style={[styles.header, { textAlign: 'center', marginBottom: 30 }]}>
            Backup & Restore
          </Text>

          {/* Bungkus tombol dalam View yang center */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleBackup();
                AdManager.showAd();
              }}
            >
              <Text style={styles.buttonText}>Backup (Export)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleRestore();
                AdManager.showAd();
              }}
            >
              <Text style={styles.buttonText}>Restore (Import)</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.spacing} />
          <View style={{ marginTop: 20 }}>
            <Button
              title="Back to Home"
              onPress={() => {
                AdManager.showAd();
                navigation.navigate('Home');
              }}
            />
          </View>
        </ScrollView>


        {/* Banner tetap di bawah */}
        <BannerAdComponent />
      </View>
    </SafeAreaView>
  );
};

export default BackupRestoreScreen;
