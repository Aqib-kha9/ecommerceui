"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Store, ArrowRight, Eye, EyeOff, ChevronLeft, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
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
      setTimer(30); setCanResend(false);
      t = setInterval(() => {
        setTimer(p => { if (p <= 1) { clearInterval(t); setCanResend(true); return 0; } return p - 1; });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [step]);

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const n = [...otp]; n[idx] = val.slice(-1); setOtp(n);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };
  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("otp"); }, 1000);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/"); }, 1200);
  };

  const isFormValid = form.name && form.email && form.phone.length === 10 && form.password.length >= 6 && form.password === form.confirm;

  const Field = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 block">{label}</label>
      <Input {...props} className="h-11 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white focus:border-primary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#08090a] flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex flex-col w-[40%] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-[#0c0d0e] dark:to-[#131415] text-white p-12 relative overflow-hidden justify-between">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800')] bg-cover bg-center opacity-5" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
          </Link>
          <h1 className="text-5xl font-black tracking-tighter leading-tight mb-6">Join the<br />AyurPooja<br /><span className="text-primary italic">Family.</span></h1>
          <p className="text-slate-400 font-medium max-w-xs leading-relaxed">Get access to exclusive deals, fast delivery, and a premium shopping experience.</p>
        </div>
        <div className="relative z-10 p-6 bg-white/5 rounded-3xl border border-white/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-black text-sm">Referral Bonus!</p>
              <p className="text-slate-400 text-xs font-medium mt-1">Enter a referral code during registration to earn ₹100 wallet credits instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Store className="w-4 h-4 text-primary" />
          </div>
          <span className="font-black text-xl text-slate-900 dark:text-white tracking-tighter uppercase">Ayur<span className="text-primary italic">Pooja</span></span>
        </Link>

        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Create Account</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">Fill in your details to get started</p>

                <div className="space-y-3.5">
                  <Field label="Full Name" type="text" placeholder="Ravi Kumar" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <Field label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 block">Phone</label>
                    <div className="flex gap-2">
                      <div className="w-14 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-500 shrink-0">+91</div>
                      <Input type="tel" placeholder="98765 43210" maxLength={10} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="h-11 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 font-bold" />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 block">Password</label>
                    <Input type={showPassword ? "text" : "password"} placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className="h-11 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 font-bold pr-10" />
                    <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-8 text-slate-400 hover:text-primary transition-colors">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <Field label="Confirm Password" type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 block">Referral Code <span className="normal-case font-normal tracking-normal text-slate-400">(optional)</span></label>
                    <Input type="text" placeholder="e.g. AYUR100" value={form.referral} onChange={e => setForm(f => ({ ...f, referral: e.target.value.toUpperCase() }))} className="h-11 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 font-bold tracking-widest" />
                  </div>
                </div>

                <Button onClick={handleSubmit} disabled={!isFormValid || loading} className="w-full h-12 bg-primary rounded-2xl font-black text-[13px] tracking-wide shadow-lg shadow-primary/25 mt-6 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  {loading ? "Creating Account..." : <span className="flex items-center gap-2">Create Account <ArrowRight className="w-4 h-4" /></span>}
                </Button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep("form")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-8 font-bold">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">Verify Number</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">OTP sent to <span className="font-bold text-slate-700 dark:text-slate-200">+91 {form.phone}</span></p>

                <div className="flex gap-2 mb-6 justify-center">
                  {otp.map((d, i) => (
                    <input key={i} ref={el => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d}
                      onChange={e => handleOtpChange(i, e.target.value)} onKeyDown={e => handleOtpKey(i, e)}
                      className="w-12 h-14 text-center text-xl font-black rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary outline-none transition-all" />
                  ))}
                </div>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {canResend ? <button className="text-primary font-bold hover:underline">Resend OTP</button>
                    : <span>Resend in <span className="font-bold text-slate-700 dark:text-slate-200">{timer}s</span></span>}
                </div>

                <Button onClick={handleVerify} disabled={otp.join("").length < 6 || loading} className="w-full h-12 bg-primary rounded-2xl font-black text-[13px] tracking-wide shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  {loading ? "Creating Account..." : "Verify & Create Account 🎉"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
