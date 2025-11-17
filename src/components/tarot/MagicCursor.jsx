import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MagicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail
      setTrail((prevTrail) => [
        ...prevTrail,
        {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + Math.random(),
        },
      ]);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => prevTrail.slice(-15));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom wand cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        {/* Wand */}
        <div className="relative -translate-x-2 -translate-y-2">
          {/* Glow around wand */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl" />
          
          {/* Wand stick */}
          <div className="relative">
            <div
              className="w-1 h-6 bg-gradient-to-b from-amber-300 to-amber-600 rounded-full"
              style={{ transform: "rotate(45deg) translateX(2px)" }}
            />
            {/* Star at tip */}
            <div className="absolute -top-1 -left-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-lg"
              >
                <path
                  d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="url(#starGradient)"
                  stroke="white"
                  strokeWidth="1"
                />
                <defs>
                  <linearGradient id="starGradient" x1="2" y1="2" x2="22" y2="22">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Sparkle effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-3 h-3 bg-yellow-300 rounded-full blur-sm" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: point.x,
              top: point.y,
            }}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div
              className="w-2 h-2 rounded-full blur-sm"
              style={{
                background: `radial-gradient(circle, ${
                  index % 2 === 0
                    ? "rgba(168, 85, 247, 0.6)"
                    : "rgba(236, 72, 153, 0.6)"
                } 0%, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Larger glow particles that appear less frequently */}
      <AnimatePresence>
        {trail
          .filter((_, index) => index % 3 === 0)
          .map((point) => (
            <motion.div
              key={`glow-${point.id}`}
              className="fixed pointer-events-none z-39"
              style={{
                left: point.x,
                top: point.y,
              }}
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{
                opacity: 0,
                scale: 2,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-radial from-purple-400/40 to-transparent blur-md" />
            </motion.div>
          ))}
      </AnimatePresence>

      <style jsx>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}