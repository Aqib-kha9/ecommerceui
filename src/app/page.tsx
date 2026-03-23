"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Truck,
  Headphones,
  Sparkles,
  ChevronRight,
  Search,
  MapPin,
  Clock,
  Zap,
  Percent,
  ChevronDown,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { products, categories, Product } from "@/lib/data";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useSearch } from "@/components/SearchContext";
import MainSearchBar from "@/components/MainSearchBar";

const brands = [
  { name: "Amul", image: "https://static.cdnlogo.com/logos/a/80/amul.svg" },
  { name: "Nestle", image: "https://static.cdnlogo.com/logos/n/80/nestle.svg" },
  { name: "Dabur", image: "https://static.cdnlogo.com/logos/d/76/dabur_800.png" },
  { name: "Himalaya", image: "https://static.cdnlogo.com/logos/h/80/himalaya-wellness.svg" },
  { name: "Tata", image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg" },
  { name: "Brittania", image: "https://static.cdnlogo.com/logos/b/80/britannia-industries.svg" },
  { name: "ITC", image: "https://static.cdnlogo.com/logos/i/34/itc-limited.svg" },
  { name: "Fortune", image: "https://static.cdnlogo.com/logos/f/45/fortune.svg" },
];

export default function HomePage() {
  const { searchQuery, setSearchQuery, isHeroSearchVisible } = useSearch();
  const [activePlaceholder, setActivePlaceholder] = useState(0);
  useEffect(() => {
    // Placeholder logic moved to MainSearchBar
  }, []);

  const trendingSearches = [
    "Fresh Vegetables", "Pantry Essentials", "Breakfast", "Snacks", "Beauty"
  ];
  const promoOffers = [
    {
      title: "Pharmacy\nDelivered",
      subtitle: "Medicines & wellness essentials",
      image: "/pharmacy-banner.png",
      color: "bg-[#e8f4f9] dark:bg-slate-800/50"
    },
    {
      title: "Beauty\nRegimen",
      subtitle: "Curated skincare & wellness",
      image: "/pet-card.png",
      color: "bg-[#fdf0e8] dark:bg-slate-800/50"
    },
    {
      title: "Diaper\nRun?",
      subtitle: "Baby care essentials delivered",
      image: "/baby-card.png",
      color: "bg-[#e8f9ed] dark:bg-slate-800/50"
    }
  ];

  const productPackages: Product[] = [
    {
      id: "pkg-1",
      name: "The Gourmet Movie Night Snack Box",
      itemsCount: 8,
      rating: 4.8,
      reviews: 2400,
      badge: "SAVE 20%",
      originalPrice: 1599,
      price: 1249,
      category: "Gourmet Selection",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Gourmet Selections Ltd.",
      description: "A perfect collection for movie nights.",
      tags: ["snacks", "gift", "movie"],
      images: [
        "https://images.unsplash.com/photo-1549462111-c98f013d8009?q=80&w=800",
        "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=800",
        "https://images.unsplash.com/photo-1505682634904-d7c8d95ccd50?q=80&w=800"
      ],
    },
    {
      id: "pkg-2",
      name: "The Ultimate Glow & Care Beauty Box",
      itemsCount: 6,
      rating: 4.9,
      reviews: 1800,
      badge: "SAVE 15%",
      originalPrice: 2499,
      price: 2125,
      category: "Luxury Beauty",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Luxury Beauty Co.",
      description: "Premium beauty care essentials.",
      tags: ["beauty", "gift", "wellness"],
      images: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800",
        "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800",
        "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800"
      ],
    },
    {
      id: "pkg-3",
      name: "Premium Pantry Essentials Bundle",
      itemsCount: 12,
      rating: 4.7,
      reviews: 3200,
      badge: "SAVE 25%",
      originalPrice: 2999,
      price: 2249,
      category: "Gourmet Grocery",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Daily Pantry Essentials",
      description: "Essential grocery staples in one bundle.",
      tags: ["grocery", "bundle", "staples"],
      images: [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800",
        "https://images.unsplash.com/photo-1506484334402-40f215d2f4fd?q=80&w=800",
        "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800"
      ],
    },
    {
      id: "pkg-4",
      name: "Newborn Baby Welcome Kit",
      itemsCount: 10,
      rating: 4.9,
      reviews: 1100,
      badge: "SAVE 10%",
      originalPrice: 1999,
      price: 1799,
      category: "Baby Care",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Gently Baby Care",
      description: "Everything a new parent needs.",
      tags: ["baby", "gift", "essentials"],
      images: [
        "https://images.unsplash.com/photo-1515488132718-29da396f9fb1?q=80&w=800",
        "https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?q=80&w=800",
        "https://images.unsplash.com/photo-1522771930067-f316274025f8?q=80&w=800"
      ],
    },
    {
      id: "pkg-5",
      name: "Office Breakroom Coffee Bundle",
      itemsCount: 5,
      rating: 4.6,
      reviews: 850,
      badge: "SAVE 30%",
      originalPrice: 1200,
      price: 840,
      category: "Office Supplies",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Office Supplies Plus",
      description: "Premium coffee for your office breakroom.",
      tags: ["coffee", "office", "supplies"],
      images: [
        "https://images.unsplash.com/photo-1541167760496-162955ed2a41?q=80&w=800",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800"
      ],
    },
    {
      id: "pkg-6",
      name: "Healthy Morning Breakfast Set",
      itemsCount: 7,
      rating: 4.8,
      reviews: 2100,
      badge: "SAVE 20%",
      originalPrice: 899,
      price: 719,
      category: "Healthy Living",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Healthy Living Foods",
      description: "Nutritious selection for a healthy start.",
      tags: ["breakfast", "health", "wellness"],
      images: [
        "https://images.unsplash.com/photo-149485981460c-38503d6f4448?q=80&w=800",
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=800",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800"
      ],
    },
    {
      id: "pkg-7",
      name: "Ayur Pooja Wellness Hamper",
      itemsCount: 9,
      rating: 4.9,
      reviews: 1500,
      badge: "SAVE 20%",
      originalPrice: 2499,
      price: 1999,
      category: "Wellness",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "PurePlus Personal Care",
      description: "A complete ayurvedic wellness set for a healthy lifestyle.",
      tags: ["wellness", "gift", "ayurvedic"],
      images: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
        "https://images.unsplash.com/photo-1560963652-ae35208886ae?q=80&w=800"
      ],
    },
    {
      id: "pkg-8",
      name: "Artisan Chocolate Tasting Kit",
      itemsCount: 4,
      rating: 5.0,
      reviews: 920,
      badge: "SAVE 20%",
      originalPrice: 1800,
      price: 1440,
      category: "Gourmet Selection",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Artisan Chocolatiers",
      description: "Handcrafted chocolate tasting experience.",
      tags: ["chocolate", "gift", "gourmet"],
      images: [
        "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800",
        "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800",
        "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=800"
      ],
    },
    {
      id: "pkg-9",
      name: "Home Spa Relaxation Set",
      itemsCount: 8,
      rating: 4.7,
      reviews: 1400,
      badge: "SAVE 25%",
      originalPrice: 3200,
      price: 2400,
      category: "Personal Care",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Personal Spa Essentials",
      description: "Relaxing spa items for your home.",
      tags: ["spa", "gift", "relaxation"],
      images: [
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
        "https://images.unsplash.com/photo-1560963652-ae35208886ae?q=80&w=800"
      ],
    },
    {
      id: "pkg-10",
      name: "Quick & Easy Dinner Bundle",
      itemsCount: 6,
      rating: 4.5,
      reviews: 2600,
      badge: "SAVE 15%",
      originalPrice: 1100,
      price: 935,
      category: "Grocery",
      inStock: true,
      vendorId: "v-premium",
      vendorName: "Daily Grocery Supplies",
      description: "Selection of quick dinner essentials.",
      tags: ["grocery", "bundle", "dinner"],
      images: [
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800",
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800"
      ],
    }
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#08090a] text-foreground overflow-hidden">
      {/* ── MINIMALIST SEARCH HERO ── */}
      <section ref={targetRef} className="relative h-[60vh] md:h-[85vh] min-h-[450px] md:min-h-[650px] overflow-hidden flex items-start justify-center pt-12 md:pt-12">
        <HeroVideoBackground />

        <motion.div
          style={{ opacity: contentOpacity, scale: contentScale }}
          className="container mx-auto px-4 relative z-30 flex flex-col items-center text-center"
        >
          <div className="max-w-4xl w-full space-y-6">
            {/* Minimalist Powerful Heading */}
            <div className="space-y-1">
                <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-8xl font-black text-slate-950 dark:text-white leading-[0.95] tracking-tighter"
              >
                Find what you need<br />
                <span className="text-primary italic">In seconds.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-slate-700 dark:text-slate-300 text-base md:text-xl font-bold drop-shadow-sm opacity-80"
              >
                Everything for your home, delivered with speed.
              </motion.p>
            </div>

            {/* Unified "Tagda" Search Interface with True 3D Shared Element Flight */}
            <div className="relative w-full min-h-28 flex flex-col items-center">
              {isHeroSearchVisible && (
                <MainSearchBar variant="hero" />
              )}

              {/* Elite Trending Searches Grid */}
              <div className="flex flex-col items-center w-full mt-8 md:mt-10 space-y-4 px-4 overflow-visible">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Popular Searches</span>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-2.5 max-w-sm md:max-w-xl">
                  {trendingSearches.map((tag, i) => (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(var(--primary), 0.05)" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.5 + (i * 0.08) 
                      }}
                      className="group relative px-4 py-2 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/40 transition-all backdrop-blur-md shadow-sm hover:shadow-primary/5"
                    >
                      <span className="relative z-10 uppercase tracking-wider">{tag}</span>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-xl" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </motion.div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="relative z-40 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center">
            {promoOffers.map((offer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`flex-1 min-w-[300px] md:min-w-[400px] relative overflow-hidden rounded-[2rem] ${offer.color} p-8 md:p-10 flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-2 shadow-sm border border-slate-100 dark:border-white/5 h-[200px] md:h-[240px]`}
              >
                <div className="relative z-10 w-[60%] h-full flex flex-col justify-center">
                  <div className="space-y-2 mb-6">
                    <h4 className={`text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tighter uppercase whitespace-pre-line`}>
                      {offer.title}
                    </h4>
                    <p className={`text-xs font-bold text-slate-600 dark:text-slate-300 opacity-90 leading-snug tracking-widest uppercase`}>
                      {offer.subtitle}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 group/btn w-fit">
                    <span className={`text-[13px] font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5 tracking-tight group-hover/btn:text-primary group-hover/btn:border-primary transition-all dark:text-white dark:border-white dark:group-hover/btn:border-primary uppercase`}>
                      Explore Now
                    </span>
                  </div>
                </div>

                {/* Floating Product Image with Depth */}
                <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none select-none overflow-visible">
                  <div className="relative w-full h-full p-4 transition-transform duration-700 ease-out flex items-center justify-center group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={offer.image}
                      alt={offer.title.replace('\n', ' ')}
                      fill
                      className="object-contain object-center drop-shadow-2xl"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIQUE SIGNATURE ARCH CARDS ── */}
      <section className="container mx-auto px-4 py-8 md:py-16 overflow-hidden">
        {/* Mobile Category Grid (Blinkit Style) */}
        <div className="md:hidden grid grid-cols-4 gap-y-6 gap-x-2">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.name}`} className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-[#f0f9f4] dark:bg-emerald-500/10 flex items-center justify-center p-3 transition-transform group-active:scale-90 overflow-hidden relative border border-emerald-100/50 dark:border-emerald-500/20">
                <div className="relative w-full h-full">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight tracking-tight">
                {cat.name.split(' ').join('\n')}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Signature Arch Cards */}
        <div className="hidden md:flex overflow-x-auto scrollbar-hide gap-4 md:flex-wrap md:gap-6 shrink-0 md:justify-center items-start pb-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.name}`} className="group flex flex-col items-center shrink-0 w-[100px] md:w-[130px]">
              <div className="relative w-full aspect-[3/4.2] rounded-t-full rounded-b-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:border-primary/20 bg-white dark:bg-[#0c0d0e] p-2 md:p-2.5 flex flex-col">
                <div className="relative w-full flex-1 rounded-t-full rounded-b-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800 border border-slate-100/50 dark:border-white/5">
                  <Image
                    src={cat.icon}
                    alt={cat.name}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="h-12 md:h-14 flex flex-col items-center justify-center shrink-0 w-full relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-full opacity-100 group-hover:opacity-0">
                    <span className="text-[11px] md:text-[13px] font-black text-slate-800 dark:text-slate-100 text-center leading-tight tracking-tight px-1 drop-shadow-sm">
                      {cat.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 group-hover:scale-105 transition-transform duration-300 delay-100">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── REFINED FULL WIDTH OFFER BANNER ── */}
      <section className="w-full pb-12 md:pb-16 relative">
        {/* Banner Background Layer - Clipped */}
        <div className="absolute inset-0 h-[400px] md:h-[250px] bg-gradient-to-r from-primary/5 via-primary/10 to-transparent dark:from-primary/10 dark:via-primary/20 dark:to-transparent overflow-hidden" />
        
        <div className="relative h-[400px] md:h-[250px] w-full flex items-center">
          {/* Subtle Background Elements (inside clipped layer or separate) */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 dark:from-black/20 to-transparent pointer-events-none overflow-hidden" />
          
          <div className="container mx-auto h-full px-6 relative">
            <div className="flex flex-col md:flex-row h-full items-center gap-8 md:gap-12">

              {/* Left Content */}
              <div className="flex-1 z-20 py-8 md:py-0 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter mb-4 whitespace-nowrap">
                  Back to School <span className="text-primary">Essentials.</span>
                </h3>

                <div className="mb-6 flex justify-center md:justify-start">
                  <button className="group/shop relative px-8 py-3 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-full overflow-hidden shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95">
                    <span className="relative z-10 flex items-center gap-2">
                      Shop Now <ArrowRight className="w-4 h-4 group-hover/shop:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/shop:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs md:text-lg font-bold tracking-tight mb-0">
                  GET FLAT <span className="text-xl md:text-3xl font-black text-primary px-2 bg-primary/10 rounded-lg">50% OFF</span> ON EVERYTHING
                </p>
              </div>

              {/* Right Media - LARGE TOP-ONLY OVERFLOW */}
              <div className="flex-1 relative h-full w-full pointer-events-none min-h-[300px] md:min-h-0 z-30">
                <div className="absolute inset-x-0 top-[-40%] bottom-[5%] flex items-end justify-center md:justify-end">
                  <div className="relative w-[180%] h-[105%] md:w-[200%] md:h-[105%] transform rotate-3 group-hover:rotate-0 transition-all duration-1000 ease-out">
                    <Image
                      src="/front-view-back-school-concept-with-copy-space__2_.png"
                      alt="Premium School Supplies"
                      fill
                      className="object-contain object-bottom md:object-right-bottom drop-shadow-[0_50px_80px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_50px_80px_rgba(255,255,255,0.08)]"
                      priority
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── COMPACT PREMIUM GIFT BOX STYLE PACKAGES ── */}
      <section className="container mx-auto px-4 py-16 bg-slate-50/50 dark:bg-[#08090a]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              Curated <span className="text-primary italic">Gift Boxes.</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium tracking-tight">Perfectly bundled selections for any occasion.</p>
          </div>
          <Button variant="outline" className="rounded-full border-slate-200 dark:border-white/10 font-black text-[10px] uppercase tracking-widest px-6 h-9">
            View All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {productPackages.map((pkg) => (
            <ProductCard key={pkg.id} product={pkg} layout="square" />
          ))}
        </div>
      </section>

      {/* ── BRAND LOGO MARQUEE ── */}
      <section className="bg-primary/[0.02] dark:bg-primary/[0.01] py-12 md:py-20 border-y border-slate-100 dark:border-white/10 overflow-hidden">
        <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 font-black">Premium Brand Partners</p>
        </div>
        
        <div className="relative flex overflow-hidden">
          {/* Marquee Track using Framer Motion */}
          <motion.div 
            className="flex gap-5 md:gap-10 items-center whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 30, 
              repeat: Infinity 
            }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div key={`${brand.name}-${i}`} className="flex flex-col items-center gap-2 group cursor-pointer transition-all duration-500 flex-shrink-0">
                <div className="w-16 h-16 md:w-28 md:h-28 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center p-4 group-hover:scale-110 transition-transform ">
                  <div className="relative w-full h-full">
                    <Image 
                      src={brand.image} 
                      alt={brand.name} 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">{brand.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MOST SELLING PRODUCTS ── */}
      <section className="container mx-auto px-4 py-12 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Most Sold <span className="text-primary italic">Products</span></h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 font-medium italic underline underline-offset-4 decoration-primary/30">Top-rated favorites by our community</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="text-primary hover:opacity-80 gap-2 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
              See All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} layout="horizontal" />
          ))}
        </div>
      </section>

      {/* ── MOBILE APP DOWNLOAD SECTION ── */}
      <section className="container mx-auto">
        <div className="relative overflow-hidden  bg-primary/[0.03] dark:bg-primary/[0.02]  p-8 md:p-16">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <Badge className="mb-4 md:mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-1 rounded-full uppercase tracking-widest text-[9px] font-black">Mobile Experience</Badge>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 leading-[1.1] tracking-tighter">
                Shop on the go with our <br />
                <span className="text-primary">Premium Mobile App.</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 md:mb-10 text-base md:text-lg font-medium max-w-lg leading-relaxed">
                Get the best deals, real-time tracking, and exclusive app-only rewards. Download now and start your premium shopping journey.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {/* App Store Button */}
                <button className="flex items-center gap-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white ">
                  <div className="w-8 h-8 relative">
                    <svg viewBox="0 0 384 512" className="w-full h-full fill-current">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-20.8-83.6-20.2-42.3.8-81.3 24.7-103 62.5-44.5 77.4-11.4 191.2 31.9 253.5 21.3 30.6 46.3 64.6 79.1 63.3 31.1-1.3 43.1-20.3 80.5-20.3 37.2 0 48.4 20.3 80.8 19.7 33.7-.6 55.4-30.8 76.5-61.4 24.4-35.4 34.4-69.7 34.6-71.3-.8-.3-66.8-25.6-67.1-102.6zm-50.6-180.3c15.8-19.1 27-45.7 24.1-72.3-22.9 1.1-50.6 15.6-67 34.6-14.7 16.9-27.5 44.4-24.1 70.3 25.5 2 51.2-13.5 67-32.6z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Download on</div>
                    <div className="text-lg font-black leading-tight">App Store</div>
                  </div>
                </button>

                {/* Play Store Button */}
                <button className="flex items-center gap-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-2xl hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all shadow-xl active:scale-95 group">
                  <div className="w-8 h-8 relative">
                    <svg viewBox="0 0 512 512" className="w-full h-full fill-current">
                      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.3 18-28.5-1.2-40.8zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Get it on</div>
                    <div className="text-lg font-black leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Media Mockup */}
            <div className="flex-1 relative w-full h-[400px] md:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Visual Glow behind phone */}
                <div className="absolute w-[80%] h-[80%] bg-primary/20 rounded-full blur-[80px]" />
                
                <div className="relative w-[280px] h-[550px] md:w-[320px] md:h-[620px] transition-all duration-1000 ease-out">
                  <div className="absolute inset-0 rounded-[3rem] border-[12px] border-slate-900 dark:border-slate-800 shadow-2xl overflow-hidden bg-white dark:bg-slate-950">
                    {/* Simulated App UI */}
                    <div className="relative h-full w-full flex flex-col pt-10 px-4">
                      {/* Status Bar */}
                      <div className="absolute inset-x-0 top-0 h-10 bg-white dark:bg-slate-950 flex items-center justify-center z-20">
                        <div className="w-20 h-4 bg-slate-200 dark:bg-white/10 rounded-full" />
                      </div>

                      {/* App Header */}
                      <div className="flex items-center justify-between mb-6 mt-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="w-4 h-0.5 bg-primary rounded-full relative after:absolute after:top-1.5 after:left-0 after:w-4 after:h-0.5 after:bg-primary after:rounded-full before:absolute before:-top-1.5 before:left-0 before:w-4 before:h-0.5 before:bg-primary before:rounded-full" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5" />
                      </div>

                      {/* Search Bar */}
                      <div className="h-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center px-3 mb-6">
                        <div className="w-3 h-3 rounded-full border-2 border-slate-300 dark:border-slate-600 mr-2" />
                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                      </div>

                      {/* Categories */}
                      <div className="flex gap-3 mb-6 overflow-hidden">
                        {['Groceries', 'Snacks', 'Drinks'].map((cat, i) => (
                          <div key={i} className={`px-4 py-2 rounded-xl text-[10px] font-black border ${i === 0 ? 'bg-primary border-primary text-white' : 'border-slate-100 dark:border-white/5 text-slate-400'}`}>
                            {cat}
                          </div>
                        ))}
                      </div>

                      {/* Product Grid (Simulated) */}
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="bg-slate-50 dark:bg-white/5 rounded-2xl p-2 border border-slate-100 dark:border-white/5">
                            <div className="aspect-square bg-white dark:bg-white/10 rounded-lg mb-2 relative overflow-hidden">
                               <div className="absolute inset-0 bg-primary/5" />
                            </div>
                            <div className="w-12 h-1.5 bg-primary/20 rounded-full mb-1" />
                            <div className="w-8 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                          </div>
                        ))}
                      </div>

                      {/* Bottom Nav */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 flex items-center justify-around px-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={`w-6 h-6 rounded-lg ${i === 1 ? 'bg-primary' : 'bg-slate-100 dark:bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
}
