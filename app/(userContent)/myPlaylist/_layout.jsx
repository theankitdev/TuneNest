import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
    return (
        <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
            <Stack.Screen name="myCreatedPlaylist" options={{
                title: 'My Playlists',
                headerTintColor: 'white',
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
            }} />
            <Stack.Screen name='createPlaylist' options={{headerShown: false}}/>
            <Stack.Screen name="[playlistId]" options={{headerShown: false}}/>
        </Stack>
    )
}

export default _layout