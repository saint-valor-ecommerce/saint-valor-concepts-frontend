"use client";
import { ProductsTab } from "@/types/product";
import { useState } from "react";
import ProductFilterTabs from "../../_components/adminProducts/ProductFilterTabs";
import CategoriesTable from "../../_components/adminProducts/categories/CategoriesTable";

const AdminProductsPage = () => {
  const [activeTab, setActiveTab] = useState<ProductsTab>("categories");

  return (
    <div className="min-h-screen px-6 py-8">
      <h3 className="text-2xl font-semibold mb-6">Products</h3>
      <ProductFilterTabs
        activeTab={activeTab}
        onTabChange={(t) => {
          setActiveTab(t);
        }}
      />
      <CategoriesTable />
    </div>
  );
};

export default AdminProductsPage;
