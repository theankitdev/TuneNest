import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Get screen width and calculate item width + gap
const screenWidth = Dimensions.get("window").width;
const ITEM_GAP = 12;
const ITEM_WIDTH = (screenWidth - 32 - ITEM_GAP) / 2;

export const categories = [
  { title: "Podcasts", image: require("../../assets/podcasts.png") },
  { title: "Live Events", image: require("../../assets/liveEvents.png") },
  { title: "Made for you", image: require("../../assets/madeForYou.png") },
  { title: "New Releases", image: require("../../assets/newReleases.png") },
  { title: "Hindi", image: require("../../assets/hindi.png") },
  { title: "Punjabi", image: require("../../assets/punjabi.png") },
  { title: "Tamil", image: require("../../assets/tamil.png") },
  { title: "Telugu", image: require("../../assets/telugu.png") },
  { title: "Charts", image: require("../../assets/charts.png") },
  { title: "Pop", image: require("../../assets/pop.png") },
  { title: "Indie", image: require("../../assets/indie.png") },
  { title: "Trending", image: require("../../assets/trending.png") },
  { title: "Love", image: require("../../assets/love.png") },
  { title: "Discover", image: require("../../assets/discover.png") },
  { title: "Radio", image: require("../../assets/radio.png") },
  { title: "Mood", image: require("../../assets/mood.png") },
  { title: "Party", image: require("../../assets/party.png") },
  { title: "Devotional", image: require("../../assets/devotional.png") },
  { title: "Decades", image: require("../../assets/decades.png") },
  { title: "Hip-Hop", image: require("../../assets/hiphop.png") },
  { title: "Dance/Electronic", image: require("../../assets/dance.png") },
  { title: "Student", image: require("../../assets/student.png") },
  { title: "Chill", image: require("../../assets/chill.png") },
  { title: "Gaming", image: require("../../assets/gaming.png") },
];

const BrowseScreen = () => {
  return (
    <View className="flex-1 bg-[#353A40] px-4 pt-12">
      {/* Search header */}
      <Text className="text-white text-[16px] font-USemiBold mb-8 text-center">Search</Text>

      {/* Search bar */}
      <View className="flex-row items-center bg-neutral-800 rounded-full px-4 py-2 mb-6">
        <Ionicons
          name="search"
          size={20}
          color="white"
        />
        <TextInput
          placeholder="What do you want to listen to?"
          placeholderTextColor="#aaa"
          className="text-white font-UMedium text-[16px] ml-2 flex-1"
        />
      </View>

      {/* Browse all */}
      <Text className="text-white text-[16px] font-USemiBold mb-5">Browse all</Text>

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          alignItems: "center",
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: ITEM_WIDTH,
              marginRight: index % 2 === 0 ? ITEM_GAP : 0,
              marginBottom: ITEM_GAP,
            }}
            className="flex-row items-center bg-neutral-800 rounded-full pr-3 h-[56px]"
          >
            <Image
              source={item.image}
              className="w-[55px] h-[55px] rounded-full mr-3"
              resizeMode="cover"
            />
            <Text
              className="text-white text-[14px] font-UMedium flex-shrink"
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BrowseScreen;
