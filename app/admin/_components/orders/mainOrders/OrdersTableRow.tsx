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

const orderTableRowStyles = " py-4 px-4 text-sm text-charcoal font-medium";

export default function OrdersTableRow({ order }: OrdersTableRowProps) {
  return (
    <tr className="border-b border-border hover:bg-ivory transition-colors">
      {/* User */}
      <td className={orderTableRowStyles}>
        {order.firstName} {order.lastName}
      </td>

      {/* Order Number */}
      <td className={orderTableRowStyles}>
        <span className={orderTableRowStyles}>{order.orderId}</span>
      </td>

      {/* Delivery Date */}
      <td className={orderTableRowStyles}>{formatDate(order.createdAt)}</td>

      {/* Total Price */}
      <td className={orderTableRowStyles}>
        ₦{order.totalPrice.toLocaleString()}
      </td>

      {/* Status */}
      <td className={orderTableRowStyles}>
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* More Details */}
      <td className={orderTableRowStyles}>
        <MoreDetails orderId={order._id} />
      </td>
    </tr>
  );
}
