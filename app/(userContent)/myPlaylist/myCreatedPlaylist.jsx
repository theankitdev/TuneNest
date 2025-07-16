import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from '../../../context/authContext';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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

  useFocusEffect(
  useCallback(() => {
    if (user?._id) {
      fetchUserPlaylists(user._id);
    }
  }, [user])
);

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

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A]">
        <Text className="text-white font-LRegular">Loading playlists...</Text>
      </View>
    );
  }

  if (playlists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A] px-4">
        <Text className="text-gray-400 text-[16px] font-LRegular mb-4 text-center">
          You have not created any playlist yet.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/myPlaylist/createPlaylist')}
          className="bg-green-500 px-6 py-4 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Create Playlist</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#161A1A] px-4 py-6" contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Recently Updated */}
      <Text className="text-white font-LRegular text-[18px] mb-6">Recently updated</Text>
      <FlatList
        horizontal
        data={[{ isCreateCard: true }, ...recentlyUpdated]}
        keyExtractor={(item, index) => item._id || `create-${index}`}
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => {
          if (item.isCreateCard) {
            return (
              <TouchableOpacity
                onPress={() => router.push('/myPlaylist/createPlaylist')}
                className="mr-4 items-center justify-center"
              >
                <View className="w-32 h-32 rounded-lg bg-neutral-800 items-center justify-center">
                  <Text className="text-white text-6xl">+</Text>
                </View>
                <Text className="text-white text-[14px] font-LRegular text-center mt-2 w-32">
                  Create Playlist
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              onPress={() => router.push(`/myPlaylist/${item._id}`)}  // ✅ Navigate to detail
              className="mr-4 items-center"
            >
              <Image
                source={{ uri: item.cover || 'https://via.placeholder.com/100' }}
                className="w-32 h-32 rounded-lg mb-1"
              />
              <Text className="text-white text-[15px] font-LRegular text-center w-32 mt-2" numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* My Playlists Section */}
      <Text className="text-white font-LRegular text-[18px] mb-10">My playlists</Text>
      {playlists.map((item) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => router.push(`/myPlaylist/${item._id}`)}  // ✅ Open detail page
          className="flex-row items-center mb-4"
        >
          <Image
            source={{ uri: item.cover || 'https://via.placeholder.com/50' }}
            className="w-10 h-10 rounded mr-4"
          />
          <View>
            <Text className="text-white font-LRegular mb-2">{item.name}</Text>
            <Text className="text-gray-400 font-LRegular text-[13px]">{item.songs?.length || 0} songs</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
