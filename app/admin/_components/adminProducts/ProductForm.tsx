"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/admin/adminProducts";
import { getAllCategories } from "@/lib/api/admin/adminCategories";
import { getAllCollections } from "@/lib/api/admin/adminCollections";
import { Category, Collection } from "@/types/product";
import ProductSizeManager from "./ProductSizeManager";
import PhotoUpload from "./PhotoUpload";
import ProductPreview from "./ProductPreview";
import { ProductSize } from "@/types/product";
import {
  KARAT_OPTIONS,
  WEIGHT_OPTIONS,
  MATERIAL_OPTIONS,
  JEWELRY_TYPE_OPTIONS,
} from "@/constants/productOptions";

type FormState = {
  productName: string;
  productPrice: string;
  productCategory: string;
  productCollection: string;
  productDescription: string;
  productKarat: string;
  productWeight: string;
  productMaterial: string;
  productJewelryType: string;
  productSizes: ProductSize[];
  mainImage: File | null;
  subImages: File[];
  isNewArrival: boolean;
};

const ProductForm = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    productName: "",
    productPrice: "",
    productCategory: "",
    productCollection: "",
    productDescription: "",
    productKarat: "",
    productWeight: "",
    productMaterial: "",
    productJewelryType: "",
    productSizes: [{ size: "", quantity: 1 }],
    mainImage: null,
    subImages: [],
    isNewArrival: false,
  });

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [cats, cols] = await Promise.all([
          getAllCategories(),
          getAllCollections(),
        ]);
        setCategories(cats);
        setCollections(cols);
      } catch {
        toast.error("Failed to load categories and collections.");
      } finally {
        setIsLoadingDropdowns(false);
      }
    };
    fetchDropdowns();
  }, []);

  const update = (
    field: keyof FormState,
    value: FormState[keyof FormState],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const {
      productName,
      productPrice,
      productCategory,
      productCollection,
      productDescription,
      productKarat,
      productWeight,
      productMaterial,
      productJewelryType,
      productSizes,
      mainImage,
    } = form;

    if (
      !productName ||
      !productPrice ||
      !productCategory ||
      !productCollection ||
      !productDescription ||
      !productKarat ||
      !productWeight ||
      !productMaterial ||
      !productJewelryType
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (productSizes.some((s) => !s.size)) {
      toast.error("Please select a size for all size entries.");
      return false;
    }
    if (productSizes.some((s) => s.quantity < 1)) {
      toast.error("Quantity must be at least 1 for all size entries.");
      return false;
    }
    if (!mainImage) {
      toast.error("Please upload a cover image.");
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (validate()) setShowPreview(true);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("productPrice", form.productPrice);
      formData.append("productCategory", form.productCategory);
      formData.append("productCollection", form.productCollection);
      formData.append("productDescription", form.productDescription);
      formData.append("productKarat", form.productKarat);
      formData.append("productWeight", form.productWeight);
      formData.append("productMaterial", form.productMaterial);
      formData.append("productJewelryType", form.productJewelryType);
      formData.append("productSizes", JSON.stringify(form.productSizes));
      formData.append("isNewArrival", String(form.isNewArrival));

      // First file = main image, rest = sub-images, all under "images"
      if (form.mainImage) formData.append("images", form.mainImage);
      form.subImages.forEach((file) => formData.append("images", file));

      await createProduct(formData);
      toast.success("Product created successfully!");
      router.push("/admin/products");
    } catch {
      toast.error("Missing required fields or invalid Product Sizes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find(
    (c) => c._id === form.productCategory,
  );
  const selectedCollection = collections.find(
    (c) => c._id === form.productCollection,
  );

  if (showPreview) {
    return (
      <ProductPreview
        data={{
          productName: form.productName,
          productPrice: Number(form.productPrice),
          productCategory: selectedCategory?.name ?? "",
          productCollection: selectedCollection?.name ?? "",
          productDescription: form.productDescription,
          productKarat: form.productKarat,
          productWeight: form.productWeight,
          productMaterial: form.productMaterial,
          productSizes: form.productSizes,
          mainImage: form.mainImage,
          subImages: form.subImages,
        }}
        onBack={() => setShowPreview(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    );
  }

  const selectClass =
    "w-full border border-border px-3 py-2 text-xs text-charcoal rounded-md appearance-none focus:outline-none transition-colors cursor-pointer";
  const inputClass =
    "w-full border border-border px-3 py-2 text-xs text-charcoal rounded-md placeholder:text-secondary/60 focus:outline-none transition-colors";
  const labelClass = "text-xs text-charcoal font-semibold";

  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Product Name */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Product Name</label>
          <input
            className={inputClass}
            placeholder="Enter Product Name"
            value={form.productName}
            onChange={(e) => update("productName", e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Price</label>
          <input
            className={inputClass}
            placeholder="Enter Price"
            type="number"
            value={form.productPrice}
            onChange={(e) => update("productPrice", e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Product Category</label>
          <select
            className={selectClass}
            value={form.productCategory}
            onChange={(e) => update("productCategory", e.target.value)}
            disabled={isLoadingDropdowns}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Collection */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Product Collection</label>
          <select
            className={selectClass}
            value={form.productCollection}
            onChange={(e) => update("productCollection", e.target.value)}
            disabled={isLoadingDropdowns}
          >
            <option value="">Select Collection</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
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

        {/* Weight */}
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Weight</label>
          <select
            className={selectClass}
            value={form.productWeight}
            onChange={(e) => update("productWeight", e.target.value)}
          >
            <option value="">Select</option>
            {WEIGHT_OPTIONS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
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
          <label className={labelClass}>Jewelry type</label>
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
          placeholder="Enter product description"
          value={form.productDescription}
          onChange={(e) => update("productDescription", e.target.value)}
        />
      </div>

      {/* New Arrival */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isNewArrival"
          checked={form.isNewArrival}
          onChange={(e) => update("isNewArrival", e.target.checked)}
          className="w-4 h-4 accent-gold cursor-pointer"
        />
        <label
          htmlFor="isNewArrival"
          className={`${labelClass} cursor-pointer`}
        >
          Mark as New Arrival
        </label>
      </div>

      {/* Sizes */}
      <ProductSizeManager
        sizes={form.productSizes}
        onChange={(sizes) => update("productSizes", sizes)}
      />

      {/* Photos */}
      <PhotoUpload
        mainImage={form.mainImage}
        subImages={form.subImages}
        onMainImageChange={(file) => update("mainImage", file)}
        onSubImagesChange={(files) => update("subImages", files)}
      />

      {/* Preview Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handlePreview}
          className="text-xs bg-gold text-white px-6 py-2.5 hover:bg-gold/90 transition-colors"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
