import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

const SectionList = ({ title, item, subtitle, pathname = "/playlistPage" }) => {
  return (
    <View className="mb-4 mt-2">
      {/* Title */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-LBold text-[18px]">{title}</Text>
      </View>

      {/* Subtitle */}
      {subtitle && (
        <Text className="text-[#99999F] font-LRegular text-[14px] mt-2">
          {subtitle}
        </Text>
      )}

      {/* Playlist Items */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(_, index) => `${title}-${index}`}
        contentContainerStyle={{ gap: 16, paddingBottom: 20, marginTop: 22 }}
        renderItem={({ item: track }) => (
          <TouchableOpacity
            onPress={() => {
              if (!track?.tracks || track.tracks.length === 0) return;

              router.push({
                pathname,
                params: {
                  title: track.title || track.artist || "Playlist",
                  image: track.image,
                  item: JSON.stringify(track.tracks),
                },
              });
            }}
          >
            {/* Cover Image */}
            <Image
              source={{ uri: track.image }}
              className="w-full h-[100px] rounded-lg mb-2 mt-1"
              style={{ width: 145, height: 145 }}
              resizeMode="cover"
            />

            {/* Playlist Title / Artist */}
            <Text
              className="text-white font-LRegular text-[14px]"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ width: 145 }}
            >
              {track.artist || track.title}
            </Text>

            {/* Subtitle or Likes */}
            {track.subtitle ? (
              <Text
                className="text-[#99999F] font-LRegular text-[10px] mt-1 w-28"
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

            {/* Release Date (if exists) */}
            {track.releaseDate && (
              <Text
                className="text-[#99999F] font-LRegular text-[10px] mt-1"
                numberOfLines={1}
              >
                Album release: {track.releaseDate}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SectionList;
