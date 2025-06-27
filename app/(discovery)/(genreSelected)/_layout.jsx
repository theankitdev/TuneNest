import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
     <Stack screenOptions={{headerShown: false, animation: 'none', gestureEnabled: false}}>
        <Stack.Screen name='artist'/>
         <Stack.Screen name='album' />
     </Stack>
  )
}

export default _layout