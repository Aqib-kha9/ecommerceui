"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Info, 
  TrendingUp, 
  Plus, 
  History, 
  CreditCard, 
  Smartphone, 
  Search,
  Download,
  CheckCircle2,
  X,
  Zap,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import UserLayout from "@/components/UserLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, type: "credit", label: "Referral Reward — Priya S.", amount: 100, date: "27 Mar 2026", desc: "Referral bonus credited", method: "Referral" },
  { id: 2, type: "debit", label: "Order #ORD-8821", amount: 100, date: "27 Mar 2026", desc: "Used for checkout", method: "Wallet" },
  { id: 3, type: "credit", label: "Cashback — Order #ORD-8790", amount: 50, date: "25 Mar 2026", desc: "5% cashback offer", method: "Cashback" },
  { id: 4, type: "credit", label: "Referral Reward — Arjun K.", amount: 100, date: "22 Mar 2026", desc: "Referral bonus credited", method: "Referral" },
  { id: 5, type: "credit", label: "Refund — Order #ORD-8701", amount: 698, date: "20 Mar 2026", desc: "Refund for cancelled order", method: "Refund" },
  { id: 6, type: "debit", label: "Order #ORD-8680", amount: 500, date: "15 Mar 2026", desc: "Used for checkout", method: "Wallet" },
  { id: 7, type: "credit", label: "Welcome Bonus", amount: 100, date: "10 Mar 2026", desc: "New user welcome bonus", method: "System" },
];

export default function WalletPage() {
  const [balance, setBalance] = useState(1250);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalEarned = transactions.filter(t => t.type === "credit").reduce((a, t) => a + t.amount, 0);
  const totalUsed = transactions.filter(t => t.type === "debit").reduce((a, t) => a + t.amount, 0);
  
  const filtered = transactions.filter(t => filter === "all" || t.type === filter);

  const handleAddMoney = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev + Number(amountToAdd));
      setIsProcessing(false);
      setShowAddMoney(false);
      setAmountToAdd("");
    }, 1500);
  };

  return (
    <UserLayout title="My Wallet" subtitle="Balanced financial overview and secure payments">
      <div className="space-y-8 pb-12">
        
        {/* Uniform Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Compact Wallet Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group"
          >
            <div className="relative h-full bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-8 border border-white/5 shadow-xl overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-24 -mt-24" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Wallet Balance</span>
                </div>
                <h2 className="text-4xl font-black text-white tracking-tighter italic">₹{balance.toLocaleString()}</h2>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-3 mt-6">
                <Button 
                  onClick={() => setShowAddMoney(true)}
                  className="bg-primary text-white hover:bg-primary/90 rounded-xl px-6 h-11 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Top Up
                </Button>
                <div className="h-11 px-4 flex items-center gap-2 bg-white/5 rounded-xl border border-white/10">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Secured</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Symmetrical Stats Display */}
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <ArrowDownLeft className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Earned</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">₹{totalEarned.toLocaleString()}</p>
                </div>
             </div>

             <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 flex flex-col justify-between shadow-sm">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-6 h-6 text-red-500" />
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Used</p>
                   <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">₹{totalUsed.toLocaleString()}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Unified Transaction History (Compact List) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <History className="w-5 h-5 text-slate-400" />
               <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase">Transaction Activity</h3>
             </div>
             
             <div className="flex gap-1 bg-slate-50 dark:bg-white/5 p-1 rounded-xl border border-slate-100 dark:border-white/10">
                {(["all", "credit", "debit"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      filter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    )}>
                    {f}
                  </button>
                ))}
             </div>
          </div>

          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-white/5">
             {filtered.map((txn, i) => (
               <div key={txn.id} className="group flex items-center gap-4 px-8 py-5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01]">
                 <div className={cn(
                   "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-transparent transition-all",
                   txn.type === "credit" ? "bg-emerald-50 dark:bg-emerald-500/10" : "bg-red-50 dark:bg-red-500/10"
                 )}>
                   {txn.type === "credit" ? <ArrowDownLeft className="w-4 h-4 text-emerald-500" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                   <p className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-tight mb-0.5">{txn.label}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{txn.date} • {txn.method}</p>
                 </div>

                 <div className="text-right">
                   <p className={cn(
                     "text-lg font-black italic tracking-tighter",
                     txn.type === 'credit' ? 'text-emerald-500' : 'text-red-500'
                   )}>
                     {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                   </p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Compact Referral CTA */}
        <Link href="/referral" className="block bg-primary/5 rounded-[2rem] p-6 border border-primary/10 hover:bg-primary/10 transition-all">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white">Earn Credits</h4>
                    <p className="text-[10px] text-slate-500 font-bold">Refer friends and get ₹100 instantly.</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
           </div>
        </Link>

        {/* Add Money Modal (Sized Properly) */}
        <AnimatePresence>
          {showAddMoney && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowAddMoney(false)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Deposit Funds</h2>
                     <button onClick={() => setShowAddMoney(false)} className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400">
                        <X className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Amount (₹)</label>
                       <input 
                         type="number" 
                         value={amountToAdd}
                         onChange={(e) => setAmountToAdd(e.target.value)}
                         placeholder="500"
                         className="w-full h-12 px-4 bg-slate-50 dark:bg-slate-900 border-0 rounded-xl font-black text-xl italic text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 transition-all"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                       <div className="p-4 rounded-xl border-2 border-primary bg-primary/5 flex flex-col items-center gap-2 cursor-pointer">
                          <CreditCard className="w-5 h-5 text-primary" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-primary">Card</span>
                       </div>
                       <div className="p-4 rounded-xl border-2 border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                          <Smartphone className="w-5 h-5 text-slate-400" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">UPI</span>
                       </div>
                    </div>

                    <Button 
                      onClick={handleAddMoney}
                      disabled={isProcessing || !amountToAdd}
                      className="w-full h-12 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 mt-2 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      {isProcessing ? "Processing..." : "Authorize"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </UserLayout>
  );
}

