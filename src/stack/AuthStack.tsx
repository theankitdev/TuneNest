import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/auth';
import SignIn from '../screens/auth/signIn';
import OtpScreen from '../screens/auth/otpScreen';
import VerificationSuccess from '../screens/auth/verificationSuccess';
import SplashScreen from '../screens/splash';

export type AuthStackParamList = {
  Splash: undefined;
  SignUp: undefined;
  SignIn: undefined;
  OtpScreen: undefined;
  VerificationSuccess: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="VerificationSuccess" component={VerificationSuccess} />
    </Stack.Navigator>
  );
}
