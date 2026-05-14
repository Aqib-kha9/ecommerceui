"use client";

import { useState, useMemo } from "react";
import {
  SlidersHorizontal, Grid3X3, List, Star, X,
  Sparkles, TrendingUp, ChevronRight, LayoutGrid,Search, Package, Tag, SortAsc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { useSearch } from "@/components/SearchContext";
import { useLocale } from "next-intl";
import { useEffect, useCallback } from "react";

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured",          icon: Sparkles   },
  { value: "trending",   label: "Trending",           icon: TrendingUp },
  { value: "price-low",  label: "Price: Low → High",  icon: SortAsc    },
  { value: "price-high", label: "Price: High → Low",  icon: SortAsc    },
  { value: "rating",     label: "Top Rated",          icon: Star       },
];
const RATING_OPTIONS = [4, 3, 2];

// ─── Shared filter body (used in sidebar & mobile sheet) ───────────────────────
function FilterBody({
  sortBy, setSortBy,
  priceRange, setPriceRange,
  minRating, setMinRating,
}: {
  sortBy: string; setSortBy: (v: string) => void;
  priceRange: number[]; setPriceRange: (v: number[]) => void;
  minRating: number; setMinRating: (v: number) => void;
}) {
  return (
    <>
      {/* Sort */}
      <div className="mb-6">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Sort By</p>
        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className={`flex items-center gap-2.5 text-left text-xs px-3 py-2 rounded-xl transition-all ${
                sortBy === value
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="w-3 h-3 shrink-0" />
              {label}
              {sortBy === value && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      <Separator className="mb-5 bg-slate-100 dark:bg-white/5" />

      {/* Price Range */}
      <div className="mb-6">
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Price Range</p>
        <Slider min={0} max={50000} step={500} value={priceRange}
          onValueChange={(v) => Array.isArray(v) && setPriceRange(v)} className="mb-4" />
        <div className="flex items-center justify-between gap-2">
          {[priceRange[0], priceRange[1]].map((val, i) => (
            <div key={i} className="flex-1 text-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-2 py-1.5 text-xs font-black text-slate-700 dark:text-white">
              ₹{val.toLocaleString()}
            </div>
          ))}
        </div>
      </div>

      <Separator className="mb-5 bg-slate-100 dark:bg-white/5" />

      {/* Rating */}
      <div>
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3">Min Rating</p>
        <div className="flex flex-col gap-1">
          {RATING_OPTIONS.map((r) => (
            <button key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex items-center gap-2.5 text-left px-3 py-2 rounded-xl transition-all ${
                minRating === r
                  ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-3 h-3 ${s <= r ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700"}`} />
                ))}
              </div>
              <span className="text-xs">{r}+ stars</span>
              {minRating === r && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  const locale = useLocale();
  const { searchQuery: search, setSearchQuery: setSearch } = useSearch();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange,       setPriceRange]       = useState([0, 50000]);
  const [sortBy,           setSortBy]           = useState("featured");
  const [gridView,         setGridView]         = useState(true);
  const [minRating,        setMinRating]        = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading,        setIsLoading]        = useState(true);

  const safeParse = (val: any) => {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'object' && val.d) {
      try { return parseFloat(`${val.s * val.d[0]}.${val.d.slice(1).join('') || '0'}`); } catch(e) { return 0; }
    }
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/categories`, {
        headers: { "Accept-Language": locale }
      });
      const json = await res.json();
      if (json.status === "success") {
        setCategories(json.data.categories);
      }
    } catch (e) { console.error(e); }
  }, [locale]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const query = new URLSearchParams();
      if (selectedCategory !== "All") {
        const cat = categories.find(c => {
          const name = typeof c.name === 'object' ? (c.name[locale] || c.name.en) : c.name;
          return name === selectedCategory;
        });
        if (cat) query.append("category", cat.id);
      }
      if (search) query.append("search", search);
      if (sortBy) query.append("sort", sortBy);
      if (priceRange[0] > 0) query.append("minPrice", priceRange[0].toString());
      if (priceRange[1] < 50000) query.append("maxPrice", priceRange[1].toString());
      if (minRating > 0) query.append("minRating", minRating.toString());
      query.append("limit", "40");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/products?${query.toString()}`, {
        headers: { "Accept-Language": locale }
      });
      const json = await res.json();
      if (json.status === "success") {
        const mapped = json.data.products.map((p: any) => {
          const nameStr = typeof p.name === 'object' ? (p.name[locale] || p.name.en || Object.values(p.name)[0]) : p.name;
          const catName = p.category?.name;
          const catStr = typeof catName === 'object' ? (catName[locale] || catName.en || Object.values(catName)[0]) : (catName || "Essential");
          
          return {
            id: p.id,
            name: nameStr,
            price: safeParse(p.price),
            originalPrice: safeParse(p.mrp),
            rating: safeParse(p.rating) || 4.5,
            reviews: p.reviewsCount || 0,
            image: p.images?.[0] || p.image,
            images: p.images || (p.image ? [p.image] : []),
            category: catStr,
            badge: p.badge || (safeParse(p.mrp) > safeParse(p.price) ? `-${Math.round(((safeParse(p.mrp) - safeParse(p.price)) / safeParse(p.mrp)) * 100)}%` : null),
            inStock: p.stock > 0
          };
        });
        
        setProducts(mapped);
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, [locale, selectedCategory, search, sortBy, priceRange[0], priceRange[1], minRating, categories]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const allCategoryNames = ["All", ...categories.map((c) => typeof c.name === 'object' ? (c.name[locale] || c.name.en) : c.name)];

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setPriceRange([0, 50000]);
    setMinRating(0);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Mobile Filter Sheet ─────────────────────────────────────── */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-t-3xl p-5 max-h-[88vh] overflow-y-auto z-10 shadow-2xl">
            {/* Handle */}
            <div className="w-10 h-1 bg-slate-200 dark:bg-white/20 rounded-full mx-auto mb-5" />
            {/* Sheet header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Filters & Sort</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center">{activeFilterCount}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="text-xs text-primary font-bold">Clear all</button>
                )}
                <button onClick={() => setMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <FilterBody
              sortBy={sortBy} setSortBy={setSortBy}
              priceRange={priceRange} setPriceRange={setPriceRange}
              minRating={minRating} setMinRating={setMinRating}
            />

            <Button className="w-full mt-6 h-12 rounded-2xl font-bold text-sm" onClick={() => setMobileFilterOpen(false)}>
              Show {products.length} Results
            </Button>
          </div>
        </div>
      )}

      {/* ── Hero Banner ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 dark:bg-[#080810]">
        <div className="absolute -top-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 md:w-96 h-72 md:h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="container mx-auto px-5 py-8 md:py-14 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-3">
                <span>Home</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-primary">Products</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-2">
                All{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--primary-gradient)" }}>
                  Products
                </span>
              </h1>
              <p className="text-slate-400 text-xs md:text-sm font-medium">
                Discover <span className="text-white font-bold">{products.length} curated items</span> — from organic essentials to premium lifestyle goods.
              </p>
            </div>

            {/* Stats — hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-3 flex-wrap">
              {[
                { icon: Package,    label: "Products",   value: products.length },
                { icon: LayoutGrid, label: "Categories", value: categories.length },
                { icon: Tag,        label: "Deals",      value: products.filter((p) => p.badge).length },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 backdrop-blur-sm">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <div>
                    <div className="text-white font-black text-sm leading-none">{value}+</div>
                    <div className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bar: Category pills + mobile controls ───────────── */}
      {/*   Mobile navbar ≈ 104px (no secondary nav) | Desktop navbar ≈ 102px          */}
      <div className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-[104px] md:top-[102px] z-30 shadow-sm">
        <div className="container mx-auto px-5">

          {/* Category pills row */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 border-b border-border/40 md:border-0">
            {allCategoryNames.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                      : "bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Mobile-only: filter + results + view toggle */}
          <div className="flex md:hidden items-center justify-between gap-2 py-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className={`flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-bold border transition-all ${
                  activeFilterCount > 0
                    ? "bg-primary text-white border-primary"
                    : "text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white/25 text-[9px] font-black flex items-center justify-center">{activeFilterCount}</span>
                )}
              </button>
              <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-1" />
              <span className="text-[11px] text-slate-500 font-bold">
                {products.length} <span className="font-normal opacity-70">items</span>
              </span>
            </div>

            <div className="flex bg-slate-100 dark:bg-white/5 rounded-xl p-0.5 gap-0.5 shrink-0">
              <button onClick={() => setGridView(true)}
                className={`p-1.5 rounded-lg transition-all ${gridView ? "bg-white dark:bg-white/10 text-primary shadow-sm" : "text-slate-400"}`}>
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setGridView(false)}
                className={`p-1.5 rounded-lg transition-all ${!gridView ? "bg-white dark:bg-white/10 text-primary shadow-sm" : "text-slate-400"}`}>
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Layout ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-5 py-6 md:py-8">
        <div className="flex gap-7">

          {/* ── Desktop Sidebar (hidden on mobile) ───────────────────── */}
          <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col gap-4 sticky top-[204px] md:top-[164px] self-start max-h-[calc(100vh-164px)] overflow-y-auto no-scrollbar pt-1">
            {/* Filter card */}
            <div className="bg-white dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.07] rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center">{activeFilterCount}</span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={clearAllFilters} className="text-[10px] text-primary font-bold hover:underline">Clear all</button>
                )}
              </div>
              <FilterBody
                sortBy={sortBy} setSortBy={setSortBy}
                priceRange={priceRange} setPriceRange={setPriceRange}
                minRating={minRating} setMinRating={setMinRating}
              />
            </div>
          </aside>

          {/* ── Products Column ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0">


            {/* Mobile: active filter badges (compact) */}
            {activeFilterCount > 0 && (
              <div className="flex md:hidden items-center gap-1.5 flex-wrap mb-3">
                {selectedCategory !== "All" && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 gap-1 text-[10px] font-bold rounded-full px-2 py-0.5">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}><X className="w-2.5 h-2.5" /></button>
                  </Badge>
                )}
                {minRating > 0 && (
                  <Badge className="bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 gap-1 text-[10px] font-bold rounded-full px-2 py-0.5">
                    {minRating}+ ★
                    <button onClick={() => setMinRating(0)}><X className="w-2.5 h-2.5" /></button>
                  </Badge>
                )}
              </div>
            )}

            {/* Empty state */}
            {isLoading ? (
               <div className={
                gridView
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                  : "flex flex-col gap-3"
              }>
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-2xl bg-slate-100 dark:bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-24 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 md:w-7 md:h-7 text-primary/50" />
                </div>
                <p className="text-base font-black text-slate-700 dark:text-white mb-1">No products found</p>
                <p className="text-sm text-slate-400 max-w-xs mb-5">Try adjusting your filters or searching for something else.</p>
                <Button onClick={clearAllFilters} size="sm" className="rounded-xl text-xs font-bold gap-2">
                  <X className="w-3.5 h-3.5" /> Reset filters
                </Button>
              </div>
            ) : (
              <div className={
                gridView
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                  : "flex flex-col gap-3"
              }>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
