import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);

  const loadAndPlayTrack = async (track) => {
    if (sound.current) {
      await sound.current.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      track.audio,
      { shouldPlay: true }
    );

    sound.current = newSound;
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsMiniPlayerVisible(true);
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;
    if (isPlaying) {
      await sound.current.pauseAsync();
    } else {
      await sound.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
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
