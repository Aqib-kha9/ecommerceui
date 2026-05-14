"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, MapPin, ChevronDown, Package, LayoutGrid, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "./SearchContext";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";

interface MainSearchBarProps {
  variant?: "hero" | "navbar";
}

export default function MainSearchBar({ variant = "hero" }: MainSearchBarProps) {
  const t = useTranslations("Search");
  const locale = useLocale();
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearch();

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [activePlaceholder, setActivePlaceholder] = useState(0);
  const placeholders = t.raw("placeholders") as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Handle Fetching Suggestions with debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/products?search=${encodeURIComponent(searchQuery)}&limit=5`,
          { headers: { "Accept-Language": locale } }
        );
        const json = await res.json();
        if (json.status === "success") {
          setSuggestions(json.data.products);
          setIsSuggestionsOpen(json.data.products.length > 0);
        }
      } catch (err) {
        console.error("Suggestion fetch failed", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, locale]);

  const handleSearch = (term?: string) => {
    const finalSearch = term || searchQuery;
    if (finalSearch.trim()) {
      setIsSuggestionsOpen(false);
      router.push(`/products?search=${encodeURIComponent(finalSearch.trim())}`);
    }
  };

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
        className={`relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-[2.5rem] transition-all focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary/50 hover:border-slate-300 dark:hover:border-white/20 ${
          !isHero ? "h-12 md:h-14 flex items-center p-1 md:p-1.5" : "p-1.5 md:p-2 shadow-2xl"
        }`}
      >
        <div className="flex items-center gap-1 md:gap-2 w-full h-full">
          {/* Location Picker */}
          <div className={`hidden md:flex items-center gap-3 px-4 ${isHero ? "py-3" : "py-1.5"} bg-slate-100/50 dark:bg-white/5 rounded-[1.5rem] border border-white/20 cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors group shrink-0`}>
            <MapPin className="w-4 h-4 text-primary" />
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{t("deliver_to")}</p>
              <p className="text-[11px] font-black text-slate-900 dark:text-white">
                {t("location")} <ChevronDown className="inline w-3 h-3 ml-1" />
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center px-3 md:px-6 h-full relative">
            <Search className="w-4 h-4 md:w-5 md:h-5 text-slate-400 mr-2 md:mr-3 shrink-0" />
            <input
              type="text"
              placeholder={placeholders[activePlaceholder]}
              className={`w-full h-full bg-transparent border-0 focus:ring-0 font-bold placeholder:text-slate-400 dark:text-white outline-none ${
                isHero ? "text-lg py-3" : "text-sm py-1"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => suggestions.length > 0 && setIsSuggestionsOpen(true)}
            />
          </div>

          {/* Action Button */}
          <Button
            onClick={() => handleSearch()}
            className={`hidden md:flex bg-primary hover:bg-primary/90 text-white font-black rounded-full shadow-xl shadow-primary/20 transition-transform active:scale-95 ${
              isHero ? "px-8 h-14 text-base" : "px-6 h-10 text-xs"
            }`}
          >
            {t("search_hub")}
          </Button>

          {/* Mobile Search Icon */}
          <Button
            onClick={() => handleSearch()}
            size="icon"
            className={`md:hidden rounded-full bg-gradient-to-br from-primary to-primary/90 text-white shrink-0 shadow-md shadow-primary/30 transition-transform active:scale-95 ${
              isHero ? "w-10 h-10" : "w-10 h-10"
            }`}
          >
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>

        {/* Search Suggestions Dropdown */}
        <AnimatePresence>
          {isSuggestionsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute left-0 right-0 top-full mt-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-[110]"
            >
              <div className="py-4">
                <div className="px-6 mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span>Suggestions for "{searchQuery}"</span>
                  <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                </div>
                
                <div className="space-y-1">
                  {suggestions.map((item) => {
                     const name = typeof item.name === 'object' ? (item.name[locale] || item.name.en) : item.name;
                     const cat = typeof item.category?.name === 'object' ? (item.category.name[locale] || item.category.name.en) : (item.category?.name || "Product");

                     return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSearchQuery(name);
                        handleSearch(name);
                      }}
                      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Package className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{name}</p>
                        <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                          <LayoutGrid className="w-3 h-3" /> {cat}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                    );
                  })}
                </div>

                <Separator className="my-3 bg-slate-100 dark:bg-white/5" />
                
                <button 
                  onClick={() => handleSearch()}
                  className="w-full px-6 py-3 text-xs font-black text-primary hover:bg-primary/5 transition-colors text-left flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  See all results for "{searchQuery}"
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
