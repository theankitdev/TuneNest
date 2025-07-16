import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const _layout = () => {
    return (
        <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
            <Stack.Screen name="myCreatedPlaylist" options={{
                title: 'My Albums',
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
            }} />
            <Stack.Screen name='createPlaylist' options={{ headerShown: false }} />
            <Stack.Screen name="[playlistId]" options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout