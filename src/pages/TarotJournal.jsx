import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, BookHeart, Sparkles, Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TarotJournal() {
  const [editingEntry, setEditingEntry] = useState(null);
  const [editReflection, setEditReflection] = useState("");
  const [expandedReadings, setExpandedReadings] = useState({});
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery({
    queryKey: ['tarot-journal'],
    queryFn: () => base44.entities.TarotJournalEntry.list('-reading_date'),
    initialData: []
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.TarotJournalEntry.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarot-journal'] });
      setEditingEntry(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.TarotJournalEntry.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tarot-journal'] });
      setDeleteConfirmId(null);
    }
  });

  const handleEdit = (entry) => {
    setEditingEntry(entry.id);
    setEditReflection(entry.user_reflection || "");
  };

  const handleSaveEdit = (entry) => {
    updateMutation.mutate({
      id: entry.id,
      data: { user_reflection: editReflection }
    });
  };

  const handleDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteMutation.mutate(deleteConfirmId);
    }
  };

  const toggleReadingExpansion = (entryId) => {
    setExpandedReadings(prev => ({
      ...prev,
      [entryId]: !prev[entryId]
    }));
  };

  const getFirstSentence = (text) => {
    if (!text) return "";
    const parts = text.split('\n\n').filter(p => p.trim());
    const firstPart = parts[0] && !parts[0].includes('**') ? parts[0].trim() : text.split('\n\n')[0] || text;
    return firstPart.replace(/\*\*/g, '');
  };

  const renderReadingContent = (text) => {
    if (!text) return null;
    const parts = text.split('\n\n').filter(p => p.trim());
    
    return parts.map((paragraph, index) => {
      const subtitleMatch = paragraph.match(/^\*\*(.*?)\*\*/);
      const subtitle = subtitleMatch ? subtitleMatch[1].trim() : null;
      const content = subtitleMatch ? paragraph.replace(/^\*\*(.*?)\*\*\s*/, '').trim() : paragraph.trim();
      
      return (
        <div key={index} className={index > 0 ? "mt-3" : ""}>
          {subtitle && (
            <h5 className="text-sm font-bold text-amber-300 mb-1 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {subtitle}
            </h5>
          )}
          <p className="text-amber-100/80 text-sm leading-relaxed tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            {content}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
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
          <BookHeart className="w-6 h-6 text-amber-300" />
          <h1 className="text-2xl md:text-3xl font-semibold text-amber-100 tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            My Tarot Journal
          </h1>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto mb-4">
              <Sparkles className="w-full h-full text-amber-400" />
            </motion.div>
            <p className="text-amber-200/70 tracking-wide"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Loading your reflections...
            </p>
          </div>
        ) : entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12">
            <BookHeart className="w-24 h-24 mx-auto mb-6 text-amber-400/40" />
            <h2 className="text-2xl font-semibold text-amber-100 mb-4 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Your Journal Awaits
            </h2>
            <p className="text-amber-200/70 mb-8 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Start your journey by drawing a card and adding your first reflection.
            </p>
            <Link to={createPageUrl("Home")}>
              <Button
                className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-8 py-4 rounded-none border-2 border-amber-400/50"
                style={{ fontFamily: "'Cinzel', serif" }}>
                Draw Your First Card
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}>
                  <Card className="bg-gradient-to-br from-stone-900/90 to-amber-950/90 backdrop-blur-xl border-2 border-amber-700/50 rounded-none relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/40" />
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/40" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/40" />
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/40" />
                    
                    <CardContent className="p-6 relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-amber-100 mb-2 tracking-wide"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            {entry.card_name}
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-amber-900/60 border border-amber-600/40 text-xs text-amber-200 tracking-wide"
                              style={{ fontFamily: "'Cinzel', serif" }}>
                              {entry.category}
                            </span>
                            <span className="px-3 py-1 bg-stone-900/60 border border-stone-600/40 text-xs text-stone-300 tracking-wide"
                              style={{ fontFamily: "'Cinzel', serif" }}>
                              {format(new Date(entry.reading_date), 'MMMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(entry)}
                            className="text-amber-300 hover:text-amber-100 hover:bg-amber-900/30">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-4" />

                      {/* Reading */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-amber-300 mb-2 tracking-wide"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          Reading
                        </h4>
                        <p className="text-amber-100/80 text-sm leading-relaxed tracking-wide italic"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                          "{getFirstSentence(entry.reading_text)}"
                        </p>
                        {entry.reading_text && entry.reading_text.split('\n\n').length > 1 && (
                          <>
                            {expandedReadings[entry.id] && (
                              <div className="mt-3">
                                {renderReadingContent(entry.reading_text.split('\n\n').slice(1).join('\n\n'))}
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleReadingExpansion(entry.id)}
                              className="text-amber-300 hover:text-amber-100 hover:bg-amber-900/30 mt-2 text-xs"
                              style={{ fontFamily: "'Cinzel', serif" }}>
                              {expandedReadings[entry.id] ? (
                                <>
                                  <ChevronUp className="w-3 h-3 mr-1" />
                                  Collapse
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3 mr-1" />
                                  Expand
                                </>
                              )}
                            </Button>
                          </>
                        )}
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-4" />

                      {/* Reflection */}
                      <div>
                        <h4 className="text-sm font-semibold text-amber-300 mb-2 tracking-wide"
                          style={{ fontFamily: "'Cinzel', serif" }}>
                          My Reflection
                        </h4>
                        {editingEntry === entry.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editReflection}
                              onChange={(e) => setEditReflection(e.target.value)}
                              className="bg-stone-950/50 border-amber-700/50 text-amber-100 min-h-[100px]"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                              placeholder="Share your thoughts..."
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="ghost"
                                onClick={() => setEditingEntry(null)}
                                className="text-amber-200 hover:text-amber-100"
                                style={{ fontFamily: "'Cinzel', serif" }}>
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleSaveEdit(entry)}
                                className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50"
                                style={{ fontFamily: "'Cinzel', serif" }}>
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-amber-100/90 text-sm leading-relaxed tracking-wide"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {entry.user_reflection || <span className="italic text-amber-200/50">No reflection yet...</span>}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent className="bg-gradient-to-br from-stone-900 to-amber-950 border-2 border-amber-700/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-amber-100 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
              Delete Journal Entry
            </AlertDialogTitle>
            <AlertDialogDescription className="text-amber-200/80" style={{ fontFamily: "'Playfair Display', serif" }}>
              Are you sure you want to delete this journal entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-stone-900 hover:text-stone-950 bg-white hover:bg-stone-50" style={{ fontFamily: "'Cinzel', serif" }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-[#4A0404] hover:bg-[#5C0A0A] text-red-50"
              style={{ fontFamily: "'Cinzel', serif" }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}