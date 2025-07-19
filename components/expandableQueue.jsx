import React, {  useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { songs} from './Data'
import { useAudioPlayer } from "../context/AudioPlayerContext";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ExpandableQueue = ({ currentTrack }) => {
  const {
    isPlaying,
    togglePlayPause,
    playlist,
    playAtIndex,
    isShuffled,
    toggleShuffle,
    setPlaylist,
  } = useAudioPlayer();

  const [expanded, setExpanded] = useState(false);
  const [originalPlaylist, setOriginalPlaylist] = useState(songs);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const formatTime = useCallback((seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  const expandQueue = () => {
    setExpanded(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false, 
    }).start();
  };

  const collapseQueue = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: false, 
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
    toggleShuffle(); 
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
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const currentIndex = playlist.indexOf(currentTrack);
  const nextTrack =
    playlist.length > 1
      ? playlist[(currentIndex + 1) % playlist.length]
      : null;

  return (
    <>
      {!expanded && (
        <View className="flex-1 justify-end">
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
                Next Up: {nextTrack?.title} - {nextTrack?.artist}
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

            <View className="flex-row items-center mb-6 mt-3">
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
                  {currentTrack?.artist} / {formatTime(currentTrack?.duration)}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white font-LBold text-[16px]">Next Up</Text>
              <TouchableOpacity
                onPress={handleShuffle}
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
              initialNumToRender={6}
              maxToRenderPerBatch={8}
              removeClippedSubviews={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className="py-3"
                  onPress={() => playAtIndex(index)}
                >
                  <Text className="text-white text-[15px] font-LRegular pb-2">
                    {item.title}
                  </Text>
                  <Text className="text-[#aaa] text-[14px] font-LRegular">
                    {item.artist} / {formatTime(item.duration)}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {/* Bottom Playback Controls */}
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
                  onPress={() =>
                    playAtIndex((currentIndex + 1) % playlist.length)
                  }
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

export default ExpandableQueue;