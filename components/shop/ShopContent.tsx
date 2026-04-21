"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import {
  getAllProducts,
  getCollections,
  getCategories,
} from "@/lib/api/products";
import { Product, ProductCollection, ProductCategory } from "@/types/product";
import { SidebarFilters } from "@/types/filter";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopToolbar from "@/components/shop/ShopToolbar";
import ShopGrid from "@/components/shop/ShopGrid";
import ShopPagination from "@/components/shop/ShopPagination";
import DesktopSidebar from "@/components/shop/DesktopSideBar";
import MobileFilterSheet from "@/components/shop/MobileFilterSheet";

const ITEMS_PER_PAGE = 9;

const EMPTY_FILTERS: SidebarFilters = {
  collections: [],
  weights: [],
  sizes: [],
  minPrice: "",
  maxPrice: "",
  materials: [],
  karats: [],
  jewelryTypes: [],
  categories: [],
  gender: "",
};

export default function ShopContent() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get("collection");
  const genderParam = searchParams.get("gender");

  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<ProductCollection[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SidebarFilters>({
    ...EMPTY_FILTERS,
    collections: collectionParam ? [collectionParam] : [],
    gender: genderParam || "",
  });

  // derive page title from selected collection
  const activeCollection = collections.find((c) =>
    filters.collections.includes(c.slug),
  );
  const pageTitle = activeCollection?.name ?? "All Products";

  // fetch collections and categories once
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [cols, cats] = await Promise.all([
          getCollections(),
          getCategories(),
        ]);
        setCollections(cols);
        setCategories(cats);
      } catch {
        toast.error("Something went wrong. Please try again.");
      }
    };
    fetchMeta();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // fetch products when filters/page/sort/search change
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getAllProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: search || undefined,
        collection: filters.collections[0] || undefined,
        category: filters.categories[0] || undefined,
        material: filters.materials[0] || undefined,
        karat: filters.karats[0] || undefined,
        jewelryType: filters.jewelryTypes[0] || undefined,
        size: filters.sizes[0] || undefined,
        weight: filters.weights[0] || undefined,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        gender: filters.gender || undefined,
      });
      setProducts(result.products);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);
    } catch {
      toast.error("Unable to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // reset to page 1 when filters change
  const handleFiltersChange = (updated: SidebarFilters) => {
    setFilters(updated);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ShopHeader title={pageTitle} totalItems={totalItems} />

        <ShopToolbar
          search={searchInput}
          onSearchChange={setSearchInput}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((prev) => !prev)}
          onToggleMobileFilters={() => setShowMobileFilters((prev) => !prev)}
        />

        <div className="flex gap-8">
          <DesktopSidebar
            isOpen={showFilters}
            filters={filters}
            collections={collections}
            categories={categories}
            onChange={handleFiltersChange}
          />

          <div className="flex-1 min-w-0">
            <ShopGrid products={products} isLoading={isLoading} />
            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        </div>

        <MobileFilterSheet
          isOpen={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          filters={filters}
          collections={collections}
          categories={categories}
          onChange={handleFiltersChange}
        />
      </div>
    </div>
  );
}
