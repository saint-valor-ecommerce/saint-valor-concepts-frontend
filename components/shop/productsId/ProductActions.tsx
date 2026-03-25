"use client";

import { Heart } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { CartItem } from "@/types/cart";

interface ProductActionsProps {
  productId: string;
  productName: string;
  productPrice: number;
  mainImage: string;
  selectedSize: string | null;
  hasSizes: boolean;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

const ProductActions = ({
  productId,
  productName,
  productPrice,
  mainImage,
  selectedSize,
  hasSizes,
  isFavourite,
  onToggleFavourite,
}: ProductActionsProps) => {
  const sizeRequired = hasSizes && !selectedSize;

  const item: CartItem = {
    productId,
    productName,
    productPrice,
    mainImage,
    size: selectedSize,
    quantity: 1,
  };

  return (
    <div className="flex flex-col gap-3">
      <AddToCartButton
        item={item}
        disabled={sizeRequired}
        label={sizeRequired ? "Select a size" : "Add to cart"}
      />

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
