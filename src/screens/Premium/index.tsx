import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const images = [
  require("../../assets/premium1.png"),
  require("../../assets/premium2.png"),
  require("../../assets/premium3.png"),
  require("../../assets/premium4.png"),
  require("../../assets/premium5.png"),
  require("../../assets/premium6.png"),
  require("../../assets/premium7.png"),
];

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

export default function PremiumScreen({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-[#353A40] px-4 pt-6 pb-8 " contentContainerStyle={{ paddingBottom: 120 }}>
      <SafeAreaView>
      {/* Premium Label */}
      <View className="flex-row items-center gap-4 mb-8">
        <View className="bg-white rounded-full p-2">
        <PremiumIcon color="black" />
        </View>
        <Text className="text-white text-[16px] font-USemiBold">Premium</Text>
      </View>

      {/* Offer Card */}
      <LinearGradient
            colors={["#202326", "#007AFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: 2 }}
            style={{ borderRadius: 30, flexDirection: "row",height: 194, justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20 }}
            >
        {/* Offer Header */}
        <View className="overflow-hidden ">
          <Text className="text-xs text-white font-UMedium text-[14px] pt-4">OFFER ENDS SOON</Text>
          <Text className="text-white font-USemiBold text-[16px] leading-6 mt-3 ">
            Ends Soon: 3{'\n'}Months Of Premium{'\n'}For $0.00
          </Text>

          <Image
            source={images[4]}
            className="w-[52px] h-[52px] rounded-xl absolute bottom-3 right-0"
            resizeMode="cover"
          />
          <Image
            source={images[5]}
            className="w-[52px] h-[52px] rounded-xl absolute -bottom-6 left-5"
            resizeMode="cover"
          />
        </View>

        {/* Grid of Album Covers */}
        <View className="flex-row gap-6 overflow-hidden">
          <View className="top-4 gap-6 w-[52px]">
            <Image
              source={images[0]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={images[3]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={images[4]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
          </View>

           <View className=" gap-6 w-[52px]">
            <Image
              source={images[1]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={images[2]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={images[5]}
              className="w-[52px] h-[52px] rounded-xl"
              resizeMode="cover"
            />
          </View>
        </View>
      </LinearGradient>

      {/* CTA Button */}
      <View className="flex-1 items-center justify-center my-8">
        <TouchableOpacity className="py-3 px-4 bg-[#11A8FD] border border-[#016BB8] rounded-full items-center justify-center">
            <Text className="text-center text-white font-USemiBold text-[14px]">
              Get 3 Months Free
            </Text>
        </TouchableOpacity>
      </View>

      {/* Terms */}
      <Text className="text-[12px] text-[#7F8489] font-UMedium text-center mb-8">
        Individual plan only. $11/month after. Terms and conditions apply.
         Open only to users who haven't already tried premium offer ends 8/5/23.
      </Text>

      {/* Why Join */}
      <View className="bg-[#3B4047] rounded-3xl px-5 pt-5 pb-2 mb-6">
        <Text className="text-white font-USemiBold text-[16px] mb-6">Why Join Premium?</Text>
        {[
          "Download to listen offline without wifi",
          "Music without ad interruptions",
          "2x higher sound quality than free plan",
          "Cancel monthly plans online anytime",
        ].map((benefit, idx) => (
          <View key={idx} className="flex-row items-start bg-[#282C30] rounded-full gap-2 mb-4 p-3">
            <Ionicons name="checkmark-circle-outline" size={18} color="#1dd05d" />
            <Text className="text-white font-UMedium text-[12px]">{benefit}</Text>
          </View>
        ))}
      </View>

      {/* Current Plan */}
      <View className="flex-row justify-between items-center bg-[#202326] p-5 rounded-full mb-6">
        <Text className="text-white font-USemiBold text-[16px]">Music Free</Text>
        <Text className="text-sm text-[#7E8388] font-UMedium text-[14px]">Current Plan</Text>
      </View>

      {/* Mini Plan */}
      <TouchableOpacity className="flex-1 items-center bg-[#3B4047] rounded-3xl px-4"
        onPress={() => navigation.navigate("PremiumDetails")}
      >
        <View className="justify-center items-center bg-[#202326] mb-2 rounded-b-3xl py-3 px-6">
        <Text className="text-white text-[18px] font-USemiBold">Mini</Text>
        </View>
        <Text className="text-[#7F8489] text-[12px] font-UMedium mb-4 text-center">
          1 day and 1 week plans | Ad-free music on mobile | Download 30 songs | Ad-free music | Mobile only plan
        </Text>
        <View className="flex-row justify-between items-center bg-[#282C30] p-5 rounded-3xl mb-4 w-full">
          <View>
          <Text className="text-white font-USemiBold text-[20px] ">From $7</Text>
          <Text className="text-[#7E8388] font-UMedium text-[16px]">For 1 Day</Text>
          </View>
          <TouchableOpacity className="bg-[#11A8FD] border border-[#016BB8] rounded-full px-4 py-2">
            <Text className="text-white text-[14px] font-USemiBold ">View Plans</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-[12px] font-UMedium text-[#7E8388] text-center pb-6">
          Prices vary according to duration of plan.
          <Text className="text-white"> Terms and conditions </Text>apply.
        </Text>
      </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 30,
  },
});
