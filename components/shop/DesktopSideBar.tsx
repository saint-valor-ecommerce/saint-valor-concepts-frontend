import FilterContent from "./filters/FilterContent";
import { ProductCollection, ProductCategory } from "@/types/product";

export interface SidebarFilters {
  collections: string[];
  weights: string[];
  sizes: string[];
  minPrice: string;
  maxPrice: string;
  materials: string[];
  karats: string[];
  jewelryTypes: string[];
  categories: string[];
}

interface DesktopSidebarProps {
  isOpen: boolean;
  filters: SidebarFilters;
  collections: ProductCollection[];
  categories: ProductCategory[];
  onChange: (filters: SidebarFilters) => void;
}

const DesktopSidebar = ({
  isOpen,
  filters,
  collections,
  categories,
  onChange,
}: DesktopSidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="hidden md:block w-48 shrink-0">
      <FilterContent
        filters={filters}
        collections={collections}
        categories={categories}
        onChange={onChange}
      />
    </aside>
  );
};

export default DesktopSidebar;
