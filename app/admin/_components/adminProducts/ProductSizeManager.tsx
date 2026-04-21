"use client";

import { toast } from "react-toastify";
import { ProductSize } from "@/types/product";
import { X } from "lucide-react";

const SIZE_OPTIONS = ["Small", "Medium", "Large"];

type Props = {
  sizes: ProductSize[];
  onChange: (sizes: ProductSize[]) => void;
};

const ProductSizeManager = ({ sizes, onChange }: Props) => {
  const addSize = () => {
    onChange([...sizes, { size: "", quantity: 1 }]);
  };

  const removeSize = (index: number) => {
    onChange(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (
    index: number,
    field: keyof ProductSize,
    value: string | number,
  ) => {
    if (field === "size") {
      const isDuplicate = sizes.some((s, i) => i !== index && s.size === value);
      if (value && isDuplicate) {
        toast.error("This size has already been added.");
        return;
      }
    }
    onChange(sizes.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="border border-border p-4 flex flex-col gap-4">
      {sizes.map((s, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-secondary">
              Select Available size
            </label>
            <div className="relative">
              <select
                value={s.size}
                onChange={(e) => updateSize(index, "size", e.target.value)}
                className="w-full border border-border px-3 py-2 text-xs text-charcoal bg-white appearance-none focus:outline-none"
              >
                <option value="">Select</option>
                {SIZE_OPTIONS.filter(
                  (opt) =>
                    opt === s.size || !sizes.some((s2) => s2.size === opt),
                ).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-secondary">Quantity available</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  updateSize(
                    index,
                    "quantity",
                    Math.max(1, Number(s.quantity) - 1),
                  )
                }
                className="w-7 h-7 border border-border text-charcoal flex items-center justify-center text-sm hover:bg-ivory transition-colors"
              >
                −
              </button>
              <span className="text-xs text-charcoal w-6 text-center">
                {s.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateSize(index, "quantity", Number(s.quantity) + 1)
                }
                className="w-7 h-7 border border-border text-charcoal flex items-center justify-center text-sm hover:bg-ivory transition-colors"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="ml-auto text-burgundy cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSize}
        disabled={sizes.length >= SIZE_OPTIONS.length}
        className={`text-xs text-charcoal flex items-center gap-1 transition-colors w-fit ${
          sizes.length >= SIZE_OPTIONS.length
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        <span className="text-base leading-none">+</span> Add Size
      </button>
    </div>
  );
};

export default ProductSizeManager;
