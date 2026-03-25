"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import { Product } from "@/types/product";
import { getProductById } from "@/lib/api/products";
import { useFavouritesStore } from "@/store/favouritesStore";
import ProductImageGallery from "@/components/shop/productsId/ProductImageGallery";
import ProductInfo from "@/components/shop/productsId/ProductInfo";
import ProductSizeSelector from "@/components/shop/productsId/ProductSizeSelector";
import ProductActions from "@/components/shop/productsId/ProductActions";
import ProductMeta from "@/components/shop/productsId/ProductMeta";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { favouriteIds, toggleFavourite } = useFavouritesStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        toast.error("Could not load product details.");
        setError("Could not load product details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 md:px-6 py-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:flex-1 aspect-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="flex-1 flex flex-col gap-4 pt-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-20 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-sm text-burgundy">{error || "Product not found."}</p>
      </div>
    );
  }

  const allImages = [product.mainImage, ...(product.subImages ?? [])].filter(
    Boolean,
  ) as string[];
  const isFavourite = favouriteIds.has(product._id);

  return (
    <div className="min-h-screen bg-ivory px-4 md:px-16 py-10">
      <Link
        href="/shop"
        className="inline-flex items-center gap-1 text-xs text-secondary hover:text-charcoal transition-colors mb-8"
      >
        <ChevronLeft size={14} />
        Back to shop
      </Link>

      <div className="flex flex-col md:flex-row gap-8 md:items-start">
        {/* Image gallery */}
        <div className="w-full md:flex-1 md:max-w-xl">
          <ProductImageGallery
            images={allImages}
            productName={product.productName ?? ""}
          />
        </div>

        {/* Product details */}
        <div className="w-full md:flex-1 flex flex-col gap-6 md:pt-2">
          <ProductInfo
            categoryName={product.productCategory?.name}
            productName={product.productName ?? ""}
            productPrice={product.productPrice ?? 0}
          />

          <ProductSizeSelector
            sizes={product.productSizes ?? []}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          <ProductActions
            productId={product._id}
            productName={product.productName ?? ""}
            productPrice={product.productPrice ?? 0}
            mainImage={product.mainImage ?? ""}
            selectedSize={selectedSize}
            hasSizes={(product.productSizes ?? []).length > 0}
            isFavourite={isFavourite}
            onToggleFavourite={() => toggleFavourite(product._id)}
          />

          <ProductMeta
            material={product.productMaterial}
            karat={product.productKarat}
            weight={product.productWeight}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
