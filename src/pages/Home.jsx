import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Briefcase, DollarSign, Users, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardDraw from "../components/tarot/CardDraw";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showReading, setShowReading] = useState(false);

  const categories = [
    { id: "general", name: "Daily Inspiration", icon: Sparkles, color: "from-purple-500 to-pink-500" },
    { id: "love", name: "Love & Relationships", icon: Heart, color: "from-rose-500 to-pink-500" },
    { id: "career", name: "Career & Purpose", icon: Briefcase, color: "from-blue-500 to-cyan-500" },
    { id: "finance", name: "Wealth & Abundance", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
    { id: "family", name: "Family & Home", icon: Users, color: "from-amber-500 to-orange-500" },
    { id: "health", name: "Health & Vitality", icon: Activity, color: "from-red-500 to-rose-500" },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=1200&q=80')] opacity-5 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
      
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
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 mb-4">
                Mystic Tarot
              </h1>
              <p className="text-purple-200/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Seek guidance from the ancient wisdom of the cards. Choose your path and discover what the universe has to reveal.
              </p>
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
                      className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer group overflow-hidden"
                      onClick={() => handleCategorySelect(category)}
                    >
                      <CardContent className="p-8 relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative z-10">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-0.5 mb-6 mx-auto`}>
                            <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold text-white text-center mb-2">
                            {category.name}
                          </h3>
                          <div className="h-1 w-12 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              className="text-center mt-16 text-purple-200/50 text-sm"
            >
              <p>Each reading is unique and crafted just for you</p>
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