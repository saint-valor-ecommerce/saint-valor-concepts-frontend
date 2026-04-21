"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
  isLoading?: boolean;
}

export default function ProductSlider({
  title,
  products,
  subtitle,
  isLoading,
}: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  if (isLoading) {
    return (
      <section className="flex flex-col gap-6 max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-medium text-charcoal">{title}</h1>
          {subtitle && (
            <p className="text-xs max-w-xs leading-relaxed">{subtitle}</p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-3/4 w-full bg-charcoal/5 animate-pulse" />
              <div className="h-2.5 w-1/3 bg-charcoal/5 animate-pulse" />
              <div className="h-3 w-2/3 bg-charcoal/5 animate-pulse" />
              <div className="h-3 w-1/2 bg-charcoal/5 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="flex flex-col gap-6 max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-medium text-charcoal">{title}</h1>
          {subtitle && (
            <p className="text-xs max-w-xs leading-relaxed">{subtitle}</p>
          )}
        </div>
        <div className="flex flex-col items-center gap-2 py-12">
          <p className="text-sm font-medium text-charcoal">Coming Soon</p>
          <p className="text-xs text-secondary text-center">
            New pieces are being crafted. Check back soon.
          </p>
        </div>
      </section>
    );
  }

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
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
