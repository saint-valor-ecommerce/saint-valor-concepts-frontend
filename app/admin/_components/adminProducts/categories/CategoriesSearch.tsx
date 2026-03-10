import { Search } from "lucide-react";

interface CategoriesSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoriesSearch = ({ value, onChange }: CategoriesSearchProps) => {
  return (
    <div className="relative py-6">
      <Search
        size={15}
        className="text-burgundy absolute left-0 top-1/2 -translate-y-1/2"
      />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-burgundy pl-5 py-1 text-charcoal placeholder:text-xs placeholder:text-secondary focus:outline-none"
      />
    </div>
  );
};

export default CategoriesSearch;
