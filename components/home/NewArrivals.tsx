"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductSlider from "@/components/ui/ProductSlider";
import { getNewArrivals } from "@/lib/api/products";
import { Product } from "@/types/product";

const NewArrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewArrivals()
      .then(setProducts)
      .catch(() => toast.error("Something went wrong. Please try again."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProductSlider
      title="New Arrivals"
      subtitle="The latest additions, thoughtfully crafted to complement evolving style and contemporary luxury."
      products={products}
      isLoading={isLoading}
    />
  );
};

export default NewArrivals;
