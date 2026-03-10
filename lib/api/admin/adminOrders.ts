import api from "@/lib/axios";
import { RecentOrder } from "@/types/adminOrder";

export async function getAllOrders(): Promise<RecentOrder[]> {
  const res = await api.get("/admin/orders");
  return res.data.data.orders;
}
