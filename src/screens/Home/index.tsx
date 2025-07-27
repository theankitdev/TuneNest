import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Album from '../../assets/Album.png';

const { width } = Dimensions.get('window');

const recentlyPlayed = [
  { id: '1', title: 'Mega Hit Mix', image: Album },
  { id: '2', title: 'La Bede - Remi', image: Album },
  { id: '3', title: 'Un X 100to', image: Album },
];

const dailyMixes = [
  { id: '1', title: 'Daily Mix 1', desc: 'Six60, Mitch James, Tiki Taane And More', image: Album },
  { id: '2', title: 'Daily Mix 2', desc: 'Canyou City, Marc Scibilia, Oh Honey And', image: Album },
  { id: '3', title: 'Daily Mix 3', desc: 'OneRepublic, Mary Lambert, A Great Big...', image: Album },
];

const HomeScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const customRes = await axios.get('https://tunenest-backend.onrender.com/api/v1/playlists');
        const customPlaylists = customRes.data.map(item => ({
          id: item._id,
          title: item.name,
          subtitle: item.description || 'Custom Playlist',
          image: item.cover,
          tracks: item.songs?.map(song => ({
            title: song.title,
            subtitle: song.artist || item.name,
            artist: song.artist || 'Unknown',
            duration: song.duration,
            image: song.image || item.cover,
            audio: song.audio,
          })) || [],
        }));

        const jamendoRes = await axios.get(
          'https://api.jamendo.com/v3.0/artists/tracks/?client_id=3e2494c0&format=json&limit=10'
        );

        const jamendoPlaylists = jamendoRes.data.results.map(artist => ({
          id: `jamendo-${artist.id}`,
          title: artist.name,
          subtitle: 'Jamendo Artist Playlist',
          image: artist.image,
          tracks: artist.tracks.map(track => ({
            title: track.name,
            subtitle: artist.name,
            artist: artist.name,
            duration: track.duration,
            image: track.album_image || artist.image,
            audio: track.audio,
          })),
        }));

        setPlaylists([...customPlaylists, ...jamendoPlaylists]);
      } catch (error) {
        console.error('Playlist fetch error:', error.message);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#353A40] px-4">
      {/* Top Header */}
      <View className="flex-row justify-between items-center pt-4 mb-4">
        <Text className="text-white text-[18px] font-USemiBold">Good afternoon</Text>
        <View className="flex-row gap-8">
          <View className="h-[44px] w-[44px] bg-[#1C1F22] rounded-full items-center justify-center">
            <Ionicons name="flash-outline" size={20} color="white" />
          </View>
          <TouchableOpacity
            className="h-[44px] w-[44px] bg-[#1C1F22] rounded-full items-center justify-center"
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="grid-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recently Played */}
      <View className="mb-6">
        <Text className="text-white font-USemiBold text-[16px] mb-3">Recently played</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentlyPlayed}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View
              className="justify-center items-center mr-4 w-[110px] h-[130px] bg-[#282C30] rounded-3xl"
              style={{
                shadowColor: 'black',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
                elevation: 15,
              }}
            >
              <Image source={item.image} style={{ width: 76, height: 76, borderRadius: 20 }} />
              <Text className="text-[#989CA0] text-[14px] text-center mt-3" numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          )}
        />
      </View>

      {/* To get you started */}
      <View>
        <Text className="text-white font-USemiBold text-[16px]">To get you started</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={dailyMixes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingRight: 20 }}
          renderItem={({ item }) => (
            <View
              className="mr-4 mt-3 bg-[#282C30] rounded-3xl h-[214px] w-[130px]"
              style={{
                shadowColor: 'black',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
                elevation: 10,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: '100%',
                  height: 131,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
              <View className="px-3">
                <Text className="text-white mt-3 mb-2 font-USemiBold text-[14px]">{item.title}</Text>
                <Text
                  className="text-[#7F8489] text-[10px] font-UMedium pr-2 leading-4"
                  numberOfLines={2}
                >
                  {item.desc}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Your Playlists (fetched) */}
      {playlists.length > 0 && (
        <View className="mt-6">
          <Text className="text-white font-USemiBold text-[16px] mb-3">Your Playlists</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={playlists}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10, paddingRight: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="mr-4 bg-[#282C30] rounded-3xl h-[214px] w-[130px]"
                onPress={() =>
                  navigation.navigate('FullPlayer', {
                    playlist: item.tracks,
                    title: item.title,
                  })
                }
                style={{
                  shadowColor: 'black',
                  shadowOffset: { width: 10, height: 10 },
                  shadowOpacity: 0.7,
                  shadowRadius: 15,
                  elevation: 10,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: '100%',
                    height: 131,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />
                <View className="px-3">
                  <Text
                    className="text-white mt-3 mb-2 font-USemiBold text-[14px]"
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    className="text-[#7F8489] text-[10px] font-UMedium pr-2 leading-4"
                    numberOfLines={2}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
