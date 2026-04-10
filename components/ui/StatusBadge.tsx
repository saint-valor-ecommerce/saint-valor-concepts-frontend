import { OrderStatus } from "@/types/adminOrder";

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pending",
      className: "bg-gray-50 text-gray-600 border border-gray-200",
    },
    ongoing: {
      label: "Ongoing",
      className: "bg-ivory text-[#b8860b] border border-[#d4af37]",
    },
    completed: {
      label: "Completed",
      className: "bg-green-50 text-green-700 border border-green-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-50 text-red-600 border border-red-200",
    },
    failed: {
      label: "Failed",
      className: "bg-red-50 text-red-700 border border-red-300",
    },
  };

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = statusConfig[status] ?? statusConfig.ongoing;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
