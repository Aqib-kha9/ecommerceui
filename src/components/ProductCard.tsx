"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Zap, Truck, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function ProductCard({ 
  product, 
  layout = "square" 
}: { 
  product: Product, 
  layout?: "square" | "horizontal" 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayImages = product.images || (product.image ? [product.image] : []);
  const hasMultipleImages = displayImages.length > 1;

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeImageIndex) {
        setActiveImageIndex(newIndex);
      }
    }
  };

  if (layout === "horizontal") {
    return (
      <div className="bg-white dark:bg-[#0c0d0e] rounded-[1rem] border border-slate-200 dark:border-white/5 p-1 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full group/card">
        {/* Product Image Carousel */}
        <div className="relative aspect-[5/4] w-full rounded-[0.7rem] overflow-hidden mb-1.5 shrink-0 group">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayImages.map((img: string, idx: number) => (
              <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative">
                <Image 
                  src={img} 
                  alt={`${product.name} ${idx + 1}`} 
                  fill 
                  className="object-cover group-hover/card:scale-105 transition-transform duration-700" 
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          {hasMultipleImages && (
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 px-1 py-0.5 bg-black/20 backdrop-blur-md rounded-full shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {displayImages.map((_: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`w-0.5 h-0.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIndex 
                      ? "bg-white w-2" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Badge overlay */}
          {product.badge && (
            <div className="absolute top-1.5 left-1.5 bg-primary text-white px-1.5 py-0 rounded-full shadow-lg">
              <span className="text-[6px] font-black uppercase tracking-wider">{product.badge}</span>
            </div>
          )}
        </div>

        {/* Content area */}
        <div className="px-1 pb-0.5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="bg-slate-50/80 dark:bg-white/5 px-1.5 py-0 rounded-full">
              <span className="text-[6px] font-black uppercase tracking-[0.1em] text-slate-600 dark:text-white/70">
                {product.category}
              </span>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-all duration-300 active:scale-90 ${isLiked ? 'text-rose-500 scale-110' : 'text-slate-300 hover:text-rose-500'}`}
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          <Link href={`/products/${product.id}`}>
            <h4 className="text-[11px] font-black text-slate-900 dark:text-white leading-[1.1] mb-1 tracking-tight line-clamp-2 min-h-[1.5rem] hover:text-primary transition-colors">
              {product.name} {product.itemsCount ? `(${product.itemsCount} Items)` : ''}
            </h4>
          </Link>

          <div className="flex items-center gap-0.5 text-[#facc15] mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Zap key={i} className={`w-2 h-2 fill-current ${i >= Math.round(product.rating) ? 'opacity-40' : ''}`} />
            ))}
            <span className="text-slate-400 font-black text-[8px] ml-1 tracking-tight">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Dashed Separator */}
          <div className="border-t border-dashed border-slate-200 dark:border-white/10 mb-1.5 mt-auto" />

          <div className="flex items-center justify-between gap-1">
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-950 dark:text-white tracking-tighter leading-none">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[7px] text-slate-400 font-bold line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-[6px] font-black text-primary">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>
            
            <Button 
              className="h-6 px-2 bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white rounded-full text-[7px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 border-none"
              disabled={!product.inStock}
            >
              {product.inStock ? 'ADD' : 'OUT'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT SQUARE LAYOUT (Premium Square style for Curated/Regular)
  return (
    <div className="bg-white dark:bg-[#0c0d0e] rounded-[1.2rem] border border-slate-200 dark:border-white/5 p-1.5 md:p-2 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full group/card relative">
      {/* Product Image Carousel */}
      <div className="relative aspect-square w-full rounded-[0.8rem] overflow-hidden mb-3 shrink-0 group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayImages.map((img: string, idx: number) => (
            <div key={idx} className="flex-shrink-0 w-full h-full snap-center relative">
              <Image 
                src={img} 
                alt={`${product.name} ${idx + 1}`} 
                fill 
                className="object-cover group-hover/card:scale-105 transition-transform duration-700" 
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-1 bg-black/20 backdrop-blur-md rounded-full shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {displayImages.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                  idx === activeImageIndex 
                    ? "bg-white w-2.5" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Overlay Action */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-10">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 active:scale-90 ${isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-primary text-white px-2.5 py-1 rounded-full shadow-lg z-10">
            <span className="text-[8px] font-black uppercase tracking-wider">{product.badge}</span>
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="px-1 pb-1 flex flex-col flex-1">
        <div className="mb-1 md:mb-2">
          <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.15em] text-primary">
            {product.category}
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h4 className="text-[11px] md:text-[13px] font-black text-slate-900 dark:text-white leading-[1.2] mb-2 md:mb-3 tracking-tight line-clamp-2 min-h-[2.4rem] hover:text-primary transition-colors">
            {product.name} {product.itemsCount ? `(${product.itemsCount} Items)` : ''}
          </h4>
        </Link>

        <div className="flex items-center gap-0.5 text-[#facc15] mb-3 md:mb-4">
          {[...Array(5)].map((_, i) => (
            <Zap key={i} className={`w-2 h-2 md:w-3 md:h-3 fill-current ${i >= Math.round(product.rating) ? 'opacity-40' : ''}`} />
          ))}
          <span className="text-slate-400 font-black text-[8px] md:text-[10px] ml-1 md:ml-1.5 tracking-tight">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-3 border-t border-dashed border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-black text-slate-950 dark:text-white tracking-tighter leading-none">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-1 mt-0.5 md:mt-1">
                  <span className="text-[8px] md:text-[9px] text-slate-400 font-bold line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-[7px] md:text-[8px] font-black text-green-500">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>
            
            <Button 
              className="h-7 md:h-8 px-3 md:px-4 bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 border-none"
              disabled={!product.inStock}
            >
              {product.inStock ? (
                <>
                  <span className="md:hidden">ADD</span>
                  <span className="hidden md:inline">ADD TO CART</span>
                </>
              ) : 'OUT'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
