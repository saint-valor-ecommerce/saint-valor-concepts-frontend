import api from "../axios";
import { CartItem } from "@/types/cart";

type InitializeOrderPayload = {
  items: {
    productId: string;
    quantity: number;
    size: string | null;
  }[];
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  shippingMethod: string;
};

type InitializeOrderResponse = {
  authorization_url: string;
  reference: string;
  orderId: string;
};

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
