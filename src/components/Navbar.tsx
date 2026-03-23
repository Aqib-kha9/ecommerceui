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
  MapPin,
  Zap,
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
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all">
                <Store className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <span className="font-black text-lg md:text-2xl text-slate-950 dark:text-white tracking-tighter uppercase hidden xs:inline-block">
                Ayur<span className="text-primary italic">Pooja</span>
              </span>
            </Link>

            {/* Mobile-only Deliver Address Picker */}
            <div className="flex-1 md:hidden flex items-center justify-start ml-2 overflow-hidden">
              <div className="flex items-center gap-2 cursor-pointer group max-w-full">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <div className="flex items-center gap-0.5 leading-none">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Deliver to</span>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white truncate max-w-[120px] leading-tight mt-0.5">
                    HSR Layout, Sector 7...
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-only User Actions (User Icon) */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Row 2 (Mobile) / Middle & Right (Desktop): Search & Actions */}
          <div className="flex-1 w-full flex flex-col md:flex-row items-center gap-4">
            {/* Search Bar Container */}
            <div className="flex-1 w-full max-w-2xl flex items-center relative">
              <div className="w-full">
                {(!isHeroSearchVisible || (typeof window !== 'undefined' && window.innerWidth < 768)) ? (
                  <MainSearchBar variant="navbar" />
                ) : (
                  <div className="hidden md:block w-full h-11" />
                )}
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
                        EN <ChevronDown className="w-3 h-3" />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-32 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-1">
                    <DropdownMenuItem className="text-xs font-bold cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-xl py-2.5 px-3 uppercase tracking-tighter">English (EN)</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-bold cursor-pointer hover:bg-primary/5 hover:text-primary transition-all rounded-xl py-2.5 px-3 uppercase tracking-tighter">Hindi (HI)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl h-11 w-11 transition-all relative group">
                  <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background animate-pulse" />
                </Button>
                
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 relative rounded-xl h-11 w-11 transition-all group">
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <Badge className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 p-1 flex items-center justify-center bg-primary text-white text-[10px] rounded-full border-2 border-background font-black shadow-lg shadow-primary/20">
                      3
                    </Badge>
                  </Button>
                </Link>
              </div>

              <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-2" />

              {/* User Account Menu (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" className="gap-3 text-slate-700 dark:text-slate-300 hover:bg-primary/5 pl-1 pr-3 h-11 rounded-2xl group transition-all">
                      <Avatar className="w-8 h-8 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                        <AvatarFallback className="bg-primary text-white text-xs font-black">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start leading-none hidden xs:flex">
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Account</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">John Doe</span>
                      </div>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 p-2 rounded-[1.5rem] shadow-2xl mt-2 overflow-hidden">
                  <DropdownMenuLabel className="px-4 py-4 font-black text-slate-950 dark:text-white text-lg tracking-tighter uppercase">My Space</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5 mx-2" />
                  <div className="p-1 space-y-1">
                    <DropdownMenuItem render={<Link href="/dashboard" />} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 cursor-pointer gap-4 font-bold transition-all h-auto">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400"><User className="w-4 h-4" /></div>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer gap-4 font-black uppercase tracking-widest text-[10px] transition-all h-auto">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><LogOut className="w-4 h-4" /></div>
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Categories Scroll */}
        <nav className="flex md:hidden items-center gap-6 overflow-x-auto no-scrollbar py-3 border-t border-slate-100 dark:border-white/5 px-2">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="text-[10px] text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest whitespace-nowrap active:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Secondary Nav (Categories) */}
        <nav className="hidden md:flex items-center justify-center gap-10 border-t border-slate-100 dark:border-white/5">
          {navLinks.map((link) => (
            <div key={link.label} onMouseEnter={() => setActiveCategory(link.label)} className="py-3">
              <Link 
                href={link.href} 
                className={cn(
                  "text-[11px] text-slate-500 hover:text-primary transition-all font-black uppercase tracking-widest flex items-center gap-1 group relative", 
                  activeCategory === link.label && "text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-[1px] left-0 w-full h-[2px] bg-primary transition-all duration-300", 
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
            category={activeCategory as string} 
            isOpen={!!activeCategory} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
