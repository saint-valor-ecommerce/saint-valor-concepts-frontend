"use client";

import { Heart } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import { CartItem } from "@/types/cart";
import { ProductSize } from "@/types/product";

interface ProductActionsProps {
  productId: string;
  productName: string;
  productPrice: number;
  mainImage: string;
  selectedSize: string | null;
  hasSizes: boolean;
  sizes: ProductSize[];
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
  sizes,
  isFavourite,
  onToggleFavourite,
}: ProductActionsProps) => {
  const sizeRequired = hasSizes && !selectedSize;
  const selectedSizeObj = sizes.find((s) => s.size === selectedSize);
  const outOfStock = selectedSizeObj ? selectedSizeObj.quantity === 0 : false;

  const item: CartItem = {
    productId,
    productName,
    productPrice,
    mainImage,
    size: selectedSize,
    quantity: 1,
    stock: selectedSizeObj?.quantity ?? 0,
  };

  const isDisabled = sizeRequired || outOfStock;
  const label = sizeRequired
    ? "Select a size"
    : outOfStock
      ? "Out of stock"
      : "Add to cart";

  return (
    <div className="flex flex-col gap-3">
      <AddToCartButton
        item={item}
        disabled={isDisabled}
        label={label}
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
