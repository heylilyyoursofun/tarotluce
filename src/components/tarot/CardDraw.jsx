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
      {/* Header with Art Deco styling */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-amber-200 hover:text-amber-100 hover:bg-amber-900/30 border border-amber-700/40"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
          <h2 className="text-2xl font-semibold text-amber-100 tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}>
            {category.name}
          </h2>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
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
              {/* Art Deco sunburst */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-gradient-to-t from-amber-500/60 to-transparent"
                      style={{
                        height: '80px',
                        transformOrigin: 'bottom center',
                        transform: `rotate(${i * 22.5}deg)`,
                        bottom: '50%',
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300/50">
                    <Sparkles className="w-10 h-10 text-amber-950" />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-amber-100 mb-2 tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                  Focus on Your Question
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
              </div>
              
              <p className="text-amber-200/80 text-lg max-w-md mx-auto mb-8 tracking-wide">
                Take a deep breath, clear your mind, and when you're ready, draw your card
              </p>
            </div>

            <Button
              onClick={drawCard}
              disabled={isDrawing}
              className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-10 py-6 text-lg rounded-none border-2 border-amber-400/50 shadow-2xl shadow-amber-900/50 tracking-wider relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isDrawing ? (
                <span className="flex items-center gap-2 relative z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Drawing Your Card...
                </span>
              ) : (
                <span className="relative z-10">Draw Your Card</span>
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
                    <Card className="w-full h-full bg-gradient-to-br from-stone-900 to-amber-950 border-4 border-amber-600/60 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      {/* Art Deco pattern */}
                      <div className="absolute inset-4 border-2 border-amber-500/40">
                        <div className="absolute inset-2 border border-amber-500/30" />
                      </div>
                      
                      <CardContent className="p-0 h-full flex items-center justify-center relative">
                        {/* Geometric pattern */}
                        <div className="absolute inset-0 opacity-20"
                             style={{
                               backgroundImage: `
                                 repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px),
                                 repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px)
                               `
                             }}
                        />
                        <div className="text-center relative z-10">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-700 opacity-40 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          <Sparkles className="w-24 h-24 text-amber-400/70 relative" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 border-4 border-amber-700 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      {/* Art Deco frame */}
                      <div className="absolute inset-4 border-2 border-amber-800/40">
                        <div className="absolute inset-2 border border-amber-700/30" />
                        
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-800" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-800" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-800" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-800" />
                      </div>
                      
                      <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center relative z-10">
                        <div className="text-7xl mb-6 font-bold text-amber-800"
                             style={{ fontFamily: "'Playfair Display', serif" }}>
                          {drawnCard.number}
                        </div>
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent mb-4" />
                        
                        <h3 className="text-3xl font-bold text-stone-900 mb-4 tracking-wide"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                          {drawnCard.name}
                        </h3>
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800 to-transparent mb-6" />
                        
                        <div className="flex flex-wrap gap-2 justify-center">
                          {drawnCard.keywords.slice(0, 3).map((keyword, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-amber-900/20 border border-amber-800/30 text-sm text-stone-800 tracking-wide"
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
                <Card className="bg-gradient-to-br from-stone-900/90 to-amber-950/90 backdrop-blur-xl border-2 border-amber-700/50 rounded-none relative overflow-hidden">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/40" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/40" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/40" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/40" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
                      <h4 className="text-2xl font-semibold text-amber-100 tracking-wider"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                        Your Reading
                      </h4>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
                    </div>
                    
                    {isGenerating ? (
                      <div className="text-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 mx-auto mb-4"
                        >
                          <Sparkles className="w-full h-full text-amber-400" />
                        </motion.div>
                        <p className="text-amber-200/70 tracking-wide">The cards are speaking...</p>
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        <p className="text-amber-100/90 leading-relaxed whitespace-pre-line tracking-wide">
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
                    className="border-2 border-amber-600/60 text-amber-200 hover:bg-amber-900/40 hover:text-amber-100 rounded-none tracking-wider"
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