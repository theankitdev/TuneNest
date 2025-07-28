import { View, Text } from 'react-native'
import React from 'react'

const SplashScreen = ({navigation}) => {
  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('MainDrawer')
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [navigation])
  
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-[60px] font-bold'>TuneNest</Text>
    </View>
  )
}

export default SplashScreen