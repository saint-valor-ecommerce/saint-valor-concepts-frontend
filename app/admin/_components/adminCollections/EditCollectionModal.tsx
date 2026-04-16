"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Collection } from "@/types/product";

interface EditCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, image?: File) => void;
  collection: Collection | null;
  isSaving: boolean;
}

const EditCollectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  collection,
  isSaving,
}: EditCollectionModalProps) => {
  const [name, setName] = useState(collection?.name ?? "");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    collection?.image ?? null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) firstFocusRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-collection-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div className="bg-white rounded-2xl w-full max-w-sm mx-4 px-8 py-10">
        <h2
          id="edit-collection-modal-title"
          className="text-xl font-bold text-charcoal mb-6"
        >
          Edit Collection
        </h2>

        <div className="mb-5">
          <label className="block text-sm text-secondary mb-2">
            Collection Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-3 text-sm text-charcoal focus:outline-none"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm text-secondary mb-2">
            Photo Upload
          </label>
          {preview ? (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Collection preview"
                fill
                className="object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black/30 text-white text-xs font-medium"
              >
                Change Image
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full cursor-pointer border border-dashed border-border rounded-lg py-8 text-xs text-secondary hover:border-gold transition-colors"
            >
              Upload file
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <button
          ref={firstFocusRef}
          onClick={() => onConfirm(name, newImage ?? undefined)}
          disabled={isSaving || !name.trim()}
          className="w-full cursor-pointer bg-gold hover:bg-gold/90 disabled:opacity-60 text-white font-medium py-3 rounded-full transition-colors mb-3"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={onClose}
          disabled={isSaving}
          className="w-full cursor-pointer text-gold font-medium py-3 rounded-full border border-gold hover:bg-gold/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCollectionModal;
