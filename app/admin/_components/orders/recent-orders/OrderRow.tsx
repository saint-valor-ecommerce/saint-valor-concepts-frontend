import { RecentOrder } from "@/types/order";
import OrderStatusBadge from "../mainOrders/OrderStatusBadge";
import MoreDetails from "../../ui/MoreDetails";

interface OrderRowProps {
  order: RecentOrder;
}

const OrderRow = ({ order }: OrderRowProps) => {
  const formattedDate = new Date(order.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedPrice = `₦${order.totalPrice.toLocaleString()}`;
  const recentOrderStyles = "py-4 px-4 text-sm text-charcoal font-medium";

  return (
    <tr className="border-b border-border transition-colors">
      {/* User */}
      <td className={recentOrderStyles}>
        {order.firstName} {order.lastName}
      </td>

      {/* Order Number */}
      <td className={recentOrderStyles}>#{order.orderId}</td>

      {/* Date */}
      <td className={recentOrderStyles}>{formattedDate}</td>

      {/* Total Price */}
      <td className={recentOrderStyles}>{formattedPrice}</td>

      {/* Status */}
      <td className="py-4 px-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* More Details */}
      <td className="py-4 px-4">
        <MoreDetails orderId={order._id} />
      </td>
    </tr>
  );
};

export default OrderRow;
