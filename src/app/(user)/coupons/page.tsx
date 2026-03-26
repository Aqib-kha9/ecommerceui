"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Copy, CheckCircle2, Clock, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/UserLayout";

const allCoupons = [
  { code: "SAVE50", type: "percent", value: 50, minOrder: 999, maxDiscount: 250, expiry: "31 Mar 2026", category: "All", isUsed: false },
  { code: "FRESH100", type: "flat", value: 100, minOrder: 499, maxDiscount: 100, expiry: "5 Apr 2026", category: "Groceries", isUsed: false },
  { code: "BEAUTY20", type: "percent", value: 20, minOrder: 799, maxDiscount: 400, expiry: "10 Apr 2026", category: "Beauty", isUsed: false },
  { code: "FIRST200", type: "flat", value: 200, minOrder: 599, maxDiscount: 200, expiry: "30 Apr 2026", category: "All", isUsed: false },
  { code: "PKG15", type: "percent", value: 15, minOrder: 1499, maxDiscount: 300, expiry: "15 Apr 2026", category: "Packages", isUsed: false },
  { code: "OLDOFFER", type: "flat", value: 75, minOrder: 299, maxDiscount: 75, expiry: "20 Mar 2026", category: "All", isUsed: true },
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
    <UserLayout title="My Coupons" subtitle={`${allCoupons.filter(c => !c.isUsed && new Date(c.expiry) >= now).length} coupons available`}>
      <div className="max-w-lg">
        <div className="flex gap-1 mb-4">
          {(["all", "available", "expired"] as FilterType[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-black capitalize transition-all ${filter === f ? "bg-primary text-white" : "bg-white dark:bg-[#0c0d0e] text-slate-500 border border-slate-200 dark:border-white/10"}`}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16"><Tag className="w-12 h-12 text-slate-200 mx-auto mb-3" /><p className="font-bold text-slate-500">No coupons</p></div>
          )}
          {filtered.map((coupon, i) => {
            const isExpired = new Date(coupon.expiry) < now || coupon.isUsed;
            return (
              <motion.div key={coupon.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`bg-white dark:bg-[#0c0d0e] rounded-[2rem] border shadow-sm overflow-hidden ${isExpired ? "border-slate-100 dark:border-white/5 opacity-60" : "border-primary/20"}`}>
                <div className={`relative px-5 py-4 ${isExpired ? "bg-slate-50 dark:bg-white/5" : "bg-primary/[0.03]"}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-xl tracking-widest text-slate-900 dark:text-white">{coupon.code}</p>
                      <p className="text-xs font-bold text-primary mt-0.5">
                        {coupon.type === "percent" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                        {coupon.type === "percent" && ` (max ₹${coupon.maxDiscount})`}
                      </p>
                    </div>
                    {!isExpired ? (
                      <button onClick={() => handleCopy(coupon.code)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${copied === coupon.code ? "bg-green-500 text-white" : "bg-primary text-white"}`}>
                        {copied === coupon.code ? <><CheckCircle2 className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                    ) : (
                      <Badge className="bg-slate-200 dark:bg-white/10 text-slate-500 border-0 font-bold rounded-full text-[10px]">{coupon.isUsed ? "Used" : "Expired"}</Badge>
                    )}
                  </div>
                  <div className="absolute -bottom-px left-4 right-4 border-b border-dashed border-slate-200 dark:border-white/10" />
                </div>
                <div className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> Min. ₹{coupon.minOrder}</span>
                    {coupon.category !== "All" && <Badge className="bg-primary/5 text-primary border-0 rounded-full text-[10px] font-bold">{coupon.category}</Badge>}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className={`font-bold ${isExpired ? "text-red-400" : "text-slate-500"}`}>{isExpired ? "Expired" : coupon.expiry}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </UserLayout>
  );
}
