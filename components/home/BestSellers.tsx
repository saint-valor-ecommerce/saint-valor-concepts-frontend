"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductSlider from "@/components/ui/ProductSlider";
import { getBestSellers } from "@/lib/api/products";
import { Product } from "@/types/product";

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBestSellers()
      .then(setProducts)
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductSlider
      title="Best Sellers"
      subtitle="Our most coveted pieces, chosen for their elegance, presence, and enduring appeal."
      products={products}
      isLoading={isLoading}
    />
  );
};

export default BestSellers;
