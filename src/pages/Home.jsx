import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Compass, BookHeart, Flower2 } from "lucide-react";
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
        {isLoading ?
        <LoadingScreen key="loading" /> :

        <>
            <MagicCursor />
            
            {!showReading && !showQuest ?
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-4 md:py-8 min-h-screen flex flex-col justify-center">

                {/* Header */}
                <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-3 md:mb-8">

                  <div className="flex justify-center mb-2 md:mb-6">
                    <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-500 mb-1 tracking-widest drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]"
              style={{ fontFamily: "'Cinzel', serif" }}>

                    Tarot Luce
                  </h1>
                  
                  <div className="flex justify-center items-center gap-2 md:gap-4 mb-2 md:mb-6">
                    <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400" />
                    <Sparkles className="w-3 md:w-6 h-3 md:h-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <div className="w-8 md:w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400" />
                  </div>
                  
                  <p className="text-slate-200/90 text-xs md:text-base max-w-2xl mx-auto leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-2"
              style={{ fontFamily: "'Cinzel', serif" }}>

                    Seek guidance, inspiration and wisdom from the cards
                  </p>
                  
                  <div className="flex justify-center mt-2 md:mt-6">
                    <div className="w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                  </div>
                </motion.div>

                {/* Main Action Buttons */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-6">
                  {/* Daily Advice Button - Amethyst Purple */}
                  <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}>

                    <Card
                  className="bg-gradient-to-br from-purple-900/80 to-purple-700/80 backdrop-blur-xl border-2 border-purple-400/30 hover:border-purple-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]"
                  onClick={handleDailyAdvice}>

                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                    }} />

                      </div>
                      
                      <div className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(168, 85, 247, 0.1)'
                  }} />

                      
                      <CardContent className="p-8 md:p-12 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 relative">
                            <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/eaad51a93_image-removebg-preview.png"
                          alt="Crystal Ball"
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" />

                          </div>
                          
                          <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-1 md:mb-2 tracking-wider"
                      style={{ fontFamily: "'Cinzel', serif" }}>

                            My Daily Advice
                          </h3>

                          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-2" />

                          <p className="text-slate-100/90 text-xs md:text-sm tracking-wide leading-relaxed"
                      style={{ fontFamily: "'Cinzel', serif" }}>
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
                transition={{ delay: 0.5 }}>

                    <Card
                  className="bg-gradient-to-br from-teal-900/80 to-emerald-700/80 backdrop-blur-xl border-2 border-teal-400/30 hover:border-teal-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_50px_rgba(20,184,166,0.7)]"
                  onClick={handleMakeQuest}>

                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                    }} />

                      </div>
                      
                      <div className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(20, 184, 166, 0.3), inset 0 0 40px rgba(20, 184, 166, 0.1)'
                  }} />

                      
                      <CardContent className="p-8 md:p-12 relative">
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 relative">
                            <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/36d7b66e8_image-removebg-preview-2.png"
                          alt="Ancient Scroll"
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]" />

                          </div>
                          
                          <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-1 md:mb-2 tracking-wider"
                      style={{ fontFamily: "'Cinzel', serif" }}>

                            Make A Quest
                          </h3>

                          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-2" />

                          <p className="text-slate-100/90 text-xs md:text-sm tracking-wide leading-relaxed"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                            Seek answers about life areas
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Guided Meditation Button - Ruby Rose */}
                  <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}>

                    <Card
                  className="bg-gradient-to-br from-rose-900/80 to-red-700/80 backdrop-blur-xl border-2 border-rose-400/30 hover:border-rose-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_50px_rgba(244,63,94,0.7)]"
                  onClick={() => {}}>

                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                    }} />

                      </div>

                      <div className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(244, 63, 94, 0.3), inset 0 0 40px rgba(244, 63, 94, 0.1)'
                  }} />


                      <CardContent className="p-8 md:p-12 relative">
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 relative flex items-center justify-center">
                            <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/f1623c9f6_image-removebg-preview-4.png"
                          alt="Meditation"
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]" />

                          </div>

                          <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-1 md:mb-2 tracking-wider"
                      style={{ fontFamily: "'Cinzel', serif" }}>

                            Guided Tarot Meditation
                          </h3>

                          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-2" />

                          <p className="text-slate-100/90 text-xs md:text-sm tracking-wide leading-relaxed"
                      style={{ fontFamily: "'Cinzel', serif" }}>Meditate on your cards

                      </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Tarot Journal Button - Sapphire Blue */}
                  <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}>

                    <Card
                  className="bg-gradient-to-br from-blue-900/80 to-indigo-700/80 backdrop-blur-xl border-2 border-blue-400/30 hover:border-blue-400/50 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]"
                  onClick={() => {}}>

                      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                        <div className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.3) 10px, rgba(212, 175, 55, 0.3) 11px)`
                    }} />

                      </div>

                      <div className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)'
                  }} />


                      <CardContent className="p-8 md:p-12 relative">
                        <div className="relative z-10 text-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 relative flex items-center justify-center">
                            <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/f401cebc2_image-removebg-preview-5.png"
                          alt="Tarot Journal"
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />

                          </div>

                          <h3 className="text-base md:text-xl font-semibold text-slate-100 mb-1 md:mb-2 tracking-wider"
                      style={{ fontFamily: "'Cinzel', serif" }}>

                            My Tarot Journal
                          </h3>

                          <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-1 md:mb-2" />

                          <p className="text-slate-100/90 text-xs md:text-sm tracking-wide leading-relaxed"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                            Your personal tarot reflections
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
              className="text-center">

                  <div className="flex justify-center items-center gap-2 md:gap-3 text-slate-300/60 text-[10px] md:text-sm tracking-widest"
              style={{ fontFamily: "'Cinzel', serif" }}>

                    <div className="w-4 md:w-8 h-px bg-gradient-to-r from-transparent to-slate-400/50" />
                    <p>Unique Reading For You</p>
                    <div className="w-4 md:w-8 h-px bg-gradient-to-l from-transparent to-slate-400/50" />
                  </div>
                </motion.div>
              </motion.div> :
          showQuest ?
          <motion.div
            key="quest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10">

                <QuestSelection onQuestSelect={handleQuestSelect} onBack={handleBackToHome} />
              </motion.div> :

          <motion.div
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10">

                <CardDraw category={selectedCategory} onBack={handleBackToHome} />
              </motion.div>
          }
          </>
        }
      </AnimatePresence>
    </div>);

}