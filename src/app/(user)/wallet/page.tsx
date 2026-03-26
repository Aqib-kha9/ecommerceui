"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ArrowDownLeft, ArrowUpRight, Info, TrendingUp } from "lucide-react";
import Link from "next/link";
import UserLayout from "@/components/UserLayout";

const transactions = [
  { id: 1, type: "credit", label: "Referral Reward — Priya S.", amount: 100, date: "27 Mar 2026", desc: "Referral bonus credited" },
  { id: 2, type: "debit", label: "Order #ORD-8821", amount: 100, date: "27 Mar 2026", desc: "Used for checkout" },
  { id: 3, type: "credit", label: "Cashback — Order #ORD-8790", amount: 50, date: "25 Mar 2026", desc: "5% cashback offer" },
  { id: 4, type: "credit", label: "Referral Reward — Arjun K.", amount: 100, date: "22 Mar 2026", desc: "Referral bonus credited" },
  { id: 5, type: "credit", label: "Refund — Order #ORD-8701", amount: 698, date: "20 Mar 2026", desc: "Refund for cancelled order" },
  { id: 6, type: "debit", label: "Order #ORD-8680", amount: 500, date: "15 Mar 2026", desc: "Used for checkout" },
  { id: 7, type: "credit", label: "Welcome Bonus", amount: 100, date: "10 Mar 2026", desc: "New user welcome bonus" },
];

export default function WalletPage() {
  const balance = 1250;
  const totalEarned = transactions.filter(t => t.type === "credit").reduce((a, t) => a + t.amount, 0);
  const totalUsed = transactions.filter(t => t.type === "debit").reduce((a, t) => a + t.amount, 0);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const filtered = transactions.filter(t => filter === "all" || t.type === filter);

  return (
    <UserLayout title="My Wallet" subtitle="Credits can be redeemed at checkout">
      <div className="max-w-lg space-y-4">
        {/* Balance Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-primary to-primary/70 rounded-[2rem] p-7 text-white overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2"><Wallet className="w-5 h-5 opacity-80" /><span className="text-[11px] font-black uppercase tracking-widest opacity-70">AyurPooja Wallet</span></div>
            <p className="text-5xl font-black tracking-tighter mb-1">₹{balance.toLocaleString()}</p>
            <p className="text-white/60 text-sm font-medium">Available Balance</p>
            <div className="mt-5 flex items-start gap-2 bg-white/10 rounded-2xl p-3.5">
              <Info className="w-4 h-4 shrink-0 opacity-80 mt-0.5" />
              <p className="text-xs font-bold opacity-80 leading-relaxed">Wallet credits can only be used for purchases.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 dark:bg-green-500/10 rounded-[1.5rem] p-4 border border-green-100 dark:border-green-500/20">
            <div className="flex items-center gap-2 mb-2"><ArrowDownLeft className="w-4 h-4 text-green-600" /><span className="text-[10px] font-black uppercase tracking-widest text-green-600/70">Total Earned</span></div>
            <p className="text-2xl font-black text-green-700 dark:text-green-400">₹{totalEarned}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-500/10 rounded-[1.5rem] p-4 border border-red-100 dark:border-red-500/20">
            <div className="flex items-center gap-2 mb-2"><ArrowUpRight className="w-4 h-4 text-red-500" /><span className="text-[10px] font-black uppercase tracking-widest text-red-500/70">Total Used</span></div>
            <p className="text-2xl font-black text-red-600 dark:text-red-400">₹{totalUsed}</p>
          </div>
        </div>

        <Link href="/referral" className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="font-black text-sm text-slate-900 dark:text-white">Earn More Credits</p>
            <p className="text-xs text-slate-500 mt-0.5">Refer friends → earn ₹100 per referral!</p>
          </div>
        </Link>

        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400">Transactions</h3>
            <div className="flex gap-1">
              {(["all", "credit", "debit"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black capitalize transition-all ${filter === f ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          {filtered.map((txn, i) => (
            <div key={txn.id} className={`flex items-center gap-4 px-5 py-4 ${i !== filtered.length - 1 ? "border-b border-slate-50 dark:border-white/5" : ""}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${txn.type === "credit" ? "bg-green-50 dark:bg-green-500/10" : "bg-red-50 dark:bg-red-500/10"}`}>
                {txn.type === "credit" ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{txn.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{txn.date} · {txn.desc}</p>
              </div>
              <span className={`font-black text-sm shrink-0 ${txn.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}
