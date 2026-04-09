"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateProduct } from "@/lib/api/admin/adminProducts";
import { Product } from "@/types/product";
import {
  KARAT_OPTIONS,
  MATERIAL_OPTIONS,
  JEWELRY_TYPE_OPTIONS,
} from "@/constants/productOptions";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productJewelryType: "",
    productMaterial: "",
    productKarat: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("data");

    if (!raw) {
      toast.error("Product data not found.");
      router.push("/admin/products");
      return;
    }

    try {
      const product: Product = JSON.parse(decodeURIComponent(raw));
      setForm({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: String(product.productPrice),
        productJewelryType: product.productJewelryType,
        productMaterial: product.productMaterial,
        productKarat: product.productKarat,
      });
    } catch {
      toast.error("Failed to load product.");
      router.push("/admin/products");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const {
      productName,
      productDescription,
      productPrice,
      productJewelryType,
      productMaterial,
      productKarat,
    } = form;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productJewelryType ||
      !productMaterial ||
      !productKarat
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await updateProduct(id, {
        productName,
        productDescription,
        productPrice: Number(productPrice),
        productJewelryType,
        productMaterial,
        productKarat,
      });
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-border px-3 py-2 text-xs text-charcoal rounded-md placeholder:text-secondary/60 focus:outline-none transition-colors";
  const selectClass =
    "w-full border border-border px-3 py-2 text-xs text-charcoal rounded-md appearance-none focus:outline-none transition-colors cursor-pointer";
  const labelClass = "text-xs text-charcoal font-semibold";

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 px-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-charcoal/5 animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6">
      <h1 className="text-xl font-semibold text-charcoal">Edit Product</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Product Name</label>
          <input
            className={inputClass}
            value={form.productName}
            onChange={(e) => update("productName", e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Price</label>
          <input
            className={inputClass}
            type="number"
            value={form.productPrice}
            onChange={(e) => update("productPrice", e.target.value)}
          />
        </div>

        {/* Karat */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Carat</label>
          <select
            className={selectClass}
            value={form.productKarat}
            onChange={(e) => update("productKarat", e.target.value)}
          >
            <option value="">Select</option>
            {KARAT_OPTIONS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Material</label>
          <select
            className={selectClass}
            value={form.productMaterial}
            onChange={(e) => update("productMaterial", e.target.value)}
          >
            <option value="">Select</option>
            {MATERIAL_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Jewelry Type */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Jewelry Type</label>
          <select
            className={selectClass}
            value={form.productJewelryType}
            onChange={(e) => update("productJewelryType", e.target.value)}
          >
            <option value="">Select</option>
            {JEWELRY_TYPE_OPTIONS.map((j) => (
              <option key={j.value} value={j.value}>
                {j.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Product Description</label>
        <textarea
          className={`${inputClass} resize-none h-24`}
          value={form.productDescription}
          onChange={(e) => update("productDescription", e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="text-xs border border-border cursor-pointer px-6 py-2.5 text-charcoal hover:bg-ivory transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="text-xs bg-gold text-white cursor-pointer px-6 py-2.5 hover:bg-gold/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProductPage;
