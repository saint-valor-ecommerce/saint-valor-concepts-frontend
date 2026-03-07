import publicApi from "../api/publicApi";
import { Product } from "@/types/product";
import {
  ProductFilters,
  PaginatedProducts,
  ProductCollection,
  ProductCategory,
} from "@/types/product";

export const getAllProducts = async (
  filters?: ProductFilters,
): Promise<PaginatedProducts> => {
  const { data } = await publicApi.get("/products", { params: filters });
  return {
    products: data.data.products,
    totalItems: data.pagination.totalItems,
    totalPages: data.pagination.totalPages,
    currentPage: data.pagination.currentPage,
  };
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await publicApi.get(`/products/${id}`);
  return data.data.product;
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const { data } = await publicApi.get("/new-arrivals");
  return data.data.products;
};

export const getBestSellers = async (): Promise<Product[]> => {
  const { data } = await publicApi.get("/best-sellers");
  return data.data.products;
};

export const getCollections = async (): Promise<ProductCollection[]> => {
  const { data } = await publicApi.get("/collections");
  return data.data.collections;
};

export const getCategories = async (): Promise<ProductCategory[]> => {
  const { data } = await publicApi.get("/categories");
  return data.data.categories;
};
