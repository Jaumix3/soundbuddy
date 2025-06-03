// components/PreferencesForm.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PreferencesForm() {
  const [username, setUsername] = useState("");
  const [genres, setGenres] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "users"), {
      username,
      genres: genres.split(",").map((g) => g.trim()),
      mood,
    });
    setUsername("");
    setGenres("");
    setMood("");
    alert("Preferències desades correctament!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nom d'usuari"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Gèneres (rock, pop, etc.)"
        value={genres}
        onChange={(e) => setGenres(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Estat d’ànim (feliç, tranquil...)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Desar preferències
      </button>
    </form>
  );
}
