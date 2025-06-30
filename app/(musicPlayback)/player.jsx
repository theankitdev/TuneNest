import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  PanResponder
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
import Collapsible from "react-native-collapsible";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ExpandableQueue = ({ currentTrack }) => {
  const { isPlaying, togglePlayPause } = useAudioPlayer();
  const [expanded, setExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const expandQueue = () => {
    setExpanded(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const collapseQueue = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setExpanded(false);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) slideAnim.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          collapseQueue();
        } else {
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      {!expanded && (
        <TouchableOpacity
          className="w-full bg-[#2B2B2D] px-6 py-3 flex-row justify-between items-center"
          onPress={expandQueue}
        >
          <View className="flex-row items-center space-x-3">
            <MaterialIcons name="queue-music" size={25} color="#ccc" />
            <Text
              className="text-white font-LRegular text-[15px]"
              numberOfLines={1}
            >
              Next Up: {songs[0]?.title} - {songs[0]?.artist}
            </Text>
          </View>
          <Ionicons name="chevron-up" size={22} color="#ccc" />
        </TouchableOpacity>
      )}

      {expanded && (
        <Animated.View
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
            transform: [{ translateY: slideAnim }],
            backgroundColor: "#18191C",
            zIndex: 1000,
            borderRadius: 20,
          }}
          {...panResponder.panHandlers}
        >
          <View className="w-full px-6 pt-6 flex-1">
            {/* Pull Indicator */}
            <View className="w-14 h-1.5 bg-[#555] self-center rounded-full mb-4" />

            {/* Now Playing */}
            <Text className="text-white font-LBold text-[16px] mb-3">
              Now Playing
            </Text>
            <Text className="text-white text-[14px] opacity-80 mb-6">
              {currentTrack?.title} • {currentTrack?.artist}
            </Text>

            {/* Header Row */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-LBold text-[16px]">Next Up</Text>
              <TouchableOpacity className="flex-row justify-center items-center bg-[#3A3A3C] px-3 py-2 rounded-lg">
                <Ionicons name="shuffle-outline" size={22} color="white" className="pr-2" />
                <Text className="text-white font-LBold text-[16px]">SHUFFLE</Text>
              </TouchableOpacity>
            </View>

            {/* Song List */}
            <FlatList
              data={songs}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 30 }}
              renderItem={({ item }) => (
                <View className="py-3 ">
                  <Text className="text-white text-[15px] font-LRegular pb-2">{item.title}</Text>
                  <Text className="text-[#aaa] text-[14px] font-LRegular">
                    {item.artist}   /  {item.duration}
                  </Text>
                </View>
              )}
            />
            <View className="absolute bottom-6 left-0 right-0 px-6">
  <View className="flex-row items-center justify-center relative mr-5">
    {/* Center Play/Pause Button */}
    <TouchableOpacity onPress={togglePlayPause}>
      <Ionicons
        name={isPlaying ? "pause" : "play"}
        size={35}
        color="white"
        className="mr-4"
      />
    </TouchableOpacity>

    {/* Skip Forward Button - Absolute Right */}
    <TouchableOpacity
      onPress={() => { /* Next track logic */ }}
      className=""
    >
      <Ionicons name="play-skip-forward" size={30} color="white" />
    </TouchableOpacity>
  </View>
</View>


          </View>
        </Animated.View>
      )}
    </>
  );
};


const Player = () => {
  const { title, image } = useLocalSearchParams();
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
              style={{ width: "100%", paddingTop: 20, height: 3 }}
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
              <TouchableOpacity>
                <Ionicons name="shuffle" size={30} color="white" />
              </TouchableOpacity>

              <View className="flex-row items-center">
                <TouchableOpacity>
                  <Ionicons size={30} color="white" />
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

          <ExpandableQueue currentTrack={currentTrack} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default Player;
