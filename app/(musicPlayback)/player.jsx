import React, { useEffect, useRef, useState } from "react";
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

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ExpandableQueue = ({ currentTrack }) => {
  const {
    isPlaying,
    togglePlayPause,
    duration,
    playlist,
    playAtIndex,
    setPlaylist,
    isShuffled,
    toggleShuffle
  } = useAudioPlayer();
  const [expanded, setExpanded] = useState(false);

  const [originalPlaylist, setOriginalPlaylist] = useState(songs);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

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

  const handleShuffle = () => {
    if (isShuffled) {
      setPlaylist(originalPlaylist);
    } else {
      setOriginalPlaylist(playlist);
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      setPlaylist(shuffled);
    }
    setIsShuffled(!isShuffled);
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
        <View className="flex-1 justify-end ">
          <TouchableOpacity
            className="w-full bg-[#2B2B2D] px-6 py-4 flex-row justify-between"
            style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            onPress={expandQueue}
          >
            <View className="flex-row items-center space-x-3">
              <MaterialIcons name="queue-music" size={25} color="#ccc" />
              <Text
                className="text-white font-LRegular text-[15px]"
                numberOfLines={1}
              >
                Next Up: {playlist[(playlist.indexOf(currentTrack) + 1) % playlist.length]?.title} - {playlist[(playlist.indexOf(currentTrack) + 1) % playlist.length]?.artist}
              </Text>
            </View>
            <Ionicons name="chevron-up" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>
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
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          {...panResponder.panHandlers}
        >
          <View className="w-full px-6 pt-6 flex-1">
            <View className="w-14 h-1.5 bg-[#555] self-center rounded-full mb-4" />
            <Text className="text-white font-LBold text-[16px] mb-3">
              Now Playing
            </Text>

            <View className=" flex-row items-center mb-6 mt-3">
              <Image
                source={currentTrack?.image}
                className="w-[45px] h-[45px] rounded-lg mr-3"
                resizeMode="cover"
              />
              <View>
                <Text className="text-white text-[15px] font-LRegular">
                  {currentTrack?.title}
                </Text>
                <Text className="text-[#99999F] text-[13px] font-LRegular">
                  {currentTrack?.artist}  /  {formatTime(currentTrack?.duration)}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-LBold text-[16px]">Next Up</Text>
              <TouchableOpacity
                onPress={toggleShuffle}
                className="flex-row justify-center items-center bg-[#3A3A3C] px-3 py-2 rounded-lg"
              >
                <Ionicons
                  name={isShuffled ? "shuffle" : "shuffle-outline"}
                  size={22}
                  color={isShuffled ? "#2DCEEF" : "white"}
                  style={{ marginRight: 6 }}
                />
                <Text className="text-white font-LBold text-[16px]">
                  {isShuffled ? "SHUFFLED" : "SHUFFLE"}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={playlist}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 30 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="py-3"
                  onPress={() => playAtIndex(index)}
                >
                  <Text className="text-white text-[15px] font-LRegular pb-2">{item.title}</Text>
                  <Text className="text-[#aaa] text-[14px] font-LRegular">
                    {item.artist}  /  {formatTime(item.duration)}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <View className="absolute bottom-6 left-0 right-0 px-6">
              <View className="flex-row items-center justify-center relative">
                <TouchableOpacity onPress={togglePlayPause}>
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={35}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => playAtIndex((playlist.indexOf(currentTrack) + 1) % playlist.length)}
                  className="relative left-14"
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