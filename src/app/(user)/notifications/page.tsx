"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CheckCheck, 
  Package, 
  Tag, 
  Info, 
  Trash2, 
  Clock, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/UserLayout";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Notif = { 
  id: number; 
  type: "order" | "offer" | "system" | "payment"; 
  title: string; 
  body: string; 
  time: string; 
  group: "Today" | "Yesterday" | "Earlier";
  read: boolean 
};

const initialNotifs: Notif[] = [
  { id: 1, type: "order", title: "Order Shipped! 🚚", body: "Your order #ORD-8821 is on its way. Estimated delivery in 30 mins.", time: "10:30 AM", group: "Today", read: false },
  { id: 2, type: "offer", title: "Flash Sale — 40% OFF 🔥", body: "Exclusive 4-hour flash sale on Beauty & Skincare. Use code FLASH40.", time: "09:15 AM", group: "Today", read: false },
  { id: 3, type: "payment", title: "Payment Successful 💳", body: "Payment for order #ORD-8821 was processed successfully.", time: "Yesterday, 06:45 PM", group: "Yesterday", read: true },
  { id: 4, type: "order", title: "Order Delivered ✅", body: "Your order #ORD-8790 has been delivered. Rate your experience!", time: "Yesterday, 02:00 PM", group: "Yesterday", read: true },
  { id: 5, type: "system", title: "Wallet Credited 💰", body: "₹100 referral bonus has been credited to your wallet.", time: "3 days ago", group: "Earlier", read: true },
  { id: 6, type: "system", title: "Profile Updated ✓", body: "Your profile details have been successfully updated.", time: "5 days ago", group: "Earlier", read: true },
];

const icons = {
  order: { icon: Package, bg: "bg-primary/10", color: "text-primary" },
  offer: { icon: Tag, bg: "bg-amber-500/10", color: "text-amber-500" },
  payment: { icon: CheckCircle2, bg: "bg-emerald-500/10", color: "text-emerald-500" },
  system: { icon: Info, bg: "bg-slate-100 dark:bg-white/5", color: "text-slate-400" },
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const unreadCount = notifs.filter(n => !n.read).length;
  const filteredNotifs = filter === "all" ? notifs : notifs.filter(n => !n.read);

  const markAllRead = () => {
    setNotifs(ns => ns.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  const toggleRead = (id: number) => {
    setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const groups = ["Today", "Yesterday", "Earlier"] as const;

  return (
    <UserLayout title="Notifications" subtitle="Track your orders, offers, and system alerts">
      <div className="space-y-8 pb-12">
        
        {/* Elite Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#0c0d0e] p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm">
           <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Bell className="w-6 h-6" />
                </div>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#0c0d0e]">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Activity Center</h3>
                <p className="text-xs text-slate-400 font-bold">You have {unreadCount} new notifications</p>
              </div>
           </div>

           <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-slate-50 dark:bg-white/5 p-1 rounded-xl border border-slate-100 dark:border-white/10">
                 {(["all", "unread"] as const).map(f => (
                   <button 
                    key={f} 
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                      filter === f ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                    )}
                   >
                     {f}
                   </button>
                 ))}
              </div>
              <div className="h-8 w-px bg-slate-100 dark:bg-white/10 hidden sm:block mx-1" />
              <Button 
                variant="ghost" 
                onClick={markAllRead}
                disabled={unreadCount === 0}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary gap-2 h-10 px-4 rounded-xl"
              >
                <CheckCheck className="w-4 h-4" /> Mark All Read
              </Button>
              <Button 
                variant="ghost" 
                onClick={clearAll}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/5 gap-2 h-10 px-4 rounded-xl"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </Button>
           </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-10">
          {filteredNotifs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-white dark:bg-[#0c0d0e] rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-sm"
            >
              <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                <Bell className="w-10 h-10 text-slate-200" />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">All Caught Up!</h4>
              <p className="text-sm text-slate-400 font-bold max-w-xs mx-auto mt-2 italic">You don&apos;t have any new notifications at the moment.</p>
              <Button variant="outline" className="mt-8 rounded-xl px-8 h-12 font-black text-[10px] uppercase tracking-widest">Back to Home</Button>
            </motion.div>
          ) : (
            groups.map(group => {
              const groupNotifs = filteredNotifs.filter(n => n.group === group);
              if (groupNotifs.length === 0) return null;

              return (
                <div key={group} className="space-y-4">
                  <div className="flex items-center gap-4 px-4">
                     <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">{group}</span>
                     <div className="h-px w-full bg-slate-100 dark:bg-white/5" />
                  </div>
                  
                  <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden divide-y divide-slate-50 dark:divide-white/5">
                    {groupNotifs.map((n, i) => {
                      const conf = icons[n.type];
                      const Icon = conf.icon;
                      return (
                        <motion.button 
                          key={n.id} 
                          onClick={() => toggleRead(n.id)}
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ delay: i * 0.05 }}
                          className={cn(
                            "w-full flex items-start gap-6 px-8 py-6 text-left transition-all group relative",
                            !n.read ? "bg-primary/[0.015] dark:bg-primary/[0.01]" : "hover:bg-slate-50 dark:hover:bg-white/[0.01]"
                          )}
                        >
                          {!n.read && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                          )}

                          <div className={cn(
                            "w-12 h-12 rounded-[1.25rem] flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 duration-300",
                            conf.bg,
                            "border-transparent dark:border-white/5"
                          )}>
                            <Icon className={cn("w-5 h-5", conf.color)} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-1">
                               <h4 className={cn(
                                 "text-sm font-black uppercase tracking-tight leading-tight",
                                 !n.read ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"
                               )}>
                                 {n.title}
                               </h4>
                               <p className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{n.time}</p>
                            </div>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                              {n.body}
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                               <Badge variant="outline" className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0 border-slate-100 dark:border-white/10 text-slate-400">
                                 {n.type}
                               </Badge>
                               {!n.read && (
                                 <span className="text-[8px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                                   <div className="w-1 h-1 bg-primary rounded-full animate-pulse" /> New Alert
                                 </span>
                               )}
                            </div>
                          </div>

                          <div className="shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 hover:text-primary">
                                <ChevronRight className="w-5 h-5" />
                             </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Info Legend */}
        <div className="bg-slate-50 dark:bg-white/5 rounded-[2rem] p-8 border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                 <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold max-w-sm">
                Notifications are automatically archived after 30 days. You can adjust your preferences in the settings.
              </p>
           </div>
           <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-primary h-auto p-0">Notification Settings</Button>
        </div>

      </div>
    </UserLayout>
  );
}

