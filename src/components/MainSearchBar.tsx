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
        className={`relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-full transition-all focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary/50 hover:border-slate-300 dark:hover:border-white/20 ${
          !isHero ? "h-12 md:h-14 flex items-center p-1 md:p-1.5" : "p-1.5 md:p-2"
        }`}
      >
        <div className="flex items-center gap-1 md:gap-2 w-full h-full">
          {/* Location Picker - Hidden or smaller in Navbar if needed, but keeping for "Same to Same" */}
          <div className={`hidden md:flex items-center gap-3 px-4 ${isHero ? "py-3" : "py-1.5"} bg-slate-100/50 dark:bg-white/5 rounded-[1.5rem] border border-white/20 cursor-pointer hover:bg-white transition-colors group shrink-0`}>
            <MapPin className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deliver to</p>
              <p className="text-[11px] font-black text-slate-900 dark:text-white">
                Vishakhapatnam <ChevronDown className="inline w-3 h-3 ml-1" />
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center px-3 md:px-6 h-full">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400 mr-2 md:mr-3 shrink-0" />
            <input
              type="text"
              placeholder={placeholders[activePlaceholder]}
              className={`w-full h-full bg-transparent border-0 focus:ring-0 font-bold placeholder:text-slate-400 dark:text-white outline-none ${
                isHero ? "text-lg py-3" : "text-sm py-1"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <Button
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-white font-black rounded-full shadow-xl shadow-primary/20 transition-transform active:scale-95 ${
              isHero ? "px-8 h-14 text-base" : "px-6 h-10 text-xs"
            }`}
          >
            Search Hub
          </Button>

          {/* Mobile Search Icon */}
          <Button
            size="icon"
            className={`md:hidden rounded-full bg-gradient-to-br from-primary to-primary/90 text-white shrink-0 shadow-md shadow-primary/30 transition-transform active:scale-95 ${
              isHero ? "w-10 h-10" : "w-10 h-10"
            }`}
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
