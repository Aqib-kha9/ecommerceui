"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Bell, 
  Moon, 
  Sun, 
  Monitor, 
  LogOut, 
  ChevronRight, 
  Check, 
  Trash2, 
  Shield, 
  Type, 
  Settings2,
  Lock,
  Smartphone,
  Info,
  Tag,
  Users
} from "lucide-react";
import { useTheme } from "next-themes";
import UserLayout from "@/components/UserLayout";
import { useFont, fonts, type FontId } from "@/components/FontProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧", desc: "Global Standard" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳", desc: "Regional Favorite" },
  { code: "te", label: "Telugu", native: "తెలుగు", flag: "🏳️", desc: "Dravidian Classic" },
];

export default function SettingsPage() {
  const [selectedLang, setSelectedLang] = useState("en");
  const { theme, setTheme } = useTheme();
  const { font, setFont } = useFont();
  const [notifToggles, setNotifToggles] = useState({ 
    orderUpdates: true, 
    offers: true, 
    referrals: true, 
    wallet: false 
  });

  const toggle = (key: keyof typeof notifToggles) => setNotifToggles(p => ({ ...p, [key]: !p[key] }));

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle} 
      className={cn(
        "relative w-11 h-6 rounded-full transition-all duration-300",
        on ? "bg-primary shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)]" : "bg-slate-200 dark:bg-white/10"
      )}
    >
      <span className={cn(
        "absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
        on ? "left-6" : "left-1"
      )} />
    </button>
  );

  return (
    <UserLayout title="Settings" subtitle="Personalize your AyurPooja experience">
      <div className="space-y-10 pb-16">
        
        {/* Flagship Language Module */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
               <Globe className="w-4 h-4" />
            </div>
            <div>
               <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase italic">Language Selection</h3>
               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Choose your preferred display language</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedLang(lang.code)}
                className={cn(
                  "relative group flex flex-col items-center p-5 rounded-[2rem] border transition-all duration-300",
                  selectedLang === lang.code 
                    ? "bg-white dark:bg-slate-900 border-primary/40 shadow-xl shadow-primary/5" 
                    : "bg-white dark:bg-[#0c0d0e] border-slate-100 dark:border-white/5 hover:border-primary/10"
                )}
              >
                {selectedLang === lang.code && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {lang.flag}
                </div>
                <h4 className={cn(
                  "text-sm font-black tracking-tight",
                  selectedLang === lang.code ? "text-primary" : "text-slate-900 dark:text-white"
                )}>
                  {lang.label}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">{lang.native}</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Visual Settings Suite - Symmetrical 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start font-sans">
           
           {/* Appearance Card */}
           <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-9 h-9 bg-sky-50 dark:bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
                    <Sun className="w-4.5 h-4.5" />
                 </div>
                 <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">Appearance</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Theme selection</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", icon: Sun, label: "Light" },
                  { id: "dark", icon: Moon, label: "Dark" },
                  { id: "system", icon: Monitor, label: "Auto" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex flex-col items-center justify-center py-3 rounded-2xl border transition-all duration-300",
                      theme === t.id 
                        ? "bg-primary text-white border-primary/50 shadow-md shadow-primary/10" 
                        : "bg-slate-50 dark:bg-white/5 border-transparent text-slate-500 hover:border-slate-100 dark:hover:border-white/10"
                    )}
                  >
                    <t.icon className="w-4 h-4 mb-1.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{t.label}</span>
                  </button>
                ))}
              </div>
           </div>

           {/* Font Style Card */}
           <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-6 flex flex-col shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-9 h-9 bg-violet-50 dark:bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-500">
                    <Type className="w-4.5 h-4.5" />
                 </div>
                 <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white tracking-widest uppercase">Font Style</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Global Typeface</p>
                 </div>
              </div>

              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                 {fonts.map(f => (
                   <button 
                     key={f.id} 
                     onClick={() => setFont(f.id as FontId)}
                     className={cn(
                       "w-full flex items-center justify-between p-2 rounded-xl border transition-all duration-300 group",
                       font === f.id 
                        ? "bg-white dark:bg-slate-800 border-primary/40 shadow-sm" 
                        : "bg-slate-50/50 dark:bg-white/[0.03] border-transparent hover:border-slate-100 dark:hover:border-white/5"
                     )}
                   >
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                          <span className={cn(font === f.id ? "text-primary" : "text-slate-400")}>Aa</span>
                        </div>
                        <div className="text-left">
                           <p className={cn("text-[10px] font-black uppercase tracking-widest", font === f.id ? "text-primary" : "text-slate-800 dark:text-white")}>{f.label}</p>
                           <p className="text-[8px] text-slate-400 font-bold italic">{f.preview}</p>
                        </div>
                     </div>
                     {font === f.id && <div className="w-3.5 h-3.5 bg-primary text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Notifications Dashboard - Full Width Base */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
              <Bell className="w-32 h-32 -mr-8 -mt-8" />
           </div>

           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                    <Bell className="w-5 h-5 " />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase italic leading-none mb-1">Alert Center</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Communication preferences</p>
                 </div>
              </div>
              <Button variant="outline" className="rounded-lg h-8 px-4 font-black text-[8px] uppercase tracking-widest border-slate-100 dark:border-white/10">Silent Mode Off</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10 font-sans">
              {[
                { key: "orderUpdates" as const, label: "Order Tracking", desc: "Live delivery alerts", icon: <Package className="w-3.5 h-3.5 text-primary" /> },
                { key: "offers" as const, label: "Flash Sales", desc: "Exclusive early discounts", icon: <Tag className="w-3.5 h-3.5 text-emerald-500" /> },
                { key: "referrals" as const, label: "Referral Alerts", desc: "Instant credit rewards", icon: <Users className="w-3.5 h-3.5 text-violet-500" /> },
                { key: "wallet" as const, label: "Financial Alerts", desc: "Wallet transaction alerts", icon: <Shield className="w-3.5 h-3.5 text-amber-500" /> },
              ].map(({ key, label, desc, icon }) => (
                <div key={key} className="flex items-center justify-between group/item p-3 hover:bg-slate-50 dark:hover:bg-white/[0.02] rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                        {icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{label}</p>
                        <p className="text-[9px] text-slate-400 font-bold mt-0.5">{desc}</p>
                      </div>
                   </div>
                   <Toggle on={notifToggles[key]} onToggle={() => toggle(key)} />
                </div>
              ))}
           </div>
        </div>

        {/* Security & Account - Danger Zone */}
        <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-white/5">
           <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center">
                 <Lock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase italic">Security Center</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              <div className="bg-white dark:bg-[#0c0d0e] rounded-[1.5rem] border border-slate-100 dark:border-white/5 divide-y divide-slate-50 dark:divide-white/5 shadow-sm overflow-hidden">
                <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">Privacy Policy</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">Terms of Service</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </button>
              </div>

              <div className="bg-red-50/20 dark:bg-red-950/5 rounded-[1.5rem] border border-red-100/50 dark:border-red-900/10 divide-y divide-red-100/50 dark:divide-red-900/10 shadow-sm overflow-hidden font-sans">
                <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 dark:hover:bg-red-500/5 transition-all text-red-500">
                  <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-500">
                    <LogOut className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Sign Out Session</span>
                </button>
                <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-100 dark:hover:bg-red-500/10 transition-all text-red-600">
                  <div className="w-7 h-7 rounded-lg bg-red-500 text-white flex items-center justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Delete Account</span>
                </button>
              </div>
           </div>
        </div>

        <div className="pt-8 text-center space-y-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] italic">AyurPooja Global v1.2.0</p>
            <div className="flex items-center justify-center gap-4">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Systems Operational & Secure</span>
            </div>
        </div>

      </div>
    </UserLayout>
  );
}

const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
