import { Filter } from "./types";

interface OrdersToggleProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const OrdersToggle = ({ filter, onFilterChange }: OrdersToggleProps) => (
  <div className="flex justify-center">
    <div className="inline-flex bg-white border border-border rounded-full p-1 shadow-sm">
      {(["ongoing", "past"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`px-6 py-2 rounded-full text-sm cursor-pointer font-medium transition-all duration-200 capitalize ${
            filter === tab
              ? "bg-gold text-white shadow-sm"
              : "text-secondary hover:text-charcoal"
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

export default OrdersToggle;
