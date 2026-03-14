"use client";

import { motion } from "framer-motion";

export default function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Subtle Video Texture Layer */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 grayscale-[0.6] contrast-[1.3]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.05]"
        >
          <source src="/137247-766338227.mp4" type="video/mp4" />
        </video>
        
        {/* Focused Mesh Gradients - Enhanced for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white dark:from-transparent dark:to-[#08090a] z-10" />
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/40 backdrop-blur-[3px] z-10" />
      </div>

      {/* Dynamic Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[180px] opacity-40" />
    </div>
  );
}
