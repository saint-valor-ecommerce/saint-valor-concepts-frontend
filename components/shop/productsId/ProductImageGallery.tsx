"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({
  images,
  productName,
}: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const thumbnails = images.length > 1 && (
    <>
      {images.map((img, i) => (
        <button
          key={i}
          onMouseEnter={() => setActiveIndex(i)}
          onClick={() => setActiveIndex(i)}
          className={`relative shrink-0 overflow-hidden rounded-sm transition-all duration-200
            w-16 h-16 md:w-full md:aspect-square cursor-pointer
            ${
              activeIndex === i
                ? "ring-2 ring-charcoal opacity-100"
                : "hover:opacity-70"
            }`}
        >
          <Image
            src={img}
            alt={`${productName} view ${i + 1}`}
            fill
            className="object-cover"
          />
        </button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col md:flex-row-reverse gap-3">
      {/* Main image */}
      <div className="relative w-full aspect-3/4 overflow-hidden rounded-sm md:flex-1">
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          priority
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails — horizontal scroll on mobile, vertical strip on desktop */}
      {images.length > 1 && (
        <>
          {/* Mobile: horizontal */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-1">
            {thumbnails}
          </div>

          {/* Desktop: vertical strip on the left */}
          <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
            {thumbnails}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageGallery;
