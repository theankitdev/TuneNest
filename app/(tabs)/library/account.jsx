import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Pressable, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import RazorpayCheckout from 'react-native-razorpay'
import { router } from 'expo-router';

const AccountScreen = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
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

  // const handlePayment = () => {
  //   const options = {
  //     description: 'Purchase Description',
  //     image: 'https://i.pravatar.cc/150?img=3', 
  //     currency: 'INR',
  //     key: 'rzp_test_4Wlysk0uPT8zwa',
  //     amount: 99, 
  //     name: 'TuneNest',
  //     prefill: {
  //       email: '',
  //       contact: '',
  //       name: 'John Doe',
  //     },
  //     theme: { color: '#2DCEEF' },
  //   };

  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
  //       console.log(`Payment successful: ${data.razorpay_payment_id}`);
  //     })
  //     .catch((error) => {
  //       // handle failure
  //       Alert.alert('Payment Failed', `Error: ${error.code} | ${error.description}`); 
  //       console.error(`Payment failed: ${error.code} | ${error.description}`);
  //     });
  // }

  return (
    <ScrollView className="flex-1 bg-[#161A1A] px-6 py-4" contentContainerStyle={{ paddingBottom: 150 }}>
      {/* Avatar Section */}
      <View className="items-center mb-6">
        <Text className="text-white mt-4 text-[16px] font-LBold mb-4">John Doe</Text>
        <TouchableOpacity className="relative">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=3' }} // replace with user.avatar
            className="w-[140px] h-[140px] rounded-full border border-gray-500"
          />
          <View className="absolute -bottom-1 -right-1 bg-[#2DCEEF] p-1 rounded-full">
            <Ionicons name="add" size={16} color="white" />
          </View>
        </TouchableOpacity>
        <Text className="text-gray-400 font-LRegular text-[18px] py-4">Free Account</Text>

        <LinearGradient
          colors={['#9B2DEF', '#2D9BEF']}
          locations={[0.95, 0.5]}
          className="w-[236px] h-[51px] rounded-full justify-center items-center"
          style={{ borderRadius: 25 }}
        >
          <TouchableOpacity className="w-full h-full justify-center items-center rounded-full"
            onPress={() => router.push('/premiumPlanScreen')} 
          >
            <Text className="text-white font-LBold text-center text-[16px]">GO TO PREMIUM</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>

      {/* Contact Info */}
      <Text className="text-white text-[20px] mb-8 mt-8 font-LBold">Contact</Text>

      <View className="mb-2 justify-center">
        <Text className="text-white text-[12px] font-LRegular ">First Name</Text>
        <TextInput
          className="text-white border-b border-[#949494] justify-center text-[16px] font-LRegular"
          value={firstName}
          onChangeText={setfirstName}
        />
      </View>

      <View className="mb-2 justify-center">
        <Text className="text-white text-[12px] font-LRegular ">Last Name</Text>
        <TextInput
          className="text-white border-b border-[#949494] justify-center  text-[16px] font-LRegular"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Gender */}
      <View className=" mb-2 justify-center">
        <Text className="text-white font-LRegular text-[12px]">Gender</Text>
        <View className="border-b border-[#949494] h-[36px] justify-center">
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder=""
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              height: 36,
            }}
            labelStyle={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Lato-Regular',
              marginLeft: -10,
              marginBottom: 16,
            }}
            textStyle={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Lato-Regular',
            }}
            dropDownContainerStyle={{
              backgroundColor: '#1E1E1E',
              borderColor: '#949494',
            }}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              scrollEnabled: false,
            }}
          />

        </View>
      </View>

      {/* DOB */}
      <View className="mb-2 justify-center">
        <Text className="text-[12px] font-LRegular text-white">Date of Birth</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          className="border-b border-[#949494] justify-center h-[36px]"
        >
          <Text className="text-[16px] font-LRegular text-white">{dob}</Text>
          <Ionicons name="chevron-down-outline" size={24} color="white" style={{ position: 'absolute', right: 10, top: 5, opacity: 0.8 }} />
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

      <View className="mb-2 justify-center">
        <Text className="text-white text-[12px] font-LRegular ">Email</Text>
        <TextInput
          className="text-white border-b border-[#949494] justify-center text-[16px] font-LRegular"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-8 justify-center">
        <Text className="text-white text-[12px] font-LRegular ">Country</Text>
        <TextInput
          className="text-white border-b border-[#949494] justify-center text-[16px] font-LRegular"
          value={country}
          onChangeText={setCountry}
        />
      </View>

      {/* Info Section */}
      <Text className="text-white text-[20px] mb-8 mt-4 font-LBold">Info</Text>
      <View className="flex-row justify-between mb-8">
        <Text className="text-white text-[16px] font-LRegular">Facebook</Text>
        <Text className="text-gray-400 font-LRegular text-[16px]">Not Connected</Text>
      </View>
      <View className="flex-row justify-between mb-14">
        <Text className="text-white text-[16px] font-LRegular">Google</Text>
        <Text className="text-gray-400 text-[16px] font-LRegular">Not Connected</Text>
      </View>

      {/* Account Section */}
      <Text className="text-white text-[20px] mb-8 font-LBold">Account</Text>
      <TouchableOpacity className="mb-8">
        <Text className="text-[#D5D5D5] font-LRegular text-[16px]">Change password</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mb-8">
        <Text className="text-[#D5D5D5] text-[16px] font-LRegular">Add new account</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center mt-4">
        <TouchableOpacity className="border border-white rounded-full h-[38px] items-center w-[173px] justify-center">
          <Text className="text-white font-LBold text-[16px]">LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
