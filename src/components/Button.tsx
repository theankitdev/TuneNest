import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View className='bg-blue-500 p-4 rounded-full px-5 w-[50%] mb-6'>
        <Text className='text-white font-bold text-center text-[20px]'>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button