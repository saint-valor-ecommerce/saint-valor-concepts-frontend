import { OrderItem } from "./index";
export type { OrderItem };

export type OrderStatus =
  | "pending"
  | "ongoing"
  | "completed"
  | "cancelled"
  | "failed";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface RecentOrder {
  _id: string;
  orderId: string;
  firstName: string;
  lastName: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface OrderDetail {
  _id: string;
  orderId: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  shippingMethod: string;
  items: OrderItem[];
  totalPrice: number;
  user: string | null;
  paymentStatus: PaymentStatus;
  paystackReference: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
