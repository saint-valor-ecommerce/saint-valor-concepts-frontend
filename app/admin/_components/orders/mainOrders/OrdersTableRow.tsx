import { RecentOrder } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import MoreDetails from "../../ui/MoreDetails";

interface OrdersTableRowProps {
  order: RecentOrder;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export default function OrdersTableRow({ order }: OrdersTableRowProps) {
  return (
    <tr className="border-b border-border hover:bg-ivory transition-colors">
      {/* User */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 text-gold text-xs font-semibold flex items-center justify-center shrink-0">
            {getInitials(order.firstName, order.lastName)}
          </div>
          <span className="text-sm text-charcoal font-medium">
            {order.firstName} {order.lastName}
          </span>
        </div>
      </td>

      {/* Order Number */}
      <td className="py-4 px-4">
        <span className="text-sm text-secondary">{order.orderId}</span>
      </td>

      {/* Delivery Date */}
      <td className="py-4 px-4">
        <span className="text-sm text-secondary">
          {formatDate(order.createdAt)}
        </span>
      </td>

      {/* Total Price */}
      <td className="py-4 px-4">
        <span className="text-sm text-charcoal font-medium">
          ₦{order.totalPrice.toLocaleString()}
        </span>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* More Details */}
      <td className="py-4 px-4">
        <MoreDetails order={order} />
      </td>
    </tr>
  );
}
