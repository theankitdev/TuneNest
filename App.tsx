import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/rootNavigation';
import './global.css';
import { AuthProvider } from './src/context/AuthContext.js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AudioPlayerProvider } from './src/context/AudioPlayerContext';
import MiniPlayer from './src/components/MiniPlayer';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <AuthProvider>
          <AudioPlayerProvider>
          <RootNavigation />
          <MiniPlayer />
          </AudioPlayerProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
