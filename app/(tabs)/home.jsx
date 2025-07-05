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
          image: { uri: track.album_image },
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
        const response = await axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=10');

        const tracks = response.data.results.map(track => ({
          title: track.name,
          artist: track.artist_name, // used in queue
          subtitle: track.artist_name, // used in section display
          duration: track.duration * 1000, // Jamendo gives in seconds; convert to ms
          image: { uri: track.album_image },
          audio: track.audio || music,
        }));


        setPlaylist(tracks);
      } catch (error) {
        console.error('Error fetching playlist:', error.response?.data || error.message);
      }
    };

    fetchPlaylist();
  }, []);

  useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await axios.get(
                    'https://api.jamendo.com/v3.0/artists/tracks/?client_id=3e2494c0&format=json&limit=10'
                );

                const artists = response.data.results;

                const grouped = artists.map((artist) => {
                    const artistName = artist.name;
                    const artistImage = artist.image;
                    const tracks = artist.tracks.map((track) => ({
                        title: track.name,
                        subtitle: artist.name,
                        artist: artist.name,
                        duration: Number(track.duration) * 1000,
                        image: { uri: track.album_image || artist.image },
                        audio: track.audio,
                    }));

                    return {
                        artist: artistName,
                        image: artistImage,
                        tracks, // array of this artist's tracks
                    };
                });

                setArtist(grouped); // set as array of artist objects
            } catch (error) {
                console.error('Error fetching artists:', error.response?.data || error.message);
            }
        };

        fetchArtist();
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
        contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 15, flexGrow: 1 }}
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
            pathname='/playlistPage'
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
