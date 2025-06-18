// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZvkmLKmYtUtk5ar98DA_60E2bXX8lpqk",
  authDomain: "personal-website-c1f36.firebaseapp.com",
  projectId: "personal-website-c1f36",
  storageBucket: "personal-website-c1f36.firebasestorage.app",
  messagingSenderId: "759163096385",
  appId: "1:759163096385:web:a1425480c716014b1aa5c0",
  measurementId: "G-M6TQMK2PG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db}
