import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SongCarousel from '../../components/carousel';
import { songs } from '../../components/Data';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import music from '../../assets/music/sample.mp3';

const Player = () => {
  const { title, image } = useLocalSearchParams();

  const sound = useRef(null);
  const isMounted = useRef(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [displayPosition, setDisplayPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded || !isMounted.current) return;

    setDuration(status.durationMillis || 1);

    if (!isSeeking) {
      setPosition(status.positionMillis);
      setDisplayPosition(status.positionMillis);
    }

    setIsPlaying(status.isPlaying);
  };

  const loadSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        music,
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );
      sound.current = newSound;
    } catch (error) {
      console.error('Error loading sound:', error);
    }
  };

  const handleSliderChange = (value) => {
    if (!isSeeking) setIsSeeking(true);
    setDisplayPosition(value);
  };

  const handleSliderComplete = async (value) => {
    if (!sound.current) return;

    try {
      await sound.current.setPositionAsync(value);

      const status = await sound.current.getStatusAsync();

      if (status.isLoaded && status.isPlaying) {
        await sound.current.playAsync();
      }

      setPosition(value);
      setDisplayPosition(value);
    } catch (error) {
      console.error('Seek failed:', error);
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded) {
        setPosition(status.positionMillis);
        setDisplayPosition(status.positionMillis);
      }
    } finally {
      setIsSeeking(false);
    }
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;

    try {
      if (isPlaying) {
        await sound.current.pauseAsync();
      } else {
        await sound.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Play/pause error:', error);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    loadSound();

    return () => {
      isMounted.current = false;
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={image}
        className="items-center"
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        blurRadius={100}
      >
        <SafeAreaView className="flex-1 pt-4">
          {/* Header */}
          {/* ankit bhadwa */}
          <View className="flex-row justify-between pb-10 px-6">
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 items-center">
              <Text className="text-[#D2D2D2] text-[14px] font-LRegular text-center pb-1">Playlists</Text>
              <Text className="text-white font-LRegular text-[18px] text-center">{title}</Text>
            </View>
          </View>

          <SongCarousel item={songs} />

          {/* Player controls */}
          <View style={{ padding: 20 }}>
            <View className="flex-row justify-around px-10">
              <TouchableOpacity><Ionicons name="add" size={22} color="white" /></TouchableOpacity>
              <TouchableOpacity><Ionicons name="heart-outline" size={22} color="white" /></TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/options')}>
                <Ionicons name="ellipsis-vertical" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Slider */}
            <Slider
              style={{ width: '100%', paddingTop: 20 }}
              minimumValue={0}
              maximumValue={duration}
              value={isSeeking ? displayPosition : position}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor="#E94E1B"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#FF5733"
            />

            <View className="flex-row justify-between">
              <Text className="text-white mt-2">
                {formatTime(isSeeking ? displayPosition : position)}
              </Text>
              <Text className="text-white mt-2">{formatTime(duration)}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <TouchableOpacity style={{ marginTop: 20 }}>
                <Ionicons name="shuffle" size={30} color="white" />
              </TouchableOpacity>

              <View className="flex-row items-center justify-center">
                <TouchableOpacity style={{ marginTop: 20 }}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={togglePlayPause} 
                  style={{ marginTop: 20, marginHorizontal: 20 }}
                >
                  <Ionicons name={isPlaying ? 'pause' : 'play'} size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20 }}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <Ionicons name="repeat" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Player;
