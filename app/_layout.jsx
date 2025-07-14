import React, { use } from 'react';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import '../global.css';
import MiniPlayer from '../components/minPlayer';
import { AuthProvider } from '../context/authContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-BlackItalic': require('../assets/fonts/Lato-BlackItalic.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-BoldItalic': require('../assets/fonts/Lato-BoldItalic.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-LightItalic': require('../assets/fonts/Lato-LightItalic.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
    'Lato-ThinItalic': require('../assets/fonts/Lato-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
    <AudioPlayerProvider>
      <Stack screenOptions={{ animation: 'none', gestureEnabled: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(search)" options={{ headerShown: false }} />
        <Stack.Screen name="(discovery)" options={{ headerShown: false }} />
        <Stack.Screen name="(musicPlayback)" options={{ headerShown: false }} />
        <Stack.Screen name="(userContent)" options={{ headerShown: false }} />
        <Stack.Screen name="(detailedViews)" options={{ headerShown: false }} />
        <Stack.Screen name="myPlaylistEdit" options={{ headerShown: false }} />
      </Stack>
      <MiniPlayer />
    </AudioPlayerProvider>
    </AuthProvider>
  );
};

export default RootLayout;