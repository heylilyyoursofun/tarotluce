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
                            {/* Hand-drawn crystal ball - imperfect circle */}
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {/* Outer glow */}
                              <circle cx="50" cy="45" r="42" fill="url(#glowGradient)" opacity="0.3" />
                              
                              {/* Main ball with hand-drawn edge */}
                              <path 
                                d="M 50 10 Q 70 12 82 25 Q 88 35 88 45 Q 88 55 82 65 Q 70 78 50 80 Q 30 78 18 65 Q 12 55 12 45 Q 12 35 18 25 Q 30 12 50 10"
                                fill="url(#ballGradient)"
                                stroke="rgba(216, 180, 254, 0.6)"
                                strokeWidth="1.5"
                                opacity="0.8"
                              />
                              
                              {/* Inner mystical swirls */}
                              <path 
                                d="M 30 35 Q 40 40 50 35 Q 60 30 70 40"
                                stroke="rgba(253, 224, 71, 0.5)"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                              />
                              <path 
                                d="M 35 50 Q 45 45 55 52"
                                stroke="rgba(253, 224, 71, 0.4)"
                                strokeWidth="1"
                                fill="none"
                                strokeLinecap="round"
                              />
                              
                              {/* Hand-drawn sparkles */}
                              <text x="25" y="20" fontSize="8" fill="rgba(253, 224, 71, 0.8)">✦</text>
                              <text x="72" y="25" fontSize="6" fill="rgba(253, 224, 71, 0.7)">✧</text>
                              <text x="78" y="60" fontSize="7" fill="rgba(253, 224, 71, 0.8)">✦</text>
                              <text x="20" y="68" fontSize="6" fill="rgba(253, 224, 71, 0.7)">✧</text>
                              
                              {/* Sketchy stand base */}
                              <path 
                                d="M 42 78 L 42 85 Q 42 88 45 88 L 55 88 Q 58 88 58 85 L 58 78"
                                fill="url(#standGradient)"
                                stroke="rgba(180, 83, 9, 0.4)"
                                strokeWidth="0.5"
                              />
                              <ellipse cx="50" cy="88" rx="10" ry="2" fill="rgba(120, 53, 15, 0.6)" />
                              
                              {/* Light reflection blob */}
                              <ellipse cx="38" cy="28" rx="6" ry="8" fill="rgba(255, 255, 255, 0.35)" transform="rotate(-25 38 28)" />
                              
                              <defs>
                                <radialGradient id="glowGradient">
                                  <stop offset="0%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0" />
                                </radialGradient>
                                <linearGradient id="ballGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="rgba(216, 180, 254, 0.5)" />
                                  <stop offset="50%" stopColor="rgba(192, 132, 252, 0.6)" />
                                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.5)" />
                                </linearGradient>
                                <linearGradient id="standGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="rgb(251, 191, 36)" />
                                  <stop offset="100%" stopColor="rgb(180, 83, 9)" />
                                </linearGradient>
                              </defs>
                            </svg>
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
                            {/* Hand-drawn scroll */}
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {/* Top rolled section - organic curve */}
                              <ellipse cx="50" cy="12" rx="28" ry="5" fill="url(#scrollRodGradient)" stroke="rgba(120, 53, 15, 0.5)" strokeWidth="0.5" />
                              <path d="M 22 12 Q 22 15 22 18" stroke="rgba(120, 53, 15, 0.3)" strokeWidth="1" fill="none" />
                              <path d="M 78 12 Q 78 15 78 18" stroke="rgba(120, 53, 15, 0.3)" strokeWidth="1" fill="none" />
                              
                              {/* Main scroll paper - wavy edges */}
                              <path 
                                d="M 24 18 Q 22 25 23 35 L 22 70 Q 23 78 28 82 L 72 82 Q 77 78 78 70 L 77 35 Q 78 25 76 18 Z"
                                fill="url(#paperGradient)"
                                stroke="rgba(180, 83, 9, 0.4)"
                                strokeWidth="1"
                              />
                              
                              {/* Aged paper stains */}
                              <ellipse cx="40" cy="35" rx="8" ry="6" fill="rgba(180, 83, 9, 0.08)" />
                              <ellipse cx="65" cy="55" rx="6" ry="8" fill="rgba(180, 83, 9, 0.06)" />
                              
                              {/* Hand-drawn decorative lines */}
                              <path d="M 35 30 L 65 30" stroke="rgba(180, 83, 9, 0.25)" strokeWidth="0.5" strokeLinecap="round" />
                              <path d="M 35 38 L 65 38" stroke="rgba(180, 83, 9, 0.2)" strokeWidth="0.5" strokeLinecap="round" />
                              <path d="M 35 46 L 60 46" stroke="rgba(180, 83, 9, 0.2)" strokeWidth="0.5" strokeLinecap="round" />
                              
                              {/* Mystical symbol - hand drawn style */}
                              <circle cx="50" cy="58" r="10" fill="none" stroke="rgba(180, 83, 9, 0.3)" strokeWidth="1" />
                              <path d="M 50 50 L 50 66 M 42 58 L 58 58" stroke="rgba(180, 83, 9, 0.35)" strokeWidth="1.5" strokeLinecap="round" />
                              <text x="50" y="60" fontSize="8" fill="rgba(180, 83, 9, 0.5)" textAnchor="middle" fontFamily="'Cinzel', serif">✦</text>
                              
                              {/* Bottom rolled section */}
                              <ellipse cx="50" cy="83" rx="28" ry="5" fill="url(#scrollRodGradient)" stroke="rgba(120, 53, 15, 0.5)" strokeWidth="0.5" />
                              
                              {/* Wax seal - organic blob */}
                              <path 
                                d="M 68 74 Q 71 71 74 73 Q 77 75 76 78 Q 75 81 72 82 Q 69 83 66 81 Q 64 79 65 76 Q 66 73 68 74"
                                fill="url(#waxGradient)"
                                stroke="rgba(127, 29, 29, 0.6)"
                                strokeWidth="0.5"
                              />
                              <text x="70" y="79" fontSize="6" fill="rgba(253, 224, 71, 0.8)" textAnchor="middle">✧</text>
                              
                              {/* Corner flourishes - sketchy */}
                              <text x="28" y="26" fontSize="6" fill="rgba(180, 83, 9, 0.3)" fontFamily="cursive">❋</text>
                              <text x="68" y="26" fontSize="6" fill="rgba(180, 83, 9, 0.3)" fontFamily="cursive">❋</text>
                              
                              <defs>
                                <linearGradient id="scrollRodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="rgb(120, 53, 15)" />
                                  <stop offset="50%" stopColor="rgb(217, 119, 6)" />
                                  <stop offset="100%" stopColor="rgb(120, 53, 15)" />
                                </linearGradient>
                                <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="rgb(254, 243, 199)" />
                                  <stop offset="50%" stopColor="rgb(253, 230, 138)" />
                                  <stop offset="100%" stopColor="rgb(252, 211, 77)" />
                                </linearGradient>
                                <radialGradient id="waxGradient">
                                  <stop offset="0%" stopColor="rgb(220, 38, 38)" />
                                  <stop offset="100%" stopColor="rgb(127, 29, 29)" />
                                </radialGradient>
                              </defs>
                            </svg>
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