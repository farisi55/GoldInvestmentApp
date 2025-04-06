import React from "react";
import { View, Text } from "react-native";
import DeveloperInfo from "../components/DeveloperInfo";
import styles from "../styles/CssStyles";


const AboutScreen = () => {

  return (
    <View style={styles.containerAbout}>
      <Text style={styles.headerAbout}>About Application</Text>
      <DeveloperInfo />
    </View>
  );
};

export default AboutScreen;
