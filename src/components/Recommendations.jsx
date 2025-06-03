// src/components/Recommendations.jsx
import React, { useState } from "react";

export default function Recommendations({ user }) {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState("");

  const generateRecommendations = async () => {
    if (!user) {
      alert("Has d'iniciar sessió i desar preferències primer.");
      return;
    }

    setLoading(true);
    setRecommendations("");

    try {
      // Fem una consulta a Firestore per agafar preferències
      const responsePrefs = await fetch(
        `https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/users/${user.uid}`
      );
      const prefsData = await responsePrefs.json();
      const genres = prefsData.fields.genres.arrayValue.values
        .map((g) => g.stringValue)
        .join(", ");
      const mood = prefsData.fields.mood.stringValue;

      // Cridem la API IA per generar recomanacions segons preferències
      const prompt = `Recomana'm 5 cançons dels gèneres ${genres} per a un estat d'ànim ${mood}. Només posa la cançó i l'artista.`;

      const aiResponse = await fetch("https://ai.hackclub.com/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const aiData = await aiResponse.json();

      setRecommendations(aiData.choices[0].message.content);
    } catch (error) {
      setRecommendations("Error al generar recomanacions: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="btn-primary" onClick={generateRecommendations} disabled={loading}>
        {loading ? "Generant..." : "Generar recomanacions"}
      </button>
      {recommendations && <div className="card">{recommendations}</div>}
    </div>
  );
}
