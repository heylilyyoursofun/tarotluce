import React from "react";

export default function Layout({ children, currentPageName }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark mystical background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      
      {/* Smoke/mist effect */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-700/30 to-transparent animate-pulse" 
             style={{ animationDuration: '8s' }} />
      </div>
      
      {/* Circular wooden table */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[140vmin] h-[140vmin]">
          {/* Golden glow around table */}
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-amber-500/20 via-amber-700/10 to-transparent blur-3xl" />
          
          {/* Wooden table surface */}
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 opacity-40" 
               style={{
                 backgroundImage: `
                   repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139, 69, 19, 0.1) 20px, rgba(139, 69, 19, 0.1) 40px),
                   radial-gradient(circle, rgba(120, 80, 50, 0.3) 0%, transparent 70%)
                 `
               }}>
            {/* Wood grain texture */}
            <div className="absolute inset-0 rounded-full opacity-30"
                 style={{
                   backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(101, 67, 33, 0.2) 2px, rgba(101, 67, 33, 0.2) 4px)`
                 }} />
          </div>
          
          {/* Crystals and mystical items arranged in a circle */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const radius = 42; // percentage from center
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
            const colors = [
              'bg-purple-500/60', 'bg-blue-500/60', 'bg-pink-500/60', 
              'bg-emerald-500/60', 'bg-cyan-500/60', 'bg-rose-500/60',
              'bg-amber-500/60', 'bg-indigo-500/60'
            ];
            const sizes = ['w-2 h-2', 'w-3 h-3', 'w-2.5 h-2.5', 'w-1.5 h-1.5'];
            
            return (
              <div
                key={i}
                className={`absolute ${colors[i % colors.length]} ${sizes[i % sizes.length]} rounded-sm blur-[0.5px]`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 10px currentColor`,
                  opacity: 0.4 + Math.random() * 0.3
                }}
              />
            );
          })}
          
          {/* Candles at cardinal points */}
          {[0, 90, 180, 270].map((angle, i) => {
            const radius = 45;
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={`candle-${i}`}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Candle holder */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-700 via-amber-600 to-yellow-800 opacity-40 blur-[1px]" />
                {/* Candle flame glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-radial from-orange-300/50 via-yellow-500/30 to-transparent blur-md animate-pulse"
                       style={{ animationDuration: `${2 + i * 0.5}s` }} />
                </div>
              </div>
            );
          })}
          
          {/* Mystical coins scattered */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16 + 11.25;
            const radius = 38 + (Math.random() * 8);
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={`coin-${i}`}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 opacity-30 blur-[0.5px]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 4px rgba(251, 191, 36, 0.5)'
                }}
              />
            );
          })}
          
          {/* Mystical symbols in corners */}
          {[
            { angle: 45, symbol: '☽' },
            { angle: 135, symbol: '✦' },
            { angle: 225, symbol: '☆' },
            { angle: 315, symbol: '◯' }
          ].map(({ angle, symbol }, i) => {
            const radius = 48;
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={`symbol-${i}`}
                className="absolute text-amber-500/20 text-2xl"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  textShadow: '0 0 10px rgba(251, 191, 36, 0.3)',
                  fontFamily: "'Cinzel', serif"
                }}
              >
                {symbol}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Floating mystical particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-amber-400/20 rounded-full blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}