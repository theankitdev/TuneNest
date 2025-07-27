import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (!/^[0-9]?$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 bg-[#353A40] py-8 ">

      {/* Back button */}
      <Pressable className="px-4 py-8" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <View className="flex-1 px-6 items-center">
        
        {/* Purple icon container */}
        <View className="bg-[#7952FC] w-[52px] h-[52px] rounded-2xl items-center justify-center mb-6">
          <Ionicons name="shield-checkmark" size={32} color="#fff" />
        </View>

        {/* Headings */}
        <Text className="text-[24px] font-UExtraBold text-center text-white ">OTP</Text>
        <Text className="text-[24px] font-UExtraBold text-center text-white">Verification</Text>
        <Text className='text-[14px] font-URegular mt-2 text-[#aaa]'>We need to verify your email</Text>
        <Text className="text-[14px] text-[#aaa] text-center mt-10 font-URegular">
          To verify your account, enter the 4 digit OTP code that we sent to your email.
        </Text>

        {/* OTP Inputs */}
        <View className="flex-row justify-between gap-4 my-10 ">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              value={digit}
              keyboardType="number-pad"
              maxLength={1}
              className="w-12 h-12 rounded-lg border border-gray-300 text-center text-xl font-semibold text-[#18104C] bg-white"
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                nativeEvent.key === 'Backspace' && handleBackspace(index)
              }
            />
          ))}
        </View>

        {/* Verify button */}
        <TouchableOpacity className="w-full h-[52px] rounded-xl bg-[#7952FC] items-center justify-center mb-4"
          onPress={() => navigation.replace('VerificationSuccess')}
        >
          <Text className="text-white font-UMedium text-[14px]">Verify</Text>
        </TouchableOpacity>

        {/* Resend button */}
        <TouchableOpacity className="w-full h-[52px] rounded-xl border border-[#7952FC] items-center justify-center">
          <Text className="text-[#7952FC] font-UMedium text-[14px]">Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpScreen;
