// app/_layout.js
import '../global.css'; 
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../context/authContext';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import MiniPlayer from '../components/minPlayer';

SplashScreen.preventAutoHideAsync();

function MainLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      router.replace('/home'); // ✅ auto-redirect to home
    }
  }, [loading, user]);

  if (loading) return null; // Or show splash screen

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        {/* add more screens if needed */}
      </Stack>
      <MiniPlayer />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    // add others...
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <AudioPlayerProvider>
        <MainLayout />
      </AudioPlayerProvider>
    </AuthProvider>
  );
}
