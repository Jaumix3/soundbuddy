// src/components/SignIn.jsx
import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {
  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error fent login amb Google:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl mb-6">Benvingut a SoundBuddy</h1>
      <button
        onClick={signInWithGoogle}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Inicia sessió amb Google
      </button>
    </div>
  );
}
