"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search, ShoppingCart, ImageOff } from "lucide-react";
import { getInventory } from "@/lib/api/admin/adminProducts";
import { InventoryItem } from "@/types/product";
import Image from "next/image";
import { Pagination } from "@/types/pagination";
import PaginationControls from "../adminUI/PaginationControls";

const InventoryTable = () => {
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  // Debounce search input for background fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = search.trim();
      if (trimmed.length === 1) return;
      setDebouncedSearch(trimmed);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async (showLoading = true) => {
      try {
        if (showLoading) setIsLoading(true);
        const { inventory, pagination } = await getInventory(
          page,
          debouncedSearch,
          controller.signal,
        );
        setProducts(inventory);
        setPagination(pagination);
      } catch (error: any) {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") return;
        toast.error("Failed to load inventory.");
      } finally {
        if (showLoading) setIsLoading(false);
      }
    };
    
    // Only show the skeleton for page changes or initial load
    // For search, fetch silently in the background
    fetchProducts(page !== 1 || !products.length);
    return () => controller.abort();
  }, [page, debouncedSearch]);

  // No client-side filtering needed as we use backend search
  const filtered = products;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-square bg-charcoal/5 animate-pulse" />
            <div className="h-3 w-2/3 bg-charcoal/5 animate-pulse" />
            <div className="h-3 w-1/2 bg-charcoal/5 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
          />
          <input
            className="w-full border-b border-border pl-8 pr-3 py-2 text-xs text-charcoal placeholder:text-secondary/60 focus:outline-none focus:border-charcoal transition-colors bg-transparent"
            placeholder="Search inventory by product name..."
            value={search}
            maxLength={100}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="text-[10px] text-secondary uppercase tracking-widest font-medium">
            Sorted by Lowest Stock
          </p>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
            <ShoppingCart size={28} className="text-gold" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-charcoal">
              No inventory records found
            </p>
            <p className="text-xs text-secondary">
              Products will appear here once added in the Products tab
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {filtered.map((product) => (
            <div key={product._id} className="flex flex-col gap-2 group">
              {/* Image with Fallback */}
              <div className="relative aspect-square overflow-hidden bg-ivory">
                {product.mainImage ? (
                  <Image
                    src={product.mainImage}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-secondary/30">
                    <ImageOff size={24} />
                    <span className="text-[10px] uppercase tracking-tighter">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1">
                <p className="text-xs text-secondary uppercase tracking-wide">
                  {product.productJewelryType}
                </p>
                <p className="text-sm font-medium text-charcoal truncate">
                  {product.productName}
                </p>

                <div className="flex items-center justify-between mt-1">
                  {/* Stock Status with Breakdown Popover */}
                  <div className="relative group/stock w-full">
                    <div
                      className={`flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-sm border cursor-help transition-colors ${
                        product.stockStatus === "out"
                          ? "bg-red-50 border-red-100 text-red-600"
                          : product.stockStatus === "low"
                            ? "bg-amber-50 border-amber-100 text-amber-600"
                            : "bg-emerald-50 border-emerald-100 text-emerald-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            product.stockStatus === "out"
                              ? "bg-red-500"
                              : product.stockStatus === "low"
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                          }`}
                        />
                        <span className="text-[11px] font-bold uppercase tracking-tight">
                          {product.stockStatus === "out"
                            ? "Out of Stock"
                            : product.stockStatus === "low"
                              ? "Low Stock"
                              : "In Stock"}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold">
                        {product.totalStock} units
                      </span>
                    </div>

                    {/* Breakdown Tooltip */}
                    <div className="absolute bottom-full left-0 right-0 mb-2 hidden group-hover/stock:block z-20 animate-in fade-in slide-in-from-bottom-1">
                      <div className="bg-charcoal text-white text-[10px] p-3 rounded shadow-xl">
                        <p className="font-bold border-b border-white/10 pb-1.5 mb-2 uppercase tracking-widest text-[9px]">
                          Stock Breakdown
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {product.productSizes.map((s, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between gap-6"
                            >
                              <span className="text-white/70">{s.size}</span>
                              <span className="font-bold">{s.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-charcoal" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
};

export default InventoryTable;
