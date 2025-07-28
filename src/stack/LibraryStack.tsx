// src/navigation/stacks/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Library';
import ArtistScreen from '../screens/Library/artistScreen';

const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryMain" component={HomeScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} />
    </Stack.Navigator>
  );
}
