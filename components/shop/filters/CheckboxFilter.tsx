interface CheckboxFilterProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
}

const CheckboxFilter = ({
  options,
  selected,
  onChange,
}: CheckboxFilterProps) => {
  return (
    <div className="flex flex-col gap-2 cursor-pointer">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => onChange(opt.value)}
            className="accent-burgundy w-3.5 h-3.5 cursor-pointer"
          />
          <span className="text-xs text-charcoal">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxFilter;
