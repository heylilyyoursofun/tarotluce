import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardDraw from "../components/tarot/CardDraw";
import QuestSelection from "../components/tarot/QuestSelection";
import MagicCursor from "../components/tarot/MagicCursor";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showReading, setShowReading] = useState(false);
  const [showQuest, setShowQuest] = useState(false);

  const handleDailyAdvice = () => {
    setSelectedCategory({ id: "general", name: "Daily Inspiration", icon: Sparkles });
    setShowReading(true);
  };

  const handleMakeQuest = () => {
    setShowQuest(true);
  };

  const handleQuestSelect = (category) => {
    setSelectedCategory(category);
    setShowQuest(false);
    setShowReading(true);
  };

  const handleBackToHome = () => {
    setShowReading(false);
    setShowQuest(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-amber-950 to-stone-900 relative overflow-hidden">
      <MagicCursor />
      
      {/* Art Deco pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(251, 191, 36, 0.1) 50px, rgba(251, 191, 36, 0.1) 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(251, 191, 36, 0.1) 50px, rgba(251, 191, 36, 0.1) 51px)
            `
          }}
        />
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t-4 border-l-4 border-amber-500/30" 
           style={{
             borderImage: "linear-gradient(135deg, #f59e0b 0%, transparent 100%) 1",
             clipPath: "polygon(0 0, 100% 0, 0 100%)"
           }}
      />
      <div className="absolute top-0 right-0 w-64 h-64 border-t-4 border-r-4 border-amber-500/30"
           style={{
             borderImage: "linear-gradient(225deg, #f59e0b 0%, transparent 100%) 1",
             clipPath: "polygon(100% 0, 100% 100%, 0 0)"
           }}
      />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b-4 border-l-4 border-amber-500/30"
           style={{
             borderImage: "linear-gradient(45deg, #f59e0b 0%, transparent 100%) 1",
             clipPath: "polygon(0 100%, 100% 100%, 0 0)"
           }}
      />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b-4 border-r-4 border-amber-500/30"
           style={{
             borderImage: "linear-gradient(315deg, #f59e0b 0%, transparent 100%) 1",
             clipPath: "polygon(100% 100%, 100% 0, 0 100%)"
           }}
      />
      
      {/* Google Fonts Import */}
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap" rel="stylesheet" />
      
      <AnimatePresence mode="wait">
        {!showReading && !showQuest ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col justify-center"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16 md:mb-20"
            >
              {/* Art Deco ornament */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 mb-2 tracking-widest"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                MYSTIC TAROT
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <Sparkles className="w-6 h-6 text-amber-400" />
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              
              <p className="text-amber-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wider"
                 style={{ fontFamily: "'Cinzel', serif" }}>
                Seek guidance from the ancient wisdom of the cards. Choose your path and discover what the universe has to reveal.
              </p>
              
              <div className="flex justify-center mt-6">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
            </motion.div>

            {/* Main Action Buttons */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Daily Advice Button */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card
                  className="bg-gradient-to-br from-stone-900/80 to-amber-950/80 backdrop-blur-xl border-2 border-amber-700/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full"
                  onClick={handleDailyAdvice}
                >
                  {/* Art Deco geometric pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0" 
                         style={{
                           backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.3) 10px, rgba(251, 191, 36, 0.3) 11px)`
                         }}
                    />
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/50" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/50" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50" />
                  
                  <CardContent className="p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative z-10 text-center">
                      {/* Sunburst icon */}
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-12 bg-gradient-to-t from-amber-500/60 to-transparent"
                              style={{
                                transformOrigin: 'bottom center',
                                transform: `rotate(${i * 30}deg)`,
                                bottom: '50%',
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 opacity-30"
                               style={{
                                 clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                               }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-amber-400 relative z-10" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-semibold text-amber-100 mb-3 tracking-wider"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                        My Daily Advice
                      </h3>
                      
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                      
                      <p className="text-amber-200/70 text-sm tracking-wide"
                         style={{ fontFamily: "'Cinzel', serif" }}>
                        Receive guidance and inspiration for your day ahead
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Make A Quest Button */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card
                  className="bg-gradient-to-br from-stone-900/80 to-amber-950/80 backdrop-blur-xl border-2 border-amber-700/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full"
                  onClick={handleMakeQuest}
                >
                  {/* Art Deco geometric pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0" 
                         style={{
                           backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.3) 10px, rgba(251, 191, 36, 0.3) 11px)`
                         }}
                    />
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/50" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/50" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50" />
                  
                  <CardContent className="p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-amber-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative z-10 text-center">
                      {/* Compass icon with hexagon */}
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-amber-600 opacity-30"
                               style={{
                                 clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                               }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Compass className="w-12 h-12 text-amber-400 relative z-10" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-semibold text-amber-100 mb-3 tracking-wider"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                        Make A Quest
                      </h3>
                      
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                      
                      <p className="text-amber-200/70 text-sm tracking-wide"
                         style={{ fontFamily: "'Cinzel', serif" }}>
                        Seek answers about love, career, wealth, family, health, or spirituality
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center items-center gap-3 text-amber-400/50 text-sm tracking-widest"
                   style={{ fontFamily: "'Cinzel', serif" }}>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                <p>EACH READING IS UNIQUE AND CRAFTED JUST FOR YOU</p>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
            </motion.div>
          </motion.div>
        ) : showQuest ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <QuestSelection onQuestSelect={handleQuestSelect} onBack={handleBackToHome} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10"
          >
            <CardDraw category={selectedCategory} onBack={handleBackToHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}