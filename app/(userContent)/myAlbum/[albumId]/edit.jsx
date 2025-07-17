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
  FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from '../../../../context/authContext';

const API_URL = 'https://tunenest-backend.onrender.com/api/v1/user-albums';
const JAMENDO_ALBUMS_URL = `${API_URL}/all`;

export default function AlbumEditScreen() {
  const { albumId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [album, setAlbum] = useState(null);
  const [jamendoAlbums, setJamendoAlbums] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCover, setNewCover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    fetchAlbum();
    fetchJamendoAlbums(1);
  }, []);

  const fetchAlbum = async () => {
    try {
      const res = await axios.get(`${API_URL}/${albumId}`);
      const data = res.data;
      setAlbum(data);
      setNewTitle(data.title);
      setNewDesc(data.description || '');

      if (Array.isArray(data.selectedAlbums)) {
        const selected = data.selectedAlbums.map((a, i) => ({
          ...a,
          id: a._id?.toString() || a.albumId?.toString() || `local-${i}`,
        }));

        setSelectedIds(selected.map(a => a.id));

        setJamendoAlbums(prev => {
          const existingIds = new Set(prev.map(a => a.id));
          const merged = [
            ...selected.filter(a => !existingIds.has(a.id)),
            ...prev,
          ];
          return merged;
        });
      }
    } catch (err) {
      Alert.alert('Error', 'Album not found');
      console.error('Error loading album:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchJamendoAlbums = async (pageNum = 1) => {
    try {
      const res = await axios.get(`${JAMENDO_ALBUMS_URL}?page=${pageNum}`);
      const newAlbums = res.data.map(a => ({
        ...a,
        id: a.id?.toString(), // normalize id
      }));

      setJamendoAlbums(prev => {
        const filtered = newAlbums.filter(
          item => !prev.some(existing => existing.id === item.id)
        );
        return [...prev, ...filtered];
      });

      if (newAlbums.length === 0) setHasMore(false);
    } catch (err) {
      console.error('Error loading albums:', err.message);
    } finally {
      setFetchingMore(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !fetchingMore) {
      setFetchingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchJamendoAlbums(nextPage);
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

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('description', newDesc);
      formData.append('userId', user._id);

      if (selectedIds.length > 0) {
        const selectedAlbums = jamendoAlbums
          .filter(a => selectedIds.includes(a.id))
          .map(a => ({
            albumId: a.id,
            title: a.title,
            artist: a.artist,
            image: a.image,
            songs: a.songs,
          }));

        formData.append('selectedAlbums', JSON.stringify(selectedAlbums));
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
      console.error('Save error:', err.message);
    }
  };

  const handleDeleteAlbum = async () => {
    Alert.alert('Delete Album', 'Are you sure you want to delete this album?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${albumId}`);
            Alert.alert('Deleted', 'Album has been deleted');
            router.replace('/myAlbum');
          } catch (err) {
            Alert.alert('Error', 'Failed to delete album');
            console.error('Delete error:', err.message);
          }
        },
      },
    ]);
  };

  const renderJamendoItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleSelect(item.id)}
      className="flex-row justify-between items-center mb-5"
    >
      <View className="flex-row items-center gap-3">
        <Image source={{ uri: item.cover }} className="w-14 h-14 rounded" />
        <View>
          <Text className="text-white font-LBold text-[15px]">{item.title}</Text>
          <Text className="text-gray-400 text-[12px] font-LRegular">
            {item.artist} • {item.songs?.length || 0} songs
          </Text>
        </View>
      </View>
      <Ionicons
        name={selectedIds.includes(item.id) ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={selectedIds.includes(item.id) ? 'deepskyblue' : 'gray'}
      />
    </TouchableOpacity>
  );

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
        <TouchableOpacity onPress={handleDeleteAlbum}>
          <Ionicons name="trash-outline" size={26} color="red" />
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
                <Ionicons name="musical-notes-outline" size={48} color="white" />
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-gray-400 text-xs font-LRegular mb-2">
            Tap image to change cover
          </Text>

          {!editingTitle ? (
            <Text className="text-white text-2xl font-LBold">{album.title}</Text>
          ) : (
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              className="text-white text-xl text-center font-LBold border-b border-gray-500 px-4 mb-2"
            />
          )}

          <View className="flex-row flex-wrap gap-4 my-4 justify-center">
            <TouchableOpacity
              onPress={() => setEditingTitle(prev => !prev)}
              className="border border-white rounded-full px-4 py-1"
            >
              <Text className="text-white text-sm font-LRegular py-1">Edit Title</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditingDesc(prev => !prev)}
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

      {/* Jamendo Albums */}
      <View className="flex-1 px-4 pt-2">
        <Text className="text-white text-[16px] mb-6 font-LBold">Select Albums</Text>
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <FlatList
            data={jamendoAlbums}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderJamendoItem}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListFooterComponent={
              fetchingMore ? (
                <ActivityIndicator size="small" color="white" className="my-2" />
              ) : null
            }
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews
          />
        )}
      </View>
    </SafeAreaView>
  );
}
