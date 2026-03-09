"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";
import { OrderDetail } from "@/types/adminOrder";
import OrderDetailHeader from "@/app/admin/_components/orders/orderId/OrderDetailHeader";
import OrderDetailMeta from "@/app/admin/_components/orders/orderId/OrderDetailMeta";
import OrderDetailAddress from "@/app/admin/_components/orders/orderId/OrderDetailAddress";
import OrderDetailItems from "@/app/admin/_components/orders/orderId/OrderDetailItems";
import OrderDetailTotal from "@/app/admin/_components/orders/orderId/OrderDetailTotal";
import StatusConfirmModal from "@/app/admin/_components/orders/mainOrders/StatusConfirmModal";

const OrderDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusToConfirm, setStatusToConfirm] = useState<
    OrderDetail["orderStatus"] | null
  >(null);

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/admin/orders/${id}`);
        setOrder(data.data.order);
      } catch (err: unknown) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to fetch order."
          : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = (status: OrderDetail["orderStatus"]) => {
    setStatusToConfirm(status);
  };

  const handleConfirmStatus = async () => {
    if (!id || !statusToConfirm) return;
    setIsUpdating(true);
    try {
      await api.put(`/admin/orders/${id}/status`, { status: statusToConfirm });
      setOrder((prev) =>
        prev ? { ...prev, orderStatus: statusToConfirm } : prev,
      );
      setStatusToConfirm(null);
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-sm text-red-500">{error || "Order not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory py-5 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* Header */}
        <OrderDetailHeader
          orderId={order.orderId}
          onBack={() => router.back()}
        />

        {/* Meta grid */}
        <OrderDetailMeta
          createdAt={order.createdAt}
          orderId={order.orderId}
          orderStatus={order.orderStatus}
          onStatusChange={handleStatusChange}
          isUpdating={isUpdating}
        />

        {/* Address + Phone + Shipping */}
        <OrderDetailAddress
          address={order.address}
          city={order.city}
          countryCode={order.countryCode}
          phoneNumber={order.phoneNumber}
          shippingMethod={order.shippingMethod}
        />

        {/* Items */}
        <OrderDetailItems items={order.items} />

        {/* Total */}
        <OrderDetailTotal totalPrice={order.totalPrice} />

        <StatusConfirmModal
          isOpen={!!statusToConfirm}
          newStatus={statusToConfirm}
          isLoading={isUpdating}
          onConfirm={handleConfirmStatus}
          onCancel={() => {
            if (!isUpdating) setStatusToConfirm(null);
          }}
        />
      </div>
    </div>
  );
};

export default OrderDetailPage;
