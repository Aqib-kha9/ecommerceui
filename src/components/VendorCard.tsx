import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Package, CheckCircle } from "lucide-react";
import { Vendor } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Card className="group bg-slate-800/50 border-slate-700/50 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden rounded-2xl">
      {/* Banner */}
      <div className="relative h-28 overflow-hidden">
        <Image
          src={vendor.banner}
          alt={vendor.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
      </div>

      <CardContent className="p-4 -mt-8 relative">
        <div className="flex items-end justify-between mb-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl border-2 border-slate-700 overflow-hidden bg-slate-700 shadow-lg">
              <Image src={vendor.logo} alt={vendor.name} width={56} height={56} className="object-cover" />
            </div>
            {vendor.isVerified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-primary fill-slate-800" />
            )}
          </div>
          <Badge className="bg-slate-700/80 text-primary border-primary/30 text-xs text-primary-foreground font-bold">
            {vendor.category}
          </Badge>
        </div>

        <h3 className="font-semibold text-white text-sm mb-0.5 flex items-center gap-1.5">
          {vendor.name}
          {vendor.isVerified && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Verified</span>}
        </h3>
        <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
          <MapPin className="w-3 h-3" /> {vendor.location}
        </p>

        <div className="flex items-center gap-3 mb-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-white font-semibold">{vendor.rating}</span>
            <span>({vendor.reviews.toLocaleString()})</span>
          </span>
          <span className="w-px h-3 bg-slate-600" />
          <span className="flex items-center gap-1">
            <Package className="w-3 h-3 text-primary" />
            {vendor.totalProducts} products
          </span>
        </div>

        <Link href={`/vendors/${vendor.id}`}>
          <Button className="w-full bg-slate-700 hover:bg-primary text-white border border-slate-600 hover:border-primary transition-all duration-200 rounded-xl text-sm h-9">
            Visit Store
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
