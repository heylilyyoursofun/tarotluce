import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Music, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import toast from "react-hot-toast";

export default function GuidedMeditation() {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    category: "pre_reading"
  });
  const [audioFile, setAudioFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: meditations, isLoading } = useQuery({
    queryKey: ['meditations'],
    queryFn: () => base44.entities.MeditationAudio.list('-created_date'),
    initialData: []
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.MeditationAudio.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditations'] });
      toast.success("Meditation deleted", {
        style: { background: '#451a03', color: '#fef3c7', border: '1px solid #d97706' }
      });
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav" || file.type === "audio/mp3")) {
      setAudioFile(file);
    } else {
      toast.error("Please select an MP3 or WAV audio file", {
        style: { background: '#451a03', color: '#fef3c7', border: '1px solid #dc2626' }
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!audioFile || !uploadData.title || !uploadData.description) {
      toast.error("Please fill in all fields and select an audio file", {
        style: { background: '#451a03', color: '#fef3c7', border: '1px solid #dc2626' }
      });
      return;
    }

    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: audioFile });

      await base44.entities.MeditationAudio.create({
        title: uploadData.title,
        description: uploadData.description,
        category: uploadData.category,
        audio_url: file_url
      });

      queryClient.invalidateQueries({ queryKey: ['meditations'] });
      setShowUploadForm(false);
      setUploadData({ title: "", description: "", category: "pre_reading" });
      setAudioFile(null);
      toast.success("Meditation uploaded successfully!", {
        style: { background: '#451a03', color: '#fef3c7', border: '1px solid #d97706' }
      });
    } catch (error) {
      toast.error("Failed to upload meditation", {
        style: { background: '#451a03', color: '#fef3c7', border: '1px solid #dc2626' }
      });
    } finally {
      setIsUploading(false);
    }
  };

  const preReadingMeditations = meditations.filter(m => m.category === "pre_reading");
  const postReadingMeditations = meditations.filter(m => m.category === "post_reading");

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
          <Music className="w-6 h-6 text-amber-300" />
          <h1 className="text-2xl md:text-3xl font-semibold text-amber-100 tracking-wider"
            style={{ fontFamily: "'Cinzel', serif" }}>
            Guided Tarot Meditation
          </h1>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      {/* Upload Button */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <Button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-rose-50 border-2 border-rose-400/50 rounded-none tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}>
          <Upload className="w-4 h-4 mr-2" />
          Upload New Meditation
        </Button>
      </div>

      {/* Upload Form */}
      <AnimatePresence>
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto mb-8">
            <Card className="bg-gradient-to-br from-stone-900/90 to-rose-950/90 backdrop-blur-xl border-2 border-rose-700/50 rounded-none relative overflow-hidden">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-rose-500/40" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-rose-500/40" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-rose-500/40" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-rose-500/40" />
              
              <CardContent className="p-6 relative z-10">
                <h3 className="text-xl font-semibold text-rose-100 mb-4 tracking-wider"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                  Upload Meditation Audio
                </h3>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <Label className="text-rose-200 mb-2 block" style={{ fontFamily: "'Cinzel', serif" }}>
                      Title
                    </Label>
                    <Input
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      placeholder="e.g., The Clear Channel: Aligning Your Intuition"
                      className="bg-stone-950/50 border-rose-700/50 text-rose-100"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    />
                  </div>

                  <div>
                    <Label className="text-rose-200 mb-2 block" style={{ fontFamily: "'Cinzel', serif" }}>
                      Description / Focus
                    </Label>
                    <Textarea
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      placeholder="e.g., Clearing the energy centers to receive a truthful reading"
                      className="bg-stone-950/50 border-rose-700/50 text-rose-100 min-h-[80px]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    />
                  </div>

                  <div>
                    <Label className="text-rose-200 mb-2 block" style={{ fontFamily: "'Cinzel', serif" }}>
                      Category
                    </Label>
                    <Select
                      value={uploadData.category}
                      onValueChange={(value) => setUploadData({ ...uploadData, category: value })}>
                      <SelectTrigger className="bg-stone-950/50 border-rose-700/50 text-rose-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre_reading">Pre-Reading Meditation</SelectItem>
                        <SelectItem value="post_reading">Post-Reading Meditation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-rose-200 mb-2 block" style={{ fontFamily: "'Cinzel', serif" }}>
                      Audio File (MP3 or WAV)
                    </Label>
                    <Input
                      type="file"
                      accept="audio/mpeg,audio/wav,audio/mp3,.mp3,.wav"
                      onChange={handleFileChange}
                      className="bg-stone-950/50 border-rose-700/50 text-rose-100 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:bg-rose-900/60 file:text-rose-100"
                    />
                    {audioFile && (
                      <p className="text-rose-300 text-sm mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Selected: {audioFile.name}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 justify-end pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setShowUploadForm(false);
                        setUploadData({ title: "", description: "", category: "pre_reading" });
                        setAudioFile(null);
                      }}
                      className="text-rose-200 hover:text-rose-100"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-rose-50"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                      {isUploading ? "Uploading..." : "Upload Meditation"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-purple-100 tracking-wide"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            {meditation.title}
                          </h3>
                          <p className="text-purple-200/70 text-sm mt-1 tracking-wide"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {meditation.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(meditation.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-teal-100 tracking-wide"
                            style={{ fontFamily: "'Cinzel', serif" }}>
                            {meditation.title}
                          </h3>
                          <p className="text-teal-200/70 text-sm mt-1 tracking-wide"
                            style={{ fontFamily: "'Playfair Display', serif" }}>
                            {meditation.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(meditation.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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