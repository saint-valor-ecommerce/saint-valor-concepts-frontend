import { OrderDetail } from "@/types/order";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface OrderDetailMetaProps {
  createdAt: string;
  orderId: string;
  orderStatus: OrderDetail["orderStatus"];
  onStatusChange: (status: OrderDetail["orderStatus"]) => void;
  isUpdating: boolean;
}

const statusStyles: Record<OrderDetail["orderStatus"], string> = {
  ongoing: "bg-border text-charcoal",
  completed: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
};

const statusOptions: OrderDetail["orderStatus"][] = [
  "ongoing",
  "completed",
  "cancelled",
];

const OrderDetailMeta = ({
  createdAt,
  orderId,
  orderStatus,
  onStatusChange,
  isUpdating,
}: OrderDetailMetaProps) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div>
        <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">
          Order date
        </p>
        <p className="text-sm text-charcoal">{formattedDate}</p>
      </div>
      <div>
        <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">
          Order Number
        </p>
        <p className="text-sm text-charcoal">#{orderId}</p>
      </div>
      <div>
        <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">
          Status
        </p>
        <div className="relative inline-block">
          <button
            onClick={() => setShowStatusDropdown((prev) => !prev)}
            disabled={isUpdating}
            className={`inline-flex items-center cursor-pointer gap-1 px-3 py-1 rounded-md text-xs font-medium ${statusStyles[orderStatus]}`}
          >
            {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
            <ChevronDown size={12} />
          </button>
          {showStatusDropdown && (
            <div className="absolute top-8 left-0 z-10 bg-white border border-gold/20 rounded-xl shadow-md overflow-hidden w-36">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    onStatusChange(status);
                    setShowStatusDropdown(false);
                  }}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-charcoal hover:bg-ivory transition-colors capitalize"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailMeta;
