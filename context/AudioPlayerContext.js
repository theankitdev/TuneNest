import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Audio } from 'expo-av';
import { AppState } from 'react-native';
import { useSegments } from 'expo-router';
import { useNavigationContainerRef, usePathname } from 'expo-router';

const AudioPlayerContext = createContext();
export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const sound = useRef(null);
  const isLoading = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [originalPlaylist, setOriginalPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const segments = useSegments(); // From expo-router

  // 🔇 Stop music when entering auth/index routes
  const pathname = usePathname();

useEffect(() => {
  const authPaths = ['/', '/login', '/signup'];
  if (authPaths.includes(pathname)) {
    if (sound.current) {
      sound.current.stopAsync();
      setIsPlaying(false);
      setIsMiniPlayerVisible(false);
    }
  }
}, [pathname]);

  // 🔁 Playback status
  const setupPlaybackStatus = () => {
    sound.current.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);

      if (status.didJustFinish) {
        isRepeat ? playAtIndex(currentIndex) : playNext();
      }
    });
  };

  // ⛔ Unload sound
  const unloadCurrentSound = async () => {
    if (sound.current) {
      try {
        await sound.current.unloadAsync();
      } catch (e) {
        console.warn('Unload error:', e);
      }
      sound.current.setOnPlaybackStatusUpdate(null);
      sound.current = null;
    }
  };

  // ▶️ Load and play
  const loadAndPlayTrack = async (track, index = 0, list = []) => {
    if (!track?.audio || isLoading.current) return;
    isLoading.current = true;

    try {
      await unloadCurrentSound();

      const source = typeof track.audio === 'string' ? { uri: track.audio } : track.audio;
      const { sound: newSound } = await Audio.Sound.createAsync(source, { shouldPlay: true });

      sound.current = newSound;
      setupPlaybackStatus();

      setPlaylist(list);
      setCurrentTrack(track);
      setCurrentIndex(index);
      setIsPlaying(true);
      setIsMiniPlayerVisible(true);
    } catch (error) {
      console.error('Playback error:', error);
    } finally {
      isLoading.current = false;
    }
  };

  const playAtIndex = (index) => {
    if (playlist[index]) {
      loadAndPlayTrack(playlist[index], index, playlist);
    }
  };

  const playNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) playAtIndex(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) playAtIndex(prevIndex);
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

  const toggleRepeat = () => setIsRepeat((prev) => !prev);

  const toggleShuffle = () => {
    if (isShuffled) {
      setPlaylist(originalPlaylist);
      setIsShuffled(false);
    } else {
      setOriginalPlaylist(playlist);
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
      setIsShuffled(true);
    }
  };

  const playShuffledPlaylist = async (list) => {
    if (!list || list.length === 0 || isLoading.current) return;

    const shuffled = [...list].sort(() => Math.random() - 0.5);
    await loadAndPlayTrack(shuffled[0], 0, shuffled);
    setOriginalPlaylist(list);
    setIsShuffled(true);
  };

  const seekTo = async (millis) => {
    if (sound.current) {
      await sound.current.setPositionAsync(millis);
      setPosition(millis);
    }
  };

  useEffect(() => {
    return () => {
      if (sound.current) sound.current.unloadAsync();
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
        isShuffled,
        toggleShuffle,
        playShuffledPlaylist,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
