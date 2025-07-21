import { View, Text } from 'react-native'
import React from 'react'

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('SignIn'); 
  }, 2000); 
  
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-[60px] font-bold'>TuneNest</Text>
    </View>
  )
}

export default SplashScreen