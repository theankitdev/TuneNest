import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const MiniPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause, isMiniPlayerVisible, setIsMiniPlayerVisible } = useAudioPlayer();
  const router = useRouter();

  if (!isMiniPlayerVisible || !currentTrack) return null;

  return (
    <TouchableOpacity
      style={styles.container}
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
    >
      <View style={styles.left}>
        <Image source={currentTrack.image} style={styles.image} />
        <Text style={styles.title}>{currentTrack.title}</Text>
      </View>
      <TouchableOpacity onPress={togglePlayPause}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});

