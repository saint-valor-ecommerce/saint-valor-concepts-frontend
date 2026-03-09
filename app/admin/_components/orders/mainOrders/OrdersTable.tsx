import { RecentOrder } from "@/types/adminOrder";
import OrdersTableRow from "./OrdersTableRow";

interface OrdersTableProps {
  orders: RecentOrder[];
}

const columns = [
  "Users",
  "Order Number",
  "Delivery Date",
  "Total price",
  "Status",
  "",
];

export default function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-secondary text-sm">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left py-3 px-4 text-xs font-medium text-secondary uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrdersTableRow key={order._id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
