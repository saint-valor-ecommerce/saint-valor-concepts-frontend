"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { ProductCollection, ProductCategory } from "@/types/product";
import { SidebarFilters } from "@/types/filter";
import FilterContent from "./filters/FilterContent";

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

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-48 shrink-0">
        <FilterContent
          filters={filters}
          collections={collections}
          categories={categories}
          onChange={onChange}
        />
      </aside>

      {/* Mobile bottom sheet */}
      <div className="md:hidden">
        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
        />
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
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
    </>
  );
};

export default ShopSidebar;
