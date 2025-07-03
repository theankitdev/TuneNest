import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import {
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import * as AuthSession from "expo-auth-session";

// ✅ Use proxy redirect URI for 
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "622837714980-73gmb1anfqfoq4rcncu6of9jenetvneo.apps.googleusercontent.com",
    androidClientId: "622837714980-k22bl0hasbvokf49p7f08hdkj48v81mk.apps.googleusercontent.com",
    webClientId: "622837714980-uhgsshr6edqmq52ahimber2id2elhpsr.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    responseType: "id_token",
    redirectUri, // ← auto-generated
  });

  console.log("📢 Expo Redirect URI to add in Google Console:", redirectUri);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
        .then((userCredential) => {
          console.log("✅ Google Sign-in Success:", userCredential.user.email);
        })
        .catch((err) => {
          console.error("❌ Firebase Sign-in Error:", err.message);
        });
    }
  }, [response]);

  return { promptAsync, request };
};
