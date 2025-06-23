import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SongCarousel from '../../components/carousel'
import { songs } from '../../components/Data'
import Slider from "@react-native-community/slider"
import { Audio } from 'expo-av'
import music from '../../assets/music/sample.mp3'

const player = () => {
    const { title, image } = useLocalSearchParams();

    const sound = useRef(null);
    const [position, setPosition] = useState(0); // in milliseconds
    const [duration, setDuration] = useState(1); // default to avoid division by zero
    const [isSeeking, setIsSeeking] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const formatTime = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    // Load and play music
    const loadSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync(
            music, // ✅ Use your own music file
            {
                shouldPlay: true,
            },
            onPlaybackStatusUpdate
        );
        sound.current = newSound;
    };

    const onPlaybackStatusUpdate = (status) => {
        if (!status.isLoaded) return;

        if (!isSeeking) {
            setPosition(status.positionMillis);
        }

        setDuration(status.durationMillis || 1);
        setIsPlaying(status.isPlaying);
    };


    // Initial load
    useEffect(() => {
        loadSound();
        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, []);

    // When user seeks
    const handleSliderComplete = async (value) => {
        setIsSeeking(false);
        if (sound.current) {
            await sound.current.setPositionAsync(value);
        }
        setIsSeeking(false);
    };

    // Toggle play/pause
    const togglePlayPause = async () => {
        if (!sound.current) return;

        if (isPlaying) {
            await sound.current.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.current.playAsync();
            setIsPlaying(true);
        }
    };
    return (
        <>
            <StatusBar style='light' />
            <ImageBackground
                source={image}
                className=" items-center "
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
                blurRadius={100}
            >
                <SafeAreaView className="flex-1  pt-4">
                    <View className="flex-row justify-between pb-10 px-6">
                        <TouchableOpacity className="">
                            <Ionicons name='chevron-down' size={24} color="white" />
                        </TouchableOpacity>
                        <View className="absolute left-0 right-0 items-center">
                            <Text className="text-[#D2D2D2] text-[14px] font-LRegular text-center pb-1">Playlists</Text>
                            <Text className="text-white font-LRegular text-[18px] text-center">{title}</Text>
                        </View>
                    </View>

                    // Song Carousel
                    <SongCarousel item={songs} />

                    <View style={{ padding: 20, flex: 'end', }}>
                     // Add,like & option button
                        <View className="flex-row justify-around px-10">
                            <TouchableOpacity>
                                <Ionicons name='add' size={22} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name='heart-outline' size={22} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/options')}>
                                <Ionicons name='ellipsis-vertical' size={20} color="white" />
                            </TouchableOpacity>
                        </View>



                        <Slider
                            className="px-4"
                            style={{ width: '100%' }}
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            onValueChange={val => {
                                setIsSeeking(true);
                                setPosition(val);
                            }}
                            onSlidingComplete={handleSliderComplete}
                            minimumTrackTintColor="#E94E1B"
                            maximumTrackTintColor="#ddd"
                            thumbTintColor="#FF5733"
                        />

                        <View className="flex-row justify-between">
                            <Text className="text-white text-center mt-2">
                                {formatTime(position)}
                            </Text>
                            <Text className="text-white text-center mt-2">
                                {formatTime(duration)}
                            </Text>
                        </View>



                        <View className="flex-row  justify-between items-center">
                            <TouchableOpacity onPress={togglePlayPause} style={{ marginTop: 20 }}>
                                <Ionicons
                                    name='shuffle'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            
                            <View className="flex-row items-center justify-center">
                                <TouchableOpacity onPress={togglePlayPause} style={{ marginTop: 20, }}>
                                    <Ionicons
                                        name='play-skip-back'
                                        size={30}
                                        color="white"
                                        
                                    />
                                </TouchableOpacity>
                            <TouchableOpacity onPress={togglePlayPause} style={{ marginTop: 20, marginHorizontal: 20 }}>
                                <Ionicons
                                    name={isPlaying ? 'pause' : 'play'}
                                    size={40}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={togglePlayPause} style={{ marginTop: 20, }}>
                                <Ionicons
                                    name='play-skip-forward'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                            </View>
                             <TouchableOpacity onPress={togglePlayPause} style={{ marginTop: 20 }}>
                                <Ionicons
                                    name='repeat'
                                    size={30}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}

export default player