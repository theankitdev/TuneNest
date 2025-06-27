import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Slider from "@react-native-community/slider";
import SongCarousel from "../../components/carousel";
import { songs } from "../../components/Data";
import { useAudioPlayer } from "../../context/AudioPlayerContext";

const Player = () => {
  const { title, image } = useLocalSearchParams();
  const {
    isPlaying,
    togglePlayPause,
    setIsMiniPlayerVisible,
    currentTrack,
    sound,
  } = useAudioPlayer();

  const isMounted = useRef(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
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
      await sound.current.setPositionAsync(value);
      const status = await sound.current.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.current.playAsync();
      }
      setPosition(value);
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
        source={currentTrack.image}
        className="items-center"
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        blurRadius={100}
      >
        <SafeAreaView className="flex-1 pt-4">
          {/* Header */}
          <View className="flex-row justify-between pb-10 px-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-down" size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute left-0 right-0 items-center">
              <Text className="text-[#D2D2D2] text-[14px] text-center pb-1">
                Now Playing
              </Text>
              <Text className="text-white text-[18px] text-center">
                {currentTrack.title}
              </Text>
            </View>
          </View>

          <SongCarousel item={songs} />

          <View style={{ padding: 20 }}>
            <Slider
              style={{ width: "100%", paddingTop: 20 }}
              minimumValue={0}
              maximumValue={duration}
              value={isSeeking ? displayPosition : position}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSliderComplete}
              minimumTrackTintColor="#E94E1B"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#FF5733"
            />

            <View className="flex-row justify-between mt-2">
              <Text className="text-white">
                {formatTime(isSeeking ? displayPosition : position)}
              </Text>
              <Text className="text-white">{formatTime(duration)}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-6">
              <TouchableOpacity>
                <Ionicons name="shuffle" size={30} color="white" />
              </TouchableOpacity>

              <View className="flex-row items-center">
                <TouchableOpacity>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={togglePlayPause}
                  style={{ marginHorizontal: 20 }}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
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
