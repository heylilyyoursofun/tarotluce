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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-blue-950 relative overflow-hidden">
      <MagicCursor />
      
      {/* Art Deco pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(212, 175, 55, 0.1) 50px, rgba(212, 175, 55, 0.1) 51px),
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(212, 175, 55, 0.1) 50px, rgba(212, 175, 55, 0.1) 51px)
            `
          }}
        />
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t-4 border-l-4 border-yellow-500/30" 
           style={{
             borderImage: "linear-gradient(135deg, #d4af37 0%, transparent 100%) 1",
             clipPath: "polygon(0 0, 100% 0, 0 100%)"
           }}
      />
      <div className="absolute top-0 right-0 w-64 h-64 border-t-4 border-r-4 border-yellow-500/30"
           style={{
             borderImage: "linear-gradient(225deg, #d4af37 0%, transparent 100%) 1",
             clipPath: "polygon(100% 0, 100% 100%, 0 0)"
           }}
      />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b-4 border-l-4 border-yellow-500/30"
           style={{
             borderImage: "linear-gradient(45deg, #d4af37 0%, transparent 100%) 1",
             clipPath: "polygon(0 100%, 100% 100%, 0 0)"
           }}
      />
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b-4 border-r-4 border-yellow-500/30"
           style={{
             borderImage: "linear-gradient(315deg, #d4af37 0%, transparent 100%) 1",
             clipPath: "polygon(100% 100%, 100% 0, 0 100%)"
           }}
      />
      
      {/* Google Fonts Import */}
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      
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
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500 mb-2 tracking-widest"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                Tarot Luce
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400" />
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400" />
              </div>
              
              <p className="text-slate-200/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wider"
                 style={{ fontFamily: "'Cinzel', serif" }}>
                Seek guidance, inspiration and wisdom from the cards, that would illuminate your path and discover what the universe has to reveal.
              </p>
              
              <div className="flex justify-center mt-6">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>
            </motion.div>

            {/* Main Action Buttons */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Daily Advice Button - Amethyst Purple */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card
                  className="bg-gradient-to-br from-purple-900/80 to-purple-700/80 backdrop-blur-xl border-2 border-purple-400/0 hover:border-purple-400/0 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]"
                  onClick={handleDailyAdvice}
                >
                  {/* Art Deco geometric pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0" 
                         style={{
                           backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                         }}
                    />
                  </div>
                  
                  {/* Glow effect border */}
                  <div className="absolute inset-0 rounded-lg" 
                       style={{
                         boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1)'
                       }}
                  />
                  
                  <CardContent className="p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative z-10 text-center">
                      {/* Sunburst icon */}
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-12 bg-gradient-to-t from-yellow-400/60 to-transparent"
                              style={{
                                transformOrigin: 'bottom center',
                                transform: `rotate(${i * 30}deg)`,
                                bottom: '50%',
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-30"
                               style={{
                                 clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                               }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-yellow-300 relative z-10" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-semibold text-slate-100 mb-3 tracking-wider"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                        My Daily Advice
                      </h3>
                      
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4" />
                      
                      <p className="text-slate-300/70 text-sm tracking-wide"
                         style={{ fontFamily: "'Cinzel', serif" }}>
                        Receive guidance and inspiration for your day ahead
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Make A Quest Button - Sapphire Blue */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card
                  className="bg-gradient-to-br from-blue-900/80 to-blue-700/80 backdrop-blur-xl border-2 border-blue-400/0 hover:border-blue-400/0 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]"
                  onClick={handleMakeQuest}
                >
                  {/* Art Deco geometric pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute inset-0" 
                         style={{
                           backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                         }}
                    />
                  </div>
                  
                  {/* Glow effect border */}
                  <div className="absolute inset-0 rounded-lg" 
                       style={{
                         boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)'
                       }}
                  />
                  
                  <CardContent className="p-12 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="relative z-10 text-center">
                      {/* Compass icon with hexagon */}
                      <div className="w-24 h-24 mx-auto mb-6 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-30"
                               style={{
                                 clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                               }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Compass className="w-12 h-12 text-yellow-300 relative z-10" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-semibold text-slate-100 mb-3 tracking-wider"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                        Make A Quest
                      </h3>
                      
                      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4" />
                      
                      <p className="text-slate-300/70 text-sm tracking-wide"
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
              <div className="flex justify-center items-center gap-3 text-slate-400/50 text-sm tracking-widest"
                   style={{ fontFamily: "'Cinzel', serif" }}>
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-slate-400/50" />
                <p>Each Reading Is Unique And Crafted Just For You</p>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-slate-400/50" />
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