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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const mockReviews = [
    { name: "Rahul S.", rating: 5, comment: "Excellent product! Exactly as described. Fast delivery too.", date: "Feb 12, 2024", avatar: "RS" },
    { name: "Priya M.", rating: 4, comment: "Good quality for the price. Packaging was great.", date: "Feb 8, 2024", avatar: "PM" },
    { name: "Amit K.", rating: 5, comment: "Best purchase ever! Highly recommend.", date: "Jan 30, 2024", avatar: "AK" },
  ];

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

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 shadow-xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className={`relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 border-2 cursor-pointer transition-all ${i === 0 ? "border-primary shadow-lg shadow-primary/10" : "border-slate-100 dark:border-slate-700 hover:border-primary/30 transform hover:scale-105"}`}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-primary">
              <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">
                <CheckCircle className="w-3.5 h-3.5" />
                Trusted Essentials
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-400 w-8 h-8">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white w-8 h-8">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-6 leading-[0.9] tracking-tighter">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-600"}`} />
                ))}
              </div>
              <span className="text-slate-900 dark:text-white font-black">{product.rating}</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">({product.reviews.toLocaleString()} reviews)</span>
              <Separator orientation="vertical" className="h-4 bg-slate-200 dark:bg-slate-700" />
              <span className={`text-xs font-black uppercase tracking-widest ${product.inStock ? "text-primary dark:text-primary" : "text-red-500"}`}>
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">₹{product.price.toLocaleString()}</span>
               {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-3 py-1 rounded-full uppercase text-[10px] tracking-widest">Save {discount}%</Badge>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 capitalize text-[10px] font-bold px-3 py-1 rounded-lg">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Quantity:</span>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <Button variant="ghost" size="icon" className="w-9 h-9 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">-</Button>
                <span className="text-slate-900 dark:text-white font-semibold w-8 text-center">1</span>
                <Button variant="ghost" size="icon" className="w-9 h-9 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">+</Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-8">
             <Button
                className="flex-[2] bg-primary hover:opacity-90 text-primary-foreground gap-3 rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/30 transition-transform active:scale-95"
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white gap-2 rounded-2xl h-14 font-bold border border-slate-200 dark:border-white/5"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Free Delivery", sub: "On ₹999+" },
                { icon: Shield, label: "Secure Payment", sub: "100% protected" },
                { icon: Package, label: "Easy Returns", sub: "7-day policy" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                  <item.icon className="w-5 h-5 text-primary mb-1" />
                  <p className="text-xs font-medium text-slate-900 dark:text-white">{item.label}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl mb-6">
            <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Reviews ({product.reviews.toLocaleString()})</TabsTrigger>
            <TabsTrigger value="shipping" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{product.description}</p>
              <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                {["Premium quality materials", "1-year warranty included", "Easy to set up and use", "Compatible with all major platforms"].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.name} className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-700 shadow-sm">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-black">{review.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{review.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{review.date}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-600"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-8 space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs mb-1">Standard Delivery (3-5 days)</p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Free on orders above ₹999. ₹49 for orders below ₹999.</p>
                </div>
              </div>
              <Separator className="bg-slate-100 dark:bg-slate-700" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white uppercase tracking-tight text-xs mb-1">Returns & Refunds</p>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">7-day return policy. Initiate returns from My Orders page.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-slate-100 dark:border-white/5">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white mb-10 tracking-tighter uppercase">Related <span className="text-primary">Products</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
