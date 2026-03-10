"use client";
import { useEffect, useState, useRef } from "react";
import CategoriesSearch from "./CategoriesSearch";
import AddNewCategory from "./AddNewCategory";
import CategoriesEmptyState from "./CategoriesEmptyState";
import { Category } from "@/types/product";
import { getAllCategories } from "@/lib/api/admin/adminCategories";
import { AlertCircle, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

const CategoriesTable = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data: Category[] = await getAllCategories();
        setCategories(data);
      } catch {
        setError("Failed to load categories. Please try again");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // --- Loading State ---
  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold py-6 text-charcoal">Categories</h3>
        <div className="border-b border-border" />
        <div className="flex justify-between items-center py-6">
          <CategoriesSearch value={search} onChange={setSearch} />
          <AddNewCategory />
        </div>
        <div className="space-y-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-border"
            >
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div>
        <h3 className="text-xl font-semibold py-6 text-charcoal">Categories</h3>
        <div className="border-b border-border" />
        <div className="flex items-center gap-3 mt-10 text-burgundy">
          <AlertCircle size={18} />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold py-6 text-charcoal">Categories</h3>
      <div className="border-b border-border" />

      <div className="flex justify-between items-center">
        <CategoriesSearch value={search} onChange={setSearch} />
        <AddNewCategory />
      </div>

      {filtered.length === 0 ? (
        <CategoriesEmptyState
          message={
            search
              ? `No results for "${search}"`
              : "No categories yet. Add one to get started."
          }
        />
      ) : (
        <div className="mt-2">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_40px] px-2 py-2 border-b border-border">
            <span className="text-xs text-secondary">Category name</span>
            <span className="text-xs text-secondary">Date created</span>
            <span />
          </div>

          {/* Table Rows */}
          {filtered.map((cat) => (
            <div
              key={cat._id}
              className="grid grid-cols-[1fr_1fr_40px] items-center px-2 py-4 border-b border-border hover:bg-ivory transition-colors duration-150"
            >
              <span className="text-sm text-charcoal">{cat.name}</span>
              <span className="text-sm text-charcoal">
                {formatDate(cat.createdAt)}
              </span>

              {/* Actions Menu */}
              <div
                className="relative"
                ref={openMenuId === cat._id ? menuRef : undefined}
              >
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === cat._id ? null : cat._id)
                  }
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical size={16} className="text-secondary" />
                </button>

                {openMenuId === cat._id && (
                  <div className="absolute right-0 top-8 z-10 bg-white border border-border rounded-lg shadow-md w-36 py-1">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors">
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-ivory transition-colors">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
