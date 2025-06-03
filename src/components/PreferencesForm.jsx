// src/components/PreferencesForm.jsx
import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PreferencesForm({ user }) {
  const [genres, setGenres] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchPreferences = async () => {
      setLoading(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGenres(data.genres.join(", "));
        setMood(data.mood);
      }
      setLoading(false);
    };
    fetchPreferences();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Has d'iniciar sessió primer!");
    if (!genres.trim() || !mood.trim()) return alert("Omple tots els camps!");

    setLoading(true);
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      genres: genres.split(",").map((g) => g.trim()),
      mood: mood.trim(),
    });
    setLoading(false);
    alert("Preferències desades correctament!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Gèneres (separats per comes)
        <input
          type="text"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          placeholder="rock, pop, jazz..."
          disabled={loading}
        />
      </label>
      <label>
        Estat d’ànim
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="feliç, tranquil, energètic..."
          disabled={loading}
        />
      </label>
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Guardant..." : "Desa preferències"}
      </button>
    </form>
  );
}
