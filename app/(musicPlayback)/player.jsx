import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SongCarousel from "../../components/carousel";
import { songs } from "../../components/Data";
import { useAudioPlayer } from "../../context/AudioPlayerContext";
import ExpandableQueue from "../../components/expandableQueue";

const Player = () => {
  const {
    isPlaying,
    togglePlayPause,
    setIsMiniPlayerVisible,
    currentTrack,
    position,
    duration,
    seekTo,
    sound,
    setPosition,
    setDuration,
    playNext,
    playPrevious,
    currentIndex,
    playAtIndex,
    playlist,
    loadAndPlayTrack,
    isRepeat,
    toggleRepeat,
    isShuffled,
    toggleShuffle,
  } = useAudioPlayer();

  const isMounted = useRef(true);
  const [displayPosition, setDisplayPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onPlaybackStatusUpdate = (status) => {
  if (!status.isLoaded || !isMounted.current) return;

  setDuration(status.durationMillis || 1);

  if (!isSeeking) {
    setPosition(status.positionMillis);
    setDisplayPosition(status.positionMillis);
  }

  if (status.didJustFinish && !status.isLooping) {
    playNext();
  }
};

  useEffect(() => {
    const init = async () => {
      if (sound?.current) {
        await sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        const status = await sound.current.getStatusAsync();
        setPosition(status.positionMillis);
        setDisplayPosition(status.positionMillis);
        setDuration(status.durationMillis || 1);
      }
    };

    isMounted.current = true;
    setIsMiniPlayerVisible(false);
    init();

    return () => {
      isMounted.current = false;
      setIsMiniPlayerVisible(true);
    };
  }, []);

  const handleSliderChange = (value) => {
    if (!isSeeking) setIsSeeking(true);
    setDisplayPosition(value);
  };

  const handleSliderComplete = async (value) => {
    if (!sound?.current) return;

    try {
      await seekTo(value); // This safely sets position
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.current.playAsync();
      }
      setDisplayPosition(value);
    } catch (error) {
      console.error("Seek failed:", error);
    } finally {
      setIsSeeking(false);
    }
  };

  if (!currentTrack) return null;

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground
        source={{uri:currentTrack.image}}
        className="items-center"
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        blurRadius={20}
      >
        <SafeAreaView className="flex-1 pt-4">
          {/* Header */}
          <View className="flex-row justify-between pb-10 px-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 items-center">
              <Text className="text-[#D2D2D2] text-[14px] font-LRegular text-center pb-1">
                Playlist
              </Text>
              <Text className="text-white text-[18px] font-LRegular text-center">
                {currentTrack.title}
              </Text>
            </View>
          </View>

          <SongCarousel
            playlist={playlist}
            currentIndex={currentIndex}
            playAtIndex={playAtIndex}
          />

          <View style={{ padding: 20 }}>
            <Slider
              style={{ width: "100%", paddingTop: 5, height: 3 }}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor="#2DCEEF"
              maximumTrackTintColor="#D5D5D5"
              thumbTintColor="#2DCEEF"
            />

            <View className="flex-row justify-between mt-2">
              <Text className="text-white">
                {formatTime(isSeeking ? displayPosition : position)}
              </Text>
              <Text className="text-white">{formatTime(duration)}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-6">
              {/* Shuffle Button */}
              <TouchableOpacity onPress={toggleShuffle}>
                <Ionicons
                  name={isShuffled ? "shuffle" : "shuffle-outline"}
                  size={30}
                  color={isShuffled ? "#2DCEEF" : "white"}
                />
              </TouchableOpacity>

              {/* Playback Controls */}
              <View className="flex-row justify-center items-center">
                <TouchableOpacity onPress={playPrevious}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayPause}
                  style={{ marginHorizontal: 30 }}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={playNext}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </TouchableOpacity>
              </View>

              {/* Repeat Button */}
              <TouchableOpacity onPress={toggleRepeat}>
                <Ionicons
                  name={isRepeat ? "repeat" : "repeat-outline"}
                  size={30}
                  color={isRepeat ? "#2DCEEF" : "white"}
                />
              </TouchableOpacity>
            </View>

          </View>

          <ExpandableQueue currentTrack={currentTrack} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Player;