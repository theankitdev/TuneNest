import React, { useRef, useEffect } from 'react';
import {
    Animated,
    View,
    Text,
    ScrollView,
    Pressable,
    StatusBar as RNStatusBar,
    ImageBackground,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Options from '../../../components/options';
import SectionList from '../../../components/sectionList';
import { sections } from '../../../components/Data';
import Genre from './genre';
import { useLocalSearchParams } from 'expo-router';
import CircularSection from '../../../components/circularSectionList';
import axios from 'axios';
import music from '../../../assets/music/sample.mp3';

const GenreSelected = () => {
    const { title, image } = useLocalSearchParams();
    const [playlist, setPlaylist] = React.useState(null);
    const [newReleases, setNewReleases] = React.useState([]);
    const [artist, setArtist] = React.useState([]);
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
        { label: 'OVERVIEW', path: '/genreSelected' },
        { label: 'PLAYLISTS', path: '/genrePlaylists', params: { image } },
        { label: 'NEW RELEASES', path: '/podcasts' },
        { label: 'ARTISTS', path: '/recommendation' },
    ];

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=10');

                const tracks = response.data.results.map(track => ({
                    title: track.name,
                    artist: track.artist_name, // used in queue
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
        const fetchNewReleases = async () => {
            try {
                const response = await axios.get('https://api.jamendo.com/v3.0/tracks/?client_id=3e2494c0&format=json&limit=10');

                const tracks = response.data.results.map(track => ({
                    title: track.name,
                    subtitle: track.artist_name, // used in section display
                    duration: track.duration * 1000, // Jamendo gives in seconds; convert to ms
                    image: { uri: track.album_image },
                    audio: track.audio || music,
                    releaseDate: track.releasedate, // assuming this field exists
                }));


                setNewReleases(tracks);
            } catch (error) {
                console.error('Error fetching playlist:', error.response?.data || error.message);
            }
        };

        fetchNewReleases();
    }, []);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await axios.get(
                    'https://api.jamendo.com/v3.0/artists/tracks/?client_id=3e2494c0&format=json&limit=10'
                );

                const artists = response.data.results;

                const grouped = artists.map((artist) => {
                    const tracks = artist.tracks.map((track) => ({
                        title: track.name,
                        subtitle: artist.name,
                        artist: artist.name,
                        duration: Number(track.duration) * 1000,
                        image: { uri: track.album_image || artist.image },
                        audio: track.audio,
                    }));

                    return {
                        artist: artist.name,
                        image: { uri: artist.image },
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
                                {title}
                            </Animated.Text>
                        </View>

                        <Options options={tabOptions} />
                    </SafeAreaView>
                </ImageBackground>
            </Animated.View>

            {/* Main Content */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                className="bg-[#1B1A1C]"
            >
                {playlist && (
                    <SectionList
                        title='Popular in these week'
                        item={playlist}
                        pathname='/playlistPage'
                    />
                )}

                {playlist && (
                    <SectionList
                        title='Playlists'
                        item={playlist}
                        pathname='/playlistpage'
                    />
                )}

                {newReleases && (
                    <SectionList
                        title='New Releases'
                        item={newReleases}
                        pathname='/playlistPage'
                    />
                )}

                {artist && (
                    <CircularSection
                        title='Artists'
                        item={artist}
                        pathname='/playlistPage'
                    />
                )}

            </Animated.ScrollView>
        </>
    );
};

export default GenreSelected;
