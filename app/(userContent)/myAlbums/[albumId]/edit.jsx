import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../../../../context/authContext';

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-playlists';

export default function PlaylistEditScreen() {
  const { playlistId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist();
    fetchSongs();
  }, []);

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get(`${API_URL}/${playlistId}`);
      setPlaylist(res.data);
      setNewTitle(res.data.name);
      setNewDesc(res.data.description || '');
      setSelectedIds(new Set(res.data.songs.map((s) => s.id)));
    } catch (err) {
      console.error('Error loading playlist:', err.message);
    }
  };

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${API_URL}/songs/all`);
      setSongs(res.data);
    } catch (err) {
      console.error('Error loading songs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewCover(result.assets[0]);
    }
  };

  const toggleSong = (songId) => {
    const updated = new Set(selectedIds);
    updated.has(songId) ? updated.delete(songId) : updated.add(songId);
    setSelectedIds(updated);
  };

  const saveEdits = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newTitle);
      formData.append('description', newDesc);
      formData.append('userId', user._id);

      if (newCover) {
        formData.append('cover', {
          uri: newCover.uri,
          type: 'image/jpeg',
          name: 'cover.jpg',
        });
      }

      await axios.put(`${API_URL}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const selectedSongs = songs.filter((s) => selectedIds.has(s.id));
      await axios.put(`${API_URL}/${id}/songs`, {
        userId: user._id,
        songs: selectedSongs,
      });

      Alert.alert('Success', 'Playlist updated!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to update playlist');
    }
  };

  if (!playlist) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={saveEdits}>
          <Text className="text-green-500 font-LBold text-[18px]">Save</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist Info */}
      <View className="px-4 pt-6">
        <View className="items-center mb-4">
          <TouchableOpacity onPress={pickCoverImage}>
            {newCover || playlist.cover ? (
              <Image
                source={{ uri: newCover ? newCover.uri : playlist.cover }}
                className="w-32 h-32 rounded-lg mb-2"
              />
            ) : (
              <View className="w-32 h-32 rounded-lg mb-2 bg-gray-800 justify-center items-center">
                <Ionicons name="musical-notes-outline" size={48} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-gray-400 text-xs font-LRegular mb-2">Tap image to change cover</Text>

          {!editingTitle ? (
            <Text className="text-white text-2xl font-LBold">{playlist.name}</Text>
          ) : (
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              className="text-white text-xl text-center font-LBold border-b border-gray-500 px-4 mb-2"
            />
          )}

          <Text className="text-gray-400 font-LRegular mb-2">
            {selectedIds.size} Song{selectedIds.size !== 1 ? 's' : ''}
          </Text>

          <View className="flex-row gap-8 my-4">
            <TouchableOpacity
              onPress={() => setEditingTitle((prev) => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Playlist Name</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setEditingDesc((prev) => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Description</Text>
            </TouchableOpacity>
          </View>

          {editingDesc ? (
            <TextInput
              value={newDesc}
              onChangeText={setNewDesc}
              className="text-gray-300 border-b border-gray-500 w-full mb-2 font-LRegular text-center"
              multiline
              placeholder="Enter description"
              placeholderTextColor="gray"
            />
          ) : (
            <Text className="text-gray-400 text-center font-LItalic">
              {playlist.description || 'No description'}
            </Text>
          )}
        </View>
      </View>

      {/* Recommended Songs - Scrollable */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-white text-lg mb-6 font-LBold">Recommended Songs</Text>

        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {songs.map((song) => (
              <TouchableOpacity
                key={song.id}
                onPress={() => toggleSong(song.id)}
                className="flex-row justify-between items-center mb-4"
              >
                <View className="flex-row items-center gap-3">
                  <Image source={{ uri: song.image }} className="w-12 h-12 rounded" />
                  <View>
                    <Text className="text-white font-LRegular text-[14px]">{song.title}</Text>
                    <Text className="text-gray-400 text-[12px] font-LRegular mt-1">{song.artist} / {song.duration}</Text>
                  </View>
                </View>
                <Ionicons
                  name={selectedIds.has(song.id) ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={selectedIds.has(song.id) ? 'deepskyblue' : 'gray'}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
