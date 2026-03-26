"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const fonts = [
  { id: "geist",     label: "Geist",              class: "font-geist",     preview: "Modern & Clean",       weight: "Regular" },
  { id: "inter",     label: "Inter",              class: "font-inter",     preview: "Professional",          weight: "Regular" },
  { id: "outfit",    label: "Outfit",             class: "font-outfit",    preview: "Friendly & Round",      weight: "Regular" },
  { id: "jakarta",   label: "Plus Jakarta Sans",  class: "font-jakarta",   preview: "Sharp & Refined",       weight: "Regular" },
  { id: "grotesk",   label: "Space Grotesk",      class: "font-grotesk",   preview: "Bold & Geometric",      weight: "Bold" },
  { id: "poppins",   label: "Poppins",            class: "font-poppins",   preview: "Thick & Rounded",       weight: "Bold" },
  { id: "nunito",    label: "Nunito",             class: "font-nunito",    preview: "Soft & Chunky",         weight: "Bold" },
  { id: "bricolage", label: "Bricolage Grotesque",class: "font-bricolage", preview: "Display & Chunky",      weight: "Black" },
  { id: "syne",      label: "Syne",               class: "font-syne",      preview: "Ultra Bold Display",    weight: "Black" },
  { id: "playfair",  label: "Playfair Display",   class: "font-playfair",  preview: "Elegant Serif",         weight: "Regular" },
] as const;

export type FontId = (typeof fonts)[number]["id"];

const FontContext = createContext<{ font: FontId; setFont: (f: FontId) => void }>({
  font: "geist",
  setFont: () => {},
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = useState<FontId>("geist");

  useEffect(() => {
    const saved = (localStorage.getItem("ayur-font") as FontId) || "geist";
    setFontState(saved);
    applyFont(saved);
  }, []);

  const setFont = (f: FontId) => {
    setFontState(f);
    localStorage.setItem("ayur-font", f);
    applyFont(f);
  };

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
}

function applyFont(fontId: FontId) {
  const html = document.documentElement;
  // Remove all font classes
  fonts.forEach(f => html.classList.remove(f.class));
  // Add selected
  const target = fonts.find(f => f.id === fontId);
  if (target) html.classList.add(target.class);
}

export function useFont() {
  return useContext(FontContext);
}
