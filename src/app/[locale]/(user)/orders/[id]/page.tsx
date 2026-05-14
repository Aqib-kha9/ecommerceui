"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle2, Truck, Clock, Package, XCircle, Download, MapPin, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import UserLayout from "@/components/UserLayout";
import api from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("OrderDetails");
  const locale = useLocale();
  const { id } = use(params);
  
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/orders/${id}`);
        if (res.data.status === "success") {
          setOrder(res.data.data.order);
        }
      } catch (err) {
        console.error("Failed to fetch order details", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const statusBadge: any = {
    DELIVERED: { label: t("delivered"), icon: CheckCircle2, color: "text-green-600 bg-green-50 dark:bg-green-500/10" },
    SHIPPED: { label: t("out_for_delivery"), icon: Truck, color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
    PROCESSING: { label: t("processing"), icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
    PENDING: { label: t("processing"), icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
    CANCELLED: { label: t("cancelled_title"), icon: XCircle, color: "text-red-500 bg-red-50 dark:bg-red-500/10" },
  };

  const getTrackingSteps = (status: string) => {
    const isCancelled = status === "CANCELLED";
    if (isCancelled) return [];

    return [
      { label: t("placed"), time: "Done", done: true },
      { label: t("confirmed"), time: "Done", done: true },
      { label: t("shipped"), time: status === "SHIPPED" || status === "DELIVERED" ? "Done" : "Pending", done: status === "SHIPPED" || status === "DELIVERED" },
      { label: t("delivered"), time: status === "DELIVERED" ? "Done" : "Pending", done: status === "DELIVERED" },
    ];
  };

  if (isLoading) {
    return (
      <UserLayout title="..." subtitle="...">
        <div className="max-w-xl space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-[2rem]" />
          <Skeleton className="h-32 w-full rounded-[2rem]" />
        </div>
      </UserLayout>
    );
  }

  if (!order) return null;

  const conf = statusBadge[order.orderStatus] || statusBadge.PROCESSING;
  const Icon = conf.icon;
  const steps = getTrackingSteps(order.orderStatus);

  return (
    <UserLayout title={`Order #${order.orderNumber.split('-').slice(-1)}`} subtitle={formatDate(order.createdAt)}>
      <div className="max-w-xl space-y-4">
        {/* Back */}
        <Link href="/orders" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
          <ChevronLeft className="w-4 h-4" /> {t("back_to_orders")}
        </Link>

        {/* Status + Invoice */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${conf.color}`}>
            <Icon className="w-4 h-4" />
            <span className="font-black text-sm">{conf.label}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold text-xs gap-1 hover:bg-primary/5">
            <Download className="w-3.5 h-3.5" /> {t("invoice")}
          </Button>
        </div>

        {/* Tracking */}
        {order.orderStatus !== "CANCELLED" && (
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-5">{t("tracking")}</h3>
            <div className="relative pl-5">
              {steps.map((step, i) => (
                <div key={i} className="relative flex items-start gap-4 pb-5 last:pb-0">
                  {i < steps.length - 1 && <div className={`absolute left-0 top-5 w-0.5 h-full -translate-x-1/2 ${step.done ? "bg-primary" : "bg-slate-100 dark:bg-white/10"}`} />}
                  <div className={`absolute left-0 -translate-x-1/2 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${step.done ? "bg-primary border-primary" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10"}`}>
                    {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div className="ml-4">
                    <p className={`text-sm font-bold ${step.done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{step.label}</p>
                    <p className={`text-xs mt-0.5 font-medium ${step.done ? "text-primary" : "text-slate-400"}`}>{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cancelled info */}
        {order.orderStatus === "CANCELLED" && (
          <div className="bg-red-50 dark:bg-red-500/10 rounded-[1.5rem] border border-red-100 dark:border-red-500/20 p-5 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-black text-sm text-red-600 dark:text-red-400">{t("cancelled_title")}</p>
              <p className="text-xs text-red-500/80 mt-1">{t("refund_msg", { amount: `₹${order.payableAmount}` })}</p>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
          <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-4">{t("items")}</h3>
          <div className="space-y-3">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100 dark:border-white/5">
                  <Image src={item.product.images?.[0] || "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=120"} alt={item.product.name} width={56} height={56} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.product.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">×{item.quantity}</p>
                </div>
                <span className="font-black text-sm text-slate-900 dark:text-white">₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 dark:border-white/5 space-y-2">
            <div className="flex justify-between text-sm text-slate-500"><span>{t("subtotal")}</span><span>₹{Number(order.totalAmount).toLocaleString()}</span></div>
            {Number(order.discountAmount || 0) > 0 && <div className="flex justify-between text-sm text-green-600"><span>{t("discount")}</span><span>-₹{Number(order.discountAmount).toLocaleString()}</span></div>}
            <div className="flex justify-between text-sm text-slate-500"><span>{t("delivery")}</span><span className="text-green-600 font-bold">{t("free")}</span></div>
            <div className="flex justify-between font-black text-base text-slate-900 dark:text-white pt-2 border-t border-slate-50 dark:border-white/5"><span>{t("total_paid")}</span><span>₹{Number(order.payableAmount).toLocaleString()}</span></div>
          </div>
        </div>

        {/* Address + Payment row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-3">{t("delivery_to")}</h3>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{order.shippingAddress?.name || "User"}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{order.shippingAddress?.addressLine}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {order.shippingAddress?.phone || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-[#0c0d0e] rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm flex flex-col justify-between">
            <h3 className="font-black text-[11px] uppercase tracking-widest text-slate-400 mb-3">{t("payment")}</h3>
            <Badge className="bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-0 font-bold rounded-full w-fit uppercase tracking-widest text-[9px] px-3">{order.paymentMode}</Badge>
          </div>
        </div>

        {(order.orderStatus === "PENDING" || order.orderStatus === "PROCESSING") && (
          <Button variant="outline" onClick={() => setCancelling(true)} disabled={cancelling}
            className="w-full h-12 rounded-2xl font-black text-red-500 border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10">
            {cancelling ? t("cancelling") : t("cancel_order")}
          </Button>
        )}
      </div>
    </UserLayout>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
