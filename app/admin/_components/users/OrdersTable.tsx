import { ChevronDown } from "lucide-react";
import { Order } from "@/types";
import { formatDate } from "@/lib/utils";
import OrdersFilterTabs from "../orders/mainOrders/OrdersFilterTabs";
import MoreDetails from "../ui/MoreDetails";

interface OrdersTableProps {
  orders: Order[];
  activeTab: "ongoing" | "past";
  onTabChange: (tab: "ongoing" | "past") => void;
}

const OrdersTable = ({ orders, activeTab, onTabChange }: OrdersTableProps) => {
  return (
    <div className="space-y-4">
      <OrdersFilterTabs activeTab={activeTab} onTabChange={onTabChange} />

      {/* Table */}
      {orders.length === 0 ? (
        <p className="text-sm text-secondary">No orders found</p>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-secondary border-b border-gray-100">
                <th className="px-6 py-4 font-normal">Order Number</th>
                <th className="px-6 py-4 font-normal">Delivery Date</th>
                <th className="px-6 py-4 font-normal">Total price</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-6 py-4 text-charcoal">{order.orderId}</td>
                  <td className="px-6 py-4 text-charcoal">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-charcoal">
                    &#8358;{order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 border border-gray-200 rounded-md px-2 py-1 text-xs text-secondary cursor-pointer hover:bg-gray-50"
                    >
                      <span className="capitalize">{order.orderStatus}</span>
                      <ChevronDown size={12} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <MoreDetails orderId={order._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
