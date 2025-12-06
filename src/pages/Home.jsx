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
                            {/* Crystal ball outer glow */}
                            <div className="absolute inset-[-10%] flex items-center justify-center">
                              <div className="w-full h-full rounded-full bg-gradient-radial from-purple-400/30 via-purple-500/10 to-transparent blur-md" />
                            </div>
                            
                            {/* Crystal ball main sphere */}
                            <div className="absolute inset-[10%] flex items-center justify-center">
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-300/40 via-purple-400/60 to-purple-600/40 border-2 border-purple-300/50 shadow-[inset_0_-10px_20px_rgba(168,85,247,0.4)]" />
                            </div>
                            
                            {/* Mystical swirls inside */}
                            <div className="absolute inset-[20%] flex items-center justify-center overflow-hidden rounded-full">
                              <div className="absolute w-full h-1 md:h-2 bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent transform rotate-45" />
                              <div className="absolute w-full h-1 md:h-2 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent transform -rotate-45" />
                            </div>
                            
                            {/* Sparkles around */}
                            {[0, 60, 120, 180, 240, 300].map((angle) => (
                              <div
                                key={angle}
                                className="absolute w-1 h-1 md:w-2 md:h-2 bg-yellow-300 rounded-full"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `rotate(${angle}deg) translateY(-24px) translateX(-50%)`,
                                  boxShadow: '0 0 6px rgba(253, 224, 71, 0.8)'
                                }}
                              />
                            ))}
                            
                            {/* Stand base */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 md:w-8 h-1 md:h-2 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-t-sm" />
                            <div className="absolute -bottom-0.5 md:-bottom-1 left-1/2 transform -translate-x-1/2 w-5 md:w-10 h-0.5 md:h-1 bg-gradient-to-b from-amber-600 to-amber-800 rounded-sm" />
                            
                            {/* Light reflection */}
                            <div className="absolute inset-[15%] top-[10%] left-[15%] w-3 h-3 md:w-6 md:h-6 rounded-full bg-white/40 blur-sm" />
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
                            {/* Ancient scroll rolled at top */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 md:w-16 h-1.5 md:h-3 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-full shadow-md" />
                            
                            {/* Scroll paper */}
                            <div className="absolute inset-[8%] top-[15%] bottom-[15%] flex items-center justify-center">
                              <div className="w-full h-full bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100 border-2 border-amber-600/60 rounded-sm shadow-lg" 
                                   style={{ boxShadow: 'inset 0 2px 4px rgba(180, 83, 9, 0.2)' }}>
                                {/* Aged paper texture */}
                                <div className="absolute inset-0 opacity-20" 
                                     style={{
                                       backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(180, 83, 9, 0.1) 2px, rgba(180, 83, 9, 0.1) 3px)`
                                     }} />
                              </div>
                            </div>
                            
                            {/* Mystical symbols on scroll */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-amber-800 text-xs md:text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>✦</div>
                            </div>
                            
                            {/* Wax seal */}
                            <div className="absolute bottom-[8%] right-[15%] w-3 h-3 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-red-600 to-red-800 border border-red-900 shadow-md">
                              <div className="absolute inset-0 flex items-center justify-center text-yellow-200 text-[6px] md:text-xs font-bold">✧</div>
                            </div>
                            
                            {/* Scroll rolled at bottom */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 md:w-16 h-1.5 md:h-3 bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 rounded-full shadow-md" />
                            
                            {/* Decorative corner flourishes */}
                            <div className="absolute top-[18%] left-[12%] text-amber-700/40 text-[8px] md:text-sm">❋</div>
                            <div className="absolute top-[18%] right-[12%] text-amber-700/40 text-[8px] md:text-sm">❋</div>
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