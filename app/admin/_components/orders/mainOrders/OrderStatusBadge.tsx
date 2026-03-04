type OrderStatus = "ongoing" | "completed" | "cancelled";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    ongoing: {
      label: "Ongoing",
      className: "bg-[#f5f0e0] text-[#b8860b] border border-[#d4af37]",
    },
    completed: {
      label: "Completed",
      className: "bg-[#e8f5e9] text-[#2e7d32] border border-[#81c784]",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-[#fdecea] text-[#c62828] border border-[#ef9a9a]",
    },
  };

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
