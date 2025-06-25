import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'

const CircularSection = ({ title, item, path}) => {
  return (
    <View className="mb-4 mt-2">
      <Text className="text-white font-LBold text-[18px] mb-6">{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(items, index) => `${title}-${index}`}
        contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
        renderItem={({item}) => (
            <TouchableOpacity onPress={()=> router.push({pathname: path, params:{title: item.title, image: item.image}})} >
                <Image
                  source={ item.image }
                  className="w-full h-[100px] rounded-full mb-2 mt-1"
                  style={{ width: 145, height: 145 }}
                  resizeMode="conver"
                />
                <Text className="text-white font-LRegular text-[14px] numberOfLines={1} text-center">
                    {item.title}
                </Text>

                <View className="flex-row items-center gap-1 mt-1 justify-center">
                    <Ionicons name='heart' size={14} color='#99999F'/>
                <Text className="text-[#99999F] font-LRegular text-[10px] numberOfLines={1} ">
                    {item.subtitle}
                </Text>
                </View>
            </TouchableOpacity>
        )}
      >

      </FlatList>
    </View>
  )
}

export default CircularSection