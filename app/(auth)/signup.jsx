import { View, Text, TextInput, TouchableOpacity, Platform, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]);


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // "YYYY-MM-DD"
      setDob(formattedDate);
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (!email || !createPassword || !dob || !gender) {
      alert('Please fill all the fields');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.39:5000/api/v1/user/register', {
        firstName,
        lastName,
        email,
        password: createPassword,
        dob,
        gender
      });
      console.log('Registration Success:', response.data);
      alert('Registration Successful!');
      router.replace('/login');
    } catch (error) {
      console.error('Registration Failed:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#FF0000', '#000000']} style={{ flex: 1, justifyContent: 'center', alignContent: 'center', padding: 8 }} locations={[0, 0.75]}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style="light" />

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000AA' }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-4 font-LRegular text-base">Registering...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View className="flex-1 justify-center items-center">
              <Text className="text-white font-LBold text-center" style={{ fontSize: 26 }}>Create Account</Text>
            </View>

            <View className="flex-1 space-x-4 px-4">
              {/* First Name */}
              <View className="mb-4 justify-center">
                <Text className="text-white text-[16px] font-LRegular mb-2">Your first name</Text>
                <TextInput
                  className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${firstNameFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  value={firstName}
                  onChangeText={setFirstName}
                />
                {firstName.length > 0 && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color="#000"
                    style={{ position: 'absolute', right: 10, top: 35 }}
                  />
                )}
              </View>

              {/* Last Name */}
              <View className="mb-4 justify-center">
                <Text className="text-white text-[16px] font-LRegular mb-2">Your last name</Text>
                <TextInput
                  className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${lastNameFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
                  onFocus={() => setLastNameFocused(true)}
                  onBlur={() => setLastNameFocused(false)}
                  value={lastName}
                  onChangeText={setLastName}
                />
                {lastName.length > 0 && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color="#000"
                    style={{ position: 'absolute', right: 10, top: 35 }}
                  />
                )}
              </View>

              {/* Email */}
              <View className="mb-4 justify-center">
                <Text className="text-white text-[16px] font-LRegular mb-2">Your email</Text>
                <TextInput
                  className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${emailFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
                {email.length > 0 && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color="#000"
                    style={{ position: 'absolute', right: 10, top: 35 }}
                  />
                )}
              </View>

              {/* Password */}
              <View className="mb-4 justify-center">
                <Text className="text-white text-[16px] font-LRegular mb-2">Create a password</Text>
                <TextInput
                  className={`w-full h-[46px] rounded-lg px-4 py-2 font-LRegular text-[14px] bg-[#ffffff] ${passwordFocused ? 'opacity-[0.7]' : 'opacity-[0.4]'}`}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  value={createPassword}
                  onChangeText={setCreatePassword}
                  secureTextEntry
                />
                {createPassword.length > 0 && (
                  <Ionicons
                    name="checkmark"
                    size={24}
                    color="#000"
                    style={{ position: 'absolute', right: 10, top: 35 }}
                  />
                )}
              </View>

              {/* DOB + Gender */}
              <View className="flex-row justify-between">
                {/* DOB */}
                <View className="w-[45%] mr-2 justify-center">
                  <Text className="mb-2 text-[16px] font-LRegular text-white">Date of Birth</Text>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    className="rounded-lg border border-white px-4 justify-center h-[46px]"
                  >
                    <Text style={{ font: 'LRegular', fontSize: 16, color: 'white' }}>{dob}</Text>
                    <Ionicons name="chevron-down-outline" size={24} color="white" style={{ position: 'absolute', right: 10, top: 10, opacity: 0.8 }} />
                  </Pressable>

                  {showDatePicker && (
                    <DateTimePicker
                      value={new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      maximumDate={new Date()}
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                {/* Gender */}
                <View className="w-[45%] ml-2">
                  <Text className="text-white font-LRegular text-[16px] mb-2">Gender</Text>
                  <DropDownPicker
                    open={open}
                    value={gender}
                    items={genderItems}
                    setOpen={setOpen}
                    setValue={setGender}
                    setItems={setGenderItems}
                    placeholder=" "
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}
                    textStyle={{
                      fontSize: 16,
                      fontFamily: 'Lato-Regular',
                      color: 'white',
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: '#1B1A1C',
                      borderColor: '#ccc',
                    }}
                    showArrowIcon={false}
                    listMode="SCROLLVIEW"
                    scrollEnabled={false}
                  />
                  <Ionicons name="chevron-down-outline" size={24} color="white" style={{ position: 'absolute', right: 10, bottom: 12, opacity: 0.8 }} />
                </View>

              </View>

              {/* Done Button */}
              <View className="flex-1 items-center mt-10">
                <TouchableOpacity
                  className="w-[171px] h-[46px] border border-white rounded-full justify-center items-center mt-4"
                  onPress={handleSignUp}
                >
                  <Text className="text-white font-LBold text-[18px]">DONE</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View className="flex-1 items-center justify-center mt-8">
                <Text className="text-[#707070] font-LRegular text-[14px] mb-2">By clicking on "Sign up", you accept the</Text>
                <Pressable>
                  <Text className="text-white font-LRegular text-[14px] underline">Terms and Conditions of Use.</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SignUp;
