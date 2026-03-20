"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
}

const megaMenuData: Record<string, any> = {
  "Groceries": {
    columns: [
      {
        title: "STAPLES",
        items: ["Atta & Flours", "Basmati Rice", "Dals & Pulses", "Cooking Oils", "Spices & Masala"]
      },
      {
        title: "SNACKS",
        items: ["Biscuits", "Namkeen", "Chips & Crisps", "Noodles", "Chocolates"]
      },
      {
        title: "DAIRY & BREAD",
        items: ["Fresh Milk", "Butter & Ghee", "Cheese", "Brown Bread", "Curd & Yogurt"]
      },
      {
        title: "BREAKFAST",
        items: ["Oats", "Cornflakes", "Honey", "Peanut Butter", "Muesli"]
      }
    ],
    banners: [
      {
        title: "Pantry Staples",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f9ed]",
        linkText: "Shop Now"
      },
      {
        title: "Snack Time",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf0e8]",
        linkText: "Shop Now"
      },
      {
        title: "Dairy Fresh",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1550583724-b26cc28df5d1?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      }
    ]
  },
  "Personal Care": {
    columns: [
      {
        title: "BATH & BODY",
        items: ["Soaps", "Shower Gels", "Body Lotions", "Talcum Powder", "Hand Wash"]
      },
      {
        title: "HAIR CARE",
        items: ["Shampoos", "Conditioners", "Hair Oils", "Hair Colors", "Styling Products"]
      },
      {
        title: "SKIN CARE",
        items: ["Face Wash", "Moisturizers", "Sunscreens", "Face Masks", "Lip Care"]
      },
      {
        title: "ORAL CARE",
        items: ["Toothpaste", "Toothbrushes", "Mouthwash", "Floss", "Breath Fresheners"]
      }
    ],
    banners: [
      {
        title: "Bath & Body",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf0e8]",
        linkText: "Shop Now"
      },
      {
        title: "Hair Care",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f9ed]",
        linkText: "Shop Now"
      },
      {
        title: "Skin Care",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54c28?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      }
    ]
  },
  "Household": {
    columns: [
      {
        title: "CLEANERS",
        items: ["Floor Cleaners", "Toilet Cleaners", "Glass Cleaners", "Multipurpose", "Disinfectants"]
      },
      {
        title: "LAUNDRY",
        items: ["Detergent Powders", "Liquid Detergents", "Fabric Softeners", "Stain Removers", "Bleach"]
      },
      {
        title: "PAPER GOODS",
        items: ["Toilet Paper", "Kitchen Towels", "Tissue Papers", "Garbage Bags", "Aluminium Foil"]
      },
      {
        title: "FRESHENERS",
        items: ["Air Fresheners", "Mosquito Repellents", "Room Sprays", "Moth Balls", "Incense Sticks"]
      }
    ],
    banners: [
      {
        title: "Home Hygiene",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      },
      {
        title: "Laundry Care",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf6e6]",
        linkText: "Shop Now"
      },
      {
        title: "Clean Home",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f9ed]",
        linkText: "Shop Now"
      }
    ]
  },
  "Beauty": {
    columns: [
      {
        title: "MAKEUP",
        items: ["Lipsticks", "Foundations", "Nail Polish", "Eye Shadow", "Mascara"]
      },
      {
        title: "FRAGRANCES",
        items: ["Perfumes", "Deodorants", "Body Mists", "Colognes", "Attars"]
      },
      {
        title: "MEN'S GROOMING",
        items: ["Shaving Cream", "Razors", "Aftershave", "Beard Oil", "Trimmers"]
      },
      {
        title: "ACCESSORIES",
        items: ["Brushes", "Sponges", "Compact Mirrors", "Hair Clips", "Tweezers"]
      }
    ],
    banners: [
      {
        title: "Makeup Deals",
        discount: "30% Off",
        image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf0e8]",
        linkText: "Shop Now"
      },
      {
        title: "Perfumes",
        discount: "20% Off",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf6e6]",
        linkText: "Shop Now"
      },
      {
        title: "Grooming",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      }
    ]
  },
  "Baby Care": {
    columns: [
      {
        title: "DIAPERING",
        items: ["Baby Diapers", "Wipes", "Rash Creams", "Changing Mats", "Cloth Diapers"]
      },
      {
        title: "BABY FOOD",
        items: ["Infant Formula", "Cerelac", "Purees", "Toddler Snacks", "Milk Biscuits"]
      },
      {
        title: "BABY BATH",
        items: ["Baby Soap", "Tear-free Shampoo", "Baby Lotion", "Massage Oil", "Baby Powder"]
      },
      {
        title: "NURSING",
        items: ["Feeding Bottles", "Breast Pumps", "Sterilizers", "Sippy Cups", "Baby Bibs"]
      }
    ],
    banners: [
      {
        title: "Diaper Sale",
        discount: "25% Off",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f9ed]",
        linkText: "Shop Now"
      },
      {
        title: "Baby Bath",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      },
      {
        title: "Baby Food",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1515488042361-ee00a0ddd4e4?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf0e8]",
        linkText: "Shop Now"
      }
    ]
  },
  "Pharmacy": {
    columns: [
      {
        title: "OTC MEDICINES",
        items: ["Pain Relief", "Cold & Cough", "Antacids", "First Aid", "Bandages"]
      },
      {
        title: "SUPPLEMENTS",
        items: ["Multivitamins", "Protein Powders", "Omega 3", "Calcium", "Herbal Supplements"]
      },
      {
        title: "HEALTH DEVICES",
        items: ["Thermometers", "BP Monitors", "Weighing Scales", "Massagers", "Oximeters"]
      },
      {
        title: "NUTRITION",
        items: ["Diabetic Food", "Gluten-Free", "Weight Loss", "Immunity Boosters", "Energy Bars"]
      }
    ],
    banners: [
      {
        title: "Vitamins",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f9ed]",
        linkText: "Shop Now"
      },
      {
        title: "First Aid",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#fdf0e8]",
        linkText: "Shop Now"
      },
      {
        title: "Health Devices",
        discount: "5% Off",
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600",
        color: "bg-[#e8f4f9]",
        linkText: "Shop Now"
      }
    ]
  },
  "default": {
    columns: [
      {
        title: "HOUSEHOLD",
        items: ["Detergents", "Floor Cleaners", "Dishwash", "Tissues", "Air Freshners"]
      },
      {
        title: "PERSONAL CARE",
        items: ["Soaps", "Shampoos", "Skin Care", "Oral Care", "Deodorants"]
      },
      {
        title: "BABY CARE",
        items: ["Diapers", "Baby Wipes", "Baby Food", "Baby Lotion", "Baby Soap"]
      },
    ],
    banners: [
      {
        title: "Self Care",
        discount: "10% Off",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
        color: "bg-slate-50",
        linkText: "Shop Now"
      },
      {
        title: "Home Hygiene",
        discount: "15% Off",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
        color: "bg-slate-50",
        linkText: "Shop Now"
      },
      {
        title: "Baby Deals",
        discount: "23% Off",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=600",
        color: "bg-slate-50",
        linkText: "Shop Now"
      }
    ]
  }
};

