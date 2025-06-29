import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SongList from '../../components/songList'
import { songs } from '../../components/Data'

const listeningHistory = () => {
    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }} className="bg-[#161A1A]">
            <View className="mt-8">
                <Text className="text-white font-LRegular text-[20px] mb-8">Today</Text>
                <SongList songs={songs} />
            </View>

            <View className="mt-8">
                <Text className="text-white font-LRegular text-[20px] mb-8">Yesterday</Text>
                <SongList songs={songs} />
            </View>

            <View className="mt-8">
                <Text className="text-white font-LRegular text-[20px] mb-8">Last week</Text>
                <SongList songs={songs} />
            </View>

        </ScrollView>
    )
}

export default listeningHistory