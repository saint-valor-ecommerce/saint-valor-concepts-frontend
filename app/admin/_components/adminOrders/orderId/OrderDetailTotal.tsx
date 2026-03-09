interface OrderDetailTotalProps {
  totalPrice: number;
}

const OrderDetailTotal = ({ totalPrice }: OrderDetailTotalProps) => {
  return (
    <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
      <p className="text-sm text-secondary uppercase tracking-wider font-semibold">
        Total
      </p>
      <p className="text-xl font-light text-charcoal">
        ₦{totalPrice.toLocaleString()}
      </p>
    </div>
  );
};

export default OrderDetailTotal;
