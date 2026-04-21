import ProductCard from "../ui/ProductCard";
import { Product } from "@/types/product";

interface ShopGridProps {
  products: Product[];
  isLoading: boolean;
}

const ShopGrid = ({ products, isLoading }: ShopGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-3/4 max-h-56 w-full bg-gray-100 animate-pulse rounded" />
            <div className="h-3 w-20 bg-gray-100 animate-pulse rounded" />
            <div className="h-3 w-32 bg-gray-100 animate-pulse rounded" />
            <div className="h-3 w-16 bg-gray-100 animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
        <p className="text-sm font-medium text-charcoal">No products found</p>
        <p className="text-xs text-secondary">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ShopGrid;
