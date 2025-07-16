import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
  return (
    <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
      <Stack.Screen name='myCreatedAlbums' options={{
        title: 'My Playlists',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'Lato-Bold',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#161A1A',
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        },
        headerLeft: () => {
          return (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          );
        },
      }}
      />
      <Stack.Screen name='createAlbum' options={{headerShown: false}}/>
      <Stack.Screen name='[albumId]' options={{headerShown: false}}/>
    </Stack>
  )
}

export default _layout