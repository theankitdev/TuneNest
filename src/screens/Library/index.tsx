import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const recentArtists = [
  {
    id: '1',
    name: 'Abhijeet',
    role: 'Artist',
    image: require('../../assets/newReleases.png'),
  },
  {
    id: '2',
    name: 'A.R.Rahman',
    role: 'Artist',
    image: require('../../assets/newReleases.png'),
  },
  {
    id: '3',
    name: 'Sunidhi chauhan',
    role: 'Artist',
    image: require('../../assets/newReleases.png'),
  },
];

const LibraryItem = ({ item , navigation }) => (
  <TouchableOpacity className="flex-row items-center bg-[#282C30] rounded-full h-[56px] mb-3 "
    onPress={() => navigation.navigate('ArtistScreen')}
  >
    <Image source={item.image} className="w-[54px] h-[54px] rounded-full mr-3" />
    <View>
      <Text className="text-white font-UMedium text-[14px] mb-1">{item.name}</Text>
      <Text className="text-[#7F8489] text-[12px] font-Umedium">{item.role}</Text>
    </View>
  </TouchableOpacity>
);

export default function YourLibraryScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-[#2F353A] px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-3">
        <View className='flex-row items-center gap-4'>
          <Ionicons name="person-circle-outline" size={40} color="white" />
          <Text className="text-white font-USemiBold text-[16px]">Your Library</Text>
        </View>
        <View className="flex-row gap-6">
          <View className='items-center bg-[#1C1F22] rounded-full h-[40px] w-[40px] justify-center'>
            <Ionicons name="search" size={20} color="white" />
          </View>
          <View className='items-center bg-[#1C1F22] rounded-full h-[40px] w-[40px] justify-center'>
            <Ionicons name="add" size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Tab */}
      <View className="mt-6">
        <TouchableOpacity className="bg-[#1C1F22] w-[89px] h-[38px] justify-center items-center rounded-full self-start">
          <Text className="text-white font-UMedium text-[16px]">Artists</Text>
        </TouchableOpacity>
      </View>

      {/* Recents */}
      <View className="flex-row justify-between items-center mt-6 mb-6">
        <View className="flex-row items-center">
          <Ionicons name="musical-notes-outline" size={24} color="white" />
          <Text className="text-white ml-2 font-UMedium text-[16px]">Recents</Text>
        </View>
        <Ionicons name="grid-outline" size={24} color="white" />
      </View>

      {/* Artist List */}
      <FlatList
        data={recentArtists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LibraryItem item={item} navigation={navigation} />}
        showsVerticalScrollIndicator={false}

        ListFooterComponent={() => (
          <View className="mb-4" >
            {/* Add Items */}
            <TouchableOpacity className="flex-row items-center bg-[#282C30] rounded-full h-[56px] ">
              <View className='h-[56px] w-[56px] justify-center items-center bg-[#1C1F22] rounded-full mr-3'>
              <Ionicons name="add" size={24} color="white"/>
              </View>
              <Text className="text-white font-UMedium text-[14px]">Add artist</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-[#282C30] rounded-full h-[56px] mt-3 ">
             <View className='h-[56px] w-[56px] justify-center items-center bg-[#1C1F22] rounded-full mr-3'>
              <Ionicons name="add" size={24} color="white"/>
              </View>
              <Text className="text-white font-UMedium text-[14px]">Add podcasts & shows</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>
  );
}
