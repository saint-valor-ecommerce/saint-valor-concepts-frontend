export type OrdersTab = "ongoing" | "past";

interface OrdersFilterTabsProps {
  activeTab: OrdersTab;
  onTabChange: (tab: OrdersTab) => void;
}

export default function OrdersFilterTabs({
  activeTab,
  onTabChange,
}: OrdersFilterTabsProps) {
  return (
    <div className="bg-white border border-border rounded-full p-3 flex gap-1 mb-6 w-fit">
      <button
        onClick={() => onTabChange("ongoing")}
        className={`px-5 cursor-pointer py-3 rounded-full text-sm font-medium transition-colors ${
          activeTab === "ongoing" ? "bg-gold text-white" : "text-charcoal"
        }`}
      >
        Ongoing Orders
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`px-5 py-3 cursor-pointer rounded-full text-sm font-medium transition-colors ${
          activeTab === "past" ? "bg-gold text-white" : "text-charcoal"
        }`}
      >
        Past Orders
      </button>
    </div>
  );
}
