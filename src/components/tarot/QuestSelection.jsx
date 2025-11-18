import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Briefcase, DollarSign, Users, Activity, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function QuestSelection({ onQuestSelect, onBack }) {
  const quests = [
  { id: "love", name: "Love & Relationships", icon: Heart, color: "from-rose-600 to-amber-500", description: "Matters of the heart and connections" },
  { id: "career", name: "Career & Purpose", icon: Briefcase, color: "from-amber-600 to-orange-700", description: "Professional path and calling" },
  { id: "finance", name: "Wealth & Abundance", icon: DollarSign, color: "from-yellow-500 to-amber-600", description: "Financial prosperity and resources" },
  { id: "family", name: "Family & Home", icon: Users, color: "from-amber-700 to-yellow-600", description: "Domestic harmony and bonds" },
  { id: "health", name: "Health & Vitality", icon: Activity, color: "from-orange-600 to-amber-600", description: "Physical and mental wellbeing" },
  { id: "spirituality", name: "Spirituality & Growth", icon: Sparkles, color: "from-purple-600 to-amber-500", description: "Inner wisdom and soul evolution" }];


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center mb-12 relative">
        <Button
          variant="ghost"
          onClick={onBack}
          className="absolute left-0 text-amber-200 hover:text-amber-100 hover:bg-amber-900/30 border border-amber-700/40">

          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500" />
          <h2 className="text-3xl font-semibold text-amber-100 tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}>
            Choose Your Quest
          </h2>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
      </div>

      <p className="text-center text-amber-200/80 text-lg mb-12 max-w-2xl mx-auto tracking-wide"
      style={{ fontFamily: "'Cinzel', serif" }}>Select the area of your life where you seek guidance from the illuminating cards

      </p>

      {/* Quest Cards Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {quests.map((quest, index) => {
          const Icon = quest.icon;
          return (
            <motion.div
              key={quest.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}>

              <Card
                className="bg-gradient-to-br from-stone-900/80 to-amber-950/80 backdrop-blur-xl border-2 border-amber-700/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer group overflow-hidden relative h-full"
                onClick={() => onQuestSelect(quest)}>

                {/* Art Deco geometric pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.3) 10px, rgba(251, 191, 36, 0.3) 11px)`
                  }} />

                </div>
                
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/50" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/50" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/50" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/50" />
                
                <CardContent className="p-8 relative h-full flex flex-col">
                  <div className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      {/* Hexagonal frame */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-full h-full bg-gradient-to-br ${quest.color} opacity-20`}
                        style={{
                          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                        }} />

                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-amber-400 relative z-10" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-amber-100 text-center mb-2 tracking-wide"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                      {quest.name}
                    </h3>
                    
                    <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <p className="text-amber-200/60 text-sm text-center tracking-wide"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                      {quest.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>);

        })}
      </div>
    </div>);

}