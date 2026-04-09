"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreVertical, Eye, Pencil, Trash2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Collection } from "@/types/product";
import {
  getAllCollections,
  deleteCollection,
  updateCollection,
} from "@/lib/api/admin/adminCollections";
import CategoriesSearch from "../adminCategories/CategoriesSearch";
import CollectionsEmptyState from "./CollectionEmptyState";
import DeleteCollectionModal from "./DeleteCollectionModal";
import EditCollectionModal from "./EditCollectionModal";

const CollectionsTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [collectionToEdit, setCollectionToEdit] = useState<Collection | null>(
    null,
  );
  const [collectionToDelete, setCollectionToDelete] =
    useState<Collection | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCollections();
        setCollections(data);
      } catch {
        toast.error("Something went wrong. Please try again.");
        setError("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollections();
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

  const handleDelete = async () => {
    if (!collectionToDelete) return;
    try {
      setIsDeleting(true);
      await deleteCollection({ _id: collectionToDelete._id });
      setCollections((prev) =>
        prev.filter((c) => c._id !== collectionToDelete._id),
      );
      setCollectionToDelete(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setDeleteError("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async (name: string, image?: File) => {
    if (!collectionToEdit) return;
    try {
      setIsSaving(true);
      const updated = await updateCollection({
        _id: collectionToEdit._id,
        name,
        image,
      });
      setCollections((prev) =>
        prev.map((c) => (c._id === collectionToEdit._id ? updated : c)),
      );
      setCollectionToEdit(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = collections.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold py-6 text-charcoal">
          Collections
        </h3>
        <div className="border-b border-border" />
        <div className="flex justify-between items-center py-6">
          <CategoriesSearch value={search} onChange={setSearch} />
          <button className="bg-gold cursor-pointer text-white text-sm px-5 py-2.5 rounded-full opacity-60">
            Add New Collection
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-square bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3 className="text-xl font-semibold py-6 text-charcoal">
          Collections
        </h3>
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
      <h3 className="text-xl font-semibold py-6 text-charcoal">Collections</h3>
      <div className="border-b border-border" />

      <div className="flex justify-between items-center py-6">
        <CategoriesSearch value={search} onChange={setSearch} />
        <button
          onClick={() => router.push("/admin/collections/new")}
          className="bg-gold cursor-pointer hover:bg-gold/90 text-white text-sm font-medium px-8 py-3 rounded-full transition-colors"
        >
          Add New Collection
        </button>
      </div>

      {filtered.length === 0 ? (
        <CollectionsEmptyState
          message={search ? `No results for "${search}"` : "No collections yet"}
          subMessage={
            search ? undefined : "Add a new collection to view your collection"
          }
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((collection) => (
            <div key={collection._id} className="flex flex-col gap-2">
              {/* Card */}
              <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100">
                {collection.image ? (
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gold/10 flex items-center justify-center">
                    <span className="text-xs text-secondary">No image</span>
                  </div>
                )}

                {/* ⋮ menu button */}
                <div
                  className="absolute top-2 right-2"
                  ref={openMenuId === collection._id ? menuRef : undefined}
                >
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === collection._id ? null : collection._id,
                      )
                    }
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm"
                  >
                    <MoreVertical
                      size={14}
                      className="text-secondary cursor-pointer"
                    />
                  </button>

                  {openMenuId === collection._id && (
                    <div className="absolute right-0 top-8 z-10 bg-white border border-border rounded-lg shadow-md w-36 py-1">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/collections/${collection._id}?name=${encodeURIComponent(collection.name)}`,
                          );
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        onClick={() => {
                          setCollectionToEdit(collection);
                          setOpenMenuId(null);
                        }}
                        className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCollectionToDelete(collection);
                          setOpenMenuId(null);
                        }}
                        className="flex cursor-pointer items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-ivory transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <p className="text-sm text-charcoal font-medium">
                {collection.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <DeleteCollectionModal
        isOpen={!!collectionToDelete}
        onClose={() => {
          setCollectionToDelete(null);
          setDeleteError("");
        }}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        error={deleteError}
      />
      <EditCollectionModal
        key={collectionToEdit?._id}
        isOpen={!!collectionToEdit}
        onClose={() => setCollectionToEdit(null)}
        onConfirm={handleEdit}
        collection={collectionToEdit}
        isSaving={isSaving}
      />
    </div>
  );
};

export default CollectionsTable;
