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

  return (
    <tr className="border-b border-[#C9A050]/10 hover:bg-[#F5F0E8]/40 transition-colors">
      {/* User */}
      <td className="py-4 px-4 text-sm text-[#1a1a1a] font-medium">
        {order.firstName} {order.lastName}
      </td>

      {/* Order Number */}
      <td className="py-4 px-4 text-sm text-charcoal">#{order.orderId}</td>

      {/* Date */}
      <td className="py-4 px-4 text-sm text-charcoal">{formattedDate}</td>

      {/* Total Price */}
      <td className="py-4 px-4 text-sm text-charcoal">{formattedPrice}</td>

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
};

export default OrderRow;
