"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, User, Grid } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Grid, label: "Categories", href: "/products" },
  { icon: Search, label: "Search", href: "/products" },
  { icon: ShoppingCart, label: "Cart", href: "/cart", badge: 3 },
  { icon: User, label: "Profile", href: "/dashboard" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="fixed inset-x-0 bottom-0 z-[9999] md:hidden border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-x-2 top-1 bottom-1 bg-primary/10 rounded-2xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isActive ? "text-primary scale-110" : "text-slate-400 group-active:scale-90"
                  )}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] flex items-center justify-center bg-primary text-white text-[8px] font-black rounded-full border-2 border-white dark:border-[#0c0d0e] shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span
                className={cn(
                  "text-[9px] font-black mt-1 uppercase tracking-tighter transition-colors",
                  isActive ? "text-primary" : "text-slate-500"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
