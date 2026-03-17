"use client";

import { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/lib/axios";
import { RecentOrder, OrderStatus } from "@/types/adminOrder";
import OrdersHeader from "./OrdersHeader";
import OrdersFilterTabs, { OrdersTab } from "./OrdersFilterTabs";
import OrdersTable from "./OrdersTable";
import StatusConfirmModal from "./StatusConfirmModal";
import { getAllOrders } from "@/lib/api/admin/adminOrders";
import OrdersTableSkeleton from "./OrdersTableSkeleton";

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
        const data: RecentOrder[] = await getAllOrders();
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

      {loading && <OrdersTableSkeleton rows={6} />}

      {error && !loading && (
        <div className="text-center py-16 text-red-500 text-sm">{error}</div>
      )}

      {!loading && !error && <OrdersTable orders={filteredOrders} />}

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
