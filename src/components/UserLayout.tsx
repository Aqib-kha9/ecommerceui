"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShoppingBag, Wallet, Gift, Tag, Bell, Settings,
  MapPin, LogOut, Home, Package, ChevronRight, Menu, X,
  Search, LayoutDashboard, ChevronDown, Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─── Nav structure ───────────────────────────── */
const navGroups = [
  {
    title: "Account",
    items: [
      { href: "/dashboard",          icon: LayoutDashboard, label: "Dashboard",      badge: null },
      { href: "/profile",            icon: User,            label: "Profile Info",   badge: null },
      { href: "/profile/addresses",  icon: MapPin,          label: "Addresses",      badge: null },
    ],
  },
  {
    title: "Activities",
    items: [
      { href: "/orders",   icon: ShoppingBag, label: "My Orders",   badge: "3" },
      { href: "/coupons",  icon: Tag,         label: "Coupons",     badge: "5" },
    ],
  },
  {
    title: "Wallet & Referral",
    items: [
      { href: "/wallet",   icon: Wallet, label: "My Wallet",       badge: "₹1,250" },
      { href: "/referral", icon: Gift,   label: "Refer & Earn",    badge: null },
    ],
  },
  {
    title: "Support",
    items: [
      { href: "/notifications", icon: Bell,     label: "Notifications",     badge: "5" },
      { href: "/settings",      icon: Settings, label: "Language Settings", badge: null },
    ],
  },
];

const mobileNav = [
  { href: "/dashboard",    icon: LayoutDashboard, label: "Home" },
  { href: "/orders",       icon: ShoppingBag,     label: "Orders" },
  { href: "/wallet",       icon: Wallet,          label: "Wallet" },
  { href: "/packages",     icon: Package,         label: "Packages" },
  { href: "/profile",      icon: User,            label: "Account" },
];

/* ─── Helpers ─────────────────────────────────── */
interface UserLayoutProps { children: React.ReactNode; title: string; subtitle?: string; }

