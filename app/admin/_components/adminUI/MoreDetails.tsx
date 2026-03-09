import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface MoreDetailsProps {
  orderId: string;
}

const MoreDetails = ({ orderId }: MoreDetailsProps) => {
  return (
    <Link
      href={`/admin/orders/${orderId}`}
      className="flex items-center gap-1 text-sm text-charcoal font-semibold transition-colors whitespace-nowrap"
    >
      More details
      <ChevronRight className="w-4 h-4" />
    </Link>
  );
};

export default MoreDetails;
