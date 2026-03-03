import api from "../axios";
import { Product } from "@/types/product";

export const getNewArrivals = async (): Promise<Product[]> => {
  const { data } = await api.get("/api/v1/products/new-arrivals");
  return data.data.products;
};

export const getBestSellers = async (): Promise<Product[]> => {
  const { data } = await api.get("/api/v1/products/best-sellers");
  return data.data.products;
};
