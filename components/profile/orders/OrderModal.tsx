import { X, Package } from "lucide-react";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/ui/StatusBadge";
import { OrderStatus } from "@/types/adminOrder";
import { Order } from "./types";

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);

const OrderModal = ({ order, onClose }: OrderModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    onClick={onClose}
  >
    <div
      className="bg-ivory w-full max-w-lg rounded-xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <p className="text-xs text-secondary mb-0.5">Order</p>
          <h3 className="text-charcoal font-semibold text-base">
            #{order.orderId}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-secondary cursor-pointer hover:text-charcoal transition rounded-full p-1 hover:bg-black/5"
        >
          <X size={18} />
        </button>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-6 px-6 py-4 border-b border-border bg-white/40">
        <div>
          <p className="text-xs text-secondary mb-0.5">Order date</p>
          <p className="text-sm text-charcoal">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-secondary mb-0.5">Order Number</p>
          <p className="text-sm text-charcoal font-medium">#{order.orderId}</p>
        </div>
        <div>
          <p className="text-xs text-secondary mb-0.5">Status</p>
          <StatusBadge status={order.orderStatus as OrderStatus} />
        </div>
      </div>

      {/* Items */}
      <div className="px-6 py-4 max-h-72 overflow-y-auto">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">
          Items
        </p>
        <div className="flex flex-col gap-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-lg bg-ivory flex items-center justify-center shrink-0">
                <Package size={20} className="text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">
                  {item.productName}
                </p>
                {item.size && (
                  <p className="text-xs text-secondary mt-0.5">
                    Size: {item.size}
                  </p>
                )}
                <p className="text-xs text-secondary mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold text-charcoal whitespace-nowrap">
                {formatPrice(item.price)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-white/40">
        <p className="text-sm text-secondary font-medium">Total</p>
        <p className="text-base font-semibold text-charcoal">
          {formatPrice(order.totalPrice)}
        </p>
      </div>
    </div>
  </div>
);

export default OrderModal;
