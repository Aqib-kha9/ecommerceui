"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Package, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Download,
  MapPin,
  ArrowRight,
  Search,
  Filter
} from "lucide-react";
import UserLayout from "@/components/UserLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

export default function OrdersPage() {
  const t = useTranslations("Orders");
  const locale = useLocale();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const statusConfig = {
    DELIVERED: { label: t("tabs.delivered"), icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    SHIPPED: { label: t("tabs.shipped"), icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    PROCESSING: { label: t("tabs.active"), icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    PENDING: { label: t("tabs.active"), icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    CANCELLED: { label: t("tabs.cancelled"), icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  };

  const tabs = [
    { key: "All", label: t("tabs.all") },
    { key: "Active", label: t("tabs.active") },
    { key: "Delivered", label: t("tabs.delivered") },
    { key: "Cancelled", label: t("tabs.cancelled") },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/orders");
        if (res.data.status === "success") {
          setOrders(res.data.data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filtered = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         o.items.some((it: any) => it.product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (activeTab === "All") return true;
    if (activeTab === "Active") return o.orderStatus === "PROCESSING" || o.orderStatus === "SHIPPED" || o.orderStatus === "PENDING";
    if (activeTab === "Delivered") return o.orderStatus === "DELIVERED";
    if (activeTab === "Cancelled") return o.orderStatus === "CANCELLED";
    return true;
  });

  return (
    <UserLayout title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-8 pb-12">
        
        {/* Unified Search & Tabs Bar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white dark:bg-[#0c0d0e] p-6 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map(tab => (
              <button 
                key={tab.key} 
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "shrink-0 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border",
                  activeTab === tab.key 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-slate-50 dark:bg-white/5 text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-white/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 xl:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="w-full h-12 pl-11 pr-4 bg-slate-50 dark:bg-white/5 border-0 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-100 dark:border-white/5 cursor-pointer">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2.5rem] bg-white dark:bg-white/5" />)
            ) : filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white dark:bg-[#0c0d0e] rounded-[3rem] border border-slate-100 dark:border-white/5">
                <Package className="w-20 h-20 text-slate-100 dark:text-white/5 mx-auto mb-6" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{t("no_orders")}</h3>
                <p className="text-sm text-slate-400 font-bold mt-2">{t("no_orders_desc")}</p>
                <Link href="/packages">
                  <Button className="mt-8 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest px-8">{t("browse_products")}</Button>
                </Link>
              </motion.div>
            ) : (
              filtered.map((order, i) => {
                const conf = (statusConfig as any)[order.orderStatus] || statusConfig.PROCESSING;
                const StatusIcon = conf.icon;
                
                return (
                  <motion.div 
                    key={order.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "group bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/5",
                      conf.border
                    )}
                  >
                    {/* Upper Section */}
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-14 h-14 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-inner", conf.bg)}>
                            <StatusIcon className={cn("w-7 h-7 sm:w-8 h-8", conf.color)} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-lg text-slate-900 dark:text-white tracking-tighter uppercase">#{order.orderNumber.split('-').slice(-1)}</h4>
                              <Badge className={cn("border-0 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg", conf.bg, conf.color)}>
                                {conf.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-400 font-bold flex items-center gap-2 mt-0.5">
                              {formatDate(order.createdAt)} • <MapPin className="w-3 h-3" /> {(order.shippingAddress as any)?.city || "Address Info"}
                            </p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{t("order_total")}</p>
                          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic">₹{Number(order.payableAmount).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="flex flex-wrap items-center gap-4 py-6 border-y border-slate-50 dark:border-white/5">
                        <div className="flex -space-x-4">
                          {order.items.map((item: any, j: number) => (
                            <div key={j} className="relative w-16 h-16 rounded-[1.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg ring-1 ring-slate-100 dark:ring-white/10 group-hover:translate-x-1 transition-transform duration-500">
                              <Image src={item.product.images?.[0] || "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120"} alt={item.product.name} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight">
                            {order.items[0].product.name} {order.items.length > 1 && <span className="text-primary">+ {order.items.length - 1} more items</span>}
                          </p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t("package_type")}</p>
                        </div>
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="ghost" className="rounded-xl h-10 px-4 group/btn hover:bg-primary/5 hover:text-primary transition-all">
                             {t("view_details")} <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Lower Static Action Bar */}
                    <div className="bg-slate-50/50 dark:bg-white/[0.02] px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" className="h-10 rounded-xl px-4 border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-white/5">
                          <Truck className="w-3.5 h-3.5 mr-2" /> {t("track_order")}
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl px-4 border-slate-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-white/5">
                          <Download className="w-3.5 h-3.5 mr-2" /> {t("invoice")}
                        </Button>
                      </div>

                      <div className="flex items-center gap-3">
                        {(order.orderStatus === 'PENDING' || order.orderStatus === 'PROCESSING') && (
                          <button className="text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors">
                            {t("need_help")}
                          </button>
                        )}
                        <Button className="h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 font-black text-[10px] uppercase tracking-widest group-hover:scale-105 transition-all">
                          {t("reorder")} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </UserLayout>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
