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
  if (sizes.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-secondary uppercase tracking-wider">
        Select Size
      </p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((s) => {
          const isOutOfStock = s.quantity === 0;
          const isSelected = selectedSize === s.size;

          return (
            <div key={s.size} className="flex flex-col items-center gap-1">
              <button
                onClick={() => onSelect(s.size)}
                disabled={isOutOfStock}
                className={`px-4 py-2 text-sm border rounded-sm transition-colors duration-150
                  ${
                    isOutOfStock
                      ? "border-border text-secondary opacity-40 cursor-not-allowed line-through"
                      : isSelected
                        ? "bg-charcoal text-ivory border-charcoal"
                        : "bg-transparent text-charcoal border-border hover:border-charcoal"
                  }
                `}
              >
                {s.size}
              </button>
              {isOutOfStock && (
                <span className="text-[10px] text-red-500">Sold out</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
