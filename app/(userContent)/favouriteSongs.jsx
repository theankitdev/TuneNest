import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SongList from '../../components/songList';
import { songs } from '../../components/Data';

const FavouriteSongs = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <SafeAreaView className="flex-1 bg-[#161A1A]">
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 80 }}>
        {/* Edit & Shuffle */}
        <View className="flex-row items-center justify-between px-10 mt-6">
          <TouchableOpacity>
            <Text className="text-white font-LRegular text-[14px] px-10">EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="shuffle" color="white" size={24} />
            <Text className="text-white font-LRegular text-[14px] pl-2">SHUFFLE PLAY</Text>
          </TouchableOpacity>
        </View>

        {/* Download toggle */}
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-[16px] font-LRegular text-[#CECECE]">DOWNLOAD</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#2DCEEF' }}
            thumbColor={isEnabled ? '#ffffff' : '#CECECE'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Song count and list */}
        <View className="mt-8">
          <Text className="text-white text-right mb-8 font-LRegular text-[16px]">
            112 songs, 14 hr 12 min
          </Text>
          <SongList songs={songs} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavouriteSongs;
