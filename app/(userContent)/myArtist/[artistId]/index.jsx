import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAudioPlayer } from '../../../../context/AudioPlayerContext';
import { useFocusEffect } from '@react-navigation/native';

export default function ArtistDetailScreen() {
  const router = useRouter();
  const { artistId } = useLocalSearchParams(); // should be user artist ID
  const { playShuffledPlaylist } = useAudioPlayer();

  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchArtistDetail();
    }, [artistId])
  );

  const fetchArtistDetail = async () => {
    try {
      const res = await fetch(`https://tunenest-backend.onrender.com/api/v1/user-artists/${artistId}`);
      if (!res.ok) {
        console.error('API Error:', res.status);
        throw new Error('Artist not found');
      }
      const data = await res.json();
      setArtistData(data);
    } catch (err) {
      console.error('Error fetching artist:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !artistData) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A]">
        <ActivityIndicator color="white" />
        <Text className="text-white mt-2">Loading artist...</Text>
      </View>
    );
  }

  const selectedAlbums = artistData.selectedAlbums || [];

  return (
    <ScrollView className="flex-1 bg-[#161A1A] px-4 pt-10">
      {/* Artist Header */}
      <View className="items-center mb-8">
        {artistData.cover ? (
          <Image source={{ uri: artistData.cover }} className="w-52 h-52 rounded-xl mb-4" />
        ) : (
          <Ionicons name="person-circle-outline" size={120} color="white" />
        )}
        <Text className="text-white text-2xl font-LBold mt-2">{artistData.title}</Text>
        <Text className="text-gray-400 font-LRegular mt-1">
          {selectedAlbums.length} Album{selectedAlbums.length === 1 ? '' : 's'}
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-around mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/myArtist/${artistData._id}/edit`)}
          className="px-8 py-2 bg-white rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const allSongs = selectedAlbums.flatMap((a) => a.songs || []);
            if (allSongs.length > 0) playShuffledPlaylist(allSongs);
            else alert('No songs found from albums');
          }}
          className="px-6 py-2 bg-green-500 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Shuffle</Text>
        </TouchableOpacity>
      </View>

      {/* Selected Albums List */}
      <Text className="text-white font-LBold text-[18px] mb-4">Selected Albums</Text>
      {selectedAlbums.length === 0 ? (
        <Text className="text-gray-400 font-LRegular mb-10">No albums selected.</Text>
      ) : (
        selectedAlbums.map((album, index) => (
          <TouchableOpacity
            key={`${album.albumId}-${index}`}
            onPress={() => {
              const songs = album.songs || [];
              if (songs.length > 0) playShuffledPlaylist(songs);
              else alert('No songs from this album');
            }}
            className="flex-row items-center mb-5"
          >
            <Image
              source={{ uri: album.cover || 'https://via.placeholder.com/50' }}
              className="w-14 h-14 rounded mr-4 bg-gray-700"
            />
            <View>
              <Text className="text-white font-LRegular mb-1 text-[15px]">{album.title}</Text>
              <Text className="text-gray-400 font-LRegular text-[13px]">
                {album.songs?.length || 0} songs
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
