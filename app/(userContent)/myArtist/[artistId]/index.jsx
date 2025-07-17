import React, { useEffect, useState } from 'react';
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

export default function AlbumDetailScreen() {
  const router = useRouter();
  const { albumId } = useLocalSearchParams();
  const { playShuffledPlaylist } = useAudioPlayer();

  const [albumData, setAlbumData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchAlbumDetail();
    }, [])
  );

  const fetchAlbumDetail = async () => {
    try {
      const res = await fetch(`https://tunenest-backend.onrender.com/api/v1/user-albums/${albumId}`);
      const data = await res.json();
      setAlbumData(data);
    } catch (err) {
      console.error('Error fetching album:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !albumData) {
    return (
      <View className="flex-1 items-center justify-center bg-[#161A1A]">
        <ActivityIndicator color="white" />
        <Text className="text-white mt-2">Loading album...</Text>
      </View>
    );
  }

  const selectedAlbums = albumData.selectedAlbums || [];

  return (
    <ScrollView className="flex-1 bg-[#161A1A] px-4 pt-10">
      {/* Album Header */}
      <View className="items-center mb-8">
        {albumData.cover ? (
          <Image source={{ uri: albumData.cover }} className="w-52 h-52 rounded-xl mb-4" />
        ) : (
          <Ionicons name="musical-notes-outline" size={120} color="white" />
        )}
        <Text className="text-white text-2xl font-LBold mt-2">{albumData.title}</Text>
        {albumData.description ? (
          <Text className="text-gray-400 font-LRegular text-center mt-1">{albumData.description}</Text>
        ) : null}
        <Text className="text-gray-500 font-LRegular mt-1 italic">
          {selectedAlbums.length} album{selectedAlbums.length !== 1 ? 's' : ''} selected
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-around mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/myAlbum/${albumData._id}/edit`)}
          className="px-8 py-2 bg-white rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const allSongs = selectedAlbums.flatMap((a) => a.songs || []);
            if (allSongs.length > 0) playShuffledPlaylist(allSongs);
            else alert('No songs found in albums');
          }}
          className="px-6 py-2 bg-green-500 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Shuffle</Text>
        </TouchableOpacity>
      </View>

      {/* Sub-Albums */}
      <Text className="text-white font-LBold text-[18px] mb-4">Albums by Artist</Text>
      {selectedAlbums.length === 0 ? (
        <Text className="text-gray-400 font-LRegular mb-10">No albums selected.</Text>
      ) : (
        selectedAlbums.map((album, index) => (
          <TouchableOpacity
            key={`${album._id}-${index}`}
            onPress={() => {
              const songs = album.songs || [];
              if (songs.length > 0) playShuffledPlaylist(songs);
              else alert('No songs in this album');
            }}
            className="flex-row items-center mb-5"
          >
            <Image
              source={{ uri: album.image || album.cover || 'https://via.placeholder.com/50' }}
              className="w-14 h-14 rounded mr-4"
            />
            <View>
              <Text className="text-white font-LRegular mb-1 text-[15px]">{album.title}</Text>
              <Text className="text-gray-400 font-LRegular text-[13px]">
                {album.artist} • {album.songs?.length || 0} songs
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}
