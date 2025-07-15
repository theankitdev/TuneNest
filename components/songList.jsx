import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { router } from 'expo-router';

const SongList = ({ songs }) => {
  const { loadAndPlayTrack } = useAudioPlayer();

  const formatDuration = (ms) => {
    if (!ms || isNaN(ms)) return '0:00';
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <FlatList
      data={songs}
      keyExtractor={(track, index) => `${track.title}-${index}`}
      scrollEnabled={false}
      renderItem={({ item: track, index }) => (
        <TouchableOpacity
          className="flex-row items-center gap-2 mb-6"
          onPress={() => {
            loadAndPlayTrack(track, index, songs);
            router.push('/player');
          }}
        >
          <Image
            source={{uri: track.image}}
            className="w-[full] h-[45px] rounded-md"
            style={{ width: 45, height: 45 }}
            resizeMode="cover"
          />

          <View className="pl-2">
            <Text className="text-[14px] text-white font-LRegular mb-2">
              {track.title}
            </Text>
            <Text className="text-[13px] text-[#99999F] font-LRegular">
              {track.artist} / {formatDuration(track.duration)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default SongList;
