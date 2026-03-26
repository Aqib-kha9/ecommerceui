"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCheck, Package, Tag, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/UserLayout";

type Notif = { id: number; type: "order" | "offer" | "system"; title: string; body: string; time: string; read: boolean };

const initialNotifs: Notif[] = [
  { id: 1, type: "order", title: "Order Shipped! 🚚", body: "Your order #ORD-8821 is on its way. Estimated delivery in 30 mins.", time: "10 mins ago", read: false },
  { id: 2, type: "offer", title: "Flash Sale — 40% OFF 🔥", body: "Exclusive 4-hour flash sale on Beauty & Skincare. Use code FLASH40.", time: "1 hour ago", read: false },
  { id: 3, type: "order", title: "Order Delivered ✅", body: "Your order #ORD-8790 has been delivered. Rate your experience!", time: "2 days ago", read: false },
  { id: 4, type: "offer", title: "New Package Arrived 🎁", body: "Check out our new Glow & Care Beauty Box — now available!", time: "3 days ago", read: true },
  { id: 5, type: "system", title: "Wallet Credited 💰", body: "₹100 referral bonus has been credited to your wallet.", time: "3 days ago", read: true },
  { id: 6, type: "system", title: "Profile Updated ✓", body: "Your profile details have been successfully updated.", time: "5 days ago", read: true },
  { id: 7, type: "offer", title: "Weekend Special 🎉", body: "Free delivery on all orders above ₹299 this weekend!", time: "6 days ago", read: true },
];

const icons = {
  order: { icon: Package, bg: "bg-primary/10", color: "text-primary" },
  offer: { icon: Tag, bg: "bg-amber-50 dark:bg-amber-500/10", color: "text-amber-500" },
  system: { icon: Info, bg: "bg-slate-100 dark:bg-white/5", color: "text-slate-400" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <UserLayout title="Notifications" subtitle={unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up!"}>
      <div className="max-w-lg">
        {unreadCount > 0 && (
          <div className="flex justify-end mb-3">
            <Button variant="ghost" size="sm" onClick={() => setNotifs(ns => ns.map(n => ({ ...n, read: true })))}
              className="text-primary hover:bg-primary/5 font-bold text-xs gap-1">
              <CheckCheck className="w-3.5 h-3.5" /> Mark all read
            </Button>
          </div>
        )}

        {notifs.length === 0 ? (
          <div className="text-center py-24"><Bell className="w-12 h-12 text-slate-200 mx-auto mb-3" /><p className="font-bold text-slate-500">No notifications yet</p></div>
        ) : (
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden">
            {notifs.map((n, i) => {
              const conf = icons[n.type];
              const Icon = conf.icon;
              return (
                <motion.button key={n.id} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${i !== notifs.length - 1 ? "border-b border-slate-50 dark:border-white/5" : ""} ${!n.read ? "bg-primary/[0.02]" : ""}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${conf.bg}`}>
                    <Icon className={`w-4 h-4 ${conf.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-bold ${!n.read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>{n.title}</p>
                      {!n.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">{n.time}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
