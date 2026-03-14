"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, ChevronDown, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState(true);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCategory && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="bg-slate-950 dark:bg-slate-900 border-b border-slate-800 dark:border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-12 relative">
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">All <span className="text-primary">Products</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">{filtered.length} Essential Items Found</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <Input
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/10 rounded-xl shadow-sm"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Select value={sortBy} onValueChange={(v) => v && setSortBy(v)}>
              <SelectTrigger className="w-44 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl shadow-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 gap-2 rounded-xl shadow-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={() => setGridView(true)}
            >
              <Grid3X3 className={`w-4 h-4 ${gridView ? "text-primary" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white"
              onClick={() => setGridView(false)}
            >
              <List className={`w-4 h-4 ${!gridView ? "text-primary" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-64 shrink-0">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl p-6 sticky top-24 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs">Filters</h3>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-500" onClick={() => setShowFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Category */}
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Category</p>
                  <div className="flex flex-col gap-1.5">
                    {["All", ...categories.map(c => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                          selectedCategory === cat
                            ? "bg-primary/20 text-primary"
                            : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-slate-700 mb-6" />

                {/* Price Range */}
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Price Range</p>
                  <Slider
                    min={0}
                    max={50000}
                    step={500}
                    value={priceRange}
                    onValueChange={(v) => Array.isArray(v) && setPriceRange(v)}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="bg-slate-700 mb-6" />

                {/* Rating */}
                <div>
                  <p className="text-sm font-semibold text-white mb-3">Min Rating</p>
                  {[4, 3, 2].map((r) => (
                    <button key={r} className="flex items-center gap-2 w-full text-left py-1.5 text-sm text-slate-400 hover:text-white">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= r ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                        ))}
                      </div>
                      <span>& above</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {selectedCategory !== "All" && (
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-sm text-slate-400">Active filters:</span>
                <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </div>
            )}

            {sorted.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-semibold">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className={gridView
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                : "flex flex-col gap-4"
              }>
                {sorted.map((product) => (
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
