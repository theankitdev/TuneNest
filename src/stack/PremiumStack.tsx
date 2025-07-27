// src/navigation/stacks/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Premium';


const Stack = createNativeStackNavigator();

export default function PremiumStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PremiumMain" component={HomeScreen} options={{ title: 'Premium' }} />
    </Stack.Navigator>
  );
}
