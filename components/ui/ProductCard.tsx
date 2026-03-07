"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import Button from "./Button";
import { Product } from "@/types/product";
import { useFavouritesStore } from "@/store/favouritesStore";

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { favouriteIds, toggleFavourite } = useFavouritesStore();
  const isFavourite = favouriteIds.has(product._id);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-3/4 max-h-56 w-full">
        <Image
          src={product.mainImage ?? "/images/shop-1.png"}
          alt={product.productName ?? ""}
          fill
          loading="eager"
          priority
          className="object-cover"
        />

        <button
          aria-label="Heart Icon"
          onClick={() => toggleFavourite(product._id)}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm transition-transform duration-200 hover:scale-110 cursor-pointer"
        >
          <Heart
            size={14}
            className={
              isFavourite ? "fill-red-500 stroke-red-500" : "stroke-gray-400"
            }
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 p-2.5 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <Button
            label="Add to cart"
            size="md"
            type="button"
            onClick={() => onAddToCart(product._id)}
            fullWidth
            variant="outline"
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-[11px] text-secondary tracking-wide">
          {product.productCategory?.name}
        </p>
        <p className="text-sm font-medium text-charcoal">
          {product.productName}
        </p>
        <p className="text-sm font-semibold text-charcoal">
          ₦{(product.productPrice ?? 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
