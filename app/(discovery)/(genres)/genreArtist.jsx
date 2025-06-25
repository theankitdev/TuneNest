import { View, Text, ImageBackground, Animated, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { songs } from '../../../components/Data';
import { BlurView } from 'expo-blur';

const GenreArtist = () => {
    const { title, image } = useLocalSearchParams();
    const scrollY = useRef(new Animated.Value(0)).current;

    // Animate header height
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [340, 220], // Shrinks from 340 to 180
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
            <Animated.FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 5, backgroundColor: '#491EB8' }}

                ListHeaderComponent={
                    /* Featuring Line */
                    <Text className="text-[#99999F] text-[14px] font-LRegular px-7 pt-4 mb-4" >
                        Playists
                    </Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity className="flex-row items-center gap-3 pt-6">
                        <Image
                            source={item.image}
                            className="w-[45px] h-[45px] rounded-md"
                            resizeMode="cover"
                        />
                        <View className="pl-1">
                            <Text className="text-[14px] text-white font-LRegular mb-1">{item.title}</Text>
                            <Text className="text-[13px] text-[#99999F] font-LRegular">
                                {item.artist} / {item.duration}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );
};

export default GenreArtist;
