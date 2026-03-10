export type ProductsTab = "categories" | "collections";

export interface ProductSize {
  size: string;
  quantity: number;
}

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductCollection {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

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
  weight?: string;
  size?: string;
  karat?: string;
  jewelryType?: string;
  sort?: string;
}

export interface PaginatedProducts {
  products: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  mainImage: string;
  subImages: string[];
  productJewelryType: string;
  productMaterial: string;
  productKarat: string;
  productWeight: string;
  productSizes: ProductSize[];
  productCategory: ProductCategory;
  productCollection: ProductCollection;
  salesCount: number;
  isNewArrival: boolean;
  createdAt: string;
  updatedAt: string;
}
