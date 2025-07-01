import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { useAudioPlayer } from "../context/AudioPlayerContext";

const SectionList = ({ title, item, subtitle }) => {
  const { loadAndPlayTrack } = useAudioPlayer();

  const handlePlay = (track) => {
    if (!track?.audio) {
      console.warn("Missing audio in track:", track);
      return;
    }

    loadAndPlayTrack(track);
    router.push({
      pathname: "/player",
      params: {
        title: track.title,
        image: track.image,
        audio: track.audio,
        playlist: JSON.stringify(item)
      },
    });
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
        keyExtractor={(items, index) => `${title}-${index}`}
        contentContainerStyle={{ gap: 16, paddingBottom: 20, marginTop: 22 }}
        renderItem={({ item: track }) => (
          <TouchableOpacity onPress={() => handlePlay(track)}>
            <Image
              source={track.image}
              className="w-full h-[100px] rounded-lg mb-2 mt-1"
              style={{ width: 145, height: 145 }}
              resizeMode="cover"
            />
            <Text
              className="text-white font-LRegular text-[14px]"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: 145 }}
            >
              {track.title}
            </Text>

            {track.subtitle ? (
              <Text
                className="text-[#99999F] font-LRegular text-[10px] mt-1"
                numberOfLines={1}
              >
                {track.subtitle}
              </Text>
            ) : (
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="heart" size={14} color="#99999F" />
                <Text
                  className="text-[#99999F] font-LRegular text-[10px]"
                  numberOfLines={1}
                >
                  {track.likes || "12.5K"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SectionList;
