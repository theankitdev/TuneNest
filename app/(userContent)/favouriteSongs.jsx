import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import SongList from '../../components/songList'
import { songs } from '../../components/Data'

const favouriteSongs = () => {

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }} className="bg-[#161A1A]">
            {/* Edit & Suffle play */}
            <View className="flex-row items-center justify-between  bg-[#161A1A] px-10 mt-8">
                <TouchableOpacity>
                    <Text className="text-white font-LRegular text-[14px] px-10">EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <Ionicons name='shuffle' color='white' size={24} />
                    <Text className="text-white font-LRegular text-[14px] pl-2">SHUFFLE PLAY</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between bg-[#161A1A]  mt-4">
                <Text className="text-[16px] font-LRegular text-[#CECECE]">DOWNLOAD</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#2DCEEF' }}
                    thumbColor={isEnabled ? '#ffffff' : '#CECECE'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View className="mt-8">
                <Text className="text-white text-right mb-8 font-LRegular text-[16px]">112 songs, 14 hr 12 min</Text>
                <SongList songs={songs}/>
            </View>
        </ScrollView>
    )
}

export default favouriteSongs