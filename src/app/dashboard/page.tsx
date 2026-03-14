"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Heart,
  Settings,
  User,
  MapPin,
  ShoppingBag,
  Star,
  ChevronRight,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { orders, products } from "@/lib/data";

const statusColors: Record<string, string> = {
  delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  processing: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function DashboardPage() {
  const wishlist = products.slice(0, 4);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-3xl p-8 mb-4 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="flex flex-col items-center text-center relative">
                <Avatar className="w-20 h-20 mb-4 border-4 border-slate-100 dark:border-white/10 shadow-lg">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-black">JD</AvatarFallback>
                </Avatar>
                <h2 className="font-black text-slate-900 dark:text-white text-xl tracking-tighter">John Doe</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">john@example.com</p>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-sm">Gold Member</Badge>
              </div>
              <Separator className="bg-slate-100 dark:bg-white/5 my-6" />
              <div className="space-y-1">
                {[
                  { icon: Package, label: "My Orders" },
                  { icon: Heart, label: "Wishlist" },
                  { icon: MapPin, label: "Addresses" },
                  { icon: Star, label: "Reviews" },
                  { icon: Settings, label: "Settings" },
                ].map(item => (
                  <button key={item.label} className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left">
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-3xl p-6 space-y-5 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Your Activity</h3>
              {[
                { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "text-primary" },
                { label: "Delivered", value: orders.filter(o => o.status === "delivered").length, icon: Package, color: "text-emerald-600" },
                { label: "Wishlist", value: wishlist.length, icon: Heart, color: "text-rose-500" },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    {stat.label}
                  </div>
                  <span className="font-black text-slate-950 dark:text-white text-base">{stat.value}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Banner */}
            <div className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 border border-slate-900 dark:border-slate-100 rounded-3xl p-8 mb-8 flex items-center gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 pointer-events-none opacity-10" />
              <TrendingUp className="w-12 h-12 text-primary shrink-0 relative z-10" />
              <div className="relative z-10 font-black">
                <h1 className="text-xl md:text-2xl mb-1 tracking-tighter uppercase">Welcome back, John! 👋</h1>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">You have {orders.filter(o => o.status === "processing").length} order(s) being processed.</p>
              </div>
              <div className="ml-auto text-right hidden sm:block relative z-10 border-l border-white/10 dark:border-slate-100 pl-8">
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-widest font-black">Loyalty Points</p>
                <p className="text-3xl font-black text-primary tracking-tighter">2,450</p>
              </div>
            </div>

            <Tabs defaultValue="orders">
              <TabsList className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl mb-8 p-1">
                <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl gap-2 font-black uppercase tracking-widest text-[10px] py-2.5">
                  <Package className="w-3.5 h-3.5" /> Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl gap-2 font-black uppercase tracking-widest text-[10px] py-2.5">
                  <Heart className="w-3.5 h-3.5" /> Wishlist
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl gap-2 font-black uppercase tracking-widest text-[10px] py-2.5">
                  <User className="w-3.5 h-3.5" /> Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-6 flex gap-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5">
                        <Image src={order.image} alt={order.product} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className="font-black text-slate-950 dark:text-white text-base line-clamp-1 tracking-tight">{order.product}</p>
                          <Badge className={`text-[10px] font-black uppercase tracking-widest border px-3 py-1 rounded-full shadow-sm ${statusColors[order.status]}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">{order.vendor}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          <span className="text-slate-900 dark:text-white font-black text-xs tracking-tight normal-case">₹{order.amount.toLocaleString()}</span>
                          <span className="opacity-30">•</span>
                          <Clock className="w-3.5 h-3.5" />
                          {order.date}
                          <span className="opacity-30">•</span>
                          <span className="text-primary">{order.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="wishlist">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wishlist.map(product => (
                    <div key={product.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-5 flex gap-5 shadow-sm hover:shadow-xl transition-all group">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-white/5">
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <Link href={`/products/${product.id}`} className="text-sm font-black text-slate-900 dark:text-white hover:text-primary line-clamp-1 mb-1 tracking-tight">
                          {product.name}
                        </Link>
                        <p className="text-primary font-black text-base tracking-tighter mb-4">₹{product.price.toLocaleString()}</p>
                        <Button size="sm" className="h-10 text-[10px] font-black uppercase tracking-widest bg-primary hover:opacity-90 text-primary-foreground rounded-xl px-4 shadow-lg shadow-primary/20 active:scale-95 transition-all">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                  <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 mb-10 uppercase tracking-[0.2em] relative z-10">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm mb-12 relative z-10">
                    {[
                      { label: "Full Name", value: "John Doe" },
                      { label: "Email", value: "john@example.com" },
                      { label: "Phone", value: "+91 98765 43210" },
                      { label: "Location", value: "Mumbai, Maharashtra" },
                    ].map(field => (
                      <div key={field.label}>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{field.label}</p>
                        <p className="text-slate-950 dark:text-white font-black text-base tracking-tight">{field.value}</p>
                      </div>
                    ))}
                  </div>
                  <Separator className="bg-slate-100 dark:bg-white/5 mb-10 relative z-10" />
                  <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-[0.2em] relative z-10">Loyalty Progress</h4>
                  <div className="mb-3 flex justify-between text-[10px] font-black uppercase tracking-widest relative z-10">
                    <span className="text-primary">Gold Member</span><span className="text-slate-400">Platinum at 5,000 pts</span>
                  </div>
                  <Progress value={49} className="h-3 bg-slate-50 dark:bg-slate-800 rounded-full relative z-10 overflow-hidden">
                  </Progress>
                  <p className="text-[10px] font-bold text-slate-400 mt-3 relative z-10">2,450 / 5,000 POINTS COLLECTED</p>
                  <Button className="mt-12 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl h-14 w-full md:w-auto px-10 font-black uppercase tracking-widest text-[11px] shadow-xl relative z-10 active:scale-95 transition-all">
                    Edit Profile
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
