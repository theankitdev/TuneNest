import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from '../../../context/authContext';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-artists';

export default function MyArtistsScreen() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchUserArtists = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${API_URL}?userId=${user?._id}`);
          setArtists(Array.isArray(res.data) ? res.data : res.data?.data || []);
        } catch (err) {
          console.error('Failed to fetch artists:', err.message);
        } finally {
          setLoading(false);
        }
      };

      if (user?._id) fetchUserArtists();
    }, [user?._id])
  );

  const recentlyUpdated = artists.slice(0, 5);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A]">
        <ActivityIndicator color="white" />
        <Text className="text-white font-LRegular mt-3">Loading artists...</Text>
      </View>
    );
  }

  if (artists.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A] px-4">
        <Text className="text-gray-400 text-[16px] font-LRegular mb-4 text-center">
          You haven’t created any artist albums yet.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/myArtist/createArtist')}
          className="bg-green-500 px-6 py-4 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Create Artist</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#161A1A] px-4 py-6" contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Recently Updated */}
      <Text className="text-white font-LRegular text-[18px] mb-6">Recently Updated</Text>
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
                onPress={() => router.push('/myArtist/createArtist')}
                className="mr-4 items-center justify-center"
              >
                <View className="w-32 h-32 rounded-lg bg-neutral-800 items-center justify-center">
                  <Text className="text-white text-6xl">+</Text>
                </View>
                <Text className="text-white text-[14px] font-LRegular text-center mt-2 w-32">
                  Create Artist
                </Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              onPress={() => router.push(`/myArtist/${item._id}`)}
              className="mr-4 items-center"
            >
              <Image
                source={{ uri: item.cover || 'https://via.placeholder.com/100' }}
                className="w-32 h-32 rounded-lg mb-1"
              />
              <Text
                className="text-white text-[15px] font-LRegular text-center w-32 mt-2"
                numberOfLines={1}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* All Artists */}
      <Text className="text-white font-LRegular text-[18px] mb-6">My Artists</Text>
      {artists.map((item) => (
        <TouchableOpacity
          key={item._id}
          onPress={() => router.push(`/myArtist/${item._id}`)}
          className="flex-row items-center mb-4"
        >
          <Image
            source={{ uri: item.cover || 'https://via.placeholder.com/50' }}
            className="w-10 h-10 rounded mr-4"
          />
          <View>
            <Text className="text-white font-LRegular mb-1 text-[15px]">
              {item.title}
            </Text>
            <Text className="text-gray-400 font-LRegular text-[13px]">
              {item.selectedAlbums?.length || 0} album{item.selectedAlbums?.length === 1 ? '' : 's'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
