import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Button
} from "react-native";
import styles from "../styles/CssStyles";
import BannerAdComponent from "./BannerAdComponent";
import { useNavigation } from '@react-navigation/native';
import AdManager from '../utils/AdManager'; // Import AdManager

const DeveloperInfo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Konten utama */}
        <View style={styles.content}>
          <Text style={styles.devHeader}>About the Developer</Text>
          <Text style={styles.devName}>Banu Salman</Text>

          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/farisi55")}>
            <Text style={styles.link}>GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/farisi55")}>
            <Text style={styles.link}>LinkedIn</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://banu-salman-farisi.blogspot.com")}>
            <Text style={styles.link}>Portfolio</Text>
          </TouchableOpacity>
        </View>

        {/* Tombol dan iklan di bagian bawah */}
        <View style={{ padding: 16 }}>
          <TouchableOpacity
             style={styles.backButton}
             onPress={() => {
               AdManager.showAd();
               navigation.navigate('Home');
             }}
           >
             <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <BannerAdComponent />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeveloperInfo;
