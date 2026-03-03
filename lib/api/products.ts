import publicApi from "../api/publicApi";
import { Product } from "@/types/product";

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  collection?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  material?: string;
}

export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const getAllProducts = async (
  filters?: ProductFilters,
): Promise<PaginatedProducts> => {
  const { data } = await publicApi.get("/api/v1/products", { params: filters });
  return {
    products: data.data.products,
    totalItems: data.totalItems,
    totalPages: data.totalPages,
    currentPage: data.currentPage,
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await publicApi.get(`/api/v1/products/${id}`);
  return data.data.product;
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const { data } = await publicApi.get("/api/v1/new-arrivals");
  return data.data.products;
};

export const getBestSellers = async (): Promise<Product[]> => {
  const { data } = await publicApi.get("/api/v1/best-sellers");
  return data.data.products;
};

export const getCollections = async () => {
  const { data } = await publicApi.get("/api/v1/collections");
  return data.data.collections;
};

export const getCategories = async () => {
  const { data } = await publicApi.get("/api/v1/categories");
  return data.data.categories;
};
