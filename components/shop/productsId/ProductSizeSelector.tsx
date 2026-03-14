import { ProductSize } from "@/types/product";

interface ProductSizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSelect,
}: ProductSizeSelectorProps) => {
  const availableSizes = sizes.filter((s) => s.quantity > 0);

  if (availableSizes.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-secondary uppercase tracking-wider">
        Select Size
      </p>
      <div className="flex gap-2 flex-wrap">
        {availableSizes.map((s) => (
          <button
            key={s.size}
            onClick={() => onSelect(s.size)}
            className={`px-4 py-2 text-sm border rounded-sm transition-colors duration-150 ${
              selectedSize === s.size
                ? "bg-charcoal text-ivory border-charcoal"
                : "bg-transparent text-charcoal border-border hover:border-charcoal"
            }`}
          >
            {s.size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
