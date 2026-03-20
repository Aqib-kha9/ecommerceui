"use client";
import { useState } from "react";
import { CheckCircle, CreditCard, Wallet, Truck, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/data";
import Image from "next/image";

const cartItems = products.slice(0, 3).map((p, i) => ({ ...p, qty: i === 0 ? 2 : 1 }));
const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Truck },
];

const steps = ["Address", "Payment", "Review"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("card");
  const [ordered, setOrdered] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping;

  if (ordered) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Order Placed!</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">Your order has been placed successfully. You&apos;ll receive a confirmation email shortly.</p>
          <p className="text-primary dark:text-primary font-black mb-8 uppercase tracking-widest text-xs">Order ID: #ORD-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
          <div className="flex gap-3">
            <Button onClick={() => window.location.href = "/"} className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl h-12 font-black shadow-xl">
              Home
            </Button>
            <Button onClick={() => window.location.href = "/dashboard"} variant="outline" className="flex-1 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-12 font-bold shadow-sm">
              My Orders
            </Button>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { id: "fname", label: "First Name", placeholder: "John", col: 1 },
                    { id: "lname", label: "Last Name", placeholder: "Doe", col: 1 },
                    { id: "email", label: "Email", placeholder: "john@example.com", col: 2 },
                    { id: "phone", label: "Phone Number", placeholder: "+91 98765 43210", col: 2 },
                    { id: "address", label: "Address", placeholder: "Street, Building No.", col: 2 },
                    { id: "city", label: "City", placeholder: "Vishakhapatnam", col: 1 },
                    { id: "state", label: "State", placeholder: "Andhra Pradesh", col: 1 },
                    { id: "pincode", label: "PIN Code", placeholder: "530001", col: 1 },
                  ].map(f => (
                    <div key={f.id} className={f.col === 2 ? "col-span-2" : ""}>
                      <Label className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2 block">{f.label}</Label>
                      <Input
                        id={f.id}
                        placeholder={f.placeholder}
                        className="bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-primary dark:focus:border-primary/50 rounded-2xl h-12 shadow-sm transition-all"
                      />
                    </div>
                  ))}
                </div>
                <Button onClick={() => setStep(1)} className="w-full mt-10 bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-14 font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest">
                  Continue to Payment →
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Payment Method</h2>
                <div className="space-y-4 mb-8">
                  {paymentMethods.map(method => (
                    <button
                      key={method.id}
                      onClick={() => setPayment(method.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left shadow-sm ${
                        payment === method.id ? "border-primary bg-primary/10" : "border-slate-50 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/20 bg-slate-50 dark:bg-white/5"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === method.id ? "border-primary" : "border-slate-300 dark:border-slate-600"}`}>
                        {payment === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-in zoom-in-50" />}
                      </div>
                      <method.icon className={`w-6 h-6 ${payment === method.id ? "text-primary" : "text-slate-400"}`} />
                      <span className={`font-black text-sm uppercase tracking-widest ${payment === method.id ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{method.label}</span>
                    </button>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2">
                      <Label className="text-slate-300 text-sm mb-1.5 block">Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary rounded-xl" />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm mb-1.5 block">Expiry</Label>
                      <Input placeholder="MM/YY" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary rounded-xl" />
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm mb-1.5 block">CVV</Label>
                      <Input placeholder="•••" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary rounded-xl" />
                    </div>
                  </div>
                )}

                {payment === "upi" && (
                  <div className="mb-6">
                    <Label className="text-slate-300 text-sm mb-1.5 block">UPI ID</Label>
                    <Input placeholder="yourname@upi" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-primary rounded-xl" />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button onClick={() => setStep(0)} variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-14 flex-1 font-black uppercase tracking-widest text-xs">← Back</Button>
                  <Button onClick={() => setStep(2)} className="bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-14 flex-1 gap-3 font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-primary/20">
                    Review Order →
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Review Your Order</h2>
                <div className="space-y-4 mb-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5 shadow-sm">
                        <Image 
                          src={item.image || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800"} 
                          alt={item.name} 
                          fill 
                          className="object-cover" 
                          sizes="64px" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Qty: {item.qty} × ₹{item.price.toLocaleString()}</p>
                      </div>
                      <p className="font-black text-slate-900 dark:text-white text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <Separator className="bg-slate-100 dark:bg-slate-800 mb-6" />
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest"><span>Subtotal</span><span className="text-slate-900 dark:text-white font-black">₹{subtotal.toLocaleString()}</span></div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 uppercase tracking-widest"><span>Shipping</span><span className={shipping === 0 ? "text-primary font-black" : "text-slate-900 dark:text-white font-black"}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                  <Separator className="bg-slate-100 dark:bg-white/5" />
                  <div className="flex justify-between font-black text-slate-950 dark:text-white text-xl tracking-tighter uppercase"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => setStep(1)} variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-14 flex-1 font-black uppercase tracking-widest text-xs">← Back</Button>
                  <Button
                    onClick={() => setOrdered(true)}
                    className="bg-primary hover:opacity-90 text-primary-foreground rounded-2xl h-14 flex-1 gap-3 font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-primary/25"
                  >
                    <Lock className="w-5 h-5" /> Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-6 uppercase tracking-[0.2em]">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5">
                      <Image 
                        src={item.image || (item.images && item.images[0]) || "https://images.unsplash.com/photo-1604719312563-8912e9223c6a?q=80&w=800"} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                        sizes="48px" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">×{item.qty}</p>
                    </div>
                    <p className="text-[10px] font-black text-slate-900 dark:text-white">₹{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <Separator className="bg-slate-100 dark:bg-white/5 mb-4" />
              <div className="flex justify-between font-black text-slate-950 dark:text-white uppercase tracking-tighter">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
