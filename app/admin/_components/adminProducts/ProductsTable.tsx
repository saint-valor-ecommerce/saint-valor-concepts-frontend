"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Search,
  ShoppingCart,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { getAllProducts, deleteProduct } from "@/lib/api/admin/adminProducts";
import { Product } from "@/types/product";
import Image from "next/image";
import DeleteProductModal from "./DeleteProductModal";
import { Pagination } from "@/types/pagination";
import PaginationControls from "../adminUI/PaginationControls";

const ProductsTable = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products, pagination } = await getAllProducts(page);
        setProducts(products);
        setPagination(pagination);
      } catch {
        toast.error("Failed to load products.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setDeletingId(productId);
    setDeleteError("");
    setDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      await deleteProduct(deletingId);
      setProducts((prev) => prev.filter((p) => p._id !== deletingId));
      toast.success("Product deleted successfully.");
      setDeleteModalOpen(false);
    } catch {
      setDeleteError("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    sessionStorage.setItem(
      `edit-product-${product._id}`,
      JSON.stringify({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productJewelryType: product.productJewelryType,
        productMaterial: product.productMaterial,
        productKarat: product.productKarat,
      }),
    );
    router.push(`/admin/products/${product._id}/edit`);
    setOpenMenuId(null);
  };

  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase()),
  );

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
        <div className="relative w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
          />
          <input
            className="w-full border-b border-border pl-8 pr-3 py-2 text-xs text-charcoal placeholder:text-secondary/60 focus:outline-none focus:border-charcoal transition-colors bg-transparent"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push("/admin/products/new")}
          className="bg-gold cursor-pointer hover:bg-gold/90 text-white text-sm font-medium px-8 py-3 rounded-full transition-colors"
        >
          Add New Product
        </button>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center">
            <ShoppingCart size={28} className="text-gold" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-charcoal">
              You have no products yet
            </p>
            <p className="text-xs text-secondary">
              Add a new product to view your products
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 cursor-pointer group"
            >
              {/* Image + 3-dot menu */}
              <div className="relative aspect-square overflow-hidden bg-ivory">
                <Image
                  src={product.mainImage}
                  alt={product.productName}
                  fill
                  className="object-cover"
                />

                {/* 3-dot button */}
                <div
                  className="absolute top-2 right-2"
                  ref={openMenuId === product._id ? menuRef : null}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(
                        openMenuId === product._id ? null : product._id,
                      );
                    }}
                    className="w-7 h-7 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  >
                    <MoreVertical size={13} className="text-charcoal" />
                  </button>

                  {/* Dropdown */}
                  {openMenuId === product._id && (
                    <div className="absolute right-0 top-8 w-32 bg-white shadow-md border border-border z-10 py-1">
                      <button
                        onClick={(e) => handleEdit(e, product)}
                        className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors"
                      >
                        <Pencil size={12} />
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, product._id)}
                        className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-ivory transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-secondary uppercase tracking-wide">
                  {product.productCategory.name}
                </p>
                <p className="text-sm font-medium text-charcoal truncate">
                  {product.productName}
                </p>
                <p className="text-sm text-charcoal">
                  ₦{product.productPrice.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        error={deleteError}
      />

      {pagination && (
        <PaginationControls pagination={pagination} onPageChange={setPage} />
      )}
    </div>
  );
};

export default ProductsTable;
