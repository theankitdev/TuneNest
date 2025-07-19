import { useEffect, useState } from "react";
import {
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router"; // ✅ ADD THIS
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "444219623159-o566c1fcjeuubmm7apcos5hcvmvfci81.apps.googleusercontent.com",
    iosClientId: "444219623159-lfg7jptm582h3rn6q6hmpta6fv9jg956.apps.googleusercontent.com",
    
  });

  const router = useRouter(); // ✅

  useEffect(() => {
    if (response?.type === "success") {

      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("✅ Google Sign-in Success:", userCredential.user.email);
          router.replace("/home"); // ✅ Redirect after login
        })
        .catch((err) => {
          console.error("❌ Firebase Sign-in Error:", err.message);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { promptAsync, request, userInfo };
};
