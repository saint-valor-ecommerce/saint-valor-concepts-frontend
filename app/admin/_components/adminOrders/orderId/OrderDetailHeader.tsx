import { X } from "lucide-react";

interface OrderDetailHeaderProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetailHeader = ({ orderId, onBack }: OrderDetailHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-8">
      <h1 className="text-xl font-semibold text-charcoal">
        Order - #{orderId}
      </h1>
      <button
        onClick={onBack}
        className="text-charcoal/40 hover:text-charcoal transition-colors"
      >
        <X size={20} className="cursor-pointer" />
      </button>
    </div>
  );
};

export default OrderDetailHeader;
