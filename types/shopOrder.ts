import { OrderStatus, PaymentStatus } from "./adminOrder";

export type Order = {
  _id: string;
  orderId: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
};

export type InitializeOrderPayload = {
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

export type DeliveryFeesData = {
  currency: string;
  defaultFee: number;
  fees: Record<string, number>;
};

export type DeliveryFeesResponse = {
  status: string;
  data: DeliveryFeesData;
};

export type InitializeOrderResponse = {
  authorization_url: string;
  reference: string;
  orderId: string;
};
