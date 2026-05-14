"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import api from "@/lib/api";
import { toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, appliedCoupon, applyCoupon, removeCoupon, discountedTotal, discountAmount } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    try {
      setIsApplying(true);
      const res = await api.post("/coupons/apply", { code: couponCode });
      if (res.data.status === "success") {
        applyCoupon(res.data.data);
        toast.success(`Coupon "${res.data.data.code}" applied!`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid coupon code");
      removeCoupon();
    } finally {
      setIsApplying(false);
    }
  };

  const shipping = cartTotal > 999 || cartTotal === 0 ? 0 : 49;
  const finalTotal = discountedTotal + (cartTotal === 0 ? 0 : shipping);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3 tracking-tighter uppercase">
          <ShoppingBag className="w-8 h-8 text-primary" />
          My <span className="text-primary">Cart</span>
          <Badge className="bg-primary text-primary-foreground ml-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">{items.length} items</Badge>
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <ShoppingBag className="w-24 h-24 mx-auto mb-8 text-slate-200 dark:text-slate-800" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">Your cart is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">Start shopping to add items to your cart</p>
            <Link href="/products">
              <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-xl active:scale-95 transition-all gap-3">
                Browse Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-6 flex gap-6 shadow-sm group hover:shadow-xl transition-all"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5">
                    <Image 
                      src={item.image || "https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800"} 
                      alt={item.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      sizes="96px" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Link href={`/products/${item.id}`} className="text-base font-black text-slate-900 dark:text-white hover:text-primary transition-colors line-clamp-1 tracking-tight">
                        {item.name}
                      </Link>
                      <button onClick={() => removeFromCart(item.productId)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Ayur Pooja Selection</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-1 shadow-inner">
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                          <Minus className="w-3.5 h-3.5" />
                        </Button>
                        <span className="text-slate-900 dark:text-white font-black text-xs w-8 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                          <Plus className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-950 dark:text-white text-lg tracking-tight">₹{(item.price * item.quantity).toLocaleString()}</p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">₹{item.price.toLocaleString()} ea.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link href="/products">
                <Button variant="ghost" className="text-slate-400 hover:text-primary h-14 w-full rounded-2xl gap-3 font-black uppercase tracking-widest text-[10px] transition-all">
                  ← Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 sticky top-24 shadow-2xl">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Order Summary</h2>
                {/* Coupon */}
                <div className="flex gap-2 mb-8 uppercase">
                  <div className="relative flex-1">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      className="pl-11 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-primary rounded-2xl text-[10px] font-black h-12 uppercase tracking-widest shadow-inner"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      disabled={isApplying || !!appliedCoupon}
                    />
                  </div>
                  <Button 
                    onClick={handleApplyCoupon}
                    disabled={isApplying || !couponCode || !!appliedCoupon}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
                  >
                    {isApplying ? "..." : appliedCoupon ? "Applied" : "Apply"}
                  </Button>
                </div>

                <Separator className="bg-slate-100 dark:bg-white/5 mb-6" />
                <div className="space-y-4 text-[11px] font-bold uppercase tracking-widest mb-6">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="text-slate-900 dark:text-white font-black">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-primary font-black" : "text-slate-900 dark:text-white font-black"}>
                       {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-[10px] text-primary dark:text-primary-foreground font-black text-center bg-primary/10 rounded-xl px-4 py-2 border border-primary/20 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                      🎉 FREE SHIPPING UNLOCKED
                    </p>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span className="flex items-center gap-1">Discount {appliedCoupon && <span className="text-[9px] opacity-70">({appliedCoupon.code})</span>}</span>
                      <span className="font-black">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-slate-100 dark:bg-white/5 mb-6" />
                <div className="flex justify-between items-center mb-10">
                  <span className="text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest">Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">₹{finalTotal.toLocaleString()}</p>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Inclusive of Taxes</p>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-16 font-black uppercase tracking-[0.2em] text-[11px] gap-4 shadow-2xl shadow-primary/30 transition-all active:scale-95 group">
                    Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-500">
                  <span>🔒 Secure checkout</span>
                  <span>🏦 100% Protected</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
