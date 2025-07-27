import React, { useState } from 'react';
import { ScrollView, View, Text, Switch, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const bytesToGB = (bytes) => (bytes / (1024 ** 3)).toFixed(1);

const SettingsScreen = ({ navigation}) => {
  const [storage] = useState({
    total: 0,
    free: 0,
    cache: 0,
  });

  return (
    <ScrollView className="flex-1 bg-[#353A40] px-4 ">
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-14">
        {/* ✅ Touchable Back Button */}
        <TouchableOpacity
          className="h-[44px] w-[44px] bg-[#1C1F22] rounded-full items-center justify-center mr-3"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className='absolute left-0 right-4 top-0 bottom-0 flex items-center justify-center'>
          <Text className="text-white text-[16px] font-USemiBold ml-4 text-center">Settings</Text>
        </View>
      </View>

      {/* ✅ Touchable Profile Card */}
      <TouchableOpacity
        className="bg-[#3B4047] rounded-3xl h-[92px] flex-row p-6 items-center mb-8"
        onPress={() => navigation.navigate('ProfileScreen')} // 🔁 Adjust route name if needed
      >
        <View className="w-12 h-12 rounded-full bg-[#11A8FD] border-[#058DD9] justify-center items-center mr-3">
          <Text className="text-white font-UBold text-[22px]">S</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-USemiBold text-[18px]">Suchir</Text>
          <Text className="text-[#7F8489] text-[12px] font-UMedium">View Profile</Text>
        </View>
        <View className='w-[44px] h-[44px] bg-[#1C1F22] rounded-full items-center justify-center'>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </View>
      </TouchableOpacity>

      {/* Premium Button */}
      <View className="items-center mb-8">
        <View className="bg-[#0084FF] rounded-full h-[32px] w-[136px] items-center justify-center ">
          <Text className="text-white font-USemiBold text-[14px]">Go Premium</Text>
        </View>
      </View>

      <View className='bg-[#3B4047] rounded-3xl p-4 mb-4'>
        <Section title="Data Saver" />
        <SwitchItem label="Audio quality" subtext="Sets your audio quality to low (equivalent to 24kbit/s) and disables artist canvases." />

        <Section title="Video Podcasts" />
        <SwitchItem label="Download audio only" subtext="Save video podcasts as audio only." />
        <SwitchItem label="Stream audio only" subtext="Play video podcasts as audio only when not on WiFi." />
        <View className="flex-row pl-2">
          <Ionicons name="information-circle-outline" size={22} color="#7F8489" />
          <Text className="text-[#7F8489] text-[11px] font-UMedium mb-4 pl-2">
           Note: Video is not streamed when the spotify app is backgrounded.</Text>
        </View>

        <Section title="Playback" />
        <SliderItem label="Crossfade" value={1.5} min={0} max={12} />
        <SwitchItem label="Gapless" subtext="Allows gapless playback" enabled />
        <SwitchItem label="Automix" subtext="Allow seamless transitions between songs on select playlists." enabled />
        <SwitchItem label="Allow explicit content" subtext="Turn on to play explicit content. Explicit content is labeled with e tag" enabled />
        <SwitchItem label="Show unplayable songs" subtext="Show songs that are unplayable." />
        <SwitchItem label="Normalize volume" subtext="Set the same volume level for all tracks" enabled />
        <SwitchItem label="Mono audio" subtext="Makes the left and right speakers play the same audio." />
        <SwitchItem label="Device broadcast status" subtext="Allow other apps on your device to see what you are listening to." />
        <SwitchItem label="Autoplay" subtext="Enjoy nonstop listening. When your audio ends, we’ll play you something similar." enabled />
        <SwitchItem label="Canvas" subtext="Display short, looping visuals on tracks." enabled />

        <Section title="Languages" />
        <View className='mb-6 pl-2'>
        <Text className='text-white font-USemiBold text-[14px] mb-2'>Language for music</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px] ">Choose your preferred languages for music.</Text>
    </View>
        <Section title="Devices" />
        <SwitchItem label="Show local devices only" subtext="Only show devices on your local wifi or ethernet in the devices menu." />
        <SwitchItem label="Spotify connect in background" subtext="Allow spotify connect to keep spotify running when the app is in background" enabled />

        <Section title="Storage" />
        <View className="bg-[#282C30] rounded-3xl p-5 space-y-5 mb-6">

          {/* Cache */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="trash-bin-outline" size={16} color="#D1D4D7" />
              <Text className="text-[#D1D4D7] text-[13px] font-UMedium">  Cache</Text>
            </View>
            <Text className="text-[#D1D4D7] text-[13px] font-UMedium">
              {bytesToGB(storage.cache)} GB
            </Text>
          </View>

          {/* Free */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="folder-open-outline" size={16} color="#D1D4D7" />
              <Text className="text-[#D1D4D7] text-[13px] font-UMedium">  Free</Text>
            </View>
            <Text className="text-[#D1D4D7] text-[13px] font-UMedium">
              {bytesToGB(storage.free)} GB
            </Text>
          </View>
          {/* Total */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="pie-chart-outline" size={16} color="#D1D4D7" />
              <Text className="text-[#D1D4D7] text-[13px] font-UMedium">  Total</Text>
            </View>
            <Text className="text-[#D1D4D7] text-[13px] font-UMedium">
              {bytesToGB(storage.total)} GB
            </Text>
          </View>

        </View>
        <SwitchItem label="Remove all downloads" subtext="Remove all of the spotify content you have downloaded for offline use." />
        <SwitchItem label="Clear cache" subtext="You can free up storage by clearing your cache. Your downloads won’t be removed." />

        <Section title="Notifications" />
        <SwitchItem label="Notifications" subtext="Choose which notification to receive." />

        <Section title="Advertisements" />
        <View className='mb-8 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1"> Spotify Ad Partner Preferences</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px] leading-5 pl-1">
          Control how ads are targeted to me based on information gathered from advertising partners.
          </Text>
        </View>

        <Section title="About" />
        <View className='mb-4 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Version: </Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">8.8.32.508</Text>
        </View>
        <View className='mb-4 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Third-party software</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">Sweet software that helped us</Text>
        </View>
        <View className='mb-4 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Terms and conditions</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">All the stuff you need to know</Text>
        </View>
        <View className='mb-4 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Privacy policy</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">Important for both of us</Text>
        </View>
        <View className='mb-4 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Platform rules</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">Help keep TuneNest safe for all</Text>
        </View>
        <View className='mb-8 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Support</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">Get help from us and the community</Text>
        </View>

        <Section title="Other" />
        <View className='mb-8 pl-2'>
        <Text className="text-white font-UMedium text-[14px] mb-1">Log Out</Text>
        <Text className="text-[#7F8489] font-UMedium text-[11px]">You are logged in as suchir</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Section = ({ title }) => (
  <View className='h-[42px] justify-center items-center bg-[#282C30] rounded-3xl mb-5'>
    <Text className="text-white text-[16px] font-USemiBold">{title}</Text>
  </View>
);

const SwitchItem = ({ label, subtext, enabled = false }) => (
  <View className="flex-row justify-between items-center mb-8 px-2 ">
    <View className="flex-1 mr-3">
      <Text className="text-white text-[14px] font-UMedium">{label}</Text>
      {subtext && (
        <Text className="text-[#7F8489] text-[11px] mt-2 font-UMedium leading-5">{subtext}</Text>
      )}
    </View>

    <View
      className={`rounded-full h-[26px] w-[48px] justify-center border ${enabled ? 'bg-[#11A8FD]' : 'bg-[#1C1F22]'} ${enabled ? 'border-[#016BB8]' : 'border-[#1C1F22]'}
      `}
    >
      <Switch
        value={enabled}
        thumbColor="white"
        trackColor={{ false: 'transparent', true: 'transparent' }}
      />
    </View>
  </View>
);


const SliderItem = ({ label, value, min, max }) => (
  <View className="px-2">
    <View className='flex-row justify-between items-center mb-2 '>
      <View className="mb-4">
        <Text className="text-white text-[14px] font-UMedium ">{label}</Text>
        <Text className="text-[#7F8489] text-[11px] mt-2 font-UMedium">Allows you to crossfade between songs</Text>
      </View>
      <View className='flex-row items-end'>
        <Text className='text-white font-UBold text-[18px]'>1.5</Text>
        <Text className='text-white font-UMedium text-[10px] '>s</Text>
      </View>
    </View>
    <View className="flex-row justify-center mb-4 bg-[#282C30] rounded-3xl p-4">
      <View className='flex-row items-end'>
        <Text className="text-[#7F8489] text-[12px] font-USemiBold">0</Text>
        <Text className='text-[#7F8489] font-UMedium text-[10px] '>s</Text>
      </View>
      <Slider
        minimumValue={min}
        maximumValue={max}
        value={value}
        minimumTrackTintColor="#00BFFF"
        maximumTrackTintColor="#555"
        thumbTintColor="#00BFFF"
        style={{ flex: 1 }}
      />
      <View className='flex-row items-end'>
        <Text className="text-[#7F8489] text-[12px] font-USemiBold">{value.toFixed(1)}</Text>
        <Text className='text-[#7F8489] font-UMedium text-[10px] '>s</Text>
      </View>
    </View>
  </View>
);

export default SettingsScreen;
