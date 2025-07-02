import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { onAuthStateChanged, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });


export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '622837714980-uhgsshr6edqmq52ahimber2id2elhpsr.apps.googleusercontent.com',
    androidClientId: '622837714980-k22bl0hasbvokf49p7f08hdkj48v81mk.apps.googleusercontent.com',
    webClientId: '622837714980-uhgsshr6edqmq52ahimber2id2elhpsr.apps.googleusercontent.com',
     scopes: ['profile', 'email'],
     responseType: 'id_token',
     redirectUri: redirectUri, // Replace with your actual redirect URI
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
        .then(userCredential => {
          console.log('✅ Google Sign-in Success:', userCredential.user.email);
        })
        .catch(err => {
          console.error('❌ Firebase Sign-in Error:', err.message);
        });
        console.log("🔁 Redirect URI:", redirectUri);
    }
  }, [response]);

  return { promptAsync, request };
};
