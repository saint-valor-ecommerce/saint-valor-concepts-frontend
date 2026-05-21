"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface CartIconProps {
  className?: string;
  size?: number;
}

const CartIcon = ({ className, size = 24 }: CartIconProps) => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const itemsCount = mounted ? totalItems : 0;

  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`Cart, ${itemsCount} ${itemsCount === 1 ? "item" : "items"}`}
    >
      <ShoppingCart
        style={{ width: size, height: size }}
        className={className}
        aria-hidden="true"
      />
      {itemsCount > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center"
          aria-hidden="true"
        >
          {itemsCount}
        </span>
      )}
    </span>
  );
};

export default CartIcon;
