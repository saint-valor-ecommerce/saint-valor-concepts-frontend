//shows all the filters and search bar for the shop page

import { Search, SlidersHorizontal } from "lucide-react";

interface ShopToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onToggleMobileFilters: () => void;
}

const ShopToolbar = ({
  search,
  onSearchChange,
  showFilters,
  onToggleFilters,
  onToggleMobileFilters,
}: ShopToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onToggleFilters}
          className="hidden md:flex items-center gap-1.5 text-xs text-secondary hover:text-charcoal transition cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>

        <button
          onClick={onToggleMobileFilters}
          className="flex md:hidden items-center gap-1.5 text-xs text-secondary hover:text-charcoal transition cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Show Filters</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border border-border rounded-md p-3 bg-white">
        <Search className="w-3.5 h-3.5 text-secondary shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-xs text-charcoal outline-none bg-transparent w-full placeholder:text-secondary"
        />
      </div>
    </div>
  );
};

export default ShopToolbar;
