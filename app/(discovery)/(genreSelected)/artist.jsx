import { View, Text, ImageBackground, Animated, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { songs, sections } from '../../../components/Data';
import { BlurView } from 'expo-blur';
import SongList from '../../../components/songList';
import SectionList from '../../../components/sectionList';
import CircularSection from '../../../components/circularSectionList';

const GenreArtist = () => {
    const { title, image } = useLocalSearchParams();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [expanded, setExpanded] = React.useState(false);

    // Animate header height
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [340, 220],
        extrapolate: 'clamp',
    });

    // Animate album image size
    const albumSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [174, 90],
        extrapolate: 'clamp',
    });

    // Animate likes size
    const textSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [14, 9],
        extrapolate: 'clamp',
    });

    // Animate album title size
    const albumNameSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [30, 15],
        extrapolate: 'clamp',
    });

    return (
        <>
            <StatusBar style="light" />

            {/* Animated Header */}
            <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
                <ImageBackground
                    source={image}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                    blurRadius={30}
                >
                    <SafeAreaView className="flex-1 justify-center items-center">
                        <Animated.Image
                            source={image}
                            style={{
                                width: albumSize,
                                height: albumSize,
                                borderRadius: 12,
                                marginBottom: 12,
                            }}
                            resizeMode="contain"
                        />
                        <Animated.Text className="font-LBold text-white text-center"
                            style={{
                                fontSize: albumNameSize
                            }}
                        >
                            {title}
                        </Animated.Text>

                        <View className="flex-row items-center justify-center mb-4 mt-2">
                            <Ionicons name="heart" size={14} color="white" style={{ paddingHorizontal: 4 }} />
                            <Animated.Text className="text-white text-[14px] font-LRegular"
                                style={{
                                    fontSize: textSize
                                }}
                            >
                                87,444
                            </Animated.Text>
                        </View>
                    </SafeAreaView>

                    {/* Buttons */}
                    <View className="flex-row items-center justify-around pb-4">
                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="heart-outline" size={18} color="white" />
                            <Text className="text-white text-[12px] font-LBold px-1">FOLLOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <Ionicons name="play" size={18} color="white" />
                            <Text className="text-white text-[12px] font-LBold px-1">PLAY</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Animated.View>

            <View className="flex-row justify-center items-center py-6  w-full bg-[#491EB8]">
                <TouchableOpacity>
                    <Text className="text-white text-[16px] font-LRegular text-center mx-4">OVERVIEW</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className="text-white text-[16px] font-LRegular mx-4">About</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className="text-white text-[16px] font-LRegular mx-4">FANS ALSO LIKE</Text>
                </TouchableOpacity>
            </View>

            {/* Song List */}
            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                className="bg-[#491EB8]"
            >
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between">
                        <Text className="text-[14px] font-LRegular text-white mb-6 pb-1">Popular songs</Text>
                        <TouchableOpacity className="flex-row">
                            <Ionicons name="chevron-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <SongList songs={expanded ? songs : songs.slice(0, 5)} /> {/* 🔁 Slice if not expanded */}

                    {/* Expand/Collapse Button */}
                    <TouchableOpacity
                        onPress={() => setExpanded(!expanded)}
                        className="mt-4 items-center px-2"
                    >
                        <Text className="text-white font-LBold text-[14px] border border-white rounded-full py-2 px-6">
                            {expanded
                                ? 'SHOW LESS'
                                : `SHOW ${songs.length - 5} MORE`}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="px-4 mt-6">
                    {sections.map((section, index) => (
                        <SectionList
                            key={index}
                            title='Albums'
                            item={section.items}
                            path='/album'
                        />
                    ))}
                </View>
                <View className="px-4 mt-6">
                    {sections.map((section, index) => (
                        <CircularSection
                            key={index}
                            title='Fans Also Like'
                            item={section.items}
                            path='/genreArtist'
                        />
                    ))}
                </View>

            </Animated.ScrollView>
        </>
    );
};

export default GenreArtist;
