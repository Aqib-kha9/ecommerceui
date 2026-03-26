"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Package, Truck, CheckCircle2, XCircle, Clock } from "lucide-react";
import UserLayout from "@/components/UserLayout";

const mockOrders = [
  { id: "ORD-8821", date: "27 Mar 2026", items: [{ name: "Organic Basmati Rice 5kg", qty: 1, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80" }, { name: "Almond Milk 1L", qty: 2, image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=80" }], total: 1397, status: "shipped", address: "HSR Layout, Hyderabad" },
  { id: "ORD-8790", date: "25 Mar 2026", items: [{ name: "Ayurvedic Face Serum 30ml", qty: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80" }], total: 1299, status: "delivered", address: "HSR Layout, Hyderabad" },
  { id: "ORD-8754", date: "22 Mar 2026", items: [{ name: "Glow & Care Beauty Box", qty: 1, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80" }, { name: "Rose Water Mist", qty: 1, image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=80" }], total: 2624, status: "processing", address: "Cyberabad, Hyderabad" },
  { id: "ORD-8701", date: "18 Mar 2026", items: [{ name: "Charcoal Face Wash", qty: 2, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=80" }], total: 698, status: "cancelled", address: "Banjara Hills, Hyderabad" },
  { id: "ORD-8680", date: "15 Mar 2026", items: [{ name: "Himalayan Pink Salt", qty: 1, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=80" }], total: 1048, status: "delivered", address: "HSR Layout, Hyderabad" },
];

const statusConfig = {
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50 dark:bg-green-500/10" },
  shipped: { label: "Shipped", icon: Truck, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
  processing: { label: "Processing", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
};

const tabs = ["All", "Active", "Delivered", "Cancelled"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = mockOrders.filter(o => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return o.status === "processing" || o.status === "shipped";
    if (activeTab === "Delivered") return o.status === "delivered";
    return o.status === "cancelled";
  });

  return (
    <UserLayout title="My Orders" subtitle={`${mockOrders.length} orders total`}>
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === tab ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white dark:bg-[#0c0d0e] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-w-2xl">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="font-bold text-slate-500">No orders found</p>
          </div>
        )}
        {filtered.map((order, i) => {
          const conf = statusConfig[order.status as keyof typeof statusConfig];
          const Icon = conf.icon;
          return (
            <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/orders/${order.id}`} className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all block group">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-sm text-slate-900 dark:text-white">#{order.id}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full ${conf.bg} ${conf.color}`}>
                      <Icon className="w-3.5 h-3.5" /> {conf.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, j) => (
                      <div key={j} className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm">
                        <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{order.items[0].name}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ""}</p>
                    <p className="text-xs text-slate-400 mt-0.5"><Package className="w-3 h-3 inline mr-1" />{order.items.reduce((a, b) => a + b.qty, 0)} items</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-white/5">
                  <span className="text-xs text-slate-400 font-medium">{order.address}</span>
                  <span className="font-black text-base text-slate-900 dark:text-white">₹{order.total.toLocaleString()}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </UserLayout>
  );
}
