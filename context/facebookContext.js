import * as Facebook from 'expo-auth-session/providers/facebook';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import React, { useEffect } from 'react';

export const FacebookLogin = () => {
  const [request, response, facebookpromptAsync] = Facebook.useAuthRequest({
    clientId: '1032670839074603',
    redirectUri: 'https://tunenest-3c66a.firebaseapp.com/__/auth/handler'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.authentication;

      const facebookCredential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, facebookCredential)
        .then(userCred => {
          console.log('Logged in as', userCred.user.displayName);
        })
        .catch(err => {
          console.error('Firebase Facebook login error:', err);
        });
    }
  }, [response]);

  return {facebookpromptAsync};
}
