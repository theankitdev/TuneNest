import { View, Text, ImageBackground, Animated, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { songs } from '../../components/Data';
import { BlurView } from 'expo-blur';

const episodes = [
    {
        id: '1',
        title: 'Cosmic Queries - Neuroscience',
        desc: 'Psychedelic drugs, dreams, mental health awareness, understanding our reality, and more - Neil deGrasse Tyson dives deep into the human mind.',
        date: '22/03/19',
        duration: '49 min 45 sec',
    },
    {
        id: '2',
        title: 'Einstein’s Genius, with Ron Howard',
        desc: 'Neil deGrasse Tyson, filmmaker Ron Howard, astrophysicist Janna Levin, and comic co-host Harris talk about the life and mind of Albert Einstein.',
        date: '15/03/19',
        duration: '51 min 42 sec',
    },
    {
        id: '3',
        title: '#ICYMI - NASCAR vs Formula 1',
        desc: 'In case you missed this episode on the Playing with Science channel... NASCAR or Formula 1? The debate gets fast and furious.',
        date: '14/03/19',
        duration: '51 min 35 sec',
    },
    {
        id: '4',
        title: 'Cosmic Queries - Across the Universe',
        desc: 'Continuing our Let’s Make America Smart Again series, Neil deGrasse Tyson and co-hosts tackle cosmic questions that take you across the universe.',
        date: '08/03/19',
        duration: '51 min 42 sec',
    },
    {
        id: '5',
        title: 'Cosmic Queries - Across the Universe',
        desc: 'Continuing our Let’s Make America Smart Again series, Neil deGrasse Tyson and co-hosts tackle cosmic questions that take you across the universe.',
        date: '08/03/19',
        duration: '51 min 42 sec',
    },
    {
        id: '6',
        title: 'Cosmic Queries - Across the Universe',
        desc: 'Continuing our Let’s Make America Smart Again series, Neil deGrasse Tyson and co-hosts tackle cosmic questions that take you across the universe.',
        date: '08/03/19',
        duration: '51 min 42 sec',
    },
    {
        id: '7',
        title: 'Cosmic Queries - Across the Universe',
        desc: 'Continuing our Let’s Make America Smart Again series, Neil deGrasse Tyson and co-hosts tackle cosmic questions that take you across the universe.',
        date: '08/03/19',
        duration: '51 min 42 sec',
    },
];

const PodcastPage = () => {

    const { title, image } = useLocalSearchParams();
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animate header height
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [300, 151], // Shrinks from 340 to 180
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

    const [expandedItems, setExpandedItems] = useState([]);

    const toggleExpand = (id) => {
        setExpandedItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };
    const renderItem = ({ item }) => {
        const isExpanded = expandedItems.includes(item.id);
        const shouldTruncate = item.desc.length > 70;
        const displayText = isExpanded ? item.desc : item.desc.slice(0, 70) + (shouldTruncate ? '...' : '');

        return (
            <View className="mb-6">
                <View className="flex-1 items-start mb-1">
                    <View className="flex-1 px-4">
                        <Text className="text-white font-LRegular text-[15px] pb-2">{item.title}</Text>
                        <Text className="text-[#99999f] text-[12px] font-LRegular leading-5">
                            {displayText}
                            {shouldTruncate && (
                                <Text className="text-white text-[14px]  text-right font-LRegular" onPress={() => toggleExpand(item.id)}>
                                    {isExpanded ? 'see less' : 'see more'}
                                </Text>
                            )}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity className="mr-3 mt-1">
                        <Ionicons name="play-circle" size={36} color="white" />
                    </TouchableOpacity>
                    <Text className="text-gray-500 text-[14px] font-LRegular mr-8">
                        {item.date}  •  {item.duration}
                    </Text>
                    <View className="h-1 bg-blue-500 mt-1 w-24 rounded-full px-4" />
                </View>

            </View>
        );
    };

    return (
        <>
            <StatusBar style="light" />

            {/* Animated Header */}
            <Animated.View style={{ height: headerHeight, overflow: 'hidden' }}>
                <ImageBackground
                    source={image}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                    blurRadius={5}
                >
                    <SafeAreaView className="flex-1 justify-end items-center pb-10">

                        <Animated.Text className="font-LBold text-white text-center mb-4"
                            style={{
                                fontSize: albumNameSize
                            }}
                        >
                            {title}
                        </Animated.Text>
                        
                        <View className="flex-row items-center justify-center mb-4">
                            <Ionicons name="heart" size={14} color="white" style={{paddingHorizontal: 4}}/>
                        <Animated.Text className="text-white text-[14px] font-LRegular"
                          style={{
                                fontSize: textSize
                            }}
                        >
                            87,444
                        </Animated.Text>
                        </View>
                    
                    </SafeAreaView>
                </ImageBackground>
            </Animated.View>

             {/* Buttons */}
                    <View className="bg-[#1B1A1C] ">
                    <View className="flex-row justify-around px-6 absolute top-[-32] left-0 right-0">
                        <TouchableOpacity className="flex-row items-center justify-center border border-white rounded-full w-[150px] h-[45px]">
                            <Ionicons name="heart-outline" size={18} color="white" />
                            <Text className="text-white text-[12px] font-LBold px-1">FOLLOW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center border border-transparent rounded-full w-[161px] h-[50px] justify-center">
                            <Ionicons name="play" size={18} color="white" />
                            <Text className="text-white text-[12px] font-LBold px-1">PLAY</Text>
                        </TouchableOpacity>
                    </View>

                     <View className="flex-row justify-center items-center py-6 mt-5 w-full">
                        <Text className="text-white text-[16px] font-LRegular text-center mx-4">Episodes</Text>
                    </View>
                </View>

            {/* Song List */}
            <Animated.FlatList
                data={episodes}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ padding: 16, paddingBottom: 40, backgroundColor: '#1B1A1C' }}
                showsVerticalScrollIndicator={false}

                ListHeaderComponent={
                    <Text className="text-white text-[16px] font-LRegular pb-8 px-1" >
                        All episodes
                    </Text>
                }
                renderItem={renderItem}
            />
        </>
    );
};

export default PodcastPage;
