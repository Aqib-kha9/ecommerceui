"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Store, ArrowRight, Phone, Mail, ChevronLeft, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
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
          if (p <= 1) { clearInterval(t); setCanResend(true); return 0; }
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
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1000);
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/"); }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090a] flex">
      {/* Left Brand Panel (Desktop) */}
      <div className="hidden lg:flex flex-col w-[45%] bg-gradient-to-br from-primary/90 to-primary/60 text-white p-12 relative overflow-hidden justify-between">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800')] bg-cover bg-center opacity-10" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">Ayur<span className="opacity-70 italic">Pooja</span></span>
          </Link>
          <h1 className="text-5xl font-black tracking-tighter leading-tight mb-6">Welcome<br />back to<br /><span className="opacity-70">AyurPooja.</span></h1>
          <p className="text-white/70 font-medium max-w-xs leading-relaxed">Your trusted source for premium FMCG essentials, delivered fast to your doorstep.</p>
        </div>
        <div className="relative z-10 space-y-4">
          {[{ icon: Zap, label: "30-min fast delivery" }, { icon: Shield, label: "100% secure payments" }, { icon: Sparkles, label: "Exclusive member deals" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white/80">
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 min-h-screen">
        {/* Mobile Logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <span className="font-black text-xl text-slate-900 dark:text-white tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
        </Link>

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {step === "input" ? (
              <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Sign In</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Enter your {mode === "phone" ? "phone number" : "email"} to receive an OTP</p>

                {/* Mode Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
                  {(["phone", "email"] as const).map((m) => (
                    <button key={m} onClick={() => { setMode(m); setValue(""); }} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === m ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400"}`}>
                      {m === "phone" ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      {m === "phone" ? "Phone" : "Email"}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {mode === "phone" ? (
                    <div className="flex gap-2">
                      <div className="w-16 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 shrink-0">+91</div>
                      <Input type="tel" placeholder="98765 43210" value={value} onChange={e => setValue(e.target.value)} className="h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" maxLength={10} />
                    </div>
                  ) : (
                    <Input type="email" placeholder="you@email.com" value={value} onChange={e => setValue(e.target.value)} className="h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white" />
                  )}

                  <Button onClick={handleSendOtp} disabled={!value || loading} className="w-full h-12 bg-primary rounded-2xl font-black text-[13px] tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                    {loading ? "Sending OTP..." : <span className="flex items-center gap-2">Send OTP <ArrowRight className="w-4 h-4" /></span>}
                  </Button>
                </div>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary font-bold hover:underline">Create one</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button onClick={() => setStep("input")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-8 font-bold">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Verify OTP</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">OTP sent to <span className="font-bold text-slate-700 dark:text-slate-200">{mode === "phone" ? "+91 " : ""}{value}</span></p>

                <div className="flex gap-2 mb-6 justify-center">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKey(i, e)}
                      className="w-12 h-14 text-center text-xl font-black rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-0 outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {canResend ? (
                    <button onClick={() => setStep("otp")} className="text-primary font-bold hover:underline">Resend OTP</button>
                  ) : (
                    <span>Resend in <span className="font-bold text-slate-700 dark:text-slate-200">{timer}s</span></span>
                  )}
                </div>

                <Button onClick={handleVerify} disabled={otp.join("").length < 6 || loading} className="w-full h-12 bg-primary rounded-2xl font-black text-[13px] tracking-wide shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
