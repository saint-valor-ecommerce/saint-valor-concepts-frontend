"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
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
    <div className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden aspect-3/4 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/shop/${product._id}`} className="block w-full h-full">
          <Image
            src={product.mainImage ?? "/images/shop-1.png"}
            alt={product.productName ?? ""}
            fill
            loading="eager"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Favourite button */}
        <button
          aria-label="Toggle favourite"
          onClick={() => toggleFavourite(product._id)}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm transition-transform duration-200 hover:scale-110 cursor-pointer z-10"
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
          <button
            onClick={() => onAddToCart(product._id)}
            className="w-full flex items-center justify-center gap-2 bg-gold text-white text-xs font-medium py-2.5 hover:bg-gold/90 transition-colors duration-200"
          >
            <ShoppingBag size={13} />
            Add to cart
          </button>
        </div>
      </div>

      <Link href={`/shop/${product._id}`} className="flex flex-col gap-0.5">
        <p className="text-[11px] text-secondary tracking-wide">
          {product.productCategory?.name}
        </p>
        <p className="text-sm font-medium text-charcoal leading-snug">
          {product.productName}
        </p>
        <p className="text-sm font-semibold text-charcoal">
          ₦{(product.productPrice ?? 0).toLocaleString()}
        </p>
      </Link>
    </div>
  );
}
