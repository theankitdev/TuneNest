import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable, Image, StatusBar } from 'react-native'
import React, { useState } from 'react'
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn'
import { onFacebookButtonPress } from '../../config/firebase/FacebookSignIn'
import googleIcon from '../../assets/icons/googleIcon.png'

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(false);

  // New focus states for inputs
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  async function googleSignIn() {
    _signInWithGoogle().then(data => {
      if (!data) {
        console.log('=> Error:', ' No Data')
        return
      }
      console.log('=> Success', data)
    })
  }

  return (
    <ScrollView className="flex-1 bg-[#353A40] py-4">

      <View className="flex-1 px-6 pt-16">
        <Text className="text-[30px] font-UExtraBold text-[#7952FC] mb-2">
          Sign in to{'\n'}your account
        </Text>
        <Text className="mb-10 text-gray-500 font-UExtraBold text-[14px]">
          Don't have an account? <Text className="text-[#7952FC] font-UExtraBold" onPress={() => navigation.replace('SignUp')}>Sign Up</Text>
        </Text>
        
        {/* Email input */}
        <View
          className={`flex-row items-center rounded-lg mb-4 px-3 h-[48px] bg-[#fafdff]`}
          style={{
            borderWidth: 2,
            borderColor: isEmailFocused ? '#7952FC' : '#e0dffb'
          }}
        >
          <Ionicons name="mail" size={20} color="#7952FC" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1 text-[14px] font-URegular text-[#18104C]"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
          />
        </View>

        {/* Password input */}
        <View
          className="flex-row items-center rounded-lg mb-2 px-3 h-[48px] bg-[#fafdff]"
          style={{
            borderWidth: 2,
            borderColor: isPasswordFocused ? '#7952FC' : '#e0dffb'
          }}
        >
          <Ionicons name="lock-closed" size={20} color="#7952FC" style={{ marginRight: 8 }} />
          <TextInput
            className="flex-1 text-[14px] font-URegular text-[#18104C]"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Ionicons name={secure ? 'eye-off' : 'eye'} size={20} color="gray" />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center ">
          <CheckBox
            value={remember}
            onValueChange={setRemember}
            tintColors={{ true: '#8c65f7', false: '#E0E0E6' }}
          />
          <Text className="ml-1 text-gray-500 text-[14px] font-URegular">Remember me</Text>
        </View>

        <TouchableOpacity className='items-center '
        onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-[#7952FC] font-UBold text-[16px]">Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity className="bg-[#7952FC] rounded-xl items-center py-4 mb-4">
          <Text className="text-white font-UMedium text-[14px]">Sign In</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between my-8">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-400 font-URegular">or sign in with</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <View className="my-4">
          <TouchableOpacity 
            className="flex-row items-center justify-center border border-[#e0dffb] rounded-lg h-[48px] px-4 mb-2"
            onPress={() => googleSignIn()}
          >
            <Image source={googleIcon} style={{ width: 20, height: 24 }} />
            <Text className="ml-4 text-white font-UMedium text-[14px]">Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-center border border-[#e0dffb] rounded-lg h-[48px] px-4 mb-2"
            onPress={() => onFacebookButtonPress()}
          >
            <Ionicons name="logo-facebook" size={24} color="#1877F3" />
            <Text className="ml-4 text-white font-UMedium text-[14px]">Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-center border border-[#e0dffb] rounded-lg h-[48px] px-4">
            <Ionicons name="logo-apple" size={24} color="black" />
            <Text className="ml-4 text-white font-UMedium text-[14px]">Sign in with Apple</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
}

export default SignInScreen;
