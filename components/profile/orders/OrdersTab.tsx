"use client";

import { getUserOrders } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OrdersToggle from "./OrdersToggle";
import OrdersSearch from "./OrdersSearch";
import OrderRow from "./OrderRow";
import OrderModal from "./OrderModal";
import { Order, Filter } from "./types";

const ITEMS_PER_PAGE = 5;

const OrdersTab = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<Filter>("ongoing");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const apiStatus = filter === "ongoing" ? "ongoing" : "completed";
        const data = await getUserOrders(apiStatus);
        setOrders(data);
      } catch {
        setError("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  const filteredOrders = orders.filter((o) =>
    search.trim()
      ? o.orderId.toLowerCase().includes(search.toLowerCase()) ||
        o.items.some((i) =>
          i.productName.toLowerCase().includes(search.toLowerCase()),
        )
      : true,
  );

  const visibleOrders = filteredOrders.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOrders.length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-secondary">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="flex flex-col gap-5">
        <OrdersToggle
          filter={filter}
          onFilterChange={(f) => {
            setFilter(f);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
        />

        <OrdersSearch value={search} onChange={setSearch} />

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p className="text-charcoal font-medium">
              {search ? "No matching orders found" : "No Orders Yet"}
            </p>
            <p className="text-sm text-secondary">
              {search
                ? "Try a different product name or order number."
                : filter === "ongoing"
                  ? "You have no ongoing orders right now."
                  : "You have no past orders yet."}
            </p>
            {!search && filter === "ongoing" && (
              <button
                onClick={() => router.push("/")}
                className="mt-2 px-6 py-2.5 bg-gold text-white text-sm font-medium rounded-md hover:opacity-90 transition"
              >
                Start Shopping
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col divide-y divide-border">
              {visibleOrders.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  onView={setSelectedOrder}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                  className="px-8 py-2.5 border border-gold text-gold text-sm font-medium rounded-full hover:bg-gold hover:text-white transition-all duration-200"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default OrdersTab;
