import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown:false, animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name='(myPlaylist)'/>
        <Stack.Screen name='(myAlbums)'/>
        <Stack.Screen name='(myArtists)'/>
        <Stack.Screen name='(myPodcasts)'/>
        <Stack.Screen name='favouriteSongs'/>
        <Stack.Screen name='listeningHistory'/>
    </Stack>
  )
}

export default _layout