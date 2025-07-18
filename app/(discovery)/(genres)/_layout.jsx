// app/(tabs)/genre/_layout.js
import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { GenreProvider } from '../../../context/GenreContext';

const _layout = () => {
  return (
    <GenreProvider>
      <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name='genre' options={{ headerShown: false }} />
        <Stack.Screen name='genreSelected' options={{ headerShown: false }} />
        <Stack.Screen name='genrePlaylists' options={{ headerShown: false }} />
        <Stack.Screen name='genreArtist' options={{ headerShown: false }} />
        <Stack.Screen name='genreNewReleases' options={{ headerShown: false }} />
      </Stack>
    </GenreProvider>
  );
};

export default _layout;
