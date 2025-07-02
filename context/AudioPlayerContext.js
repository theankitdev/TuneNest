// AudioPlayerContext.js
import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AudioPlayerContext = createContext();
export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const sound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [trackPositions, setTrackPositions] = useState({});
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const loadPositions = async () => {
      const stored = await AsyncStorage.getItem('trackPositions');
      if (stored) {
        setTrackPositions(JSON.parse(stored));
      }
    };
    loadPositions();
  }, []);

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

  const setupPlaybackStatus = () => {
    sound.current.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);

      if (status.didJustFinish) {
        if (isRepeat) {
          playAtIndex(currentIndex);
        } else {
          playNext();
        }
      }
    });
  };

  const loadAndPlayTrack = async (track, index = 0, list = []) => {
    if (!track?.audio) {
      console.warn('Track has no audio source:', track);
      return;
    }

    try {
      if (sound.current) {
        await sound.current.unloadAsync();
        sound.current.setOnPlaybackStatusUpdate(null);
        sound.current = null;
      }

      const source = typeof track.audio === 'string' ? { uri: track.audio } : track.audio;

      const { sound: newSound } = await Audio.Sound.createAsync(source, {
        shouldPlay: true,
      });

      sound.current = newSound;
      setupPlaybackStatus();

      setPlaylist(list);
      setCurrentTrack(track);
      setCurrentIndex(index);
      setIsPlaying(true);
      setIsMiniPlayerVisible(true);
    } catch (error) {
      console.log('Error loading track:', error);
    }
  };

  const playAtIndex = (index) => {
    const track = playlist[index];
    if (track) {
      loadAndPlayTrack(track, index, playlist);
    }
  };

  const playNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) {
      playAtIndex(nextIndex);
    }
  };

  const playPrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      playAtIndex(prevIndex);
    }
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;
    const status = await sound.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await sound.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.current.playAsync();
      setIsPlaying(true);
    }
  };

  const toggleRepeat = () => {
    setIsRepeat((prev) => !prev);
  };

  const seekTo = async (millis) => {
    if (sound.current) {
      await sound.current.setPositionAsync(millis);
      setPosition(millis);
    }
  };

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
        playlist,
        setPlaylist,
        currentIndex,
        isMiniPlayerVisible,
        loadAndPlayTrack,
        togglePlayPause,
        playNext,
        playPrevious,
        playAtIndex,
        setIsMiniPlayerVisible,
        position,
        duration,
        seekTo,
        setPosition,
        setDuration,
        isRepeat,
        toggleRepeat,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
