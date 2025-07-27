// src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './bottomTab';
import AuthStack from '../stack/AuthStack';
import SplashScreen from '../screens/splash';
import { useAuth } from '../context/AuthContext.js';
import DrawerNavigator from './drawerNavigator'; 

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : isLoggedIn ? (
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
