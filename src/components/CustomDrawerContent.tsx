import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomDrawerContent({ navigation }) {
  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View className="items-center">

        {/* Profile Section with Shadow */}
        <View className="flex-row items-center pl-6 mb-6 w-[256px] h-[92px] bg-[#282C30] rounded-3xl shadow-md shadow-black/50 elevation-5">
          <View className="w-[52px] h-[52px] rounded-full bg-[#4A90E2] justify-center items-center">
            <Text className="text-white font-UBold text-[22px]">S</Text>
          </View>
          <View className="ml-3">
            <Text className="text-white text-[18px] font-UBold">Suchir</Text>
            <Text className="text-gray-400 text-[12px] font-UMedium">
              <Text className="text-white">0 </Text>
              Followers |
              <Text className="text-white"> 84 </Text>
              Following
            </Text>
          </View>
        </View>

        {/* Drawer Menu Items with Shadow */}
        {[
          { icon: 'heart-outline', label: 'Profile', route: 'Profile' },
          { icon: 'time-outline', label: 'Recently played', route: 'RecentlyPlayed' },
          { icon: 'settings-outline', label: 'Settings and privacy', route: 'Settings' },
        ].map((item, index) => (
          <View key={index} className="flex-row py-4 items-center">
            <View className="w-[44px] h-[44px] bg-[#282C30] rounded-full items-center justify-center mr-3 shadow-sm shadow-black/30 elevation-3">
              <Ionicons name={item.icon} size={20} color="#fff" />
            </View>
            <TouchableOpacity
              className="bg-[#282C30] justify-center pl-4 rounded-3xl w-[200px] h-[44px] shadow-sm shadow-black/30 elevation-3"
              onPress={() => navigation.navigate(item.route)}
            >
              <Text className="text-white font-UMedium text-[14px]">{item.label}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Notifications Section with Shadow */}
        <View className="bg-[#2D2F33] w-[256px] h-[222px] rounded-3xl mt-10 pt-8 items-center px-8 shadow-lg shadow-black/40 elevation-6">
          <Text className="text-white text-[18px] font-USemiBold mb-6">Notifications</Text>
          <Text className="text-white text-[12px] font-UMedium mb-3">
            You don’t have any updates, yet...
          </Text>
          <Text className="text-[#7F8489] text-[12px] font-UMedium mb-6 text-center">
            When you get playlist likes, followers, and more, you’ll get a notification here.
          </Text>
          <TouchableOpacity className="bg-[#058DD9] rounded-full w-[136px] h-[32px] items-center justify-center shadow shadow-black/20 elevation-3">
            <Text className="text-white font-USemiBold text-[14px]">Create a Blend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
