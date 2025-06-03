// src/App.jsx
import React, { useEffect, useState } from "react";
import { auth, provider, db } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import PreferencesForm from "./components/PreferencesForm";
import Recommendations from "./components/Recommendations";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Detecta canvis d'estat de sessió
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Error en iniciar sessió: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>🎵 SoundBuddy</h1>
      {!user ? (
        <div className="text-center">
          <button className="btn-primary" onClick={handleLogin}>
            Inicia sessió amb Google
          </button>
        </div>
      ) : (
        <>
          <p className="text-center">Hola, {user.displayName} 👋</p>
          <div className="text-center mb-4">
            <button className="btn-primary" onClick={handleLogout}>
              Tancar sessió
            </button>
          </div>
          <PreferencesForm user={user} />
          <Recommendations user={user} />
        </>
      )}
    </div>
  );
}
