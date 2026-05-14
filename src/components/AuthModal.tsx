"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShieldCheck, ArrowRight, Loader2, Zap } from "lucide-react";
import api from "@/lib/api";
import { useTranslations } from "next-intl";

export default function AuthModal() {
  const t = useTranslations("AuthModal");
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError(t("phone_error"));
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await api.post("/auth/request-otp", { phone });
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError(t("otp_error"));
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const resp = await api.post("/auth/verify-otp", { phone, otp });
      if (resp.data.status === "success") {
        login(resp.data.token, resp.data.data.user);
        closeAuthModal();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(" AyurPooja_skippedAuth", "true");
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent -z-0" />
        
        <div className="p-8 pt-12 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-8 h-8 text-white fill-current animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">
                Ayur<span className="text-primary italic">Pooja</span> Elite
              </h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
                {step === 1 ? t("subtitle_1") : t("subtitle_2")}
              </p>
            </div>
          </div>

          <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="phone-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      type="tel"
                      placeholder={t("phone_placeholder")}
                      className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 text-base font-bold"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-[10px] text-center text-slate-400 font-medium px-4">
                    {t("terms")}
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="otp-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input 
                      type="text"
                      placeholder={t("otp_placeholder")}
                      className="pl-12 h-14 rounded-2xl border-slate-200 dark:border-white/10 dark:bg-white/5 text-base font-bold tracking-[0.5em] text-center"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] font-black uppercase text-slate-400 hover:text-primary transition-colors"
                    >
                      {t("change_number")}
                    </button>
                    <p className="text-[11px] font-bold text-slate-400">
                      {t("check_console")}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <p className="text-xs font-bold text-red-500 text-center animate-bounce">{error}</p>
            )}

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-[1.02] active:scale-95 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  {step === 1 ? t("send_otp") : t("verify_join")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 text-center">
            <button 
              onClick={handleSkip}
              className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              {t("skip")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
