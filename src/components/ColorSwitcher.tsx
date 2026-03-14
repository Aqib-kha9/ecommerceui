"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const accents = [
  { name: "violet", color: "bg-violet-500" },
  { name: "blue", color: "bg-blue-500" },
  { name: "rose", color: "bg-rose-500" },
  { name: "emerald", color: "bg-emerald-500" },
];

export function ColorSwitcher() {
  const [currentAccent, setCurrentAccent] = useState("violet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("accent-color") || "violet";
    setCurrentAccent(saved);
    document.documentElement.setAttribute("data-accent", saved);
  }, []);

  const setAccent = (accent: string) => {
    setCurrentAccent(accent);
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem("accent-color", accent);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10">
      {accents.map((accent) => (
        <button
          key={accent.name}
          onClick={() => setAccent(accent.name)}
          className={cn(
            "w-5 h-5 rounded-full transition-all duration-300 relative flex items-center justify-center hover:scale-110",
            accent.color,
            currentAccent === accent.name && "ring-2 ring-offset-2 ring-slate-400 dark:ring-white dark:ring-offset-slate-900"
          )}
          title={`Switch to ${accent.name} theme`}
        >
          {currentAccent === accent.name && (
            <Check className="w-3 h-3 text-white" />
          )}
        </button>
      ))}
    </div>
  );
}
