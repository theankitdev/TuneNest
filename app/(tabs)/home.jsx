import React, { useRef, useState, useEffect,useCallback } from 'react';
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
import { router, useFocusEffect, usePathname } from 'expo-router';
import { sections } from '../../components/Data';
import { genre } from '../../assets/images/genres/genre';
import CircularSection from '../../components/circularSectionList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useBackToHome = () => {
  const pathname = usePathname();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (pathname !== '/home') {
          router.replace('/home');
        }
        return true; // Always block default behavior (like exiting)
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [pathname])
  );
};

const Home = () => {

  useBackToHome();

  const scrollY = useRef(new Animated.Value(0)).current;

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const token = 'BQAU9DRmtj2lcNxTZkglobEEs1rwwzFQVKc5_l6HcQXlFfraaCJUe3e_t21CP4yYYF1dI8yKXFVcUdQ3LGLNmyLLEpIcJ7PZY5NiYZUY7vCMUWRW6LoC5-kEKcB8QlxVx-whVYipYHs';
        const response = await axios.get('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tracks = response.data.tracks.items.map((item) => ({
          title: item.track.name,
          subtitle: item.track.artists[0]?.name || "Unknown Artist",
          image: { uri: item.track.album.images[0]?.url },
          audio: item.track.preview_url, 
        }));

        setPlaylist({
          title: response.data.name,
          items: tracks,
        });
      } catch (error) {
        console.error('Error fetching playlist:', error.response?.data || error.message);
      }
    };

    fetchPlaylist();
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
        contentContainerStyle={{ paddingBottom: 130, paddingHorizontal: 15 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="bg-[#1B1A1C]"
      >

        {sections.map((section, index) => (
          <SectionList
            key={index}
            title={section.title}
            item={section.items}
            subtitle={section.subtitle}
          />
        ))}

        {playlist && (
          <SectionList
            title='Make monday more productive'
            item={playlist.items}
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
            item={playlist.items}
          />
        )}

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
            item={playlist.items}
          />
        )}

        {playlist && (
          <CircularSection
            title='You might like these artists'
            item={playlist.items}
          />
        )}

        {playlist && (
          <SectionList
            title='Popular playlists'
            item={playlist.items}
          />
        )}

      </Animated.ScrollView>

    </>
  );
};

export default Home;
