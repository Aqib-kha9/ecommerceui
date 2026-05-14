"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Home, 
  Briefcase, 
  MapPin, 
  Phone, 
  User, 
  Pencil, 
  Trash2, 
  Star, 
  X,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import UserLayout from "@/components/UserLayout";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

type AddressType = "Home" | "Work" | "Other";
interface Address { 
  id: string; 
  type: string; 
  street: string; 
  city: string; 
  state: string; 
  postalCode: string; 
  country: string;
  isDefault: boolean; 
  name?: string; // We'll add this to the form
  phone?: string; // We'll add this to the form
}

const typeIcons: Record<string, any> = { Home, Work: Briefcase, Other: MapPin };

export default function AddressesPage() {
  const t = useTranslations("Addresses");
  const locale = useLocale();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", street: "", city: "", state: "", postalCode: "", type: "Home" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/users/addresses");
      if (res.data.status === "success") {
        setAddresses(res.data.data.addresses);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => setForm({ name: "", phone: "", street: "", city: "", state: "", postalCode: "", type: "Home" });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (editId) {
        const res = await api.patch(`/users/address/${editId}`, form);
        if (res.data.status === "success") {
          setAddresses(a => a.map(addr => addr.id === editId ? res.data.data.address : addr));
          setEditId(null);
          setShowForm(false);
        }
      } else {
        const res = await api.post("/users/address", form);
        if (res.data.status === "success") {
          setAddresses(a => [res.data.data.address, ...a]);
          setShowForm(false);
        }
      }
      resetForm();
    } catch (err) {
      console.error("Failed to save address", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (addr: Address) => {
    setForm({ 
      name: addr.name || "", 
      phone: addr.phone || "", 
      street: addr.street, 
      city: addr.city, 
      state: addr.state, 
      postalCode: addr.postalCode, 
      type: addr.type 
    });
    setEditId(addr.id); 
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/address/${id}`);
      setAddresses(a => a.filter(x => x.id !== id));
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await api.patch(`/users/address/${id}/default`);
      setAddresses(a => a.map(x => ({ ...x, isDefault: x.id === id })));
    } catch (err) {
      console.error("Failed to set default address", err);
    }
  };

  const FormInput = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <Input {...props} className="h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 font-bold text-slate-900 dark:text-white px-4 focus:ring-primary/20 transition-all shadow-sm" />
    </div>
  );

  return (
    <UserLayout title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-8 pb-12 px-2">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0c0d0e] p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-3">
            <Link href="/profile">
               <Button variant="ghost" size="icon" className="rounded-xl border border-slate-100 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                <ChevronLeft className="w-5 h-5" />
               </Button>
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">{t("saved_addresses")}</h1>
              <p className="text-xs text-slate-400 font-bold">{addresses.length} {t("locations_stored")}</p>
            </div>
          </div>
          <Button 
            onClick={() => { resetForm(); setEditId(null); setShowForm(true); }} 
            className="w-full sm:w-auto h-11 bg-primary text-white rounded-2xl px-6 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" /> {t("add_new")}
          </Button>
        </div>

        {/* Addresses Grid */}
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => <Skeleton key={i} className="h-64 rounded-[2.5rem]" />)}
            </div>
          ) : addresses.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 text-slate-300">
                <MapPin className="w-10 h-10" />
              </div>
              <p className="text-slate-500 font-black uppercase text-sm tracking-widest">{t("no_addresses")}</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((addr, i) => {
                const Icon = typeIcons[addr.type] || MapPin;
                return (
                  <motion.div 
                    key={addr.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      "bg-white dark:bg-[#0c0d0e] rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-300",
                      addr.isDefault 
                        ? "border-primary/50 shadow-xl shadow-primary/5 ring-1 ring-primary/10" 
                        : "border-slate-100 dark:border-white/5 shadow-sm hover:border-primary/20 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                        addr.isDefault ? "bg-primary text-white" : "bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:text-primary transition-colors"
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {addr.isDefault && (
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border border-primary/20">
                          {t("primary")}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
                        {t(addr.type.toLowerCase())} <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">#{addr.id.split('-')[0]}</span>
                      </h3>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" /> {addr.name || "User"}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed pt-2 line-clamp-2">
                        {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                      <p className="text-xs text-slate-400 font-bold flex items-center gap-1.5 pt-1">
                        <Phone className="w-3.5 h-3.5" /> {addr.phone || "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-8 pt-6 border-t border-slate-50 dark:border-white/5">
                      {!addr.isDefault && (
                        <button 
                          onClick={() => handleSetDefault(addr.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary py-2.5 rounded-xl hover:bg-primary/5 border border-slate-100 dark:border-white/5 transition-all"
                        >
                          <Star className="w-3.5 h-3.5" /> {t("set_default")}
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(addr)} 
                        className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 border border-slate-100 dark:border-white/5 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" /> {t("edit")}
                      </button>
                      <button 
                        onClick={() => handleDelete(addr.id)} 
                        className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-100/50 dark:border-red-500/10 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> {t("delete")}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-[#0c0d0e] rounded-[3rem] w-full max-w-lg overflow-hidden shadow-2xl shadow-slate-950/50"
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">{editId ? t("update") : t("add_new")}</h2>
                      <p className="text-xs text-slate-400 font-bold">{t("form_subtitle")}</p>
                    </div>
                    <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{t("label")}</label>
                       <div className="grid grid-cols-3 gap-2">
                        {(["Home", "Work", "Other"]).map(typ => {
                          const Icon = typeIcons[typ] || MapPin;
                          return (
                            <button 
                              key={typ} 
                              onClick={() => setForm(f => ({ ...f, type: typ }))}
                              className={cn(
                                "flex flex-col items-center gap-1.5 py-4 rounded-3xl text-xs font-black uppercase tracking-tighter border-2 transition-all",
                                form.type === typ 
                                  ? "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10" 
                                  : "border-slate-100 dark:border-white/5 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                              )}
                            >
                              <Icon className="w-5 h-5" /> {t(typ.toLowerCase())}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput label={t("name_label")} placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                      <FormInput label={t("phone_label")} placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                      <div className="sm:col-span-2">
                        <FormInput label={t("street_label")} placeholder="Door no, street, landmark, etc." value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} />
                      </div>
                      <FormInput label={t("city_label")} placeholder="City" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                      <FormInput label={t("postal_label")} placeholder="Pincode" value={form.postalCode} onChange={e => setForm(f => ({ ...f, postalCode: e.target.value }))} />
                    </div>

                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="w-full h-14 bg-primary text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 mt-4 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      {isSaving ? t("processing") : (editId ? t("update_button") : t("save_button"))}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </UserLayout>
  );
}
