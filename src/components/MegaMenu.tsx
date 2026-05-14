"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

interface MegaMenuProps {
  category: string;
  categoryId: string;
  isOpen: boolean;
}

export default function MegaMenu({ category, categoryId, isOpen }: MegaMenuProps) {
  const locale = useLocale();
  const t = useTranslations("MegaMenu");
  const [data, setData] = useState<{ groups: any[]; banners: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  // Cache fetched data per categoryId so repeated hovers don't re-fetch
  const cache = useRef<Record<string, { groups: any[]; banners: any[] }>>({});

  useEffect(() => {
    if (!categoryId || !isOpen) return;

    // Use cache if available
    if (cache.current[categoryId]) {
      setData(cache.current[categoryId]);
      setHasAttempted(true);
      return;
    }

    const fetchMegaMenu = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/megamenu/category/${categoryId}`,
          { headers: { "Accept-Language": locale } }
        );
        const json = await response.json();
        if (json.status === "success") {
          cache.current[categoryId] = json.data;
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch MegaMenu data", error);
        setData({ groups: [], banners: [] });
      } finally {
        setIsLoading(false);
        setHasAttempted(true);
      }
    };

    fetchMegaMenu();
  }, [categoryId, isOpen, locale]);

  // Early exit — not open
  if (!isOpen) return null;

  // Show container while loading (so menu doesn't flash away)
  const isEmpty = hasAttempted && !isLoading && data && data.groups.length === 0 && data.banners.length === 0;
  if (isEmpty) return null;

  // Helper: render an item (item is either a string or {label, slug} object)
  const getItemLabel = (item: any): string =>
    typeof item === "string" ? item : item?.label || "";
  const getItemSlug = (item: any): string =>
    typeof item === "string" ? encodeURIComponent(item) : item?.slug || encodeURIComponent(item?.label || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-[calc(100%-1px)] w-[95%] max-w-7xl bg-white dark:bg-slate-900 border-x border-b border-slate-200 dark:border-slate-700 rounded-b-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] z-40 overflow-hidden pointer-events-auto"
      )}
    >
      {isLoading ? (
        /* Loading skeleton */
        <div className="px-12 py-10">
          <div className="flex gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex-1 space-y-3">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                {[1,2,3,4,5].map(j => (
                  <div key={j} className="h-2.5 bg-slate-50 rounded animate-pulse w-3/4" />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-12 py-12">
          {/* Sub-category Columns */}
          {data && data.groups.length > 0 && (
            <div className="flex gap-0 mb-14">
              {data.groups.map((col: any, idx: number) => (
                <div
                  key={col.id || idx}
                  className={cn("flex-1 px-8", idx !== 0 && "border-l border-slate-100 dark:border-slate-800")}
                >
                  {/* Column header — Uppercase, Extra Bold, Black (matches original design) */}
                  <h3 className="text-[12px] font-black tracking-widest uppercase mb-6 text-slate-900 dark:text-slate-100">
                    {col.title}
                  </h3>
                  <ul className="space-y-4">
                    {(col.items || []).map((item: any, i: number) => (
                      <li key={i}>
                        <Link
                          href={`/products?category=${getItemSlug(item)}`}
                          className="text-[14px] font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors block py-0.5"
                        >
                          {getItemLabel(item)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Promo Banners */}
          {data && data.banners.length > 0 && (
            <div
              className={cn(
                "grid gap-6",
                data.banners.length === 1 ? "grid-cols-1 max-w-md" :
                data.banners.length === 2 ? "grid-cols-2" :
                "grid-cols-3"
              )}
            >
              {data.banners.map((banner: any, idx: number) => (
                <Link
                  key={banner.id || idx}
                  href={banner.link || `/products?category=${encodeURIComponent(category)}`}
                  className={`group flex items-center overflow-hidden rounded-[2rem] transition-all hover:-translate-y-1 hover:shadow-xl ${banner.color || "bg-slate-50"} h-[180px] relative cursor-pointer border border-white/20`}
                >
                  {/* Text Section (60%) */}
                  <div className="relative z-10 p-8 w-[60%] flex flex-col justify-center h-full">
                    <p className="text-[13px] font-black text-primary mb-1.5 uppercase tracking-tight">{banner.discount}</p>
                    <h4 className="text-[24px] font-black text-slate-900 leading-[1.05] mb-5 tracking-tighter">
                      {banner.title}
                    </h4>
                    <span className="text-[14px] font-black text-slate-900 border-b-2 border-slate-900 pb-0.5 tracking-tight group-hover:text-primary group-hover:border-primary transition-all w-fit">
                      {t("shop_now")}
                    </span>
                  </div>

                  {/* Image Section (40%) */}
                  <div className="absolute right-0 top-0 w-[45%] h-full p-4 overflow-hidden">
                    {banner.image && (
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                         <Image
                          src={banner.image}
                          alt={banner.title}
                          fill
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No content fallback */}
          {data && data.groups.length === 0 && data.banners.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-8">
              No sub-categories yet for <strong>{category}</strong>.
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
