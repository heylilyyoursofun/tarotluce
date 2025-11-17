import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const TAROT_CARDS = [
  { name: "The Fool", number: 0, keywords: ["new beginnings", "innocence", "adventure", "freedom"] },
  { name: "The Magician", number: 1, keywords: ["manifestation", "power", "skill", "concentration"] },
  { name: "The High Priestess", number: 2, keywords: ["intuition", "sacred knowledge", "divine feminine"] },
  { name: "The Empress", number: 3, keywords: ["abundance", "nurturing", "fertility", "nature"] },
  { name: "The Emperor", number: 4, keywords: ["authority", "structure", "control", "leadership"] },
  { name: "The Hierophant", number: 5, keywords: ["tradition", "conformity", "education", "belief"] },
  { name: "The Lovers", number: 6, keywords: ["love", "harmony", "relationships", "choices"] },
  { name: "The Chariot", number: 7, keywords: ["control", "willpower", "determination", "victory"] },
  { name: "Strength", number: 8, keywords: ["courage", "patience", "compassion", "inner strength"] },
  { name: "The Hermit", number: 9, keywords: ["introspection", "solitude", "guidance", "wisdom"] },
  { name: "Wheel of Fortune", number: 10, keywords: ["destiny", "cycles", "change", "luck"] },
  { name: "Justice", number: 11, keywords: ["fairness", "truth", "law", "balance"] },
  { name: "The Hanged Man", number: 12, keywords: ["sacrifice", "letting go", "new perspective"] },
  { name: "Death", number: 13, keywords: ["transformation", "endings", "rebirth", "transition"] },
  { name: "Temperance", number: 14, keywords: ["balance", "moderation", "patience", "purpose"] },
  { name: "The Devil", number: 15, keywords: ["bondage", "materialism", "temptation", "shadow self"] },
  { name: "The Tower", number: 16, keywords: ["upheaval", "chaos", "revelation", "awakening"] },
  { name: "The Star", number: 17, keywords: ["hope", "faith", "renewal", "spirituality"] },
  { name: "The Moon", number: 18, keywords: ["illusion", "intuition", "subconscious", "fear"] },
  { name: "The Sun", number: 19, keywords: ["joy", "success", "celebration", "positivity"] },
  { name: "Judgement", number: 20, keywords: ["reflection", "reckoning", "inner calling", "absolution"] },
  { name: "The World", number: 21, keywords: ["completion", "accomplishment", "fulfillment", "travel"] },
];

export default function CardDraw({ category, onBack }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);
  const [reading, setReading] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const drawCard = async () => {
    setIsDrawing(true);
    setIsFlipped(false);
    setReading(null);

    // Simulate shuffling
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Draw random card
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setDrawnCard(randomCard);
    setIsDrawing(false);

    // Wait a moment, then flip
    setTimeout(() => {
      setIsFlipped(true);
      generateReading(randomCard);
    }, 500);
  };

  const generateReading = async (card) => {
    setIsGenerating(true);
    try {
      const prompt = `You are a wise and compassionate tarot reader. A person has drawn "${card.name}" for a reading about ${category.name}.

The card's core themes are: ${card.keywords.join(", ")}.

Provide a personalized, uplifting reading that:
1. Explains the card's meaning in the context of ${category.name}
2. Offers specific, actionable guidance
3. Highlights opportunities and positive potentials
4. Ends with an inspiring affirmation or message

Keep the tone warm, mystical, and encouraging. Make it feel personal and meaningful.
Write 3-4 paragraphs.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
      });

      setReading(result);
    } catch (error) {
      setReading("The universe's message is unclear at this moment. Please try drawing another card.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-purple-200 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
          {category.name}
        </h2>
        <div className="w-20" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {!drawnCard ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-purple-300" />
                </div>
              </div>
              <h3 className="text-3xl font-semibold text-white mb-4">
                Focus on your question
              </h3>
              <p className="text-purple-200/70 text-lg max-w-md mx-auto mb-8">
                Take a deep breath, clear your mind, and when you're ready, draw your card
              </p>
            </div>

            <Button
              onClick={drawCard}
              disabled={isDrawing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-purple-500/50"
            >
              {isDrawing ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Drawing your card...
                </span>
              ) : (
                "Draw Your Card"
              )}
            </Button>
          </motion.div>
        ) : (
          <div className="w-full">
            {/* Card Display */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-8"
            >
              <div className="perspective-1000 mx-auto max-w-sm">
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative w-full aspect-[2/3] preserve-3d"
                >
                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 border-2 border-purple-400/50 shadow-2xl shadow-purple-500/50">
                      <CardContent className="p-0 h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          <Sparkles className="w-24 h-24 text-purple-300/50 relative z-10" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-400 shadow-2xl shadow-amber-500/50">
                      <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-6">{drawnCard.number}</div>
                        <h3 className="text-3xl font-bold text-purple-900 mb-4">
                          {drawnCard.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {drawnCard.keywords.slice(0, 3).map((keyword, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-purple-900/10 rounded-full text-sm text-purple-900"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Reading */}
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
                  <CardContent className="p-8">
                    <h4 className="text-2xl font-semibold text-purple-200 mb-6 text-center">
                      Your Reading
                    </h4>
                    {isGenerating ? (
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 mx-auto mb-4"
                        >
                          <Sparkles className="w-full h-full text-purple-300" />
                        </motion.div>
                        <p className="text-purple-200/70">The cards are speaking...</p>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-purple-100/90 leading-relaxed whitespace-pre-line">
                          {reading}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="text-center mt-8">
                  <Button
                    onClick={() => {
                      setDrawnCard(null);
                      setReading(null);
                      setIsFlipped(false);
                    }}
                    variant="outline"
                    className="border-purple-400/50 text-purple-200 hover:bg-purple-500/20 hover:text-white"
                  >
                    Draw Another Card
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}