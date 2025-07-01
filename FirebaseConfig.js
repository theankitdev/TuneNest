// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBujsaGcsTIIjgKXARAdCkmlh2InrwY4UI",
  authDomain: "tunenest-3c66a.firebaseapp.com",
  projectId: "tunenest-3c66a",
  storageBucket: "tunenest-3c66a.firebasestorage.app",
  messagingSenderId: "622837714980",
  appId: "1:622837714980:web:409ef44d60d2e2356a48b1",
  measurementId: "G-284FQVMXWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);