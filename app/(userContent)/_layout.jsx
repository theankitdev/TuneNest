import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const _layout = () => {
    return (
        <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
            <Stack.Screen name="myPlaylistEdit" options={{
                headerBackVisible: false,
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
                },
            }} />
            <Stack.Screen name="favouriteSongs" options={{
                headerBackVisible: false,
                title: 'Favourite Songs',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: 'white',
                    fontFamily: 'Lato-Bold',
                    fontSize: 18,
                },
                headerStyle: {
                    backgroundColor: '#161A1A',
                    borderBottomWidth: 1,
                },
            }} />
        </Stack>
    )
}

export default _layout