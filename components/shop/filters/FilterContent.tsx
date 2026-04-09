import FilterSection from "./FilterSection";
import RadioFilter from "./RadioFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { ProductCollection, ProductCategory } from "@/types/product";
import { SidebarFilters } from "@/types/filter";
import {
  WEIGHT_OPTIONS,
  SIZE_OPTIONS,
  MATERIAL_OPTIONS,
  KARAT_OPTIONS,
  JEWELRY_TYPE_OPTIONS,
} from "@/constants/productOptions";

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
    const updated = current.includes(value) ? [] : [value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <div className="flex flex-col">
      <FilterSection title="Collection">
        <RadioFilter
          name="collections"
          options={collections.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.collections}
          onChange={(val) => toggle("collections", val)}
        />
      </FilterSection>
      <FilterSection title="Category">
        <RadioFilter
          name="category"
          options={categories.map((c) => ({ label: c.name, value: c.slug }))}
          selected={filters.categories}
          onChange={(val) => toggle("categories", val)}
        />
      </FilterSection>
      <FilterSection title="Weight (grams)">
        <RadioFilter
          name="weight"
          options={WEIGHT_OPTIONS}
          selected={filters.weights}
          onChange={(val) => toggle("weights", val)}
        />
      </FilterSection>
      <FilterSection title="Size">
        <RadioFilter
          name="size"
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
        <RadioFilter
          name="material"
          options={MATERIAL_OPTIONS}
          selected={filters.materials}
          onChange={(val) => toggle("materials", val)}
        />
      </FilterSection>
      <FilterSection title="Karat">
        <RadioFilter
          name="karat"
          options={KARAT_OPTIONS}
          selected={filters.karats}
          onChange={(val) => toggle("karats", val)}
        />
      </FilterSection>
      <FilterSection title="Jewelry Type">
        <RadioFilter
          name="jewelry"
          options={JEWELRY_TYPE_OPTIONS}
          selected={filters.jewelryTypes}
          onChange={(val) => toggle("jewelryTypes", val)}
        />
      </FilterSection>
    </div>
  );
};

export default FilterContent;
