"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Home, Briefcase, MapPin, Phone, User, Pencil, Trash2, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserLayout from "@/components/UserLayout";

type AddressType = "Home" | "Work" | "Other";
interface Address { id: string; name: string; phone: string; street: string; city: string; state: string; pincode: string; type: AddressType; isDefault: boolean; }

const mockAddresses: Address[] = [
  { id: "a1", name: "Ravi Kumar", phone: "+91 98765 43210", street: "42, Green Park Colony, Near Metro Station", city: "Hyderabad", state: "Telangana", pincode: "500034", type: "Home", isDefault: true },
  { id: "a2", name: "Ravi Kumar", phone: "+91 98765 43210", street: "7th Floor, Cyber Towers, Hi-Tech City", city: "Hyderabad", state: "Telangana", pincode: "500081", type: "Work", isDefault: false },
];

const typeIcons: Record<AddressType, typeof Home> = { Home, Work: Briefcase, Other: MapPin };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", street: "", city: "", state: "", pincode: "", type: "Home" as AddressType });

  const resetForm = () => setForm({ name: "", phone: "", street: "", city: "", state: "", pincode: "", type: "Home" });

  const handleSave = () => {
    if (editId) { setAddresses(a => a.map(addr => addr.id === editId ? { ...addr, ...form } : addr)); setEditId(null); }
    else { setAddresses(a => [...a, { ...form, id: `a${Date.now()}`, isDefault: a.length === 0 }]); }
    resetForm(); setShowForm(false);
  };

  const handleEdit = (addr: Address) => {
    setForm({ name: addr.name, phone: addr.phone, street: addr.street, city: addr.city, state: addr.state, pincode: addr.pincode, type: addr.type });
    setEditId(addr.id); setShowForm(true);
  };

  const F = ({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 block">{label}</label>
      <Input {...p} className="h-10 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 font-medium text-sm" />
    </div>
  );

  return (
    <UserLayout title="Delivery Addresses">
      <div className="max-w-lg space-y-3">
        <div className="flex justify-end">
          <Button size="sm" onClick={() => { resetForm(); setEditId(null); setShowForm(true); }} className="bg-primary rounded-xl font-black text-xs gap-1.5 h-8">
            <Plus className="w-3.5 h-3.5" /> Add New
          </Button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-primary/20 p-5 shadow-lg shadow-primary/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-base text-slate-900 dark:text-white">{editId ? "Edit" : "New"} Address</h3>
                <button onClick={() => { setShowForm(false); resetForm(); }} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex gap-2 mb-4">
                {(["Home", "Work", "Other"] as AddressType[]).map(t => {
                  const Icon = typeIcons[t];
                  return (
                    <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all ${form.type === t ? "bg-primary/10 border-primary text-primary" : "border-slate-200 dark:border-white/10 text-slate-500"}`}>
                      <Icon className="w-3.5 h-3.5" /> {t}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <F label="Full Name" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                <F label="Phone" placeholder="+91 XXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                <div className="col-span-2"><F label="Street Address" placeholder="Door no, street, landmark" value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} /></div>
                <F label="City" placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                <F label="Pincode" placeholder="500034" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} />
              </div>
              <Button onClick={handleSave} className="w-full mt-4 h-11 bg-primary rounded-2xl font-black text-sm shadow-primary/25 shadow-lg">
                {editId ? "Update" : "Save"} Address
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {addresses.length === 0 ? (
          <div className="text-center py-16"><MapPin className="w-12 h-12 text-slate-200 mx-auto mb-3" /><p className="text-slate-500 font-bold">No addresses yet</p></div>
        ) : addresses.map((addr, i) => {
          const Icon = typeIcons[addr.type];
          return (
            <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`bg-white dark:bg-[#0c0d0e] rounded-[2rem] border p-5 shadow-sm ${addr.isDefault ? "border-primary/30 ring-1 ring-primary/10" : "border-slate-100 dark:border-white/5"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${addr.isDefault ? "bg-primary/10" : "bg-slate-100 dark:bg-white/5"}`}>
                    <Icon className={`w-4 h-4 ${addr.isDefault ? "text-primary" : "text-slate-400"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-black text-sm text-slate-900 dark:text-white">{addr.type}</span>
                      {addr.isDefault && <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300"><User className="w-3 h-3 inline mr-1 text-slate-400" />{addr.name}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-xs text-slate-400 mt-0.5"><Phone className="w-3 h-3 inline mr-1" />{addr.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50 dark:border-white/5">
                {!addr.isDefault && (
                  <button onClick={() => setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === addr.id })))}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary py-2 rounded-xl hover:bg-primary/5 border border-slate-100 dark:border-white/5">
                    <Star className="w-3.5 h-3.5" /> Default
                  </button>
                )}
                <button onClick={() => handleEdit(addr)} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary py-2 rounded-xl hover:bg-primary/5 border border-slate-100 dark:border-white/5">
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))} className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-600 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-100/50 dark:border-red-500/10">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </UserLayout>
  );
}
