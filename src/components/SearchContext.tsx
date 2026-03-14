"use client";
import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isHeroSearchVisible: boolean;
  setIsHeroSearchVisible: (visible: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeroSearchVisible, setIsHeroSearchVisible] = useState(true);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isHeroSearchVisible,
        setIsHeroSearchVisible,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
