"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Store, ArrowRight, Phone, Mail, ChevronLeft, Sparkles, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"input" | "otp">("input");
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (step === "otp") {
      setTimer(30);
      setCanResend(false);
      t = setInterval(() => {
        setTimer((p) => {
          if (p <= 1) {
            clearInterval(t);
            setCanResend(true);
            return 0;
          }
          return p - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [step]);

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleSendOtp = () => {
    if (!value) return;
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    // Mock verification
    setTimeout(() => {
      setLoading(false);
      login();
      router.push("/profile");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090a] flex overflow-hidden">
      {/* Left Brand Panel (Desktop) */}
      <div className="hidden lg:flex flex-col w-[45%] bg-slate-900 text-white p-16 relative overflow-hidden justify-between">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-primary/20 animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615914143778-1a1a6e50c5dd?q=80&w=2068&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-24 group">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl font-black tracking-tighter leading-[1.1] mb-8">
              Premium Essentials.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Delivered Fast.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-sm leading-relaxed">
              Step into the world of elite FMCG. Your trusted partner for quality, speed, and elegance.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6">
          {[
            { icon: Zap, label: "Flash Delivery", sub: "30-min guaranteed speed" },
            { icon: Shield, label: "Bank-Grade Security", sub: "Your data is always protected" },
            { icon: Sparkles, label: "Elite Membership", sub: "Exclusive pricing and deals" }
          ].map(({ icon: Icon, label, sub }, i) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                <Icon className="w-5 h-5 text-white/80 group-hover:text-primary" />
              </div>
              <div>
                <p className="text-sm font-black tracking-tight">{label}</p>
                <p className="text-xs text-white/40 font-medium">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Background Accents (Mobile) */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
          </Link>

          <div className="bg-white dark:bg-slate-900/50 p-8 lg:p-0 rounded-[32px] dark:border dark:border-white/5">
            <AnimatePresence mode="wait">
              {step === "input" ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Welcome Back</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Log in to your account</p>
                </div>

                  {/* Mode Toggle - Glass Style */}
                  <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl mb-8 border border-slate-200/50 dark:border-white/5">
                    {(["phone", "email"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => { setMode(m); setValue(""); }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
                          mode === m 
                            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] scale-100" 
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 scale-95"
                        }`}
                      >
                        {m === "phone" ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        {m === "phone" ? "Mobile" : "Email"}
                        {mode === m && (
                          <motion.div layoutId="activeTab" className="absolute inset-0 bg-transparent" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2.5 block ml-1">
                        {mode === "phone" ? "Mobile Number" : "Email Address"}
                      </label>
                      {mode === "phone" ? (
                        <div className="flex gap-3">
                          <div className="w-20 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 text-sm font-black text-slate-600 dark:text-slate-300">
                            +91
                          </div>
                          <Input
                            type="tel"
                            placeholder="98765 43210"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold text-lg text-slate-900 dark:text-white focus:ring-primary/20"
                            maxLength={10}
                          />
                        </div>
                      ) : (
                        <Input
                          type="email"
                          placeholder="ravi@pooja.com"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold text-lg text-slate-900 dark:text-white focus:ring-primary/20"
                        />
                      )}
                    </div>

                      <Button
                        onClick={handleSendOtp}
                        disabled={!value || loading}
                        className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                              <Zap className="w-4 h-4 fill-white" />
                            </motion.div>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">Send OTP <ArrowRight className="w-4 h-4" /></span>
                        )}
                      </Button>
                  </div>

                  <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-10 font-medium">
                    New to AyurPooja?{" "}
                    <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">Create Elite Account</Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setStep("input")}
                    className="group flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-10 font-black uppercase tracking-widest"
                  >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
                  </button>

                  <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Verify OTP</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Enter the 6-digit code sent to <br />
                      <span className="font-black text-slate-900 dark:text-slate-200 mt-1 inline-block">
                        {mode === "phone" ? "+91 " : ""}{value}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2.5 mb-8 justify-center">
                    {otp.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKey(i, e)}
                        className="w-12 h-16 text-center text-2xl font-black rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:border-primary focus:bg-white dark:focus:bg-slate-800 outline-none transition-all shadow-sm focus:shadow-primary/10"
                      />
                    ))}
                  </div>

                  <div className="text-center text-sm mb-10">
                    {canResend ? (
                      <button 
                        onClick={() => { setStep("otp"); setTimer(30); setCanResend(false); }} 
                        className="text-primary font-black hover:underline underline-offset-4"
                      >
                        Resend Code
                      </button>
                    ) : (
                      <span className="text-slate-400 font-medium">
                        Request new code in <span className="text-slate-900 dark:text-slate-200 font-black">{timer}s</span>
                      </span>
                    )}
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={otp.join("").length < 6 || loading}
                    className="w-full h-14 bg-slate-900 dark:bg-primary text-white rounded-2xl font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </Button>

                  <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">
                      Your security is our priority. Encrypted session will be established upon verification.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Links */}
        <div className="absolute bottom-8 flex gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
        </div>
      </div>
    </div>
  );
}
