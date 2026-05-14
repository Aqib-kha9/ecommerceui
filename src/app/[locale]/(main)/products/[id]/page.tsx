import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  ArrowLeft,
  Share2,
  CheckCircle,
  Package,
  PackageOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

// Removed generateStaticParams to allow fully dynamic real-time fetching for all product IDs

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;

  // Safe Decimal Parser
  const safeParse = (val: any) => {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'object' && val.d) {
      try { return parseFloat(`${val.s * val.d[0]}.${val.d.slice(1).join('') || '0'}`); } catch(e) { return 0; }
    }
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  let product: any = null;
  let relatedItems: any[] = [];
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/products/${id}`,
      { 
        headers: { "Accept-Language": locale },
        next: { revalidate: 60 } 
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      const p = json.data.product;
      product = {
        id: p.id,
        name: p.name,
        price: safeParse(p.price),
        originalPrice: safeParse(p.mrp),
        rating: safeParse(p.rating) || 4.5,
        reviews: p.reviewsCount || 0,
        image: p.images?.[0] || p.image,
        images: p.images || (p.image ? [p.image] : []),
        category: p.category?.name || "Premium Selection",
        categoryId: p.categoryId,
        badge: p.badge,
        inStock: p.stock > 0,
        stock: p.stock,
        unit: p.unit || 'pcs',
        description: p.description,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags)[locale] || [] : (p.tags?.[locale] || []),
        type: p.type,
        bundleItems: p.bundleItems || [],
        metadata: p.metadata || {},
        shippingCost: safeParse(p.shippingCost),
        isReturnable: p.isReturnable,
        isCodAllowed: p.isCodAllowed
      };

      // Fetch related products dynamically
      if (product.categoryId) {
        const relRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/products?category=${product.categoryId}&limit=4`,
          { headers: { "Accept-Language": locale } }
        );
        const relJson = await relRes.json();
        if (relJson.status === "success") {
          relatedItems = relJson.data.products.filter((item: any) => item.id !== id);
        }
      }
    }
  } catch (error) {
    console.error("Failed to fetch product", error);
  }

  if (!product) notFound();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Removed mockReviews as we only want real database data
  const reviews: any[] = []; // Currently we don't fetch reviews from DB yet, so we show empty state correctly

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-300 line-clamp-1">{product.name}</span>
        </div>

        {/* Product Details Section (Client Component for interactivity) */}
        <ProductDetailClient product={product} locale={locale} />

        {/* Tabs: Description & Reviews */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mb-6">
            <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Reviews ({product.reviews.toLocaleString()})</TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
              <div 
                className="prose prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description || "No description available." }}
              />
              {product.metadata?.ingredients && (
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                   <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Ingredients</h4>
                   <p className="text-sm text-slate-500 italic">{product.metadata.ingredients}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <div key={idx} className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
                    {/* ... review rendering ... */}
                  </div>
                ))
              ) : (
                <div className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-12 text-center">
                   <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-slate-400" />
                   </div>
                   <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No reviews yet</h3>
                   <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto">Be the first to review this product and help others make a better choice!</p>
                   <Button variant="outline" className="mt-6 rounded-xl font-bold uppercase text-[10px] tracking-widest px-8">Write a Review</Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs mb-1">Logistics & Delivery</p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        Shipping Cost: {product.shippingCost > 0 ? `₹${product.shippingCost}` : "FREE"}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">
                        {product.isCodAllowed ? "✓ Cash on Delivery Available" : "✗ Prepaid Orders Only"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs mb-1">Return Policy</p>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        {product.isReturnable ? "7-day easy returns & refunds." : "This product is non-returnable (FMCG Policy)."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-white/5 space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Product Intelligence</h4>
                   <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Shelf Life</span>
                        <span className="font-black text-slate-900 dark:text-white">{product.metadata?.shelfLife || "As per pack"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">Manufacturer</span>
                        <span className="font-black text-slate-900 dark:text-white">{product.metadata?.manufacturer || "Ayur Pooja"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold uppercase tracking-wider">FSSAI License</span>
                        <span className="font-black font-mono text-slate-600">{product.metadata?.fssai || "Pending"}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedItems.length > 0 && (
          <div className="pt-16 border-t border-slate-100 dark:border-white/5">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-10 tracking-tighter uppercase">Related <span className="text-primary">Products</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedItems.map((p: any) => (
                <ProductCard key={p.id} product={{
                   ...p,
                   price: safeParse(p.price),
                   originalPrice: safeParse(p.mrp),
                   rating: safeParse(p.rating) || 4.5,
                   reviews: p.reviewsCount || 0,
                   category: p.category?.name || "Selection",
                   image: p.images?.[0] || p.image,
                   inStock: p.stock > 0
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
