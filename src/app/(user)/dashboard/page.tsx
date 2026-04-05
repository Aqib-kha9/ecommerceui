"use client";

import React from "react";
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
  ShieldCheck, 
  Zap 
} from "lucide-react";
import UserLayout from "@/components/UserLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockStats = [
  { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-500/10 text-blue-500", href: "/orders" },
  { label: "Wallet Balance", value: "₹1,250", icon: Wallet, color: "bg-emerald-500/10 text-emerald-500", href: "/wallet" },
  { label: "Coupons", value: "05", icon: Tag, color: "bg-amber-500/10 text-amber-500", href: "/coupons" },
  { label: "Referrals", value: "08", icon: Users, color: "bg-purple-500/10 text-purple-500", href: "/referral" },
];

const recentOrders = [
  { id: "#AP-9283", date: "Oct 24, 2024", status: "Delivered", items: 3, total: "₹450" },
  { id: "#AP-9284", date: "Oct 26, 2024", status: "Processing", items: 1, total: "₹1,299" },
  { id: "#AP-9285", date: "Oct 27, 2024", status: "Shipped", items: 2, total: "₹850" },
];

export default function DashboardPage() {
  return (
    <UserLayout title="Dashboard" subtitle="Overview of your booking activity">
      <div className="space-y-8">
        
        {/* Unified Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat, idx) => (
            <Link key={stat.label} href={stat.href}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-[#0c0d0e] p-5 rounded-[1.5rem] border border-slate-100 dark:border-white/5 relative group cursor-pointer hover:border-primary/30 transition-all shadow-sm h-full"
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
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders Section (SOW 2.9) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-lg tracking-tight uppercase text-[15px] flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" /> Recent Orders
              </h3>
              <Link href="/orders" className="text-xs font-black uppercase text-primary tracking-widest hover:underline">
                View All
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
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
                      <p className="font-black text-sm text-slate-900 dark:text-white">{order.id}</p>
                      <p className="text-xs text-slate-400 font-medium">{order.date} • {order.items} Items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                      <p className="font-black text-sm text-slate-900 dark:text-white">{order.total}</p>
                      <Badge className={`mt-1 border-0 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : 
                        order.status === 'Processing' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                      }`}>
                        {order.status}
                      </Badge>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-4">
            <h3 className="font-black text-lg tracking-tight uppercase text-[15px] flex items-center gap-2 px-2">
              <Zap className="w-4 h-4 text-primary" /> Navigation
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { label: "My Addresses", icon: MapPin, href: "/profile/addresses", desc: "Manage delivery locations" },
                { label: "My Wallet", icon: Wallet, href: "/wallet", desc: "Refill or check history" },
                { label: "Coupons", icon: Tag, href: "/coupons", desc: "Apply discount codes" },
                { label: "Refer & Earn", icon: Users, href: "/referral", desc: "Share with friends" },
              ].map((link, idx) => (
                <Link key={link.label} href={link.href}>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.6 }}
                    className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:bg-white dark:hover:bg-slate-900 group transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary shadow-sm border border-slate-100 dark:border-white/5 transition-colors">
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
