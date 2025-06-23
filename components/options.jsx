// components/Options.jsx
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

const Options = ({ options }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 18, paddingBottom: 10 }}
    >
      {options.map((item, index) => (
        <Pressable
          key={index}
          className="justify-center items-center"
          onPress={() => item.path && router.replace({ pathname: item.path, params: item.params })}
        >
          <Text className="text-white text-[14px] font-LBold">{item.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Options;
