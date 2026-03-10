import { ProductsTab } from "@/types/product";

interface ProductFilterTabsProps {
  activeTab: ProductsTab;
  onTabChange: (tab: ProductsTab) => void;
}

const ProductFilterTabs = ({
  activeTab,
  onTabChange,
}: ProductFilterTabsProps) => {
  return (
    <div className="bg-white border border-border rounded-full p-2 flex gap-2 w-fit">
      <button
        onClick={() => onTabChange("categories")}
        className={`px-5 cursor-pointer py-3 rounded-full text-sm font-medium transition-colors ${
          activeTab === "categories" ? "bg-gold text-white" : "text-charcoal"
        }`}
      >
        Categories
      </button>
      <button
        onClick={() => onTabChange("collections")}
        className={`px-5 py-3 cursor-pointer rounded-full text-sm font-medium transition-colors ${
          activeTab === "collections" ? "bg-gold text-white" : "text-charcoal"
        }`}
      >
        Collections
      </button>
    </div>
  );
};

export default ProductFilterTabs;
