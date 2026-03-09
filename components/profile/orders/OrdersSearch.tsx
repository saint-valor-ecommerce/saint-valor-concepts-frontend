import { Search } from "lucide-react";

interface OrdersSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const OrdersSearch = ({ value, onChange }: OrdersSearchProps) => (
  <div className="relative">
    <Search
      size={15}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
    />
    <input
      type="text"
      placeholder="Search Product"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 text-sm bg-transparent border-b border-border text-charcoal placeholder:text-secondary focus:outline-none focus:border-gold transition-colors"
    />
  </div>
);

export default OrdersSearch;
