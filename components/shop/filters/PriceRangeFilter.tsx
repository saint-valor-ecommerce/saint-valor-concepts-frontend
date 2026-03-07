interface PriceRangeFilterProps {
  min: string;
  max: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
}

const PriceRangeFilter = ({
  min,
  max,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-full border border-border rounded px-2 py-1.5 text-xs text-charcoal outline-none focus:border-gold transition"
        />
        <span className="text-xs text-secondary">—</span>
        <input
          type="number"
          placeholder="Max"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-full border border-border rounded px-2 py-1.5 text-xs text-charcoal outline-none focus:border-gold transition"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
