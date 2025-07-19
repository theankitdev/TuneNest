import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import facebookIcon from '../assets/images/facebook-logo.png';
import googleIcon from '../assets/images/google-logo.png';
import applogo from '../assets/images/appLogo.png';
import { useAuth } from '../context/authContext';
import { useGoogleAuth } from '../context/googleContext'; // ✅ make sure this path is correct
import { useEffect } from 'react';

export default function App() {
  const { user, loading } = useAuth();
  const { promptAsync, request } = useGoogleAuth();

  useEffect(() => {
    if (user) {
      // ✅ Redirect if already logged in
      router.replace('/home');
    }
  }, [user]);

  return (
    <SafeAreaView className="flex bg-[#1B1A1C] pb-8">
      <StatusBar style="light" />

      <View className="h-full w-full p-8">
        {/* Logo and Title */}
        <View className="flex-1 items-center ">
          <Image source={applogo} className="w-full h-[200px] my-8" resizeMode="conver" />
          <Text className="text-[#FFFFFF] text-[18px] font-LRegular">
            Play your favourite songs and artists.
          </Text>
        </View>

        {/* Login Buttons */}
        <View className="justify-center items-center h-[200px]">
          <TouchableOpacity
            className="flex-row w-[320px] h-[46px] bg-[#4267B2] rounded-full justify-center items-center px-[20px] m-2"
            onPress={() => router.push('/signup')}
          >
            <Image source={facebookIcon} className="w-[24px] h-[24px]" resizeMode="contain" />
            <Text className="text-[#FFFFFF] text-[18px] text-center font-LRegular flex-1">
              Sign up with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row w-[320px] h-[46px] bg-white rounded-full justify-center items-center px-[20px] m-2"
            onPress={() => {
              if (request) promptAsync();
            }}
          >
            <Image source={googleIcon} className="w-[24px] h-[24px]" resizeMode="contain" />
            <Text className="text-[#303033] text-[18px] text-center font-LRegular flex-1">
              Sign up with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row w-[320px] h-[46px] rounded-full justify-center items-center pl-[12px] m-2 border border-white"
            onPress={() => router.push('/signup')}
          >
            <Text className="text-[#FFFFFF] text-[18px] text-center font-LRegular flex-1">
              Sign up with Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-[#707070] text-[16px] font-LRegular">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-white text-[18px] font-LBold">Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
