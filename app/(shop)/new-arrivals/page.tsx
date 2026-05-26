"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShopGrid from "@/components/shop/ShopGrid";
import { getNewArrivals } from "@/lib/api/products";
import { Product } from "@/types/product";

const NewArrivalsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewArrivals()
      .then(setProducts)
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ivory px-6 py-8">
      {/* Title section */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-semibold text-charcoal">New Arrivals</h1>
        <p className="text-xs text-secondary max-w-xl leading-relaxed">
          The latest additions, thoughtfully crafted to complement evolving
          style and contemporary luxury.
        </p>
      </div>

      {/* Product Grid */}
      <ShopGrid products={products} isLoading={isLoading} />
    </div>
  );
};

export default NewArrivalsPage;
