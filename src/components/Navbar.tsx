"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  ShoppingCart,
  Search,
  Menu,
  Heart,
  Bell,
  Store,
  MapPin,
  Zap,
  ChevronDown,
  Package,
  LogOut,
  User,
  Settings,
  ShoppingBag,
  Wallet,
  Gift,
  Tag,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSearch } from "./SearchContext";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";
import MainSearchBar from "./MainSearchBar";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

// navLinks are now fetched from the API - see fetchCategories() below

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { isHeroSearchVisible, setIsHeroSearchVisible } = useSearch();
  const { isLoggedIn, openAuthModal, logout } = useAuth();
  const { cartCount, items, cartTotal } = useCart();
  
  const isHomePage = pathname === "/";
  const [navLinks, setNavLinks] = useState<{id: string; label: string; href: string}[]>([]);
  const [activeCategory, setActiveCategory] = useState<{name: string; id: string} | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<"fast" | "scheduled">("fast");

  // Fetch top-level categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/categories`,
          { headers: { "Accept-Language": locale } }
        );
        const json = await res.json();
        if (json.status === "success") {
          const topLevel = json.data.categories.filter((c: any) => !c.parentId);
          setNavLinks(topLevel.map((c: any) => ({
            id: c.id,
            label: typeof c.name === "object" ? c.name[locale] || c.name["en"] || "" : c.name,
            href: `/products?category=${c.slug}`
          })));
        }
      } catch (e) {
        console.error("Failed to fetch nav categories", e);
      }
    };
    fetchCategories();
  }, [locale]);

  const selectedLang = locale.toUpperCase();

  const handleLanguageChange = (langCode: string) => {
    router.replace(pathname, { locale: langCode.toLowerCase() });
  };

  // Only toggle search visibility on the home page (where the hero search exists).
  // On all other pages, always show the navbar search bar.
  useEffect(() => {
    if (!isHomePage) {
      setIsHeroSearchVisible(false);
      return;
    }
    const handleScroll = () => {
      setIsHeroSearchVisible(window.scrollY <= 200);
    };
    // Set initial state on mount
    setIsHeroSearchVisible(window.scrollY <= 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, setIsHeroSearchVisible]);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="container mx-auto px-2 lg:px-4">
        {/* Main Nav Row */}
        <div 
          className="flex flex-col md:flex-row items-center gap-2 md:gap-8 py-2 md:py-0 md:h-16"
          onMouseEnter={() => setActiveCategory(null)}
        >
          {/* Row 1 (Mobile) / Left Side (Desktop): Logo & Meta Actions */}
          <div className="flex items-center justify-between w-full md:w-auto shrink-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
              <div className="w-10 h-10 md:w-10 md:h-10 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-all shadow-sm border border-primary/10">
                <Store className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <span className={`font-black text-lg md:text-2xl text-slate-950 dark:text-white tracking-tighter uppercase hidden sm:inline-flex overflow-hidden transition-all duration-500 ease-out whitespace-nowrap ${
                !isHeroSearchVisible ? "md:max-w-0 md:opacity-0 md:-ml-2" : "md:max-w-[200px] md:opacity-100"
              }`}>
                Ayur<span className="text-primary italic">Pooja</span>
              </span>
            </Link>

            {/* Mobile-only Deliver Address Picker */}
            <div className="flex-1 md:hidden flex items-center justify-start ml-3 overflow-hidden">
              <div className="flex items-center gap-2.5 cursor-pointer group max-w-full">
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-1.5 leading-none mb-1">
                    <span className="text-[11px] font-black tracking-tight text-slate-900 dark:text-white">{t("delivery_in")}</span>
                    <Zap className="w-3 h-3 text-primary fill-current animate-pulse" />
                    <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[140px] leading-tight flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> HSR Layout, Sector 7...
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-only User Actions (User Icon) */}
            <div className="md:hidden flex items-center gap-2">
              {!isLoggedIn ? (
                <Button onClick={openAuthModal} variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 dark:bg-white/10 dark:border-white/5 text-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md transition-all">
                  <User className="w-4 h-4" />
                </Button>
              ) : (
                <Link href="/dashboard">
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" />
                    <AvatarFallback className="bg-primary text-white text-xs font-black">RK</AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>
          </div>

          {/* Row 2 (Mobile) / Middle & Right (Desktop): Search & Actions */}
          <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4">
            {/* Search Bar Container */}
            <div className={`w-full flex items-center relative transition-all duration-500 ease-in-out ${
              isHeroSearchVisible 
                ? "flex-1 max-w-0 md:max-w-0 opacity-0 overflow-hidden pointer-events-none" 
                : "flex-[3] max-w-2xl opacity-100 mt-2 md:mt-0"
            }`}>
              <div className="w-full md:min-w-[400px]">
                <MainSearchBar variant="navbar" />
              </div>
            </div>

            {/* Desktop Actions Section */}
            <div className="hidden md:flex items-center gap-3 lg:gap-5 ml-auto">
              {/* Delivery Toggle (Desktop) */}
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => setDeliveryMode(deliveryMode === "fast" ? "scheduled" : "fast")}
                  className={cn(
                    "relative flex items-center h-10 rounded-full px-4 transition-all duration-500 border group overflow-hidden",
                    deliveryMode === "fast" 
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/25" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary/30"
                  )}
                >
                  {deliveryMode === "fast" && (
                    <motion.div layoutId="glow" className="absolute inset-0 bg-[var(--primary-gradient)] opacity-100" />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <Zap className={cn("w-4 h-4", deliveryMode === "fast" ? "fill-current text-white animate-pulse" : "text-slate-400")} />
                    <span className="text-[11px] font-black uppercase tracking-widest">30 Mins</span>
                  </div>
                </button>
              </div>

              {/* Account / Icons Group */}
              <div className="flex items-center gap-1">
                {/* Language (Desktop) */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-300 font-black tracking-widest text-[11px] hover:bg-primary/5 hover:text-primary rounded-xl h-11 px-3 transition-all">
                        <Globe className="w-4 h-4 mr-1" />{selectedLang} <ChevronDown className="w-3 h-3" />
                      </Button>
                    }
                  />
                   <DropdownMenuContent align="end" className="w-36 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-1.5">
                    {[
                      { code: "en", label: "English", display: "EN" }, 
                      { code: "hi", label: "हिन्दी", display: "HI" }, 
                      { code: "te", label: "తెలుగు", display: "TE" }
                    ].map(lang => (
                      <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}
                        className={`text-xs font-bold cursor-pointer transition-all rounded-xl py-2.5 px-3 flex items-center justify-between ${locale === lang.code ? "bg-primary/10 text-primary" : "hover:bg-primary/5 hover:text-primary"}`}>
                        <span>{lang.label}</span>
                        {locale === lang.code && <span className="text-[10px] font-black opacity-60">{lang.display}</span>}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Notifications Bell (Desktop) */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl h-11 w-11 transition-all relative group">
                        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-[1.5rem] shadow-2xl p-0 overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                      <span className="font-black text-sm text-slate-900 dark:text-white">Notifications</span>
                      <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">5 new</span>
                    </div>
                    <div>
                      {[
                        { icon: "📦", title: "Order Shipped!", body: "Your order #ORD-8821 is on its way.", time: "10 mins ago", unread: true },
                        { icon: "🔥", title: "Flash Sale — 40% OFF", body: "Beauty & Skincare. Use code FLASH40.", time: "1 hr ago", unread: true },
                        { icon: "✅", title: "Order Delivered", body: "Your order #ORD-8790 was delivered.", time: "2 days ago", unread: false },
                      ].map((n, i) => (
                        <div key={i} className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer ${n.unread ? "bg-primary/[0.02]" : ""}`}>
                          <span className="text-lg shrink-0 mt-0.5">{n.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-xs font-bold ${n.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>{n.title}</p>
                              {n.unread && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 line-clamp-1">{n.body}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link href="/notifications" className="block text-center py-3 text-xs font-black text-primary hover:bg-primary/5 transition-colors border-t border-slate-100 dark:border-white/5">
                      View all notifications →
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 relative rounded-xl h-11 w-11 transition-all group"
                  >
                    <Link href="/cart" className="flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <AnimatePresence mode="wait">
                        {cartCount > 0 && (
                          <motion.div
                            key={cartCount}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                            className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 p-1 flex items-center justify-center bg-primary text-white text-[10px] rounded-full border-2 border-background font-black shadow-lg shadow-primary/20"
                          >
                            {cartCount}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </Button>

                  {/* Mini Cart Preview on Hover */}
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-3xl shadow-2xl p-4 hidden group-hover:block z-[60]"
                      >
                        <div className="flex items-center justify-between mb-4 px-1">
                          <span className="font-black text-xs uppercase tracking-widest text-slate-400">Your Cart</span>
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{cartCount} Items</span>
                        </div>
                        
                        <div className="max-h-60 overflow-y-auto no-scrollbar space-y-3 mb-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                <Image src={item.image || "/placeholder.png"} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black text-slate-900 dark:text-white truncate">{item.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 mt-0.5">{item.quantity} x ₹{item.price}</p>
                              </div>
                              <p className="text-[10px] font-black text-slate-900 dark:text-white">₹{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>

                        <Separator className="bg-slate-100 dark:bg-white/5 mb-4" />
                        
                        <div className="flex items-center justify-between mb-4 px-1">
                          <span className="text-[10px] font-black uppercase text-slate-400">Total</span>
                          <span className="text-base font-black text-slate-950 dark:text-white tracking-tight">₹{cartTotal.toLocaleString()}</span>
                        </div>

                        <Link href="/cart">
                          <Button className="w-full bg-primary hover:opacity-90 text-white rounded-xl h-12 text-[10px] font-black uppercase tracking-widest border-none shadow-lg shadow-primary/20">
                            Check View Full Cart
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-2" />

              {/* User Account Section (Desktop) */}
              {!isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Button onClick={openAuthModal} variant="ghost" className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-primary transition-all px-4 h-11 rounded-xl">
                    {t("login")}
                  </Button>
                  <Button onClick={openAuthModal} className="bg-primary text-white text-xs font-black uppercase tracking-widest px-5 h-11 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-95">
                    {t("join_elite")}
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                  >
                    <Button variant="ghost" className="gap-3 text-slate-700 dark:text-slate-300 hover:bg-primary/5 pl-1 pr-3 h-11 rounded-2xl group transition-all">
                      <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi" />
                        <AvatarFallback className="bg-primary text-white text-xs font-black">RK</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start leading-none hidden sm:flex">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t("account")}</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Ravi Kumar</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-2 rounded-[1.5rem] shadow-2xl mt-2 overflow-hidden">
                    <div className="px-4 py-3 font-black text-slate-950 dark:text-white text-base tracking-tighter uppercase">{t("my_space")}</div>
                    <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2 mb-1" />
                    <div className="p-1 space-y-0.5">
                      {[
                        { href: "/profile", icon: User, label: t("profile"), desc: "Edit your info" },
                        { href: "/orders", icon: ShoppingBag, label: t("my_orders"), desc: "Track & manage orders" },
                        { href: "/wallet", icon: Wallet, label: t("my_wallet"), desc: "₹1,250 available" },
                        { href: "/referral", icon: Gift, label: t("refer_earn"), desc: "Earn ₹100 per referral" },
                        { href: "/coupons", icon: Tag, label: t("my_coupons"), desc: "View available offers" },
                        { href: "/notifications", icon: Bell, label: t("notifications"), desc: "5 unread" },
                        { href: "/settings", icon: Settings, label: t("settings"), desc: "Language & preferences" },
                      ].map(({ href, icon: Icon, label, desc }) => (
                        <DropdownMenuItem key={href} asChild className="px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 cursor-pointer gap-3 font-bold transition-all h-auto">
                          <Link href={href} className="flex items-center w-full">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col items-start ml-3">
                              <span className="text-sm font-bold">{label}</span>
                              <span className="text-[11px] text-slate-400 font-normal">{desc}</span>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-0 my-1" />
                      <DropdownMenuItem 
                        onClick={() => logout()}
                        className="px-4 py-2.5 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer gap-3 font-black uppercase tracking-widest text-[10px] transition-all h-auto"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><LogOut className="w-4 h-4" /></div>
                        {t("sign_out")}
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Categories Scroll */}
        {!isHomePage && pathname === "/products" ? null : (
          <div className="md:hidden w-full bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900 border-t border-slate-100 dark:border-white/5">
            <nav className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-3 px-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="group relative flex items-center justify-center px-4 py-2 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-white/10 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] shrink-0 transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] font-bold tracking-wide text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors whitespace-nowrap relative z-10">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Desktop Secondary Nav (Categories) */}
        <nav className="hidden md:flex items-center justify-center gap-10 border-t border-slate-100 dark:border-white/5">
          {navLinks.map((link) => (
            <div key={link.label} onMouseEnter={() => setActiveCategory({name: link.label, id: link.id})} className="py-3">
              <Link 
                href={link.href} 
                className={cn(
                  "text-[12px] text-slate-600 dark:text-slate-400 hover:text-primary transition-all font-black uppercase tracking-[0.1em] flex items-center gap-1 group relative pb-1", 
                  activeCategory?.name === link.label && "text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-[1px] left-0 w-full h-[2px] bg-primary transition-all duration-300", 
                  activeCategory?.name === link.label ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                )} />
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <MegaMenu 
            category={activeCategory.name}
            categoryId={activeCategory.id}
            isOpen={!!activeCategory} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
