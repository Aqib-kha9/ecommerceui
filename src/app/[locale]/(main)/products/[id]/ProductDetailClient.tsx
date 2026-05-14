"use client";

import React, { useState } from "react";
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  Truck, 
  Shield, 
  Package, 
  PackageOpen, 
  CheckCircle,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductDetailClient({ product, locale }: { product: any, locale: string }) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  // Safe Decimal Parser (Internalized to avoid passing function from server component)
  const safeParse = (val: any) => {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'object' && val.d) {
      try { return parseFloat(`${val.s * val.d[0]}.${val.d.slice(1).join('') || '0'}`); } catch(e) { return 0; }
    }
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 shadow-xl">
          <Image
            src={product.image || product.images?.[0] || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
              {product.badge}
            </Badge>
          )}
        </div>
        {/* Thumbnail row */}
        <div className="flex gap-3">
          {product.images?.slice(0, 4).map((img: string, i: number) => (
            <div key={i} className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 cursor-pointer transition-all border-slate-100 dark:border-slate-700 hover:border-primary/30 transform hover:scale-105`}>
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-primary">
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">
            <CheckCircle className="w-3.5 h-3.5" />
            {product.metadata?.brand || product.category} Authority
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-8 h-8 rounded-full transition-colors ${isLiked ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-400'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white w-8 h-8 rounded-full" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 leading-[0.9] tracking-tighter">
          {product.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-600"}`} />
            ))}
          </div>
          <span className="text-slate-900 dark:text-white font-black">{product.rating}</span>
          <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">({product.reviews} reviews)</span>
          <Separator orientation="vertical" className="h-4 bg-slate-200 dark:bg-slate-700 mx-2" />
          <span className={`text-xs font-black uppercase tracking-widest ${product.inStock ? "text-primary" : "text-red-500"}`}>
            {product.inStock ? `✓ ${product.stock} ${product.unit} In Stock` : "✗ Out of Stock"}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xl text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
              <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-3 py-1 rounded-full uppercase text-[10px] tracking-widest">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </Badge>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {product.tags?.map((tag: string) => (
            <Badge key={tag} variant="outline" className="border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 capitalize text-[10px] font-bold px-3 py-1 rounded-lg">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Quantity:</span>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-9 h-9 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <span className="text-slate-900 dark:text-white font-black w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-9 h-9 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 mb-8">
          <Button
            className="flex-[2] bg-primary hover:opacity-90 text-primary-foreground gap-3 rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/30 transition-transform active:scale-95 border-none"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </Button>
          <Button
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white gap-2 rounded-2xl h-14 font-bold border border-slate-200 dark:border-white/5"
            disabled={!product.inStock}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: Truck, label: "Free Delivery", sub: "On ₹999+" },
            { icon: Shield, label: "Secure Payment", sub: "100% protected" },
            { icon: Package, label: "Easy Returns", sub: "7-day policy" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
              <item.icon className="w-5 h-5 text-primary mb-1" />
              <p className="text-xs font-medium text-slate-900 dark:text-white">{item.label}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Bundle Items Summary */}
        {product.type === 'BUNDLE' && product.bundleItems && product.bundleItems.length > 0 && (
          <div className="rounded-3xl border border-primary/20 bg-primary/[0.02] p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PackageOpen className="w-24 h-24 text-primary" />
            </div>
            <h3 className="text-lg font-black italic tracking-tight mb-4 flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-primary" />
              Bundle Contents
            </h3>
            <div className="space-y-3">
              {product.bundleItems.map((item: any, idx: number) => {
                const childName = typeof item.child?.name === 'object' ? (item.child.name[locale] || item.child.name.en) : item.child?.name;
                return (
                  <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image src={item.child?.images?.[0] || item.child?.image || "/placeholder.png"} alt={childName} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate">{childName}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-primary">₹{safeParse(item.child?.price)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Separator = ({ orientation = "horizontal", className = "" }) => (
  <div className={`${orientation === "horizontal" ? "w-full h-px" : "w-px h-full"} bg-slate-200 dark:bg-slate-700 ${className}`} />
);
