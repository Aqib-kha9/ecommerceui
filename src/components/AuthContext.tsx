"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface User {
  id: string;
  name?: string;
  phone: string;
  email?: string;
  walletBalance: string | number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Persistence check on mount
  useEffect(() => {
    const token = Cookies.get("AyurPooja_token");
    const storedUser = localStorage.getItem("AyurPooja_user");
    
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      // Optionally verify/refresh user data from backend
      refreshUser();
    }
  }, []);

  const refreshUser = async () => {
    try {
      const resp = await api.get("/users/me/profile");
      if (resp.data.status === "success") {
        const userData = resp.data.data.user;
        setUser(userData);
        localStorage.setItem("AyurPooja_user", JSON.stringify(userData));
      }
    } catch (err: any) {
      console.error("Auth refresh failed", err);
      if (err.response?.status === 401) {
        // If 401, token is invalid/expired. Clear it.
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove("AyurPooja_token");
        localStorage.removeItem("AyurPooja_user");
      }
    }
  };

  const login = (token: string, userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
    Cookies.set("AyurPooja_token", token, { expires: 30 }); // 30 days
    localStorage.setItem("AyurPooja_user", JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout API call failed", err);
    }
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("AyurPooja_token");
    localStorage.removeItem("AyurPooja_user");
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isAuthModalOpen, 
      openAuthModal, 
      closeAuthModal, 
      login, 
      logout,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
