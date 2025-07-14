import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from '../../context/authContext';

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-playlists';

export default function MyPlaylistsScreen() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetchUserPlaylists(user._id);
    }
  }, [user]);

  const fetchUserPlaylists = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}?userId=${userId}`);
      setPlaylists(res.data);
    } catch (err) {
      console.error('Failed to fetch playlists:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const recentlyUpdated = playlists.slice(0, 5);

  // 🔄 Loading state
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white font-LRegular">Loading playlists...</Text>
      </View>
    );
  }

  // 🟡 No playlists: Show centered empty state
  if (playlists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text className="text-gray-400 text-[16px] font-LRegular mb-4 text-center">
          You have not created any playlist yet.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/createPlaylist')}
          className="bg-green-500 px-6 py-4 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Create Playlist</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ✅ Playlists exist: show scrollable content
  return (
    <ScrollView className="flex-1 bg-black px-4 py-6" contentContainer>
      {/* Recently Updated */}
      <Text className="text-white font-LRegular text-base mb-2">Recently updated</Text>
      <FlatList
        horizontal
        data={[{ isCreateCard: true }, ...recentlyUpdated]}
        keyExtractor={(item, index) => item._id || `create-${index}`}
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        renderItem={({ item }) => {
          if (item.isCreateCard) {
            return (
              <TouchableOpacity
                onPress={() => router.push('/createPlaylist')}
                className="mr-4 items-center justify-center"
              >
                <View className="w-24 h-24 rounded-lg bg-neutral-800 items-center justify-center">
                  <Text className="text-white text-4xl">+</Text>
                </View>
                <Text className="text-white text-xs text-center mt-1 w-24">
                  Create Playlist
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <View className="mr-4 items-center">
              <Image
                source={{ uri: item.cover || 'https://via.placeholder.com/100' }}
                className="w-24 h-24 rounded-lg mb-1"
              />
              <Text className="text-white text-xs text-center w-24" numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          );
        }}
      />

      {/* My Playlists Section */}
      <Text className="text-white font-LRegular text-base mb-3">My playlists</Text>
      {playlists.map((item) => (
        <View key={item._id} className="flex-row items-center mb-4">
          <Image
            source={{ uri: item.cover || 'https://via.placeholder.com/50' }}
            className="w-10 h-10 rounded mr-4"
          />
          <View>
            <Text className="text-white font-semibold">{item.name}</Text>
            <Text className="text-gray-400 text-xs">{item.songs?.length || 0} songs</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
