"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Bell, Moon, LogOut, ChevronRight, Check, Trash2, Shield, Type } from "lucide-react";
import { useTheme } from "next-themes";
import UserLayout from "@/components/UserLayout";
import { useFont, fonts, type FontId } from "@/components/FontProvider";

const languages = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "te", label: "Telugu", native: "తెలుగు", flag: "🏳️" },
];

export default function SettingsPage() {
  const [selectedLang, setSelectedLang] = useState("en");
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const [notifToggles, setNotifToggles] = useState({ orderUpdates: true, offers: true, referrals: true, wallet: false });

  const toggle = (key: keyof typeof notifToggles) => setNotifToggles(p => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`relative w-12 h-6 rounded-full transition-colors ${on ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}>
      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-7" : "left-1"}`} />
    </button>
  );

  return (
    <UserLayout title="Settings" subtitle="Preferences & account options">
      <div className="max-w-lg space-y-4">
        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center"><Globe className="w-5 h-5 text-primary" /></div>
            <div><p className="font-black text-sm text-slate-900 dark:text-white">Language</p><p className="text-xs text-slate-400">App display language</p></div>
          </div>
          <div className="space-y-2">
            {languages.map(lang => (
              <button key={lang.code} onClick={() => setSelectedLang(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${selectedLang === lang.code ? "bg-primary/5 border-primary/30" : "border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${selectedLang === lang.code ? "text-primary" : "text-slate-800 dark:text-slate-200"}`}>{lang.label}</p>
                    <p className="text-xs text-slate-400">{lang.native}</p>
                  </div>
                </div>
                {selectedLang === lang.code && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Appearance ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center"><Moon className="w-5 h-5 text-slate-500" /></div>
            <div><p className="font-black text-sm text-slate-900 dark:text-white">Appearance</p><p className="text-xs text-slate-400">Light or dark theme</p></div>
          </div>
          <div className="flex gap-2">
            {["light", "dark", "system"].map(t => (
              <button key={t} onClick={() => setTheme(t)}
                className={`flex-1 py-3 rounded-2xl text-xs font-black capitalize border transition-all ${theme === t ? "bg-primary/10 border-primary text-primary" : "border-slate-100 dark:border-white/5 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Font ── */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center"><Type className="w-5 h-5 text-violet-500" /></div>
            <div><p className="font-black text-sm text-slate-900 dark:text-white">Font Style</p><p className="text-xs text-slate-400">Changes the app-wide typeface</p></div>
          </div>
          <div className="space-y-2">
            {fonts.map(f => (
              <button key={f.id} onClick={() => setFont(f.id as FontId)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${font === f.id ? "bg-primary/5 border-primary/30" : "border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
                <div className="flex items-center gap-4">
                  {/* Live font preview box */}
                  <div className={`w-12 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0`}
                    style={{ fontFamily: `var(--font-${f.id === "geist" ? "geist-sans" : f.id === "grotesk" ? "grotesk" : f.id})` }}>
                    <span className={`text-lg font-bold ${font === f.id ? "text-primary" : "text-slate-600 dark:text-slate-300"}`}>Aa</span>
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${font === f.id ? "text-primary" : "text-slate-800 dark:text-slate-200"}`}>{f.label}</p>
                    <p className="text-xs text-slate-400">{f.preview}</p>
                  </div>
                </div>
                {font === f.id && <Check className="w-4 h-4 text-primary shrink-0" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center"><Bell className="w-5 h-5 text-amber-500" /></div>
            <div><p className="font-black text-sm text-slate-900 dark:text-white">Notifications</p><p className="text-xs text-slate-400">Choose what you receive</p></div>
          </div>
          {[
            { key: "orderUpdates" as const, label: "Order Updates", desc: "Shipping & delivery alerts" },
            { key: "offers" as const, label: "Offers & Deals", desc: "Flash sales and discounts" },
            { key: "referrals" as const, label: "Referral Rewards", desc: "When friends join via your code" },
            { key: "wallet" as const, label: "Wallet Transactions", desc: "Credits & debits" },
          ].map(({ key, label, desc }, i, arr) => (
            <div key={key} className={`flex items-center justify-between px-5 py-4 ${i !== arr.length - 1 ? "border-b border-slate-50 dark:border-white/5" : ""}`}>
              <div><p className="font-bold text-sm text-slate-800 dark:text-slate-200">{label}</p><p className="text-xs text-slate-400 mt-0.5">{desc}</p></div>
              <Toggle on={notifToggles[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </motion.div>

        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-50 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account & Legal</p>
          </div>
          {[
            { icon: Shield, label: "Privacy Policy" },
            { icon: ChevronRight, label: "Terms of Service" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center justify-between px-5 py-4 border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{label}</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-500/10 border-b border-slate-50 dark:border-white/5 transition-colors text-red-500">
            <Trash2 className="w-4 h-4" /><span className="font-bold text-sm">Delete Account</span>
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-red-500">
            <LogOut className="w-4 h-4" /><span className="font-bold text-sm">Sign Out</span>
          </button>
        </motion.div>

        <p className="text-center text-xs text-slate-300 dark:text-slate-700 font-medium">AyurPooja v1.0.0</p>
      </div>
    </UserLayout>
  );
}
