"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, 
  Copy, 
  CheckCircle2, 
  Share2, 
  Users, 
  Clock, 
  Zap, 
  ChevronRight, 
  Smartphone, 
  Mail,
  ArrowRight,
  History as HistoryIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/UserLayout";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const referralHistory = [
  { id: 1, name: "Priya Sharma", date: "25 Mar 2026", status: "rewarded", reward: 100 },
  { id: 2, name: "Arjun Kumar", date: "20 Mar 2026", status: "rewarded", reward: 100 },
  { id: 3, name: "Sneha R.", date: "15 Mar 2026", status: "pending", reward: 100 },
  { id: 4, name: "Rahul M.", date: "10 Mar 2026", status: "rewarded", reward: 100 },
];

const steps = [
  { icon: <Users className="w-5 h-5" />, title: "Send Invite", desc: "Share your code with friends" },
  { icon: <Zap className="w-5 h-5" />, title: "They Signup", desc: "Friends join AyurPooja" },
  { icon: <Gift className="w-5 h-5" />, title: "Both Earn", desc: "Get ₹100 inside wallet" },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "RAVI-AYUR-2024";
  const totalEarned = referralHistory.filter(r => r.status === "rewarded").reduce((a, r) => a + r.reward, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UserLayout title="Refer & Earn" subtitle="Invite friends and build your AyurPooja community">
      <div className="space-y-8 pb-12">
        
        {/* Simplified & Uniform Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Main Referral Hero (Compact Version) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group h-full"
          >
            <div className="relative h-full bg-violet-600 dark:bg-violet-700 rounded-[2rem] p-8 sm:p-10 text-white overflow-hidden flex flex-col justify-between shadow-xl shadow-violet-600/20 transition-all hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Referral Program</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-3xl font-black tracking-tighter italic">Invite, Earn & Relax!</h2>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-relaxed">Give ₹100, Get ₹100 instantly</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10">
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Your Code</p>
                   <p className="text-xl font-black tracking-[0.15em] italic">{referralCode}</p>
                </div>
                <Button 
                  onClick={handleCopy}
                  className={cn(
                    "h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all shadow-lg border-0",
                    copied ? "bg-emerald-500 text-white" : "bg-white text-violet-600 hover:bg-white/90"
                  )}
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Symmetrical Stats Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-8 flex flex-col justify-between shadow-sm group hover:border-violet-500/20 transition-all">
                <div className="w-14 h-14 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-violet-500" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Referrals</p>
                   <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">{referralHistory.length}</p>
                </div>
             </div>

             <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-8 flex flex-col justify-between shadow-sm group hover:border-emerald-500/20 transition-all">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Rewards Won</p>
                   <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">₹{totalEarned}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Unified Step Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-slate-50 dark:bg-white/[0.03] rounded-3xl p-5 flex items-center gap-5 border border-transparent hover:border-slate-200 dark:hover:border-white/5 transition-all">
               <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                 {step.icon}
               </div>
               <div>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white">{step.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold leading-tight mt-0.5">{step.desc}</p>
               </div>
               {idx < 2 && (
                 <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white dark:bg-[#0c0d0e] border border-slate-100 dark:border-white/10 rounded-full items-center justify-center shadow-sm">
                    <ArrowRight className="w-3 h-3 text-slate-300" />
                 </div>
               )}
            </div>
          ))}
        </div>

        {/* Sharing Action Bar */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[1.5rem] border border-slate-100 dark:border-white/5 p-4 flex flex-wrap items-center justify-center gap-4 shadow-sm">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">Quick Share:</span>
           <Button variant="outline" className="h-9 px-4 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 bg-transparent border-slate-100 dark:border-white/10 hover:text-emerald-500 transition-all">
              <Smartphone className="w-3 h-3" /> WhatsApp
           </Button>
           <Button variant="outline" className="h-9 px-4 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 bg-transparent border-slate-100 dark:border-white/10 hover:text-blue-500 transition-all">
              <Share2 className="w-3 h-3" /> Telegram
           </Button>
           <Button variant="outline" className="h-9 px-4 rounded-lg font-black text-[9px] uppercase tracking-widest gap-2 bg-transparent border-slate-100 dark:border-white/10 hover:text-primary transition-all">
              <Mail className="w-3 h-3" /> Email
           </Button>
        </div>

        {/* History Section (Uniform List) */}
        <div className="space-y-6 pt-4">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl flex items-center justify-center">
                 <HistoryIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-widest uppercase">Referral Activity</h3>
           </div>

           <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-white/5">
                {referralHistory.map((r, i) => (
                  <div key={r.id} className="group flex items-center gap-5 px-8 py-5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-900 dark:text-white font-black text-sm italic">
                      {r.name[0]}
                    </div>
                    
                    <div className="flex-1">
                       <div className="flex items-center gap-2">
                         <span className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-tight">{r.name}</span>
                         <Badge className={cn(
                           "text-[7px] font-black uppercase tracking-[0.2em] px-2 py-0 border-0",
                           r.status === 'rewarded' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                         )}>
                           {r.status}
                         </Badge>
                       </div>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{r.date}</p>
                    </div>

                    <div className="text-right">
                       <p className={cn(
                         "text-lg font-black italic tracking-tighter leading-none",
                         r.status === 'rewarded' ? 'text-emerald-500' : 'text-slate-400'
                       )}>
                         {r.status === 'rewarded' ? `+₹${r.reward}` : '---'}
                       </p>
                    </div>
                  </div>
                ))}
           </div>
        </div>

      </div>
    </UserLayout>
  );
}

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
