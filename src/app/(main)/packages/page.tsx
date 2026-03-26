"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Search, Star, ShoppingCart, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockPackages = [
  { id: "pk1", title: "Movie Night Snack Box", category: "Snacks", items: 8, price: 1249, original: 1599, badge: "SAVE 20%", rating: 4.8, reviews: 2400, image: "https://images.unsplash.com/photo-1549462111-c98f013d8009?q=80&w=600" },
  { id: "pk2", title: "Glow & Care Beauty Box", category: "Beauty", items: 6, price: 2125, original: 2499, badge: "SAVE 15%", rating: 4.9, reviews: 1800, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600" },
  { id: "pk3", title: "Premium Pantry Essentials", category: "Groceries", items: 12, price: 2249, original: 2999, badge: "SAVE 25%", rating: 4.7, reviews: 3200, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600" },
  { id: "pk4", title: "Newborn Baby Welcome Kit", category: "Baby Care", items: 10, price: 1799, original: 1999, badge: "SAVE 10%", rating: 4.9, reviews: 1100, image: "https://images.unsplash.com/photo-1515488132718-29da396f9fb1?q=80&w=600" },
  { id: "pk5", title: "Morning Coffee Bundle", category: "Snacks", items: 5, price: 840, original: 1200, badge: "SAVE 30%", rating: 4.6, reviews: 850, image: "https://images.unsplash.com/photo-1541167760496-162955ed2a41?q=80&w=600" },
  { id: "pk6", title: "Home Spa Relaxation Set", category: "Beauty", items: 8, price: 2400, original: 3200, badge: "SAVE 25%", rating: 4.7, reviews: 1400, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600" },
  { id: "pk7", title: "Ayur Wellness Hamper", category: "Personal Care", items: 9, price: 1999, original: 2499, badge: "SAVE 20%", rating: 4.9, reviews: 1500, image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600" },
  { id: "pk8", title: "Healthy Breakfast Set", category: "Groceries", items: 7, price: 719, original: 899, badge: "SAVE 20%", rating: 4.8, reviews: 2100, image: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=600" },
];

const categories = ["All", "Snacks", "Beauty", "Groceries", "Baby Care", "Personal Care"];

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockPackages.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08090a] pb-24">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/70 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549462111-c98f013d8009?w=1200')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 py-10 md:py-14 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5" />
            <span className="text-[11px] font-black uppercase tracking-widest opacity-80">Curated Collections</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">Product <span className="italic opacity-80">Packages</span></h1>
          <p className="text-white/70 font-medium text-sm max-w-md">Expertly curated bundles for every need. Save more, get more.</p>
          <div className="flex items-center gap-2 mt-5 bg-white/10 backdrop-blur-sm w-fit px-4 py-2 rounded-2xl">
            <Zap className="w-4 h-4 fill-current animate-pulse" />
            <span className="text-sm font-bold">Delivered in 30 minutes</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search packages..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-11 h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0d0e] font-medium" />
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-bold border transition-all ${activeCategory === cat ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white dark:bg-[#0c0d0e] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((pkg, i) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/packages/${pkg.id}`} className="group bg-white dark:bg-[#0c0d0e] rounded-[1.5rem] border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={pkg.image} alt={pkg.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-0 text-[10px] font-black rounded-full px-3">{pkg.badge}</Badge>
                  <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    {pkg.items} items
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/80 mb-1 block">{pkg.category}</span>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white leading-tight mb-2">{pkg.title}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{pkg.rating} ({pkg.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-base text-slate-900 dark:text-white">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through ml-1.5">₹{pkg.original}</span>
                    </div>
                    <Button size="sm" className="h-8 px-3 bg-primary rounded-xl font-black text-[11px] shadow-primary/20 shadow-sm gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="font-bold text-slate-500">No packages found</p>
          </div>
        )}
      </div>
    </main>
  );
}
