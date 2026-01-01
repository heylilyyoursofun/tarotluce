import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowLeft, Music, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import toast from "react-hot-toast";

export default function GuidedMeditation() {
  const queryClient = useQueryClient();

  const { data: meditations, isLoading } = useQuery({
    queryKey: ['meditations'],
    queryFn: () => base44.entities.MeditationAudio.list('-created_date'),
    initialData: []
  });

  // Define the desired order
  const preReadingOrder = ["The Clear Channel", "The Alchemist's Tune-Up", "The Empty Vessel"];
  const postReadingOrder = ["Stepping into the Image", "The Journey Starts"];

  const sortByOrder = (items, order) => {
    return [...items].sort((a, b) => {
      const indexA = order.findIndex(title => a.title.includes(title));
      const indexB = order.findIndex(title => b.title.includes(title));
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  };

  const preReadingMeditations = sortByOrder(
    meditations.filter(m => m.category === "pre_reading"),
    preReadingOrder
  );
  const postReadingMeditations = sortByOrder(
    meditations.filter(m => m.category === "post_reading"),
    postReadingOrder
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <Link to={createPageUrl("Home")}>
          <Button
            variant="ghost"
            className="text-amber-200 hover:text-amber-100 hover:bg-amber-900/30 border border-amber-700/40"
            style={{ fontFamily: "'Cinzel', serif" }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
          <Music className="w-6 h-6 text-amber-300" />
          <h1 className="text-2xl md:text-3xl font-semibold text-amber-100 tracking-wider whitespace-nowrap"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Guided Tarot Meditation
          </h1>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
      </div>



      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Pre-Reading Meditations */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-amber-100 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Pre-Reading Meditations
            </h2>
          </div>
          <p className="text-amber-200/70 mb-4 text-sm tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Prepare your mind and spirit before drawing your cards
          </p>
          <div className="space-y-4">
            {preReadingMeditations.length === 0 ? (
              <p className="text-amber-200/50 italic text-center py-8"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                No pre-reading meditations yet. Upload your first one above.
              </p>
            ) : (
              preReadingMeditations.map((meditation) => (
                <motion.div
                  key={meditation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-gradient-to-br from-stone-900/90 to-purple-950/90 backdrop-blur-xl border-2 border-purple-700/50 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/40" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/40" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/40" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/40" />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-purple-100 tracking-wide"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          {meditation.title}
                        </h3>
                        <p className="text-purple-200/70 text-sm mt-1 tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {meditation.description}
                        </p>
                      </div>
                      <audio
                        controls
                        src={meditation.audio_url}
                        className="w-full mt-4"
                        style={{ 
                          filter: 'sepia(0.5) hue-rotate(260deg) saturate(2)',
                          borderRadius: '0'
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Post-Reading Meditations */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-amber-100 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Post-Reading Meditations
            </h2>
          </div>
          <p className="text-amber-200/70 mb-4 text-sm tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Integrate and embody the wisdom from your reading
          </p>
          <div className="space-y-4">
            {postReadingMeditations.length === 0 ? (
              <p className="text-amber-200/50 italic text-center py-8"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                No post-reading meditations yet. Upload your first one above.
              </p>
            ) : (
              postReadingMeditations.map((meditation) => (
                <motion.div
                  key={meditation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-gradient-to-br from-stone-900/90 to-teal-950/90 backdrop-blur-xl border-2 border-teal-700/50 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-500/40" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-500/40" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-500/40" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-500/40" />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-teal-100 tracking-wide"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          {meditation.title}
                        </h3>
                        <p className="text-teal-200/70 text-sm mt-1 tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          {meditation.description}
                        </p>
                      </div>
                      <audio
                        controls
                        src={meditation.audio_url}
                        className="w-full mt-4"
                        style={{ 
                          filter: 'sepia(0.5) hue-rotate(140deg) saturate(2)',
                          borderRadius: '0'
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}