import api from "../axios";
import { CartItem } from "@/types/cart";
import {
  Order,
  InitializeOrderPayload,
  InitializeOrderResponse,
} from "@/types/shopOrder";

export function buildOrderItems(items: CartItem[]) {
  return items.map((i) => ({
    productId: i.productId,
    quantity: i.quantity,
    size: i.size,
  }));
}

export async function initializeOrder(
  payload: InitializeOrderPayload,
): Promise<InitializeOrderResponse> {
  const res = await api.post("/orders/initialize", payload);
  return res.data.data;
}

export async function getUserOrders(status: "ongoing" | "completed") {
  const res = await api.get(`/orders/me?status=${status}`);
  return res.data.data.orders;
}

export async function getOrderById(orderId: string): Promise<Order> {
  const res = await api.get(`/orders/${orderId}`);
  return res.data.data.order;
}
