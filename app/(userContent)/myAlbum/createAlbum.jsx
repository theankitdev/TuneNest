import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../../context/authContext';
import { router } from 'expo-router';

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-albums';

export default function CreateAlbumScreen() {
  const [albumName, setAlbumName] = useState('');
  const [defaultName, setDefaultName] = useState('My album #1');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) fetchUserAlbums(user._id);
  }, []);

  const fetchUserAlbums = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}?userId=${userId}`);
      const count = res.data.length + 1;
      const generatedName = `My album #${count}`;
      setAlbumName(generatedName);
      setDefaultName(generatedName);
    } catch (err) {
      console.error('Failed to load albums:', err.message);
    } finally {
      setInitializing(false);
    }
  };

  const handleCreate = async () => {
    const nameToSave = albumName.trim() || defaultName;

    try {
      setLoading(true);
      const res = await axios.post(API_URL, {
        name: nameToSave,
        userId: user._id,
      });

      const newAlbum = res.data;

      // Navigate to edit screen and pass albumId
      router.replace({
        pathname: '/myalbum/[albumId]/edit',
        params: { albumId: newAlbum._id },
      });

    } catch (err) {
      console.error('Failed to create album:', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black justify-center items-center px-8">
      <Text className="text-white text-3xl mb-12 font-LBold">
        Give your album a name
      </Text>

      <TextInput
        className="w-full border-b border-gray-600 text-white text-4xl font-LBold text-center mb-12 px-2 py-1"
        value={albumName}
        onChangeText={setAlbumName}
        selectTextOnFocus
        autoFocus
      />

      <View className="flex-row gap-4">
        <TouchableOpacity
          className="px-8 py-4 border border-gray-600 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white text-[16px] font-LBold">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-8 py-4 bg-green-500 rounded-full"
          onPress={handleCreate}
          disabled={loading}
        >
          <Text className="text-black text-[16px] font-LBold">Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
