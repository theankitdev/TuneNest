// src/navigation/stacks/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Search';


const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}
