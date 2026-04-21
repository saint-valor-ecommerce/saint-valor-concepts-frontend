"use client";

import React from "react";
import { ProductGrid, Product } from "./ProductGrid";

export const CustomJewelrySection: React.FC = () => {
  const products: Product[] = [
    {
      id: "1",
      imageSrc: "/images/our-story-1.png",
      imageAlt: "Diamond engagement rings",
    },
    {
      id: "2",
      imageSrc: "/images/our-story-1.png",
      imageAlt: "Colorful gemstone ring",
    },
    {
      id: "3",
      imageSrc: "/images/our-story-2.png",
      imageAlt: "Diamond engagement rings",
    },
    {
      id: "4",
      imageSrc: "/images/our-story-2.png",
      imageAlt: "Colorful gemstone ring",
    },
  ];

  return (
    <section className="bg-ivory py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-charcoal sm:text-3xl">
            Custom Jewelry,
            <br />
            Crafted Around You
          </h2>
          <p className="mt-3 text-sm text-charcoal">
            Work with Saint Valor to create a piece that reflects your story,
            style, and individuality.
          </p>
        </header>

        <div className="mt-8 sm:mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
};
