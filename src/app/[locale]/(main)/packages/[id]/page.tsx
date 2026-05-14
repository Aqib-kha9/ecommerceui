"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Star, ShoppingCart, Zap, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const packagesData: Record<string, { id: string; title: string; category: string; items: number; price: number; original: number; badge: string; rating: number; reviews: number; image: string; description: string; contents: { name: string; qty: string; image: string }[] }> = {
  pk1: { id: "pk1", title: "Movie Night Snack Box", category: "Snacks", items: 8, price: 1249, original: 1599, badge: "SAVE 20%", rating: 4.8, reviews: 2400, image: "https://images.unsplash.com/photo-1549462111-c98f013d8009?q=80&w=800", description: "Everything you need for a perfect movie night. Includes premium popcorn, chips, chocolates, and refreshing drinks — all curated for maximum enjoyment.", contents: [{ name: "Gourmet Popcorn Mix", qty: "200g", image: "https://images.unsplash.com/photo-1505682634904-d7c8d95ccd50?w=80" }, { name: "Premium Potato Chips", qty: "150g", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?w=80" }, { name: "Belgian Chocolate Bar", qty: "100g", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=80" }, { name: "Assorted Biscuits", qty: "200g", image: "https://images.unsplash.com/photo-1558961776-666879e95079?w=80" }, { name: "Sparkling Juice", qty: "500ml", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=80" }, { name: "Nuts & Dried Fruits Mix", qty: "150g", image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=80" }, { name: "Gummy Bears", qty: "100g", image: "https://images.unsplash.com/photo-1582058091403-f5a5b39a21b5?w=80" }, { name: "Salted Pretzels", qty: "100g", image: "https://images.unsplash.com/photo-1570143674034-7e7a4d1f71e7?w=80" }] },
  pk2: { id: "pk2", title: "Glow & Care Beauty Box", category: "Beauty", items: 6, price: 2125, original: 2499, badge: "SAVE 15%", rating: 4.9, reviews: 1800, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800", description: "A premium beauty bundle featuring top-rated skincare essentials for a radiant, glowing complexion.", contents: [{ name: "Vitamin C Face Serum", qty: "30ml", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80" }, { name: "Rose Water Mist", qty: "100ml", image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=80" }, { name: "Aloe Vera Face Wash", qty: "100ml", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=80" }, { name: "SPF 50 Sunscreen", qty: "50ml", image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=80" }, { name: "Under Eye Cream", qty: "15ml", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80" }, { name: "Lip Balm SPF 30", qty: "4g", image: "https://images.unsplash.com/photo-1586495777744-4e6b0c4c7c8b?w=80" }] },
};

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pkg = packagesData[id] || packagesData.pk1;
  const savings = pkg.original - pkg.price;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#08090a] pb-28">
      {/* Back Nav */}
      <div className="bg-white dark:bg-[#0c0d0e] border-b border-slate-100 dark:border-white/5 sticky top-0 z-20">
        <div className="container mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/packages" className="flex items-center gap-1 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
            <ChevronLeft className="w-4 h-4" /> Packages
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Hero Image */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full h-60 md:h-80 rounded-[2rem] overflow-hidden mb-6 shadow-xl">
          <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Badge className="absolute top-5 left-5 bg-primary text-white border-0 font-black rounded-full px-4 py-1">{pkg.badge}</Badge>
          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-[11px] font-black uppercase tracking-widest opacity-70">{pkg.category}</p>
            <h1 className="text-2xl font-black tracking-tight">{pkg.title}</h1>
          </div>
        </motion.div>

        {/* Pricing */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
              <span className="text-sm text-slate-400 line-through ml-2">₹{pkg.original}</span>
              <p className="text-xs font-bold text-green-600 mt-0.5">You save ₹{savings}!</p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-3 py-2 rounded-2xl">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-black text-sm text-amber-700 dark:text-amber-400">{pkg.rating}</span>
              <span className="text-xs text-slate-400">({pkg.reviews.toLocaleString()})</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-xl">
              <Package className="w-3.5 h-3.5 text-primary" /> <span className="font-bold text-primary">{pkg.items} items</span>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/5 px-3 py-1.5 rounded-xl">
              <Zap className="w-3.5 h-3.5 text-green-500" /> <span className="font-bold text-green-600">30 min delivery</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 mb-4 shadow-sm">
          <h2 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-3">About this Package</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{pkg.description}</p>
        </div>

        {/* Included Items */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <h2 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-4">What's Inside ({pkg.items} items)</h2>
          <div className="space-y-3">
            {pkg.contents.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-white shadow-sm">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{item.qty}</p>
                </div>
                <div className="w-6 h-6 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#0c0d0e]/90 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 p-4 z-30">
        <div className="container mx-auto max-w-2xl flex gap-3">
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
            <span className="text-[10px] text-green-600 font-bold">Save ₹{savings}</span>
          </div>
          <Button className="flex-1 h-12 bg-primary rounded-2xl font-black text-[13px] shadow-lg shadow-primary/25 gap-2">
            <ShoppingCart className="w-4 h-4" /> Add Package to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}
