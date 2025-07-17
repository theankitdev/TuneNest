import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
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

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-artists';

export default function ArtistEditScreen() {
  const { artistId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [artist, setArtist] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newCover, setNewCover] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtist();
  }, []);

  const fetchArtist = async () => {
    try {
      const res = await axios.get(`${API_URL}/${artistId}`);
      const data = res.data;
      setArtist(data);
      setNewName(data.name || '');
      setNewBio(data.bio || '');
    } catch (err) {
      Alert.alert('Error', 'Artist not found');
      console.error('Error loading artist:', err.message);
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

    if (!result.canceled && result.assets?.length > 0) {
      setNewCover(result.assets[0]);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('bio', newBio);
      formData.append('userId', user._id);

      if (newCover) {
        formData.append('cover', {
          uri: newCover.uri,
          type: 'image/jpeg',
          name: 'cover.jpg',
        });
      }

      await axios.put(`${API_URL}/${artistId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Success', 'Artist updated!');
      router.back();
    } catch (err) {
      Alert.alert('Error', 'Failed to update artist');
      console.error('Save error:', err.message);
    }
  };

  const handleDeleteArtist = async () => {
    Alert.alert('Delete Artist', 'Are you sure you want to delete this artist?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${artistId}`);
            Alert.alert('Deleted', 'Artist has been deleted');
            router.replace('/myArtist');
          } catch (err) {
            Alert.alert('Error', 'Failed to delete artist');
            console.error('Delete error:', err.message);
          }
        },
      },
    ]);
  };

  if (!artist || loading) {
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
        <TouchableOpacity onPress={handleDeleteArtist}>
          <Ionicons name="trash-outline" size={26} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-green-500 font-LBold text-[18px]">Save</Text>
        </TouchableOpacity>
      </View>

      {/* Artist Info */}
      <View className="px-4 pt-6">
        <View className="items-center mb-4">
          <TouchableOpacity onPress={pickCoverImage}>
            {newCover || artist.cover ? (
              <Image
                source={{ uri: newCover ? newCover.uri : artist.cover }}
                className="w-32 h-32 rounded-lg mb-2"
              />
            ) : (
              <View className="w-32 h-32 rounded-lg mb-2 bg-gray-800 justify-center items-center">
                <Ionicons name="person-outline" size={48} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-gray-400 text-xs font-LRegular mb-2">
            Tap image to change photo
          </Text>

          {!editingName ? (
            <Text className="text-white text-2xl font-LBold">{artist.name}</Text>
          ) : (
            <TextInput
              value={newName}
              onChangeText={setNewName}
              className="text-white text-xl text-center font-LBold border-b border-gray-500 px-4 mb-2"
            />
          )}

          <View className="flex-row flex-wrap gap-4 my-4 justify-center">
            <TouchableOpacity
              onPress={() => setEditingName(prev => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditingBio(prev => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Bio</Text>
            </TouchableOpacity>
          </View>

          {editingBio ? (
            <TextInput
              value={newBio}
              onChangeText={setNewBio}
              className="text-gray-300 border-b border-gray-500 w-full mb-2 font-LRegular text-center"
              multiline
              placeholder="Enter bio"
              placeholderTextColor="gray"
            />
          ) : (
            <Text className="text-gray-400 text-center font-LItalic">
              {artist.bio || 'No bio'}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
