"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Mail, Phone, Edit3, Save, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/UserLayout";

const mockUser = {
  name: "Ravi Kumar", email: "ravi.kumar@email.com", phone: "+91 98765 43210",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
  joinedDate: "March 2024", totalOrders: 12, walletBalance: 1250,
};

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: mockUser.name, email: mockUser.email, phone: mockUser.phone });
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setEditing(false); }, 1000);
  };

  return (
    <UserLayout title="My Profile" subtitle={`Member since ${mockUser.joinedDate}`}>
      <div className="space-y-4 max-w-lg">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl overflow-hidden bg-primary/10 ring-4 ring-primary/10">
                  <Image src={mockUser.avatar} alt="Avatar" fill className="object-cover" />
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div>
                <h2 className="font-black text-xl text-slate-900 dark:text-white">{form.name}</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Member since {mockUser.joinedDate}</p>
                <Badge className="mt-2 bg-primary/10 text-primary border-primary/20 text-[10px] font-black px-2 py-0.5 rounded-full">Premium Member</Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setEditing(e => !e)} className="text-primary hover:bg-primary/5 rounded-xl font-bold text-sm">
              {editing ? <span className="flex items-center gap-1"><X className="w-4 h-4" /> Cancel</span> : <span className="flex items-center gap-1"><Edit3 className="w-4 h-4" /> Edit</span>}
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { icon: User, label: "Full Name", key: "name", type: "text" },
              { icon: Mail, label: "Email", key: "email", type: "email" },
              { icon: Phone, label: "Phone", key: "phone", type: "tel" },
            ].map(({ icon: Icon, label, key, type }) => (
              <div key={key}>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Icon className="w-3 h-3" /> {label}
                </label>
                {editing ? (
                  <Input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="h-11 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white focus:border-primary" />
                ) : (
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 py-2 px-3 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-white/5">
                    {form[key as keyof typeof form]}
                  </p>
                )}
              </div>
            ))}
            {editing && (
              <Button onClick={handleSave} disabled={saving} className="w-full h-11 bg-primary rounded-2xl font-black text-sm shadow-lg shadow-primary/25 mt-2 transition-all hover:scale-[1.02] active:scale-95">
                <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-5 border border-slate-100/50 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Orders</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{mockUser.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl p-5 border border-slate-100/50 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Wallet Balance</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{mockUser.walletBalance.toLocaleString()}</p>
          </div>
        </div>

        <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-red-500 border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
          Sign Out
        </Button>
      </div>
    </UserLayout>
  );
}
