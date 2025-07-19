import * as Facebook from 'expo-auth-session/providers/facebook';
import { FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import React, { useEffect } from 'react';
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export const FacebookLogin = () => {
  const [request, response, facebookpromptAsync] = Facebook.useAuthRequest({
    clientId: '1032670839074603',
    redirectUri: 'https://tunenest-3bb56.firebaseapp.com/__/auth/handler'
  });

   useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      
      if (!authentication?.accessToken) {
        console.error('No access token received');
        return;
      }

      const credential = FacebookAuthProvider.credential(authentication.accessToken);
      signInWithCredential(auth, credential)
        .then(userCred => {
          console.log('Logged in as', userCred.user.displayName);
        })
        .catch(err => {
          console.error('Firebase Facebook login error:', err);
        });
    } else if (response?.type === 'error') {
      console.error('Facebook auth error:', response.error);
    }
  }, [response]);

  return {facebookpromptAsync};
}
