"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CloudUpload } from "lucide-react";
import { toast } from "react-toastify";
import { addNewCollection } from "@/lib/api/admin/adminCollections";

const AddNewCollectionPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      setIsSubmitting(true);
      await addNewCollection({ name, image: image ?? undefined });
      router.push("/admin/products");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-2xl">
      {/* Back + breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-xs text-secondary hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <span className="text-secondary text-xs">|</span>
        <Link
          href="/admin/products"
          className="text-xs text-secondary hover:text-charcoal transition-colors"
        >
          Product Collections
        </Link>
        <span className="text-secondary text-xs">|</span>
        <span className="text-xs text-charcoal">Add New Collection</span>
      </div>

      <h2 className="text-2xl font-semibold text-charcoal mb-8">
        New Collection
      </h2>

      {/* Collection Name */}
      <div className="mb-8">
        <label className="block text-sm text-secondary mb-2">
          Collection Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Collection Name"
          className="w-full border border-border rounded-lg px-4 py-3 text-sm text-charcoal placeholder:text-secondary focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-10">
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
              className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-sm font-medium"
            >
              Change Image
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-border rounded-lg py-14 flex flex-col items-center gap-3 cursor-pointer hover:border-gold transition-colors bg-ivory"
          >
            <CloudUpload size={28} className="text-secondary" />
            <p className="text-xs text-secondary">
              Upload cover image for collection
            </p>
            <p className="text-xs text-secondary">(JPEG, PNG)</p>
            <button
              type="button"
              className="mt-1 px-4 py-2 border border-border rounded text-xs text-charcoal hover:border-charcoal transition-colors"
            >
              Upload file
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {error && <p className="text-xs text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !name.trim()}
        className="bg-gold hover:bg-gold/90 disabled:opacity-60 text-white font-medium px-8 py-3 rounded-full transition-colors"
      >
        {isSubmitting ? "Creating..." : "Create Collection"}
      </button>
    </div>
  );
};

export default AddNewCollectionPage;
