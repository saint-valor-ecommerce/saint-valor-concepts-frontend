export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  size: string;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
}

export type Filter = "ongoing" | "past";
