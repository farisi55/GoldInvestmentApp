import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
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
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={[styles.header, { textAlign: 'center', marginBottom: 30 }]}>
              Backup & Restore
            </Text>

            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 30 }}>
                {/* Backup Button with Image */}
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    AdManager.showAd(handleBackup);
                  }}
                >
                  <Image
                    source={require('../assets/icons/backup.png')}
                    style={{ width: 64, height: 64, marginBottom: 8 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 16 }}>Backup</Text>
                </TouchableOpacity>

                {/* Restore Button with Image */}
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={() => {
                    AdManager.showAd();
                    handleRestore();
                  }}
                >
                  <Image
                    source={require('../assets/icons/restore.png')}
                    style={{ width: 64, height: 64, marginBottom: 8 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontSize: 16 }}>Restore</Text>
                </TouchableOpacity>
              </View>
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

          {/* Banner di bawah */}
          <BannerAdComponent />
        </View>
      </SafeAreaView>
    );
  };

export default BackupRestoreScreen;
