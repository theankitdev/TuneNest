import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown: false, animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name='index'/>
        <Stack.Screen name='edit'/>
    </Stack>
  )
}

export default _layout