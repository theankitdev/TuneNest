import React, { useRef, useState } from 'react';
import {
    Animated,
    View,
    Text,
    ImageBackground,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SectionList from '../../components/sectionList';
import { sections } from '../../components/Data';

const sides = [
    {
        label: '1 SIDE',
        songs: [
            { id: '1', title: 'Song A1', duration: '3:12' },
            { id: '2', title: 'Song A2', duration: '4:08' },
            { id: '3', title: 'Song A3', duration: '2:55' },
            { id: '4', title: 'Song A4', duration: '5:00' },
            { id: '5', title: 'Song A5', duration: '3:33' },
            { id: '6', title: 'Song A6', duration: '4:10' },
        ],
    },
    {
        label: '1 SIDE',
        songs: [
            { id: '7', title: 'Song A7', duration: '3:22' },
        ],
    },
    {
        label: '2 SIDE',
        songs: [
            { id: '8', title: 'Song B1', duration: '3:10' },
            { id: '9', title: 'Song B2', duration: '4:22' },
        ],
    },
];

const Album = () => {
    const { title, image, item: stringItem } = useLocalSearchParams();
    const item = JSON.parse(stringItem);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [expandedSections, setExpandedSections] = useState({});

    const toggleExpand = (index) => {
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [300, 151],
        extrapolate: 'clamp',
    });

    const albumSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [174, 90],
        extrapolate: 'clamp',
    });

    const albumNameSize = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [30, 15],
        extrapolate: 'clamp',
    });

    return (
        <>
            <StatusBar style="light" />
            <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
                <ImageBackground source={{ uri: image }} style={{ flex: 1 }} blurRadius={5}>
                    <SafeAreaView className="flex-1 justify-end items-center pb-10">
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
                        <Animated.Text
                            className="font-LBold text-white text-center mb-4"
                            style={{ fontSize: albumNameSize }}
                        >
                            {title}
                        </Animated.Text>
                        <View className="flex-row items-center justify-center mb-4">
                            <Ionicons name="heart" size={14} color="white" style={{ paddingHorizontal: 4 }} />
                            <Text className="text-white text-[12px] font-LRegular">87,444</Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </Animated.View>

            {/* Button Row */}
            <View className="bg-[#1B1A1C]">
                <View className="flex-row justify-around px-6 absolute top-[-25] left-0 right-0">
                    <TouchableOpacity className="flex-row items-center justify-center border border-white rounded-full w-[150px] h-[45px]">
                        <Ionicons name="heart-outline" size={18} color="white" />
                        <Text className="text-white text-[12px] font-LBold px-1">ADD ALBUM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center border border-transparent rounded-full w-[161px] h-[50px] justify-center">
                        <Ionicons name="play" size={18} color="white" />
                        <Text className="text-white text-[12px] font-LBold px-1">PLAY</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center items-center py-6 w-full" />


                {/* Song Sections */}
                <Animated.ScrollView
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                        useNativeDriver: false,
                    })}
                    showsVerticalScrollIndicator={false}
                >
                    {sides.map((side, index) => {
                        const isExpanded = expandedSections[index];
                        const visibleSongs = isExpanded ? side.songs : side.songs.slice(0, 5);
                        const hiddenCount = side.songs.length - visibleSongs.length;

                        return (
                            <View key={index} className="mb-10">
                                {/* Section Header */}
                                <View className="flex-row justify-between mb-4">
                                    <View className="flex-row items-center">
                                        <MaterialIcons name="radio-button-on" size={20} color="white" style={{ marginRight: 8 }} />
                                        <Text className="text-white font-LRegular text-[16px]">{index + 1} SIDE</Text>
                                    </View>
                                    <Text className="text-white font-LRegular text-[16px]">Album Songs</Text>
                                </View>

                                {/* Song List */}
                                {visibleSongs.map((song, songIndex) => (
                                    <TouchableOpacity key={song.id} className="flex-row items-center gap-2 mb-5">
                                        <Text className="text-white font-LBold">{songIndex + 1}</Text>
                                        <View className="pl-2">
                                            <Text className="text-[14px] text-white font-LRegular mb-1">{song.title}</Text>
                                            <Text className="text-[13px] text-[#99999F] font-LRegular">{song.duration}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}

                                {/* Show More / Less Button */}
                                {side.songs.length > 5 && (
                                    <TouchableOpacity
                                        onPress={() => toggleExpand(index)}
                                        className="mt-2 items-center"
                                    >
                                        <Text className="text-[#3B82F6] font-LBold text-[14px]">
                                            {isExpanded ? 'Show Less' : `Show ${hiddenCount} More`}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    })}

                    <View className="mt-6">
                        {sections.map((section, index) => (
                            <SectionList
                                key={index}
                                title='More by The Smashing Pump...'
                                item={section.items}
                                path='/player'
                            />
                        ))}
                    </View>
                </Animated.ScrollView>
            </View>
        </>
    );
};

export default Album;
