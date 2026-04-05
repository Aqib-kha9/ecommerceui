"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Tag, 
  Copy, 
  CheckCircle2, 
  Clock, 
  ShoppingCart, 
  Search, 
  ChevronRight, 
  Info,
  Gift,
  Zap,
  Ticket
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/UserLayout";
import { cn } from "@/lib/utils";

const allCoupons = [
  { code: "SAVE50", type: "percent", value: 50, minOrder: 999, maxDiscount: 250, expiry: "31 Mar 2026", category: "All", isUsed: false, desc: "Get 50% off on all products above ₹999." },
  { code: "FRESH100", type: "flat", value: 100, minOrder: 499, maxDiscount: 100, expiry: "5 Apr 2026", category: "Groceries", isUsed: false, desc: "Flat ₹100 off on fresh groceries." },
  { code: "BEAUTY20", type: "percent", value: 20, minOrder: 799, maxDiscount: 400, expiry: "10 Apr 2026", category: "Beauty", isUsed: false, desc: "20% Discount on premium skin care products." },
  { code: "FIRST200", type: "flat", value: 200, minOrder: 599, maxDiscount: 200, expiry: "30 Apr 2026", category: "All", isUsed: false, desc: "Welcome gift! Flat ₹200 off on your first order." },
  { code: "PKG15", type: "percent", value: 15, minOrder: 1499, maxDiscount: 300, expiry: "15 Apr 2026", category: "Packages", isUsed: false, desc: "Special discount on all Pooja packages." },
  { code: "OLDOFFER", type: "flat", value: 75, minOrder: 299, maxDiscount: 75, expiry: "20 Mar 2026", category: "All", isUsed: true, desc: "Old promotional offer for returning users." },
];

type FilterType = "all" | "available" | "expired";

export default function CouponsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("available");
  const now = new Date("2026-03-27");

  const filtered = allCoupons.filter(c => {
    const isExpired = new Date(c.expiry) < now || c.isUsed;
    if (filter === "available") return !isExpired;
    if (filter === "expired") return isExpired;
    return true;
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <UserLayout title="My Coupons" subtitle="Exclusive rewards and discount vouchers">
      <div className="space-y-8 pb-12">
        
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white dark:bg-[#0c0d0e] p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex gap-2 bg-slate-50 dark:bg-white/5 p-1 rounded-2xl border border-slate-100 dark:border-white/10 w-fit">
            {(["all", "available", "expired"] as FilterType[]).map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                  filter === f 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Enter promo code..." 
              className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-white/5 border-0 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full text-center py-32 bg-white dark:bg-[#0c0d0e] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-sm"
              >
                <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <Ticket className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">No vouchers found</h3>
                <p className="text-sm text-slate-400 font-bold mt-2">Check back later for new promotional offers.</p>
              </motion.div>
            ) : (
              filtered.map((coupon, i) => {
                const isExpired = new Date(coupon.expiry) < now || coupon.isUsed;
                return (
                  <motion.div 
                    key={coupon.code} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "group relative bg-white dark:bg-[#0c0d0e] flex flex-col sm:flex-row items-stretch min-h-[180px] rounded-[2.5rem] border overflow-visible transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5",
                      isExpired ? "border-slate-100 dark:border-white/5 opacity-60 grayscale-[0.5]" : "border-primary/20"
                    )}
                  >
                    {/* Circle Cutouts (Left Edge) */}
                    <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-[#f4f6fa] dark:bg-[#090b0f] rounded-full border-r border-slate-100 dark:border-white/10 z-10 hidden sm:block" />
                    
                    {/* Left Section (Value focal point) */}
                    <div className={cn(
                      "w-full sm:w-48 p-8 flex flex-col items-center justify-center text-center relative",
                      !isExpired && "bg-primary/[0.03]"
                    )}>
                      <div className="relative">
                        <p className={cn(
                          "text-4xl font-black leading-none italic",
                          isExpired ? "text-slate-400" : "text-primary"
                        )}>
                          {coupon.type === "percent" ? `${coupon.value}%` : `₹${coupon.value}`}
                        </p>
                        <p className={cn(
                          "text-[10px] font-black uppercase tracking-[0.2em] mt-1",
                          isExpired ? "text-slate-300" : "text-primary/60"
                        )}>OFF</p>
                      </div>
                      
                      {/* Vertical Dashed Line (Desktop Only) */}
                      <div className="absolute top-6 bottom-6 right-0 border-r-2 border-dashed border-slate-100 dark:border-white/5 hidden sm:block" />
                    </div>

                    {/* Right Section (Details) */}
                    <div className="flex-1 p-8 pt-4 sm:pt-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Badge className={cn("border-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm", 
                              isExpired ? "bg-slate-100 text-slate-400" : "bg-primary text-white shadow-primary/20"
                            )}>
                              {coupon.code}
                            </Badge>
                            {coupon.category !== "All" && (
                              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border-slate-100 dark:border-white/5 text-slate-400">
                                {coupon.category}
                              </Badge>
                            )}
                          </div>
                          {isExpired && (
                            <Badge variant="ghost" className="text-[10px] font-black uppercase text-red-400 p-0">
                             {coupon.isUsed ? "Used" : "Expired"}
                            </Badge>
                          )}
                        </div>
                        <h4 className="text-[13px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight leading-snug">
                          {coupon.desc}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 mt-4 text-[11px] font-bold text-slate-400">
                          <span className="flex items-center gap-1.5"><ShoppingCart className="w-3.5 h-3.5 text-primary/50" /> Min. ₹{coupon.minOrder}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary/50" /> Ends: {coupon.expiry}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6 sm:mt-0">
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group/terms">
                          <Info className="w-3.5 h-3.5" /> Terms Applied <ChevronRight className="w-3 h-3 group-hover/terms:translate-x-0.5 transition-transform" />
                        </button>
                        
                        {!isExpired && (
                          <Button 
                            onClick={() => handleCopy(coupon.code)}
                            className={cn(
                              "h-10 rounded-xl px-6 font-black text-[10px] uppercase tracking-widest shadow-xl transition-all",
                              copied === coupon.code 
                                ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                                : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:scale-105"
                            )}
                          >
                            {copied === coupon.code ? <><CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Copied!</> : <><Copy className="w-3.5 h-3.5 mr-2" /> Copy Code</>}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Circle Cutouts (Right Edge) */}
                    <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-[#f4f6fa] dark:bg-[#090b0f] rounded-full border-l border-slate-100 dark:border-white/10 z-10 hidden sm:block" />
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 rounded-[2.5rem] border border-primary/10 p-8 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-16 h-16 bg-primary text-white rounded-3xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Gift className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tighter uppercase">Win more coupons!</h3>
            <p className="text-sm text-slate-500 font-bold mt-1">Refer your friends to AyurPooja and earn exclusive vouchers for your next bookings.</p>
          </div>
          <Button className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[11px] uppercase tracking-widest px-8 h-12 shadow-xl shadow-slate-950/20">
            Refer Friend <Zap className="w-3.5 h-3.5 ml-2 fill-current" />
          </Button>
        </motion.div>
      </div>
    </UserLayout>
  );
}
