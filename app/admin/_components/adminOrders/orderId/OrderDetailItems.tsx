import { OrderItem } from "@/types/adminOrder";
import { Package } from "lucide-react";
import Image from "next/image";

interface OrderDetailItemsProps {
  items: OrderItem[];
}

const OrderDetailItems = ({ items }: OrderDetailItemsProps) => {
  return (
    <div>
      <h2 className="text-base font-semibold text-charcoal mb-4">Items</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-4">
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-ivory">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={40} className="text-secondary" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <p className="text-xs text-gold uppercase tracking-wider font-semibold mb-1">
                  Jewelry
                </p>
                <p className="text-base font-semibold text-charcoal">
                  {item.productName}
                </p>
                <p className="text-xs text-secondary mt-0.5">
                  Qty: {item.quantity} · Size: {item.size}
                </p>
              </div>
              <p className="text-sm font-medium text-charcoal">
                ₦{item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailItems;
