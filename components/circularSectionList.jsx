// SectionList.js
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const CircularSection = ({ title, item, subtitle, pathname }) => {
  const { loadAndPlayTrack } = useAudioPlayer();

  const handlePlay = (artist) => {
    const firstTrack = artist.tracks[0];
    if (!firstTrack?.audio) {
      console.warn("Missing audio in track:", firstTrack);
      return;
    }

    loadAndPlayTrack(firstTrack, 0, artist.tracks); // Pass artist's full track list
    router.push(pathname);
  };

  return (
    <View className="mb-4 mt-2">
      <Text className="text-white font-LBold text-[18px]">{title}</Text>

      {subtitle && (
        <Text className="text-[#99999F] font-LRegular text-[14px] mt-2">
          {subtitle}
        </Text>
      )}

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(artist, index) => `${title}-${index}`}
        contentContainerStyle={{ gap: 16, paddingBottom: 20, marginTop: 22 }}
        renderItem={({ item: artist }) => (
          <TouchableOpacity onPress={() => handlePlay(artist)}>
            <Image
              source={artist.image}
              className="w-full h-[100px] rounded-full mb-2 mt-1"
              style={{ width: 145, height: 145 }}
              resizeMode="cover"
            />
            <Text
              className="text-white font-LRegular text-[14px] text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: 145 }}
            >
              {artist.artist}
            </Text>
            <View className="flex-row items-center gap-1 mt-1 justify-center">
              <Ionicons name="heart" size={14} color="#99999F" />
              <Text
                className="text-[#99999F] font-LRegular text-[10px]"
                numberOfLines={1}
              >
                12.5K
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CircularSection;
