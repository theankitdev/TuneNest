import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false, animation: 'none', gestureEnabled: false}}>
        <Stack.Screen name='playlistPage'/>
        <Stack.Screen name='artistPage' />
        <Stack.Screen name='alubumPage' />
        <Stack.Screen name='podcastPage' />
    </Stack>
  )
}

export default _layout