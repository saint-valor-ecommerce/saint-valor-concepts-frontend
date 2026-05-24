import api from "@/lib/axios";
import { User } from "@/types/adminUsers";
import { Pagination } from "@/types/pagination";

export async function getAllUsers(
  page = 1,
  search = "",
  signal?: AbortSignal,
): Promise<{ users: User[]; pagination: Pagination }> {
  const res = await api.get("/admin/users", {
    params: { page, search },
    signal,
  });
  return {
    users: res.data.data.users,
    pagination: res.data.pagination,
  };
}
