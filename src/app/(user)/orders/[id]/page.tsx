"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, Truck, Clock, Package, XCircle, Download, MapPin, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/UserLayout";

const ordersData: Record<string, { id: string; date: string; status: "processing" | "shipped" | "delivered" | "cancelled"; items: { name: string; qty: number; price: number; image: string }[]; subtotal: number; discount: number; delivery: number; total: number; address: { name: string; phone: string; line: string }; payment: string }> = {
  "ORD-8821": { id: "ORD-8821", date: "27 Mar 2026, 10:45 AM", status: "shipped", items: [{ name: "Organic Basmati Rice 5kg", qty: 1, price: 899, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100" }, { name: "Natural Almond Milk 1L", qty: 2, price: 249, image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=100" }], subtotal: 1397, discount: 0, delivery: 0, total: 1397, address: { name: "Ravi Kumar", phone: "+91 98765 43210", line: "42, Green Park Colony, Near Metro, HSR Layout, Hyderabad - 500034" }, payment: "UPI (GPay)" },
  "ORD-8790": { id: "ORD-8790", date: "25 Mar 2026, 3:20 PM", status: "delivered", items: [{ name: "Ayurvedic Face Serum 30ml", qty: 1, price: 1299, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100" }], subtotal: 1299, discount: 130, delivery: 0, total: 1169, address: { name: "Ravi Kumar", phone: "+91 98765 43210", line: "42, Green Park Colony, Near Metro, HSR Layout, Hyderabad - 500034" }, payment: "Credit Card" },
  "ORD-8754": { id: "ORD-8754", date: "22 Mar 2026, 11:10 AM", status: "processing", items: [{ name: "Glow & Care Beauty Box", qty: 1, price: 2125, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100" }], subtotal: 2624, discount: 0, delivery: 0, total: 2624, address: { name: "Ravi Kumar", phone: "+91 98765 43210", line: "7th Floor, Cyber Towers, Cyberabad - 500081" }, payment: "COD" },
  "ORD-8701": { id: "ORD-8701", date: "18 Mar 2026, 9:00 AM", status: "cancelled", items: [{ name: "Charcoal Face Wash for Men", qty: 2, price: 349, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100" }], subtotal: 698, discount: 0, delivery: 0, total: 698, address: { name: "Ravi Kumar", phone: "+91 98765 43210", line: "Banjara Hills, Hyderabad - 500034" }, payment: "UPI" },
};

const trackingSteps: Record<string, { label: string; time: string; done: boolean }[]> = {
  processing: [{ label: "Order Placed", time: "10:45 AM", done: true }, { label: "Confirmed", time: "10:50 AM", done: true }, { label: "Shipped", time: "Pending", done: false }, { label: "Delivered", time: "Est. 30 mins", done: false }],
  shipped: [{ label: "Order Placed", time: "10:45 AM", done: true }, { label: "Confirmed", time: "10:50 AM", done: true }, { label: "Shipped", time: "11:20 AM", done: true }, { label: "Delivered", time: "Est. 15 mins", done: false }],
  delivered: [{ label: "Order Placed", time: "3:20 PM", done: true }, { label: "Confirmed", time: "3:25 PM", done: true }, { label: "Shipped", time: "3:45 PM", done: true }, { label: "Delivered", time: "4:10 PM", done: true }],
  cancelled: [],
};

const statusBadge = {
  delivered: { label: "Delivered", icon: CheckCircle2, color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
  shipped: { label: "Out for Delivery", icon: Truck, color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
  processing: { label: "Processing", icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500 bg-red-50 dark:bg-red-500/10" },
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ordersData[id] || ordersData["ORD-8821"];
  const [cancelling, setCancelling] = useState(false);
  const steps = trackingSteps[order.status] || [];
  const conf = statusBadge[order.status];
  const Icon = conf.icon;

  return (
    <UserLayout title={`Order #${order.id}`} subtitle={order.date}>
      <div className="max-w-xl space-y-4">
        {/* Back */}
        <Link href="/orders" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> All Orders
        </Link>

        {/* Status + Invoice */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${conf.color}`}>
            <Icon className="w-4 h-4" />
            <span className="font-black text-sm">{conf.label}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold text-xs gap-1 hover:bg-primary/5">
            <Download className="w-3.5 h-3.5" /> Invoice
          </Button>
        </div>

        {/* Tracking */}
        {order.status !== "cancelled" && (
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-5">Tracking</h3>
            <div className="relative pl-5">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-4 pb-5 last:pb-0">
                  {i < steps.length - 1 && <div className={`absolute left-0 top-5 w-0.5 h-full -translate-x-1/2 ${step.done ? "bg-primary" : "bg-slate-100 dark:bg-white/10"}`} />}
                  <div className={`absolute left-0 -translate-x-1/2 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${step.done ? "bg-primary border-primary" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10"}`}>
                    {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-bold ${step.done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{step.label}</p>
                    <p className={`text-xs mt-0.5 font-medium ${step.done ? "text-primary" : "text-slate-400"}`}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancelled info */}
        {order.status === "cancelled" && (
          <div className="bg-red-50 dark:bg-red-500/10 rounded-[1.5rem] border border-red-100 dark:border-red-500/20 p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-sm text-red-600 dark:text-red-400">Order Cancelled</p>
              <p className="text-xs text-red-500/80 mt-1">Refund of ₹{order.total} will be processed to your wallet within 24 hours.</p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-4">Items</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                  <Image src={item.image} alt={item.name} width={56} height={56} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1"><p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.name}</p><p className="text-xs text-slate-400 mt-0.5">×{item.qty}</p></div>
                <span className="font-black text-sm text-slate-900 dark:text-white">₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 dark:border-white/5 space-y-2">
            <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-₹{order.discount}</span></div>}
            <div className="flex justify-between text-sm text-slate-500"><span>Delivery</span><span className="text-green-600 font-bold">{order.delivery === 0 ? "FREE" : `₹${order.delivery}`}</span></div>
            <div className="flex justify-between font-black text-base text-slate-900 dark:text-white pt-2 border-t border-slate-50 dark:border-white/5"><span>Total Paid</span><span>₹{order.total}</span></div>
          </div>
        </div>

        {/* Address + Payment row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-3">Delivery To</h3>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{order.address.name}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{order.address.line}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {order.address.phone}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-3">Payment</h3>
            <Badge className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-0 font-bold rounded-full w-fit">{order.payment}</Badge>
          </div>
        </div>

        {(order.status === "processing" || order.status === "shipped") && (
          <Button variant="outline" onClick={() => setCancelling(true)} disabled={cancelling}
            className="w-full h-12 rounded-2xl font-black text-red-500 border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10">
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </Button>
        )}
      </div>
    </UserLayout>
  );
}
