import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name='genre' options={{headerShown: false}}/>
        <Stack.Screen name='genreSelected' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout