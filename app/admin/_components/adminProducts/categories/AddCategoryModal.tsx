"use client";
import { useState } from "react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  isSaving: boolean;
}

const AddCategoryModal = ({
  isOpen,
  onClose,
  onConfirm,
  isSaving,
}: AddCategoryModalProps) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name.trim()) return;
    onConfirm(name);
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-sm mx-4 px-8 py-10">
        <h2 className="text-xl font-bold text-charcoal mb-6">New Category</h2>

        <div className="mb-8">
          <label className="block text-sm text-secondary mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category Name"
            className="w-full border border-border rounded-lg px-4 py-3 text-sm text-charcoal placeholder:text-secondary focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        <button
          onClick={handleConfirm}
          disabled={isSaving || !name.trim()}
          className="w-full cursor-pointer bg-gold hover:bg-gold/90 disabled:opacity-60 text-white font-medium py-3 rounded-full transition-colors mb-3"
        >
          {isSaving ? "Creating..." : "Create Category"}
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

export default AddCategoryModal;
