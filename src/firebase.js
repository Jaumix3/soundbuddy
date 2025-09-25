// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "your_API_key",
  authDomain: "sounbuddy.firebaseapp.com",
  projectId: "sounbuddy",
  storageBucket: "sounbuddy.firebasestorage.app",
  messagingSenderId: "609565730059",
  appId: "1:609565730059:web:592a2d1550c99dc71fae0e",
  measurementId: "G-VFP5C8KSP4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
