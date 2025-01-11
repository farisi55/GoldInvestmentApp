import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleBackup, handleRestore } from "../repository/BackupRestoreRepository";
import styles from "../styles/CssStyles";

const BackupRestoreScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Backup & Restore</Text>
      <TouchableOpacity style={styles.button} onPress={handleBackup}>
        <Text style={styles.buttonText}>Backup (Export)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRestore}>
        <Text style={styles.buttonText}>Restore (Import)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackupRestoreScreen;
