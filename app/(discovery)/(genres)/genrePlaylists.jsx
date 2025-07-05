import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Options from '../../../components/options';

const GenrePlaylists = () => {
  const { title, image } = useLocalSearchParams();
  const [playlist, setPlaylist] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [197, 150],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [40, 18],
    extrapolate: 'clamp',
  });

  const tabOptions = [
    { label: 'OVERVIEW', path: '/genreSelected', params: { image } },
    { label: 'PLAYLISTS', path: '/genrePlaylists' },
    { label: 'NEW RELEASES', path: '/newReleases' },
    { label: 'ARTISTS', path: '/recommendation' },
  ];

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          'https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=20'
        );

        const tracks = response.data.results.map((track) => ({
          title: track.name,
          artist: track.artist_name,
          subtitle: track.artist_name,
          duration: track.duration * 1000,
          image: { uri: track.album_image },
          audio: track.audio,
          likes: '12.5K', // Optional default likes
        }));

        setPlaylist(tracks);
      } catch (error) {
        console.error('Error fetching playlist:', error.response?.data || error.message);
      }
    };

    fetchPlaylist();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/playlistPage',
          params: {
            title: item.title,
            item: JSON.stringify(playlist),
          },
        })
      }
      style={{ marginBottom: 20 }}
    >
      <Image
        source={item.image}
        style={{ width: 151, height: 151, borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text
        style={{
          color: 'white',
          fontFamily: 'Lato-Regular',
          fontSize: 14,
          marginTop: 6,
           width: 145
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Ionicons name="heart" size={14} color="#99999F" />
        <Text
          style={{
            color: '#99999F',
            fontSize: 10,
            marginLeft: 4,
            fontFamily: 'Lato-Regular',
          }}
          numberOfLines={1}
        >
          {item.likes}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Collapsible Header */}
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <ImageBackground
          source={image}
          style={{ flex: 1 }}
          resizeMode="cover"
          blurRadius={2}
        >
          <SafeAreaView className="flex-1 justify-between">
            <View className="items-center pt-10">
              <Animated.Text
                style={{
                  fontSize: titleFontSize,
                  color: 'white',
                  fontFamily: 'Lato-Bold',
                }}
              >
                Playlists
              </Animated.Text>
            </View>
            <Options options={tabOptions} />
          </SafeAreaView>
        </ImageBackground>
      </Animated.View>

      <View className="flex-1 bg-[#1B1A1C]">
      {/* Animated Playlist List */}
      <Animated.FlatList
        data={playlist}
        keyExtractor={(item, index) => `track-${index}`}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginHorizontal: 20,
          gap: 20,
        }}
        contentContainerStyle={{
          paddingTop: 15,
          paddingBottom: 100,
          backgroundColor: '#1B1A1C',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      </View>
    </>
  );
};

export default GenrePlaylists;
