import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { _signInWithGoogle } from '../../config/firebase/GoogleSignIn'
import { onFacebookButtonPress } from '../../config/firebase/FacebookSignIn'

const SignInScreen = () => {

  async function googleSignIn() {
    _signInWithGoogle().then(data => {
      if(!data) {
        console.log('=> Error:',' No Data')
        return
      }
      console.log('=> Success', data)
    })
  }
  
  return (
    <View className='flex-1 items-center justify-center'>
      <Button label='SignIn with Google' onPress={() => googleSignIn()}/>
      <Button label='SignIn with Facebook' onPress={() => onFacebookButtonPress()}/>
      <Button label='SignIn with Apple'/>
    </View>
  )
}

export default SignInScreen