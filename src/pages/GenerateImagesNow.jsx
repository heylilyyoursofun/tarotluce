import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { TAROT_PROMPTS } from "../components/tarot/tarotPrompts";

export default function GenerateImagesNow() {
  const [status, setStatus] = useState("Click to start");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Don't auto-start to prevent errors
    // generateImages();
  }, []);

  const generateImages = async () => {
    for (let i = 0; i < TAROT_PROMPTS.length; i++) {
      const card = TAROT_PROMPTS[i];
      setStatus(`Generating ${card.name} (${i + 1}/${TAROT_PROMPTS.length})...`);
      
      try {
        const result = await base44.integrations.Core.GenerateImage({
          prompt: card.prompt
        });

        await base44.entities.TarotCardImage.create({
          card_name: card.name,
          card_number: card.number,
          image_url: result.url,
          prompt_used: card.prompt
        });

        setResults(prev => [...prev, { name: card.name, url: result.url }]);
      } catch (err) {
        console.error(err);
      }
    }
    setStatus("Complete!");
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">{status}</h1>
      <button onClick={generateImages} className="mb-4 px-4 py-2 bg-blue-600 rounded">Start Generation</button>
      <div className="grid grid-cols-4 gap-4">
        {results.map((r, i) => (
          <div key={i} className="text-center">
            <img src={r.url} className="w-full rounded" />
            <p className="mt-2">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}