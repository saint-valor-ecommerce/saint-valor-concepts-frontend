"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useFavouritesStore } from "@/store/favouritesStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { favouriteIds, toggleFavourite } = useFavouritesStore();
  const isFavourite = favouriteIds.has(product._id);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden aspect-3/4 w-full">
        <Link href={`/shop/${product._id}`} className="block w-full h-full">
          <Image
            src={product.mainImage ?? "/images/shop-1.png"}
            alt={product.productName ?? ""}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
