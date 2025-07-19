
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6jw6pRrq19Bb74uccbgS4KiLyCLoCQhc",
  authDomain: "tunenest-3bb56.firebaseapp.com",
  projectId: "tunenest-3bb56",
  storageBucket: "tunenest-3bb56.firebasestorage.app",
  messagingSenderId: "487774202624",
  appId: "1:487774202624:web:c03f24d6a41131d01b61e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


//android = 444219623159-o566c1fcjeuubmm7apcos5hcvmvfci81.apps.googleusercontent.com
// ios = 444219623159-lfg7jptm582h3rn6q6hmpta6fv9jg956.apps.googleusercontent.com