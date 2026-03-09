import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import { OrderStatus } from "@/types/adminOrder";
import { Order } from "./types";

interface OrderRowProps {
  order: Order;
  onView: (order: Order) => void;
}

const OrderRow = ({ order, onView }: OrderRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 py-5">
    <div className="sm:w-32">
      <p className="text-sm font-semibold text-charcoal">
        {order.items.length} {order.items.length === 1 ? "item" : "items"}
      </p>
    </div>

    <div className="sm:flex-1">
      <p className="text-xs text-secondary mb-0.5">Order date</p>
      <p className="text-sm text-charcoal">{formatDate(order.createdAt)}</p>
    </div>

    <div className="sm:flex-1">
      <p className="text-xs text-secondary mb-0.5">Order Number</p>
      <p className="text-sm text-charcoal font-medium">#{order.orderId}</p>
    </div>

    <div className="sm:w-32">
      <p className="text-xs text-secondary mb-1">Status</p>
      <StatusBadge status={order.orderStatus as OrderStatus} />
    </div>

    <div className="flex flex-col">
      <p className="text-xs text-secondary mb-1 invisible">View</p>
      <button
        onClick={() => onView(order)}
        className="flex items-center gap-1 text-sm text-charcoal font-medium cursor-pointer"
      >
        More Details
        <ChevronRight
          size={16}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </button>
    </div>
  </div>
);

export default OrderRow;
