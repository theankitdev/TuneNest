import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const SongList = ({songs}) => {
  return (
    <FlatList
       data={songs}
       keyExtractor={(item) => item.id}
       scrollEnabled={false}
       renderItem={({item}) => (
        <TouchableOpacity className="flex-row items-center gap-2 mb-6">
            <Image
               source={ item.image }
               className="w-[full] h-[45px] rounded-md"
               style={{ width: 45, height: 45 }}
               resizeMode="cover"
            />

            <View className="pl-2">
                <Text className="text-[14px] text-white font-LRegular mb-2">{item.title}</Text>
                <Text className="text-[13px] text-[#99999F] font-LRegular">{item.artist}  /  {item.duration}</Text>
            </View>
        </TouchableOpacity>
       )}
    />
  )
}

export default SongList