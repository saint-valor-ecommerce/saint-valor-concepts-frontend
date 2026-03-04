import { RecentOrder } from "@/types/order";
import OrderStatusBadge from "../mainOrders/OrderStatusBadge";
import MoreDetails from "../../ui/MoreDetails";
import { formatDate } from "@/lib/utils";

interface OrderRowProps {
  order: RecentOrder;
}

const OrderRow = ({ order }: OrderRowProps) => {
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
      <td className={recentOrderStyles}>{formatDate(order.createdAt)}</td>

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
