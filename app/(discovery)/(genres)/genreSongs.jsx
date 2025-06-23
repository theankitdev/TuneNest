import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

const GenreSongs = () => {
    const { title, image } = useLocalSearchParams();
  return (
    <>
        <StatusBar style='light'/>

        // Header
        <ImageBackground
            source={ image }
            className='w-full h-[340px] rounded-lg '
            resizeMode='cover'
            blurRadius={30}
        >
            <View className='flex-1 justify-center items-center'>
                <Image
                    source={ image }
                    className='w-[174px] h-[174px] rounded-lg mb-2 mt-14 self-center' 
                    resizeMode='contain'
                />
                 <Text className='text-[30px] font-LBold text-white text-center'>{title}</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <Ionicons/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    </>
  )
}

export default GenreSongs