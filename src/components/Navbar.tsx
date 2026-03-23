"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Menu,
  Heart,
  Bell,
  Store,
  ChevronDown,
  Package,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { motion, AnimatePresence } from "framer-motion";
import MainSearchBar from "./MainSearchBar";
import { cn } from "@/lib/utils";
import MegaMenu from "./MegaMenu";

const navLinks = [
  { label: "Groceries", href: "/products?category=Groceries" },
  { label: "Beauty", href: "/products?category=Beauty" },
  { label: "Personal Care", href: "/products?category=PersonalCare" },
  { label: "Household", href: "/products?category=Household" },
  { label: "Organic", href: "/products?category=Organic" },
  { label: "Baby Care", href: "/products?category=Baby" },
  { label: "Pharmacy", href: "/products?category=Pharmacy" },
];

export default function Navbar() {
  const { searchQuery, setSearchQuery, isHeroSearchVisible, setIsHeroSearchVisible } = useSearch();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<"fast" | "scheduled">("fast");

  // setup scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // Toggle search visibility based on scroll threshold (around 200px)
      setIsHeroSearchVisible(window.scrollY <= 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsHeroSearchVisible]);

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="container mx-auto px-2 lg:px-2">
        <div 
          className="flex h-16 md:h-18 items-center gap-4"
          onMouseEnter={() => setActiveCategory(null)}
        >
          {/* Mobile menu - Hidden on mobile in favor of BottomNav, or kept for more links */}
          <div className="md:hidden w-10" /> {/* Spacer to help centering logo */}

          {/* Logo - Centered on mobile */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                <Store className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <span className="font-black text-lg md:text-2xl text-slate-950 dark:text-white tracking-tighter uppercase">
                Ayur<span className="text-primary italic">Pooja</span>
              </span>
            </Link>
          </div>

          {/* Unified Shared Element Sticky Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center relative px-4 gap-4">
            {!isHeroSearchVisible && (
              <MainSearchBar variant="navbar" />
            )}

            {/* Feature-Focused Delivery Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeliveryMode(deliveryMode === "fast" ? "scheduled" : "fast")}
                className={cn(
                  "relative flex items-center h-8 rounded-full px-3 transition-all duration-500 border group overflow-hidden",
                  deliveryMode === "fast" 
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/25" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary/30 hover:text-slate-600 dark:hover:text-slate-200"
                )}
              >
                {/* Background Glow for Active State */}
                {deliveryMode === "fast" && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute inset-0 bg-[var(--primary-gradient)] opacity-100"
                  />
                )}

                <div className="relative z-10 flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                    deliveryMode === "fast" ? "bg-white animate-pulse" : "bg-slate-300 dark:bg-slate-600"
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-[0.1em]">
                    30 Mins Delivery
                  </span>
                </div>

                {/* Performance Ring */}
                {deliveryMode === "fast" && (
                  <span className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse pointer-events-none" />
                )}
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-300 font-black tracking-widest text-[11px] hover:bg-primary/5 hover:text-primary rounded-xl h-11 px-3 transition-all">
                    EN <ChevronDown className="w-3 h-3" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-1">
                <DropdownMenuItem className="text-xs font-bold cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-xl py-2.5 px-3">English (EN)</DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-bold cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-xl py-2.5 px-3">हिंदी (HI)</DropdownMenuItem>
                <DropdownMenuItem className="text-xs font-bold cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-xl py-2.5 px-3">தமிழ் (TA)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="hidden sm:flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl h-11 w-11 transition-all relative group">
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
              </Button>
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl h-11 w-11 transition-all group">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </div>

            <Link href="/cart" className="hidden sm:flex">
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 relative rounded-xl h-11 w-11 transition-all group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <Badge className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 p-1 flex items-center justify-center bg-primary text-white text-[10px] rounded-full border-2 border-background font-black shadow-lg shadow-primary/20">
                  3
                </Badge>
              </Button>
            </Link>

            <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-2 hidden md:block" />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="gap-3 text-slate-700 dark:text-slate-300 hover:bg-white/10 pl-1 pr-3 h-11 rounded-2xl group transition-all">
                    <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                      <AvatarFallback className="bg-primary text-white text-xs font-black">JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start leading-none hidden sm:flex">
                      <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Account</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">John Doe</span>
                    </div>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-2 rounded-[1.5rem] shadow-2xl mt-2 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <DropdownMenuLabel className="px-4 py-4 relative z-10">
                  <p className="font-black text-slate-950 dark:text-white text-lg tracking-tighter uppercase">My Space</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">john@example.com</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2" />
                <div className="p-1 space-y-1 relative z-10">
                  <DropdownMenuItem 
                    render={<Link href="/dashboard" />}
                    className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 cursor-pointer gap-4 font-bold transition-all focus:bg-primary/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    render={<Link href="/dashboard" />}
                    className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 cursor-pointer gap-4 font-bold transition-all focus:bg-primary/5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                      <Package className="w-4 h-4" />
                    </div>
                    Track Orders
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2" />
                <div className="p-1 relative z-10">
                  <DropdownMenuItem className="px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer gap-4 font-black uppercase tracking-widest text-[10px] transition-all">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <LogOut className="w-4 h-4" />
                    </div>
                    Sign Out Hub
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Secondary Nav */}
        <nav className="hidden md:flex items-center justify-center gap-10 border-t border-slate-100 dark:border-white/5">
          {navLinks.map((link) => (
            <div 
              key={link.label}
              onMouseEnter={() => setActiveCategory(link.label)}
              className="py-3"
            >
              <Link 
                href={link.href} 
                className={cn(
                  "text-[11px] text-slate-500 hover:text-primary transition-all font-black uppercase tracking-widest flex items-center gap-1 group relative",
                  activeCategory === link.label && "text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-[13px] left-0 w-full h-[2px] bg-primary transition-all duration-300",
                  activeCategory === link.label ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
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
            category={activeCategory} 
            isOpen={!!activeCategory} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
