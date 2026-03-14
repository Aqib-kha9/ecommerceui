"use client";

import React from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useSearch } from "./SearchContext";
import { Button } from "@/components/ui/button";

interface MainSearchBarProps {
  variant?: "hero" | "navbar";
}

export default function MainSearchBar({ variant = "hero" }: MainSearchBarProps) {
  const { searchQuery, setSearchQuery } = useSearch();

  // Different placeholders for a dynamic feel
  const placeholders = [
    "Search for 'Organic Milk'...",
    "Try 'Fresh Tomatoes'...",
    "Find 'Daily Staples'...",
    "Looking for 'Energy Drinks'?"
  ];
  
  const [activePlaceholder, setActivePlaceholder] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActivePlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const isHero = variant === "hero";

  return (
    <motion.div
      layoutId="main-search-bar"
      className={`relative w-full ${isHero ? "z-[100] perspective-[2000px]" : "z-50"}`}
      style={{ transformStyle: "preserve-3d" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 1,
      }}
    >
      {isHero && (
        <div className="absolute inset-0 bg-primary/20 blur-[100px] opacity-20 transition-opacity" />
      )}

      <div
        className={`relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-[2rem] p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] ring-1 ring-white/20 dark:ring-white/5 transition-all focus-within:ring-primary/40 focus-within:shadow-primary/10 ${
          !isHero ? "h-12 flex items-center" : ""
        }`}
      >
        <div className="flex items-center gap-2 w-full">
          {/* Location Picker - Hidden or smaller in Navbar if needed, but keeping for "Same to Same" */}
          <div className={`hidden md:flex items-center gap-3 px-4 ${isHero ? "py-3" : "py-1.5"} bg-slate-100/50 dark:bg-white/5 rounded-[1.5rem] border border-white/20 cursor-pointer hover:bg-white transition-colors group shrink-0`}>
            <MapPin className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deliver to</p>
              <p className="text-[11px] font-black text-slate-900 dark:text-white">
                Bandra West <ChevronDown className="inline w-3 h-3 ml-1" />
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center px-4 md:px-6">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              placeholder={placeholders[activePlaceholder]}
              className={`w-full bg-transparent border-0 focus:ring-0 font-bold placeholder:text-slate-400 dark:text-white ${
                isHero ? "text-lg py-3" : "text-sm py-1"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <Button
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-white font-black rounded-[1.5rem] shadow-xl shadow-primary/20 transition-transform active:scale-95 ${
              isHero ? "px-8 h-14 text-base" : "px-6 h-10 text-xs"
            }`}
          >
            Search Hub
          </Button>

          {/* Mobile Search Icon */}
          <Button
            size="icon"
            variant="ghost"
            className={`md:hidden rounded-full bg-primary text-white ${
              isHero ? "w-12 h-12" : "w-10 h-10"
            }`}
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
