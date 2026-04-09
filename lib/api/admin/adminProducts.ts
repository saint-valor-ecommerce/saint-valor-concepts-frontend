import api from "@/lib/axios";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const res = await api.get("/admin/products");
  return res.data.data.products;
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
  },
): Promise<Product> {
  const res = await api.put(`/admin/products/${id}`, payload);
  return res.data.data.product;
}

export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/admin/products/${id}`);
}
