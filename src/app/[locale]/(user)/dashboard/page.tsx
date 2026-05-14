"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Wallet, 
  Tag, 
  Users, 
  ChevronRight, 
  ArrowRight, 
  Package, 
  Clock, 
  MapPin, 
  Zap 
} from "lucide-react";
import UserLayout from "@/components/UserLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/users/me/stats");
        if (res.data.status === "success") {
          setStats(res.data.data.stats);
          setRecentOrders(res.data.data.recentOrders);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: t("total_orders"), value: stats?.orderCount || "0", icon: ShoppingBag, color: "bg-blue-500/10 text-blue-500", href: "/orders" },
    { label: t("wallet_balance"), value: `₹${Number(stats?.walletBalance || 0).toLocaleString()}`, icon: Wallet, color: "bg-emerald-500/10 text-emerald-500", href: "/wallet" },
    { label: t("coupons"), value: stats?.couponCount || "0", icon: Tag, color: "bg-amber-500/10 text-amber-500", href: "/coupons" },
    { label: t("referrals"), value: stats?.referralCount || "0", icon: Users, color: "bg-purple-500/10 text-purple-500", href: "/referral" },
  ];

  return (
    <UserLayout title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-8 lg:p-2">
        
        {/* Unified Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-[1.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5" />
            ))
          ) : (
            statCards.map((stat, idx) => (
              <Link key={stat.label} href={stat.href}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-[#0c0d0e] p-5 rounded-[1.5rem] border border-slate-100 dark:border-white/5 relative group cursor-pointer hover:border-primary/30 hover:shadow-xl transition-all h-full"
                >
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-lg tracking-tight uppercase text-[15px] flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" /> {t("recent_orders")}
              </h3>
              <Link href="/orders" className="text-xs font-black uppercase text-primary tracking-widest hover:underline">
                {t("view_all")}
              </Link>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl bg-white dark:bg-white/5" />)
              ) : recentOrders.length === 0 ? (
                <div className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-center">
                   <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No orders yet</p>
                </div>
              ) : (
                recentOrders.map((order, idx) => (
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.4 }}
                    className="bg-white dark:bg-[#0c0d0e] p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-slate-100 dark:border-white/5 group-hover:border-primary/20 transition-colors">
                        <Clock className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">#{order.orderNumber.split('-').slice(-1)}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {format(new Date(order.createdAt), 'MMM dd, yyyy')} • {order.items.length} {t("items")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:block text-right">
                        <p className="font-black text-sm text-slate-900 dark:text-white">₹{Number(order.payableAmount).toLocaleString()}</p>
                        <Badge className={`mt-1 border-0 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          order.orderStatus === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-500' : 
                          order.orderStatus === 'PROCESSING' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                        }`}>
                          {t(order.orderStatus.toLowerCase())}
                        </Badge>
                      </div>
                      <Link href={`/orders/${order.id}`}>
                        <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                           <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <h3 className="font-black text-lg tracking-tight uppercase text-[15px] flex items-center gap-2 px-2">
              <Zap className="w-4 h-4 text-primary" /> {t("navigation")}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: t("my_addresses"), icon: MapPin, href: "/profile/addresses", desc: t("manage_addresses") },
                { label: t("my_wallet"), icon: Wallet, href: "/wallet", desc: t("refill_wallet") },
                { label: t("coupons"), icon: Tag, href: "/coupons", desc: t("apply_codes") },
                { label: t("refer_earn"), icon: Users, href: "/referral", desc: t("share_friends") },
              ].map((link, idx) => (
                <Link key={link.label} href={link.href}>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.6 }}
                    className="p-4 bg-white dark:bg-[#0c0d0e] rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-900 group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary shadow-sm border border-slate-100 dark:border-white/5 transition-colors">
                          <link.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{link.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{link.desc}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}

// Simple Date formatter since we don't have date-fns imported here yet, 
// wait I should check if it's there. 
// Standard JS Intl.DateTimeFormat can be used instead.
function format(date: Date, options: string) {
  // Simple mock of date-fns format for now
  return date.toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' });
}
