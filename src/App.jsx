// src/App.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "./components/SignIn";
import PreferencesForm from "./components/PreferencesForm";
import Recommendations from "./components/Recommendations";

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error tancant sessió:", error);
    }
  };

  if (!user) {
    // Si no està autenticat, mostra el component SignIn
    return <SignIn />;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎵 SoundBuddy</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Tancar Sessió
        </button>
      </header>

      <p className="mb-4">Hola, {user.displayName}!</p>

      {/* Passa l’usuari per a que es pugui relacionar amb les dades a Firestore */}
      <PreferencesForm user={user} />

      <Recommendations user={user} />
    </div>
  );
}
