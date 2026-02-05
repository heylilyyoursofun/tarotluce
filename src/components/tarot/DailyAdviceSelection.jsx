import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyAdviceSelection({ onAdviceSelect, onBack }) {
  const adviceOptions = [
    {
      id: "daily_card",
      name: "My Daily Card",
      iconUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/eaad51a93_image-removebg-preview.png",
      color: "from-purple-900/80 to-purple-700/80",
      borderColor: "border-purple-400/30 hover:border-purple-400/50",
      shadowColor: "shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]",
      description: "Draw a single card for daily guidance"
    },
    {
      id: "yes_or_no",
      name: "Yes or No",
      iconUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/36d7b66e8_image-removebg-preview-2.png",
      color: "from-pink-900/80 to-rose-700/80",
      borderColor: "border-pink-400/30 hover:border-pink-400/50",
      shadowColor: "shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_50px_rgba(236,72,153,0.7)]",
      description: "Get a clear yes or no answer"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header */}
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
            Daily Inspiration
          </h2>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      {/* Advice Options Grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {adviceOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>
              <Card
                className={`bg-gradient-to-br ${option.color} backdrop-blur-xl border-2 ${option.borderColor} transition-all duration-500 cursor-pointer group overflow-hidden relative h-full ${option.shadowColor}`}
                onClick={() => onAdviceSelect(option)}>
                
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
                
                <CardContent className="p-12 relative">
                  <div className="relative z-10 text-center">
                    <div className="w-32 h-32 mx-auto mb-6 relative">
                      <img
                        src={option.iconUrl}
                        alt={option.name}
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-slate-100 mb-3 tracking-wider"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                      {option.name}
                    </h3>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-3" />

                    <p className="text-slate-100/90 text-sm tracking-wide leading-relaxed"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                      {option.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}