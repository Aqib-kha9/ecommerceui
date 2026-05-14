"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  unit?: string;
};

export type Coupon = {
  code: string;
  discount: number;
  discountType: 'PERCENTAGE' | 'FLAT';
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  appliedCoupon: Coupon | null;
  cartTotal: number;
  cartCount: number;
  discountedTotal: number;
  discountAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ayur_pooja_cart');
    const savedCoupon = localStorage.getItem('ayur_pooja_coupon');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (e) {
        console.error('Failed to parse coupon', e);
      }
    }
  }, []);

  // Save cart & coupon to localStorage
  useEffect(() => {
    localStorage.setItem('ayur_pooja_cart', JSON.stringify(items));
    if (appliedCoupon) {
      localStorage.setItem('ayur_pooja_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('ayur_pooja_coupon');
    }
  }, [items, appliedCoupon]);

  const addToCart = (product: any, quantity: number) => {
    const existing = items.find((item) => item.productId === product.id);
    
    if (existing) {
      updateQuantity(product.id, existing.quantity + quantity);
      toast.success(`${product.name} updated!`);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0],
          quantity,
          unit: product.unit
        },
      ]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (coupon: Coupon) => {
    setAppliedCoupon(coupon);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discountAmount = (cartTotal * appliedCoupon.discount) / 100;
    } else {
      discountAmount = appliedCoupon.discount;
    }
  }

  const discountedTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        discountedTotal,
        discountAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
