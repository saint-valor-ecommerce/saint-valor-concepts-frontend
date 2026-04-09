interface RadioFilterProps {
  name: string;
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (value: string) => void;
}

const RadioFilter = ({
  name,
  options,
  selected,
  onChange,
}: RadioFilterProps) => {
  return (
    <div className="flex flex-col gap-2" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className="flex items-center gap-2 cursor-pointer text-sm text-charcoal"
          >
            <span
              className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                isSelected ? "border-burgundy" : "border-gray-400"
              }`}
            >
              {isSelected && (
                <span className="h-2 w-2 rounded-full bg-burgundy" />
              )}
            </span>
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default RadioFilter;
