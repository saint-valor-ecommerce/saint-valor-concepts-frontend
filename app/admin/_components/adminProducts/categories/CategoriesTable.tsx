"use client";
import { useEffect, useState, useRef } from "react";
import CategoriesSearch from "./CategoriesSearch";
import CategoriesEmptyState from "./CategoriesEmptyState";
import DeleteCategoryModal from "./DeleteCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { Category } from "@/types/product";
import {
  deleteCategory,
  getAllCategories,
  updateCategory,
  addNewCategory,
} from "@/lib/api/admin/adminCategories";
import { AlertCircle, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "react-toastify";
import AddCategoryModal from "./AddCategoryModal";

const CategoriesTable = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      setIsDeleting(true);
      await deleteCategory({ _id: categoryToDelete._id });
      setCategories((prev) =>
        prev.filter((cat) => cat._id !== categoryToDelete._id),
      );
      setCategoryToDelete(null);
    } catch {
      toast.error("Failed to update categories. Please try again.");
      setDeleteError("Failed to update categories. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async (name: string) => {
    if (!categoryToEdit) return;
    try {
      setIsSaving(true);
      const updated = await updateCategory({ _id: categoryToEdit._id, name });
      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryToEdit._id ? updated : cat)),
      );
    } catch {
      toast.error("Failed to update categories. Please try again.");
      setError("Failed to update categories. Please try again.");
    } finally {
      setIsSaving(false);
      setCategoryToEdit(null);
    }
  };

  const handleAdd = async (name: string) => {
    try {
      setIsAdding(true);
      const newCat = await addNewCategory({ name });
      setCategories((prev) => [newCat, ...prev]);
      setIsAddModalOpen(false);
    } catch {
      toast.error("Failed to update categories. Please try again.");
      setError("Failed to update categories. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data: Category[] = await getAllCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to update categories. Please try again.");
        setError("Failed to update categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold py-6 text-charcoal">Categories</h3>
        <div className="border-b border-border" />
        <div className="flex justify-between items-center py-6">
          <CategoriesSearch value={search} onChange={setSearch} />
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

      <div className="flex justify-between items-center py-6">
        <CategoriesSearch value={search} onChange={setSearch} />
        <button
          className="bg-gold cursor-pointer hover:bg-gold/90 text-white text-sm font-medium px-8 py-3 rounded-full transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Category
        </button>
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
                  className="p-1 rounded cursor-pointer"
                >
                  <MoreVertical size={16} className="text-secondary" />
                </button>

                {openMenuId === cat._id && (
                  <div className="absolute right-0 top-8 z-10 bg-white border border-border rounded-lg shadow-md w-36 py-1">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors cursor-pointer">
                      <Eye size={14} />
                      View
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToEdit(cat);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors cursor-pointer"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(cat);
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-ivory transition-colors cursor-pointer"
                    >
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

      {/* Modals */}

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAdd}
        isSaving={isAdding}
      />

      <DeleteCategoryModal
        isOpen={!!categoryToDelete}
        onClose={() => {
          setCategoryToDelete(null);
          setDeleteError("");
        }}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        deleteError={deleteError}
      />
      <EditCategoryModal
        key={categoryToEdit?._id}
        isOpen={!!categoryToEdit}
        onClose={() => setCategoryToEdit(null)}
        onConfirm={handleEdit}
        category={categoryToEdit}
        isSaving={isSaving}
      />
    </div>
  );
};

export default CategoriesTable;
