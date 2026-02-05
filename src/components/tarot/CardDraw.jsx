import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TAROT_CARDS } from "./tarotData";
import { Textarea } from "@/components/ui/textarea";
import { BookHeart } from "lucide-react";
import toast from "react-hot-toast";


export default function CardDraw({ category, onBack }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);
  const [reading, setReading] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fairyDust, setFairyDust] = useState([]);
  const [cardImageUrl, setCardImageUrl] = useState(null);
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalReflection, setJournalReflection] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  // Fetch generated images from database
  const { data: generatedImages } = useQuery({
    queryKey: ['tarot-images'],
    queryFn: () => base44.entities.TarotCardImage.list(),
    initialData: []
  });

  const drawCard = async () => {
    setIsDrawing(true);
    setIsFlipped(false);
    setReading(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setDrawnCard(randomCard);
    setIsDrawing(false);

    setTimeout(() => {
      setIsFlipped(true);
      playWindChime();
      createFairyDust();
      generateReading(randomCard);

      // Find the generated image for this card by name (more reliable for all 78 cards)
      const generatedImage = generatedImages.find((img) => img.card_name === randomCard.name);
      if (generatedImage) {
        setCardImageUrl(generatedImage.image_url);
      } else {
        setCardImageUrl(null);
      }
    }, 500);
  };

  const playWindChime = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.4;
    audio.playbackRate = 0.85;
    audio.play().catch(() => {});
  };

  const createFairyDust = () => {
    const particles = [];
    for (let i = 0; i < 25; i++) {
      particles.push({
        id: Math.random(),
        x: 30 + Math.random() * 40,
        y: -10 + Math.random() * 20,
        delay: Math.random() * 0.3,
        duration: 1.5 + Math.random() * 1
      });
    }
    setFairyDust(particles);
    setTimeout(() => setFairyDust([]), 3000);
  };



  const saveToJournal = async () => {
    if (!journalReflection.trim()) return;
    
    setIsSaving(true);
    try {
      await base44.entities.TarotJournalEntry.create({
        card_name: drawnCard.name,
        card_number: drawnCard.number,
        reading_text: reading,
        user_reflection: journalReflection,
        category: category.name,
        reading_date: new Date().toISOString().split('T')[0]
      });
      
      queryClient.invalidateQueries({ queryKey: ['tarot-journal'] });
      setShowJournalForm(false);
      setJournalReflection("");
      toast.success("Saved to your journal!", {
        style: {
          background: '#451a03',
          color: '#fef3c7',
          border: '1px solid #d97706'
        }
      });
    } catch (error) {
      toast.error("Failed to save to journal. Please try again.", {
        style: {
          background: '#451a03',
          color: '#fef3c7',
          border: '1px solid #dc2626'
        }
      });
    } finally {
      setIsSaving(false);
    }
  };

  const generateReading = async (card) => {
    setIsGenerating(true);
    try {
      let categoryKey = "general";
      if (category.id === "love") categoryKey = "love";else
      if (category.id === "career") categoryKey = "career";else
      if (category.id === "finance") categoryKey = "finance";else
      if (category.id === "family") categoryKey = "family";else
      if (category.id === "health") categoryKey = "health";else
      if (category.id === "spirituality") categoryKey = "spirituality";

      const baseInterpretation = card.interpretation[categoryKey];

      const prompt = `You are a wise and compassionate tarot reader. A person has drawn "${card.name}" for a reading about ${category.name}.

Core card interpretation: ${baseInterpretation}

The card's keywords are: ${card.keywords.join(", ")}.

Based on this traditional tarot meaning, provide a personalized, uplifting reading that:
1. Starts with a powerful 1-sentence affirmation on its own line
2. Expands on the core interpretation provided for ${category.name} specifically
3. Offers specific, actionable guidance relevant to ${category.name}
4. Highlights opportunities and positive potentials

Structure your response as:
- First line: A single powerful affirmation sentence
- Then 3-4 paragraphs, each with a short subtitle (3-5 words) that summarizes that paragraph
Format: [Affirmation sentence]\n\n**Subtitle**\n[Paragraph text]\n\n**Subtitle**\n[Paragraph text]\n\n

Keep the tone warm, mystical, and encouraging. Make it feel personal and meaningful.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompt
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
          style={{ fontFamily: "'Cinzel', serif" }}>

          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
          <h2 className="text-2xl font-semibold text-amber-100 tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}>
            {category.name}
          </h2>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {!drawnCard ?
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center">

            <div className="mb-8">
              {/* Crystal Ball for Daily Advice, Scroll for Quest */}
              <div className="w-40 h-40 mx-auto mb-8 relative flex items-center justify-center">
                <img
                src={category.id === "general" 
                  ? "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/2d552633c_image-removebg-preview.png"
                  : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/82c88a076_image-removebg-preview-2.png"
                }
                alt={category.id === "general" ? "Crystal Ball" : "Ancient Scroll"}
                className="w-32 h-32 object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" />

              </div>
              
              <div className="mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                <h3 className="text-xl md:text-3xl font-semibold text-amber-100 mb-2 tracking-wider animate-pulse px-4"
                style={{ fontFamily: "'Cinzel', serif", animationDuration: '3s' }}>
                  Focus on Your Question
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
              </div>
              
              <p className="text-amber-200/80 mb-8 mx-auto text-sm md:text-base tracking-wide max-w-md px-4"
            style={{ fontFamily: "'Cinzel', serif" }}>
                Take a deep breath. Clear your mind.<br />
                <span className="inline-block ml-4 md:ml-8">When you're ready,</span><br />
                <span className="inline-block ml-4 md:ml-8">draw your card.</span>
              </p>
            </div>

            <Button
            onClick={drawCard}
            disabled={isDrawing}
            className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-10 py-6 text-lg rounded-none border-2 border-amber-400/50 shadow-2xl shadow-amber-900/50 tracking-wider relative overflow-hidden group"
            style={{ fontFamily: "'Cinzel', serif" }}>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isDrawing ?
            <span className="flex items-center gap-2 relative z-10">
                  <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>

                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Drawing Your Card...
                </span> :

            <span className="relative z-10">Draw Your Card</span>
            }
            </Button>
          </motion.div> :

        <div className="w-full relative">
            {/* Fairy Dust Particles */}
            <AnimatePresence>
              {fairyDust.map((particle) =>
            <motion.div
              key={particle.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              initial={{ opacity: 0, scale: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 2, 1.5, 0],
                y: [0, 80, 120],
                rotate: [0, 180, 360]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}>

                  <Sparkles
                    className="text-slate-300"
                    size={Math.random() * 16 + 12}
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(203, 213, 225, 1)) drop-shadow(0 0 20px rgba(203, 213, 225, 0.6))'
                    }} />

                </motion.div>
            )}
            </AnimatePresence>

            {/* Card Display */}
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8">

              <div className="perspective-1000 mx-auto max-w-sm">
                <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative w-full aspect-[2/3] preserve-3d">

                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="w-full h-full bg-gradient-to-br from-stone-900 to-amber-950 border-4 border-amber-600/60 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      <div className="absolute inset-4 border-2 border-amber-500/40">
                        <div className="absolute inset-2 border border-amber-500/30" />
                      </div>
                      
                      <CardContent className="p-0 h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                                 repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px),
                                 repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px)
                               `
                      }} />

                        <div className="text-center relative z-10">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-700 opacity-40 blur-3xl" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-black border-4 border-amber-700 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${drawnCard.gradient} opacity-40`}>
                        <div className="absolute inset-0">
                          <motion.div
                          className="absolute top-0 left-0 w-full h-full"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"]
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                               radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                                               radial-gradient(circle at 40% 20%, rgba(0, 0, 0, 0.2) 0%, transparent 30%)`,
                            backgroundSize: "200% 200%"
                          }} />

                        </div>
                        <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                                 radial-gradient(ellipse at top, rgba(255, 255, 255, 0.2), transparent 50%),
                                 radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.4), transparent 50%)
                               `
                      }} />

                      </div>
                      
                      <div className="absolute inset-4 border-2 border-amber-500/60">
                        <div className="absolute inset-2 border border-amber-400/40" />
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400" />
                      </div>
                      
                      <CardContent className="p-0 h-full flex flex-col items-center justify-center text-center relative z-10">
                                                    {cardImageUrl ?
                      <div className="w-full h-full relative">
                                                        <img
                          src={cardImageUrl}
                          alt={drawnCard.name}
                          className="w-full h-full object-cover" />

                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                                                          <h3 className="text-2xl font-bold text-amber-100 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                                                              {drawnCard.arcana === "major" ? `${drawnCard.number} - ${drawnCard.name}` : drawnCard.name}
                                                            </h3>
                                                        </div>
                                                      </div> :

                      <div className="p-8">
                                                        <div className="text-7xl mb-6 font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                        style={{ fontFamily: "'Cinzel', serif" }}>
                                                          {drawnCard.number}
                                                        </div>

                                                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />

                                                        <h3 className="text-3xl font-bold text-amber-100 mb-4 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                        style={{ fontFamily: "'Cinzel', serif" }}>
                                                          {drawnCard.name}
                                                        </h3>

                                                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

                                                        <div className="flex flex-wrap gap-2 justify-center">
                                                          {drawnCard.keywords.slice(0, 3).map((keyword, i) =>
                          <span
                            key={i}
                            className="px-3 py-1 bg-amber-900/80 border border-amber-600/60 text-sm text-amber-100 tracking-wide backdrop-blur-sm"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                                                              {keyword}
                                                            </span>
                          )}
                                                        </div>
                                                      </div>
                      }
                                                  </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Reading */}
            {isFlipped &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto">

                <Card className="bg-gradient-to-br from-stone-900/90 to-amber-950/90 backdrop-blur-xl border-2 border-amber-700/50 rounded-none relative overflow-hidden">
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
                    className="w-12 h-12 mx-auto mb-4">

                          <Sparkles className="w-full h-full text-amber-400" />
                        </motion.div>
                        <p className="text-amber-200/70 tracking-wide"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                          The cards are speaking...
                        </p>
                      </div>
                ) : (
                <div className="space-y-6">
                          {reading && (() => {
                            const parts = reading.split('\n\n').filter((p) => p.trim());
                            const affirmation = parts[0] && !parts[0].includes('**') ? parts[0].trim() : null;
                            const paragraphs = affirmation ? parts.slice(1) : parts;

                            return (
                              <>
                                {affirmation && (
                                  <p className="text-amber-200/90 italic leading-relaxed tracking-wide text-center mb-6"
                                     style={{ fontFamily: "'Playfair Display', serif" }}>
                                    "{affirmation}"
                                  </p>
                                )}
                                {paragraphs.map((paragraph, index) => {
                                  // Parse subtitles wrapped in **Subtitle**
                                  const subtitleMatch = paragraph.match(/^\*\*(.*?)\*\*/);
                                  const subtitle = subtitleMatch ? subtitleMatch[1].trim() : null;
                                  const content = subtitleMatch ?
                                    paragraph.replace(/^\*\*(.*?)\*\*\s*/, '').trim() :
                                    paragraph.trim();

                                  return (
                                    <div key={index} className="space-y-3">
                                      {subtitle &&
                                        <h5 className="text-lg font-bold text-amber-300 tracking-wide"
                                            style={{ fontFamily: "'Playfair Display', serif" }}>
                                          {subtitle}
                                        </h5>
                                      }
                                      <p className="text-amber-100/90 leading-relaxed tracking-wide"
                                         style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {content}
                                      </p>
                                    </div>
                                  );
                                })}
                              </>
                            );
                          })()}
                        </div>
                )}
                  </CardContent>
                </Card>

                {/* Journal Form */}
                {!isGenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-6">
                    
                    {!showJournalForm ? (
                      <div className="text-center">
                        <Button
                          onClick={() => setShowJournalForm(true)}
                          className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-blue-50 border-2 border-blue-400/50 rounded-none tracking-wider"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          <BookHeart className="w-4 h-4 mr-2" />
                          Add to Journal
                        </Button>
                      </div>
                    ) : (
                      <Card className="bg-gradient-to-br from-stone-900/90 to-blue-950/90 backdrop-blur-xl border-2 border-blue-700/50 rounded-none relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-500/40" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/40" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/40" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-500/40" />
                        
                        <CardContent className="p-6 relative z-10">
                          <h4 className="text-lg font-semibold text-blue-100 mb-4 tracking-wider"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            Add Your Reflection
                          </h4>
                          <Textarea
                            value={journalReflection}
                            onChange={(e) => setJournalReflection(e.target.value)}
                            placeholder="What insights does this reading bring you? How does it resonate with your question?"
                            className="bg-stone-950/50 border-blue-700/50 text-blue-100 min-h-[120px] mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          />
                          <div className="flex gap-3 justify-end">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setShowJournalForm(false);
                                setJournalReflection("");
                              }}
                              className="text-blue-200 hover:text-blue-100"
                              style={{ fontFamily: "'Cinzel', serif" }}>
                              Cancel
                            </Button>
                            <Button
                              onClick={saveToJournal}
                              disabled={!journalReflection.trim() || isSaving}
                              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-blue-50"
                              style={{ fontFamily: "'Cinzel', serif" }}>
                              {isSaving ? "Saving..." : "Save to Journal"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}

                <div className="text-center mt-8">
                  <Button
                onClick={() => {
                  setDrawnCard(null);
                  setReading(null);
                  setIsFlipped(false);
                  setCardImageUrl(null);
                  setShowJournalForm(false);
                  setJournalReflection("");
                }}
                className="bg-gradient-to-r from-stone-800 to-amber-900 hover:from-stone-700 hover:to-amber-800 text-amber-200 hover:text-amber-100 border-2 border-amber-600/60 rounded-none tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}>

                    Draw Another Card
                  </Button>
                </div>
              </motion.div>
          }
          </div>
        }
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
    </div>);

}