const columns = [
  "Users",
  "Order Number",
  "Delivery Date",
  "Total price",
  "Status",
  "",
];

function SkeletonCell({ width = "w-24" }: { width?: string }) {
  return (
    <td className="py-4 px-4">
      <div className={`h-3.5 ${width} bg-gray-200 rounded animate-pulse`} />
    </td>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      <SkeletonCell width="w-32" />
      <SkeletonCell width="w-28" />
      <SkeletonCell width="w-24" />
      <SkeletonCell width="w-20" />
      <td className="py-4 px-4">
        <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
      </td>
      <td className="py-4 px-4">
        <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
      </td>
    </tr>
  );
}

export default function OrdersTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col}
                className="text-left py-3 px-4 text-xs font-medium text-secondary uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
