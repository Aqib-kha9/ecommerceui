"use client";

import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function WelcomePopup() {
  const { isLoggedIn, openAuthModal } = useAuth();

  useEffect(() => {
    // Check if user has already seen/skipped the popup in this session or permanently
    const hasSkipped = localStorage.getItem("AyurPooja_skippedAuth");
    const hasVisited = sessionStorage.getItem("AyurPooja_hasVisited");

    if (!isLoggedIn && !hasSkipped && !hasVisited) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        openAuthModal();
        sessionStorage.setItem("AyurPooja_hasVisited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, openAuthModal]);

  return null;
}
