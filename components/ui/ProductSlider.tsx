"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductSlider({
  title,
  products,
  subtitle,
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + itemsToShow,
  );

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < products.length - itemsToShow;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex((prev) => Math.max(0, prev - itemsToShow));
  };

  const handleNext = () => {
    if (canGoNext)
      setCurrentIndex((prev) =>
        Math.min(products.length - itemsToShow, prev + itemsToShow),
      );
  };

  return (
    <section className="flex flex-col gap-6 max-w-5xl mx-auto px-6 py-10">
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-medium text-charcoal">{title}</h1>
          {subtitle && (
            <p className="text-xs max-w-xs leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="slider-icons"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="slider-icons"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div
        key={currentIndex}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in"
      >
        {visibleProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={(id) => console.log("Add to cart:", id)}
            onFavourite={(id) => console.log("Favourite:", id)}
          />
        ))}
      </div>
    </section>
  );
}
