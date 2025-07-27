// src/navigation/stacks/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Library';


const Stack = createNativeStackNavigator();

export default function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LibraryMain" component={HomeScreen} options={{ title: 'Library' }} />
    </Stack.Navigator>
  );
}
