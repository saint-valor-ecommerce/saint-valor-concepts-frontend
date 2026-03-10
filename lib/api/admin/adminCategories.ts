import api from "@/lib/axios";
import { Category } from "@/types/product";

export async function getAllCategories(): Promise<Category[]> {
  const res = await api.get("/admin/categories");
  return res.data.data.categories;
}