export default function MegaMenu({ category, isOpen }: MegaMenuProps) {
  const data = megaMenuData[category] || megaMenuData["default"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-[calc(100%-1px)] w-[95%] max-w-7xl bg-white border-x border-b border-slate-200 rounded-b-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] z-40 overflow-hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div className="px-12 py-10">
        <div className="flex gap-0 mb-12">
          {data.columns.map((col: any, idx: number) => (
            <div key={idx} className={cn(
              "flex-1 px-8",
              idx !== 0 && "border-l border-slate-100"
            )}>
              <h3 className="text-[12px] font-black tracking-widest uppercase mb-6 text-slate-800">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.slice(0, 5).map((item: string, i: number) => (
                  <li key={i}>
                    <Link 
                      href="/products" 
                      className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-all block py-1"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Promo Banners */}
        <div className="grid grid-cols-3 gap-6">
          {data.banners.map((banner: any, idx: number) => (
            <div 
              key={idx}
              className={`group flex items-center overflow-hidden rounded-2xl transition-transform hover:-translate-y-1 ${banner.color} h-[180px] relative cursor-pointer shadow-sm`}
            >
              <div className="absolute right-0 top-0 w-[55%] h-full">
                <Image 
                  src={banner.image} 
                  alt={banner.title}
                  fill
                  className="object-cover object-center mix-blend-multiply opacity-80"
                />
              </div>
              <div className="relative z-10 p-8 w-[60%] flex flex-col justify-center">
                <p className="text-[13px] font-bold text-slate-600 mb-1">
                  {banner.discount}
                </p>
                <h4 className="text-[22px] font-black text-slate-900 leading-[1.1] mb-4 tracking-tighter">
                  {banner.title}
                </h4>
                <div className="inline-flex items-center gap-2 group/btn w-fit">
                   <span className="text-[13px] font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5 tracking-tight group-hover/btn:text-primary group-hover/btn:border-primary transition-all">
                     {banner.linkText}
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
