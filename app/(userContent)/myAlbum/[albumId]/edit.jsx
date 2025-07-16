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

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-albums';
const JAMENDO_ALBUMS_URL = 'https://tunenest-backend.onrender.com/api/v1/jamendo-albums';

export default function AlbumEditScreen() {
  const { albumId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [album, setAlbum] = useState(null);
  const [jamendoAlbums, setJamendoAlbums] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbum();
    fetchJamendoAlbums();
  }, []);

  const fetchAlbum = async () => {
    try {
      const res = await axios.get(`${API_URL}/${albumId}`);
      setAlbum(res.data);
      setNewTitle(res.data.title);
      setNewDesc(res.data.description || '');
      setSelectedId(res.data.selectedAlbum?.id || null);
    } catch (err) {
      console.error('Error loading album:', err.message);
    }
  };

  const fetchJamendoAlbums = async () => {
    try {
      const res = await axios.get(JAMENDO_ALBUMS_URL);
      setJamendoAlbums(res.data);
    } catch (err) {
      console.error('Error loading Jamendo albums:', err.message);
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

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('description', newDesc);
      formData.append('userId', user._id);

      if (selectedId) {
        const selectedAlbum = jamendoAlbums.find(a => a.id === selectedId);
        formData.append('selectedAlbum', JSON.stringify(selectedAlbum));
      }

      if (newCover) {
        formData.append('cover', {
          uri: newCover.uri,
          type: 'image/jpeg',
          name: 'cover.jpg',
        });
      }

      await axios.put(`${API_URL}/${albumId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Success', 'Album updated!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to update album');
    }
  };

  if (!album) {
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

        <TouchableOpacity onPress={handleSave}>
          <Text className="text-green-500 font-LBold text-[18px]">Save</Text>
        </TouchableOpacity>
      </View>

      {/* Album Info */}
      <View className="px-4 pt-6">
        <View className="items-center mb-4">
          <TouchableOpacity onPress={pickCoverImage}>
            {newCover || album.cover ? (
              <Image
                source={{ uri: newCover ? newCover.uri : album.cover }}
                className="w-32 h-32 rounded-lg mb-2"
              />
            ) : (
              <View className="w-32 h-32 rounded-lg mb-2 bg-gray-800 justify-center items-center">
                <Ionicons name="image-outline" size={48} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-gray-400 text-xs font-LRegular mb-2">Tap image to change cover</Text>

          {!editingTitle ? (
            <Text className="text-white text-2xl font-LBold">{album.title}</Text>
          ) : (
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              className="text-white text-xl text-center font-LBold border-b border-gray-500 px-4 mb-2"
            />
          )}

          <View className="flex-row gap-8 my-4">
            <TouchableOpacity
              onPress={() => setEditingTitle((prev) => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Album Title</Text>
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
              {album.description || 'No description'}
            </Text>
          )}
        </View>
      </View>

      {/* Select Jamendo Album */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-white text-lg mb-6 font-LBold">Select Jamendo Album</Text>

        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {jamendoAlbums.map((jamAlbum) => (
              <TouchableOpacity
                key={jamAlbum.id}
                onPress={() => setSelectedId(jamAlbum.id)}
                className="flex-row justify-between items-center mb-5"
              >
                <View className="flex-row items-center gap-3">
                  <Image source={{ uri: jamAlbum.cover }} className="w-14 h-14 rounded" />
                  <View>
                    <Text className="text-white font-LBold text-[15px]">{jamAlbum.title}</Text>
                    <Text className="text-gray-400 text-[12px]">{jamAlbum.artist} • {jamAlbum.songs.length} songs</Text>
                  </View>
                </View>
                <Ionicons
                  name={selectedId === jamAlbum.id ? 'checkmark-circle' : 'ellipse-outline'}
                  size={22}
                  color={selectedId === jamAlbum.id ? 'deepskyblue' : 'gray'}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
