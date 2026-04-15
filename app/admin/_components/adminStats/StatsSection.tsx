"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import StatCard from "./StatCard";
import SkeletonCard from "./SkeletonCard";
import { RecentOrder } from "../../../../types/adminOrder";
import RecentOrdersTable from "../adminOrders/recent-orders/RecentOrdersTable";
import { formatEarnings } from "@/lib/utils";

interface DashboardStats {
  totalUsers: number;
  totalSales: number;
  totalEarnings: number;
  recentOrders: RecentOrder[];
}

const StatsSection = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard/stats");
        setStats(data.data);
      } catch {
        toast.error("Unable to load dashboard data. Please try again.");
        setError("Unable to load dashboard data. Please try again.");
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
            />
            <StatCard label="Sales" value={stats.totalSales.toLocaleString()} />
            <StatCard label="Users" value={stats.totalUsers.toLocaleString()} />
          </>
        ) : null}
      </div>

      {stats && <RecentOrdersTable orders={stats.recentOrders} />}
    </section>
  );
};

export default StatsSection;
