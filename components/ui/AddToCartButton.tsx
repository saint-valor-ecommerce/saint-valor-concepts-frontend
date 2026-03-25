"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/cart";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
  variant?: "wide" | "small";
  item: CartItem;
  disabled?: boolean;
  label?: string;
}

const AddToCartButton = ({
  variant = "wide",
  item,
  disabled = false,
  label = "Add to cart",
}: AddToCartButtonProps) => {
  const { addToCart } = useCartStore();

  const handleClick = () => {
    addToCart(item);
    toast.success("Added to cart");
  };

  if (variant === "small") {
    return (
      <button
        aria-label="Add to Cart"
        onClick={handleClick}
        className="mt-2 cursor-pointer rounded-full bg-gold px-4 py-2 text-xs font-semibold text-charcoal transition hover:brightness-95"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex items-center cursor-pointer justify-center gap-2 w-full bg-gold text-white py-3.5 text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <ShoppingBag size={16} />
      {label}
    </button>
  );
};

export default AddToCartButton;
