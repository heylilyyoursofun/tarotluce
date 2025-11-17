import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Briefcase, DollarSign, Users, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardDraw from "../components/tarot/CardDraw";
import MagicCursor from "../components/tarot/MagicCursor";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showReading, setShowReading] = useState(false);

  const categories = [
    { id: "general", name: "Daily Inspiration", icon: Sparkles, color: "from-amber-400 to-yellow-600" },
    { id: "love", name: "Love & Relationships", icon: Heart, color: "from-rose-600 to-amber-500" },
    { id: "career", name: "Career & Purpose", icon: Briefcase, color: "from-amber-600 to-orange-700" },
    { id: "finance", name: "Wealth & Abundance", icon: DollarSign, color: "from-yellow-500 to-amber-600" },
    { id: "family", name: "Family & Home", icon: Users, color: "from-amber-700 to-yellow-600" },
    { id: "health", name: "Health & Vitality", icon: Activity, color: "from-orange-600 to-amber-600" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowReading(true);
  };

  const handleBackToHome = () => {
    setShowReading(false);
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
      
      <AnimatePresence mode="wait">
        {!showReading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-8 md:py-16"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12 md:mb-16"
            >
              {/* Art Deco ornament */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 mb-2 tracking-wider"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                MYSTIC TAROT
              </h1>
              
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500" />
                <Sparkles className="w-6 h-6 text-amber-400" />
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500" />
              </div>
              
              <p className="text-amber-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed tracking-wide">
                Seek guidance from the ancient wisdom of the cards. Choose your path and discover what the universe has to reveal.
              </p>
              
              <div className="flex justify-center mt-6">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
            </motion.div>

            {/* Category Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card
                      className="bg-gradient-to-br from-stone-900/80 to-amber-950/80 backdrop-blur-xl border-2 border-amber-700/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer group overflow-hidden relative"
                      onClick={() => handleCategorySelect(category)}
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
                      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/50" />
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/50" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/50" />
                      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/50" />
                      
                      <CardContent className="p-8 relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        <div className="relative z-10">
                          <div className={`w-20 h-20 mx-auto mb-6 relative`}>
                            {/* Hexagonal frame */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-full h-full bg-gradient-to-br ${category.color} opacity-20`}
                                   style={{
                                     clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                   }}
                              />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Icon className="w-10 h-10 text-amber-400 relative z-10" />
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-amber-100 text-center mb-2 tracking-wide"
                              style={{ fontFamily: "'Playfair Display', serif" }}>
                            {category.name}
                          </h3>
                          
                          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <div className="flex justify-center items-center gap-3 text-amber-400/50 text-sm tracking-widest">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                <p>EACH READING IS UNIQUE AND CRAFTED JUST FOR YOU</p>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
            </motion.div>
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