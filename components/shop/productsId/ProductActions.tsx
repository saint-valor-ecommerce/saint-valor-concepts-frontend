"use client";

import { Heart, ShoppingBag } from "lucide-react";

interface ProductActionsProps {
  productId: string;
  selectedSize: string | null;
  hasSizes: boolean;
  isFavourite: boolean;
  onAddToCart: () => void;
  onToggleFavourite: () => void;
}

const ProductActions = ({
  selectedSize,
  hasSizes,
  isFavourite,
  onAddToCart,
  onToggleFavourite,
}: ProductActionsProps) => {
  const sizeRequired = hasSizes && !selectedSize;

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onAddToCart}
        disabled={sizeRequired}
        className="flex items-center cursor-pointer justify-center gap-2 w-full bg-gold text-white py-3.5 text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ShoppingBag size={16} />
        {sizeRequired ? "Select a size" : "Add to cart"}
      </button>

      <button
        onClick={onToggleFavourite}
        className="flex items-center cursor-pointer justify-center gap-2 w-full border border-border text-charcoal py-3.5 text-sm font-medium hover:border-charcoal transition-colors duration-200"
      >
        <Heart
          size={16}
          className={isFavourite ? "fill-red-500 stroke-red-500" : ""}
        />
        {isFavourite ? "Remove from Favorites" : "Save to Favorites"}
      </button>
    </div>
  );
};

export default ProductActions;