export default function UserLayout({ children, title, subtitle }: UserLayoutProps) {
  const pathname  = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-[#f4f6fa] dark:bg-[#090b0f] flex flex-col">

      {/* ══ TOP HEADER ════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-[#0d1117] border-b border-slate-200/80 dark:border-white/[0.06] flex items-center px-4 gap-3 shadow-sm">

        {/* Hamburger (mobile) */}
        <button onClick={() => setSidebarOpen(true)}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-black text-[15px] tracking-tight text-slate-900 dark:text-white hidden sm:block">
            Ayur<span className="text-primary">Pooja</span>
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-white/10 hidden sm:block" />

        {/* Page breadcrumb (desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 text-sm">
          <span className="text-slate-400 font-medium">Dashboard</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-bold text-slate-700 dark:text-slate-200">{title}</span>
        </div>

        {/* Page title (mobile) */}
        <span className="lg:hidden font-black text-base text-slate-900 dark:text-white truncate">{title}</span>

        <div className="flex-1" />

        {/* Search (desktop) */}
        <div className="hidden md:flex items-center gap-2 h-9 px-4 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/8 text-slate-400 text-sm w-48 cursor-pointer hover:border-primary/40 transition-colors">
          <Search className="w-4 h-4 shrink-0" />
          <span className="font-medium text-xs">Search...</span>
        </div>

        {/* Back to shop */}
        <Link href="/"
          className="hidden sm:flex items-center gap-1.5 h-9 px-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-primary/10 hover:text-primary border border-slate-200 dark:border-white/8 transition-all">
          <Home className="w-3.5 h-3.5" /> Shop
        </Link>

        {/* Notifications */}
        <Link href="/notifications"
          className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/8">
          <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-[#0d1117]" />
        </Link>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-white/8 ml-1 cursor-pointer group">
          <div className="w-8 h-8 rounded-xl overflow-hidden ring-2 ring-primary/20">
            <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" alt="User" width={32} height={32} className="object-cover w-full h-full" />
          </div>
          <div className="hidden sm:block">
            <p className="font-black text-[12px] text-slate-900 dark:text-white leading-none">Ravi Kumar</p>
            <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Premium</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </div>
      </header>

      {/* ══ BODY (sidebar + content) ══════════════════════ */}
      <div className="flex flex-1 pt-14">

        {/* ── Desktop Sidebar ──────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-60 fixed left-0 top-14 bottom-0 bg-white dark:bg-[#0d1117] border-r border-slate-200/80 dark:border-white/[0.06] z-40 overflow-y-auto">


          {/* Nav groups */}
          <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 px-2 mb-1">{group.title}</p>
                <div className="space-y-0.5">
                  {group.items.map(({ href, icon: Icon, label, badge }) => {
                    const active = isActive(href);
                    return (
                      <Link key={href} href={href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                          active
                            ? "bg-primary text-white shadow-lg shadow-primary/25"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
                        }`}>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors"}`} />
                          <span className={`text-[13px] font-bold ${active ? "text-white" : ""}`}>{label}</span>
                        </div>
                        {badge && (
                          <Badge className={`text-[10px] font-black border-0 rounded-full px-2 ${active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                            {badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Sign out */}
          <div className="p-3 border-t border-slate-100 dark:border-white/[0.05]">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group">
              <LogOut className="w-4 h-4" />
              <span className="text-[13px] font-bold">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── Mobile Sidebar Overlay ───────────────────── */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#0d1117] z-50 flex flex-col shadow-2xl">
                {/* Drawer header */}
                <div className="flex items-center justify-between px-4 h-14 border-b border-slate-100 dark:border-white/[0.05]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white fill-white" /></div>
                    <span className="font-black text-[15px] text-slate-900 dark:text-white">Ayur<span className="text-primary">Pooja</span></span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Nav */}
                <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
                  {navGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 px-2 mb-1">{group.title}</p>
                      <div className="space-y-0.5">
                        {group.items.map(({ href, icon: Icon, label, badge }) => {
                          const active = isActive(href);
                          return (
                            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                              className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                                active ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                              }`}>
                              <div className="flex items-center gap-3">
                                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                                <span className="text-[14px] font-bold">{label}</span>
                              </div>
                              {badge && <Badge className={`text-[10px] font-black border-0 rounded-full ${active ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>{badge}</Badge>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
                <div className="p-3 border-t border-slate-100 dark:border-white/[0.05]">
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                    <LogOut className="w-4 h-4" /><span className="text-[14px] font-bold">Sign Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Content ─────────────────────────────── */}
        <main className="flex-1 lg:ml-60 min-h-[calc(100vh-3.5rem)] overflow-x-hidden">
          <div className="max-w-[1440px] mx-auto w-full">
            {/* Content header bar */}
            <div className="bg-white dark:bg-[#0d1117] border-b border-slate-200/80 dark:border-white/[0.06] px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{subtitle}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Link href="/packages" className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
                  <ShoppingBag className="w-3.5 h-3.5" /> Shop Now
                </Link>
              </div>
            </div>

            {/* Page body */}
            <div className="p-4 sm:p-6 pb-28 lg:pb-12">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* ══ MOBILE BOTTOM NAV ═════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/[0.06]">
        <div className="flex items-stretch justify-around px-1">
          {mobileNav.map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-0.5 py-2 px-2 flex-1 relative">
                {active && (
                  <motion.div layoutId="mobile-nav-pill"
                    className="absolute inset-x-1 inset-y-1 bg-primary/10 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                )}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-slate-400"}`} />
                  {href === "/notifications" && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full" />}
                </div>
                <span className={`text-[10px] font-black relative z-10 ${active ? "text-primary" : "text-slate-400"}`}>{label}</span>
              </Link>
            );
          })}
        </div>
        {/* Safe-area spacer */}
        <div className="h-safe-bottom bg-white/95 dark:bg-[#0d1117]/95" />
      </div>
    </div>
  );
}
