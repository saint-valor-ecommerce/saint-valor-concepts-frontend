interface OrdersHeaderProps {
  count: number;
}

export default function OrdersHeader({ count }: OrdersHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-charcoal">Orders ({count})</h1>
    </div>
  );
}
