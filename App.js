import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GraphScreen from './screens/GraphScreen';
import AddInvestmentScreen from './screens/AddInvestmentScreen';
import InvestmentDetailScreen from './screens/InvestmentDetailScreen';
import GoldPriceScreen from "./screens/GoldPriceScreen";
import AboutScreen from "./screens/AboutScreen";
import SplashScreen from "./screens/SplashScreen";
import BackupRestoreScreen from "./screens/BackupRestoreScreen";
import { GoldRateProvider } from "./context/GoldRateContext"; // Import provider

const Stack = createStackNavigator();

export default function App() {
  return (
    <GoldRateProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#f5a623' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
           <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
            <Stack.Screen name="Graph" component={GraphScreen} options={{ title: 'Grafik Investasi' }} />
            <Stack.Screen name="AddInvestment" component={AddInvestmentScreen} />
            <Stack.Screen name="InvestmentDetail" component={InvestmentDetailScreen} />
            <Stack.Screen name="BackupRestore" component={BackupRestoreScreen} />
            <Stack.Screen name="Gold Prices" component={GoldPriceScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </GoldRateProvider>
  );
}

