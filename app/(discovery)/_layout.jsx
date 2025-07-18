import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name='(genres)' options={{ headerShown: false}}/>
        <Stack.Screen name='podcasts' options={{ headerShown: false}}/>
        <Stack.Screen name='mainPodcasts' options={{ headerShown: false}}/>
        <Stack.Screen name='recommendation' options={{ headerShown: false}}/>

    </Stack>
  )
}

export default _layout