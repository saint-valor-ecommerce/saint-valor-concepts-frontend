import api from "@/lib/axios";
import { RecentOrder } from "@/types/adminOrder";
import { Pagination } from "@/types/pagination";

export async function getAllOrders(
  page = 1,
  search = "",
  signal?: AbortSignal,
): Promise<{ orders: RecentOrder[]; pagination: Pagination }> {
  try {
    const res = await api.get("/admin/orders", {
      params: { page, search },
      signal,
    });
    return {
      orders: res.data.data.orders,
      pagination: res.data.pagination,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch orders.",
    );
  }
}
