"use client";
import { ProductsTab } from "@/types/product";
import { useState } from "react";
import ProductFilterTabs from "../../_components/adminProducts/ProductFilterTabs";

const AdminProductsPage = () => {
  const [activeTab, setActiveTab] = useState<ProductsTab>("categories");

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <ProductFilterTabs
        activeTab={activeTab}
        onTabChange={(t) => {
          setActiveTab(t);
        }}
      />
    </div>
  );
};

export default AdminProductsPage;
