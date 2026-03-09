"use client";

import { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/lib/axios";
import { RecentOrder, OrderStatus } from "@/types/adminOrder";
import OrdersHeader from "../mainOrders/OrdersHeader";
import OrdersFilterTabs, { OrdersTab } from "../mainOrders/OrdersFilterTabs";
import OrdersTable from "../mainOrders/OrdersTable";
import StatusConfirmModal from "../mainOrders/StatusConfirmModal";

interface PendingStatusChange {
  orderId: string;
  newStatus: OrderStatus;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OrdersTab>("ongoing");
  const [pendingChange, setPendingChange] =
    useState<PendingStatusChange | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/admin/orders");
        const data: RecentOrder[] = res.data.data.orders;
        setOrders(data);
      } catch {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === "ongoing") {
      return orders.filter((o) => o.orderStatus === "ongoing");
    }

    return orders.filter(
      (o) => o.orderStatus === "completed" || o.orderStatus === "cancelled",
    );
  }, [orders, activeTab]);

  const handleConfirmStatusChange = async () => {
    if (!pendingChange) return;

    try {
      setIsUpdating(true);
      await axiosInstance.put(`/admin/orders/${pendingChange.orderId}/status`, {
        status: pendingChange.newStatus,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === pendingChange.orderId
            ? { ...o, orderStatus: pendingChange.newStatus }
            : o,
        ),
      );

      setPendingChange(null);
    } catch (err) {
      console.error("Failed to update order status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelModal = () => {
    if (!isUpdating) setPendingChange(null);
  };

  return (
    <div className="min-h-screen bg-ivory px-6 py-8">
      <OrdersHeader count={orders.length} />
      <OrdersFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {loading && (
        <div className="min-h-screen bg-ivory flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="text-center py-16 text-red-500 text-sm">{error}</div>
      )}

      {!loading && !error && (
        <div>
          <OrdersTable orders={filteredOrders} />
        </div>
      )}

      <StatusConfirmModal
        isOpen={!!pendingChange}
        newStatus={pendingChange?.newStatus ?? null}
        isLoading={isUpdating}
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelModal}
      />
    </div>
  );
}
