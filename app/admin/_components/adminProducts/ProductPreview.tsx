"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductSize } from "@/types/product";
import Image from "next/image";

type PreviewData = {
  productName: string;
  productPrice: number;
  productCategory: string;
  productCollection: string;
  productDescription: string;
  productKarat: string;
  productWeight: string;
  productMaterial: string;
  productSizes: ProductSize[];
  productGender: string;
  mainImage: File | null;
  subImages: File[];
};

type Props = {
  data: PreviewData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const blobLoader = ({ src }: { src: string }) => src;

const ProductPreview = ({ data, onBack, onSubmit, isSubmitting }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainIndex, setMainIndex] = useState(0);

  // Generate blob URLs once, not on every render
  const allImages = useMemo(() => {
    return [
      ...(data.mainImage ? [URL.createObjectURL(data.mainImage)] : []),
      ...data.subImages.map((f) => URL.createObjectURL(f)),
    ];
  }, [data.mainImage, data.subImages]);

  const selectedSizeData = data.productSizes.find(
    (s) => s.size === selectedSize,
  );
  const totalStock = selectedSizeData
    ? selectedSizeData.quantity
    : data.productSizes.reduce((sum, s) => sum + s.quantity, 0);

  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Image Section */}
        <div className="flex flex-col gap-3 w-full sm:w-1/2">
          <div className="relative aspect-square bg-ivory overflow-hidden">
            {allImages[mainIndex] && (
              <Image
                loader={blobLoader}
                src={allImages[mainIndex]}
                alt="Product"
                className="object-cover"
                fill
                unoptimized
              />
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMainIndex(Math.max(0, mainIndex - 1))}
                className="w-6 h-6 bg-gold text-white flex items-center justify-center"
              >
                <ChevronLeft size={12} />
              </button>
              <div className="flex gap-2 overflow-hidden">
                {allImages.slice(0, 5).map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMainIndex(i)}
                    className={`relative w-14 h-14 overflow-hidden border-2 transition-colors ${
                      mainIndex === i ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <Image
                      loader={blobLoader}
                      src={src}
                      alt=""
                      className="object-cover"
                      fill
                      unoptimized
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setMainIndex(Math.min(allImages.length - 1, mainIndex + 1))
                }
                className="w-6 h-6 bg-gold text-white flex items-center justify-center"
              >
                <ChevronRight size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <p className="text-xs uppercase tracking-widest text-secondary">
            {data.productCategory}
          </p>
          <h1 className="text-2xl font-semibold text-charcoal">
            {data.productName}
          </h1>
          <p className="text-sm text-secondary">{data.productCollection}</p>
          <p className="text-xl font-medium text-charcoal">
            ₦{data.productPrice.toLocaleString()}
          </p>
          <p className="text-sm text-secondary">{data.productDescription}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-charcoal">Select size</p>
              <p className="text-xs text-secondary underline cursor-pointer">
                Size guide
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.productSizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(s.size);
                    setQuantity(1);
                  }}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    selectedSize === s.size
                      ? "border-charcoal bg-charcoal text-white"
                      : "border-border text-charcoal hover:border-charcoal"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-charcoal">Details</p>
            <p className="text-xs text-secondary">
              Carat · {data.productKarat}
            </p>
            <p className="text-xs text-secondary">
              Weight · {data.productWeight}
            </p>
            <p className="text-xs text-secondary">
              Material · {data.productMaterial}
            </p>

            <p className="text-xs text-secondary">
              Gender · {data.productGender}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-charcoal">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-ivory transition-colors"
                >
                  −
                </button>
                <span className="px-4 text-xs text-charcoal">{quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(Math.min(totalStock, quantity + 1))
                  }
                  className="px-3 py-2 text-charcoal hover:bg-ivory transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-secondary">{totalStock} items left</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs border border-border px-6 py-2.5 text-charcoal hover:bg-ivory transition-colors"
        >
          Back to form
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="text-xs bg-gold text-white px-6 py-2.5 hover:bg-gold/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductPreview;
