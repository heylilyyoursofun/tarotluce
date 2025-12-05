import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";
import { TAROT_PROMPTS } from "../components/tarot/tarotPrompts";

export default function GenerateImages() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState([]);
  const [error, setError] = useState(null);

  const generateAllImages = async () => {
    setIsGenerating(true);
    setError(null);
    setCompletedCards([]);

    for (let i = 0; i < TAROT_PROMPTS.length; i++) {
      const card = TAROT_PROMPTS[i];
      setCurrentIndex(i);

      try {
        // Generate the image
        const result = await base44.integrations.Core.GenerateImage({
          prompt: card.prompt
        });

        // Save to database
        await base44.entities.TarotCardImage.create({
          card_name: card.name,
          card_number: card.number,
          image_url: result.url,
          prompt_used: card.prompt
        });

        setCompletedCards(prev => [...prev, { ...card, image_url: result.url }]);
      } catch (err) {
        console.error(`Error generating ${card.name}:`, err);
        setError(`Error generating ${card.name}. Continuing...`);
      }

      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsGenerating(false);
  };

  const progress = (completedCards.length / TAROT_PROMPTS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-100 mb-4 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
            Generate Tarot Card Images
          </h1>
          <p className="text-amber-200/70 mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            Generate AI images for all 78 tarot cards
          </p>

          {!isGenerating && completedCards.length === 0 && (
            <Button
              onClick={generateAllImages}
              className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-8 py-4 text-lg"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate All 78 Cards
            </Button>
          )}

          {isGenerating && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-amber-200">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span style={{ fontFamily: "'Cinzel', serif" }}>
                  Generating: {TAROT_PROMPTS[currentIndex]?.name}...
                </span>
              </div>
              <Progress value={progress} className="h-3 bg-amber-900/50" />
              <p className="text-amber-300/70 text-sm">
                {completedCards.length} of {TAROT_PROMPTS.length} complete
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-400 mt-4">{error}</p>
          )}
        </div>

        {/* Completed Cards Grid */}
        {completedCards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {completedCards.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-stone-900/80 border-amber-700/50 overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    {card.image_url ? (
                      <img
                        src={card.image_url}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber-900/30">
                        <ImageIcon className="w-12 h-12 text-amber-500/50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-amber-100 text-sm font-medium text-center"
                       style={{ fontFamily: "'Cinzel', serif" }}>
                      {card.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {completedCards.length === TAROT_PROMPTS.length && (
          <div className="text-center mt-8">
            <p className="text-green-400 text-xl" style={{ fontFamily: "'Cinzel', serif" }}>
              ✨ All cards generated successfully! Check the database. ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}