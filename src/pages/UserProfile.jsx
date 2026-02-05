import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, BookHeart, Sparkles, Calendar, TrendingUp, Save, Music } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import toast from "react-hot-toast";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => base44.auth.me()
  });

  const { data: journalEntries, isLoading: journalLoading } = useQuery({
    queryKey: ['tarot-journal'],
    queryFn: () => base44.entities.TarotJournalEntry.list('-reading_date'),
    initialData: []
  });

  const { data: meditationListens, isLoading: meditationLoading } = useQuery({
    queryKey: ['meditation-listens'],
    queryFn: () => base44.entities.MeditationListen.list(),
    initialData: []
  });

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      setIsEditing(false);
      toast.success("Profile updated!", {
        style: {
          background: '#451a03',
          color: '#fef3c7',
          border: '1px solid #d97706'
        }
      });
    },
    onError: () => {
      toast.error("Failed to update profile", {
        style: {
          background: '#451a03',
          color: '#fef3c7',
          border: '1px solid #dc2626'
        }
      });
    }
  });

  const handleSaveProfile = () => {
    updateProfileMutation.mutate({ full_name: fullName });
  };

  // Calculate statistics
  const totalReadings = journalEntries.length;
  const categoryCounts = journalEntries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {});
  const favoriteCategory = Object.keys(categoryCounts).length > 0 ?
  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0] :
  null;
  const cardCounts = journalEntries.reduce((acc, entry) => {
    acc[entry.card_name] = (acc[entry.card_name] || 0) + 1;
    return acc;
  }, {});
  const mostDrawnCard = Object.keys(cardCounts).length > 0 ?
  Object.entries(cardCounts).sort((a, b) => b[1] - a[1])[0] :
  null;
  const meditationCounts = meditationListens.reduce((acc, listen) => {
    acc[listen.meditation_title] = (acc[listen.meditation_title] || 0) + 1;
    return acc;
  }, {});
  const favoriteMeditation = Object.keys(meditationCounts).length > 0 ?
  Object.entries(meditationCounts).sort((a, b) => b[1] - a[1])[0] :
  null;

  if (userLoading || journalLoading || meditationLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12">
          <Sparkles className="w-full h-full text-amber-400" />
        </motion.div>
      </div>);

  }

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
          <User className="w-6 h-6 text-amber-300" />
          <h1 className="text-2xl md:text-3xl font-semibold text-amber-100 tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}>
            My Profile
          </h1>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-stone-900/90 to-amber-950/90 backdrop-blur-xl border-2 border-amber-700/50 rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/40" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/40" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/40" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/40" />
            
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-amber-100 tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}>
                  Personal Information
                </h2>
                {!isEditing &&
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="ghost"
                  className="text-amber-300 hover:text-amber-100 hover:bg-amber-900/30"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    Edit Profile
                  </Button>
                }
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-amber-200/80 mb-2 block tracking-wide"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    Call me by
                  </Label>
                  {isEditing ?
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-stone-950/50 border-amber-700/50 text-amber-100"
                    style={{ fontFamily: "'Playfair Display', serif" }} /> :


                  <p className="text-amber-100 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                      {user?.full_name || "Not set"}
                    </p>
                  }
                </div>

                <div>
                  <Label className="text-amber-200/80 mb-2 block tracking-wide"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    Email
                  </Label>
                  <p className="text-amber-100/70 text-lg"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                    {user?.email}
                  </p>
                </div>

              </div>

              {isEditing &&
              <div className="flex gap-3 justify-end mt-6">
                  <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setFullName(user?.full_name || "");
                  }}
                  className="text-amber-200 hover:text-amber-100"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    Cancel
                  </Button>
                  <Button
                  onClick={handleSaveProfile}
                  disabled={updateProfileMutation.isPending}
                  className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    <Save className="w-4 h-4 mr-2" />
                    {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              }
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-br from-stone-900/90 to-indigo-950/90 backdrop-blur-xl border-2 border-indigo-700/50 rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-indigo-500/40" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-indigo-500/40" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-indigo-500/40" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-indigo-500/40" />
            
            <CardContent className="p-6 md:p-8 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <BookHeart className="w-6 h-6 text-indigo-300" />
                <h2 className="text-xl font-semibold text-indigo-100 tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}>My Tarot Journey

                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div className="text-3xl font-bold text-indigo-100 mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    {totalReadings}
                  </div>
                  <p className="text-indigo-200/70 text-sm tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                    Total Readings
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div className="text-xl font-bold text-indigo-100 mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    {favoriteCategory ? favoriteCategory[0] : "—"}
                  </div>
                  <p className="text-indigo-200/70 text-sm tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                    Favorite Category
                  </p>
                  {favoriteCategory &&
                  <p className="text-indigo-300/60 text-xs mt-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                      ({favoriteCategory[1]} readings)
                    </p>
                  }
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Sparkles className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div className="text-xl font-bold text-indigo-100 mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    {mostDrawnCard ? mostDrawnCard[0] : "—"}
                  </div>
                  <p className="text-indigo-200/70 text-sm tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                    Most Drawn Card
                  </p>
                  {mostDrawnCard &&
                  <p className="text-indigo-300/60 text-xs mt-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                      ({mostDrawnCard[1]} times)
                    </p>
                  }
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Music className="w-8 h-8 text-indigo-300" />
                  </div>
                  <div className="text-xl font-bold text-indigo-100 mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                    {favoriteMeditation ? favoriteMeditation[0] : "—"}
                  </div>
                  <p className="text-indigo-200/70 text-sm tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                    Favorite Meditation
                  </p>
                  {favoriteMeditation &&
                  <p className="text-indigo-300/60 text-xs mt-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                      ({favoriteMeditation[1]} plays)
                    </p>
                  }
                </div>
              </div>

              {totalReadings === 0 &&
              <div className="text-center mt-8">
                  <p className="text-indigo-200/70 italic mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                    Your tarot journey awaits. Draw your first card to begin tracking your insights.
                  </p>
                  <Link to={createPageUrl("Home")}>
                    <Button
                    className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-indigo-50"
                    style={{ fontFamily: "'Cinzel', serif" }}>
                      Start Your Journey
                    </Button>
                  </Link>
                </div>
              }
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center">
          <Link to={createPageUrl("TarotJournal")}>
            <Button
              className="bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-blue-50 border-2 border-blue-400/50 rounded-none"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <BookHeart className="w-4 h-4 mr-2" />
              View Journal
            </Button>
          </Link>
          <Link to={createPageUrl("Home")}>
            <Button
              className="bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-purple-50 border-2 border-purple-400/50 rounded-none"
              style={{ fontFamily: "'Cinzel', serif" }}>
              <Sparkles className="w-4 h-4 mr-2" />
              New Reading
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>);

}