import React, { useState } from "react";

export default function Recommendations() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState("");

  const generate = async () => {
    setLoading(true);
    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Recomana'm 5 cançons de rock per a un estat d’ànim energètic." }],
      }),
    });
    const data = await response.json();
    setRecommendations(data.choices[0].message.content);
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <button onClick={generate} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? "Generant..." : "Generar recomanacions"}
      </button>
      {recommendations && (
        <div className="mt-4 p-4 border rounded bg-gray-100 whitespace-pre-line">
          {recommendations}
        </div>
      )}
    </div>
  );
}
