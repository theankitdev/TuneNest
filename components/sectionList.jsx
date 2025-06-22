import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SectionList = ({ title, item}) => {
  return (
    <View className="mb-6">
      <Text className="text-white font-LBold text-[18px] mb-4">{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item}
        keyExtractor={(items, index) => `${title}-${index}`}
        contentContainerStyle={{ gap: 16, paddingBottom: 20 }}
        renderItem={({item}) => (
            <View>
                <Image
                  source={ item.image }
                  className="w-full h-[100px] rounded-lg mb-2"
                  style={{ width: 145, height: 145 }}
                  resizeMode="conver"
                />
                <Text className="text-white font-LRegular text-[14px] numberOfLines={1}">
                    {item.title}
                </Text>

                <View className="flex-row items-center gap-1 mt-1">
                    <Ionicons name='heart' size={14} color='#99999F'/>
                <Text className="text-[#99999F] font-LRegular text-[10px] numberOfLines={1}">
                    {item.subtitle}
                </Text>
                </View>
            </View>
        )}
      >

      </FlatList>
    </View>
  )
}

export default SectionList