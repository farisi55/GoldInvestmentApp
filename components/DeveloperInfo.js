import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import styles from "../styles/CssStyles";

const DeveloperInfo = () => {
  return (
    <View style={styles.footerAbout}>
      <Text style={styles.devHeader}>About the Developer</Text>
      <Text style={styles.devName}>Banu Salman</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://github.com/farisi55/GoldInvestmentApp")}>
        <Text style={styles.link}>GitHub</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/farisi55")}>
        <Text style={styles.link}>LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://banu-salman-farisi.blogspot.com")}>
        <Text style={styles.link}>Portfolio</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeveloperInfo;
