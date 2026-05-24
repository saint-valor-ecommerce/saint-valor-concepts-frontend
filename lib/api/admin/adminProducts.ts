import api from "@/lib/axios";
import { Product, InventoryItem } from "@/types/product";
import { Pagination } from "@/types/pagination";

export async function getAllProducts(
  page = 1,
  search = "",
  signal?: AbortSignal,
): Promise<{ products: Product[]; pagination: Pagination }> {
  const res = await api.get("/admin/products", {
    params: { page, search },
    signal,
  });
  return {
    products: res.data.data.products,
    pagination: res.data.pagination,
  };
}

export async function getInventory(
  page = 1,
  search = "",
  signal?: AbortSignal,
): Promise<{ inventory: InventoryItem[]; pagination: Pagination }> {
  const res = await api.get("/admin/inventory", {
    params: { page, search },
    signal,
  });
  return {
    inventory: res.data.data.inventory,
    pagination: res.data.pagination,
  };
}

export async function createProduct(formData: FormData): Promise<Product> {
  const res = await api.post("/admin/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data.product;
}

export async function updateProduct(
  id: string,
  payload: {
    productName: string;
    productDescription: string;
    productPrice: number;
    productJewelryType: string;
    productMaterial: string;
    productKarat: string;
    productGender: string;
    productLength?: string;
  },
): Promise<Product> {
  const res = await api.put(`/admin/products/${id}`, payload);
  return res.data.data.product;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}
