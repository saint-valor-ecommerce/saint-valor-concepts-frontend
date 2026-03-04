import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RecentOrder } from "@/types/order";

interface MoreDetailsProps {
  order: RecentOrder;
}

const MoreDetails = ({ order }: MoreDetailsProps) => {
  return (
    <Link
      href={`/admin/orders/${order._id}`}
      className="flex items-center gap-1 text-sm text-charcoal font-semibold transition-colors whitespace-nowrap"
    >
      More details
      <ChevronRight className="w-4 h-4" />
    </Link>
  );
};

export default MoreDetails;
