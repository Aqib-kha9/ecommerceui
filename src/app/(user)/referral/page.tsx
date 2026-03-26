"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, CheckCircle2, Share2, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/UserLayout";

const referralHistory = [
  { name: "Priya Sharma", date: "25 Mar 2026", status: "rewarded", reward: 100 },
  { name: "Arjun Kumar", date: "20 Mar 2026", status: "rewarded", reward: 100 },
  { name: "Sneha R.", date: "15 Mar 2026", status: "pending", reward: 100 },
  { name: "Rahul M.", date: "10 Mar 2026", status: "rewarded", reward: 100 },
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
    <UserLayout title="Refer & Earn" subtitle="Earn ₹100 for every friend you invite">
      <div className="max-w-lg space-y-4">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-violet-600 to-primary rounded-[2rem] p-7 text-white overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center mb-5"><Gift className="w-7 h-7" /></div>
            <h2 className="text-3xl font-black tracking-tighter mb-1">Invite Friends,</h2>
            <h2 className="text-3xl font-black tracking-tighter mb-3 opacity-80">Earn Together!</h2>
            <p className="text-white/70 text-sm font-medium leading-relaxed">When your friend makes their first order, you both earn <span className="text-white font-black">₹100</span> wallet credits!</p>
          </div>
        </motion.div>

        {/* Referral Code */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">Your Referral Code</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl px-5 py-4 border border-slate-200 dark:border-white/10">
              <p className="font-black text-xl text-slate-900 dark:text-white tracking-widest">{referralCode}</p>
            </div>
            <Button onClick={handleCopy} size="icon" className={`w-12 h-12 rounded-2xl transition-all shrink-0 ${copied ? "bg-green-500 hover:bg-green-500" : "bg-primary"}`}>
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
          </div>
          {copied && <p className="text-green-600 text-xs font-bold mt-2 text-center">✓ Copied to clipboard!</p>}
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1 h-11 rounded-2xl font-bold text-sm border-slate-200 dark:border-white/10 gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </Button>
            <Button variant="outline" className="flex-1 h-11 rounded-2xl font-bold text-sm border-slate-200 dark:border-white/10 gap-2 hover:text-primary">
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[1.5rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <Users className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-black text-slate-900 dark:text-white">{referralHistory.length}</p>
            <p className="text-xs text-slate-400 font-medium">Total Referrals</p>
          </div>
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[1.5rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <Gift className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-2xl font-black text-green-600">₹{totalEarned}</p>
            <p className="text-xs text-slate-400 font-medium">Total Earned</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-1"><h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400">History</h3></div>
          {referralHistory.map((r, i) => (
            <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i !== referralHistory.length - 1 ? "border-b border-slate-50 dark:border-white/5" : ""}`}>
              <div className="w-10 h-10 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                <span className="font-black text-primary text-sm">{r.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{r.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5"><Clock className="w-3 h-3 text-slate-400" /><p className="text-xs text-slate-400">{r.date}</p></div>
              </div>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full ${r.status === "rewarded" ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600"}`}>
                {r.status === "rewarded" ? `+₹${r.reward}` : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
