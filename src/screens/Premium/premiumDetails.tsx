import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import  LinearGradient from 'react-native-linear-gradient';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import  Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const PremiumIcon = ({ color, size = 16 }) => (
   <Svg width={size} height={size} viewBox="7.5 4.5 14 13" fill="none">
    {/* Triangle */}
    <Path
      d="M12 4L16 12H8L12 4Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Partial Circle (bottom-right arc) */}
    <Path
      d="M16.5 9.5A4 4 0 1 1 12.5 13.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default function PremiumDetails({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-[#353A40] px-5" contentContainerStyle={{ paddingBottom: 120 }}>
    <SafeAreaView >
      <View className="mt-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-[16px] font-USemiBold">Review Your Plan</Text>
          <TouchableOpacity className="bg-[#1C1F22] px-4 py-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-UMedium text-[12px]">Change Plan</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center bg-[#3B4047] mt-8 px-4 rounded-3xl shadow-lg shadow-black">
          <View className="bg-[#282C30] px-6 py-3 rounded-b-3xl items-center">
            <Text className="text-white font-USemiBold text-[16px]">Premium Mini</Text>
            <Text className="text-[#7F8489] text-[12px] mt-1 font-UMedium">1 Premium Account</Text>
          </View>

          <View className="mt-5 items-center">
            <Text className="text-[#7F8489] font-USemiBold text-[18px]">Starting Today</Text>
            <Text className="text-white mt-1 font-USemiBold text-[14px] mt-3">One Time Payment Of 25.00</Text>
            <Text className="text-[#7F8489] text-[12px] font-UMedium">INR for 7 days</Text>

            <TouchableOpacity className="mt-2">
              <Text className="text-[12px] font-UMedium underline text-white mb-6">Offer terms apply.</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-white font-USemiBold text-[16px]">Choose how to pay</Text>
          <Text className="text-[#7F8489] text-[12px] font-UMedium mt-2 mb-5">
            You can pay for your premium plan directly through music or using your google play account.
          </Text>

          <View className="flex-row justify-between mt-4 gap-3">
            <TouchableOpacity className="bg-[#1F2630] w-1/2 py-2 rounded-full flex-row items-center justify-center gap-3">
                <View className='bg-white p-2 rounded-full'>
                    <PremiumIcon color="black" size={14} />
                </View>
              <Text className="text-white text-[16px] font-UMedium">Music</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-[#1F2630] w-1/2 rounded-full py-2 flex-row items-center justify-center gap-3">
              <Entypo name="google-play" size={26} color="#fff" />
              <Text className="text-white font-UMedium text-[16px]">Google Play</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-[#3B4047] mt-8 p-6 rounded-3xl items-center">
            <Text className="text-white text-[12px] font-UMedium text-center mb-2 leading-6">
              Pay for premium through your google play account and earn play points.
            </Text>

            <View className="flex-row gap-2 my-3 mb-6">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <View key={i} className="w-[42px] h-[42px] rounded-full bg-[#202326]" />
              ))}
            </View>

              <TouchableOpacity className="py-3 bg-[#058DD9] rounded-full w-full ">
                <Text className="text-white text-center font-UMedium text-[16px]">
                  Continue With Google Play
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mt-6">
        <Text className="text-[#7F8489] text-[12px] font-UMedium text-center leading-5">
          You’ll go to google play to finish purchasing your premium plan. The music offer terms and privacy policy apply. Google play may also require you to agree to additional terms. Questions about your purchase should be directed to google play.
        </Text>

        <View className="flex-row justify-between items-center mt-4 px-2">
          <Text className="text-white font-UMedium text-[12px]">India</Text>
          <TouchableOpacity>
            <Text className="text-white text-[12px] font-UMedium underline">Change Country</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
}
