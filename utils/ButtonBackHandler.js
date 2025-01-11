import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

const useBackHandler = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Konfirmasi", "Apakah Anda yakin ingin keluar dari aplikasi?", [
        { text: "Tidak", onPress: () => null, style: "cancel" },
        { text: "Ya", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove(); // Cleanup listener
  }, []);
};

export default useBackHandler;
