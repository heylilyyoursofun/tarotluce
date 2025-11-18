import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
    >
      {/* Mystical smoke effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-700/30 to-transparent animate-pulse" 
             style={{ animationDuration: '4s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Tarot table image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691b521ad76cccb10bfed167/37b366e4b_Gemini_Generated_Image_yaxmyeyaxmyeyaxm.png"
            alt="Tarot Luce"
            className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full shadow-2xl shadow-amber-900/50"
          />
          {/* Glow effect around image */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-500/20 via-transparent to-transparent blur-3xl" />
        </motion.div>

        {/* Animated candle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6 relative flex flex-col items-center"
        >
          {/* Flame - centered above everything */}
          <motion.div
            animate={{
              scale: [1, 1.15, 0.9, 1.1, 0.95, 1.05, 1],
              y: [0, -3, 1, -2, 2, -1, 0],
              x: [0, 1, -1, 2, -1, 1, 0],
              rotate: [0, -2, 3, -1, 2, -2, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-2"
          >
            {/* Outer flame glow */}
            <div className="absolute inset-0 w-10 h-14 -left-5 -top-1 bg-gradient-radial from-orange-400/70 via-yellow-500/50 to-transparent blur-xl" />
            
            {/* Main flame */}
            <svg width="24" height="32" viewBox="0 0 24 32" className="relative z-10">
              <defs>
                <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
                  <stop offset="30%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  <stop offset="60%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.8 }} />
                </linearGradient>
              </defs>
              <path
                d="M12 2 C12 2, 4 10, 4 18 C4 24, 8 30, 12 30 C16 30, 20 24, 20 18 C20 10, 12 2, 12 2 Z"
                fill="url(#flameGradient)"
                filter="drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))"
              />
              {/* Inner bright core */}
              <motion.ellipse 
                cx="12" 
                cy="20" 
                rx="3" 
                ry="6" 
                fill="#fef3c7" 
                opacity="0.9"
                animate={{
                  opacity: [0.9, 1, 0.85, 0.95, 0.9],
                  ry: [6, 6.5, 5.5, 6.2, 6]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </motion.div>
          
          {/* Wick */}
          <div className="w-1 h-3 bg-gradient-to-b from-gray-800 to-gray-600 rounded-full mb-0" />
          
          {/* Candle body */}
          <div className="w-8 h-16 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-t-lg rounded-b-sm relative">
            {/* Candle texture */}
            <div className="absolute inset-0 opacity-20 rounded-t-lg rounded-b-sm"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)'
                 }} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 tracking-wide text-center px-8"
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
          }}
        >
          Let Tarot Luce be your light.
        </motion.p>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
    </motion.div>
  );
}