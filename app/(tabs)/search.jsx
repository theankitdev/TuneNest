import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import musicFinder from '../../assets/images/musicFinder.png'; // Local image

// You can replace this with API or context-based song list
const library = [
  {
    id: '1',
    type: 'album',
    title: 'No Plan - EP',
    artist: 'David Bowie',
    image: 'https://i.imgur.com/ZKZgXcz.png',
  },
  {
    id: '2',
    type: 'song',
    title: 'Come As You Are',
    artist: 'Kurt Cobain',
    image: 'https://i.imgur.com/Yq2s0uM.png',
  },
  {
    id: '3',
    type: 'album',
    title: 'Workout Rock',
    artist: 'Various Artists',
    image: 'https://i.imgur.com/dZ8rEVO.png',
  },
  {
    id: '4',
    type: 'podcast',
    title: 'StarTalk Radio Show',
    artist: 'Neil deGrasse Tyson',
    image: 'https://i.imgur.com/Wdx2OZB.png',
  },
];

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  // 🔍 Filter library in real-time
  const filteredItems = search.trim()
    ? library.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.artist.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSelect = (title) => {
    // Add to recent search history
    setRecentSearches((prev) =>
      [title, ...prev.filter((item) => item !== title)].slice(0, 5)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black px-4">
      {/* 🔎 Search Input */}
      <View className="flex-row items-center bg-white rounded-lg mt-4 px-3 py-2">
        <Ionicons name="search-outline" size={20} color="#1C1F20" />
        <TextInput
          placeholder="Search songs, albums..."
          placeholderTextColor="gray"
          className="flex-1 text-black ml-2 text-base"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity>
          <Ionicons name="mic" size={20} color="#1C1F20" />
        </TouchableOpacity>
      </View>

      {/* 🎧 MusicFinder Feature */}
      <TouchableOpacity className="flex-row items-center bg-[#3A3A3D] p-3 rounded-lg mt-4">
        <Image
          source={musicFinder}
          className="h-12 w-12 rounded-md"
          resizeMode="cover"
        />
        <View className="ml-3">
          <Text className="text-blue-400 font-bold text-[18px]">MusicFinder</Text>
          <Text className="text-gray-400 text-[13px]">
            Determine which song is currently playing
          </Text>
        </View>
      </TouchableOpacity>

      {/* 🕑 Recent Searches */}
      {search === '' && recentSearches.length > 0 && (
        <View className="mt-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white text-lg font-semibold">Recent Searches</Text>
            <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text className="text-gray-400 text-sm">CLEAR</Text>
            </TouchableOpacity>
          </View>
          {recentSearches.map((title, index) => (
            <Text key={index} className="text-white mb-2">
              • {title}
            </Text>
          ))}
        </View>
      )}

      {/* 🎵 Live Search Results */}
      {search !== '' && (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          className="mt-4"
          ListEmptyComponent={
            <Text className="text-gray-400 text-center mt-8 text-base">
              No results found for "{search}"
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row items-center mb-4"
              onPress={() => handleSelect(item.title)}
            >
              <Image
                source={{ uri: item.image }}
                className="w-12 h-12 rounded-md"
                resizeMode="cover"
              />
              <View className="ml-3">
                <Text className="text-white font-medium">{item.title}</Text>
                <Text className="text-gray-400 text-sm">
                  {item.artist} • {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
