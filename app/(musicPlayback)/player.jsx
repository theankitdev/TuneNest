import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SongCarousel from '../../components/carousel'
import { songs } from '../../components/Data'
import MusicSlider from '../../components/musicSlider'

const player = () => {
    const { title, image } = useLocalSearchParams();
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
                            <Ionicons name='chevron-down' size={24} color="white"/>
                        </TouchableOpacity>
                        <View className="absolute left-0 right-0 items-center">
                            <Text className="text-[#D2D2D2] text-[14px] font-LRegular text-center pb-1">Playlists</Text>
                            <Text className="text-white font-LRegular text-[18px] text-center">{title}</Text>
                        </View>
                    </View>

                    // Song Carousel
                     <SongCarousel item={songs}/>

                     // Add,like & option button
                    <View className="flex-row justify-around ">
                        <TouchableOpacity>
                            <Ionicons name='add' size={22} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name='heart-outline' size={22} color='white'/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/options')}>
                            <Ionicons name='ellipsis-vertical' size={20} color="white"/>
                        </TouchableOpacity>
                    </View>

                    <MusicSlider/>
                </SafeAreaView>
            </ImageBackground>
        </>
    )
}

export default player