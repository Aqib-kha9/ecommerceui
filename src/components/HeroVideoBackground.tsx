"use client";

import { motion } from "framer-motion";

export default function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Hero Video Layer */}
      <div className="absolute inset-0 z-0 opacity-60 dark:opacity-40">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-top -scale-x-[1.2] scale-y-[1.2] -translate-y-24"
        >
          <source src="/205691-927672681_small.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white dark:from-transparent dark:to-[#08090a] z-10" />
        <div className="absolute inset-0 bg-white/5 dark:bg-slate-950/20 backdrop-blur-[2px] z-10" />
      </div>

      {/* Dynamic Cinematic Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[180px] opacity-40" />
    </div>
  );
}
