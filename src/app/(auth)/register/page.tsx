"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Store, ArrowRight, Eye, EyeOff, ChevronLeft, Gift, Shield, Star, Crown, CheckCircle2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", referral: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
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
    const n = [...otp];
    n[idx] = val.slice(-1);
    setOtp(n);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1500);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      router.push("/profile");
    }, 1500);
  };

  const isFormValid = 
    form.name.length > 2 && 
    (mode === "phone" ? form.phone.length === 10 : form.email.includes("@")) && 
    form.password.length >= 6 && 
    form.password === form.confirm;

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2 block ml-1">
      {children}
    </label>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090a] flex overflow-hidden">
      {/* Left Brand Panel (Desktop) */}
      <div className="hidden lg:flex flex-col w-[40%] bg-[#0f1115] text-white p-16 relative overflow-hidden justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-24 group">
            <div className="w-12 h-12 bg-primary/20 backdrop-blur-xl border border-primary/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl font-black tracking-tighter leading-[1.1] mb-8">
              Join the<br />
              <span className="text-primary italic font-black">Elite Circle.</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-xs leading-relaxed">
              Experience the pinnacle of FMCG shopping. Exclusive deals, lightning fast deliveries, and curated quality.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="p-6 bg-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <Crown className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-black text-lg tracking-tight">Referral Benefit</p>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  Use a code to get <span className="text-primary font-black">₹100</span> credits instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {[Star, Shield, CheckCircle2].map((Icon, i) => (
              <div key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5">
                <Icon className="w-5 h-5 text-slate-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-y-auto">
        <div className="w-full max-w-[440px] py-12">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
          </Link>

          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Create Account</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Join us today to get started</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      placeholder="e.g. Ravi Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold"
                    />
                  </div>

                  {/* Mode Toggle */}
                  <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5">
                    {(["phone", "email"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                          mode === m ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-400"
                        }`}
                      >
                        {m === "phone" ? <Phone className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                        {m === "phone" ? "Mobile" : "Email"}
                      </button>
                    ))}
                  </div>

                  <div>
                    <FieldLabel>{mode === "phone" ? "Mobile Number" : "Email Address"}</FieldLabel>
                    {mode === "phone" ? (
                      <div className="flex gap-3">
                        <div className="w-20 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 text-sm font-black text-slate-600 dark:text-slate-300">
                          +91
                        </div>
                        <Input
                          type="tel"
                          placeholder="98765 43210"
                          maxLength={10}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold"
                        />
                      </div>
                    ) : (
                      <Input
                        type="email"
                        placeholder="ravi@pooja.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <FieldLabel>Password</FieldLabel>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 chars"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[34px] text-slate-400 hover:text-primary transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div>
                      <FieldLabel>Confirm</FieldLabel>
                      <Input
                        type="password"
                        placeholder="Repeat password"
                        value={form.confirm}
                        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                        className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Referral Code <span className="normal-case font-medium text-slate-400 opacity-60">(Optional)</span></FieldLabel>
                    <Input
                      placeholder="e.g. AYUR100"
                      value={form.referral}
                      onChange={(e) => setForm({ ...form, referral: e.target.value.toUpperCase() })}
                      className="h-13 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold tracking-widest text-primary"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={!isFormValid || loading}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-primary/25 mt-4 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Creating Account..." : <span className="flex items-center gap-2">Create Account <ArrowRight className="w-4 h-4" /></span>}
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-10 font-medium">
                  Already a member?{" "}
                  <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">Sign In</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button
                  onClick={() => setStep("form")}
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
                    OTP sent to <span className="font-black text-slate-900 dark:text-slate-200">{mode === "phone" ? "+91 " + form.phone : form.email}</span>
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
                      className="w-12 h-16 text-center text-2xl font-black rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary outline-none transition-all"
                    />
                  ))}
                </div>

                <div className="text-center text-sm mb-10 font-medium">
                  {canResend ? (
                    <button onClick={() => { setStep("otp"); setTimer(30); setCanResend(false); }} className="text-primary font-black hover:underline">
                      Resend OTP
                    </button>
                  ) : (
                    <span className="text-slate-400">Resend in <span className="text-slate-900 dark:text-slate-200 font-black">{timer}s</span></span>
                  )}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={otp.join("").length < 6 || loading}
                  className="w-full h-14 bg-slate-900 dark:bg-primary text-white rounded-2xl font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Register 🎉"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
