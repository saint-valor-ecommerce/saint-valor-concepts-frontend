"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface CartIconProps {
  className?: string;
  size?: number;
}

const CartIcon = ({ className, size = 24 }: CartIconProps) => {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <span className="relative inline-flex">
      <ShoppingCart
        style={{ width: size, height: size }}
        className={className}
      />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </span>
  );
};

export default CartIcon;
