"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import FilterContent from "./filters/FilterContent";
import { SidebarFilters } from "@/types/filter";
import { ProductCollection, ProductCategory } from "@/types/product";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SidebarFilters;
  collections: ProductCollection[];
  categories: ProductCategory[];
  onChange: (filters: SidebarFilters) => void;
}

const MobileFilterSheet = ({
  isOpen,
  onClose,
  filters,
  collections,
  categories,
  onChange,
}: MobileFilterSheetProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
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
        <div className="relative flex items-center justify-between px-5 pt-5 pb-3 border-b border-border shrink-0">
          <div className="w-8 h-1 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
          <h2 className="text-sm font-semibold text-charcoal">Filter</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-charcoal transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 pb-8">
          <FilterContent
            filters={filters}
            collections={collections}
            categories={categories}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSheet;
