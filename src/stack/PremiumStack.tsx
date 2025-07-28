// src/navigation/stacks/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PremiumScreen from '../screens/Premium';
import PremiumDetails from '../screens/Premium/premiumDetails';

const Stack = createNativeStackNavigator();

export default function PremiumStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PremiumMain" component={PremiumScreen} />
      <Stack.Screen name="PremiumDetails" component={PremiumDetails} />
    </Stack.Navigator>
  );
}
