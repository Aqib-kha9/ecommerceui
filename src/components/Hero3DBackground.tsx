"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingShape = ({ delay = 0, color = "bg-primary/20" }) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0, opacity: 0 }}
      animate={{
        y: [-20, 20, -20],
        rotate: [0, 90, 180, 270, 360],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute rounded-3xl blur-[2px] ${color} pointer-events-none`}
      style={{
        width: Math.random() * 150 + 50,
        height: Math.random() * 150 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        boxShadow: "0 0 40px var(--ring)",
      }}
    />
  );
};

export default function Hero3DBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradients */}
      <div className="absolute -top-24 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />

      {/* Floating 3D-like elements */}
      <div className="absolute inset-0 perspective-[1000px]">
        <FloatingShape delay={0} color="bg-primary/10" />
        <FloatingShape delay={2} color="bg-primary/5" />
        <FloatingShape delay={4} color="bg-primary/15" />
        <FloatingShape delay={1} color="bg-primary/5" />
        <FloatingShape delay={5} color="bg-primary/10" />
        
        {/* Additional smaller particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.2, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 bg-primary/40 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
