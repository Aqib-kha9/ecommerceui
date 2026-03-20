export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string;
  images?: string[];
  category: string;
  vendorId: string;
  vendorName: string;
  badge?: string;
  inStock: boolean;
  description: string;
  tags: string[];
  itemsCount?: number;
};

export type Vendor = {
  id: string;
  name: string;
  logo: string;
  banner: string;
  rating: number;
  reviews: number;
  totalProducts: number;
  category: string;
  location: string;
  isVerified: boolean;
  joinedDate: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  color: string;
};

export type Order = {
  id: string;
  product: string;
  vendor: string;
  amount: number;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  date: string;
  image: string;
};

export const categories: Category[] = [
  { id: "1", name: "Groceries", icon: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200", productCount: 4500, color: "from-violet-500 to-indigo-600" },
  { id: "2", name: "Beauty", icon: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=200", productCount: 3200, color: "from-pink-500 to-rose-500" },
  { id: "3", name: "Personal Care", icon: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=200", productCount: 2800, color: "from-purple-500 to-indigo-500" },
  { id: "4", name: "Snacks", icon: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&q=80&w=200", productCount: 1560, color: "from-amber-500 to-orange-500" },
  { id: "5", name: "Dairy & Bakery", icon: "https://images.unsplash.com/photo-1550583724-b26cc28df5d1?auto=format&fit=crop&q=80&w=200", productCount: 890, color: "from-yellow-400 to-amber-500" },
  { id: "6", name: "Household", icon: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200", productCount: 1100, color: "from-slate-500 to-slate-700" },
  { id: "7", name: "Baby Care", icon: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=200", productCount: 650, color: "from-pink-400 to-rose-400" },
  { id: "8", name: "Organic", icon: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200", productCount: 320, color: "from-purple-400 to-violet-500" },
];

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "FreshMart Essentials",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=FreshMart&backgroundColor=8b5cf6",
    banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=300&fit=crop",
    rating: 4.8,
    reviews: 4520,
    totalProducts: 1200,
    category: "Groceries",
    location: "Mumbai, India",
    isVerified: true,
    joinedDate: "2020-05-10",
    description: "Your daily stop for farm-fresh vegetables, organic staples, and premium kitchen essentials.",
  },
  {
    id: "v2",
    name: "PurePlus Personal Care",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PurePlus&backgroundColor=a855f7",
    banner: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&h=300&fit=crop",
    rating: 4.7,
    reviews: 2130,
    totalProducts: 450,
    category: "Personal Care",
    location: "Delhi, India",
    isVerified: true,
    joinedDate: "2021-02-15",
    description: "Dermatologically tested personal care products. Bringing nature's best to your skin.",
  },
  {
    id: "v3",
    name: "Bake & Brew",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=BakeBrew&backgroundColor=f59e0b",
    banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=300&fit=crop",
    rating: 4.6,
    reviews: 1840,
    totalProducts: 320,
    category: "Dairy & Bakery",
    location: "Bengaluru, India",
    isVerified: true,
    joinedDate: "2022-08-20",
    description: "Freshly baked artisan breads, gourmet coffee, and dairy products delivered daily.",
  },
  {
    id: "v4",
    name: "DailyPantry",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DailyPantry&backgroundColor=3b82f6",
    banner: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&h=300&fit=crop",
    rating: 4.5,
    reviews: 950,
    totalProducts: 850,
    category: "Household",
    location: "Pune, India",
    isVerified: false,
    joinedDate: "2023-01-05",
    description: "One-stop shop for all your monthly household supplies and pantry staples.",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Organic Basmati Rice 5kg",
    price: 899,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 2450,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1526644906062-41e75a0b4bfa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Groceries",
    vendorId: "v1",
    vendorName: "FreshMart Essentials",
    badge: "Bestseller",
    inStock: true,
    description: "Premium aged organic Basmati rice with long grains and aromatic flavor. Perfect for biryanis.",
    tags: ["rice", "organic", "staple"],
  },
  {
    id: "p2",
    name: "Natural Almond Milk 1L",
    price: 249,
    originalPrice: 350,
    rating: 4.5,
    reviews: 840,
    images: [
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1550583724-b26cc28df5d1?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Dairy & Bakery",
    vendorId: "v3",
    vendorName: "Bake & Brew",
    badge: "Lactose Free",
    inStock: true,
    description: "Unsweeneted natural almond milk, fortified with Vitamin D and Calcium.",
    tags: ["milk", "vegan", "dairy-free"],
  },
  {
    id: "p3",
    name: "Ayurvedic Face Serum 30ml",
    price: 1299,
    originalPrice: 1800,
    rating: 4.9,
    reviews: 860,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Beauty",
    vendorId: "v2",
    vendorName: "PurePlus Personal Care",
    badge: "Premium Choice",
    inStock: true,
    description: "Pure Ayurvedic face serum with 24k gold dust and saffron for a natural glow.",
    tags: ["serum", "ayurvedic", "beauty"],
  },
  {
    id: "p4",
    name: "Pure Rose Water Mist 100ml",
    price: 499,
    originalPrice: 650,
    rating: 4.8,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?w=400&h=400&fit=crop",
    category: "Beauty",
    vendorId: "v2",
    vendorName: "PurePlus Personal Care",
    inStock: true,
    description: "Natural steam-distilled rose water for instant skin hydration and freshness.",
    tags: ["rosewater", "mist", "skincare"],
  },
  {
    id: "p5",
    name: "Moisturizing Aloe Vera Hand Wash",
    price: 199,
    originalPrice: 299,
    rating: 4.4,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    category: "Personal Care",
    vendorId: "v2",
    vendorName: "PurePlus Personal Care",
    badge: "Eco-Friendly",
    inStock: true,
    description: "Gentle on skin, tough on germs. Infused with natural aloe vera extracts.",
    tags: ["personal-care", "hygiene", "aloe"],
  },
  {
    id: "p6",
    name: "Assorted Premium Biscuits 400g",
    price: 149,
    originalPrice: 199,
    rating: 4.3,
    reviews: 730,
    image: "https://images.unsplash.com/photo-1558961776-666879e95079?w=400&h=400&fit=crop",
    category: "Snacks",
    vendorId: "v4",
    vendorName: "DailyPantry",
    badge: "Family Pack",
    inStock: true,
    description: "A delicious mix of chocolate, butter, and oatmeal cookies.",
    tags: ["biscuits", "snacks", "sweet"],
  },
  {
    id: "p7",
    name: "Extra Virgin Olive Oil 500ml",
    price: 749,
    originalPrice: 999,
    rating: 4.7,
    reviews: 1100,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    category: "Groceries",
    vendorId: "v1",
    vendorName: "FreshMart Essentials",
    inStock: true,
    description: "Cold-pressed extra virgin olive oil for healthy cooking and salads.",
    tags: ["oil", "cooking", "healthy"],
  },
  {
    id: "p8",
    name: "Charcoal Face Wash for Men",
    price: 349,
    originalPrice: 450,
    rating: 4.5,
    reviews: 1420,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    category: "Personal Care",
    vendorId: "v2",
    vendorName: "PurePlus Personal Care",
    badge: "Deep Clean",
    inStock: true,
    description: "Deep cleansing action with activated charcoal to remove dirt and excess oil.",
    tags: ["men", "face-wash", "charcoal"],
  },
  {
    id: "p9",
    name: "Artisan Belgian Chocolate Box (16 Pcs)",
    price: 999,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 156,
    images: [
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Snacks",
    vendorId: "v4",
    vendorName: "DailyPantry",
    badge: "Premium Gift",
    inStock: true,
    description: "Handcrafted Belgian chocolates with rich cocoa butter and exotic fillings.",
    tags: ["chocolate", "gift", "premium"],
  },
  {
    id: "p10",
    name: "Himalayan Pink Salt Grinder 200g",
    price: 299,
    originalPrice: 450,
    rating: 4.7,
    reviews: 890,
    images: [
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Groceries",
    vendorId: "v1",
    vendorName: "FreshMart Essentials",
    badge: "Essential",
    inStock: true,
    description: "100% natural Himalayan pink salt with a built-in ceramic grinder for fresh seasoning.",
    tags: ["salt", "spice", "organic"],
  },
  {
    id: "p11",
    name: "Golden Manuka Honey MGO 250+",
    price: 1849,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 430,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Organic",
    vendorId: "v1",
    vendorName: "FreshMart Essentials",
    badge: "Rare Find",
    inStock: true,
    description: "High-grade Manuka honey from New Zealand, known for its unique healing properties.",
    tags: ["honey", "organic", "health"],
  },
  {
    id: "p12",
    name: "Luxury Soy Scented Candle (Lavender)",
    price: 599,
    originalPrice: 899,
    rating: 4.8,
    reviews: 670,
    images: [
      "https://images.unsplash.com/photo-1603006905393-d14498361002?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1601213906709-6810183d294a?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Household",
    vendorId: "v4",
    vendorName: "DailyPantry",
    badge: "Handmade",
    inStock: true,
    description: "Eco-friendly soy wax candle with essential oil fragrance for a calming atmosphere.",
    tags: ["candle", "lavender", "decor"],
  },
];

export const orders: Order[] = [
  { id: "#ORD-501", product: "Organic Basmati Rice", vendor: "FreshMart Essentials", amount: 899, status: "delivered", date: "2024-03-01", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=60&h=60&fit=crop" },
  { id: "#ORD-502", product: "Almond Milk 1L", vendor: "Bake & Brew", amount: 249, status: "shipped", date: "2024-03-05", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=60&h=60&fit=crop" },
  { id: "#ORD-503", product: "Premium Coffee Beans", vendor: "Bake & Brew", amount: 599, status: "processing", date: "2024-03-08", image: "https://images.unsplash.com/photo-1559056191-753bc6689403?w=60&h=60&fit=crop" },
  { id: "#ORD-504", product: "Olive Oil 500ml", vendor: "FreshMart Essentials", amount: 749, status: "delivered", date: "2024-02-25", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=60&h=60&fit=crop" },
  { id: "#ORD-505", product: "Charcoal Face Wash", vendor: "PurePlus Personal Care", amount: 349, status: "cancelled", date: "2024-02-15", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=60&h=60&fit=crop" },
];
