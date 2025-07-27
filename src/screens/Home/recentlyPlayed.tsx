import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Album from '../../assets/Album.png';

const recentlyPlayedData = [
  {
    date: 'Yesterday',
    data: [
      {
        title: 'Six60',
        subtitle: 'Artist',
        image: Album,
      },
      {
        title: 'Someone to be around - Bonus',
        subtitle: 'Song | Six60',
        image: Album,
      },
    ],
  },
  {
    date: 'Sun, May 14, 2023',
    data: [
      {
        title: 'Miss You',
        subtitle: 'E Song | Oliver Tree',
        image: Album,
      },
      {
        title: "Don't remind me...",
        subtitle: 'Playlist | PlaylistMix',
        image: Album,
      },
      {
        title: 'Mega Hit Mix',
        subtitle: 'Playlist | Spotify',
        image: Album,
      },
      {
        title: 'One Kiss (With Dua Lipa)',
        subtitle: 'Song | Calvin Harris',
        image: Album,
      },
    ],
  },
];

const RecentlyPlayed = () => {
  const renderCard = ({ item }) => (
    <View className="flex-row bg-[#24282E] rounded-3xl h-[82px] p-5 mb-3 items-center justify-between">
      <View className="flex-row items-center">
        <Image
          source={item.image}
          className="w-[52px] h-[52px] rounded-xl mr-4"
          resizeMode="cover"
        />
        <View>
          <Text className="text-white font-UMedium text-[14px] mb-1">{item.title}</Text>
          <Text className="text-[#7F8489] font-UMedium text-[12px]">{item.subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={18} color="#7F8489" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-[#353A40] p-4 ">
      <View className="flex-row items-center mb-6 mt-10">
              <TouchableOpacity
                className="h-[44px] w-[44px] bg-[#1C1F22] rounded-full items-center justify-center mr-3"
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <View className='absolute left-0 right-4 top-0 bottom-0 flex items-center justify-center'>
                <Text className="text-white text-[16px] font-USemiBold ml-4 text-center">Recently Played</Text>
              </View>
            </View>

      <FlatList
        data={recentlyPlayedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="mb-6">
            <Text className="text-gray-400 text-sm font-UMedium mb-3">{item.date}</Text>
            {item.data.map((musicItem, idx) => (
              <View key={idx}>{renderCard({ item: musicItem })}</View>
            ))}
          </View>
        )}
      />
    </ScrollView>
  );
};

export default RecentlyPlayed;
