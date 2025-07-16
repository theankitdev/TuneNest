import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAudioPlayer } from '../../../../context/AudioPlayerContext';

export default function PlaylistDetailScreen() {
  const router = useRouter();
  const { playlistId } = useLocalSearchParams();
  const {
    loadAndPlayTrack,
    playShuffledPlaylist,
    playlist,
    currentTrack,
  } = useAudioPlayer();

  const [playlistData, setPlaylistData] = React.useState(null);

  React.useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    const res = await fetch(`https://tunenest-backend.onrender.com/api/v1/user-playlists/${playlistId}`);
    const data = await res.json();
    setPlaylistData(data);
  };

  if (!playlistData) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">Loading playlist...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black px-4 pt-10">
      {/* Cover */}
      <View className="items-center">
        {playlistData.cover ? (
          <Image source={{ uri: playlistData.cover }} className="w-52 h-52 rounded-xl mb-4" />
        ) : (
          <Ionicons name="musical-notes-outline" size={120} color="white" />
        )}
        <Text className="text-white text-2xl font-LBold mt-2">{playlistData.name}</Text>
        <Text className="text-gray-400 font-LRegular mt-1">{playlistData.songs.length} Songs</Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-around mt-6 mb-12">
        <TouchableOpacity
          onPress={() => router.push(`/editPlaylist/${playlistData._id}`)}
          className="px-8 py-2 bg-white rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => playShuffledPlaylist(playlistData.songs)}
          className="px-6 py-2 bg-green-500 rounded-full"
        >
          <Text className="text-black font-LBold text-[16px]">Shuffle</Text>
        </TouchableOpacity>
      </View>

      {/* Song List */}
      {playlistData.songs.map((song, index) => (
        <TouchableOpacity
          key={song.id}
          onPress={() => loadAndPlayTrack(song, index, playlistData.songs)}
          className="flex-row items-center mb-4"
        >
          <Image source={{ uri: song.image }} className="w-12 h-12 rounded mr-4" />
          <View>
            <Text className="text-white text-[15px] font-LRegular">{song.title}</Text>
            <Text className="text-gray-400 text-[12px] font-LRegular">{song.artist} / {song.duration}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
