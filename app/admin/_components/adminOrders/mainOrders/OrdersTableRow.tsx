import { RecentOrder } from "@/types/adminOrder";
import StatusBadge from "@/components/ui/StatusBadge";
import { OrderStatus } from "@/types/adminOrder";
import MoreDetails from "../../adminUI/MoreDetails";
import { formatDate } from "@/lib/utils";

interface OrdersTableRowProps {
  order: RecentOrder;
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
        <StatusBadge status={order.orderStatus as OrderStatus} />
      </td>

      {/* More Details */}
      <td className={orderTableRowStyles}>
        <MoreDetails orderId={order._id} />
      </td>
    </tr>
  );
}
