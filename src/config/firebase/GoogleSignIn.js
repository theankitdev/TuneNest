import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const _signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.configure({
      webClientId: '12215828874-4d42de55ps6hmr2qe1qunrgseagcfiin.apps.googleusercontent.com',
      offlineAccess: false,
      scopes: ['profile', 'email'],
    });

    const userInfo = await GoogleSignin.signIn();
    const { idToken } = await GoogleSignin.getTokens();
    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredentials);

    return userInfo;
  } catch (error) {
    console.error('=> Google Sign-In Error:', error);
    return null;
  }
};
