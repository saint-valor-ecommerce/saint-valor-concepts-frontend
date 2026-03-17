"use client";

import React, { useState, useEffect } from "react";
import { UserDetails } from "@/types";
import UserDetailsBreadcrumb from "@/app/admin/_components/adminUsersPage/UserDetailsBreadcrumb";
import UserInfoCard from "@/app/admin/_components/adminUsersPage/UserInfoCard";
import OrdersTable from "@/app/admin/_components/adminUsersPage/UserOrdersTable";
import { toast } from "react-toastify";
import api from "@/lib/axios";

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"ongoing" | "past">("ongoing");
  const { id } = React.use(params);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/admin/users/${id}`);
        setData(data.data);
      } catch {
        toast.error("Could not load user details.");
        setError("Could not load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (error) return <div className="p-6">{error}</div>;
  if (!data) return null;

  const { user, ongoingOrders, pastOrders } = data;
  const activeOrders = activeTab === "ongoing" ? ongoingOrders : pastOrders;

  return (
    <div className="min-h-screen p-6 space-y-6">
      <UserDetailsBreadcrumb />
      <h1 className="text-2xl font-semibold text-charcoal">User Details</h1>
      <UserInfoCard user={user} />
      <OrdersTable
        orders={activeOrders}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
