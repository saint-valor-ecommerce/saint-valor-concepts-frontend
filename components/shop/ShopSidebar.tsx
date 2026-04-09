"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import FilterSection from "./filters/FilterSection";
import CheckboxFilter from "./filters/CheckboxFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import { ProductCollection, ProductCategory } from "@/types/product";

const WEIGHT_OPTIONS = [
  { label: "3-6g", value: "3-6g" },
  { label: "7-10g", value: "7-10g" },
  { label: "11-15g", value: "11-15g" },
];

const SIZE_OPTIONS = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
];

const MATERIAL_OPTIONS = [
  { label: "Gold", value: "Gold" },
  { label: "Silver", value: "Silver" },
  { label: "VVS Diamonds Natural", value: "VVS Diamonds Natural" },
  { label: "VVS Diamonds Lab", value: "VVS Diamonds Lab" },
];

const KARAT_OPTIONS = [
  { label: "14k", value: "14k" },
  { label: "18k", value: "18k" },
  { label: "24k", value: "24k" },
];

const JEWELRY_TYPE_OPTIONS = [
  { label: "Rings", value: "Rings" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Earrings", value: "Earrings" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Anklets", value: "Anklets" },
];

export interface SidebarFilters {
  collections: string[];
  weights: string[];
  sizes: string[];
  minPrice: string;
  maxPrice: string;
  materials: string[];
  karats: string[];
  jewelryTypes: string[];
  categories: string[];
}

interface ShopSidebarProps {
  filters: SidebarFilters;
  collections: ProductCollection[];
  categories: ProductCategory[];
  onChange: (filters: SidebarFilters) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ShopSidebar = ({
  filters,
  collections,
  categories,
  onChange,
  isOpen,
  onClose,
}: ShopSidebarProps) => {
  const toggle = (key: keyof SidebarFilters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  // lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filterContent = (
    <div className="flex flex-col">
      <FilterSection title="Collection">
        <CheckboxFilter
          options={collections.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.collections}
          onChange={(val) => toggle("collections", val)}
        />
      </FilterSection>
      <FilterSection title="Weight (grams)">
        <CheckboxFilter
          options={WEIGHT_OPTIONS}
          selected={filters.weights}
          onChange={(val) => toggle("weights", val)}
        />
      </FilterSection>
      <FilterSection title="Size">
        <CheckboxFilter
          options={SIZE_OPTIONS}
          selected={filters.sizes}
          onChange={(val) => toggle("sizes", val)}
        />
      </FilterSection>
      <FilterSection title="Price">
        <PriceRangeFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onMinChange={(val) => onChange({ ...filters, minPrice: val })}
          onMaxChange={(val) => onChange({ ...filters, maxPrice: val })}
        />
      </FilterSection>
      <FilterSection title="Material">
        <CheckboxFilter
          options={MATERIAL_OPTIONS}
          selected={filters.materials}
          onChange={(val) => toggle("materials", val)}
        />
      </FilterSection>
      <FilterSection title="Karat">
        <CheckboxFilter
          options={KARAT_OPTIONS}
          selected={filters.karats}
          onChange={(val) => toggle("karats", val)}
        />
      </FilterSection>
      <FilterSection title="Jewelry Type">
        <CheckboxFilter
          options={JEWELRY_TYPE_OPTIONS}
          selected={filters.jewelryTypes}
          onChange={(val) => toggle("jewelryTypes", val)}
        />
      </FilterSection>
      <FilterSection title="Category">
        <CheckboxFilter
          options={categories.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.categories}
          onChange={(val) => toggle("categories", val)}
        />
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-48 shrink-0">{filterContent}</aside>

      {/* Mobile bottom sheet */}
      <div className="md:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />

        {/* Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Handle + Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border shrink-0">
            <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
            <h2 className="text-sm font-semibold text-charcoal">Filter</h2>
            <button
              onClick={onClose}
              className="text-secondary hover:text-charcoal transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable filter content */}
          <div className="overflow-y-auto px-5 pb-8">{filterContent}</div>
        </div>
      </div>
    </>
  );
};

export default ShopSidebar;
