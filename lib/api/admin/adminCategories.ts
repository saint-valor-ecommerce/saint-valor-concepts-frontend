import api from "@/lib/axios";
import { Category } from "@/types/product";

export async function getAllCategories(): Promise<Category[]> {
  const res = await api.get("/admin/categories");
  return res.data.data.categories;
}

export async function updateCategory(data: {
  _id: string;
  name: string;
}): Promise<Category> {
  const res = await api.put(`/admin/categories/${data._id}`, data);
  return res.data.data.category;
}

export async function addNewCategory(data: {
  name: string;
}): Promise<Category> {
  const res = await api.post("/admin/categories", data);
  return res.data.data.category;
}

export async function deleteCategory(data: { _id: string }): Promise<void> {
  await api.delete(`/admin/categories/${data._id}`);
}
