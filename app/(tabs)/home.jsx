import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Animated,
  View,
  Text,
  ScrollView,
  Pressable,
  StatusBar as RNStatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../components/options';
import SectionList from '../../components/sectionList';
import { router,  } from 'expo-router';
import { genre } from '../../assets/images/genres/genre';
import CircularSection from '../../components/circularSectionList';
import axios from 'axios';
import music from '../../assets/music/sample.mp3';

const Home = () => {
  const img_base_url ='https://tunenest-backend.onrender.com'
  const scrollY = useRef(new Animated.Value(0)).current;

  const [playlist, setPlaylist] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const getRecentPlayed = async () => {
      try {
        const response = await axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=5');

        const tracks = response.data.results.map(track => ({
          title: track.name,
          subtitle: track.artist_name,
          image: track.album_image ,
          audio: track.audio || music,
        }));

        setRecentlyPlayed(tracks);
      } catch (error) {
        console.error('Error fetching recently played:', error.response?.data || error.message);
      }
    };

    getRecentPlayed();
  }, []);

  useEffect(() => {
  const fetchPlaylist = async () => {
    try {
      // 1️⃣ Fetch custom playlists (with songs)
      const customRes = await axios.get('https://tunenest-backend.onrender.com/api/v1/playlists');

      const customPlaylists = customRes.data.map(item => ({
        title: item.name,
        subtitle: item.description || 'Custom Playlist',
        image: item.cover,
        tracks: item.songs?.map(song => ({
          title: song.title,
          subtitle: song.artist || item.name,
          artist: song.artist || 'Unknown',
          duration: song.duration,
          image: song.image || item.cover,
          audio: song.audio || music,
        })) || [],
      }));

      // 2️⃣ Fetch Jamendo artist-tracks
      const jamendoRes = await axios.get('https://api.jamendo.com/v3.0/artists/tracks/?client_id=3e2494c0&format=json&limit=10');

      const jamendoPlaylists = jamendoRes.data.results.map(artist => ({
        title: artist.name,
        subtitle: 'Jamendo Artist Playlist',
        image: artist.image,
        tracks: artist.tracks.map(track => ({
          title: track.name,
          subtitle: artist.name,
          artist: artist.name,
          duration: track.duration,
          image: track.album_image || artist.image,
          audio: track.audio || music,
        })),
      }));

      // 3️⃣ Combine both
      setPlaylist([...customPlaylists, ...jamendoPlaylists]);
      console.log("Custom Playlist Sample Song:", customPlaylists[1]?.tracks?.[0]);

    } catch (error) {
      console.error('Playlist fetch error:', error.message);
    }
  };

  fetchPlaylist();
}, []);

  useEffect(() => {
  const fetchArtists = async () => {
    try {
      // 🔹 Custom backend API
      const customRes = await axios.get('https://tunenest-backend.onrender.com/api/v1/artist');
      const customArtists = customRes.data.map((artist) => ({
        artist: artist.name,
        image: artist.profileImage,
        coverImage: artist.coverImage,
        genres: artist.genres,
        languages: artist.languages,
        country: artist.country,
        bio: artist.bio,
        tracks: [], 
      }));

      // 🔹 Jamendo API
      const jamendoRes = await axios.get(
        'https://api.jamendo.com/v3.0/artists/tracks/?client_id=3e2494c0&format=json&limit=10'
      );

      const jamendoArtists = jamendoRes.data.results.map((artist) => ({
        artist: artist.name,
        image: artist.image,
        coverImage: artist.image,
        tracks: artist.tracks.map((track) => ({
          title: track.name,
          subtitle: artist.name,
          artist: artist.name,
          duration: track.duration,
          image: track.album_image || artist.image,
          audio: track.audio,
        })),
      }));

      // 🔹 Combine both
      const allArtists = [...customArtists, ...jamendoArtists];

      setArtist(allArtists);
    } catch (error) {
      console.error('Error fetching artists:', error.response?.data || error.message);
    }
  };

  fetchArtists();
}, []);


  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [187, 150],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [40, 18],
    extrapolate: 'clamp',
  });

  const tabOptions = [
    { label: 'OVERVIEW', path: '/home' },
    { label: 'GENRE & MOODS', path: '/genre' },
    { label: 'PODCASTS', path: '/mainPodcasts' },
    { label: 'RECOMMENDATION', path: '/recommendation' },
  ];

  return (
    <>
      <RNStatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Collapsible Header */}
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <LinearGradient colors={['#4169E1', '#1B1A1C']} style={{ flex: 1 }}>
          <SafeAreaView className="flex-1 justify-between">
            <View className="items-center pt-5">
              <Animated.Text
                style={{
                  fontSize: titleFontSize,
                  color: 'white',
                  fontFamily: 'Lato-Bold',
                }}
              >
                Home
              </Animated.Text>
            </View>

            <Options options={tabOptions} />
          </SafeAreaView>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 130, paddingLeft: 15, flexGrow: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="bg-[#1B1A1C]"
      >

        {recentlyPlayed && (
          <SectionList
            title='Recently Played'
            item={recentlyPlayed}
            pathname='/playlistPage'
          />
        )}


        {playlist && (
          <SectionList
            title='Make monday more productive'
            item={playlist}
            pathname='/playlistPage'
          />
        )}

        {/* Browse */}
        <View>
          <Text className="text-white font-LBold text-[20px] pb-2">Browse</Text>
          <Text className="text-[14px] font-LRegular text-[#99999F]">Explore by genre and mood</Text>
        </View>
        <FlatList
          data={genre}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => router.push({ pathname: '/podcasts', params: { title: item.title, image: item.image } })}
            >
              <Image
                source={item.image}
                style={{ width: '151', height: 90, borderRadius: 10 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ marginVertical: 25 }}
          showsHorizontalScrollIndicator={false}
        />

        {playlist && (
          <SectionList
            title='Playlist picks'
            subtitle='Selected for you based on your recent activity'
            item={playlist}
            pathname='/playlistPage'
          />
        )}

        {/* Podcast */}
        <View>
          <Text className="text-white font-LBold text-[20px] pb-2">Podcasts</Text>
          <Text className="text-[14px] font-LRegular text-[#99999F]">Explore by categories and popularity</Text>
        </View>
        <FlatList
          data={genre}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => router.push({ pathname: '/podcasts', params: { title: item.title, image: item.image } })}
            >
              <Image
                source={item.image}
                style={{ width: '151', height: 90, borderRadius: 10 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ marginVertical: 25 }}
          showsHorizontalScrollIndicator={false}
        />

        {playlist && (
          <SectionList
            title='New releases for you'
            item={playlist}
            pathname='/playlistPage'
          />
        )}

        {artist && (
          <CircularSection
            title='You might like these artists'
            item={artist}
            pathname='/artistPage'
          />
        )}

        {playlist && (
          <SectionList
            title='Popular playlists'
            item={playlist}
            pathname='/playlistPage'
          />
        )}

      </Animated.ScrollView>

    </>
  );
};

export default Home;
