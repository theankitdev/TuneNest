import {
  View,
  Text,
  ImageBackground,
  Animated,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import SongList from '../../components/songList';
import SectionList from '../../components/sectionList';
import CircularSection from '../../components/circularSectionList';
import axios from 'axios';
import { useAudioPlayer } from '../../context/AudioPlayerContext';

const ArtistPage = () => {
  const { title, image, item: stringItem } = useLocalSearchParams();
  const item = JSON.parse(stringItem);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [artist, setArtist] = useState([]);
  const [shufflePlayed, setShufflePlayed] = useState(false);

  const { playShuffledPlaylist, sound } = useAudioPlayer();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [340, 220],
    extrapolate: 'clamp',
  });

  const albumSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [174, 90],
    extrapolate: 'clamp',
  });

  const textSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [14, 9],
    extrapolate: 'clamp',
  });

  const albumNameSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [30, 15],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          'https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=10'
        );
        const tracks = response.data.results.map((track) => ({
          title: track.name,
          artist: track.artist_name,
          subtitle: track.artist_name,
          duration: track.duration * 1000,
          image: track.album_image,
          audio: track.audio,
          releaseDate: track.releasedate,
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
            image: track.album_image || artist.image,
            audio: track.audio,
          }));
          return {
            artist: artistName,
            image: artistImage,
            tracks,
          };
        });
        setArtist(grouped);
      } catch (error) {
        console.error('Error fetching artists:', error.response?.data || error.message);
      }
    };
    fetchArtist();
  }, []);

  const handleShufflePress = async () => {
    if (!playlist.length) return;
    if (shufflePlayed) {
      setShufflePlayed(false);
      if (sound.current) {
        await sound.current.stopAsync();
      }
    } else {
      playShuffledPlaylist(playlist);
      setShufflePlayed(true);
    }
  };

  return (
    <>
      <StatusBar style="light" />

      {/* Header */}
      <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
        <ImageBackground
          source={{ uri: image }}
          style={{ flex: 1 }}
          resizeMode="cover"
          blurRadius={30}
        >
          <SafeAreaView className="flex-1 justify-center items-center">
            <View className="relative">
              <Animated.Image
                source={{ uri: image }}
                style={{
                  width: albumSize,
                  height: albumSize,
                  borderRadius: 100,
                  marginBottom: 12,
                }}
                resizeMode="cover"
              />
              {/* Blue Tick Overlay */}
              <View className="absolute bottom-1 right-1 bg-white rounded-full p-[2px]">
                <View className="bg-blue-500 w-3 h-3 rounded-full" />
              </View>
            </View>

            <Animated.Text
              className="font-LBold text-white text-center"
              style={{ fontSize: albumNameSize }}
            >
              {title}
            </Animated.Text>

            <View className="flex-row items-center justify-center mb-4 mt-2">
              <Ionicons name="heart" size={14} color="white" style={{ paddingHorizontal: 4 }} />
              <Animated.Text className="text-white font-LRegular" style={{ fontSize: textSize }}>
                87,444
              </Animated.Text>
            </View>
          </SafeAreaView>

          {/* Follow & Shuffle Play */}
          <View className="flex-row items-center justify-around pb-4">
            <TouchableOpacity className="flex-row items-center">
              <Ionicons name="heart-outline" size={18} color="white" />
              <Text className="text-white text-[12px] font-LBold px-1">FOLLOW</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center px-3 py-2 rounded-full ${
                shufflePlayed ? 'bg-white' : 'bg-transparent'
              }`}
              onPress={handleShufflePress}
            >
              <Ionicons name="play" size={18} color={shufflePlayed ? '#1E90FF' : 'white'} />
              <Text
                className={`ml-1 text-[12px] font-LBold ${
                  shufflePlayed ? 'text-[#1E90FF]' : 'text-white'
                }`}
              >
                PLAY
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Content */}
      <View className="bg-[#1B1A1C] flex-1">
        <View className="flex-row justify-center items-center py-6">
          <TouchableOpacity>
            <Text className="text-white text-[16px] font-LRegular text-center mx-4">OVERVIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white text-[16px] font-LRegular mx-4">FANS ALSO LIKE</Text>
          </TouchableOpacity>
        </View>

        <Animated.ScrollView
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15, flexGrow: 1 }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* Songs */}
          <View className="mt-6">
            <View className="flex-row justify-between">
              <Text className="text-[14px] font-LRegular text-white mb-6 pb-1">Popular songs</Text>
              <TouchableOpacity onPress={() => setExpanded(false)}>
                <Ionicons name="chevron-down" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <SongList songs={expanded ? item : item.slice(0, 5)} />

            <TouchableOpacity
              onPress={() => setExpanded(!expanded)}
              className="mt-4 items-center px-2"
            >
              <Text className="text-white font-LBold text-[14px] border border-white rounded-full py-2 px-6">
                {expanded ? 'SHOW LESS' : `SHOW ${item.length - 5} MORE`}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10">
            {playlist?.length > 0 && (
              <>
                <SectionList title="Albums" item={playlist} pathname="/albumPage" />
                <SectionList title="Singles & EPs" item={playlist} pathname="/playlistPage" />
                <SectionList
                  title="Appears in these playlists"
                  item={playlist}
                  pathname="/playlistPage"
                />
              </>
            )}

            {artist?.length > 0 && (
              <CircularSection title="Fans Also Like" item={artist} pathname="/playlistPage" />
            )}
          </View>
        </Animated.ScrollView>
      </View>
    </>
  );
};

export default ArtistPage;
