import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardDraw from "../components/tarot/CardDraw";
import QuestSelection from "../components/tarot/QuestSelection";
import MagicCursor from "../components/tarot/MagicCursor";
import LoadingScreen from "../components/LoadingScreen";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showReading, setShowReading] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <MagicCursor />
            
            {!showReading && !showQuest ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 container mx-auto px-4 py-2 md:py-16 min-h-screen flex flex-col justify-center"
              >
                {/* Header */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-4 md:mb-20"
                >
                  <div className="flex justify-center mb-2 md:mb-6">
                    <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  </div>
                  
                  <h1 className="text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500 mb-1 md:mb-2 tracking-widest drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Tarot Luce
                  </h1>
                  
                  <div className="flex justify-center items-center gap-2 md:gap-4 mb-2 md:mb-6">
                    <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400" />
                    <Sparkles className="w-3 md:w-6 h-3 md:h-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <div className="w-8 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400" />
                  </div>
                  
                  <p className="text-slate-200/90 text-xs md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wide md:tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Seek guidance, inspiration and wisdom from the cards
                  </p>
                  
                  <div className="flex justify-center mt-2 md:mt-6">
                    <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  </div>
                </motion.div>

                {/* Main Action Buttons */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3 md:gap-8 mb-4 md:mb-16">
                  {/* Daily Advice Button - Amethyst Purple */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card
                      className="bg-gradient-to-br from-purple-900/80 to-purple-700/80 backdrop-blur-xl border-2 border-purple-400/30 hover:border-purple-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]"
                      onClick={handleDailyAdvice}
                    >
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 rounded-lg"
                        style={{
                          boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1)'
                        }}
                      />
                      
                      <CardContent className="p-3 md:p-12 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative z-10 text-center">
                          <div className="w-10 h-10 md:w-24 md:h-24 mx-auto mb-2 md:mb-6 relative">
                            {/* Outer ring with ornate details */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-full rounded-full border-2 border-yellow-400/40" />
                            </div>
                            
                            {/* Long rays */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={`long-${i}`}
                                  className="absolute w-0.5 md:w-1 h-6 md:h-14 bg-gradient-to-t from-yellow-400 via-yellow-300 to-transparent"
                                  style={{
                                    transformOrigin: 'bottom center',
                                    transform: `rotate(${i * 45}deg)`,
                                    bottom: '50%'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Short rays in between */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={`short-${i}`}
                                  className="absolute w-0.5 h-3 md:h-8 bg-gradient-to-t from-yellow-400/60 to-transparent"
                                  style={{
                                    transformOrigin: 'bottom center',
                                    transform: `rotate(${i * 45 + 22.5}deg)`,
                                    bottom: '50%'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Inner decorative ring */}
                            <div className="absolute inset-[20%] md:inset-[25%] flex items-center justify-center">
                              <div className="w-full h-full rounded-full border border-yellow-300/50" />
                            </div>
                            
                            {/* Multiple star layers */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 md:w-14 md:h-14 bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-40"
                                style={{
                                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                                }}
                              />
                            </div>
                            
                            {/* Rotating inner star */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-4 h-4 md:w-10 md:h-10 bg-gradient-to-br from-yellow-300 to-amber-500 opacity-60"
                                style={{
                                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                                  transform: "rotate(36deg)"
                                }}
                              />
                            </div>
                            
                            {/* Center diamond */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 md:w-4 md:h-4 bg-yellow-200 rotate-45 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                            </div>
                          </div>
                          
                          <h3 className="text-sm md:text-3xl font-semibold text-slate-100 mb-1 md:mb-3 tracking-wider"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            My Daily Advice
                          </h3>
                          
                          <div className="w-10 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-4" />
                          
                          <p className="text-slate-100/90 text-[10px] md:text-sm tracking-wide leading-tight"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            Receive guidance for your day
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Make A Quest Button - Teal Green */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Card
                      className="bg-gradient-to-br from-teal-900/80 to-emerald-700/80 backdrop-blur-xl border-2 border-teal-400/30 hover:border-teal-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_50px_rgba(20,184,166,0.7)]"
                      onClick={handleMakeQuest}
                    >
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                          style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                          }}
                        />
                      </div>
                      
                      <div className="absolute inset-0 rounded-lg"
                        style={{
                          boxShadow: 'inset 0 0 20px rgba(20, 184, 166, 0.3), inset 0 0 40px rgba(20, 184, 166, 0.1)'
                        }}
                      />
                      
                      <CardContent className="p-3 md:p-12 relative">
                        <div className="relative z-10 text-center">
                          <div className="w-10 h-10 md:w-24 md:h-24 mx-auto mb-2 md:mb-6 relative">
                            {/* Outer ornate hexagon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/40"
                                style={{
                                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                }}
                              />
                            </div>
                            
                            {/* Inner hexagon */}
                            <div className="absolute inset-[15%] flex items-center justify-center">
                              <div className="w-full h-full border border-yellow-300/50"
                                style={{
                                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                }}
                              />
                            </div>
                            
                            {/* Corner ornaments */}
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 md:w-2 md:h-2 bg-yellow-400 rounded-full"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `rotate(${i * 60}deg) translateY(-${18}px) translateX(-50%)`
                                }}
                              />
                            ))}
                            
                            {/* Compass rose center - outer circle */}
                            <div className="absolute inset-[25%] flex items-center justify-center">
                              <div className="w-full h-full rounded-full border-2 border-yellow-300/60" />
                            </div>
                            
                            {/* Four main cardinal points */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {[0, 90, 180, 270].map((angle) => (
                                <div
                                  key={angle}
                                  className="absolute w-0.5 md:w-1 h-3 md:h-7 bg-gradient-to-t from-yellow-400 to-yellow-200"
                                  style={{
                                    transformOrigin: 'bottom center',
                                    transform: `rotate(${angle}deg)`,
                                    bottom: '50%'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Four secondary points */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {[45, 135, 225, 315].map((angle) => (
                                <div
                                  key={angle}
                                  className="absolute w-0.5 h-2 md:h-5 bg-gradient-to-t from-yellow-400/60 to-transparent"
                                  style={{
                                    transformOrigin: 'bottom center',
                                    transform: `rotate(${angle}deg)`,
                                    bottom: '50%'
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Center diamond compass marker */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 md:w-4 md:h-4 bg-gradient-to-br from-yellow-200 to-amber-400 rotate-45 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                            </div>
                          </div>
                          
                          <h3 className="text-sm md:text-3xl font-semibold text-slate-100 mb-1 md:mb-3 tracking-wider"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            Make A Quest
                          </h3>
                          
                          <div className="w-10 md:w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-4" />
                          
                          <p className="text-slate-100/90 text-[10px] md:text-sm tracking-wide leading-tight"
                            style={{ fontFamily: "'Cinzel', serif" }}
                          >
                            Seek answers about life areas
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
                  <div className="flex justify-center items-center gap-2 md:gap-3 text-slate-300/60 text-[10px] md:text-sm tracking-widest"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    <div className="w-4 md:w-8 h-px bg-gradient-to-r from-transparent to-slate-400/50" />
                    <p>Unique Reading For You</p>
                    <div className="w-4 md:w-8 h-px bg-gradient-to-l from-transparent to-slate-400/50" />
                  </div>
                </motion.div>
              </motion.div>
            ) : showQuest ? (
              <motion.div
                key="quest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <QuestSelection onQuestSelect={handleQuestSelect} onBack={handleBackToHome} />
              </motion.div>
            ) : (
              <motion.div
                key="reading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10"
              >
                <CardDraw category={selectedCategory} onBack={handleBackToHome} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}