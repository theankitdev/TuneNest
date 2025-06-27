import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNext,
    isMiniPlayerVisible,
    setIsMiniPlayerVisible,
    position,
    duration,
    seekTo,
  } = useAudioPlayer();

  const router = useRouter();

  if (!isMiniPlayerVisible || !currentTrack) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setIsMiniPlayerVisible(false);
          router.push({
            pathname: '/player',
            params: {
              title: currentTrack.title,
              image: currentTrack.image,
            },
          });
        }}
        style={styles.container}
      >
        <View style={styles.left}>
          <Image source={currentTrack.image} style={styles.image} />
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause} style={styles.iconButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNext} style={styles.iconButton}>
            <Ionicons name="play-skip-forward" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Connected slider */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={seekTo}
          minimumTrackTintColor="#2DCEEF"
          maximumTrackTintColor="#555"
          thumbTintColor="transparent"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 80,
    width: SCREEN_WIDTH,
    zIndex: 1000,
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: '#2B2B2D',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 6,
  },
  title: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  slider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
  },
});
