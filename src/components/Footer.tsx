"use client";

import React from "react";
import Link from "next/link";
import { Store, Facebook, Twitter, Instagram, Youtube, Mail, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColorSwitcher } from "./ColorSwitcher";
import { useTheme } from "next-themes";

const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Best Sellers", href: "/products?filter=best" },
    { label: "Deals & Offers", href: "/products?filter=deals" },
    { label: "All Categories", href: "/products" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Sustainable Sourcing", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Track Order", href: "/dashboard" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/5">
      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Appearance</span>
      <div className="flex items-center gap-2 border-r border-slate-200 dark:border-white/10 pr-4 mr-2">
        <ColorSwitcher />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl h-8 w-8 transition-colors"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[var(--primary-gradient)] flex items-center justify-center shadow-lg shadow-primary/20">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter uppercase">
                Bazaar<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-sm font-medium leading-relaxed mb-8 max-w-xs text-slate-500 dark:text-slate-400">
              Premium FMCG delivery for the modern household. Quality groceries and essentials curated for your lifestyle.
            </p>
            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> Newsletter
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-primary text-sm h-11 rounded-xl shadow-sm"
                />
                <Button className="bg-primary text-primary-foreground hover:opacity-90 shrink-0 h-11 px-6 font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all">Subscribe</Button>
              </div>
            </div>
            {/* Socials */}
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="font-black text-slate-900 dark:text-white mb-6 text-xs uppercase tracking-[0.2em]">{section}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-white/5">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
            <p className="text-slate-400 dark:text-slate-600 text-center md:text-left">© 2024 BazaarHub. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-400 dark:text-slate-600 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-slate-400 dark:text-slate-600 hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          <AppearanceSettings />
        </div>
      </div>
    </footer>
  );
}
