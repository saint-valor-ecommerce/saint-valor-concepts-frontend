interface OrderDetailAddressProps {
  address: string;
  city: string;
  countryCode: string;
  phoneNumber: string;
  shippingMethod: string;
}

const OrderDetailAddress = ({
  address,
  city,
  countryCode,
  phoneNumber,
  shippingMethod,
}: OrderDetailAddressProps) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-10">
      <div>
        <p className="text-xs text-secondary uppercase tracking-wider mb-1">
          Address
        </p>
        <p className="text-sm text-charcoal">
          {address}, {city}
        </p>
      </div>
      <div>
        <p className="text-xs text-secondary uppercase tracking-wider mb-1">
          Phone number
        </p>
        <p className="text-sm text-charcoal">
          {countryCode}
          {phoneNumber}
        </p>
      </div>
      <div>
        <p className="text-xs text-secondary uppercase tracking-wider mb-1">
          Shipping
        </p>
        <p className="text-sm text-charcoal capitalize">{shippingMethod}</p>
      </div>
    </div>
  );
};

export default OrderDetailAddress;
