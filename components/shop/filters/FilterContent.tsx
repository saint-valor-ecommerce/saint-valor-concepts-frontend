import FilterSection from "./FilterSection";
import CheckboxFilter from "./CheckboxFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { ProductCollection, ProductCategory } from "@/types/product";
import { SidebarFilters } from "../DesktopSideBar";

const WEIGHT_OPTIONS = [
  { label: "1-3g", value: "1-3g" },
  { label: "3-6g", value: "3-6g" },
  { label: "7-10g", value: "7-10g" },
  { label: "11-15g", value: "11-15g" },
];

const SIZE_OPTIONS = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
];

const MATERIAL_OPTIONS = [
  { label: "Gold", value: "Gold" },
  { label: "Silver", value: "Silver" },
  { label: "VVS Diamonds Natural", value: "VVS Diamonds Natural" },
  { label: "VVS Diamonds Lab", value: "VVS Diamonds Lab" },
];

const KARAT_OPTIONS = [
  { label: "14k", value: "14k" },
  { label: "18k", value: "18k" },
  { label: "22k", value: "22k" },
];

const JEWELRY_TYPE_OPTIONS = [
  { label: "Rings", value: "Rings" },
  { label: "Necklaces", value: "Necklaces" },
  { label: "Earrings", value: "Earrings" },
  { label: "Bracelets", value: "Bracelets" },
  { label: "Anklets", value: "Anklets" },
];

interface FilterContentProps {
  filters: SidebarFilters;
  collections: ProductCollection[];
  categories: ProductCategory[];
  onChange: (filters: SidebarFilters) => void;
}

const FilterContent = ({
  filters,
  collections,
  categories,
  onChange,
}: FilterContentProps) => {
  const toggle = (key: keyof SidebarFilters, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <div className="flex flex-col">
      <FilterSection title="Collection">
        <CheckboxFilter
          options={collections.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.collections}
          onChange={(val) => toggle("collections", val)}
        />
      </FilterSection>
      <FilterSection title="Weight (grams)">
        <CheckboxFilter
          options={WEIGHT_OPTIONS}
          selected={filters.weights}
          onChange={(val) => toggle("weights", val)}
        />
      </FilterSection>
      <FilterSection title="Size">
        <CheckboxFilter
          options={SIZE_OPTIONS}
          selected={filters.sizes}
          onChange={(val) => toggle("sizes", val)}
        />
      </FilterSection>
      <FilterSection title="Price">
        <PriceRangeFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onMinChange={(val) => onChange({ ...filters, minPrice: val })}
          onMaxChange={(val) => onChange({ ...filters, maxPrice: val })}
        />
      </FilterSection>
      <FilterSection title="Material">
        <CheckboxFilter
          options={MATERIAL_OPTIONS}
          selected={filters.materials}
          onChange={(val) => toggle("materials", val)}
        />
      </FilterSection>
      <FilterSection title="Karat">
        <CheckboxFilter
          options={KARAT_OPTIONS}
          selected={filters.karats}
          onChange={(val) => toggle("karats", val)}
        />
      </FilterSection>
      <FilterSection title="Jewelry Type">
        <CheckboxFilter
          options={JEWELRY_TYPE_OPTIONS}
          selected={filters.jewelryTypes}
          onChange={(val) => toggle("jewelryTypes", val)}
        />
      </FilterSection>
      <FilterSection title="Category">
        <CheckboxFilter
          options={categories.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.categories}
          onChange={(val) => toggle("categories", val)}
        />
      </FilterSection>
    </div>
  );
};

export default FilterContent;
