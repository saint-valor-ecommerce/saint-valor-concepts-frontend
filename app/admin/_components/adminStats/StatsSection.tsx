"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import axios from "axios";
import StatCard from "./StatCard";
import SkeletonCard from "./SkeletonCard";
import { RecentOrder } from "../../../../types/adminOrder";
import RecentOrdersTable from "../adminOrders/recent-orders/RecentOrdersTable";

interface DashboardStats {
  totalUsers: number;
  totalSales: number;
  totalEarnings: number;
  recentOrders: RecentOrder[];
}

const MOCK_SPARKLINES = {
  earnings: [120, 180, 150, 200, 170, 220, 190, 250, 210, 280],
  sales: [80, 120, 90, 150, 110, 130, 100, 160, 140, 170],
  users: [5, 8, 6, 12, 9, 15, 11, 18, 14, 20],
};

const formatEarnings = (amount: number) => {
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(0)}K`;
  return `₦${amount.toLocaleString()}`;
};

const StatsSection = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard/stats");
        setStats(data.data);
      } catch (err: unknown) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to fetch stats."
          : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 px-8 py-6 text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="mx-10 pb-10">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.15em] text-charcoal">
          Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : stats ? (
          <>
            <StatCard
              label="Earnings"
              value={formatEarnings(stats.totalEarnings)}
              percentage={10.23}
              sparklineData={MOCK_SPARKLINES.earnings}
              sparklineColor="#22c55e"
            />
            <StatCard
              label="Sales"
              value={stats.totalSales.toLocaleString()}
              percentage={-10.23}
              sparklineData={MOCK_SPARKLINES.sales}
              sparklineColor="#ef4444"
            />
            <StatCard
              label="Users"
              value={stats.totalUsers.toLocaleString()}
              percentage={0}
              sparklineData={MOCK_SPARKLINES.users}
              sparklineColor="#94a3b8"
            />
          </>
        ) : null}
      </div>

      {stats && <RecentOrdersTable orders={stats.recentOrders} />}
    </section>
  );
};

export default StatsSection;
