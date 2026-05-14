"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, CreditCard, Wallet, Truck, ChevronRight, Lock, MapPin, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import api from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart, appliedCoupon, discountAmount, discountedTotal } = useCart();
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("cod");
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Address State
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/addresses");
      setAddresses(res.data.data.addresses);
      const defaultAddr = res.data.data.addresses.find((a: any) => a.isDefault);
      if (defaultAddr) setSelectedAddressId(defaultAddr.id);
      else if (res.data.data.addresses.length > 0) setSelectedAddressId(res.data.data.addresses[0].id);
    } catch {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("AyurPooja_token");
    if (!token) {
      toast.error("Please login to proceed to checkout");
      window.location.href = "/login";
      return;
    }
    fetchAddresses();
  }, [fetchAddresses]);

  const handleAddAddress = async () => {
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode) {
      return toast.error("Please fill all required fields (*)");
    }
    try {
      setLoading(true);
      await api.post("/addresses", newAddress);
      toast.success("Address added");
      setShowAddressForm(false);
      fetchAddresses();
    } catch {
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) return toast.error("Please select a shipping address");
    
    try {
      setPlacingOrder(true);
      const addr = addresses.find(a => a.id === selectedAddressId);
      const res = await api.post("/orders", {
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: addr, // Send snapshot
        paymentMode: payment.toUpperCase(),
        couponCode: appliedCoupon?.code || null
      });

      if (res.data.status === "success") {
        setOrderId(res.data.data.order.orderNumber);
        setOrdered(true);
        clearCart();
        toast.success("Order placed successfully!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 49;
  const total = discountedTotal + (subtotal === 0 ? 0 : shipping);

  if (ordered) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Order Placed!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">Your order has been placed successfully. You&apos;ll receive a confirmation email shortly.</p>
          <p className="text-primary dark:text-primary font-black mb-8 uppercase tracking-widest text-xs">Order Number: {orderId}</p>
          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl h-12 font-black shadow-xl">
                Home
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button variant="outline" className="w-full border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-12 font-bold shadow-sm">
                My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase">Check<span className="text-primary">out</span></h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-colors ${
                  i === step ? "text-primary dark:text-primary" : i < step ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all shadow-sm ${
                  i === step ? "border-primary bg-primary text-primary-foreground" :
                  i < step ? "border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/10 text-primary dark:text-primary-foreground" :
                  "border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-700 bg-transparent"
                }`}>
                  {i < step ? "✓" : i + 1}
                </div>
                {s}
              </button>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Shipping Address</h2>
                  {!showAddressForm && (
                     <Button 
                      variant="ghost" 
                      onClick={() => setShowAddressForm(true)}
                      className="text-primary hover:text-primary/80 font-black uppercase text-[10px] tracking-widest gap-2"
                     >
                      <Plus className="w-4 h-4" /> Add New Address
                     </Button>
                  )}
                </div>

                {showAddressForm ? (
                   <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest mb-1">Street / House No. <span className="text-red-500">*</span></Label>
                          <Input 
                            required
                            value={newAddress.street} 
                            onChange={e => setNewAddress({...newAddress, street: e.target.value})} 
                            placeholder="Building name, Street..." className="rounded-xl h-12" 
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-widest mb-1">City <span className="text-red-500">*</span></Label>
                          <Input 
                            required
                            value={newAddress.city} 
                            onChange={e => setNewAddress({...newAddress, city: e.target.value})} 
                            placeholder="City" className="rounded-xl h-12" 
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-widest mb-1">State <span className="text-red-500">*</span></Label>
                          <Input 
                            required
                            value={newAddress.state} 
                            onChange={e => setNewAddress({...newAddress, state: e.target.value})} 
                            placeholder="State" className="rounded-xl h-12" 
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-widest mb-1">Zip Code <span className="text-red-500">*</span></Label>
                          <Input 
                            required
                            value={newAddress.postalCode} 
                            onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})} 
                            placeholder="Zip Code" className="rounded-xl h-12" 
                          />
                        </div>
                        <div>
                          <Label className="text-[10px] font-black uppercase tracking-widest mb-1">Address Type</Label>
                          <select 
                            className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm font-bold"
                            value={newAddress.type}
                            onChange={e => setNewAddress({...newAddress, type: e.target.value})}
                          >
                            <option value="Home">🏠 Home</option>
                            <option value="Work">🏢 Work</option>
                            <option value="Other">📍 Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button variant="ghost" onClick={() => setShowAddressForm(false)} className="flex-1 rounded-xl h-12 uppercase font-black text-xs tracking-widest">Cancel</Button>
                        <Button onClick={handleAddAddress} disabled={loading} className="flex-1 rounded-xl h-12 uppercase font-black text-xs tracking-widest bg-primary text-white shadow-lg shadow-primary/20">
                          {loading ? "Saving..." : "Save & Use This Address"}
                        </Button>
                      </div>
                   </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.length === 0 ? (
                      <div className="text-center py-16 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10">
                        <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No saved addresses found</p>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAddressForm(true)}
                          className="mt-4 rounded-xl border-primary text-primary font-black uppercase text-[10px] tracking-widest"
                        >
                          Add Your First Address
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Delivery Point</p>
                        {addresses.map((addr) => (
                           <div 
                            key={addr.id} 
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative group ${
                              selectedAddressId === addr.id ? "border-primary bg-primary/[0.03] shadow-md" : "border-slate-100 dark:border-white/5 hover:border-slate-200"
                            }`}
                           >
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary">
                                  {addr.type}
                                </Badge>
                                {addr.isDefault && <span className="text-[9px] font-black text-primary uppercase tracking-widest">Primary</span>}
                              </div>
                              <p className="text-sm font-black text-slate-900 dark:text-white mb-1 tracking-tight">{addr.street}</p>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{addr.city}, {addr.state} - {addr.postalCode}</p>
                              <div className={`absolute top-6 right-6 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedAddressId === addr.id ? "border-primary bg-primary" : "border-slate-200"
                              }`}>
                                {selectedAddressId === addr.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                           </div>
                        ))}
                      </div>
                    )}
                    <Button 
                      onClick={() => setStep(1)} 
                      disabled={!selectedAddressId}
                      className="w-full mt-10 bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-16 font-black text-lg shadow-2xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-[0.2em]"
                    >
                      Continue to Payment →
                    </Button>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl space-y-8">
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Payment Method</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive the order", icon: Truck },
                    { id: "online", label: "Online Payment", desc: "Cards, UPI, Netbanking (Coming Soon)", icon: CreditCard, disabled: true },
                  ].map(m => (
                    <button 
                      key={m.id} 
                      onClick={() => !m.disabled && setPayment(m.id)}
                      disabled={m.disabled}
                      className={`p-6 rounded-[2.5rem] text-left border-2 transition-all relative group ${
                        payment === m.id ? "border-primary bg-primary/[0.03]" : "border-slate-100 dark:border-white/5 hover:border-slate-200"
                      } ${m.disabled ? "opacity-30 grayscale cursor-not-allowed" : ""}`}
                    >
                      <m.icon className={`w-8 h-8 mb-4 ${payment === m.id ? "text-primary" : "text-slate-400"}`} />
                      <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">{m.label}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{m.desc}</p>
                      {payment === m.id && (
                         <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <div className="w-2 h-2 rounded-full bg-white" />
                         </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <Button onClick={() => setStep(0)} variant="outline" className="border-slate-200 dark:border-slate-700 rounded-2xl h-16 flex-1 font-black uppercase tracking-widest text-xs">← Back</Button>
                  <Button onClick={() => setStep(2)} className="bg-primary rounded-2xl h-16 flex-1 font-black uppercase tracking-widest transition-all active:scale-95 shadow-2xl shadow-primary/25">Review Order →</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Finalized Review</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                       <MapPin className="w-3 h-3" /> Delivery Destination
                    </p>
                    {addresses.find(a => a.id === selectedAddressId) && (
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-sm">{addresses.find(a => a.id === selectedAddressId).street}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                          {addresses.find(a => a.id === selectedAddressId).city}, {addresses.find(a => a.id === selectedAddressId).state} - {addresses.find(a => a.id === selectedAddressId).postalCode}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 dark:bg-white/5 rounded-3xl p-6 border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                       <CreditCard className="w-3 h-3" /> Transaction Mode
                    </p>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{payment === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Payment at time of delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Basket Verification</p>
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 group">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5 shadow-inner">
                          <Image 
                            src={item.image || "https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800"} 
                            alt={item.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                            sizes="64px" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1 tracking-tight">{item.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                        </div>
                        <p className="font-black text-slate-900 dark:text-white text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={() => setStep(1)} variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-16 flex-1 font-black uppercase tracking-widest text-xs">← Back</Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                    className="bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-16 flex-1 gap-3 font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-2xl shadow-primary/30"
                  >
                    {placingOrder ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                    {placingOrder ? "Placing Order..." : "Confirm & Pay"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-8 sticky top-24 shadow-2xl">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-8 uppercase tracking-[0.3em]">Order Summary</h3>
              
              <div className="space-y-5 mb-8">
                {items.map(item => (
                   <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-[11px] font-black text-slate-900 dark:text-white line-clamp-1 truncate">{item.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-[11px] font-black text-slate-900 dark:text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                   </div>
                ))}
              </div>

              <Separator className="bg-slate-100 dark:bg-white/5 mb-6" />

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
                   <span>Gross Total</span>
                   <span className="text-slate-900 dark:text-white font-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black text-slate-500 uppercase tracking-widest">
                   <span>Shipping</span>
                   <span className={shipping === 0 ? "text-primary font-black animate-pulse" : "text-slate-900 dark:text-white font-black"}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                   </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[11px] font-black text-primary uppercase tracking-widest">
                     <span>Discount ({appliedCoupon?.code})</span>
                     <span className="font-black">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <Separator className="bg-slate-100 dark:bg-white/5" />
                
                <div className="flex justify-between font-black text-slate-950 dark:text-white uppercase tracking-tighter text-2xl pt-2">
                  <span>Net Total</span>
                  <span className="text-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-primary/10 rounded-2xl p-4 text-center border border-slate-100 dark:border-primary/20">
                 <p className="text-[9px] font-black text-slate-500 dark:text-primary-foreground uppercase tracking-widest mb-1">Guaranteed Delivery</p>
                 <p className="text-[10px] font-bold text-slate-400">Within 30-45 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
