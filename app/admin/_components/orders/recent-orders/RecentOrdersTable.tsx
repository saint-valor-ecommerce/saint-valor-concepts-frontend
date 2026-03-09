import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RecentOrder } from "@/types/adminOrder";
import OrderRow from "./OrderRow";

interface RecentOrdersTableProps {
  orders: RecentOrder[];
}

const HEADERS = [
  "Users",
  "Order Number",
  "Delivery Date",
  "Total Price",
  "Status",
  "",
];

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  return (
    <section className="mt-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-semibold text-charcoal">Orders</h2>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1 text-sm text-secondary cursor-pointer transition-colors font-medium"
        >
          See all
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Table */}
      <div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {HEADERS.map((header) => (
                <th
                  key={header}
                  className="py-3 px-4 text-left text-xs font-semibold tracking-[0.12em] text-secondary"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm text-secondary"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => <OrderRow key={order._id} order={order} />)
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentOrdersTable;
