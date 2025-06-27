import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioPlayerContext = createContext();
export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [trackPositions, setTrackPositions] = useState({});

  // Load stored positions (optional persistent)
  useEffect(() => {
    const loadPositions = async () => {
      const stored = await AsyncStorage.getItem('trackPositions');
      if (stored) {
        setTrackPositions(JSON.parse(stored));
      }
    };
    loadPositions();
  }, []);

  // Persist positions (optional)
  useEffect(() => {
    AsyncStorage.setItem('trackPositions', JSON.stringify(trackPositions));
  }, [trackPositions]);

  const saveTrackPosition = async () => {
    if (sound.current && currentTrack?.title) {
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        setTrackPositions((prev) => ({
          ...prev,
          [currentTrack.title]: status.positionMillis,
        }));
      }
    }
  };

 const loadAndPlayTrack = async (track) => {
  if (sound.current) {
    await sound.current.unloadAsync();
    sound.current.setOnPlaybackStatusUpdate(null);
    sound.current = null;
  }

  const { sound: newSound } = await Audio.Sound.createAsync(
    track.audio,
    {
      shouldPlay: true,
      positionMillis: 0, // 🔴 Always start from beginning
    }
  );

  sound.current = newSound;
  setCurrentTrack(track);
  setIsPlaying(true);
  setIsMiniPlayerVisible(true);
};


  const togglePlayPause = async () => {
    if (!sound.current) return;

    const status = await sound.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  // Unload and save when unmounting
  useEffect(() => {
    return () => {
      saveTrackPosition();
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        sound,
        isPlaying,
        currentTrack,
        isMiniPlayerVisible,
        loadAndPlayTrack,
        togglePlayPause,
        setIsMiniPlayerVisible,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
