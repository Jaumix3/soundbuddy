import React from "react";
import PreferencesForm from "./components/PreferencesForm";
import Recommendations from "./components/Recommendations";

export default function App() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">🎵 SoundBuddy</h1>
      <PreferencesForm />
      <Recommendations />
    </div>
  );
}
