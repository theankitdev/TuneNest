import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, usePathname } from 'expo-router';

const Options = ({ options }) => {
  const pathname = usePathname();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 18, paddingBottom: 10 }}
    >
      {options.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <Pressable
            key={index}
            className="justify-center items-center"
            onPress={() => item.path && router.replace({ pathname: item.path, params: item.params })}
          >
            <View className="relative items-center">
              <Text className={`text-[14px] font-LBold mb-2 ${isActive ? 'text-white' : 'text-[#99999F]'}`}>
                {item.label}
              </Text>
              {isActive && (
                <View className="absolute -bottom-1 h-[3px] w-1/2 bg-[#4169E1] rounded-full" />
              )}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default Options;
