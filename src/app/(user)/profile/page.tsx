"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Edit3, 
  Save, 
  X, 
  Camera, 
  Wallet,
  MapPin,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/UserLayout";
import { cn } from "@/lib/utils";

const mockUser = {
  name: "Ravi Kumar",
  email: "ravi.kumar@email.com",
  phone: "+91 98765 43210",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
  joinedDate: "March 2024",
  walletBalance: 1250,
  location: "New Delhi, India"
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ 
    name: mockUser.name, 
    email: mockUser.email, 
    phone: mockUser.phone,
    location: mockUser.location
  });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setEditing(false);
    }, 1000);
  };

  return (
    <UserLayout title="Profile Info" subtitle="View and manage your account details">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start pb-12">
        
        {/* ── LEFT SIDEBAR (4 COLUMNS) ── */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 w-full space-y-6 lg:sticky lg:top-24"
        >
          {/* Avatar & Basic Info Card */}
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 shadow-sm text-center">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900 border-4 border-white dark:border-slate-800 shadow-xl ring-1 ring-slate-100 dark:ring-white/10">
                <Image src={mockUser.avatar} alt="Avatar" fill className="object-cover" />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 active:scale-95 transition-all">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1">{form.name}</h2>
            <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-widest mb-6">
              <Calendar className="w-3.5 h-3.5" /> Joined {mockUser.joinedDate}
            </div>

            <Button 
              onClick={() => setEditing(!editing)}
              className={cn(
                "w-full rounded-[1.5rem] h-12 font-black text-xs uppercase tracking-widest transition-all shadow-sm",
                editing ? "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400" : "bg-primary text-white shadow-primary/20"
              )}
            >
              {editing ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Records</>}
            </Button>
          </div>

          {/* Wallet Balance Card (SOW 2.7) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 dark:bg-primary/10 rounded-[2.5rem] border border-slate-800 dark:border-primary/20 p-8 shadow-xl shadow-slate-200 dark:shadow-none relative overflow-hidden group"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Available Wallet Balance</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white dark:text-primary tracking-tighter italic">₹{mockUser.walletBalance.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-500 mb-2">Verified</span>
              </div>
              <Link href="/wallet">
                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-2xl h-10 font-bold text-[11px] uppercase transition-all">
                  Transaction History
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Logout (Standard) */}
          <Button variant="ghost" className="w-full h-14 rounded-[2rem] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-black text-xs uppercase tracking-[0.2em] transition-all">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </Button>
        </motion.div>

        {/* ── MAIN CONTENT (8 COLUMNS) ── */}
        <div className="lg:col-span-8 w-full space-y-8">
          
          {/* Profile Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 p-8 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                { icon: User, label: "Full Name", key: "name", type: "text" },
                { icon: Mail, label: "Email Address", key: "email", type: "email" },
                { icon: Phone, label: "Identity Number (Phone)", key: "phone", type: "tel" },
                { icon: MapPin, label: "Registered City", key: "location", type: "text" },
              ].map(({ icon: Icon, label, key, type }) => (
                <div key={key} className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                    <Icon className="w-3.5 h-3.5 text-primary/60" /> {label}
                  </label>
                  <AnimatePresence mode="wait">
                    {editing ? (
                      <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}>
                        <Input 
                          type={type} 
                          value={form[key as keyof typeof form]} 
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="h-14 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 font-bold text-slate-900 dark:text-white transition-all focus:ring-4 focus:ring-primary/5 focus:border-primary px-5 shadow-sm"
                        />
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                        className="h-14 flex items-center px-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-white/5 font-black text-slate-800 dark:text-slate-200">
                        {form[key as keyof typeof form]}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {editing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-8">
                <Button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className="w-full md:w-auto h-14 bg-primary text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest px-10 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {saving ? "Processing..." : <><Save className="w-5 h-5 mr-3" /> Commit Changes</>}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Delivery Addresses Card (SOW 2.1) */}
          <Link href="/profile/addresses">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative p-8 bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden"
            >
              {/* Decorative side bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary group-hover:w-3 transition-all" />
              
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Delivery Addresses</h3>
                    <p className="text-xs text-slate-400 font-bold mt-1">Manage and store multiple shipping locations</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </Link>

        </div>
      </div>
    </UserLayout>
  );
}
