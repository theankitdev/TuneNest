import { View, Text, ImageBackground, Animated, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const PlaylistPage = () => {
  const { title, item: itemString } = useLocalSearchParams();
  let item = JSON.parse(itemString);

  // Ensure item is always an array (in case only one track was passed)
  if (!Array.isArray(item)) {
    item = [item];
  }

  const scrollY = useRef(new Animated.Value(0)).current;
  const { loadAndPlayTrack } = useAudioPlayer();

  // Interpolations for animation
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [340, 180],
    extrapolate: 'clamp',
  });

  const albumSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [174, 90],
    extrapolate: 'clamp',
  });

  const albumNameSize = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [30, 15],
    extrapolate: 'clamp',
  });

  const formatDuration = (ms) => {
    if (!ms || isNaN(ms)) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <StatusBar style="light" />
      {/* Animated Header */}
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <ImageBackground
          source={item[0]?.image}
          style={{ flex: 1 }}
          resizeMode="cover"
          blurRadius={30}
        >
          <SafeAreaView className="flex-1 justify-center items-center">
            <Animated.Image
              source={item[0]?.image}
              style={{
                width: albumSize,
                height: albumSize,
                borderRadius: 12,
                marginBottom: 12,
              }}
              resizeMode="contain"
            />
            <Animated.Text
              className="font-LBold text-white text-center"
              style={{ fontSize: albumNameSize }}
            >
              {title}
            </Animated.Text>
          </SafeAreaView>

          {/* Follow & Play Buttons */}
          <View className="flex-row items-center justify-around pb-4">
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="heart-outline" size={18} color="white" />
              <Text className="text-white text-[12px] font-LBold px-1">FOLLOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                loadAndPlayTrack(item[0], 0, item);
                router.push('/player');
              }}
            >
              <Ionicons name="play" size={18} color="white" />
              <Text className="text-white text-[12px] font-LBold px-1">PLAY</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      <View className="flex-1 bg-[#1B1A1C]">
      {/* Song List */}
      <Animated.FlatList
        data={item}
        keyExtractor={(track, index) => `${track.title}-${index}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 5,
          backgroundColor: '#1B1A1C',
        }}
        ListHeaderComponent={
          <Text className="text-[#99999F] text-[14px] font-LRegular text-center px-7 pt-4 leading-5 mb-4">
            Featuring{' '}
            <Text className="text-white font-LBold">
              Led Zeppelin, Pink Floyd, The Doors, The Rolling Stones
            </Text>{' '}
            and more.
          </Text>
        }
        renderItem={({ item: track, index }) => (
          <TouchableOpacity
            className="flex-row items-center gap-3 pt-6"
            onPress={() => {
              loadAndPlayTrack(track, index, item);
              router.push('/player');
            }}
          >
            <Image
              source={track.image}
              className="w-[45px] h-[45px] rounded-md"
              resizeMode="cover"
            />
            <View className="pl-1">
              <Text className="text-[14px] text-white font-LRegular mb-1" numberOfLines={1}>
                {track.title}
              </Text>
              <Text className="text-[13px] text-[#99999F] font-LRegular" numberOfLines={1}>
                {track.artist} / {formatDuration(track.duration)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <BlurView
            intensity={30}
            tint="dark"
            style={{
              height: 80,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Text className="text-white text-[14px] font-LRegular">
              More songs load as you listen
            </Text>
          </BlurView>
        }
        showsVerticalScrollIndicator={false}
      />
      </View>
    </>
  );
};

export default PlaylistPage;
