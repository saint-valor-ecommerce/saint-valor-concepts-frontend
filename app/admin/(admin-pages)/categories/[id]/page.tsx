"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getAllProducts } from "@/lib/api/admin/adminProducts";
import { Product } from "@/types/product";

const CategoryViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryName = searchParams.get("name") ?? "Category";

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const all = await getAllProducts();
        setProducts(all.filter((p) => p.productCategory._id === id));
      } catch {
        toast.error("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-square bg-charcoal/5 animate-pulse" />
              <div className="h-3 w-2/3 bg-charcoal/5 animate-pulse" />
              <div className="h-3 w-1/2 bg-charcoal/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="text-secondary hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-semibold text-charcoal">{categoryName}</h1>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
            <ShoppingCart size={28} className="text-gold" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-charcoal">
              No products in this category
            </p>
            <p className="text-xs text-secondary">
              Products assigned to this category will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                router.push(
                  `/admin/products/${product._id}/edit?data=${encodeURIComponent(JSON.stringify(product))}`,
                )
              }
              className="flex flex-col gap-2 cursor-pointer group"
            >
              <div className="relative aspect-square overflow-hidden bg-ivory">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-secondary uppercase tracking-wide">
                  {product.productCategory.name}
                </p>
                <p className="text-sm font-medium text-charcoal truncate">
                  {product.productName}
                </p>
                <p className="text-sm text-charcoal">
                  ₦{product.productPrice.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryViewPage;
