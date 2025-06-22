import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
      setDob(formattedDate);
    }
  };

  return (
    <LinearGradient colors={['#FF0000', '#000000']} style={{ flex: 1,justifyContent: 'center',alignContent: 'center' , padding: 8 }}
      locations={[0, 0.75]}
    >

      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
       
        <StatusBar style="light" />
        
        <ScrollView contentContainerStyle={{ flexGrow:1, paddingBottom:40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-white font-LBold text-center" style={{ fontSize: 26 }}>Create Account</Text>
        </View>

        // Email Input
        <View className="flex-1 space-x-4 px-4">
          <View className="mb-4 justify-center">
            <Text className="text-white text-[16px] font-LRegular mb-2">Your email</Text>
            <TextInput
              className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${emailFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              value={email}
              onChangeText={setEmail}
              icon="email"
            />
            <Ionicons
              name="checkmark"
              size={24}
              color={emailFocused ? '#000' : 'transparent'}
              style={{ position: 'absolute', right: 10, top: 35 }}
            />
          </View>

        // Password Input
          <View className="mb-4 justify-center">
            <Text className="text-white text-[16px] font-LRegular mb-2">Create a password</Text>
            <TextInput
              className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${passwordFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              value={createPassword}
              onChangeText={setCreatePassword}
            />
            <Ionicons
              name="checkmark"
              size={24}
              color={passwordFocused ? '#000' : 'transparent'}
              style={{ position: 'absolute', right: 10,top: 35 }}
            />
          </View>

           // Date of Birth Input && Gender Selection
          <View className='flex-row justify-between'>

            // Date of Birth Input
            <View className="w-[45%] mr-2 justify-center">
              <Text className='mb-2 text-[16px] font-LRegular text-white'>Date of Birth</Text>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className='rounded-lg border border-white px-4 justify-center h-[46px]'
              >
                <Text
                  style={{
                    font: 'LRegular',
                    fontSize: 16,
                    color: 'white',
                  }}
                >
                  {dob}
                </Text>
              </Pressable>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode='date'
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  maximumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}

              <Ionicons
                name='chevron-down-outline'
                size={24}
                color='white'
                style={{ position: 'absolute', right: 10, top: 35, opacity: 0.8 }}
              />
            </View>

             // Gender Selection
            <View className="w-[45%] ml-2">
              <Text className="text-white font-LRegular text-[16px] mb-2">Gender</Text>
              <View className='rounded-lg border border-white h-[46px] justify-center'>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={{
                    height: 46,
                    fontSize: 16,
                    paddingVertical: 0,
                    marginVertical: -8,
                    color: 'white',
                    fontFamily: 'LRegular',
                    backgroundColor: 'transparent',
                  }}
                  itemStyle={{ height: 30 }}
                  dropdownIconColor='transparent'
                  dropdownIconRippleColor={'transparent'}
                >
                  <Picker.Item label='' value='' />
                  <Picker.Item label='Male' value='Male' />
                  <Picker.Item label='Female' value='Female' />
                  <Picker.Item label='Other' value='Other' />
                </Picker>

                <Ionicons
                  name='chevron-down-outline'
                  size={24}
                  color='white'
                  style={{ position: 'absolute', right: 10, opacity: 0.8 }}
                  pointerEvents='none'
                />
              </View>
            </View>
          </View>

          // Done Button
          <View className="flex-1 items-center mt-10">
          <TouchableOpacity
            className="w-[171px] h-[46px] border border-white rounded-full justify-center items-center mt-4"
            onPress={() => console.log('Sign Up Pressed')}>
              <Text className="text-white font-LBold text-[18px]">DONE</Text>
          </TouchableOpacity>
          </View>

          //Footer
          <View className="flex-1  items-center justify-center mt-8">
            <Text className="text-[#707070] font-LRegular text-[14px] mb-2">By clicking on "Sign up", you accept the</Text>
            <Pressable>
              <Text className="text-white font-LRegular text-[14px] underline">Terms and Conditions of Use.</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default SignUp